import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ribeye } from "@/lib/fonts";
import { Activity, Anchor, Clock, Trophy, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RewardCounter } from "./components/RewardCounter";
import { HighScoreEffect } from "./components/HighScoreEffect";

const GAME_ID = "3f4d04da-46df-43d7-bb6c-0b15e943057a";

export default async function GameResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ sessionId?: string }>;
}) {
  const { sessionId } = await searchParams;
  const session = await auth();

  if (!session?.user?.id || !sessionId) {
    redirect("/Spil/Hajfyldt-Havari");
  }

  // Fetch game session data
  const gameSession = await prisma.gameSession.findUnique({
    where: {
      id: sessionId,
      playerId: session.user.id, // Ensure the user can only see their own stats
    },
    include: {
      gameStats: true,
    },
  });

  if (!gameSession || !gameSession.gameStats) {
    redirect("/Spil/Hajfyldt-Havari");
  }

  // Check if this was a high score
  const existingEntry = await prisma.leaderboard.findUnique({
    where: {
      gameId_playerId: { gameId: GAME_ID, playerId: session.user.id },
    },
  });
  console.log("🚀 ~ existingEntry", existingEntry);
  console.log("🚀 ~ gameSession", gameSession);
  const isHighScore =
    !existingEntry || existingEntry.score === gameSession.gameStats.score;

  // Calculate rewards
  const coins =
    Math.floor(gameSession.gameStats.score / 1000) +
    Math.floor(gameSession.gameStats.obstaclesAvoided / 10);
  const xp =
    Math.floor(gameSession.gameStats.score / 100) +
    Math.floor(gameSession.gameStats.obstaclesAvoided / 10);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const results = {
    score: gameSession.gameStats.score,
    distance: gameSession.gameStats.distanceTravelled,
    obstaclesAvoided: gameSession.gameStats.obstaclesAvoided,
    timeSurvived: gameSession.gameStats.timeSurvived,
    coins,
    xp,
    isHighScore,
  };
  console.log("🚀 ~ results:", results);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-lg">
        <div className="text-center">
          <h1
            className={`${ribeye.className} text-3xl font-bold text-blue-900 mb-4`}
          >
            {results.isHighScore ? "New High Score!" : "Game Over!"}
          </h1>

          {/* Conditional high score effect */}
          {results.isHighScore && <HighScoreEffect />}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 justify-center">
                <Trophy size={18} />
                <span className="font-semibold">Score</span>
              </div>
              <span className="text-2xl font-bold text-blue-900 block">
                {results.score}
              </span>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 justify-center">
                <Anchor size={18} />
                <span className="font-semibold">Sømil</span>
              </div>
              <span className="text-2xl font-bold text-blue-900">
                {results.distance}
              </span>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 justify-center">
                <Clock size={18} />
                <span className="font-semibold">Tid</span>
              </div>
              <span className="text-2xl font-bold text-blue-900">
                {formatTime(results.timeSurvived)}
              </span>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700 justify-center">
                <Activity size={18} />
                <span className="font-semibold">Antal hajer undgået</span>
              </div>
              <span className="text-2xl font-bold text-blue-900">
                {results.obstaclesAvoided}
              </span>
            </div>
          </div>

          <div className="divider h-px bg-gray-200 my-6"></div>

          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Din Belønning
          </h2>

          {/* Client side reward counters */}
          <RewardCounter coins={results.coins} xp={results.xp} />

          <div className="flex gap-3 justify-center mt-8">
            <Link href="/Spil/Hajfyldt-Havari">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Spil Igen
              </Button>
            </Link>

            <Link href="/Spil">
              <Button variant="outline" size="lg">
                Andre Spil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
