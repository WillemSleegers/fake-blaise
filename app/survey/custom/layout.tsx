"use client"

import { SurveyProvider } from "@/lib/survey"

export default function CustomSurveyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SurveyProvider surveyId="custom">{children}</SurveyProvider>
}
