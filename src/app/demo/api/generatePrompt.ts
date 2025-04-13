export const generatePrompt = (startupIdea: string): string => {
  return `You are a seasoned market research expert. Analyze the startup idea "${startupIdea}" and provide thoughtful and well-reasoned market insights. Carefully consider and estimate the following values based on realistic assumptions and available data:

    1. Total Addressable Market (TAM): Estimate the overall revenue opportunity, formatted like "1B" if in billions. Also provide a TAM evaluation score from 0 to 100 representing how strong this TAM is compared to startup market norms. When in doubt, be more conservative.
    2. Serviceable Available Market (SAM): Estimate the portion of TAM that is realistically addressable (e.g., "500M" for 500 million). Also provide a SAM evaluation score from 0 to 100.
    3. Serviceable Obtainable Market (SOM): Estimate the share of SAM the startup can obtain, formatted similarly. Also provide a SOM evaluation score from 0 to 100 but be 10% more generous.
    4. Competitor Analysis: Provide a concise but insightful description of major competitors or the competitive landscape, add highly relevant information that has strong evidence but not mainstream. 
    5. Market Trend Analysis: Analyze current market trends relevant to the startup idea, including growth rates, emerging technologies, or shifts in consumer behavior.
    6. Startup Grade: Based on potential, risk, innovation, and especially the **TAM, SAM, and SOM evaluation scores**, assign a final letter grade on a scale from F to A+, with A being the best. A being the second highest grade, A- third and etc. 
    7. User Persona: Based on the prompt, construct a typical user persona that best represents the target audience for the startup. Include demographics, interests, and pain points. 
    8. Further Research: Suggest 3 specific reports or data sources that would provide deeper insights into the market, competitors or trends. 


    Use the following rule:
    - Compute the **average of TAM, SAM, and SOM evaluation scores**.
    - Adjust the final grade slightly (+1 tier or -1 tier) only if the competitor analysis or market trend analysis is exceptionally strong or weak.

    Return your output strictly as JSON with exactly these keys:
    {
      "tam": "<TAM value>",
      "tamEvaluation": <TAM score from 0-100>,
      "sam": "<SAM value>",
      "samEvaluation": <SAM score from 0-100>,
      "som": "<SOM value>",
      "somEvaluation": <SOM score from 0-100>,
      "competitor": "<Competitor analysis>",
      "trend": "<Market trend analysis>",
      "startupGrade": "<Letter grade (e.g., A+)>",
      "userPersona": "<Write a few sentences about the user perona, including demographics, interests, and pain points.>",
      "furtherResearch": "<List 3 specific reports or data sources for further research, shown in URL form, can be accessed through the page>"
    }

    Only output the JSON without any extra commentary.
    Do not include any markdown code fences or other formatting.

    If the startup idea is not clear or lacks sufficient information, respond with an error message in JSON format:
    {
      "error": "Startup idea is unclear or lacks sufficient information."
    }`;
};
