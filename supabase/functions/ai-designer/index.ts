import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    // Define the system instruction for the style
    const systemPrompt = `You are a sneaker designer AI. Based on the user's mood, theme, or style description, generate a color scheme for a sneaker.

    You MUST respond with ONLY a valid JSON object in this exact format, no other text:
    {
      "sole": "#hexcolor",
      "upper": "#hexcolor", 
      "laces": "#hexcolor",
      "logo": "#hexcolor"
    }

    Rules:
    - All colors must be valid 6-digit hex codes starting with #
    - Choose colors that work well together and match the described mood
    - Be creative but ensure good contrast and visibility
    - The logo should be visible against the upper color`;

    // Call Gemini API directly
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: systemPrompt + "\n\nUser Request: " + prompt }]
          }],
          // Force JSON response to ensure we get clean data
          generationConfig: {
            responseMimeType: "application/json"
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      throw new Error(`Gemini API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    // Extract the text from Gemini's response structure
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON string into an object
    let colors;
    try {
      colors = JSON.parse(content);
    } catch (e) {
      console.error("JSON Parse Error:", content);
      throw new Error("AI returned invalid JSON format");
    }

    // Validate the keys exist
    const requiredKeys = ["sole", "upper", "laces", "logo"];
    for (const key of requiredKeys) {
      if (!colors[key] || !/^#[0-9A-Fa-f]{6}$/.test(colors[key])) {
        // Fallback for invalid colors if necessary, or throw error
        console.warn(`Invalid color for ${key}, using fallback`);
        colors[key] = "#000000"; 
      }
    }

    return new Response(
      JSON.stringify({ colors }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("AI Designer error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});