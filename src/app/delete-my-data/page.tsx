export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Sletning af brugerkonto</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Formål</h2>
        <p className="mb-4">
          Denne side beskriver, hvordan du kan anmode om sletning af din
          brugerkonto og dine personlige oplysninger fra vores system.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          Proces for sletning af konto
        </h2>
        <p className="mb-2">
          For at slette din konto hos Pilot Arcade, bedes du følge nedenstående
          procedure:
        </p>
        <ol className="list-decimal ml-6 mb-4">
          <li className="mb-1">
            Send en e-mail til{" "}
            <a
              href="mailto:kko@danpilot.dk?subject=Anmodning om kontosletning"
              className="text-primary"
            >
              {" "}
              kko@danpilot.dk
            </a>{" "}
            med emnet "Anmodning om kontosletning"
          </li>
          <li className="mb-1">
            Angiv den e-mailadresse, der er knyttet til din konto
          </li>
          <li className="mb-1">
            Vi behandler din anmodning inden for 30 dage, ofte inden for 3 dage
          </li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          Konsekvenser af kontosletning
        </h2>
        <p className="mb-2">Når du anmoder om at få slettet din konto:</p>
        <ul className="list-disc ml-6 mb-4">
          <li className="mb-1">
            Alle dine personlige oplysninger fjernes permanent fra vores
            database
          </li>
          <li className="mb-1">Din profil og alle tilknyttede data slettes</li>
          <li className="mb-1">Din adgang til tjenesten ophører</li>
          <li className="mb-1">Denne handling kan ikke fortrydes</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Data der slettes</h2>
        <p className="mb-2">
          Ved sletning af din konto, fjerner vi følgende data:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li className="mb-1">Din profil og kontooplysninger</li>
          <li className="mb-1">Data knyttet til din Facebook-konto</li>
          <li className="mb-1">
            Andre personlige oplysninger vi måtte have indsamlet
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Dataopbevaring</h2>
        <p className="mb-4">
          Visse oplysninger kan opbevares i en begrænset periode efter sletning
          af din konto af juridiske eller tekniske årsager. Disse data
          anonymiseres og kan ikke længere identificere dig.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Kontakt</h2>
        <p className="mb-4">
          Hvis du har spørgsmål vedrørende sletning af din konto, kan du
          kontakte os på
          <a href="mailto:kko@danpilot.dk" className="text-primary">
            {" "}
            kko@danpilot.dk
          </a>
        </p>
      </section>

      <footer className="text-sm text-gray-600 mt-8">
        Sidst opdateret: 13. Marts 2025
      </footer>
    </div>
  );
}
