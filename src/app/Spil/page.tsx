import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  let games = await prisma.game.findMany({
    include: {
      Leaderboard: true,
    },
  });
  console.log("🚀 ~ Page ~ games:", games);
  return (
    <div className="grid sm:grid-cols-3 gap-4 m-4 self-center">
      {games.map((game) => (
        <Card className="w-[350px]" key={game.id}>
          <CardHeader>
            <CardTitle>{game.title}</CardTitle>
            <CardDescription>{game.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              width={600}
              height={600}
              src={`/${game.imageUrl}` || "/game.png"}
              alt="Game image"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <span>
              {
                game?.Leaderboard?.filter((l) => {
                  return (
                    l.updatedAt >
                    new Date(new Date().setDate(new Date().getDate() - 30))
                  ); // last 7 days
                }).length
              }{" "}
              aktive spillere
            </span>
            <Link href={`/Spil/${game.title.replaceAll(" ", "-")}`}>
              <Button className="btn">Play</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Flere spil</CardTitle>
          <CardDescription>Kommer snart!</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            width={600}
            height={600}
            src={`/soon.png`}
            alt="Kommer snart"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <span>
            {
              game?.Leaderboard?.filter((l) => {
                return (
                  l.updatedAt >
                  new Date(new Date().setDate(new Date().getDate() - 30))
                ); // last 7 days
              }).length
            }{" "}
            aktive spillere
          </span>
          <Link href={`/Spil/${game.title.replaceAll(" ", "-")}`}>
            <Button className="btn">Play</Button>
          </Link> */}
        </CardFooter>
      </Card>
    </div>
  );
}
