// import { google } from "@ai-sdk/google";
// import { streamText } from "ai";

// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();
//   const result = streamText({
//     model: google("gemini-2.0-flash"),
//     messages,
//   });
//   return result.toDataStreamResponse();
// }
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") || "student";

  const systemMessage = {
    role: "system",
    content:
      mode === "student"
        ? "You are a helpful study assistant for college students preparing for PGCET. Answer with focus on clarity, practice, and real examples."
        : "You are a knowledgeable teaching assistant supporting M.Tech professors. Give advanced, technical, and well-structured answers.",
  };

  const fullMessages = [systemMessage, ...messages];

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages: fullMessages,
  });

  return result.toDataStreamResponse();
}
