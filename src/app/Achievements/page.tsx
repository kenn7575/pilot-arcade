import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Achievement, Game, PlayerAchievement } from "@prisma/client";
import { GamePicker } from "./GamePicker";
import { ribeyeMarrow } from "@/lib/fonts";
export interface GamesWithAchievements extends Game {
  achievements?: (Achievement & {
    PlayerAchievement: PlayerAchievement[];
  })[];
}
export interface AchievementWithPlayer extends Achievement {
  PlayerAchievement: PlayerAchievement[];
}

export default async function Page() {
  let session = await auth();
  const userId = session?.user?.id;

  let achievements = await prisma.game.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      achievements: {
        include: {
          PlayerAchievement: {
            where: {
              playerId: userId,
            },
          },
        },
      },
    },
  });

  return (
    <main className="px-2 my-4">
      <section className="text-center">
        <h1
          className={`${ribeyeMarrow.className} text-5xl font-bold text-primary mb-2`}
        >
          Præstationer
        </h1>

        <p>
          Se hvilke præstationer du har låst op for og hvad du kan låse op for
          næste gang.
        </p>
      </section>
      <GamePicker games={achievements} />
    </main>
  );
}
