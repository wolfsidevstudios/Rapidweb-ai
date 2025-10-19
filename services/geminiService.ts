import { GoogleGenAI, Type } from "@google/genai";
import { BlockType } from '../types';
import { AVAILABLE_BLOCKS } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key not found. AI features will be disabled. Make sure to set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const allBlockTypes = AVAILABLE_BLOCKS.flatMap(cat => cat.blocks.map(b => b.type));

const responseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            type: { type: Type.STRING, enum: allBlockTypes },
            props: {
                type: Type.OBJECT,
                properties: {
                    // Shared
                    title: { type: Type.STRING },
                    subtitle: { type: Type.STRING },
                    brandName: { type: Type.STRING },
                    description: { type: Type.STRING },
                    // Navbar
                    links: { type: Type.ARRAY, items: { type: Type.STRING } },
                    ctaText: { type: Type.STRING },
                    // Hero
                    headline: { type: Type.STRING },
                    coloredHeadline: { type: Type.STRING },
                    subheadline: { type: Type.STRING },
                    cta1Text: { type: Type.STRING },
                    cta2Text: { type: Type.STRING },
                    // CallToAction
                    headline1: { type: Type.STRING },
                    headline2: { type: Type.STRING },
                    // Features
                    featuresList: {
                        type: Type.ARRAY,
                        items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } }
                    },
                    // Testimonials
                    testimonialList: {
                        type: Type.ARRAY,
                        items: { type: Type.OBJECT, properties: { quote: { type: Type.STRING }, author: { type: Type.STRING }, title: { type: Type.STRING } } }
                    },
                    // Contact
                    buttonText: { type: Type.STRING },
                    // Pricing
                    pricingTiers: {
                        type: Type.ARRAY,
                        items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, price: { type: Type.STRING }, description: { type: Type.STRING }, features: { type: Type.ARRAY, items: { type: Type.STRING } }, cta: { type: Type.STRING }, popular: { type: Type.BOOLEAN } } }
                    },
                    // Team
                    teamMembers: {
                        type: Type.ARRAY,
                        items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, role: { type: Type.STRING } } }
                    },
                    // Stats
                    statsList: {
                        type: Type.ARRAY,
                        items: { type: Type.OBJECT, properties: { label: { type: Type.STRING }, value: { type: Type.STRING } } }
                    },
                }
            }
        },
        required: ['type', 'props']
    }
};

export const generatePageLayout = async (prompt: string): Promise<{ type: BlockType, props: Record<string, any> }[]> => {
    if (!API_KEY) {
        throw new Error("API key is not configured.");
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the following request, create a landing page structure with compelling content. Request: "${prompt}"`,
            config: {
                systemInstruction: `You are an expert web designer and copywriter. Your task is to generate the content for a webpage based on a user's request.
Respond with a JSON array of objects. Each object represents a section (or "block") of the webpage.
The array should represent the top-to-bottom order of the sections.
Each object in the array must have two properties: "type" and "props".
- "type" must be a string from this list of available block types: ${allBlockTypes.join(', ')}.
- "props" must be an object containing the text content for that block.

Follow these rules for the "props" object for each block "type":
- Navbar: { "brandName": string, "links": string[], "ctaText": string }
- Hero: { "headline": string, "coloredHeadline": string, "subheadline": string, "cta1Text": string, "cta2Text": string }
- Features: { "title": string, "subtitle": string, "featuresList": [{ "name": string, "description": string }, ...] } (Provide 4 features)
- CallToAction: { "headline1": string, "headline2": string, "subtitle": string, "ctaText": string }
- Testimonials: { "title": string, "subtitle": string, "testimonialList": [{ "quote": string, "author": string, "title": string }, ...] } (Provide 3 testimonials)
- Contact: { "title": string, "subtitle": string, "buttonText": string }
- Footer: { "brandName": string, "description": string }
- Gallery: { "title": string, "subtitle": string }
- Pricing: { "title": string, "subtitle": string, "pricingTiers": [{ "name": string, "price": string, "description": string, "features": string[], "cta": string, "popular": boolean }, ...] } (Provide 3 tiers, one of which should be popular)
- Team: { "title": string, "subtitle": string, "teamMembers": [{ "name": string, "role": string }, ...] } (Provide 4 members)
- Stats: { "title": string, "subtitle": string, "statsList": [{ "label": string, "value": string }, ...] } (Provide 4 stats)
- LogoCloud: { "title": string, "subtitle": string }

Ensure the generated layout and content are logical and creative, tailored to the user's request. For example, a 'Navbar' should usually be first, and a 'Footer' last.
Generate compelling and relevant text for all properties. Do not use placeholder text like "Lorem Ipsum".`,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonString = response.text.trim();
        const layout = JSON.parse(jsonString) as { type: BlockType, props: Record<string, any> }[];
        
        if (!Array.isArray(layout) || layout.some(item => !item.type || !item.props)) {
            throw new Error("AI returned an invalid layout format.");
        }

        return layout.filter(item => allBlockTypes.includes(item.type));

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate page layout. Please check your prompt or API key.");
    }
};