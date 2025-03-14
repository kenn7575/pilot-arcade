"use client";
import { Button } from "@/components/ui/button";
import { GameWithLeaderBoard } from "./page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { use, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
export function Podium({ games }: { games: GameWithLeaderBoard[] }) {
  if (!games.length) return <div>No games</div>;
  const [selectedGame, setSelectedGame] = useState<string>(games[0]?.id);

  useEffect(() => {
    console.log("dd");
  }, [games]);
  return (
    <div>
      {/* select a game  */}
      <ToggleGroup
        className="mt-6"
        type="single"
        value={selectedGame}
        onValueChange={(value) => value && setSelectedGame(value)}
      >
        {games.map((game) => (
          //   <ToggleGroupItem >
          //     {game.title}
          //   </ToggleGroupItem>
          <Button asChild onClick={() => setSelectedGame(game.id)}>
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
      <Separator className="my-4" color="foreground" orientation="horizontal" />
      {games
        .filter((game) => game.id === selectedGame)
        .map((game) => (
          <Card key={game.id}>
            <CardHeader>
              <CardTitle>{game.title}</CardTitle>
            </CardHeader>
            {/* <CardContent>
            <CardDescription>{game.player.user.name}</CardDescription>
          </CardContent>
          <CardFooter>
            <CardDescription>{game.score}</CardDescription>
          </CardFooter> */}
          </Card>
        ))}
    </div>
  );
}
