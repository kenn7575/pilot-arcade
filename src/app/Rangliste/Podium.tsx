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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { use, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatInitials } from "@/lib/formatInitials";
import { formatTimeAgo } from "@/lib/dateFormatter";
import Image from "next/image";

export function Podium({ game }: { game: GameWithLeaderBoard }) {
  const topPlayers = game.Leaderboard.slice(0, 3);

  return (
    <div className="relative flex items-baseline justify-between gap-4  mb-8">
      {/* Second Place */}
      {topPlayers.length > 1 && (
        <Card className="w-56 mt-auto h-80 silver text-slate-900">
          <CardHeader className="text-center p-4 items-center">
            <Avatar className="sm:h-12 sm:w-12 ">
              <AvatarFallback>
                {formatInitials(topPlayers[1].player.user.name || "^_^")}
              </AvatarFallback>
              <AvatarImage src={topPlayers[1].player.user.image || ""} />
            </Avatar>
            <CardTitle className="text-sm text-pretty ">
              {topPlayers[1].player.user.name}
            </CardTitle>
            <CardDescription className="text-slate-900">
              Score: {topPlayers[1].score.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <Badge variant="secondary" className="w-full justify-center">
              2nd Place
            </Badge>
          </CardFooter>
        </Card>
      )}

      {/* First Place */}
      {topPlayers.length > 0 && (
        <Card className="w-56 h-96 gold text-amber-950">
          <CardHeader className="text-center p-4 items-center">
            <Avatar className="sm:h-12 sm:w-12 ">
              <AvatarFallback>
                {formatInitials(topPlayers[0].player.user.name || "^_^")}
              </AvatarFallback>
              <AvatarImage src={topPlayers[0].player.user.image || ""} />
            </Avatar>
            <CardTitle className="text-pretty">
              {topPlayers[0].player.user.name}
            </CardTitle>
            <CardDescription className="text-amber-950">
              Score: {topPlayers[0].score.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0 flex-col gap-8">
            <Badge
              variant="secondary"
              className="w-full justify-center bg-yellow-100  border-yellow-900 text-yellow-900"
            >
              1st Place
            </Badge>
            <Image
              src="/sprites/trophy.png"
              alt="Trophy"
              width={100}
              height={100}
              className="animate-pulse"
            />
          </CardFooter>
        </Card>
      )}

      {/* Third Place */}
      {topPlayers.length > 2 && (
        <Card className="w-56 mt-auto h-72  bronze text-orange-950">
          <CardHeader className="text-center p-4 items-center">
            <Avatar className="sm:h-12 sm:w-12 ">
              <AvatarFallback>
                {formatInitials(topPlayers[2].player.user.name || "^_^")}
              </AvatarFallback>
              <AvatarImage src={topPlayers[2].player.user.image || ""} />
            </Avatar>
            <CardTitle className="text-sm text-pretty">
              {topPlayers[2].player.user.name}
            </CardTitle>
            <CardDescription className="text-orange-950">
              Score: {topPlayers[2].score.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <Badge
              variant="secondary"
              className="w-full justify-center bg-orange-950 text-orange-100"
            >
              3rd Place
            </Badge>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
