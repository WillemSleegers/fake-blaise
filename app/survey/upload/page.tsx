"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { BlaiseLayout, BlaiseHeader, BlaiseButton } from "@/components/blaise"
import { validateSurvey, saveCustomSurvey } from "@/lib/survey"

export default function UploadPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = async (file: File) => {
    setError(null)

    if (!file.name.endsWith(".json")) {
      setError("Please upload a JSON file")
      return
    }

    try {
      const text = await file.text()
      const data = JSON.parse(text)
      const result = validateSurvey(data)

      if (!result.valid) {
        setError(result.error)
        return
      }

      saveCustomSurvey(result.survey)
      router.push(`/survey/custom/${result.survey.pages[0].id}`)
    } catch (e) {
      setError("Invalid JSON file")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <BlaiseLayout>
      <BlaiseHeader />

      <div className="p-8">
        <h1 className="text-xl font-bold text-survey-text mb-6">
          Upload Survey Definition
        </h1>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed p-12 text-center mb-4 ${
            dragOver
              ? "border-survey-primary bg-survey-bg-light"
              : "border-survey-text-muted"
          }`}
        >
          <p className="text-survey-text mb-4">
            Drag and drop a survey JSON file here, or click to select
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            className="hidden"
          />
          <BlaiseButton onClick={() => fileInputRef.current?.click()}>
            Select File
          </BlaiseButton>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <div className="mt-8">
          <h2 className="font-bold text-survey-text mb-2">Example Format</h2>
          <pre className="bg-survey-bg-light p-4 text-sm overflow-auto max-h-96 text-survey-text">
            {JSON.stringify(
              {
                id: "my-survey",
                title: "My Survey",
                subtitle: "Due: 2025-01-01",
                company: {
                  name: "Company Name",
                  contactPerson: "Contact Person",
                  correspondenceNumber: "0001",
                },
                pages: [
                  {
                    id: "welcome",
                    label: "Welcome",
                    title: "Welcome",
                    content: [
                      { title: "Introduction", text: "Welcome text here" },
                    ],
                  },
                  {
                    id: "questions",
                    label: "Questions",
                    title: "Questions",
                    content: [
                      { text: "Please answer the following questions." },
                      {
                        id: "q1",
                        type: "radio",
                        label: "Do you agree?",
                        options: [
                          { value: "yes", label: "Yes" },
                          { value: "no", label: "No" },
                        ],
                      },
                    ],
                  },
                  {
                    id: "submit",
                    label: "Submit",
                    title: "Submit",
                    isSubmitPage: true,
                    content: [{ text: "Click submit to finish." }],
                  },
                ],
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </BlaiseLayout>
  )
}
