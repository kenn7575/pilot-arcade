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
    Math.floor(data.score / 100) + Math.floor(data.obsticlesAvoided / 10);

  const existingEntry = await prisma.leaderboard.findUnique({
    where: { gameId_playerId: { gameId: GAME_ID, playerId: session.user.id } },
  });

  console.log("🚀 ~ existingEntry", existingEntry);
  console.log("🚀 ~ data", data);
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
            distanceTravelled: data.distance,
            timeSurvived: data.time,
            obstaclesAvoided: data.obsticlesAvoided,
          },
        },
      },
    }),
  ]);
  revalidatePath("/", "layout");
  revalidatePath("/Spil/Hajfyldt-Havari/*", "page");
  console.log("🚀 ~ player:" + player);
  console.log("🚀 ~ gameSession:" + gameSession);
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
