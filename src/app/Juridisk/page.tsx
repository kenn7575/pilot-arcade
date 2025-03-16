import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col gap-4 px-2 py-4 justify-center w-full">
      <h1 className="font-bold text-2xl">Juridisk</h1>
      <div className="responsive-grid gap-4 ">
        <Card>
          <CardHeader>
            <CardTitle>Privatlivspolitik</CardTitle>
            <CardDescription>Vi passer på dine data.</CardDescription>
          </CardHeader>
          <CardContent>
            Læs om dine rettigheder og vores forpligtelser i forhold til dine
            personlige oplysninger.
          </CardContent>
          <CardFooter className="justify-end">
            <Link href="/privacy">
              <Button>Læs mere</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="justify-between">
          <CardHeader>
            <CardTitle>Vilkår og betingelser</CardTitle>
            <CardDescription>Hvad er dine forpligtelser?</CardDescription>
          </CardHeader>
          <CardContent>
            Læs om dine forpligtelser og rettigheder i forhold til vores
            tjenester.
          </CardContent>
          <CardFooter className="justify-end">
            <Link href="/terms">
              <Button>Læs mere</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="justify-between">
          <CardHeader>
            <CardTitle>Sletning af data</CardTitle>
            <CardDescription>Hvis du ønsker dine data flernes</CardDescription>
          </CardHeader>
          <CardContent>
            Læs om hvordan du kan anmode om sletning af dine data.
          </CardContent>
          <CardFooter className="justify-end">
            <Link href="/delete-my-data">
              <Button>Læs mere</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="justify-between">
          <CardHeader>
            <CardTitle>Cookies</CardTitle>
            <CardDescription>
              Vi bruger cookies til at forbeder din oplevelse.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Læs om hvordan vi bruger cookies og vælg dine præferencer, ved at
            trykke på den runde knap nederst til højre af skærmen.
          </CardContent>
          <CardFooter className="justify-end"></CardFooter>
        </Card>
      </div>
    </main>
  );
}
