"use client";

import { useState } from "react";
import { GameWithLeaderBoard } from "./page";
import { Podium } from "./Podium";
import { RankTable } from "./tableList";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function GamePicker({ games }: { games: GameWithLeaderBoard[] }) {
  if (!games.length) return <div>No games</div>;
  const [selectedGame, setSelectedGame] = useState<string>(games[0]?.id);

  return (
    <div className="flex flex-col items-center ">
      {games.length > 1 && (
        <ToggleGroup
          className="mt-6 gap-1 mr-auto"
          type="single"
          value={selectedGame}
          onValueChange={(value) => value && setSelectedGame(value)}
        >
          {games.map((game) => (
            //   <ToggleGroupItem >
            //     {game.title}
            //   </ToggleGroupItem>
            <Button
              key={game.id}
              asChild
              onClick={() => setSelectedGame(game.id)}
            >
              <Badge
                key={game.id}
                variant="outline"
                className={
                  selectedGame === game.id
                    ? ""
                    : "bg-background text-foreground hover:text-primary-foreground duration-200 transition-colors"
                }
              >
                {game.title}
              </Badge>
            </Button>
          ))}
        </ToggleGroup>
      )}
      <Separator className="my-4" color="foreground" orientation="horizontal" />
      <div className="w-custom flex flex-col items-center overflow-x-hidden">
        <Podium game={games.find((game) => game.id === selectedGame)!} />
        <RankTable game={games.find((game) => game.id === selectedGame)!} />
      </div>
    </div>
  );
}
