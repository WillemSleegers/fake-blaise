// Survey type definitions

export interface SurveyCompany {
  name: string
  contactPerson: string
  correspondenceNumber: string
}

export interface ContentSection {
  title?: string
  text: string
}

export interface RadioOption {
  value: string
  label: string
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

export interface ContentPage {
  id: string
  label: string
  type: "content"
  content: {
    title: string
    sections: ContentSection[]
  }
}

export interface QuestionsPage {
  id: string
  label: string
  type: "questions"
  content: {
    title: string
    questions: Question[]
  }
}

export interface SubmitPage {
  id: string
  label: string
  type: "submit"
  content: {
    title: string
    text: string
  }
}

export type SurveyPage = ContentPage | QuestionsPage | SubmitPage

export interface Survey {
  id: string
  title: string
  subtitle: string
  company: SurveyCompany
  pages: SurveyPage[]
}

export type SurveyAnswers = Record<string, string | string[]>
