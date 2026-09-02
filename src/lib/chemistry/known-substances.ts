export interface SubstanceInfo {
  name: string;
  color: string;
  opacity: number;
  state: "liquid" | "solid" | "gas" | "powder" | "solution" | "indicator" | "metal" | "tissue";
  description: string;
  bubbleEffect?: boolean;
  cloudyEffect?: boolean;
}

export const KNOWN_SUBSTANCES: Record<string, SubstanceInfo> = {
  // Acids & Bases
  hydrochloric_acid: {
    name: "Dilute Hydrochloric Acid (HCl)",
    color: "#e0f2fe",
    opacity: 0.45,
    state: "solution",
    description: "Clear, colorless aqueous acid solution.",
  },
  sulfuric_acid: {
    name: "Dilute Sulfuric Acid (H₂SO₄)",
    color: "#f0f9ff",
    opacity: 0.4,
    state: "solution",
    description: "Clear, colorless strong mineral acid.",
  },
  sodium_hydroxide: {
    name: "Sodium Hydroxide (NaOH)",
    color: "#f8fafc",
    opacity: 0.35,
    state: "solution",
    description: "Clear, colorless alkaline caustic solution.",
  },

  // Inorganic Salts & Solutions
  copper_sulfate: {
    name: "Copper(II) Sulfate (CuSO₄)",
    color: "#2563eb",
    opacity: 0.85,
    state: "solution",
    description: "Vivid royal blue aqueous copper solution.",
  },
  potassium_permanganate: {
    name: "Potassium Permanganate (KMnO₄)",
    color: "#7e22ce",
    opacity: 0.9,
    state: "solution",
    description: "Deep intense purple oxidizing agent.",
  },
  limewater: {
    name: "Limewater (Calcium Hydroxide)",
    color: "#f8fafc",
    opacity: 0.3,
    state: "solution",
    description: "Clear solution used to test for Carbon Dioxide.",
  },
  limewater_cloudy: {
    name: "Milky Limewater (CaCO₃ precipitate)",
    color: "#f8fafc",
    opacity: 0.95,
    state: "solution",
    description: "Milky white suspension formed when CO₂ reacts with limewater.",
    cloudyEffect: true,
  },

  // Indicators & Color Reagents
  litmus_red: {
    name: "Red Litmus Paper / Solution",
    color: "#ef4444",
    opacity: 0.9,
    state: "indicator",
    description: "Acidic indicator state (Red). Turns blue in alkaline solution.",
  },
  litmus_blue: {
    name: "Blue Litmus Paper / Solution",
    color: "#3b82f6",
    opacity: 0.9,
    state: "indicator",
    description: "Basic indicator state (Blue). Turns red in acidic solution.",
  },
  phenolphthalein_neutral: {
    name: "Phenolphthalein Indicator",
    color: "#ffffff",
    opacity: 0.15,
    state: "indicator",
    description: "Colorless in neutral or acidic media.",
  },
  phenolphthalein_pink: {
    name: "Phenolphthalein (Pink)",
    color: "#ec4899",
    opacity: 0.85,
    state: "indicator",
    description: "Vivid bright pink in basic/alkaline solution (pH > 8.2).",
  },
  methyl_orange: {
    name: "Methyl Orange Indicator",
    color: "#f97316",
    opacity: 0.85,
    state: "indicator",
    description: "Orange indicator; red in acid (pH < 3.1), yellow in base.",
  },
  universal_indicator: {
    name: "Universal Indicator (pH 7)",
    color: "#22c55e",
    opacity: 0.85,
    state: "indicator",
    description: "Green at neutral pH 7; ranges from red (acid) to purple (base).",
  },
  iodine_solution: {
    name: "Iodine Reagent",
    color: "#b45309",
    opacity: 0.85,
    state: "solution",
    description: "Golden amber-brown iodine solution.",
  },
  starch_iodine_complex: {
    name: "Starch-Iodine Complex",
    color: "#1e1b4b",
    opacity: 0.95,
    state: "solution",
    description: "Deep blue-black coloration indicating presence of starch.",
  },
  benedicts_solution: {
    name: "Benedict's Reagent",
    color: "#0284c7",
    opacity: 0.85,
    state: "solution",
    description: "Clear blue copper-based reagent for reducing sugars.",
  },
  benedicts_brick_red: {
    name: "Benedict's Precipitate (Brick Red)",
    color: "#dc2626",
    opacity: 0.95,
    state: "solution",
    description: "Brick red Cu₂O precipitate indicating high concentration of sugar.",
    cloudyEffect: true,
  },

  // Biochemical & Organic Substances
  starch_solution: {
    name: "Starch Solution",
    color: "#fef08a",
    opacity: 0.4,
    state: "solution",
    description: "Translucent pale whitish-yellow carbohydrate colloidal solution.",
  },
  amylase_enzyme: {
    name: "Salivary Amylase Enzyme",
    color: "#fef3c7",
    opacity: 0.5,
    state: "solution",
    description: "Slightly cloudy tan enzyme solution.",
  },
  ethanol: {
    name: "Ethanol / Boiling Alcohol",
    color: "#fef9c3",
    opacity: 0.35,
    state: "liquid",
    description: "Clear flammable organic solvent.",
  },
  chlorophyll_extract: {
    name: "Chlorophyll Extract",
    color: "#16a34a",
    opacity: 0.85,
    state: "solution",
    description: "Rich emerald green plant photosynthetic pigment.",
  },

  // Metals & Solids
  sodium_metal: {
    name: "Sodium Metal (Na)",
    color: "#94a3b8",
    opacity: 1.0,
    state: "metal",
    description: "Soft, silvery-grey reactive alkali metal.",
  },
  magnesium_ribbon: {
    name: "Magnesium Ribbon (Mg)",
    color: "#cbd5e1",
    opacity: 1.0,
    state: "metal",
    description: "Shiny metallic silver ribbon.",
  },
  marble_chips: {
    name: "Calcium Carbonate (Marble Chips)",
    color: "#f8fafc",
    opacity: 0.95,
    state: "solid",
    description: "White crystalline solid chips.",
  },

  // Solvents & Common
  water: {
    name: "Distilled Water (H₂O)",
    color: "#38bdf8",
    opacity: 0.35,
    state: "liquid",
    description: "Clear pure water.",
  },
};

