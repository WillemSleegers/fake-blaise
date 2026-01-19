import type { Survey, SurveyPage, Question } from "./types"

export function validateSurvey(data: unknown): { valid: true; survey: Survey } | { valid: false; error: string } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Survey must be an object" }
  }

  const survey = data as Record<string, unknown>

  // Check required fields
  if (typeof survey.id !== "string" || !survey.id) {
    return { valid: false, error: "Survey must have a string 'id'" }
  }
  if (typeof survey.title !== "string" || !survey.title) {
    return { valid: false, error: "Survey must have a string 'title'" }
  }
  if (typeof survey.subtitle !== "string") {
    return { valid: false, error: "Survey must have a string 'subtitle'" }
  }

  // Check company
  if (!survey.company || typeof survey.company !== "object") {
    return { valid: false, error: "Survey must have a 'company' object" }
  }
  const company = survey.company as Record<string, unknown>
  if (typeof company.name !== "string") {
    return { valid: false, error: "Company must have a string 'name'" }
  }
  if (typeof company.contactPerson !== "string") {
    return { valid: false, error: "Company must have a string 'contactPerson'" }
  }
  if (typeof company.correspondenceNumber !== "string") {
    return { valid: false, error: "Company must have a string 'correspondenceNumber'" }
  }

  // Check pages
  if (!Array.isArray(survey.pages) || survey.pages.length === 0) {
    return { valid: false, error: "Survey must have a non-empty 'pages' array" }
  }

  for (let i = 0; i < survey.pages.length; i++) {
    const pageResult = validatePage(survey.pages[i], i)
    if (!pageResult.valid) {
      return pageResult
    }
  }

  return { valid: true, survey: data as Survey }
}

function validatePage(page: unknown, index: number): { valid: true } | { valid: false; error: string } {
  if (!page || typeof page !== "object") {
    return { valid: false, error: `Page ${index} must be an object` }
  }

  const p = page as Record<string, unknown>

  if (typeof p.id !== "string" || !p.id) {
    return { valid: false, error: `Page ${index} must have a string 'id'` }
  }
  if (typeof p.label !== "string" || !p.label) {
    return { valid: false, error: `Page ${index} must have a string 'label'` }
  }
  if (!["content", "questions", "submit"].includes(p.type as string)) {
    return { valid: false, error: `Page ${index} must have type 'content', 'questions', or 'submit'` }
  }
  if (!p.content || typeof p.content !== "object") {
    return { valid: false, error: `Page ${index} must have a 'content' object` }
  }

  const content = p.content as Record<string, unknown>

  if (typeof content.title !== "string") {
    return { valid: false, error: `Page ${index} content must have a string 'title'` }
  }

  if (p.type === "content") {
    if (!Array.isArray(content.sections)) {
      return { valid: false, error: `Content page ${index} must have a 'sections' array` }
    }
  } else if (p.type === "questions") {
    if (!Array.isArray(content.questions)) {
      return { valid: false, error: `Questions page ${index} must have a 'questions' array` }
    }
    for (let j = 0; j < content.questions.length; j++) {
      const qResult = validateQuestion(content.questions[j], index, j)
      if (!qResult.valid) {
        return qResult
      }
    }
  } else if (p.type === "submit") {
    if (typeof content.text !== "string") {
      return { valid: false, error: `Submit page ${index} must have a 'text' string` }
    }
  }

  return { valid: true }
}

function validateQuestion(question: unknown, pageIndex: number, questionIndex: number): { valid: true } | { valid: false; error: string } {
  if (!question || typeof question !== "object") {
    return { valid: false, error: `Question ${questionIndex} on page ${pageIndex} must be an object` }
  }

  const q = question as Record<string, unknown>

  if (typeof q.id !== "string" || !q.id) {
    return { valid: false, error: `Question ${questionIndex} on page ${pageIndex} must have a string 'id'` }
  }
  if (typeof q.label !== "string" || !q.label) {
    return { valid: false, error: `Question ${questionIndex} on page ${pageIndex} must have a string 'label'` }
  }
  if (!["text", "textarea", "radio", "checkbox", "number"].includes(q.type as string)) {
    return { valid: false, error: `Question ${questionIndex} on page ${pageIndex} must have type 'text', 'textarea', 'radio', 'checkbox', or 'number'` }
  }

  if ((q.type === "radio" || q.type === "checkbox") && !Array.isArray(q.options)) {
    return { valid: false, error: `Question ${questionIndex} on page ${pageIndex} of type '${q.type}' must have an 'options' array` }
  }

  return { valid: true }
}
