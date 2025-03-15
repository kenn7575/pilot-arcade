export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Brugsbetingelser</h1>

      <section className="mb-4">
        <h2 className="text-xl font-bold mb-2">1. Acceptering af vilkår</h2>
        <p className="mb-2">
          Ved at tilgå eller bruge vores tjeneste accepterer du at være bundet
          af disse brugsbetingelser. Hvis du ikke accepterer alle vilkårene, må
          du ikke bruge tjenesten.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-bold mb-2">2. Brug af tjenesten</h2>
        <p className="mb-2">
          Du må kun bruge tjenesten til lovlige formål og i overensstemmelse med
          disse betingelser. Du må ikke:
        </p>
        <ul className="list-disc ml-6 mb-2">
          <li>
            Bruge tjenesten på en måde, der kunne beskadige, deaktivere eller
            overbelaste tjenesten
          </li>
          <li>Forsøge at få uautoriseret adgang til systemet</li>
          <li>Distribuere skadeligt eller ulovligt indhold</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-bold mb-2">3. Brugerkonti</h2>
        <p className="mb-2">
          Du er ansvarlig for at beskytte dine login-oplysninger og for alle
          aktiviteter, der sker under din konto.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-bold mb-2">4. Intellektuel ejendomsret</h2>
        <p className="mb-2">
          Tjenesten og dens oprindelige indhold, funktioner og funktionalitet
          ejes af Pilot Arcade og er beskyttet af ophavsret og andre
          immaterielle rettigheder.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-bold mb-2">5. Ansvarsfraskrivelse</h2>
        <p className="mb-2">
          Tjenesten leveres "som den er" uden garantier af nogen art. Vi påtager
          os intet ansvar for tab eller skade, der måtte opstå som følge af din
          brug af tjenesten.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-bold mb-2">6. Begrænsning af ansvar</h2>
        <p className="mb-2">
          Under ingen omstændigheder vil Pilot Arcade være ansvarlig for nogen
          form for tab eller skade, der måtte opstå som følge af brugen af
          tjenesten.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-bold mb-2">7. Ændringer af tjenesten</h2>
        <p className="mb-2">
          Vi forbeholder os ret til at ændre eller afbryde tjenesten uden varsel
          til enhver tid.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-bold mb-2">
          8. Ændringer af betingelserne
        </h2>
        <p className="mb-2">
          Vi kan revidere disse betingelser til enhver tid. Ved fortsat brug af
          tjenesten efter disse ændringer accepterer du de reviderede
          betingelser.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-bold mb-2">9. Gældende lov</h2>
        <p className="mb-2">
          Disse betingelser er underlagt og fortolket i overensstemmelse med
          dansk lovgivning.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-bold mb-2">10. Kontakt</h2>
        <p className="mb-2">
          Hvis du har spørgsmål vedrørende disse betingelser, kontakt os
          venligst på{" "}
          <a href="mailto:kko@danpilot.dk" className="text-primary">
            {" "}
            kko@danpilot.dk
          </a>
        </p>
      </section>

      <p className="text-sm text-gray-500 mt-8">
        Sidst opdateret: 13. Marts 2025
      </p>
    </div>
  );
}
