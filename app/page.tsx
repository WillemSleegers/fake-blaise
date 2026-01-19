import Link from "next/link"
import { getAllSurveys } from "@/lib/survey"
import { BlaiseLayout, BlaiseHeader } from "@/components/blaise"

export default function Home() {
  const surveys = getAllSurveys()

  return (
    <BlaiseLayout>
      <BlaiseHeader />

      <div className="p-8">
        <h1 className="text-xl font-bold text-survey-text mb-6">
          Selecteer een vragenlijst
        </h1>

        <div className="space-y-4 mb-8">
          {surveys.map((survey) => (
            <Link
              key={survey.id}
              href={`/survey/${survey.id}/${survey.pages[0].id}`}
              className="block border border-survey-text-muted p-4 hover:border-survey-primary hover:bg-survey-bg-light"
            >
              <h2 className="font-bold text-survey-text">{survey.title}</h2>
              <p className="text-survey-text-muted text-sm">{survey.subtitle}</p>
            </Link>
          ))}
        </div>

        <div className="border-t border-survey-text-muted pt-6">
          <h2 className="font-bold text-survey-text mb-4">
            Of upload een eigen vragenlijst
          </h2>
          <Link
            href="/survey/upload"
            className="inline-block bg-survey-primary text-survey-white px-4 py-2 hover:bg-survey-primary-dark"
          >
            Upload JSON bestand
          </Link>
        </div>
      </div>
    </BlaiseLayout>
  )
}
