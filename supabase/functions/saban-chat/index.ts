import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    // Search inventory for matching products
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fuzzy search: check if any word in the message matches product name or SKU
    const words = message.toLowerCase().split(/\s+/).filter((w: string) => w.length > 2);
    
    let products: any[] = [];
    
    if (words.length > 0) {
      // Build an ilike query for fuzzy matching
      const { data } = await supabase
        .from("inventory")
        .select("*");
      
      if (data) {
        products = data.filter((p: any) => {
          const name = p.product_name.toLowerCase();
          const sku = p.sku.toLowerCase();
          return words.some((w: string) => name.includes(w) || sku.includes(w));
        });
      }
    }

    // If no fuzzy match, try getting all products for general queries
    if (products.length === 0 && (message.toLowerCase().includes("product") || message.toLowerCase().includes("show") || message.toLowerCase().includes("list") || message.toLowerCase().includes("all") || message.toLowerCase().includes("what"))) {
      const { data } = await supabase.from("inventory").select("*").limit(6);
      if (data) products = data;
    }

    // Build context for AI
    const productContext = products.length > 0
      ? `Found products:\n${products.map((p: any) => `- ${p.product_name} (SKU: ${p.sku}) - AED ${p.price} | Coverage: ${p.coverage_per_sqm} | Drying: ${p.drying_time}`).join("\n")}`
      : "No specific products matched the query.";

    // Call AI
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are Saban OS, an AI assistant for a construction supply business called Saban. You help customers find products, check prices, and get technical specifications. Be professional, helpful, and concise. Use emojis sparingly. When products are found, summarize them briefly — the UI will show detailed cards. If no products match, suggest what might be available or ask for clarification. Always be warm and professional.\n\nCurrent inventory context:\n${productContext}`
          },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const aiData = await aiResponse.json();
    const reply = aiData.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that. Could you try again?";

    return new Response(
      JSON.stringify({ reply, products }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ reply: "Something went wrong. Please try again.", products: [] }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
