// Survey type definitions

export interface SurveyCompany {
  name: string
  contactPerson: string
  correspondenceNumber: string
}

export interface Section {
  title?: string
  text: string
}

export interface RadioOption {
  value: string
  label: string
  skipTo?: string // Page ID to skip to when this option is selected
}

export interface BaseQuestion {
  id: string
  label: string
  required?: boolean
}

export interface TextQuestion extends BaseQuestion {
  type: "text"
  placeholder?: string
}

export interface TextAreaQuestion extends BaseQuestion {
  type: "textarea"
  placeholder?: string
  rows?: number
}

export interface RadioQuestion extends BaseQuestion {
  type: "radio"
  options: RadioOption[]
}

export interface CheckboxQuestion extends BaseQuestion {
  type: "checkbox"
  options: RadioOption[]
}

export interface NumberQuestion extends BaseQuestion {
  type: "number"
  min?: number
  max?: number
  placeholder?: string
}

export type Question =
  | TextQuestion
  | TextAreaQuestion
  | RadioQuestion
  | CheckboxQuestion
  | NumberQuestion

export type PageItem = Section | Question

export interface SurveyPage {
  id: string
  label: string
  title: string
  content: PageItem[]
  isSubmitPage?: boolean
  parentId?: string // ID of parent page for subpages (indented in navigation)
}

export interface Survey {
  id: string
  label?: string // Display label for survey selection (defaults to title)
  title: string
  subtitle: string
  company: SurveyCompany
  pages: SurveyPage[]
}

export type SurveyAnswers = Record<string, string | string[]>

// Type guard to check if an item is a Question
export function isQuestion(item: PageItem): item is Question {
  return "type" in item && "id" in item
}

// Type guard to check if an item is a Section
export function isSection(item: PageItem): item is Section {
  return "text" in item && !("type" in item)
}
