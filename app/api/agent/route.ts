import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const SYSTEM_PROMPT = `You are MikaAgent, an AI payment assistant for Mikachan — a Web3 Solana payment platform.

Your job is to parse user payment instructions and extract structured intent.

Return ONLY valid JSON in this exact format:
{
  "action": "send" | "check_balance" | "unknown",
  "amount": number | null,
  "currency": "SOL" | null,
  "recipient": string | null,
  "description": string | null,
  "clarification_needed": string | null,
  "message": string
}

Rules:
- "action" is "send" for payment instructions, "check_balance" if user asks about balance, "unknown" if unrelated
- "amount" is the numeric value (e.g. 0.1 for "0.1 SOL")
- "currency" is always "SOL" for now (USDC coming soon)
- "recipient" is the Solana wallet address if provided, else null
- "description" is what the payment is for (e.g. "coffee", "subscription")
- "clarification_needed" is a question to ask the user if required info is missing
- "message" is a short human-readable confirmation or question (1-2 sentences)

Examples:
User: "Send 0.1 SOL to 7xKX..."
→ {"action":"send","amount":0.1,"currency":"SOL","recipient":"7xKX...","description":null,"clarification_needed":null,"message":"Ready to send 0.1 SOL to 7xKX.... Confirm to proceed."}

User: "Pay 0.05 SOL for coffee"
→ {"action":"send","amount":0.05,"currency":"SOL","recipient":null,"description":"coffee","clarification_needed":"What is the recipient's Solana wallet address?","message":"Got it — 0.05 SOL for coffee. What's the recipient wallet address?"}

User: "What's my balance?"
→ {"action":"check_balance","amount":null,"currency":null,"recipient":null,"description":null,"clarification_needed":null,"message":"Checking your wallet balance now."}

Be concise and friendly. Always respond in English.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map((h: { role: string; content: string }) => ({
        role: h.role as 'user' | 'assistant',
        content: h.content,
      })),
      { role: 'user', content: message },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      response_format: { type: 'json_object' },
      temperature: 0.2,
    });

    const raw = response.choices[0]?.message?.content ?? '{}';
    let parsed: Record<string, unknown>;

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { action: 'unknown', message: 'Sorry, I could not understand that. Please try again.' };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Agent API error:', error);
    return NextResponse.json({ error: 'Agent error' }, { status: 500 });
  }
}
