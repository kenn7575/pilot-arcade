import { Achievement, GameStats, PlayerAchievement } from "@prisma/client";

export interface SailorGameResultInput {
  score: number;
  distance: number;
  time: number;
  obsticlesAvoided: number;
  startedPlayingAt: Date;
}
export interface Player {
  userId: string;
  coins: number;
  xp: number;
}

export interface playerAchievementDetails extends PlayerAchievement {
  achievement: Achievement;
}

export interface GameSessionWithStats {
  id: string;
  playerId: string;
  startedAt: Date;
  endedAt: Date | null;
  gameStats: GameStats | null;
}
