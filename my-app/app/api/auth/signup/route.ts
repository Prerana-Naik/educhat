import { users } from "@/lib/users"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (users.has(email)) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 })
  }

  users.set(email, { email, password, role: "student" })

  return new Response(JSON.stringify({ message: "Signup successful", role: "student" }), {
    status: 200,
  })
}