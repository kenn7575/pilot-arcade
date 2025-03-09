"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SailorGameResultInput } from "@/lib/types";
import { Coins } from "lucide-react";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  score: z.number(),
  distance: z.number(),
  time: z.number(),
  obsticlesAvoided: z.number(),
  startedPlayingAt: z.coerce.date(),
});

export async function uploadScore(input: SailorGameResultInput) {
  let session = await auth();
  console.log("🚀 ~ session:", session?.user);

  // validate input
  if (!session?.user?.id) throw new Error("User not authenticated");

  const data = schema.parse(input);

  const coins =
    Math.floor(data.score / 1000) + Math.floor(data.obsticlesAvoided / 10);
  const xp =
    Math.floor(data.score / 100) + Math.floor(data.obsticlesAvoided / 10);

  Promise.all([
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
}
