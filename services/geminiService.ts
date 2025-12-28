import { GoogleGenAI } from "@google/genai";
import { BIO_INFO } from "../constants";

export class PortfolioAI {
  private ai: GoogleGenAI;
  private modelName: string = "gemini-2.5-flash-lite";

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    // console.log("Gemini API initialized.", process.env.API_KEY);
  }

  async chat(
    message: string,
    history: { role: "user" | "assistant"; content: string }[]
  ) {
    try {
      const response = await this.ai.models.generateContent({
        model: this.modelName,
        contents: [
          ...history.map((h) => ({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: h.content }],
          })),
          { role: "user", parts: [{ text: message }] },
        ],
        config: {
          systemInstruction: `You are the AI Assistant for this developer's portfolio. 
          Your goal is to answer questions about the developer's experience, skills, and projects in a professional, friendly, and helpful manner.
          Here is information about the developer: ${BIO_INFO}
          Always stay in character and be enthusiastic. If asked about something not in the bio, politely say you don't have that information but mention what you do know.`,
          temperature: 0.7,
        },
      });

      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm having a bit of trouble connecting right now. Please try again later!";
    }
  }
}

export const portfolioAI = new PortfolioAI();
