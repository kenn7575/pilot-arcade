import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Achievement, PlayerAchievement } from "@prisma/client";
import { CoinsIcon, Sparkles } from "lucide-react";
import { compactFormatter } from "@/lib/utils";
interface AchievementWithPlayerAchievement extends Achievement {
  PlayerAchievement?: PlayerAchievement[];
}

export default async function Page() {
  let session = await auth();
  const userId = session?.user?.id;

  let achievements = await prisma.achievement.findMany({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      PlayerAchievement: {
        where: {
          playerId: userId || "",
        },
      },
    },
  });

  console.log(achievements);

  return (
    <main className="sm:p-4">
      <div className="flex gap-2 overflow-x-auto flex-wrap  ">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`${
              achievement.PlayerAchievement?.length > 0 ? "" : "grayscale"
            } w-72 min-w-60 pb-0 justify-between`}
          >
            <CardHeader>
              <CardTitle>{achievement.name}</CardTitle>
              <CardDescription>
                Du har låst op for en ny præstation, Tillykke!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={`/games/${achievement.imageUrl ?? "/placeholder.png"}`}
                alt={achievement.name}
                width={400}
                height={300}
                className="object-cover"
              />
              <p className="font-semibold mt-2">{achievement.description}</p>
            </CardContent>
            <CardFooter className="justify-center flex-col m-0  bg-gradient-to-r from-[#fdc830] via-[#f37335] to-[#8800f8] p-4 pt-2 rounded-b-lg w-full">
              <h4 className="text-lg font-bold mb-2">Bonus!</h4>
              <div className="flex  w-full justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-black/80">
                    +{achievement.coinReward}
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
    </main>
  );
}
