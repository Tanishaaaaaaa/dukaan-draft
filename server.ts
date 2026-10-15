import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '2mb' }));

// Model identifier: Google's open-weights Gemma model available in the environment
const GEMMA_MODEL_ID = 'gemma-4-26b-a4b-it';

function getAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment secrets.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health & Model Verification Endpoint
app.get('/api/health', async (_req: Request, res: Response) => {
  const apiKeyExists = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 5);
  return res.json({
    status: 'ok',
    model: GEMMA_MODEL_ID,
    provider: 'Google Gemma (Open Weights)',
    apiKeyConfigured: apiKeyExists,
    timestamp: new Date().toISOString(),
  });
});

interface GenerateRequestBody {
  productName: string;
  price: string | number;
  features: string;
  platform?: 'Instagram' | 'WhatsApp' | 'both';
  language?: 'English' | 'Hindi' | 'Hinglish';
  tone?: 'Friendly' | 'Premium' | 'Playful' | 'Minimal';
}

function cleanAndExtractJson(rawText: string) {
  let cleaned = rawText.trim();

  // If wrapped in ```json ... ``` or ``` ... ```
  const jsonMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (jsonMatch && jsonMatch[1]) {
    cleaned = jsonMatch[1].trim();
  } else {
    // Try to find the outermost { and }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
  }

  // Remove potential trailing commas before closing braces/brackets
  const sanitized = cleaned
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']');

  try {
    return JSON.parse(sanitized);
  } catch (err) {
    // If standard parsing fails, attempt regex fallback for each field
    console.warn('Direct JSON parse failed, using regex extraction fallback.', err);
    return fallbackExtract(rawText);
  }
}

