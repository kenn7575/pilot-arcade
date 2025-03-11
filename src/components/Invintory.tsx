"use client";

import { cn, compactFormatter, numberFormatter } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useSession, signIn, signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Player } from "@prisma/client";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { CalendarIcon, Coins, Sparkles } from "lucide-react";
import Link from "next/link";

export function NavigationMenuInventory({ player }: { player: Player | null }) {
  if (!player)
    return (
      <div>
        <Link href="/api/auth/signin">
          <Button>Log ind</Button>
        </Link>
      </div>
    );
  return (
    <div className="flex items-center">
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="lg">
            <div className="flex items-center gap-2 ">
              <Sparkles className="text-[#8800f8]  fill-[#8800f8] scale-150" />

              <span className="font-bold">
                {compactFormatter.format(player.xp)}
              </span>
            </div>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 bg-gradient-to-br from-[#f0f] to-[#8800f8]">
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
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <Button variant="ghost" size="lg">
            <div className="flex items-center gap-2 ">
              <Image src="/coin.png" alt="Player xp" width={24} height={24} />
              <span className="font-bold">{player.coins}</span>
            </div>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 bg-gradient-to-br from-[#fdc830] to-[#f37335]">
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
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
