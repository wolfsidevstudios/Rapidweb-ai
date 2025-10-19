import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedLayoutItem } from '../types';

export async function generatePageLayout(prompt: string): Promise<GeneratedLayoutItem[]> {
  // FIX: Use new GoogleGenAI and obtain API key from environment variables, per coding guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

  const systemInstruction = `You are an expert web designer. Your task is to generate a JSON array of website components based on a user's description.
  
  The available component types are: 'navbar', 'hero', 'features', 'cta', 'testimonials', 'contact', 'footer', 'gallery', 'pricing', 'team', 'stats', 'logocloud'.
  
  For each component, provide a 'type' and a 'props' object with relevant content. The content should be professional and tailored to the user's prompt.
  
  Example response for "a landing page for a new fitness app":
  [
    {
      "type": "navbar",
      "props": {
        "logoText": "FitTrack",
        "links": [{"text": "Features", "href": "#"}, {"text": "Pricing", "href": "#"}, {"text": "Download", "href": "#"}],
        "buttonText": "Get Started"
      }
    },
    {
      "type": "hero",
      "props": {
        "title": "Your Ultimate Fitness Companion",
        "subtitle": "Track your workouts, monitor your progress, and achieve your fitness goals with FitTrack.",
        "primaryButtonText": "Download App",
        "secondaryButtonText": "Learn More"
      }
    }
  ]`;
  
  try {
    // FIX: Use ai.models.generateContent instead of deprecated methods.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        // FIX: Define responseSchema for reliable JSON output.
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: {
                type: Type.STRING,
                description: "The type of the component."
              },
              props: {
                type: Type.OBJECT,
                description: "The properties for the component, which can have any structure."
              }
            },
            required: ['type', 'props']
          }
        }
      }
    });

    // FIX: Access text directly from the response object per coding guidelines.
    const text = response.text.trim();
    
    if (!text) {
      throw new Error("Received an empty response from the AI.");
    }
    
    const layout = JSON.parse(text);

    if (!Array.isArray(layout)) {
      throw new Error("AI did not return a valid array.");
    }

    return layout as GeneratedLayoutItem[];

  } catch (error) {
    console.error('Error generating page layout:', error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate layout with AI: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating the layout.');
  }
}
