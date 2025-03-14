"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GameWithLeaderBoard } from "./page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Podium({ game }: { game: GameWithLeaderBoard }) {
  if (!game) return <div>No game</div>;

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Spiller</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Tidspunkt</TableHead>
          <TableHead>Sidst aktiv</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {game.Leaderboard.map((leaderboard) => (
          <TableRow key={leaderboard.id}>
            <TableCell>
              <Avatar>
                <AvatarImage
                  src={leaderboard.player.user.image || "/user.jpg"}
                />
                <AvatarFallback>{leaderboard.player.user.name}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{leaderboard.score}</TableCell>
            <TableCell>{leaderboard.createdAt}</TableCell>
            <TableCell>{leaderboard.updatedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
