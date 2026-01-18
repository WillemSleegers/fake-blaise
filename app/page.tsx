import {
  BlaiseLayout,
  BlaiseHeader,
  BlaiseTitleBar,
  BlaiseNavigation,
  BlaiseContent,
  BlaiseContentSection,
  BlaiseInfoPanel,
  BlaiseButton,
  BlaiseHelpButton,
} from "@/components/blaise"

const navItems = [
  { id: "welkom", label: "Welkom", active: true },
  { id: "algemene-vragen", label: "Algemene vragen" },
  { id: "teelt", label: "Teelt" },
  { id: "aantal-middelen", label: "Aantal middelen" },
  {
    id: "gewasbeschermingsmiddelen-teelt",
    label: "Gewasbeschermings-\nmiddelen bij de teelt",
  },
  { id: "middel-1-5", label: "Middel 1-5" },
  {
    id: "gewasbeschermingsmiddelen-bedrijfsruimten",
    label: "Gewasbeschermings-\nmiddelen in bedrijfsruimten",
  },
  { id: "gebruik-teeltregistratie", label: "Gebruik teeltregistratie" },
  { id: "contact", label: "Contact" },
  { id: "invuller", label: "Invuller" },
  { id: "opmerkingen", label: "Opmerkingen" },
  { id: "tijdmeting", label: "Tijdmeting" },
  { id: "verzenden", label: "Verzenden" },
]

export default function Home() {
  return (
    <BlaiseLayout>
      <BlaiseHeader />

      {/* Title bar section with cyan background */}
      <div className="bg-survey-accent">
        <div className="flex">
          {/* Left: Title bar */}
          <div className="flex-1">
            <BlaiseTitleBar
              title="Gewasbescherming 2024"
              subtitle="Invullen voor: 1-1-2025"
            />
          </div>

          {/* Right: Info panel */}
          <BlaiseInfoPanel
            companyName="Bedrijfsnaam 1"
            contactPerson="Contactpersoon 1"
            correspondenceNumber="0001"
            className="mt-6"
          />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex">
        {/* Left sidebar - Navigation */}
        <BlaiseNavigation items={navItems} className="w-[250px] h-[450px]" />

        {/* Center - Content */}
        <BlaiseContent>
          <h1 className="text-xl font-bold text-survey-text mb-6">
            Welkom bij de vragenlijst
          </h1>

          <BlaiseContentSection title="Invullen">
            <p>
              Wij adviseren u de vragenlijst in te vullen op een desktop
              computer of laptop.
            </p>
          </BlaiseContentSection>

          <BlaiseContentSection title="Toelichtingen">
            <p>
              De knop <BlaiseHelpButton className="mx-1" /> betekent dat er
              extra uitleg is. Druk op deze knop als u de uitleg wilt zien.
            </p>
          </BlaiseContentSection>

          <BlaiseContentSection title="Opslaan">
            <p>
              Gegevens worden alleen automatisch opgeslagen wanneer u tussen
              schermen bladert. Wanneer u langere tijd werkt in één scherm, is
              het daarom raadzaam zelf de gegevens regelmatig op te slaan door
              rechtsboven in het scherm op de knop &apos;Opslaan&apos; te
              drukken.
            </p>
            <p>
              U kunt het invullen van de vragenlijst onderbreken met de knop
              &apos;Opslaan en sluiten&apos;. Uw eerder ingevulde antwoorden
              blijven dan bewaard.
            </p>
          </BlaiseContentSection>

          <BlaiseContentSection title="Heeft u vragen?">
            <p>
              Druk op de &apos;Help&apos; knop rechtsboven in dit scherm voor
              verdere uitleg of kijk op{" "}
              <a
                href="https://www.cbs.nl"
                className="text-survey-link underline"
              >
                www.cbs.nl
              </a>{" "}
              voor veelgestelde vragen over dit onderzoek.
            </p>
          </BlaiseContentSection>

          <p className="text-base text-survey-text mb-6">
            Druk op &apos;Volgende&apos; om verder te gaan met de vragenlijst.
          </p>

          <BlaiseButton>Volgende</BlaiseButton>
        </BlaiseContent>
      </div>
    </BlaiseLayout>
  )
}
