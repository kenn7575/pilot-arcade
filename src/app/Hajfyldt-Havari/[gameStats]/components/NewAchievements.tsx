import { playerAchievementDetails } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Award, CoinsIcon, Sparkles } from "lucide-react";
import { compactFormatter } from "@/lib/utils";

export function DisplayNewAchievements({
  achievements,
}: {
  achievements: playerAchievementDetails[];
}) {
  return (
    <div>
      <div className="divider h-px bg-gray-200 my-6"></div>

      <h2 className="text-xl font-bold text-blue-900 mb-4">Nye Præstationer</h2>

      <div className="flex gap-2 overflow-x-auto justify-between">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className="w-72 min-w-60 pb-0">
            <CardHeader>
              <CardTitle>{achievement.achievement.name}</CardTitle>
              <CardDescription>
                Du har låst op for en ny præstation, Tillykke!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={`/games/${
                  achievement.achievement.imageUrl ?? "/placeholder.png"
                }`}
                alt={achievement.achievement.name}
                width={400}
                height={300}
                className="object-cover"
              />
              <p className="font-semibold mt-2">
                {achievement.achievement.description}
              </p>
            </CardContent>
            <CardFooter className="justify-center flex-col m-0  bg-gradient-to-r from-[#fdc830] via-[#f37335] to-[#8800f8] p-4 pt-2 rounded-b-lg w-full">
              <h4 className="text-lg font-bold mb-2">Bonus!</h4>
              <div className="flex  w-full justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-black/80">
                    +{achievement.achievement.coinReward}
                  </span>
                  <CoinsIcon className="text-black h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-black/80">
                    {compactFormatter.format(achievement.achievement.xpReward)}
                  </span>
                  <Sparkles className="text-black h-6 w-6" />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