function fallbackExtract(rawText: string) {
  // Regex extractors for sections if Gemma formatted as markdown headers instead of JSON
  const extractSection = (headingRegex: RegExp, defaultVal = '') => {
    const match = rawText.match(headingRegex);
    return match && match[1] ? match[1].trim() : defaultVal;
  };

  const instagramCaption = extractSection(/(?:instagram(?:\s+caption)?|caption)[:#\n]+([\s\S]*?)(?=(?:whatsapp|opening hooks|hooks|faqs|promo|$))/i) || rawText.slice(0, 400);
  const whatsappCatalogue = extractSection(/(?:whatsapp(?:\s+catalogue)?|catalogue)[:#\n]+([\s\S]*?)(?=(?:opening hooks|hooks|faqs|promo|$))/i) || rawText.slice(0, 350);
  const promoMessage = extractSection(/(?:promo(?:\s+message)?|promotional message)[:#\n]+([\s\S]*?)$/i) || rawText.slice(0, 200);

  // Extract hooks
  const hooksMatch = rawText.match(/(?:hooks|opening hooks)[:#\n]+([\s\S]*?)(?=(?:faqs|faq|promo|$))/i);
  let alternativeHooks: string[] = [];
  if (hooksMatch && hooksMatch[1]) {
    alternativeHooks = hooksMatch[1]
      .split(/\n(?:\d+[\.\)]|-|\*)\s+/)
      .map(h => h.trim().replace(/^["']|["']$/g, ''))
      .filter(h => h.length > 5)
      .slice(0, 3);
  }
  if (alternativeHooks.length === 0) {
    alternativeHooks = [
      "Upgrade your everyday moments with something truly authentic.",
      "Looking for something unique and genuinely crafted?",
      "Here is why this is becoming an instant customer favourite."
    ];
  }

  // Default fallback FAQs
  const buyerFaqs = [
    { question: "What is the exact price?", answer: "The price is strictly as listed in the details." },
    { question: "Can I return or exchange this?", answer: "Seller needs to confirm: Return/exchange policy is not specified in the supplied product details." },
    { question: "How long does shipping take?", answer: "Seller needs to confirm: Shipping and delivery timelines are not specified in the supplied product details." }
  ];

  return {
    instagramCaption,
    whatsappCatalogue,
    alternativeHooks,
    buyerFaqs,
    promoMessage,
  };
}

app.post('/api/generate', async (req: Request, res: Response) => {
  const startTime = Date.now();
  const {
    productName,
    price,
    features,
    platform = 'both',
    language = 'English',
    tone = 'Friendly',
  } = req.body as GenerateRequestBody;

  if (!productName || !productName.trim()) {
    return res.status(400).json({ error: 'Product name is required.' });
  }

  if (price === undefined || price === null || String(price).trim() === '') {
    return res.status(400).json({ error: 'Product price in INR is required.' });
  }

  if (!features || !features.trim()) {
    return res.status(400).json({ error: 'Product features and details are required.' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is not set. Please configure your API key in AI Studio Settings > Secrets.',
    });
  }

  try {
    const ai = getAIClient();

    // Format price with INR ₹ symbol cleanly
    const numericPrice = String(price).replace(/[^0-9.]/g, '');
    const formattedPrice = numericPrice ? `₹${numericPrice}` : `₹${price}`;

    const prompt = `You are the marketing copy engine for "DukaanDraft", specialized in crafting high-converting, honest marketing copy for Indian micro-retailers and online sellers (Instagram stores, WhatsApp business catalogues, homegrown brands).

CRITICAL ACCURACY & INTEGRITY RULES:
1. Preserve the seller's actual price (${formattedPrice}) and product facts exactly.
2. NEVER INVENT materials, ingredients, certifications, discounts, dispatch timelines, free gifts, or product benefits not explicitly stated in the seller's details.
3. FOR THE 3 BUYER FAQs: Answer strictly using ONLY the supplied facts. If the seller did NOT provide information for a natural customer query (e.g. shipping time, COD availability, returns, care instructions), you MUST explicitly state: "Seller needs to confirm: [Specific detail, e.g. shipping time/COD/returns policy is not mentioned in product details]". Do NOT guess or assume.

PRODUCT INPUT:
- Product Name: ${productName.trim()}
- Price: ${formattedPrice}
- Seller's Facts & Details: ${features.trim()}
- Target Channel: ${platform}
- Output Language: ${language} (if Hinglish, write natural conversational Roman Hindi + English like everyday WhatsApp & Instagram D2C Indian brands; if Hindi, write clean Devanagari Hindi; if English, write warm relatable Indian English)
- Tone: ${tone} (Friendly = warm local dukaan warmth; Premium = luxurious artisanal elegance; Playful = witty, vibrant & catchy; Minimal = crisp, clear & fluff-free)

OUTPUT FORMAT:
Respond with ONLY a single valid JSON markdown code block. Do NOT include introductory text before the JSON or commentary after.
Use the exact JSON structure:
\`\`\`json
{
  "instagramCaption": "The complete Instagram caption formatted with hook, body, price (${formattedPrice}), clear CTA, and 8-12 relevant hashtags",
  "whatsappCatalogue": "Clean, structured catalogue description for WhatsApp Business with bullet points, specs, price (${formattedPrice}), and quick-order instructions",
  "alternativeHooks": [
    "Hook 1 (e.g. curiosity or relatable problem hook)",
    "Hook 2 (e.g. aesthetic or craftsmanship hook)",
    "Hook 3 (e.g. festive or value hook)"
  ],
  "buyerFaqs": [
    {
      "question": "Question 1?",
      "answer": "Answer based ONLY on supplied facts (or 'Seller needs to confirm: ...' if fact is missing)"
    },
    {
      "question": "Question 2?",
      "answer": "Answer based ONLY on supplied facts (or 'Seller needs to confirm: ...' if fact is missing)"
    },
    {
      "question": "Question 3?",
      "answer": "Answer based ONLY on supplied facts (or 'Seller needs to confirm: ...' if fact is missing)"
    }
  ],
  "promoMessage": "A short, punchy promotional broadcast message (under 60 words) suitable for WhatsApp broadcast or SMS with price ${formattedPrice} and clear CTA"
}
\`\`\``;

    let rawOutput = '';
    let lastError: any = null;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: GEMMA_MODEL_ID,
          contents: prompt,
        });
        rawOutput = response.text || '';
        if (rawOutput.trim()) {
          lastError = null;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Gemma inference attempt ${attempt} failed:`, err?.message || err);
        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
      }
    }

    if (lastError || !rawOutput.trim()) {
      throw lastError || new Error('Gemma model returned an empty response. Please try again.');
    }

    const parsedData = cleanAndExtractJson(rawOutput);

    // Verify all 5 sections exist
    const result = {
      instagramCaption: parsedData.instagramCaption || 'Instagram caption generation ready.',
      whatsappCatalogue: parsedData.whatsappCatalogue || 'WhatsApp catalogue description ready.',
      alternativeHooks: Array.isArray(parsedData.alternativeHooks) && parsedData.alternativeHooks.length > 0
        ? parsedData.alternativeHooks.slice(0, 3)
        : [
            "Handcrafted quality you can trust every single day.",
            "Elevate your lifestyle with authentic craftsmanship.",
            "Now available at the special price of " + formattedPrice
          ],
      buyerFaqs: Array.isArray(parsedData.buyerFaqs) && parsedData.buyerFaqs.length > 0
        ? parsedData.buyerFaqs.slice(0, 3).map((faq: { question?: string; answer?: string }, idx: number) => ({
            question: faq.question || `Product Question ${idx + 1}`,
            answer: faq.answer || 'Seller needs to confirm: please check product specifications.'
          }))
        : [
            {
              question: "What is the exact price?",
              answer: `The official price is ${formattedPrice}.`
            },
            {
              question: "Is cash on delivery (COD) available?",
              answer: "Seller needs to confirm: Payment methods and COD options are not specified in the supplied product details."
            },
            {
              question: "What are the delivery timelines?",
              answer: "Seller needs to confirm: Shipping and delivery timelines are not specified in the supplied product details."
            }
          ],
      promoMessage: parsedData.promoMessage || `Special offer: ${productName} is available now for ${formattedPrice}. Message us directly to place your order!`,
    };

    const latencyMs = Date.now() - startTime;

    return res.json({
      success: true,
      modelUsed: GEMMA_MODEL_ID,
      modelFamily: 'Google Gemma (Open Weights)',
      latencyMs,
      data: result,
      rawOutputSnippet: rawOutput.slice(0, 150) + '...',
    });
  } catch (error: unknown) {
    const err = error as { message?: string; status?: number; code?: number };
    console.error('Error during Gemma generation:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to generate copy with the Gemma model.',
      model: GEMMA_MODEL_ID,
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DukaanDraft server running on http://0.0.0.0:${PORT}`);
    console.log(`AI Engine: ${GEMMA_MODEL_ID}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
});
