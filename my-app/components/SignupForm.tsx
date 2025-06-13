"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
    } else {
      localStorage.setItem("user", JSON.stringify({ email, role: data.role }))
      router.push("/")
    }
  }

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 w-80">
      <h2 className="text-xl font-semibold text-center">Sign Up</h2>
      <input
        className="p-2 border rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="p-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button className="bg-green-600 text-white p-2 rounded">Sign Up</button>
      <p className="text-sm text-center">
        Already have an account? <Link className="text-green-600" href="/login">Login</Link>
      </p>
    </form>
  )
}