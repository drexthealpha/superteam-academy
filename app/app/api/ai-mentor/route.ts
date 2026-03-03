import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code, error, locale } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ explanation: "Gemini API key not configured." }, { status: 500 });
    const genAI = new GoogleGenerativeAI(apiKey);
    const lang = locale === "pt-BR" ? "Portuguese (Brazilian)" : locale === "es" ? "Spanish" : "English";
    const prompt = "You are a friendly Solana/Rust senior developer mentor. A student got this error.\n\nCODE:\n" + code + "\n\nERROR:\n" + error + "\n\nExplain in " + lang + " what went wrong simply and give the exact fix. Be encouraging. Under 150 words.";
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return NextResponse.json({ explanation: text });
  } catch (e: any) {
    return NextResponse.json({ explanation: "Error: " + e.message }, { status: 500 });
  }
}