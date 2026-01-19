import type { Survey } from "../types"
import { gewasbescherming2024 } from "./gewasbescherming-2024"
import { gewasbescherming2024Agrovision } from "./gewasbescherming-2024-agrovision"

const surveys: Record<string, Survey> = {
  "gewasbescherming-2024": gewasbescherming2024,
  "gewasbescherming-2024-agrovision": gewasbescherming2024Agrovision,
}

export function getSurvey(id: string): Survey | undefined {
  return surveys[id]
}

export function getAllSurveys(): Survey[] {
  return Object.values(surveys)
}
