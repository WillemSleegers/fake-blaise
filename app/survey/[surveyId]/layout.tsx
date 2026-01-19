"use client"

import { useParams } from "next/navigation"
import { SurveyProvider } from "@/lib/survey"

export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const surveyId = params.surveyId as string

  return <SurveyProvider surveyId={surveyId}>{children}</SurveyProvider>
}