/**
 * Returns accurate color and state information for any chemical or apparatus item string.
 */
export function getSubstanceInfo(itemIdOrName: string): SubstanceInfo {
  const norm = itemIdOrName.toLowerCase().replace(/[^a-z0-9]/g, "_");

  if (norm.includes("hcl") || norm.includes("hydrochloric") || norm.includes("acid")) {
    if (norm.includes("sulfuric")) return KNOWN_SUBSTANCES.sulfuric_acid;
    return KNOWN_SUBSTANCES.hydrochloric_acid;
  }
  if (norm.includes("copper") || norm.includes("cuso4")) {
    return KNOWN_SUBSTANCES.copper_sulfate;
  }
  if (norm.includes("permanganate") || norm.includes("kmno4")) {
    return KNOWN_SUBSTANCES.potassium_permanganate;
  }
  if (norm.includes("limewater")) {
    return KNOWN_SUBSTANCES.limewater;
  }
  if (norm.includes("iodine")) {
    return KNOWN_SUBSTANCES.iodine_solution;
  }
  if (norm.includes("starch") && (norm.includes("complex") || norm.includes("black"))) {
    return KNOWN_SUBSTANCES.starch_iodine_complex;
  }
  if (norm.includes("starch")) {
    return KNOWN_SUBSTANCES.starch_solution;
  }
  if (norm.includes("phenolphthalein")) {
    return KNOWN_SUBSTANCES.phenolphthalein_neutral;
  }
  if (norm.includes("litmus")) {
    if (norm.includes("red")) return KNOWN_SUBSTANCES.litmus_red;
    return KNOWN_SUBSTANCES.litmus_blue;
  }
  if (norm.includes("benedict")) {
    return KNOWN_SUBSTANCES.benedicts_solution;
  }
  if (norm.includes("amylase")) {
    return KNOWN_SUBSTANCES.amylase_enzyme;
  }
  if (norm.includes("alcohol") || norm.includes("ethanol")) {
    return KNOWN_SUBSTANCES.ethanol;
  }
  if (norm.includes("sodium_metal") || norm.includes("sodium_piece") || (norm.includes("sodium") && !norm.includes("hydroxide"))) {
    return KNOWN_SUBSTANCES.sodium_metal;
  }
  if (norm.includes("naoh") || norm.includes("sodium_hydroxide")) {
    return KNOWN_SUBSTANCES.sodium_hydroxide;
  }
  if (norm.includes("magnesium")) {
    return KNOWN_SUBSTANCES.magnesium_ribbon;
  }
  if (norm.includes("marble") || norm.includes("calcium_carbonate")) {
    return KNOWN_SUBSTANCES.marble_chips;
  }

  // Default water/clear liquid fallback
  return KNOWN_SUBSTANCES.water;
}

