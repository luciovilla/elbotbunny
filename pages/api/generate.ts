import { CreateChatCompletionRequest } from "openai";

import { OpenAIStream } from "../../utils/OpenAIStream";
import { generatePrompt, SongType } from "../../utils/prompt";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

type GenerateRequestBody = {
  topic: string;
  song?: SongType;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { topic, song } = (await req.json()) as GenerateRequestBody;

  if (!topic) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const prompt = generatePrompt(topic, song);

  const payload: CreateChatCompletionRequest = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 256,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
