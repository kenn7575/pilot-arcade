"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SailorGameResultInput } from "@/lib/types";
import { GameSession } from "@prisma/client";
import { Coins } from "lucide-react";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const GAME_ID = "3f4d04da-46df-43d7-bb6c-0b15e943057a";

const schema = z.object({
  score: z.number(),
  distance: z.number(),
  time: z.number(),
  obsticlesAvoided: z.number(),
  startedPlayingAt: z.coerce.date(),
});

export async function uploadScore(
  input: SailorGameResultInput
): Promise<GameSession | void> {
  let session = await auth();
  console.log("🚀 ~ session:", session?.user);

  // validate input
  if (!session?.user?.id) return;

  const result = schema.safeParse(input);

  if (!result.success) return;
  const data = result.data;

  const coins =
    Math.floor(data.score / 1000) + Math.floor(data.obsticlesAvoided / 10);
  const xp =
    Math.floor(data.score / 10) + Math.floor(data.obsticlesAvoided / 10);

  const existingEntry = await prisma.leaderboard.findUnique({
    where: { gameId_playerId: { gameId: GAME_ID, playerId: session.user.id } },
  });

  if (!existingEntry || data.score > existingEntry.score) {
    await prisma.leaderboard.upsert({
      where: {
        gameId_playerId: { gameId: GAME_ID, playerId: session.user.id },
      },
      update: {
        score: data.score,
      },
      create: {
        gameId: GAME_ID,
        playerId: session.user.id,
        score: data.score,
        rank: 0,
      },
    });
  }

  const [player, gameSession] = await Promise.all([
    await prisma.player.update({
      where: {
        userId: session?.user.id,
      },
      data: {
        coins: {
          increment: coins,
        },
        xp: {
          increment: xp,
        },
      },
    }),
    await prisma.gameSession.create({
      data: {
        gameId: "3f4d04da-46df-43d7-bb6c-0b15e943057a",
        playerId: session?.user.id,
        startedAt: data.startedPlayingAt,
        endedAt: new Date(),
        gameStats: {
          create: {
            score: data.score,
            distanceTravelled: Math.round(data.distance * 1000) / 1000,
            timeSurvived: data.time,
            obstaclesAvoided: data.obsticlesAvoided,
          },
        },
      },
    }),
  ]);

  await computeAchievements(data, session.user.id);

  revalidatePath("/", "layout");
  revalidatePath("/Spil/Hajfyldt-Havari/*", "page");
  return gameSession;
}

export async function getGameStats(sessionId: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const gameSession = await prisma.gameSession.findUnique({
    where: {
      id: sessionId,
      playerId: session.user.id, // Ensure the user can only see their own stats
    },
    include: {
      gameStats: true,
    },
  });

  if (!gameSession || !gameSession.gameStats) return null;

  // Check if this was a high score
  const existingEntry = await prisma.leaderboard.findUnique({
    where: { gameId_playerId: { gameId: GAME_ID, playerId: session.user.id } },
  });

  const isHighScore =
    existingEntry && existingEntry.score === gameSession.gameStats.score;

  // Calculate rewards
  const coins =
    Math.floor(gameSession.gameStats.score / 1000) +
    Math.floor(gameSession.gameStats.obstaclesAvoided / 10);
  const xp =
    Math.floor(gameSession.gameStats.score / 100) +
    Math.floor(gameSession.gameStats.obstaclesAvoided / 10);

  return {
    score: gameSession.gameStats.score,
    distance: gameSession.gameStats.distanceTravelled,
    obstaclesAvoided: gameSession.gameStats.obstaclesAvoided,
    timeSurvived: gameSession.gameStats.timeSurvived,
    coins,
    xp,
    isHighScore,
  };
}

