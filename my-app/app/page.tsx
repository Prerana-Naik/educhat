"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Assistant from "./assistant"


export default function Home() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      setAuthenticated(true)
    } else {
      router.replace("/login")
    }
  }, [router])

  if (authenticated === null) {
    return <p className="text-center mt-10">Checking your hacker license... 🧠</p>
  }

  return <Assistant />
}
