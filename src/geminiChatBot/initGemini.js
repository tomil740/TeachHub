import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
export async function chat(prompt) {
  console.log(prompt);

  const result = await model.generateContent(prompt);
  const answer = result.response.text();
  console.log(answer);

  return answer;
}
