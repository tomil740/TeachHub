import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyC3m-XiCai6A-F_cojf2dY4FO5p5apPV3Y");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function processRoleMood(Roles) {
  let prompt = `For each of the following roles, you will provide motivational sentences and jokes. Return only an array of sentences and jokes (around 30 motivational and jokes), one sentence or joke for each role in the list, the jokes and motivation must be related to the position, its means that it return a array of objects and in each object u have the role: , joke: , motivational: , plz dont return with the array any comments or something like this just the array. The roles are: `;
  prompt += JSON.stringify(Roles);

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    console.log("Raw Response:", responseText);

    let cleanedResponse = responseText.replace(/```json|```/g, "").trim();
    cleanedResponse = cleanedResponse.replace(/[\n\r]/g, "");

    if (cleanedResponse.startsWith("[") && cleanedResponse.endsWith("]")) {
      const sentences = JSON.parse(cleanedResponse);
      return sentences;
    } else {
      console.error("Invalid JSON format in response:", cleanedResponse);
      return [];
    }
  } catch (error) {
    console.error("Error in processRoleMood:", error);
    return [];
  }
}
