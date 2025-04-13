interface ContentPart {
  text: string;
}

interface GenerateContentRequest {
  parts: ContentPart[];
}

// Match the fields returned by your Gemini API proxy
interface GeminiResponse {
  tam?: string;
  sam?: string;
  som?: string;
  competitor?: string;
  startupGrade?: string;
  // Add more as needed
}

export default async function generateContent(
  parts: ContentPart[]
): Promise<GeminiResponse> {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ parts }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error: ${res.status} - ${errorText}`);
  }

  return await res.json();
}
