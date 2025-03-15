import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { AchievementWithPlayer } from "./page";
import { CoinsIcon, Sparkles } from "lucide-react";
import { compactFormatter, numberFormatter } from "@/lib/utils";
export function AchievementsGrid({
  achievements,
}: {
  achievements: AchievementWithPlayer[];
}) {
  return (
    <div className="responsive-grid gap-2 gap-y-4 ">
      {achievements.map((achievement) => (
        <Card
          key={achievement.id}
          className={`${
            achievement.PlayerAchievement?.length > 0 ? "" : "grayscale"
          }  pb-0 justify-between`}
        >
          <CardHeader>
            <CardTitle>{achievement.name}</CardTitle>
            <CardDescription>
              Du har låst op for en ny præstation, Tillykke!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={`/games/${achievement.imageUrl ?? "/missing.jpg"}`}
              alt={achievement.name}
              width={400}
              height={300}
              className="object-cover"
            />
            <p className="font-semibold mt-2">{achievement.description}</p>
          </CardContent>
          <CardFooter className="justify-center flex-col m-0  bg-gradient-to-r from-[#fdc830] via-[#f37335] to-[#8800f8] p-4 pt-2 rounded-b-lg w-full">
            <p className="text-lg font-bold mb-2">Bonus!</p>
            <div className="flex  w-full justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-black/80">
                  +{numberFormatter.format(achievement.coinReward)}
                </span>
                <CoinsIcon className="text-black h-6 w-6" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-black/80">
                  +{compactFormatter.format(achievement.xpReward)}
                </span>
                <Sparkles className="text-black h-6 w-6" />
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
