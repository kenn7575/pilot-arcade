export interface SailorGameResultInput {
  score: number;
  distance: number;
  time: number;
  obsticlesAvoided: number;
  startedPlayingAt: Date;
  gameId: string;
}
export interface Player{
  userId: string;
  coins: number;
  xp: number;
}