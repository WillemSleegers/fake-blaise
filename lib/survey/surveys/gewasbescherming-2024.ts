import type { Survey } from "../types"

export const gewasbescherming2024: Survey = {
  id: "gewasbescherming-2024",
  title: "Gewasbescherming 2024",
  subtitle: "Invullen voor: 1-1-2025",
  company: {
    name: "Bedrijfsnaam 1",
    contactPerson: "Contactpersoon 1",
    correspondenceNumber: "0001",
  },
  pages: [
    {
      id: "welkom",
      label: "Welkom",
      type: "content",
      content: {
        title: "Welkom bij de vragenlijst",
        sections: [
          {
            title: "Invullen",
            text: "Wij adviseren u de vragenlijst in te vullen op een desktop computer of laptop.",
          },
          {
            title: "Toelichtingen",
            text: "De knop met een vraagteken betekent dat er extra uitleg is. Druk op deze knop als u de uitleg wilt zien.",
          },
          {
            title: "Opslaan",
            text: "Gegevens worden alleen automatisch opgeslagen wanneer u tussen schermen bladert. Wanneer u langere tijd werkt in één scherm, is het daarom raadzaam zelf de gegevens regelmatig op te slaan door rechtsboven in het scherm op de knop 'Opslaan' te drukken.",
          },
          {
            title: "Heeft u vragen?",
            text: "Druk op de 'Help' knop rechtsboven in dit scherm voor verdere uitleg of kijk op www.cbs.nl voor veelgestelde vragen over dit onderzoek.",
          },
        ],
      },
    },
    {
      id: "algemene-vragen",
      label: "Algemene vragen",
      type: "questions",
      content: {
        title: "Algemene vragen",
        questions: [
          {
            id: "gewas_gebruikt",
            type: "radio",
            label:
              "Heeft u in 2024 gewasbeschermingsmiddelen gebruikt bij de teelt van gewassen?",
            options: [
              { value: "ja", label: "Ja" },
              { value: "nee", label: "Nee" },
            ],
            required: true,
          },
          {
            id: "hectare",
            type: "number",
            label: "Hoeveel hectare grond heeft u in totaal in gebruik?",
            placeholder: "Aantal hectare",
          },
        ],
      },
    },
    {
      id: "gewasbeschermingsmiddelen-teelt",
      label: "Gewasbeschermings-middelen bij de teelt",
      type: "questions",
      content: {
        title: "Gewasbeschermingsmiddelen bij de teelt",
        questions: [
          {
            id: "middelen_type",
            type: "checkbox",
            label: "Welke typen gewasbeschermingsmiddelen heeft u gebruikt?",
            options: [
              { value: "herbiciden", label: "Herbiciden (onkruidbestrijding)" },
              { value: "fungiciden", label: "Fungiciden (schimmelbestrijding)" },
              {
                value: "insecticiden",
                label: "Insecticiden (insectenbestrijding)",
              },
              { value: "overig", label: "Overige middelen" },
            ],
          },
          {
            id: "middelen_opmerkingen",
            type: "textarea",
            label: "Eventuele opmerkingen over het gebruik van middelen",
            placeholder: "Typ hier uw opmerkingen...",
            rows: 4,
          },
        ],
      },
    },
    {
      id: "contact",
      label: "Contact",
      type: "questions",
      content: {
        title: "Contactgegevens",
        questions: [
          {
            id: "contact_naam",
            type: "text",
            label: "Naam contactpersoon",
            placeholder: "Volledige naam",
          },
          {
            id: "contact_telefoon",
            type: "text",
            label: "Telefoonnummer",
            placeholder: "06-12345678",
          },
          {
            id: "contact_email",
            type: "text",
            label: "E-mailadres",
            placeholder: "voorbeeld@email.nl",
          },
        ],
      },
    },
    {
      id: "verzenden",
      label: "Verzenden",
      type: "submit",
      content: {
        title: "Verzenden",
        text: "U bent aan het einde van de vragenlijst gekomen. Controleer uw antwoorden en klik op 'Verzenden' om de vragenlijst in te sturen. Na het verzenden kunt u de vragenlijst niet meer wijzigen.",
      },
    },
  ],
}
