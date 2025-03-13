import { Player } from "@prisma/client";
import { useSidebar } from "../ui/sidebar";
import Link from "next/link";
import { Button } from "../ui/button";

import { PlayerStatsDefault } from "./PlayerStatsDefault";
import { PlayerStatsMobile } from "./PlayerStatsMobile";
import React from "react";

export function PlayerStatsPicker({ player }: { player: Player | null }) {
  if (!player)
    return (
      <div>
        <Link href="/api/auth/signin">
          <Button>Log ind</Button>
        </Link>
      </div>
    );
  return (
    <>
      <div className="sm:hidden">
        <PlayerStatsMobile player={player} />
      </div>
      <div className="hidden sm:flex">
        <PlayerStatsDefault player={player} />;
      </div>
    </>
  );
}