async function computeAchievements(
  gameResult: SailorGameResultInput,
  playerId: string
) {
  const achievementsToGrant = [];

  const gameStatsSum = await prisma.gameStats.aggregate({
    _sum: {
      distanceTravelled: true,
      obstaclesAvoided: true,
    },
    where: {
      gameSession: {
        playerId: playerId,
        gameId: GAME_ID,
      },
    },
  });
  console.log("🚀 ~ gameStatsSum:", gameStatsSum);
  const gameCountDeadAtFirstObstacle = await prisma.gameSession.count({
    where: {
      gameStats: {
        obstaclesAvoided: 0,
      },
      playerId: playerId,
      gameId: GAME_ID,
    },
  });

  const distanceSum = gameStatsSum._sum?.distanceTravelled || 0;
  if (distanceSum >= 1) {
    achievementsToGrant.push("6229a0c6-d3c2-46cc-b3fd-34b53adf9e24");
  }
  if (distanceSum >= 10) {
    achievementsToGrant.push("77021a65-4852-4f24-919d-281d5ddfdd17");
  }
  if (distanceSum >= 25) {
    achievementsToGrant.push("df904650-b232-44ce-bf3e-597feda0b4e6");
  }
  if (distanceSum >= 50) {
    achievementsToGrant.push("6dce0aaf-7253-42c6-8ab6-133d7d64e04d");
  }
  if (distanceSum >= 100) {
    achievementsToGrant.push("90394e9f-4490-433d-aa40-8e31a773809c");
  }

  if (gameResult.score >= 1000) {
    achievementsToGrant.push("1ab5c57d-c490-458c-b166-c620a57b5f54");
  }
  if (gameResult.score >= 5000) {
    achievementsToGrant.push("3ff79b6c-0fb3-4ed8-ada8-1089494d29d2");
  }
  if (gameResult.score >= 10000) {
    achievementsToGrant.push("f96b5853-9d81-4165-8339-26ed450e56d6");
  }
  if (gameResult.score >= 20000) {
    achievementsToGrant.push("dc13bbf9-00e8-47b1-8a3a-d41413deb8bf");
  }
  if (gameResult.score >= 50000) {
    achievementsToGrant.push("4d4277bb-39ff-44fe-a5a9-5ac61df8d6d8");
  }

  const playerObsticlesAvoidedSum = gameStatsSum._sum?.obstaclesAvoided || 0;
  console.log("🚀 ~ playerObsticlesAvoidedSum:", playerObsticlesAvoidedSum);

  if (playerObsticlesAvoidedSum >= 50) {
    achievementsToGrant.push("c3ab5eaf-7ad4-46f6-9b6b-4f46320ed76b");
  }
  if (playerObsticlesAvoidedSum >= 100) {
    achievementsToGrant.push("e7e9e884-37ca-4eb4-9ef5-a8b0a62aab67");
  }
  if (playerObsticlesAvoidedSum >= 500) {
    achievementsToGrant.push("2472658f-48a3-4348-a506-36711971060e");
  }
  if (playerObsticlesAvoidedSum >= 1000) {
    achievementsToGrant.push("08075136-f6ba-4837-842c-037f689b71b8");
  }
  if (playerObsticlesAvoidedSum >= 5000) {
    achievementsToGrant.push("a03f0a86-6fba-4a6e-aed0-909d58f9e2dd");
  }

  if (gameCountDeadAtFirstObstacle >= 10) {
    achievementsToGrant.push("11d37e0d-1431-4bf9-8898-965ceedd355a");
  }

  if (new Date().getHours() <= 8) {
    achievementsToGrant.push("842df461-7c5e-40e4-bca7-5b4d72f95e0a");
  }

  if (gameResult.time >= 600) {
    achievementsToGrant.push("4a7fbdf9-dbe2-46c3-86b7-f8fdb2df2525");
  }

  const createdAchievements = [];
  for (const achievement of achievementsToGrant) {
    const playerAchievement = await prisma.playerAchievement.upsert({
      where: {
        playerId_achievementId: { playerId, achievementId: achievement },
      },
      update: {},
      create: {
        playerId,
        achievementId: achievement,
        unlockedAt: new Date(),
      },
      include: {
        achievement: true,
      },
    });
    // if the achievement was created within the last 5 seconds, it was new
    if (new Date().getTime() - playerAchievement.unlockedAt.getTime() < 5000)
      createdAchievements.push(playerAchievement);
  }

  // for every achievement, add the reward to the player
  const xpReward = createdAchievements.reduce(
    (acc, achievement) => acc + achievement.achievement.xpReward,
    0
  );
  const coinsReward = createdAchievements.reduce(
    (acc, achievement) => acc + achievement.achievement.coinReward,
    0
  );

  await prisma.player.update({
    where: {
      userId: playerId,
    },
    data: {
      xp: {
        increment: xpReward,
      },
      coins: {
        increment: coinsReward,
      },
    },
  });
  return createdAchievements;
}
