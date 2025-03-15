"use client";
import { useState } from "react";
import { GamesWithAchievements } from "./page";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AchievementsGrid } from "./AchievementsGrid";

export function GamePicker({ games }: { games: GamesWithAchievements[] }) {
  if (!games.length) return <div>No games</div>;
  const [selectedGame, setSelectedGame] = useState<string>(games[0]?.id);

  return (
    <div className="flex flex-col items-center">
      {games.length > 1 && (
        <ToggleGroup
          className="mt-6 gap-1 mr-auto overflow-x-auto"
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
      <div className="w-full">
        <AchievementsGrid
          achievements={
            games.find((game) => game.id === selectedGame)?.achievements || []
          }
        />
      </div>
    </div>
  );
}
