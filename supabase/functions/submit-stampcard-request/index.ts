import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.56.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestPayload {
  name: string;
  email: string;
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Vain POST-pyynnöt sallittu" }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { name, email }: RequestPayload = await req.json();

    // Validate input
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Nimi ja sähköpostiosoite ovat pakollisia" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Validate name length
    if (name.trim().length < 2) {
      return new Response(
        JSON.stringify({ error: "Nimen on oltava vähintään 2 merkkiä pitkä" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Virheellinen sähköpostiosoite" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase credentials");
      return new Response(
        JSON.stringify({ error: "Palvelinvirhe: Puuttuvat tunnistetiedot" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if email already exists in stamp_cards table
    const { data: existingStampCard, error: stampCardError } = await supabase
      .from("stamp_cards")
      .select("email")
      .ilike("email", email)
      .maybeSingle();

    if (stampCardError) {
      console.error("Error checking existing stamp card:", stampCardError);
      return new Response(
        JSON.stringify({ error: "Palvelinvirhe leimakorttihaun aikana" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (existingStampCard) {
      return new Response(
        JSON.stringify({ 
          error: "Tällä sähköpostiosoitteella on jo leimakortti. Käytä leimakorttiasi kirjautumalla sisään sähköpostiosoitteellasi."
        }),
        {
          status: 409,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Check if there's already a pending request with this email
    const { data: existingRequest, error: requestError } = await supabase
      .from("stamp_card_requests")
      .select("*")
      .ilike("email", email)
      .eq("status", "pending")
      .maybeSingle();

    if (requestError) {
      console.error("Error checking existing request:", requestError);
      return new Response(
        JSON.stringify({ error: "Palvelinvirhe pyynnön tarkistuksen aikana" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (existingRequest) {
      return new Response(
        JSON.stringify({ 
          error: "Olet jo lähettänyt pyynnön tällä sähköpostiosoitteella. Pyyntösi on käsittelyssä.",
          requestDate: existingRequest.created_at
        }),
        {
          status: 409,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Insert the new request
    const { data: newRequest, error: insertError } = await supabase
      .from("stamp_card_requests")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        status: "pending",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting request:", insertError);
      return new Response(
        JSON.stringify({ error: "Pyynnön lähettäminen epäonnistui. Yritä uudelleen." }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Pyyntösi on vastaanotettu! Otamme sinuun yhteyttä pian.",
        requestId: newRequest.id
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Odottamaton palvelinvirhe. Yritä uudelleen myöhemmin." }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});