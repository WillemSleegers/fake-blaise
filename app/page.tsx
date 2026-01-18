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
  {
    id: "gewasbeschermingsmiddelen-teelt",
    label: "Gewasbeschermings-middelen bij de teelt",
  },
  {
    id: "gewasbeschermingsmiddelen-bedrijfsruimten",
    label: "Gewasbeschermings-middelen in bedrijfsruimten",
  },
  { id: "gebruik-teeltregistratie", label: "Gebruik teeltregistratie" },
  { id: "contact", label: "Contact" },
  { id: "tijdmeting", label: "Tijdmeting" },
  { id: "verzenden", label: "Verzenden" },
]

export default function Home() {
  return (
    <BlaiseLayout>
      <BlaiseHeader />

      {/* Title bar section */}
      <div className="flex">
        {/* Section 1: Title bar with due date */}
        <BlaiseTitleBar
          title="Gewasbescherming 2024"
          subtitle="Invullen voor: 1-1-2025"
        />
        {/* Section 2: Empty */}
        <div className="flex-1 border-t-20 border-t-survey-white bg-survey-accent"></div>

        {/* Section 3: Info panel with cyan background and white top border */}
        <div className="border-t-20 border-t-survey-white bg-survey-accent flex items-center">
          <BlaiseInfoPanel
            companyName="Bedrijfsnaam 1"
            contactPerson="Contactpersoon 1"
            correspondenceNumber="0001"
          />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex">
        {/* Left sidebar - Navigation */}
        <BlaiseNavigation items={navItems} />

        {/* Center - Content */}
        <BlaiseContent>
          <h1 className="text-xl font-bold text-survey-text mb-4">
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
              De knop <BlaiseHelpButton /> betekent dat er extra uitleg is. Druk
              op deze knop als u de uitleg wilt zien.
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
