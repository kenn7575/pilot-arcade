"use client";

import { CoinsIcon, Award } from "lucide-react";
import { useEffect } from "react";

interface RewardCounterProps {
  coins: number;
  xp: number;
}

export function RewardCounter({ coins, xp }: RewardCounterProps) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-[#fdc830] to-[#f37335] p-4 rounded-lg flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <CoinsIcon className="text-black h-6 w-6" />
            <span className="font-bold text-black">Mønter</span>
          </div>
          <span className="text-4xl font-bold text-black/60">{coins}</span>
        </div>

        <div className="bg-gradient-to-br from-[#f0f] to-[#8800f8] p-4 rounded-lg flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-black h-6 w-6" />
            <span className="font-bold text-black">XP</span>
          </div>
          <span className="text-4xl font-bold text-black/60">{xp}</span>
        </div>
      </div>
    </div>
  );
}
