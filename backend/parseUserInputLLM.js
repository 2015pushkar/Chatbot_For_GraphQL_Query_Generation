// parseUserInputLLM.js
require("dotenv").config(); // Load environment variables
const fetch = global.fetch || require("node-fetch");

async function parseUserInputLLM(userInput) {
  // Modified prompt with explicit allowed values for each field
  const prompt = `
You are a friendly assistant that extracts search filters from a natural language query about patient records.
The possible keys to extract are:
- "race": one or more of: White, Black or African American, Other, Unknown, Not Reported, American Indian or Alaska Native, Native Hawaiian or Other Pacific Islander, Asian, Multiracial.
- "sex": one or more of: Male, Female, Undifferentiated, Not Reported, Other.
- "ethnicity": one or more of: Hispanic or Latino, Not Hispanic or Latino, Unknown, Not Reported.
- "minAge": a number (in days), if mentioned.
- "histology": free text for diagnosis (e.g., Neuroblastoma, Rhabdomyosarcoma, etc.).

Return only a valid JSON object with the keys found. If multiple values are mentioned for a key, output them as an array. Do not include any extra text.

For example, if the input is:
"Show me White and Black female patients under 10 with Neuroblastoma and Embryonal rhabdomyosarcoma"
then output:
{"race": ["White", "Black or African American"], "sex": "Female", "minAge": 10, "histology": ["Neuroblastoma", "Embryonal rhabdomyosarcoma"]}

Now, please extract the filters from the following input:
"${userInput}"
JSON output only:
`;

  const payload = {
    model: "deepseek/deepseek-r1:free",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();

    const resultText = data.choices[0].message.content.trim();
    // Remove markdown code fences if they exist
    const cleanResult = resultText.replace(/^```(?:json)?\s*|```$/g, "");
    return JSON.parse(cleanResult);
  } catch (error) {
    console.error("Error calling DeepSeek R1:", error);
    return {};
  }
}

module.exports = parseUserInputLLM;
