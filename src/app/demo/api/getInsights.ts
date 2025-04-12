// /pages/api/getInsights.ts

import type { NextApiRequest, NextApiResponse } from "next";

type InsightsResponse = {
  tam: string;
  sam: string;
  som: string;
  competitor: string;
  startupGrade: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InsightsResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { startupName } = req.body;
  if (!startupName) {
    return res.status(400).json({ error: "Missing startupName" });
  }

  try {
    // Use your environment variables for security.
    const apiUrl = process.env.GEMINI_FLASH_API_URL as string;
    const apiKey = process.env.GEMINI_FLASH_API_KEY as string;

    // Call Gemini Flash API.
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        // Adjust your prompt, parameters, etc. based on Gemini Flash API docs:
        prompt: `Generate market insights for startup "${startupName}": analyze TAM, SAM, SOM, competitor insights and provide a startup grade.`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${errorText}`);
    }

    const data = await response.json();

    // Transform the Gemini API response to your expected data structure.
    // (Update these field names based on the actual response structure.)
    const insights: InsightsResponse = {
      tam: data.tam || "N/A",
      sam: data.sam || "N/A",
      som: data.som || "N/A",
      competitor: data.competitor || "No data available",
      startupGrade: data.startupGrade || "N/A",
    };

    res.status(200).json(insights);
  } catch (error: unknown) {
    console.error("Error fetching insights:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Internal server error while fetching insights.";

    res.status(500).json({ error: errorMessage });
  }
}
