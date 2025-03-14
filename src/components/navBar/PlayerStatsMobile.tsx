"use client";

import { compactFormatter, numberFormatter } from "@/lib/utils";

import Image from "next/image";
import { Player } from "@prisma/client";
import { Button } from "../ui/button";
import { Coins, Sparkles } from "lucide-react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PlayerStatsMobile({ player }: { player: Player }) {
  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="lg">
            <div className="flex items-center gap-2 ">
              <Sparkles className="text-[#8800f8]  fill-[#8800f8] scale-150" />

              <span className="font-bold">
                {compactFormatter.format(player.xp)}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-gradient-to-br from-[#f0f] to-[#8800f8]">
          <div className="flex justify-between space-x-4">
            <Sparkles className="" size={52} />
            <div className="space-y-1">
              <h3 className="text-lg font-bold ">XP Point</h3>
              <p className="text-sm">
                Du har i alt opnået{" "}
                <span className="font-bold text-base">
                  {numberFormatter.format(player.xp)} XP Point.{" "}
                </span>
                Fortsæt med at spille for at optjene flere point.
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="lg">
            <div className="flex items-center gap-2 ">
              <Image
                src="/sprites/coin.png"
                alt="Player xp"
                width={24}
                height={24}
              />
              <span className="font-bold">{player.coins}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-gradient-to-br from-[#fdc830] to-[#f37335]">
          <div className="flex justify-between space-x-4">
            <Coins className="" size={52} />

            <div className="space-y-1">
              <h3 className="text-lg font-bold ">Dukater</h3>
              <p className="text-sm">
                Du har i alt opnået{" "}
                <span className="font-bold text-base">
                  {player.coins} Dukater.{" "}
                </span>
                Du optjener disse mens du spiller. De kan bruges til at købe nye
                ting i spillet.
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
