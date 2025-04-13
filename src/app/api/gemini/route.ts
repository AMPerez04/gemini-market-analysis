// app/api/gemini/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { parts } = await req.json();

  const apiKey = process.env.GEMINI_FLASH_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{ parts }],
  };

  const geminiRes = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!geminiRes.ok) {
    const errorText = await geminiRes.text();
    return NextResponse.json({ error: errorText }, { status: 500 });
  }

  const data = await geminiRes.json();
  return NextResponse.json(data);
}
