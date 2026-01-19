import type { Survey, PageItem } from "./types"

export function validateSurvey(
  data: unknown
): { valid: true; survey: Survey } | { valid: false; error: string } {
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
    return {
      valid: false,
      error: "Company must have a string 'correspondenceNumber'",
    }
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

function validatePage(
  page: unknown,
  index: number
): { valid: true } | { valid: false; error: string } {
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
  if (typeof p.title !== "string" || !p.title) {
    return { valid: false, error: `Page ${index} must have a string 'title'` }
  }
  if (!Array.isArray(p.content)) {
    return { valid: false, error: `Page ${index} must have a 'content' array` }
  }

  for (let j = 0; j < p.content.length; j++) {
    const itemResult = validatePageItem(p.content[j], index, j)
    if (!itemResult.valid) {
      return itemResult
    }
  }

  return { valid: true }
}

function validatePageItem(
  item: unknown,
  pageIndex: number,
  itemIndex: number
): { valid: true } | { valid: false; error: string } {
  if (!item || typeof item !== "object") {
    return {
      valid: false,
      error: `Item ${itemIndex} on page ${pageIndex} must be an object`,
    }
  }

  const i = item as Record<string, unknown>

  // Check if it's a question (has type and id) or a section (has text, no type)
  if ("type" in i) {
    // It's a question
    if (typeof i.id !== "string" || !i.id) {
      return {
        valid: false,
        error: `Question ${itemIndex} on page ${pageIndex} must have a string 'id'`,
      }
    }
    if (typeof i.label !== "string" || !i.label) {
      return {
        valid: false,
        error: `Question ${itemIndex} on page ${pageIndex} must have a string 'label'`,
      }
    }
    if (
      !["text", "textarea", "radio", "checkbox", "number"].includes(
        i.type as string
      )
    ) {
      return {
        valid: false,
        error: `Question ${itemIndex} on page ${pageIndex} must have type 'text', 'textarea', 'radio', 'checkbox', or 'number'`,
      }
    }

    if (
      (i.type === "radio" || i.type === "checkbox") &&
      !Array.isArray(i.options)
    ) {
      return {
        valid: false,
        error: `Question ${itemIndex} on page ${pageIndex} of type '${i.type}' must have an 'options' array`,
      }
    }
  } else {
    // It's a section - must have text
    if (typeof i.text !== "string") {
      return {
        valid: false,
        error: `Section ${itemIndex} on page ${pageIndex} must have a string 'text'`,
      }
    }
  }

  return { valid: true }
}
