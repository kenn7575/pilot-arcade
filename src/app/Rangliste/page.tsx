import { prisma } from "@/lib/prisma";
import { Game, Player, User, Leaderboard } from "@prisma/client";
import { Podium } from "./Podium";
import { ribeye, ribeyeMarrow } from "@/lib/fonts";
import { RankTable } from "./tableList";
import { GamePicker } from "./GamePicker";

export interface GameWithLeaderBoard extends Game {
  Leaderboard: LeaderboardWithPlayer[];
}
export interface PlayerWithUser extends Player {
  user: User;
}
export interface LeaderboardWithPlayer extends Leaderboard {
  player: PlayerWithUser;
}

export default async function Page() {
  const games = await prisma.game.findMany({
    include: {
      Leaderboard: {
        include: {
          player: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          score: "desc",
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
          Rangliste
        </h1>

        <p>Se hvor du ligger i forhold til dine venner og andre spillere.</p>
      </section>
      <GamePicker games={games} />
    </main>
  );
}
