/**
 * generate-greeting-audio.mjs
 *
 * One-time script to pre-generate the greeting voice audio.
 * Run this whenever GREETING_TEXT changes in App.tsx.
 *
 * Usage:
 *   node scripts/generate-greeting-audio.mjs
 *
 * Requires GEMINI_API_KEY in ChatBot/.env.local (or set in env).
 * Output: ChatBot/public/greeting.b64  (raw base64 PCM, 24 kHz mono)
 */

import { GoogleGenAI } from '@google/genai';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// ── Load .env.local ───────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env.local');
if (existsSync(envPath)) {
  const lines = readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
}

// ── Greeting text — keep in sync with GREETING_TEXT in App.tsx ───────────────
const GREETING_TEXT = `Hello! I am Ivan's AI Assistant. I'm here to help you explore Ivan's expertise as an AI Media & Content Designer, AI Workflow Specialist, and VFX Compositor.\n\nFeel free to write in your preferred language — I speak many languages.\n\nI operate under strict GDPR guidelines—you can delete your chat history at any time using the trash icon in the top right. How can I help you today?`;

// ─────────────────────────────────────────────────────────────────────────────

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Error: GEMINI_API_KEY not found. Set it in ChatBot/.env.local');
  process.exit(1);
}

console.log('Generating greeting audio via Gemini TTS...');

const ai = new GoogleGenAI({ apiKey });

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-preview-tts',
  contents: [{ parts: [{ text: `Read this naturally: ${GREETING_TEXT}` }] }],
  config: {
    responseModalities: ['AUDIO'],
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: { voiceName: 'Kore' },
      },
    },
  },
});

const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
if (!audioData) {
  console.error('Error: No audio data returned from Gemini API.');
  process.exit(1);
}

const outDir = path.resolve(__dirname, '../public');
if (!existsSync(outDir)) mkdirSync(outDir);

const outFile = path.join(outDir, 'greeting.b64');
writeFileSync(outFile, audioData, 'utf-8');

console.log(`Done! Saved to: ${outFile}`);
console.log(`File size: ${(audioData.length / 1024).toFixed(1)} KB`);
