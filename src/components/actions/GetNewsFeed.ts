"use server";

import { prisma } from "@/lib/prisma";

export interface NewsFeedItem {
  title: string;
  playerName: string;
  description: string;
  date: Date;
  gameName: string;
  type: "Highscore" | "Achievement";
}

export async function getNewsFeed() {
  let newsFeedItems: NewsFeedItem[] = [];

  // Group by game and get only the top score for each game
  const [newHighScores, playerAchievement] = await Promise.all([
    prisma.leaderboard.findMany({
      orderBy: {
        score: "asc",
      },
      select: {
        score: true,
        player: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        game: {
          select: {
            title: true,
            id: true,
          },
        },
        updatedAt: true,
      },

      distinct: ["gameId"],
    }),

    prisma.playerAchievement.findMany({
      where: {
        unlockedAt: {
          gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week
        },
      },
      select: {
        achievement: {
          select: {
            name: true,
            game: {
              select: {
                title: true,
              },
            },
          },
        },
        unlockedAt: true,
        player: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        unlockedAt: "asc",
      },
      take: 15,
    }),
  ]);

  newHighScores.forEach((score) => {
    newsFeedItems.push({
      title: "Ny highscore!",
      playerName: score.player.user.name || "Unknown",
      description: `Denne spiller har sat en ny highscore i ${score.game.title} på ${score.score}.`,
      date: score.updatedAt,
      gameName: score.game.title,
      type: "Highscore",
    });
  });

  playerAchievement.forEach((achievement) => {
    newsFeedItems.push({
      title: achievement.achievement.name,
      playerName: achievement.player.user.name || "Unknown",
      description: "Denne spiller har opnået en ny præstation!",
      date: achievement.unlockedAt,
      gameName: achievement.achievement.game.title,
      type: "Achievement",
    });
  });

  //   sort by date
  newsFeedItems.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return newsFeedItems;
}
