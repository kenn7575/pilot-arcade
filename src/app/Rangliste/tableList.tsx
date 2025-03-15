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
import { Badge } from "@/components/ui/badge";
import { compactFormatter } from "@/lib/utils";
import { formatTimeAgo } from "@/lib/dateFormatter";
import { formatInitials } from "@/lib/formatInitials";

export function RankTable({ game }: { game: GameWithLeaderBoard }) {
  return (
    <Table className="mb-8">
      <TableCaption>Rangliste af spilleres scores</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Spiller</TableHead>
          <TableHead>Tidspunkt</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Placering</TableHead>
          {/* <TableHead>Sidst aktiv</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {game.Leaderboard.map((leaderboard, index) => (
          <TableRow key={leaderboard.id}>
            <TableCell>
              <div className="flex items-center gap-2 sm:gap-8">
                <div className="w-min relative">
                  <Badge className="hidden sm:block absolute z-10 -bottom-2 -right-4 bg-gradient-to-br from-[#f0f] to-[#8800f8]">
                    {compactFormatter.format(leaderboard.player.xp)}
                  </Badge>
                  <Avatar className="sm:h-12 sm:w-12 ">
                    <AvatarFallback>
                      {formatInitials(leaderboard.player.user.name || "^_^")}
                    </AvatarFallback>
                    <AvatarImage
                      alt={"profile"}
                      src={leaderboard.player.user.image || ""}
                    />
                  </Avatar>
                </div>
                <p className="sm:text-lg font-bold text-foreground/90  text-pretty">
                  {leaderboard.player.user.name}
                </p>
              </div>
            </TableCell>
            <TableCell className="text-pretty">
              {formatTimeAgo(leaderboard.updatedAt)}
            </TableCell>
            <TableCell className="text-lg font-bold  text-transparent bg-clip-text bg-gradient-to-br from-[#f0f] to-[#8800f8]">
              {leaderboard.score}
            </TableCell>
            <TableCell>
              <span className="text-2xl sm:text-4xl font-black">
                #{index + 1}
              </span>
            </TableCell>
            {/* <TableCell>{leaderboard.player.xp}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
