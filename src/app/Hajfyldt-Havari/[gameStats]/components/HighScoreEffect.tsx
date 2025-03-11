"use client";

import { useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { set } from "zod";

export function HighScoreEffect() {
  useEffect(() => {
    // Trigger confetti on mount if it's a high score
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 1, x: 0.8 },
        colors: ["#FFD700", "#4169E1", "#FF6347"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FFD700", "#4169E1", "#FF6347"],
        });
      }, 500);
      toast("Tillykke! Du har slået din rekord", {
        duration: 5000,
        dismissible: true,
      });
    }, 500);
  }, []);

  return (
    <div className="relative w-20 h-20 mx-auto mb-4">
      <Image
        src="/trophy.png"
        alt="Trophy"
        width={200}
        height={200}
        className="animate-bounce"
      />
    </div>
  );
}
