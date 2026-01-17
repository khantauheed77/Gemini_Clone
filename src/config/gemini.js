import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = "AIzaSyDSJjhFBWvG0A54QpNSOCBHGhxnuH80o6o";
const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

async function main(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    const text = response.text;
    console.log(text);
    return text;
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, there was an error processing your request.";
  }
}

export default main;
