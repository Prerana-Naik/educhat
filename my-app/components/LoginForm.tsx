"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/auth/login", {
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
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
      <h2 className="text-xl font-semibold text-center">Login</h2>
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
      <button className="bg-blue-600 text-white p-2 rounded">Login</button>
      <p className="text-sm text-center">
        Don’t have an account? <Link className="text-blue-600" href="/signup">Sign Up</Link>
      </p>
    </form>
  )
}