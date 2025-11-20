export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  category: string[];
  description: string;
  medicinalProperties: string[];
  uses: string[];
  dosage: string;
  precautions: string[];
  regions: string[];
}

export const plantsData: Plant[] = [
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    image: "aloe-vera",
    category: ["Skin Care", "Digestive Health"],
    description: "Aloe vera is a succulent plant species known for its thick, fleshy leaves containing a clear gel with numerous medicinal properties. Used for thousands of years in traditional medicine.",
    medicinalProperties: [
      "Anti-inflammatory",
      "Antioxidant",
      "Antibacterial",
      "Wound healing",
      "Moisturizing"
    ],
    uses: [
      "Treats burns and skin wounds",
      "Relieves sunburn",
      "Moisturizes dry skin",
      "Aids digestive health",
      "Reduces inflammation"
    ],
    dosage: "Topical: Apply gel directly to affected area 2-3 times daily. Oral: 50-200mg of aloe latex or juice daily (consult healthcare provider).",
    precautions: [
      "Oral consumption may cause digestive upset",
      "Not recommended during pregnancy",
      "May interact with diabetes medications",
      "Patch test before widespread topical use"
    ],
    regions: ["Tropical and subtropical regions worldwide", "North Africa", "Mediterranean", "Southern USA"]
  },
  {
    id: "turmeric",
    name: "Turmeric",
    scientificName: "Curcuma longa",
    image: "turmeric",
    category: ["Anti-inflammatory", "Digestive Health", "Immunity"],
    description: "Turmeric is a flowering plant of the ginger family. Its rhizome (underground stem) is used as a culinary spice and traditional medicine, particularly valued for its active compound curcumin.",
    medicinalProperties: [
      "Powerful anti-inflammatory",
      "Strong antioxidant",
      "Antimicrobial",
      "Pain relief",
      "Neuroprotective"
    ],
    uses: [
      "Reduces inflammation and joint pain",
      "Supports digestive health",
      "Boosts immune system",
      "May improve brain function",
      "Aids wound healing"
    ],
    dosage: "500-2000mg of turmeric powder daily. For curcumin supplements: 500-1000mg daily with meals. Best absorbed with black pepper.",
    precautions: [
      "May interact with blood thinners",
      "High doses may cause digestive issues",
      "Not recommended before surgery",
      "Consult doctor if taking medications"
    ],
    regions: ["India", "Southeast Asia", "Indonesia", "China", "Tropical regions"]
  },
  {
    id: "lavender",
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    image: "lavender",
    category: ["Mental Health", "Sleep Aid", "Skin Care"],
    description: "Lavender is a flowering plant in the mint family, known for its distinctive purple flowers and calming fragrance. Widely used in aromatherapy and traditional medicine for its relaxing properties.",
    medicinalProperties: [
      "Anxiolytic (reduces anxiety)",
      "Sedative",
      "Antiseptic",
      "Anti-inflammatory",
      "Analgesic"
    ],
    uses: [
      "Promotes relaxation and sleep",
      "Reduces anxiety and stress",
      "Treats minor burns and insect bites",
      "Relieves headaches",
      "Antiseptic for wounds"
    ],
    dosage: "Essential oil: 2-3 drops in diffuser or diluted in carrier oil. Tea: 1-2 teaspoons dried flowers steeped in hot water. Tincture: 2-4ml up to 3 times daily.",
    precautions: [
      "Essential oil should not be ingested",
      "May cause drowsiness",
      "Avoid before surgery",
      "Dilute essential oil before skin application"
    ],
    regions: ["Mediterranean region", "Europe", "North America", "Australia", "Temperate climates"]
  },
  {
    id: "ginger",
    name: "Ginger",
    scientificName: "Zingiber officinale",
    image: "ginger",
    category: ["Digestive Health", "Anti-inflammatory", "Nausea Relief"],
    description: "Ginger is a flowering plant whose rhizome is widely used as a spice and folk medicine. Known for its distinctive spicy-sweet flavor and powerful medicinal compounds.",
    medicinalProperties: [
      "Anti-nausea",
      "Anti-inflammatory",
      "Antioxidant",
      "Antimicrobial",
      "Digestive stimulant"
    ],
    uses: [
      "Relieves nausea and motion sickness",
      "Reduces inflammation and pain",
      "Aids digestion",
      "May lower blood sugar",
      "Supports immune function"
    ],
    dosage: "Fresh ginger: 1-3g daily. Dried powder: 0.5-1g daily. Tea: 1-2 slices fresh ginger steeped in hot water. Supplements: Follow product instructions.",
    precautions: [
      "May interact with blood thinners",
      "High doses may cause heartburn",
      "Not recommended before surgery",
      "Consult doctor if taking medications"
    ],
    regions: ["Southeast Asia", "India", "China", "West Africa", "Caribbean", "Tropical regions"]
  },
  {
    id: "peppermint",
    name: "Peppermint",
    scientificName: "Mentha × piperita",
    image: "peppermint",
    category: ["Digestive Health", "Respiratory", "Pain Relief"],
    description: "Peppermint is a hybrid mint plant, a cross between watermint and spearmint. Its leaves and oil are used in traditional medicine, particularly for digestive and respiratory issues.",
    medicinalProperties: [
      "Antispasmodic",
      "Carminative (reduces gas)",
      "Analgesic",
      "Antibacterial",
      "Cooling sensation"
    ],
    uses: [
      "Relieves digestive discomfort and IBS",
      "Reduces headache pain",
      "Clears respiratory congestion",
      "Freshens breath",
      "Soothes muscle pain"
    ],
    dosage: "Tea: 1-2 teaspoons dried leaves steeped 5-10 minutes. Essential oil (topical): Dilute 2-3 drops in carrier oil. Capsules: 0.2-0.4ml oil 2-3 times daily.",
    precautions: [
      "May worsen acid reflux",
      "Not for infants or young children",
      "Essential oil can be toxic if ingested undiluted",
      "May interact with certain medications"
    ],
    regions: ["Europe", "North America", "Asia", "Temperate regions worldwide"]
  },
  {
    id: "chamomile",
    name: "Chamomile",
    scientificName: "Matricaria chamomilla",
    image: "chamomile",
    category: ["Sleep Aid", "Digestive Health", "Skin Care"],
    description: "Chamomile is a daisy-like plant whose flowers have been used in herbal medicine for centuries. Known for its gentle calming effects and apple-like fragrance.",
    medicinalProperties: [
      "Mild sedative",
      "Anti-inflammatory",
      "Antispasmodic",
      "Antibacterial",
      "Anxiolytic"
    ],
    uses: [
      "Promotes sleep and relaxation",
      "Soothes digestive upset",
      "Reduces inflammation",
      "Treats skin irritations",
      "Relieves menstrual cramps"
    ],
    dosage: "Tea: 1-2 teaspoons dried flowers steeped 5-10 minutes, up to 4 cups daily. Topical: Apply cooled tea or diluted extract to affected area. Tincture: 1-4ml up to 3 times daily.",
    precautions: [
      "May cause allergic reactions in people sensitive to ragweed",
      "Avoid if allergic to daisies or chrysanthemums",
      "May interact with blood thinners",
      "Use caution during pregnancy"
    ],
    regions: ["Europe", "Western Asia", "North Africa", "North America", "Temperate regions"]
  }
];

export const categories = [
  "All Plants",
  "Digestive Health",
  "Skin Care",
  "Anti-inflammatory",
  "Sleep Aid",
  "Mental Health",
  "Respiratory",
  "Pain Relief",
  "Immunity",
  "Nausea Relief"
];
