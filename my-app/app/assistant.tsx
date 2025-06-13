"use client"

import { useState } from "react"
import { AssistantRuntimeProvider } from "@assistant-ui/react"
import { useChatRuntime } from "@assistant-ui/react-ai-sdk"
import { Thread } from "@/components/assistant-ui/thread"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ModeToggle from "@/components/ModeToggle"

export default function Assistant() {
  const [mode, setMode] = useState<"student" | "teacher">("student")

  const systemPrompt =
    mode === "student"
      ? "You are a helpful study assistant for college students preparing for PGCET. Focus on concepts, questions, and tips."
      : "You are a knowledgeable teaching assistant helping M.Tech professors. Focus on deeper technical explanations."

  const runtime = useChatRuntime({
    api: "/api/chat",
    headers: {
      "x-system-prompt": systemPrompt,
    },
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-sky-100 to-white">
        <header className="backdrop-blur bg-white/80 border-b shadow-md rounded-b-xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">EduVerse AI</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-indigo-600">
                    {mode === "student" ? "Student Mode" : "Teacher Mode"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle value={mode} onValueChange={setMode} />
        </header>

        <main className="px-4 md:px-8 pt-6 pb-12">
          <div className="text-center py-4 text-xl font-semibold text-indigo-700">
            {mode === "student"
              ? "📚 Welcome, Student! Let's conquer the Questions!"
              : "🧑‍🏫 Welcome, Teacher! AI is at your scholarly service."}
          </div>

          <div className="mt-4 bg-white/90 rounded-2xl p-4 shadow-xl">
            <Thread />
          </div>
        </main>
      </div>
    </AssistantRuntimeProvider>
  )
}
