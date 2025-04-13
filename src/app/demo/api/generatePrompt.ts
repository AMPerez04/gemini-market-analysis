  export const generatePrompt = (startupIdea: string): string => {
    return `You are a seasoned market research expert. Analyze the startup idea "${startupIdea}" and provide thoughtful and well-reasoned market insights. Carefully consider and estimate the following values based on realistic assumptions and available data:
      1. Total Addressable Market (TAM): Estimate the overall revenue opportunity, formatted as a value like "1B" if in billions.
      2. Serviceable Available Market (SAM): Estimate the portion of TAM that is realistically addressable (e.g., "500M" for 500 million).
      3. Serviceable Obtainable Market (SOM): Estimate the share of SAM the startup can obtain, formatted similarly.
      4. Competitor Analysis: Provide a concise but insightful description of major competitors or the competitive landscape.
      5. Startup Grade: Based on potential, risk, and innovation, assign a grade on a scale from F to A+.

      Take your time to ensure the estimates are logical, data-driven, and well-justified. Return your output strictly as JSON with exactly these keys:
      {
        "tam": "<TAM value>",
        "sam": "<SAM value>",
        "som": "<SOM value>",
        "competitor": "<Competitor analysis>",
        "startupGrade": "<Letter grade (e.g., A+)>"
      }
      Only output the JSON without any extra commentary.
      Do not include any markdown code fences or other formatting.`;
  };