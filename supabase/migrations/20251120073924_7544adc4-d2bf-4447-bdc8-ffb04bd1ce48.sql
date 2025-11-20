-- Create comprehensive plants table for 1000+ medicinal plants
CREATE TABLE IF NOT EXISTS public.plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  common_names TEXT[] DEFAULT '{}',
  botanical_family TEXT,
  image_url TEXT,
  images TEXT[] DEFAULT '{}',
  category TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  medicinal_properties TEXT[] DEFAULT '{}',
  health_benefits TEXT[] DEFAULT '{}',
  traditional_uses TEXT[] DEFAULT '{}',
  scientific_uses TEXT[] DEFAULT '{}',
  active_compounds TEXT[] DEFAULT '{}',
  regions TEXT[] DEFAULT '{}',
  cultivation_details TEXT,
  dosage TEXT,
  precautions TEXT[] DEFAULT '{}',
  contraindications TEXT[] DEFAULT '{}',
  side_effects TEXT[] DEFAULT '{}',
  interactions TEXT[] DEFAULT '{}',
  scientific_references TEXT[] DEFAULT '{}',
  research_links TEXT[] DEFAULT '{}',
  related_plant_ids UUID[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  verified BOOLEAN DEFAULT false,
  quality_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_plants_name ON public.plants USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_plants_scientific_name ON public.plants USING gin(to_tsvector('english', scientific_name));
CREATE INDEX IF NOT EXISTS idx_plants_category ON public.plants USING gin(category);
CREATE INDEX IF NOT EXISTS idx_plants_regions ON public.plants USING gin(regions);
CREATE INDEX IF NOT EXISTS idx_plants_tags ON public.plants USING gin(tags);

-- Enable Row Level Security
ALTER TABLE public.plants ENABLE ROW LEVEL SECURITY;

-- Allow public read access to plants (educational app)
CREATE POLICY "Plants are viewable by everyone"
  ON public.plants
  FOR SELECT
  USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_plants_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS update_plants_updated_at ON public.plants;
CREATE TRIGGER update_plants_updated_at
  BEFORE UPDATE ON public.plants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_plants_updated_at();

-- Migrate existing data from plantsData.ts structure
-- This will preserve the 6 existing plants
INSERT INTO public.plants (
  name, 
  scientific_name, 
  image_url,
  category, 
  description, 
  medicinal_properties, 
  traditional_uses,
  dosage, 
  precautions, 
  regions,
  verified,
  quality_score
) VALUES
  ('Aloe Vera', 'Aloe barbadensis miller', 'aloe-vera', 
   ARRAY['Skin Care', 'Digestive Health'],
   'Aloe vera is a succulent plant species known for its thick, fleshy leaves containing a clear gel with numerous medicinal properties. Used for thousands of years in traditional medicine.',
   ARRAY['Anti-inflammatory', 'Antioxidant', 'Antibacterial', 'Wound healing', 'Moisturizing'],
   ARRAY['Treats burns and skin wounds', 'Relieves sunburn', 'Moisturizes dry skin', 'Aids digestive health', 'Reduces inflammation'],
   'Topical: Apply gel directly to affected area 2-3 times daily. Oral: 50-200mg of aloe latex or juice daily (consult healthcare provider).',
   ARRAY['Oral consumption may cause digestive upset', 'Not recommended during pregnancy', 'May interact with diabetes medications', 'Patch test before widespread topical use'],
   ARRAY['Tropical and subtropical regions worldwide', 'North Africa', 'Mediterranean', 'Southern USA'],
   true, 95),
  
  ('Turmeric', 'Curcuma longa', 'turmeric',
   ARRAY['Anti-inflammatory', 'Digestive Health', 'Immunity'],
   'Turmeric is a flowering plant of the ginger family. Its rhizome (underground stem) is used as a culinary spice and traditional medicine, particularly valued for its active compound curcumin.',
   ARRAY['Powerful anti-inflammatory', 'Strong antioxidant', 'Antimicrobial', 'Pain relief', 'Neuroprotective'],
   ARRAY['Reduces inflammation and joint pain', 'Supports digestive health', 'Boosts immune system', 'May improve brain function', 'Aids wound healing'],
   '500-2000mg of turmeric powder daily. For curcumin supplements: 500-1000mg daily with meals. Best absorbed with black pepper.',
   ARRAY['May interact with blood thinners', 'High doses may cause digestive issues', 'Not recommended before surgery', 'Consult doctor if taking medications'],
   ARRAY['India', 'Southeast Asia', 'Indonesia', 'China', 'Tropical regions'],
   true, 98),
  
  ('Lavender', 'Lavandula angustifolia', 'lavender',
   ARRAY['Mental Health', 'Sleep Aid', 'Skin Care'],
   'Lavender is a flowering plant in the mint family, known for its distinctive purple flowers and calming fragrance. Widely used in aromatherapy and traditional medicine for its relaxing properties.',
   ARRAY['Anxiolytic (reduces anxiety)', 'Sedative', 'Antiseptic', 'Anti-inflammatory', 'Analgesic'],
   ARRAY['Promotes relaxation and sleep', 'Reduces anxiety and stress', 'Treats minor burns and insect bites', 'Relieves headaches', 'Antiseptic for wounds'],
   'Essential oil: 2-3 drops in diffuser or diluted in carrier oil. Tea: 1-2 teaspoons dried flowers steeped in hot water. Tincture: 2-4ml up to 3 times daily.',
   ARRAY['Essential oil should not be ingested', 'May cause drowsiness', 'Avoid before surgery', 'Dilute essential oil before skin application'],
   ARRAY['Mediterranean region', 'Europe', 'North America', 'Australia', 'Temperate climates'],
   true, 92),
  
  ('Ginger', 'Zingiber officinale', 'ginger',
   ARRAY['Digestive Health', 'Anti-inflammatory', 'Nausea Relief'],
   'Ginger is a flowering plant whose rhizome is widely used as a spice and folk medicine. Known for its distinctive spicy-sweet flavor and powerful medicinal compounds.',
   ARRAY['Anti-nausea', 'Anti-inflammatory', 'Antioxidant', 'Antimicrobial', 'Digestive stimulant'],
   ARRAY['Relieves nausea and motion sickness', 'Reduces inflammation and pain', 'Aids digestion', 'May lower blood sugar', 'Supports immune function'],
   'Fresh ginger: 1-3g daily. Dried powder: 0.5-1g daily. Tea: 1-2 slices fresh ginger steeped in hot water. Supplements: Follow product instructions.',
   ARRAY['May interact with blood thinners', 'High doses may cause heartburn', 'Not recommended before surgery', 'Consult doctor if taking medications'],
   ARRAY['Southeast Asia', 'India', 'China', 'West Africa', 'Caribbean', 'Tropical regions'],
   true, 94),
  
  ('Peppermint', 'Mentha × piperita', 'peppermint',
   ARRAY['Digestive Health', 'Respiratory', 'Pain Relief'],
   'Peppermint is a hybrid mint plant, a cross between watermint and spearmint. Its leaves and oil are used in traditional medicine, particularly for digestive and respiratory issues.',
   ARRAY['Antispasmodic', 'Carminative (reduces gas)', 'Analgesic', 'Antibacterial', 'Cooling sensation'],
   ARRAY['Relieves digestive discomfort and IBS', 'Reduces headache pain', 'Clears respiratory congestion', 'Freshens breath', 'Soothes muscle pain'],
   'Tea: 1-2 teaspoons dried leaves steeped 5-10 minutes. Essential oil (topical): Dilute 2-3 drops in carrier oil. Capsules: 0.2-0.4ml oil 2-3 times daily.',
   ARRAY['May worsen acid reflux', 'Not for infants or young children', 'Essential oil can be toxic if ingested undiluted', 'May interact with certain medications'],
   ARRAY['Europe', 'North America', 'Asia', 'Temperate regions worldwide'],
   true, 90),
  
  ('Chamomile', 'Matricaria chamomilla', 'chamomile',
   ARRAY['Sleep Aid', 'Digestive Health', 'Skin Care'],
   'Chamomile is a daisy-like plant whose flowers have been used in herbal medicine for centuries. Known for its gentle calming effects and apple-like fragrance.',
   ARRAY['Mild sedative', 'Anti-inflammatory', 'Antispasmodic', 'Antibacterial', 'Anxiolytic'],
   ARRAY['Promotes sleep and relaxation', 'Soothes digestive upset', 'Reduces inflammation', 'Treats skin irritations', 'Relieves menstrual cramps'],
   'Tea: 1-2 teaspoons dried flowers steeped 5-10 minutes, up to 4 cups daily. Topical: Apply cooled tea or diluted extract to affected area. Tincture: 1-4ml up to 3 times daily.',
   ARRAY['May cause allergic reactions in people sensitive to ragweed', 'Avoid if allergic to daisies or chrysanthemums', 'May interact with blood thinners', 'Use caution during pregnancy'],
   ARRAY['Europe', 'Western Asia', 'North Africa', 'North America', 'Temperate regions'],
   true, 88)
ON CONFLICT DO NOTHING;