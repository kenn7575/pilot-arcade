export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privatlivspolitik</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Indledning</h2>
        <p className="mb-4">
          Denne privatlivspolitik beskriver, hvordan vi indsamler, bruger og
          beskytter dine personoplysninger, når du bruger vores tjeneste.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Dataansvarlig</h2>
        <p className="mb-4">
          Pilot Arcade er dataansvarlig for behandlingen af dine
          personoplysninger.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Hvilke oplysninger indsamler vi
        </h2>
        <p className="mb-4">Vi indsamler følgende personoplysninger:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Basisinformation fra din Facebook-konto (navn og e-mailadresse)
          </li>
          <li>Information du aktivt giver os ved brug af tjenesten</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Formål med indsamlingen</h2>
        <p className="mb-4">Vi bruger dine personoplysninger til:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>At give dig adgang til vores tjeneste via Facebook login</li>
          <li>At forbedre brugeroplevelsen</li>
          <li>At kommunikere med dig om tjenesten</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Deling af oplysninger</h2>
        <p className="mb-4">
          Dine personoplysninger opbevares kun så længe det er nødvendigt for at
          opfylde formålene beskrevet i denne politik.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Dine rettigheder</h2>
        <p className="mb-4">Du har ret til at:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Få indsigt i dine personoplysninger</li>
          <li>Få rettet ukorrekte oplysninger</li>
          <li>Få slettet dine oplysninger</li>
          <li>Gøre indsigelse mod vores behandling</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cookies</h2>
        <p className="mb-4">
          Vores tjeneste bruger cookies til at forbedre brugeroplevelsen. Du kan
          deaktivere cookies i din browser.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Ændringer til privatlivspolitikken
        </h2>
        <p className="mb-4">
          Vi kan opdatere denne politik. Ændringer vil blive offentliggjort på
          denne side.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Kontakt</h2>
        <p className="mb-4">
          Hvis du har spørgsmål til denne privatlivspolitik, kan du kontakte mig
          på
          <a
            href="mailto:kko@danpilot.dk"
            className="text-blue-600 hover:underline"
          >
            {" "}
            kko@danpilot.dk
          </a>
        </p>
        <p className="text-sm text-gray-600">Sidst opdateret: 13. Marts 2025</p>
      </section>
    </main>
  );
}
