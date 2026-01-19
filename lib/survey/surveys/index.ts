import type { Survey } from "../types"
import { gewasbescherming2024 } from "./gewasbescherming-2024"

const surveys: Record<string, Survey> = {
  "gewasbescherming-2024": gewasbescherming2024,
}

export function getSurvey(id: string): Survey | undefined {
  return surveys[id]
}

export function getAllSurveys(): Survey[] {
  return Object.values(surveys)
}
