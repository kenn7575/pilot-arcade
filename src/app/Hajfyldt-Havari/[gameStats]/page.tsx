import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ribeye } from "@/lib/fonts";
import { Activity, Anchor, Clock, Trophy, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RewardCounter } from "./components/RewardCounter";
import { HighScoreEffect } from "./components/HighScoreEffect";
import { DisplayNewAchievements } from "./components/NewAchievements";
import { GameSessionWithStats, playerAchievementDetails } from "@/lib/types";
import { cookies } from "next/headers";

const GAME_ID = "3f4d04da-46df-43d7-bb6c-0b15e943057a";

export default async function GameResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ sessionId?: string }>;
}) {
  const { sessionId } = await searchParams;
  const session = await auth();
  if (!session?.user?.id || !sessionId) {
    redirect("/Hajfyldt-Havari");
  }
  const cookieStore = await cookies();

  interface GameResult {
    gameSession: GameSessionWithStats;
    achievements: playerAchievementDetails[];
    isHighScore: boolean;
  }

  const cachedData = JSON.parse(cookieStore.get(sessionId)!.value) as
    | GameResult
    | undefined;

  let fetchedData: GameResult | undefined;

  if (!cachedData) {
    const gameSession: GameSessionWithStats | null =
      await prisma.gameSession.findUnique({
        where: {
          id: sessionId,
          playerId: session.user.id, // Ensure the user can only see their own stats
        },
        include: {
          gameStats: true,
        },
      });
    // Fetch new achievements since the game started or 15 seconds ago
    const newAchievements: playerAchievementDetails[] =
      await prisma.playerAchievement.findMany({
        where: {
          playerId: session.user.id,
          unlockedAt: {
            gt: gameSession?.startedAt || new Date(Date.now() - 15000),
          },
        },
        include: {
          achievement: true,
        },
      });
    // Check if this was a high score
    const existingEntry = await prisma.leaderboard.findUnique({
      where: {
        gameId_playerId: { gameId: GAME_ID, playerId: session.user.id },
      },
    });

    if (!gameSession || !gameSession.gameStats) {
      redirect("/Hajfyldt-Havari");
    }

    const isHighScore =
      !existingEntry || existingEntry.score === gameSession.gameStats.score;

    fetchedData = {
      gameSession: gameSession,
      achievements: newAchievements,
      isHighScore,
    };
  }

  const data = cachedData || fetchedData;
  if (!data) {
    redirect("/Hajfyldt-Havari");
  }

  // Calculate rewards
  const coins =
    Math.floor((data.gameSession.gameStats?.score ?? 0) / 1000) +
    Math.floor(data.gameSession.gameStats?.obstaclesAvoided ?? 0 / 10);
  const xp =
    Math.floor((data.gameSession.gameStats?.score ?? 0) / 100) +
    Math.floor(data.gameSession.gameStats?.obstaclesAvoided ?? 0 / 10);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const results = {
    score: data.gameSession.gameStats?.score,
    distance: data.gameSession.gameStats?.distanceTravelled,
    obstaclesAvoided: data.gameSession.gameStats?.obstaclesAvoided,
    timeSurvived: data.gameSession.gameStats?.timeSurvived,
    coins,
    xp,
    isHighScore: data.isHighScore,
  };

  return (
    <main className="min-h-view bg-background flex justify-center sm:p-4">
      <div className="bg-background p-6 sm:p-8 rounded-lg w-full max-w-lg">
        <div className="text-center">
          <h1
            className={`${ribeye.className} text-3xl font-bold text-primary dark:text-foreground mb-4`}
          >
            {results.isHighScore ? "Ny personlig rekord!" : "Game Over!"}
          </h1>

          {/* Conditional high score effect */}
          {results.isHighScore && <HighScoreEffect />}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-primary/45 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-foreground justify-center">
                <Trophy size={18} />
                <span className="font-semibold">Score</span>
              </div>
              <span className="text-2xl font-bold text-foreground block">
                {results.score}
              </span>
            </div>

            <div className="bg-primary/45 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-foreground justify-center">
                <Anchor size={18} />
                <span className="font-semibold">Sømil</span>
              </div>
              <span className="text-2xl font-bold text-foreground">
                {results.distance}
              </span>
            </div>

            <div className="bg-primary/45 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-foreground justify-center">
                <Clock size={18} />
                <span className="font-semibold">Tid</span>
              </div>
              <span className="text-2xl font-bold text-foreground">
                {formatTime(results.timeSurvived ?? 0)}
              </span>
            </div>

            <div className="bg-primary/45 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-foreground justify-center">
                <Activity size={18} />
                <span className="font-semibold">Antal hajer undgået</span>
              </div>
              <span className="text-2xl font-bold text-foreground">
                {results.obstaclesAvoided}
              </span>
            </div>
          </div>

          <div className="divider h-px bg-gray-200 my-6"></div>

          <h2 className="text-xl font-bold text-primary dark:text-foreground mb-4">
            Din Belønning
          </h2>

          {/* Client side reward counters */}
          <RewardCounter coins={results.coins} xp={results.xp} />
          <DisplayNewAchievements achievements={data.achievements} />
          <div className="flex gap-3 justify-center mt-8">
            <Link href="/Hajfyldt-Havari">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Spil Igen
              </Button>
            </Link>

            <Link href="/Rangliste">
              <Button variant="outline" size="lg">
                Se rangliste
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
