import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, CareerSuggestion } from "../types";

export const getCareerRecommendations = async (profile: UserProfile): Promise<CareerSuggestion[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as an expert career counselor and economist. 
    The user is looking for a career path that combines their passions with High Income Potential.
    
    User Profile:
    - Passions/Interests: ${profile.passions}
    - Current Skills/Strengths: ${profile.skills}
    - Preferred Work Style: ${profile.preferredWorkStyle}

    Task:
    Analyze this profile and generate a list of 4 distinct, high-paying career paths or specialties.
    Prioritize roles that are projected to have high demand and high salaries in the next 10 years.
    Be specific (e.g., instead of just "Doctor", suggest "Neurosurgeon" or "Dermatologist" if it fits).
    
    Return the response in Spanish.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: "You are a helpful career advisor focusing on high-income opportunities.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Job title or Specialty" },
            description: { type: Type.STRING, description: "Brief description of the role" },
            matchScore: { type: Type.INTEGER, description: "0 to 100 score of how well it fits the user" },
            salaryRangeUSD: { type: Type.STRING, description: "Estimated annual salary range in USD (e.g. '$100k - $150k')" },
            educationPath: { type: Type.STRING, description: "What degree or certification is needed" },
            requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            whyItFits: { type: Type.STRING, description: "Explanation of why this aligns with user passions" },
            growthOutlook: { type: Type.STRING, description: "Future market demand (High, Very High, Stable)" }
          },
          required: ["title", "description", "matchScore", "salaryRangeUSD", "educationPath", "whyItFits"]
        }
      }
    }
  });

  const text = response.text;
  if (!text) return [];
  
  try {
    return JSON.parse(text) as CareerSuggestion[];
  } catch (e) {
    console.error("Failed to parse JSON", e);
    return [];
  }
};