/**
 * Calculates resultant color and state given combined items and step result overrides.
 */
export function getResultantAppearance(
  accumulatedItems: string[],
  stepResultColor?: string,
  stepResultState?: string
): { color: string; opacity: number; stateEffect?: string; description?: string } {
  // If explicitly overridden in the experiment step definition:
  if (stepResultColor) {
    let opacity = 0.85;
    if (stepResultColor.toLowerCase().includes("milky") || stepResultColor.toLowerCase().includes("white")) {
      return { color: "#f8fafc", opacity: 0.95, stateEffect: stepResultState || "turns_cloudy" };
    }
    if (stepResultColor.toLowerCase().includes("blue") && stepResultColor.toLowerCase().includes("black")) {
      return { color: "#1e1b4b", opacity: 0.95, stateEffect: stepResultState || "color_change" };
    }
    if (stepResultColor.toLowerCase().includes("pink") || stepResultColor.toLowerCase().includes("magenta")) {
      return { color: "#ec4899", opacity: 0.85, stateEffect: stepResultState || "color_change" };
    }
    if (stepResultColor.toLowerCase().includes("red")) {
      return { color: "#ef4444", opacity: 0.9, stateEffect: stepResultState || "color_change" };
    }
    if (stepResultColor.toLowerCase().includes("purple")) {
      return { color: "#7e22ce", opacity: 0.9, stateEffect: stepResultState || "color_change" };
    }
    // Hex code check
    if (stepResultColor.startsWith("#")) {
      return { color: stepResultColor, opacity, stateEffect: stepResultState };
    }
  }

  const normItems = accumulatedItems.map((i) => i.toLowerCase().replace(/[^a-z0-9]/g, "_"));

  // Reaction Logic 1: Limewater + Carbon Dioxide -> Milky White CaCO3
  const hasLimewater = normItems.some((i) => i.includes("limewater"));
  const hasCo2 = normItems.some((i) => i.includes("co2") || i.includes("carbon_dioxide") || i.includes("delivery"));
  if (hasLimewater && hasCo2) {
    return {
      color: "#f8fafc",
      opacity: 0.95,
      stateEffect: "turns_cloudy",
      description: "Milky white suspension (Calcium Carbonate precipitate)",
    };
  }

  // Reaction Logic 2: Starch + Iodine -> Dark Blue-Black Complex
  const hasStarch = normItems.some((i) => i.includes("starch") || i.includes("leaf") || i.includes("food"));
  const hasIodine = normItems.some((i) => i.includes("iodine") || i.includes("dropper"));
  if (hasStarch && hasIodine) {
    return {
      color: "#1e1b4b",
      opacity: 0.95,
      stateEffect: "color_change",
      description: "Dark blue-black starch-iodine complex",
    };
  }

  // Reaction Logic 3: Acid + Base + Phenolphthalein
  const hasPhenol = normItems.some((i) => i.includes("phenolphthalein"));
  const hasNaoh = normItems.some((i) => i.includes("naoh") || i.includes("sodium_hydroxide"));
  const hasHcl = normItems.some((i) => i.includes("hcl") || i.includes("hydrochloric") || i.includes("acid"));
  if (hasPhenol && hasNaoh && !hasHcl) {
    return {
      color: "#ec4899",
      opacity: 0.85,
      stateEffect: "color_change",
      description: "Vivid magenta-pink in alkaline solution",
    };
  }

  // Reaction Logic 4: Benedict's + Reducing Sugar (e.g. glucose/food) + Heat
  const hasBenedict = normItems.some((i) => i.includes("benedict"));
  const hasSugar = normItems.some((i) => i.includes("glucose") || i.includes("sugar") || i.includes("food"));
  const hasHeat = normItems.some((i) => i.includes("burner") || i.includes("flame") || i.includes("water_bath"));
  if (hasBenedict && hasSugar && hasHeat) {
    return {
      color: "#dc2626",
      opacity: 0.95,
      stateEffect: "precipitate",
      description: "Brick-red copper(I) oxide precipitate",
    };
  }

  // Reaction Logic 5: Acid + Marble chips or Magnesium -> Effervescent Gas Bubbles
  const hasMetalOrChip = normItems.some((i) => i.includes("marble") || i.includes("chip") || i.includes("magnesium"));
  if (hasHcl && hasMetalOrChip) {
    return {
      color: "#e0f2fe",
      opacity: 0.5,
      stateEffect: "effervescent",
      description: "Vigorous effervescence producing gas bubbles",
    };
  }

  // Check if any accumulated item is a chemical/liquid substance
  const chemicalKeywords = [
    "acid", "hcl", "sulfuric", "naoh", "hydroxide", "copper", "cuso4", "permanganate",
    "kmno4", "limewater", "iodine", "starch", "phenolphthalein", "litmus", "benedict",
    "sugar", "glucose", "amylase", "enzyme", "ethanol", "alcohol", "chlorophyll", "water",
    "solution", "reagent", "indicator", "dye", "extract", "chemical", "liquid",
    "dropper", "pipette", "leaf", "decolorized", "food", "milk", "juice", "vinegar",
    "oil", "saliva", "sample", "marble", "chip", "magnesium", "sodium"
  ];

  const chemicalItems = normItems.filter((item) =>
    chemicalKeywords.some((k) => item.includes(k))
  );

  // If no chemical/liquid has been added yet, the glassware is empty
  if (chemicalItems.length === 0 && !stepResultColor) {
    return { color: "transparent", opacity: 0, description: "Empty vessel" };
  }

  // Single primary substance default
  if (chemicalItems.length > 0) {
    const lastChemical = chemicalItems[chemicalItems.length - 1];
    const info = getSubstanceInfo(lastChemical);
    return {
      color: info.color,
      opacity: info.opacity,
      stateEffect: stepResultState,
      description: info.description,
    };
  }

  return { color: "transparent", opacity: 0, description: "Empty vessel" };
}

