import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.84.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { disease } = await req.json();
    
    if (!disease || disease.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Disease/symptom is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all plants from database
    const { data: plants, error: dbError } = await supabase
      .from('plants')
      .select('*');

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to fetch plants from database');
    }

    // Create a simplified plant data for AI context
    const plantsContext = plants?.map(p => ({
      id: p.id,
      name: p.name,
      scientific_name: p.scientific_name,
      medicinal_properties: p.medicinal_properties,
      health_benefits: p.health_benefits,
      traditional_uses: p.traditional_uses,
      category: p.category
    })) || [];

    // Call Lovable AI for intelligent matching
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a medicinal plant expert. Given a disease or symptom and a list of medicinal plants, recommend the TOP 3-5 most relevant plants that could help with the condition. 

IMPORTANT: You must respond with ONLY a valid JSON array of plant IDs, nothing else. Format: ["plant-id-1", "plant-id-2", "plant-id-3"]

Consider:
- Medicinal properties and health benefits
- Traditional uses for the condition
- Safety and common usage
- Scientific backing when available

Available plants database:
${JSON.stringify(plantsContext, null, 2)}`
          },
          {
            role: 'user',
            content: `What medicinal plants would help with: ${disease}?`
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiResponseText = aiData.choices[0].message.content.trim();
    
    // Parse the AI response to get plant IDs
    let suggestedPlantIds: string[] = [];
    try {
      // Extract JSON array from response
      const jsonMatch = aiResponseText.match(/\[.*\]/s);
      if (jsonMatch) {
        suggestedPlantIds = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback: return all plants
      suggestedPlantIds = plants?.map(p => p.id).slice(0, 5) || [];
    }

    // Get full plant details for suggested plants
    const suggestedPlants = plants?.filter(p => suggestedPlantIds.includes(p.id)) || [];

    // If AI didn't return enough plants, do a text-based fallback search
    if (suggestedPlants.length < 3) {
      const fallbackPlants = plants?.filter(p => {
        const searchText = `${p.name} ${p.description} ${p.medicinal_properties?.join(' ')} ${p.health_benefits?.join(' ')}`.toLowerCase();
        return searchText.includes(disease.toLowerCase());
      }).slice(0, 5) || [];
      
      // Merge and deduplicate
      const allPlants = [...suggestedPlants, ...fallbackPlants];
      const uniquePlants = Array.from(new Map(allPlants.map(p => [p.id, p])).values()).slice(0, 5);
      
      return new Response(
        JSON.stringify({ 
          suggestions: uniquePlants,
          count: uniquePlants.length,
          query: disease
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        suggestions: suggestedPlants,
        count: suggestedPlants.length,
        query: disease
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in suggest-plants function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});