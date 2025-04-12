

interface ContentPart {
    text: string;
  }
  
  interface GenerateContentRequest {
    contents: Array<{
      parts: ContentPart[];
    }>;
  }
  
  // Adjust this interface based on the actual Gemini Flash API response.
  interface GeminiResponse {
    // For example:
    tam?: string;
    sam?: string;
    som?: string;
    competitor?: string;
    startupGrade?: string;
    // You can include any additional fields provided by the response.
  }
  
  export default 
  async function generateContent(
    parts: ContentPart[]
  ): Promise<GeminiResponse> {
    // It's recommended to store your API key in environment variables.
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_FLASH_API_KEY || "badapikey";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody: GenerateContentRequest = {
      contents: [
        {
          parts,
        },
      ],
    };
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }
    
    return await response.json();
}