/**
 * Calculates needle angle or digital readout display value for meters.
 * Maps numeric value into gauge angles (-60deg to +60deg) or formatted text.
 */
export function calculateMeterReading(
  expectedValueStr: string | undefined,
  type: "voltmeter" | "ammeter" | "thermometer" | "ph_meter" | "balance" | "stopwatch"
): { numericVal: number; angleDegrees: number; formattedText: string } {
  let val = 0;
  if (expectedValueStr) {
    // Handle ranges like "2.0-2.4" or numbers like "1.5" or "100"
    if (expectedValueStr.includes("-")) {
      const parts = expectedValueStr.split("-").map((p) => parseFloat(p.trim()));
      val = (parts[0] + parts[1]) / 2;
    } else {
      val = parseFloat(expectedValueStr) || 0;
    }
  }

  let angleDegrees = 0;
  let formattedText = `${val}`;

  switch (type) {
    case "voltmeter":
      // Range 0 to 12V -> Needle -60deg to +60deg
      angleDegrees = Math.min(60, Math.max(-60, -60 + (val / 12) * 120));
      formattedText = `${val.toFixed(2)} V`;
      break;
    case "ammeter":
      // Range 0 to 3A -> Needle -60deg to +60deg
      angleDegrees = Math.min(60, Math.max(-60, -60 + (val / 3) * 120));
      formattedText = `${val.toFixed(2)} A`;
      break;
    case "thermometer":
      // Temperature 0 to 100°C -> Merc Fill Height %
      angleDegrees = Math.min(100, Math.max(0, val));
      formattedText = `${val.toFixed(1)} °C`;
      break;
    case "ph_meter":
      // pH 0 to 14
      angleDegrees = Math.min(14, Math.max(0, val));
      formattedText = `pH ${val.toFixed(1)}`;
      break;
    case "balance":
      formattedText = `${val.toFixed(2)} g`;
      break;
    case "stopwatch":
      formattedText = `${val.toFixed(1)} s`;
      break;
  }

  return { numericVal: val, angleDegrees, formattedText };
}
