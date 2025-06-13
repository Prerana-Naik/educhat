import { users } from "@/lib/users"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const user = users.get(email)

  if (!user || user.password !== password) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 })
  }

  return new Response(JSON.stringify({ message: "Login successful", role: user.role }), {
    status: 200,
  })
}