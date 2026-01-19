import type { Survey } from "./types"

const CUSTOM_SURVEY_KEY = "custom-survey"

export function saveCustomSurvey(survey: Survey): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(CUSTOM_SURVEY_KEY, JSON.stringify(survey))
  }
}

export function getCustomSurvey(): Survey | null {
  if (typeof window === "undefined") return null
  const stored = sessionStorage.getItem(CUSTOM_SURVEY_KEY)
  return stored ? JSON.parse(stored) : null
}

export function clearCustomSurvey(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(CUSTOM_SURVEY_KEY)
  }
}
