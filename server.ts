import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Gemini API endpoint for optional Life Era & Time Capsule Insights
app.post('/api/life-insights', async (req, res) => {
  try {
    const { birthDate, ageYears, generation, zodiac, fastMode } = req.body;

    if (!birthDate) {
      return res.status(400).json({ error: 'birthDate is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on server.',
        fallbackAvailable: true,
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Choose model based on user selection:
    // gemini-3.1-flash-lite for low-latency fast responses
    // gemini-3.8-flash for rich balanced overview
    const model = fastMode ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash';

    const prompt = `You are a cultural historian and celebratory biographer.
The user was born on ${birthDate} and is currently ${ageYears} years old (${generation}, ${zodiac} sign).
Provide a delightful, concise, inspiring "Life Era Capsule & Perspective" with 3 brief points:
1. Significant Cultural / World Event in their birth year (1-2 sentences)
2. A Unique Golden Milestone Reflection for someone at age ${ageYears} (1-2 sentences)
3. A memorable piece of trivia or nostalgic touchpoint from their growing years (1-2 sentences).
Keep the tone inspiring, respectful, and crisp. Avoid flowery clichés. Return valid JSON only with keys: "birthYearEvent", "milestoneReflection", "nostalgiaTrivia".`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from model');
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        birthYearEvent: text,
        milestoneReflection: `Reaching ${ageYears} years is a vibrant milestone of wisdom and experience.`,
        nostalgiaTrivia: `Your birth year marked a distinctive chapter in music, culture, and innovation.`,
      };
    }

    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating life insights:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate insights',
      fallbackAvailable: true,
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AgeCalc Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
