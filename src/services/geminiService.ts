import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface LandingPageData {
  productName: string;
  headline: string;
  subheadline: string;
  features: {
    title: string;
    description: string;
  }[];
  cta: string;
  html: string;
}

export async function generateLandingPage(
  productName: string,
  targetAudience: string,
  keyFeature: string
): Promise<LandingPageData> {
  const model = "gemini-3.1-pro-preview";
  
  const prompt = `
    You are an elite SaaS copywriter and conversion rate optimization expert.
    Generate a high-converting landing page for the following product:
    
    Product Name: ${productName}
    Target Audience: ${targetAudience}
    Key Feature: ${keyFeature}
    
    Requirements:
    - Headline: Bold, benefit-driven, outcome-focused.
    - Subheadline: 1-2 lines expanding the promise, focus on transformation.
    - 3 Features: Framed as outcomes for the target audience.
    - CTA: Short, compelling, action-driven.
    - HTML: A complete, self-contained HTML file with inline CSS. 
      - Use a modern SaaS style (soft gradients, centered hero, simple feature grid).
      - Responsive design.
      - No external libraries.
      - Clean semantic structure.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          productName: { type: Type.STRING },
          headline: { type: Type.STRING },
          subheadline: { type: Type.STRING },
          features: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
              },
              required: ["title", "description"],
            },
          },
          cta: { type: Type.STRING },
          html: { type: Type.STRING },
        },
        required: ["productName", "headline", "subheadline", "features", "cta", "html"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}
