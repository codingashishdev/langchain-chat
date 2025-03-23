import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import dotenv from "dotenv"

dotenv.config();

const vision = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: "gemini-1.5-flash",
    maxOutputTokens: 2048,
});
const input = [
  new HumanMessage({
    content: [
      {
        type: "text",
        text: "What is AI?",
      },
    ],
  }),
];

const res = await vision.invoke(input);
console.log(res.content)