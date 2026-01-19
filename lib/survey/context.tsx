"use client"

import { createContext, useContext, useState, useCallback } from "react"
import type { SurveyAnswers } from "./types"

interface SurveyContextValue {
  answers: SurveyAnswers
  setAnswer: (questionId: string, value: string | string[]) => void
  getAnswer: (questionId: string) => string | string[] | undefined
  clearAnswers: () => void
  visitedPages: Set<string>
  markPageVisited: (pageId: string) => void
}

const SurveyContext = createContext<SurveyContextValue | null>(null)

interface SurveyProviderProps {
  children: React.ReactNode
  surveyId: string
}

export function SurveyProvider({ children, surveyId }: SurveyProviderProps) {
  const storageKey = `survey-answers-${surveyId}`
  const visitedKey = `survey-visited-${surveyId}`

  const [answers, setAnswers] = useState<SurveyAnswers>(() => {
    if (typeof window === "undefined") return {}
    const stored = sessionStorage.getItem(storageKey)
    return stored ? JSON.parse(stored) : {}
  })

  const [visitedPages, setVisitedPages] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set()
    const stored = sessionStorage.getItem(visitedKey)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  })

  const setAnswer = useCallback(
    (questionId: string, value: string | string[]) => {
      setAnswers((prev) => {
        const next = { ...prev, [questionId]: value }
        if (typeof window !== "undefined") {
          sessionStorage.setItem(storageKey, JSON.stringify(next))
        }
        return next
      })
    },
    [storageKey]
  )

  const getAnswer = useCallback(
    (questionId: string) => {
      return answers[questionId]
    },
    [answers]
  )

  const clearAnswers = useCallback(() => {
    setAnswers({})
    setVisitedPages(new Set())
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(storageKey)
      sessionStorage.removeItem(visitedKey)
    }
  }, [storageKey, visitedKey])

  const markPageVisited = useCallback(
    (pageId: string) => {
      setVisitedPages((prev) => {
        const next = new Set(prev)
        next.add(pageId)
        if (typeof window !== "undefined") {
          sessionStorage.setItem(visitedKey, JSON.stringify([...next]))
        }
        return next
      })
    },
    [visitedKey]
  )

  return (
    <SurveyContext.Provider
      value={{ answers, setAnswer, getAnswer, clearAnswers, visitedPages, markPageVisited }}
    >
      {children}
    </SurveyContext.Provider>
  )
}

export function useSurvey() {
  const context = useContext(SurveyContext)
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider")
  }
  return context
}
