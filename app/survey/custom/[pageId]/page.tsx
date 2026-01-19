"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  BlaiseLayout,
  BlaiseHeader,
  BlaiseTitleBar,
  BlaiseNavigation,
  BlaiseContent,
  BlaiseContentSection,
  BlaiseInfoPanel,
  BlaiseButton,
  BlaiseTextInput,
  BlaiseTextArea,
  BlaiseRadioGroup,
  BlaiseCheckboxGroup,
  BlaiseNumberInput,
} from "@/components/blaise"
import {
  getCustomSurvey,
  SurveyProvider,
  useSurvey,
  type Survey,
  type SurveyPage,
  type Question,
} from "@/lib/survey"

function QuestionRenderer({ question }: { question: Question }) {
  const { getAnswer, setAnswer } = useSurvey()

  const value = getAnswer(question.id)

  switch (question.type) {
    case "text":
      return (
        <BlaiseTextInput
          id={question.id}
          label={question.label}
          value={(value as string) || ""}
          onChange={(v) => setAnswer(question.id, v)}
          placeholder={question.placeholder}
          required={question.required}
        />
      )
    case "textarea":
      return (
        <BlaiseTextArea
          id={question.id}
          label={question.label}
          value={(value as string) || ""}
          onChange={(v) => setAnswer(question.id, v)}
          placeholder={question.placeholder}
          rows={question.rows}
          required={question.required}
        />
      )
    case "radio":
      return (
        <BlaiseRadioGroup
          id={question.id}
          label={question.label}
          value={(value as string) || ""}
          onChange={(v) => setAnswer(question.id, v)}
          options={question.options}
          required={question.required}
        />
      )
    case "checkbox":
      return (
        <BlaiseCheckboxGroup
          id={question.id}
          label={question.label}
          values={(value as string[]) || []}
          onChange={(v) => setAnswer(question.id, v)}
          options={question.options}
          required={question.required}
        />
      )
    case "number":
      return (
        <BlaiseNumberInput
          id={question.id}
          label={question.label}
          value={(value as string) || ""}
          onChange={(v) => setAnswer(question.id, v)}
          placeholder={question.placeholder}
          min={question.min}
          max={question.max}
          required={question.required}
        />
      )
  }
}

function PageContent({
  survey,
  page,
  currentIndex,
}: {
  survey: Survey
  page: SurveyPage
  currentIndex: number
}) {
  const router = useRouter()
  const { clearAnswers } = useSurvey()

  const isFirstPage = currentIndex === 0
  const isLastPage = currentIndex === survey.pages.length - 1
  const nextPage = !isLastPage ? survey.pages[currentIndex + 1] : null
  const prevPage = !isFirstPage ? survey.pages[currentIndex - 1] : null

  const handleNext = () => {
    if (nextPage) {
      router.push(`/survey/custom/${nextPage.id}`)
    }
  }

  const handlePrevious = () => {
    if (prevPage) {
      router.push(`/survey/custom/${prevPage.id}`)
    }
  }

  const handleSubmit = () => {
    clearAnswers()
    alert("Vragenlijst verzonden! (Demo - geen data opgeslagen)")
    router.push(`/survey/custom/${survey.pages[0].id}`)
  }

  return (
    <>
      <h1 className="text-xl font-bold text-survey-text mb-4">
        {page.content.title}
      </h1>

      {page.type === "content" && (
        <>
          {page.content.sections.map((section, i) => (
            <BlaiseContentSection key={i} title={section.title}>
              <p>{section.text}</p>
            </BlaiseContentSection>
          ))}
        </>
      )}

      {page.type === "questions" && (
        <div className="mb-6">
          {page.content.questions.map((question) => (
            <QuestionRenderer key={question.id} question={question} />
          ))}
        </div>
      )}

      {page.type === "submit" && (
        <BlaiseContentSection>
          <p>{page.content.text}</p>
        </BlaiseContentSection>
      )}

      <div className="flex gap-4">
        {!isFirstPage && (
          <BlaiseButton onClick={handlePrevious}>Vorige</BlaiseButton>
        )}
        {page.type === "submit" ? (
          <BlaiseButton onClick={handleSubmit}>Verzenden</BlaiseButton>
        ) : (
          <BlaiseButton onClick={handleNext}>Volgende</BlaiseButton>
        )}
      </div>
    </>
  )
}

function SurveyPageInner({
  survey,
  page,
  currentIndex,
}: {
  survey: Survey
  page: SurveyPage
  currentIndex: number
}) {
  const router = useRouter()
  const { visitedPages, markPageVisited } = useSurvey()

  useEffect(() => {
    markPageVisited(page.id)
  }, [page.id, markPageVisited])

  const navItems = survey.pages.map((p, i) => ({
    id: p.id,
    label: p.label,
    active: i === currentIndex,
    visited: visitedPages.has(p.id),
  }))

  const handleNavClick = (pageId: string) => {
    router.push(`/survey/custom/${pageId}`)
  }

  return (
    <BlaiseLayout>
      <BlaiseHeader />

      {/* Title bar section */}
      <div className="flex">
        <BlaiseTitleBar title={survey.title} subtitle={survey.subtitle} />
        <div className="flex-1 border-t-20 border-t-survey-white bg-survey-accent"></div>
        <div className="border-t-20 border-t-survey-white bg-survey-accent flex items-center">
          <BlaiseInfoPanel
            companyName={survey.company.name}
            contactPerson={survey.company.contactPerson}
            correspondenceNumber={survey.company.correspondenceNumber}
          />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex">
        <BlaiseNavigation items={navItems} onItemClick={handleNavClick} />
        <BlaiseContent>
          <PageContent
            survey={survey}
            page={page}
            currentIndex={currentIndex}
          />
        </BlaiseContent>
      </div>
    </BlaiseLayout>
  )
}

export default function CustomSurveyPage() {
  const params = useParams()
  const router = useRouter()
  const pageId = params.pageId as string

  const [survey, setSurvey] = useState<Survey | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const customSurvey = getCustomSurvey()
    if (!customSurvey) {
      router.push("/survey/upload")
      return
    }
    setSurvey(customSurvey)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <BlaiseLayout>
        <BlaiseHeader />
        <div className="p-8 text-survey-text">Laden...</div>
      </BlaiseLayout>
    )
  }

  if (!survey) {
    return null
  }

  const currentIndex = survey.pages.findIndex((p) => p.id === pageId)

  if (currentIndex === -1) {
    router.push(`/survey/custom/${survey.pages[0].id}`)
    return null
  }

  const page = survey.pages[currentIndex]

  return (
    <SurveyProvider surveyId="custom">
      <SurveyPageInner
        survey={survey}
        page={page}
        currentIndex={currentIndex}
      />
    </SurveyProvider>
  )
}
