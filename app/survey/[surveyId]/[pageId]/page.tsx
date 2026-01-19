"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { notFound } from "next/navigation"
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
  getSurvey,
  useSurvey,
  isQuestion,
  isSection,
  type Survey,
  type SurveyPage,
  type Question,
  type Section,
  type RadioQuestion,
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

function SectionRenderer({ section }: { section: Section }) {
  return (
    <BlaiseContentSection title={section.title}>
      <p>{section.text}</p>
    </BlaiseContentSection>
  )
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
  const { clearAnswers, answers } = useSurvey()

  const isFirstPage = currentIndex === 0
  const isLastPage = currentIndex === survey.pages.length - 1
  const nextPage = !isLastPage ? survey.pages[currentIndex + 1] : null
  const prevPage = !isFirstPage ? survey.pages[currentIndex - 1] : null

  // Find skip target based on current page's radio answers
  const getSkipTarget = (): string | null => {
    for (const item of page.content) {
      if (isQuestion(item) && item.type === "radio") {
        const answer = answers[item.id]
        if (answer) {
          const radioQuestion = item as RadioQuestion
          const selectedOption = radioQuestion.options.find(
            (opt) => opt.value === answer
          )
          if (selectedOption?.skipTo) {
            return selectedOption.skipTo
          }
        }
      }
    }
    return null
  }

  const handleNext = () => {
    const skipTarget = getSkipTarget()
    if (skipTarget) {
      router.push(`/survey/${survey.id}/${skipTarget}`)
    } else if (nextPage) {
      router.push(`/survey/${survey.id}/${nextPage.id}`)
    }
  }

  const handlePrevious = () => {
    if (prevPage) {
      router.push(`/survey/${survey.id}/${prevPage.id}`)
    }
  }

  const handleSubmit = () => {
    clearAnswers()
    alert("Vragenlijst verzonden! (Demo - geen data opgeslagen)")
  }

  return (
    <>
      <h1 className="text-xl font-bold text-survey-text mb-4">{page.title}</h1>

      <div className="mb-6">
        {page.content.map((item, i) => {
          if (isQuestion(item)) {
            return <QuestionRenderer key={item.id} question={item} />
          }
          if (isSection(item)) {
            return <SectionRenderer key={i} section={item} />
          }
          return null
        })}
      </div>

      <div className="flex gap-4">
        {!isFirstPage && (
          <BlaiseButton onClick={handlePrevious}>Vorige</BlaiseButton>
        )}
        {page.isSubmitPage ? (
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
    parentId: p.parentId,
  }))

  const handleNavClick = (pageId: string) => {
    router.push(`/survey/${survey.id}/${pageId}`)
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
        <BlaiseNavigation items={navItems} onItemClick={handleNavClick} activePageId={page.id} />
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

export default function SurveyPage() {
  const params = useParams()
  const surveyId = params.surveyId as string
  const pageId = params.pageId as string

  const survey = getSurvey(surveyId)

  if (!survey) {
    notFound()
  }

  const currentIndex = survey.pages.findIndex((p) => p.id === pageId)

  if (currentIndex === -1) {
    notFound()
  }

  const page = survey.pages[currentIndex]

  return (
    <SurveyPageInner survey={survey} page={page} currentIndex={currentIndex} />
  )
}
