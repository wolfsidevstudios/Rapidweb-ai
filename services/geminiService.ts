
import { GoogleGenAI, Type } from "@google/genai";
import { BlockType } from '../types';
import { AVAILABLE_BLOCKS } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key not found. AI features will be disabled. Make sure to set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const allBlockTypes = AVAILABLE_BLOCKS.flatMap(cat => cat.blocks.map(b => b.type));

export const generatePageLayout = async (prompt: string): Promise<BlockType[]> => {
    if (!API_KEY) {
        throw new Error("API key is not configured.");
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the following request, create a landing page structure. Request: "${prompt}"`,
            config: {
                systemInstruction: `You are an expert web designer. Your task is to suggest a sequence of sections for a webpage based on a user's request.
Respond with a JSON array of strings, where each string is a section type.
The array should represent the top-to-bottom order of the sections on the page.
Only use the following available section types: ${allBlockTypes.join(', ')}.
Ensure the layout is logical. For example, a 'Navbar' should usually be first, and a 'Footer' last. A typical business page might be Navbar, Hero, Features, Testimonials, CallToAction, Footer.`,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING,
                        enum: allBlockTypes,
                    },
                },
            },
        });

        const jsonString = response.text.trim();
        const layout = JSON.parse(jsonString) as BlockType[];

        if (!Array.isArray(layout) || layout.some(item => typeof item !== 'string')) {
            throw new Error("AI returned an invalid layout format.");
        }

        return layout.filter(type => allBlockTypes.includes(type));

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate page layout. Please check your prompt or API key.");
    }
};
