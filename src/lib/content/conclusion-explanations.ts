// High-Yield O/L Science Conclusion & Concept Explanations Dictionary
// Aligned with Sri Lankan National Institute of Education (NIE) Grades 10 & 11 Science Curriculum

export interface ConceptExplanation {
  question: string;
  conceptTitle: string;
  explanation: string;
  keyDeduction: string;
}

export const CONCLUSION_EXPLANATIONS: Record<string, ConceptExplanation[]> = {
  "preparing-testing-carbon-dioxide": [
    {
      question: "Why does limewater turn milky rather than staying clear when CO2 is passed through it?",
      conceptTitle: "Formation of Calcium Carbonate",
      explanation: "Carbon dioxide (CO2) reacts with dissolved calcium hydroxide (Ca(OH)2) in limewater to form insoluble calcium carbonate (CaCO3) as a white precipitate, which suspends in the water and turns it cloudy/milky.",
      keyDeduction: "Ca(OH)2(aq) + CO2(g) → CaCO3(s)↓ + H2O(l)"
    },
    {
      question: "What would you expect to observe if you passed the gas through limewater for a very long time, in excess?",
      conceptTitle: "Dissolution in Excess CO2",
      explanation: "With prolonged passing of excess CO2, the milky precipitate disappears and the solution turns clear again because insoluble calcium carbonate converts into soluble calcium hydrogen carbonate (bicarbonate).",
      keyDeduction: "CaCO3(s) + H2O(l) + CO2(g) → Ca(HCO3)2(aq)"
    }
  ],
  "properties-of-sodium-metal": [
    {
      question: "Why is sodium stored under liquid paraffin or kerosene oil?",
      conceptTitle: "Extreme Reactivity of Group 1 Metals",
      explanation: "Sodium is an extremely reactive alkali metal that rapidly oxidizes in atmospheric oxygen and violently reacts with moisture in air to produce hydrogen and corrosive sodium hydroxide. Kerosene excludes air and moisture.",
      keyDeduction: "4Na(s) + O2(g) → 2Na2O(s) | 2Na(s) + 2H2O(l) → 2NaOH(aq) + H2(g)↑"
    },
    {
      question: "Why does the phenolphthalein indicator turn bright pink after sodium reacts with water?",
      conceptTitle: "Strong Alkaline Solution Formation",
      explanation: "The reaction between sodium and water produces sodium hydroxide (NaOH), a strong alkali. Phenolphthalein turns bright pink in basic/alkaline solutions (pH > 8.2).",
      keyDeduction: "Alkaline OH⁻ ions turn phenolphthalein pink."
    }
  ],
  "physical-and-chemical-changes": [
    {
      question: "How does dissolving sugar differ fundamentally from burning a magnesium ribbon?",
      conceptTitle: "Reversible Physical vs. Irreversible Chemical Change",
      explanation: "Dissolving sugar is a physical change because no new chemical bonds are broken or formed, and sugar can be recovered by evaporating water. Burning magnesium is an irreversible chemical change forming a brand new substance (magnesium oxide).",
      keyDeduction: "Physical change: No new substance. Chemical change: New chemical bonds and new properties."
    },
    {
      question: "Why is energy usually released or absorbed in greater amounts during chemical changes compared to physical changes?",
      conceptTitle: "Bond Energy Rearrangement",
      explanation: "Chemical reactions involve breaking strong intramolecular covalent or ionic bonds in reactants and forming new bonds in products, accompanied by significant enthalpy changes.",
      keyDeduction: "Bond breaking absorbs energy; bond formation releases energy."
    }
  ],
  "types-of-chemical-reactions": [
    {
      question: "What type of reaction occurs when hydrogen gas burns in oxygen to form water?",
      conceptTitle: "Combination / Synthesis Reaction",
      explanation: "Two distinct elemental reactants (2H2 and O2) unite directly to synthesize a single compound product (2H2O), characterizing a combination reaction.",
      keyDeduction: "2H2(g) + O2(g) → 2H2O(l) (Combination)"
    },
    {
      question: "Why is thermal decomposition of calcium carbonate categorized as an endothermic reaction?",
      conceptTitle: "Endothermic Decomposition",
      explanation: "Continuous thermal energy input is required to overcome the strong electrostatic lattice bonds holding calcium carbonate together to decompose it into calcium oxide and carbon dioxide.",
      keyDeduction: "CaCO3(s) + Heat → CaO(s) + CO2(g) (Decomposition)"
    }
  ],
  "metals-reaction-with-air": [
    {
      question: "Why does magnesium burn with an intense blinding white light in air?",
      conceptTitle: "Exothermic Oxidation of Magnesium",
      explanation: "Magnesium reacts vigorously and rapidly with oxygen gas in air in a strongly exothermic oxidation reaction, releasing intense light and heat energy to produce basic magnesium oxide powder.",
      keyDeduction: "2Mg(s) + O2(g) → 2MgO(s) + High Thermal/Radiant Energy"
    },
    {
      question: "Why does copper only form a black surface coating (copper(II) oxide) rather than catching fire?",
      conceptTitle: "Lower Reactivity of Transition Metals",
      explanation: "Copper lies lower in the electrochemical activity series than magnesium. It oxidizes slowly on the surface without burning, creating a protective layer of black cupric oxide (CuO).",
      keyDeduction: "2Cu(s) + O2(g) → 2CuO(s) (Black Surface Layer)"
    }
  ],
  "reaction-of-magnesium-with-water": [
    {
      question: "Why does magnesium react very slowly with cold water but rapidly with steam or hot water?",
      conceptTitle: "Activation Energy & Oxide Layer",
      explanation: "At room temperature, a protective passivating magnesium oxide layer limits reaction with cold water. Hot water/steam provides thermal energy to overcome activation energy and yields magnesium oxide and hydrogen gas.",
      keyDeduction: "Mg(s) + 2H2O(l, hot) → Mg(OH)2(aq) + H2(g)↑"
    },
    {
      question: "What test confirms the identity of the gas generated during this reaction?",
      conceptTitle: "Pop Sound Test for Hydrogen",
      explanation: "Inserting a burning wooden splint near the mouth of the inverted test tube produces a distinct 'pop' sound as hydrogen burns instantaneously with oxygen to form water.",
      keyDeduction: "2H2(g) + O2(g) → 2H2O(g) (Produces characteristic 'pop' sound)"
    }
  ],
  "reactions-of-metals-with-dilute-acids": [
    {
      question: "Which metal reacts most vigorously with dilute hydrochloric acid: Mg, Zn, Fe, or Cu?",
      conceptTitle: "Metals Activity Series Order",
      explanation: "Magnesium reacts most vigorously due to its highest position in the activity series, producing rapid effervescence. Copper does not react with dilute non-oxidizing acids because it is positioned below hydrogen.",
      keyDeduction: "Activity Order: Mg > Zn > Fe > (H) > Cu"
    },
    {
      question: "Why does copper fail to produce any bubbles when placed in dilute hydrochloric acid?",
      conceptTitle: "Reduction Potential vs. Hydrogen",
      explanation: "Copper has a positive standard electrode potential relative to hydrogen (lies below hydrogen in the activity series), so it cannot displace hydrogen ions from non-oxidizing acids.",
      keyDeduction: "Cu(s) + HCl(aq) → No Reaction"
    }
  ],
  "metal-displacement-reactions": [
    {
      question: "Why does an iron nail become coated with reddish-brown copper when placed in copper sulfate solution?",
      conceptTitle: "Single Metal Displacement",
      explanation: "Iron is more reactive (higher electropositivity) than copper. Iron atoms lose electrons to copper ions, dissolving as green Fe²⁺ ions while Cu²⁺ ions receive electrons and deposit as metallic copper.",
      keyDeduction: "Fe(s) + CuSO4(aq) → FeSO4(aq) + Cu(s)↓ (Fe displaces Cu)"
    },
    {
      question: "Why does the blue color of copper sulfate solution gradually fade to pale light green?",
      conceptTitle: "Conversion of Cu²⁺ to Fe²⁺",
      explanation: "The intense blue color is caused by hydrated Cu²⁺ ions. As Cu²⁺ is reduced to copper metal, pale green ferrous (Fe²⁺) sulfate is formed in solution.",
      keyDeduction: "Blue Cu²⁺(aq) is replaced by Pale Green Fe²⁺(aq)"
    }
  ],
  "collecting-testing-hydrogen-gas": [
    {
      question: "Why is hydrogen gas collected by downward displacement of water (upward in an inverted cylinder)?",
      conceptTitle: "Low Density & Insoluble Nature",
      explanation: "Hydrogen gas is significantly less dense than air and is almost insoluble in water, making water displacement ideal for trapping pure gas without air contamination.",
      keyDeduction: "Hydrogen is 14 times lighter than air and insoluble in water."
    },
    {
      question: "What is the chemical equation for the combustion of hydrogen during the pop test?",
      conceptTitle: "Hydrogen Combustion Reaction",
      explanation: "Hydrogen reacts explosively on a miniature scale with atmospheric oxygen to produce water vapor and release acoustic sound energy.",
      keyDeduction: "2H2(g) + O2(g) → 2H2O(g) + Thermal/Acoustic Energy"
    }
  ],
  "collecting-testing-oxygen-gas": [
    {
      question: "What happens when a glowing wooden splint is inserted into a gas jar of oxygen?",
      conceptTitle: "Relighting the Glowing Splint",
      explanation: "Oxygen gas actively supports combustion. The concentrated oxygen accelerates the oxidation rate of the smoldering ember on the splint, causing it to immediately burst into a bright flame.",
      keyDeduction: "Standard confirmatory test: Oxygen relights a glowing splint."
    },
    {
      question: "What role does manganese dioxide (MnO2) play in the decomposition of hydrogen peroxide?",
      conceptTitle: "Heterogeneous Catalyst Function",
      explanation: "MnO2 acts as a catalyst by providing an alternative reaction pathway with lower activation energy, drastically accelerating decomposition without being consumed in the reaction.",
      keyDeduction: "2H2O2(aq) --[MnO2 catalyst]--> 2H2O(l) + O2(g)↑"
    }
  ],
  "rate-of-reaction-surface-area": [
    {
      question: "Why do powdered calcium carbonate chips react much faster with acid than large solid marble lumps?",
      conceptTitle: "Surface Area to Volume Ratio",
      explanation: "Powdered solids have a much larger exposed surface area per unit volume. This exposes far more reactant particles to acid collisions, increasing the frequency of effective collisions per second.",
      keyDeduction: "Higher Surface Area = Greater Collision Frequency = Faster Reaction Rate"
    },
    {
      question: "How does collision theory explain the rate increase with greater surface area?",
      conceptTitle: "Collision Theory Fundamentals",
      explanation: "For a reaction to occur, particles must collide with sufficient kinetic energy and proper orientation. Increasing accessible reactant surface increases total collision opportunities.",
      keyDeduction: "Reaction rate is directly proportional to collision frequency at the interface."
    }
  ],
  "rate-of-reaction-temperature": [
    {
      question: "Why does the reaction rate approximately double for every 10 °C rise in temperature?",
      conceptTitle: "Maxwell-Boltzmann Kinetic Distribution",
      explanation: "Increasing temperature increases the average kinetic energy of molecules, substantially increasing the fraction of reactant particles possessing kinetic energy equal to or greater than the activation energy (Ea).",
      keyDeduction: "Higher Temperature = Higher Kinetic Energy = Exponentially More Effective Collisions"
    },
    {
      question: "Why is the disappearing cross experiment with sodium thiosulfate and HCl temperature-sensitive?",
      conceptTitle: "Colloidal Sulfur Precipitation",
      explanation: "The reaction produces fine colloidal sulfur (S) precipitate that gradually obscures light passing through the flask. At higher temperatures, sulfur precipitates much more rapidly.",
      keyDeduction: "Na2S2O3(aq) + 2HCl(aq) → 2NaCl(aq) + SO2(g) + S(s)↓ + H2O(l)"
    }
  ],
  "rate-of-reaction-concentration": [
    {
      question: "How does increasing the molar concentration of hydrochloric acid increase reaction velocity?",
      conceptTitle: "Particle Number Density",
      explanation: "Higher concentration means more H⁺ and Cl⁻ ions exist in a given volume of solution. This higher spatial density increases the collision rate between acid ions and magnesium atoms.",
      keyDeduction: "Higher Concentration = Denser Reactant Particles = Higher Reaction Rate"
    },
    {
      question: "Does changing the concentration of acid change the total volume of gas produced if metal is in excess?",
      conceptTitle: "Limiting Reactants & Stoichiometry",
      explanation: "Yes, the total moles of gas produced depends strictly on the total moles of the limiting reactant (acid in this case), according to stoichiometric ratios.",
      keyDeduction: "Rate increases with concentration; total yield depends on limiting moles."
    }
  ],
  "rate-of-reaction-catalyst": [
    {
      question: "Why is a catalyst recovered unchanged in mass and chemical composition at the end of a reaction?",
      conceptTitle: "Catalytic Mechanism & Conservation",
      explanation: "A catalyst participates transiently by forming intermediate complexes, but is regenerated in subsequent steps. Therefore, it is neither consumed nor permanently altered.",
      keyDeduction: "Catalysts lower activation energy (Ea) without being consumed in the net reaction."
    },
    {
      question: "How do biological catalysts (enzymes like catalase or amylase) differ from inorganic catalysts (like MnO2)?",
      conceptTitle: "Enzyme Specificity & Denaturation",
      explanation: "Biological enzymes are proteins with 3D active sites that operate under specific optimal temperatures and pH ranges, and denature when overheated. Inorganic catalysts are heat-stable.",
      keyDeduction: "Enzymes: Temperature/pH sensitive, highly specific. Inorganic: Robust, heat-resistant."
    }
  ],
  "acids-bases-indicators": [
    {
      question: "Why does red litmus paper turn blue in alkaline solutions while blue litmus remains unchanged?",
      conceptTitle: "Litmus Chromophore Shift",
      explanation: "Litmus contains weak acidic dye molecules that accept or release protons. Hydroxide ions (OH⁻) in bases deprotonate the indicator molecule, shifting its conjugated absorption spectrum to appear blue.",
      keyDeduction: "Acids: Blue Litmus → Red | Bases: Red Litmus → Blue | Neutral: No color change"
    },
    {
      question: "What color does methyl orange show in strong hydrochloric acid vs. sodium hydroxide?",
      conceptTitle: "Synthetic Indicators & pH Ranges",
      explanation: "Methyl orange is red in strongly acidic conditions (pH < 3.1) and yellow in neutral to alkaline solutions (pH > 4.4).",
      keyDeduction: "Acidic: Red (pH < 3.1) | Neutral/Basic: Yellow (pH > 4.4)"
    }
  ],
  "paper-chromatography": [
    {
      question: "Why do different colored pigments in plant leaf extract separate into distinct bands on chromatography paper?",
      conceptTitle: "Differential Partitioning & Retention",
      explanation: "Pigments have differing relative affinities: some are more soluble in the mobile solvent phase (traveling faster), while others bind more strongly by adsorption to the stationary cellulose paper fibers (traveling slower).",
      keyDeduction: "Rf = (Distance moved by pigment) / (Distance moved by solvent front)"
    },
    {
      question: "Why must the initial sample pencil baseline be positioned above the solvent liquid level?",
      conceptTitle: "Preventing Sample Dissolution",
      explanation: "If the baseline is submerged in solvent, the pigment spots will dissolve directly into the beaker solvent instead of ascending up the paper by capillary action.",
      keyDeduction: "Baseline must remain above solvent level for capillary ascension."
    }
  ],
  "exothermic-endothermic-reactions": [
    {
      question: "Why does the dissolution of ammonium chloride cause the beaker temperature to drop?",
      conceptTitle: "Endothermic Heat of Solution",
      explanation: "The energy required to break the crystal lattice of NH4Cl is greater than the hydration energy released when ions are surrounded by water molecules, so thermal energy is absorbed from the surroundings.",
      keyDeduction: "Endothermic: ΔH > 0 (Temperature of surroundings drops)"
    },
    {
      question: "Why does adding water to quicklime (calcium oxide) generate intense boiling heat?",
      conceptTitle: "Exothermic Slaking of Lime",
      explanation: "The formation of slaked lime (calcium hydroxide) is a strongly exothermic combination reaction that releases substantial chemical energy as heat into the solution.",
      keyDeduction: "CaO(s) + H2O(l) → Ca(OH)2(s) + Heat (Exothermic: ΔH < 0)"
    }
  ],
  "simple-distillation": [
    {
      question: "Why must cooling water enter the bottom of the Liebig condenser rather than the top?",
      conceptTitle: "Counter-Current Cooling & Complete Condensation",
      explanation: "Introducing water from the lowest inlet ensures the condenser jacket remains completely filled without air bubbles, creating an efficient counter-current thermal gradient that condenses all vapor.",
      keyDeduction: "Water In at bottom, Water Out at top ensures 100% jacket filling and maximum cooling."
    },
    {
      question: "How does distillation differ from simple evaporation?",
      conceptTitle: "Vapor Recovery vs. Loss",
      explanation: "Evaporation allows the evaporated solvent vapor to escape into the atmosphere to recover the solute. Distillation captures, cools, and condenses the solvent vapor to collect both purified distillate and residue.",
      keyDeduction: "Distillation = Evaporation + Controlled Condensation and Collection"
    }
  ],
  "simple-electrochemical-cell": [
    {
      question: "Why does the zinc strip gradually lose mass while the copper strip remains intact?",
      conceptTitle: "Anodic Oxidation & Cathodic Reduction",
      explanation: "Zinc has a higher oxidation potential than copper. Zinc atoms lose electrons at the anode and dissolve into the electrolyte as Zn²⁺ ions, while copper acts as a passive cathode where H⁺ ions accept electrons.",
      keyDeduction: "Anode (Zinc): Zn(s) → Zn²⁺(aq) + 2e⁻ | Cathode (Copper): 2H⁺(aq) + 2e⁻ → H2(g)↑"
    },
    {
      question: "What causes polarization in a simple voltaic cell?",
      conceptTitle: "Hydrogen Bubble Layer (Polarization)",
      explanation: "Hydrogen gas bubbles accumulate on the copper electrode surface, creating an insulating gas layer and an opposing counter-electromotive force (back EMF) that drastically reduces cell current.",
      keyDeduction: "Polarization is prevented using chemical depolarizing oxidizing agents (e.g. MnO2, K2Cr2O7)."
    }
  ],
  "electrolytes-and-non-electrolytes": [
    {
      question: "Why does aqueous sodium chloride conduct electricity while glucose solution does not?",
      conceptTitle: "Free Mobile Ions in Electrolytes",
      explanation: "Sodium chloride dissociates into mobile hydrated Na⁺ cations and Cl⁻ anions that migrate toward electrodes to carry current. Glucose dissolves as uncharged neutral covalent molecules without mobile charge carriers.",
      keyDeduction: "Conduction in liquids requires free mobile ions."
    },
    {
      question: "Why does solid dry NaCl not conduct electricity, but molten or dissolved NaCl does?",
      conceptTitle: "Ionic Lattice Mobility",
      explanation: "In solid NaCl, ions are held fixed in rigid crystal lattice positions by electrostatic forces. Dissolving in water or melting breaks the lattice, freeing the ions to move.",
      keyDeduction: "Solid ionic compounds: non-conductors. Molten / Aqueous: strong electrolytes."
    }
  ],
  "electrolysis-sodium-chloride-solution": [
    {
      question: "What gases are evolved at the cathode and anode during the electrolysis of brine (NaCl solution)?",
      conceptTitle: "Chlor-Alkali Electrolysis Products",
      explanation: "At the cathode (-), water/H⁺ is preferentially reduced to produce Hydrogen gas (H2). At the anode (+), chloride ions are oxidized to produce Chlorine gas (Cl2). Sodium hydroxide (NaOH) remains in solution.",
      keyDeduction: "Cathode (-): 2H2O + 2e⁻ → H2(g) + 2OH⁻ | Anode (+): 2Cl⁻ → Cl2(g) + 2e⁻"
    },
    {
      question: "Why is chlorine gas collected at the positive anode?",
      conceptTitle: "Anionic Attraction & Oxidation",
      explanation: "Negatively charged chloride anions (Cl⁻) are electrostatically attracted to the positive anode, where they release electrons (undergo oxidation) to form diatomic chlorine gas molecules.",
      keyDeduction: "Anode is positive (+); attracts negative anions (Cl⁻)."
    }
  ],
  "electrolysis-copper-sulphate-solution": [
    {
      question: "What happens to the copper cathode when using inert graphite electrodes in CuSO4 solution?",
      conceptTitle: "Deposition of Metallic Copper",
      explanation: "Positively charged Cu²⁺ ions migrate to the negative cathode, where they receive electrons and deposit as a lustrous pinkish-brown layer of elemental copper metal.",
      keyDeduction: "Cathode: Cu²⁺(aq) + 2e⁻ → Cu(s)↓ (Pinkish-brown deposit)"
    },
    {
      question: "Why does the blue color of the electrolyte fade when using graphite electrodes?",
      conceptTitle: "Depletion of Cu²⁺ Ions",
      explanation: "With inert graphite electrodes, Cu²⁺ ions are continuously removed from solution at the cathode and oxygen is evolved at the anode, causing copper ion concentration in the electrolyte to decline to zero.",
      keyDeduction: "Blue Cu²⁺ ions are progressively converted to solid metal, clearing the solution."
    }
  ],
  "electrolysis-of-acidulated-water": [
    {
      question: "Why is the volume ratio of hydrogen gas to oxygen gas evolved exactly 2:1 in Hofmann's voltameter?",
      conceptTitle: "Stoichiometry of the Water Molecule",
      explanation: "A water molecule consists of two hydrogen atoms bonded to one oxygen atom (H2O). Electrolysis breaks two molecules of water to yield two molecules of H2 gas for every one molecule of O2 gas.",
      keyDeduction: "2H2O(l) → 2H2(g) (Cathode) + O2(g) (Anode) [Volume ratio 2:1]"
    },
    {
      question: "Why must a small amount of dilute sulfuric acid be added to pure water for electrolysis?",
      conceptTitle: "Enhancing Electrical Conductivity",
      explanation: "Pure water is a very weak electrolyte with negligible ionization. Adding sulfuric acid supplies abundant mobile H⁺ and SO4²⁻ ions to conduct electric current efficiently.",
      keyDeduction: "Pure water is a poor conductor; acid provides mobile ions for conduction."
    }
  ],
  "electroplating-iron-spoon-copper": [
    {
      question: "Why must the article to be electroplated (iron spoon) be connected to the negative terminal (cathode)?",
      conceptTitle: "Cathodic Deposition Principle",
      explanation: "Positively charged metal cations (Cu²⁺) are attracted to the negative cathode, where they gain electrons (reduction) and deposit as a uniform metallic coating onto the spoon surface.",
      keyDeduction: "Object to be plated = Cathode (-) | Plating metal = Anode (+)"
    },
    {
      question: "Why must pure copper metal be used as the anode in this electroplating circuit?",
      conceptTitle: "Anode Dissolution & Electrolyte Replenishment",
      explanation: "As copper ions deposit onto the spoon from solution, the copper anode dissolves at the identical rate (Cu → Cu²⁺ + 2e⁻), maintaining a constant concentration of copper ions in the electrolyte bath.",
      keyDeduction: "Anode dissolves to keep electrolyte Cu²⁺ concentration constant."
    }
  ],
  "rusting-air-essential": [
    {
      question: "Why do iron nails submerged in boiled distilled water under an oil layer not rust?",
      conceptTitle: "Exclusion of Dissolved Oxygen",
      explanation: "Boiling expels all dissolved oxygen from the water, and the paraffin oil layer creates an airtight barrier preventing atmospheric oxygen from re-dissolving. Without oxygen, corrosion cannot proceed.",
      keyDeduction: "Rusting requires BOTH oxygen and water simultaneously."
    },
    {
      question: "What is the chemical formula of rust formed on iron in moist air?",
      conceptTitle: "Hydrated Iron(III) Oxide",
      explanation: "Iron undergoes electrochemical oxidation in the presence of oxygen and moisture to form hydrated iron(III) oxide.",
      keyDeduction: "Rust Formula: Fe2O3·xH2O (Hydrated Iron(III) Oxide)"
    }
  ],
  "rusting-moisture-essential": [
    {
      question: "Why do iron nails in a sealed tube with anhydrous calcium chloride not rust?",
      conceptTitle: "Desiccant Action & Moisture Absence",
      explanation: "Anhydrous calcium chloride is a hygroscopic desiccant that absorbs all airborne water vapor. Without water to act as an electrochemical medium for ion transport, iron cannot rust.",
      keyDeduction: "Dry air alone does NOT cause rusting."
    },
    {
      question: "Why do ancient iron artifacts survive for thousands of years in arid desert climates?",
      conceptTitle: "Arid Climate Preservation",
      explanation: "Desert climates maintain exceptionally low relative humidity, preventing the water condensation film on metal surfaces necessary for the electrochemical corrosion cycle.",
      keyDeduction: "Zero moisture prevents iron oxidation over millennia."
    }
  ],
  "rusting-effect-of-salt": [
    {
      question: "Why do motor vehicles and metal structures in coastal seaside areas rust much faster than inland?",
      conceptTitle: "Ionic Electrolyte Acceleration",
      explanation: "Dissolved sodium chloride in marine air and seawater increases electrical conductivity of the moisture film on metal, accelerating the electrochemical transfer of electrons and ions in the corrosion cell.",
      keyDeduction: "Electrolytes (salts and acids) dramatically accelerate rusting rate."
    },
    {
      question: "How does salt water act as an efficient electrolyte in corrosion cells?",
      conceptTitle: "Corrosion Cell Conductivity",
      explanation: "Free Na⁺ and Cl⁻ ions lower the ohmic resistance of the electrolyte solution connecting anodic and cathodic sites on the iron surface, speeding up iron dissolution.",
      keyDeduction: "Dissolved ions facilitate rapid electron and ion flow between micro-electrodes."
    }
  ],
  "rusting-sacrificial-protection-metals": [
    {
      question: "How does wrapping a strip of magnesium or zinc around an iron nail prevent rusting?",
      conceptTitle: "Sacrificial Galvanic Protection",
      explanation: "Magnesium and zinc are more electropositive than iron in the activity series. They oxidize preferentially, sacrificing themselves to provide electrons to the iron and preventing iron atoms from losing electrons.",
      keyDeduction: "Zn(s) → Zn²⁺(aq) + 2e⁻ (Zinc corrodes sacrificially, protecting iron)"
    },
    {
      question: "What happens if a tin-coated iron can is scratched vs. a galvanized (zinc-coated) iron sheet?",
      conceptTitle: "Tinning vs. Galvanizing Failure Modes",
      explanation: "Zinc is more reactive than iron, so even if scratched, zinc still protects iron sacrificially. Tin is LESS reactive than iron; if scratched, iron corrodes preferentially and rusts faster than bare iron.",
      keyDeduction: "Zinc protects sacrificially when scratched; scratched tin accelerates iron rusting."
    }
  ],
  "ohms-law-verification": [
    {
      question: "What would happen to the ammeter reading if the resistance were doubled while voltage is held constant?",
      conceptTitle: "Inverse Relationship of Current and Resistance",
      explanation: "According to Ohm's law (I = V / R), current is inversely proportional to resistance. Doubling resistance cuts current flow exactly in half.",
      keyDeduction: "I = V / R (If R doubles, I halves)"
    },
    {
      question: "Why must a voltmeter be connected in parallel across a component, while an ammeter is connected in series?",
      conceptTitle: "Instrument Internal Resistance Requirements",
      explanation: "Voltmeters have very high internal resistance to measure potential difference without drawing significant current. Ammeters have near-zero internal resistance to measure total circuit current without adding resistance.",
      keyDeduction: "Voltmeter: Parallel (High internal resistance) | Ammeter: Series (Low internal resistance)"
    }
  ],
  "action-of-resistors": [
    {
      question: "How does a variable resistor (rheostat) control current in everyday electrical appliances?",
      conceptTitle: "Controlling Circuit Resistance",
      explanation: "Adjusting the slider varies the effective length of the resistive element in circuit. Since resistance is proportional to conductor length (R ∝ L), increasing length increases resistance and dims the lamp or lowers volume.",
      keyDeduction: "R = ρ·L / A (Longer resistor path = greater resistance = smaller current)"
    },
    {
      question: "If a short circuit (0 Ω wire) is placed across a bulb, what happens to the bulb and circuit current?",
      conceptTitle: "Short Circuit Phenomenon",
      explanation: "Current follows the path of least resistance through the zero-ohm bypass wire. The bulb goes out, and excessive current flows through the circuit, potentially blowing a fuse.",
      keyDeduction: "Short circuits bypass loads and cause dangerous overcurrent."
    }
  ],
  "demonstrating-fluid-upthrust": [
    {
      question: "Why does an object weigh less when fully immersed in water than in air?",
      conceptTitle: "Archimedes' Upthrust Principle",
      explanation: "Pressure increases with liquid depth (P = hρg), creating greater upward pressure on the bottom of the submerged object than downward pressure on the top. The resultant upward force is upthrust.",
      keyDeduction: "Apparent Weight = True Weight in Air - Upthrust (U)"
    },
    {
      question: "How does the density of the surrounding liquid affect the upthrust experienced by the object?",
      conceptTitle: "Density Proportionality of Upthrust",
      explanation: "Upthrust equals the weight of displaced liquid (U = V·ρ·g). A denser liquid like salt water exerts a greater upthrust than fresh water on the same submerged volume.",
      keyDeduction: "Upthrust U = V·ρ·g (Directly proportional to liquid density ρ)"
    }
  ],
  "measuring-upthrust-displaced-liquid": [
    {
      question: "Does upthrust change if a fully submerged solid cube is lowered deeper into the water?",
      conceptTitle: "Submerged Depth Independence",
      explanation: "Once completely submerged, the displaced liquid volume (V) remains constant. Because liquids are virtually incompressible and water density is uniform, upthrust remains identical regardless of depth.",
      keyDeduction: "Upthrust on fully submerged object depends on volume, NOT depth."
    },
    {
      question: "Why do massive steel ships float in ocean water while a small solid steel sphere sinks?",
      conceptTitle: "Law of Flotation & Average Density",
      explanation: "A hollow steel ship encloses a massive volume of air, making its average density much less than water density. It displaces a weight of water equal to its entire weight before being fully submerged.",
      keyDeduction: "An object floats when its weight equals the upthrust of displaced fluid."
    }
  ],
  "refraction-glass-block": [
    {
      question: "Why does light bend towards the normal when entering glass from air, and away from normal when exiting into air?",
      conceptTitle: "Snell's Law & Wave Velocity in Optical Media",
      explanation: "Glass is optically denser than air. Light slows down in glass, refracting towards the normal line. When exiting back into air, light speeds up, refracting away from the normal line.",
      keyDeduction: "Air to Glass: Bends towards normal | Glass to Air: Bends away from normal"
    },
    {
      question: "Why is the emergent ray emerging from a rectangular glass block parallel to the incident ray?",
      conceptTitle: "Parallel Boundaries & Angular Compensation",
      explanation: "Because opposite faces of a rectangular glass block are parallel, the angle of refraction at the first surface exactly equals the angle of incidence at the second surface, making emergent angle (e) equal incident angle (i).",
      keyDeduction: "Angle of Incidence (i) = Angle of Emergence (e) [Lateral displacement only]"
    }
  ],
  "focal-length-concave-mirror": [
    {
      question: "What is the relationship between the radius of curvature (R) and focal length (f) of a spherical concave mirror?",
      conceptTitle: "Focal Length Formula",
      explanation: "For spherical mirrors with small apertures, the focal point (F) lies exactly halfway between the pole (P) and center of curvature (C), so focal length is half the radius of curvature.",
      keyDeduction: "f = R / 2 (Focal length is half the radius of curvature)"
    },
    {
      question: "What type of image is formed when an object is placed between the focal point and pole of a concave mirror?",
      conceptTitle: "Virtual Magnified Upright Image (Shaving / Makeup Mirror)",
      explanation: "When placed inside the focal length (u < f), reflected rays diverge and appear to originate from behind the mirror, forming a virtual, upright, and magnified image.",
      keyDeduction: "Inside focal length: Virtual, Erect, and Magnified image."
    }
  ],
  "thermal-expansion-solids": [
    {
      question: "Why are expansion gaps left between steel railway tracks and bridge sections?",
      conceptTitle: "Linear Thermal Expansion in Engineering",
      explanation: "Steel rails expand in length during hot daytime sun (ΔL = α·L0·ΔT). Without expansion gaps, compressive thermal stress causes rails to bend and buckle dangerously.",
      keyDeduction: "Expansion Gaps prevent buckling caused by thermal expansion (ΔL = α·L0·ΔT)."
    },
    {
      question: "How does a bimetallic strip made of brass and iron bend when heated in a thermostat?",
      conceptTitle: "Differential Expansion Coefficient",
      explanation: "Brass has a higher linear expansivity (coefficient of thermal expansion) than iron. When heated, brass expands more and forces the strip to bend into a curve with brass on the outer curve.",
      keyDeduction: "Brass on outside of curve during heating; on inside during cooling."
    }
  ],
  "thermal-expansion-liquids": [
    {
      question: "Why does the liquid level in a flask tube momentarily drop before rising when heated in water?",
      conceptTitle: "Vessel Expansion Precedes Liquid Expansion",
      explanation: "Heat conducts through the glass container wall first, causing the glass flask to expand and its internal volume to enlarge briefly before heat reaches and expands the liquid inside.",
      keyDeduction: "Glass expands first (brief level drop), then liquid expands much more (steady rise)."
    },
    {
      question: "Why is mercury or alcohol preferred over water in clinical thermometers?",
      conceptTitle: "Thermometric Liquid Properties",
      explanation: "Mercury expands uniformly across a wide temperature range, does not wet the capillary glass, has high thermal conductivity, and does not freeze at 0 °C (unlike water which has anomalous expansion).",
      keyDeduction: "Uniform expansion, high visibility, and wide operating temperature range."
    }
  ],
  "thermal-expansion-gases": [
    {
      question: "Why do gases expand significantly more than liquids and solids for the same rise in temperature?",
      conceptTitle: "Intermolecular Forces & Kinetic Freedom",
      explanation: "Gas molecules have negligible intermolecular attraction and large intermolecular separations. Increasing thermal energy causes molecules to move faster and expand freely against external pressure.",
      keyDeduction: "Expansion order for equal ΔT: Gases >> Liquids > Solids"
    },
    {
      question: "Why should automotive tire pressure always be checked when tires are cold?",
      conceptTitle: "Gay-Lussac's Law & Pressure Rise",
      explanation: "Friction during driving generates heat in tires. As air inside heats up at constant volume, pressure increases (P ∝ T). Measuring when hot gives a falsely high reading.",
      keyDeduction: "P1/T1 = P2/T2 (Pressure increases with temperature in sealed containers)"
    }
  ],
  "heat-capacity-comparison": [
    {
      question: "Why is water widely used as an engine coolant in motor vehicles?",
      conceptTitle: "High Specific Heat Capacity of Water",
      explanation: "Water possesses an exceptionally high specific heat capacity (c ≈ 4200 J·kg⁻¹·K⁻¹), meaning it absorbs enormous quantities of thermal energy with only a modest increase in temperature.",
      keyDeduction: "High specific heat capacity makes water the ideal thermal absorption medium."
    },
    {
      question: "Why do coastal regions experience moderate daily temperatures (sea breeze / land breeze) compared to inland deserts?",
      conceptTitle: "Maritime Climate Regulation",
      explanation: "Land has a lower specific heat capacity and heats up or cools down much faster than the ocean. Convection currents (sea breeze by day, land breeze by night) stabilize coastal climates.",
      keyDeduction: "Differential heating between land and ocean drives coastal convection breezes."
    }
  ],
  "heat-transfer-thermal-equilibrium": [
    {
      question: "What is meant by the state of thermal equilibrium when two objects are in contact?",
      conceptTitle: "Zeroth Law & Thermal Equilibrium",
      explanation: "Thermal energy naturally transfers from the hotter object to the colder object until both reach the identical temperature, at which point net heat flow between them ceases.",
      keyDeduction: "Heat Lost by Hot Body = Heat Gained by Cold Body (Assuming no environmental loss)"
    },
    {
      question: "Why does a clinical thermometer placed in a patient's mouth take 1-2 minutes to register accurate body temperature?",
      conceptTitle: "Thermal Conduction Time Constant",
      explanation: "Time is required for conductive heat transfer between body tissue and thermometer glass/mercury to reach complete thermal equilibrium.",
      keyDeduction: "Thermometers measure their own temperature after reaching thermal equilibrium with the body."
    }
  ],
  "magnetic-field-bar-magnet-compass": [
    {
      question: "Why do magnetic field lines never cross or intersect one another?",
      conceptTitle: "Uniqueness of Magnetic Force Vector",
      explanation: "At any point in space, the magnetic field has a single unique magnitude and direction. If two lines intersected, a compass placed at the intersection would have to point in two directions simultaneously, which is impossible.",
      keyDeduction: "Magnetic field lines flow from North pole to South pole and never intersect."
    },
    {
      question: "Why does the North pole of a magnetic compass point toward Earth's geographic North Pole?",
      conceptTitle: "Geomagnetism & Magnetic Polarity",
      explanation: "Opposites attract. The geographic North pole of the Earth behaves like a magnetic South pole, attracting the North-seeking pole of the compass needle.",
      keyDeduction: "Earth's geographic North is magnetically a South pole."
    }
  ],
  "magnetic-field-current-conductor": [
    {
      question: "What rule determines the direction of circular magnetic field lines around a straight current-carrying wire?",
      conceptTitle: "Right-Hand Grip Rule",
      explanation: "Grasp the wire with the right hand so the thumb points in the direction of conventional electric current (+ to -); the curled fingers indicate the circular direction of magnetic field lines.",
      keyDeduction: "Right-Hand Grip Rule: Thumb = Current direction, Curled fingers = Magnetic field direction."
    },
    {
      question: "How does winding a straight conductor into a multi-turn solenoid intensify the magnetic field?",
      conceptTitle: "Solenoid Field Superposition",
      explanation: "Each circular loop produces its own magnetic field. In a solenoid, the individual fields inside the coil add together constructively by superposition, creating a strong, uniform magnetic field like a bar magnet.",
      keyDeduction: "B ∝ n·I (Field is proportional to turns per meter n and current I)"
    }
  ],
  "force-on-conductor-magnetic-field": [
    {
      question: "Which hand rule predicts the direction of magnetic force on a current-carrying conductor in a magnetic field?",
      conceptTitle: "Fleming's Left-Hand Rule (Motor Rule)",
      explanation: "Hold the thumb, forefinger, and middle finger of the left hand mutually perpendicular: Forefinger = Field (N to S), seCond finger = Current (+ to -), and Thumb = Motion / Force direction.",
      keyDeduction: "F = B·I·L·sin(θ) [Max force when conductor is perpendicular to field]"
    },
    {
      question: "How is this Lorentz magnetic force utilized in electric motors and loudspeakers?",
      conceptTitle: "Electromechanical Transduction",
      explanation: "Current through the voice coil or motor armature interacting with a permanent magnetic field produces mechanical torque or acoustic membrane vibration.",
      keyDeduction: "Electric current in magnetic field generates continuous mechanical motion."
    }
  ],
  "simple-dc-motor-model": [
    {
      question: "What is the critical role of the split-ring commutator in a DC electric motor?",
      conceptTitle: "Commutation & Continuous Unidirectional Rotation",
      explanation: "Every half-rotation (180°), the split-ring segments swap contact with the carbon brushes, reversing current direction through the armature coil to maintain continuous rotation in the same direction.",
      keyDeduction: "Split-ring commutator reverses current every 180° to prevent motor stalls."
    },
    {
      question: "What three modifications will increase the rotational speed and torque of a DC motor?",
      conceptTitle: "Motor Performance Optimization",
      explanation: "Increasing current, using stronger permanent magnets, increasing the number of coil turns, and winding the coil around a soft-iron armature core enhance torque.",
      keyDeduction: "Torque increases with: More coil turns, stronger magnetic field, and higher current."
    }
  ],
  "electromagnetic-induction-coil-magnet": [
    {
      question: "How does relative motion between a magnet and a coil induce an electromotive force (EMF)?",
      conceptTitle: "Faraday's Law of Electromagnetic Induction",
      explanation: "Whenever magnetic flux lines linking a closed circuit change with time, an induced electromotive force (EMF) is generated proportional to the rate of change of magnetic flux linkage.",
      keyDeduction: "Induced EMF ε = -N · (dΦ/dt) (Faraday's Law)"
    },
    {
      question: "According to Lenz's law, why does moving a North pole into a coil create an opposing North pole at that coil face?",
      conceptTitle: "Lenz's Law & Conservation of Energy",
      explanation: "Lenz's law states that the direction of induced current always opposes the magnetic change that produced it, ensuring mechanical work must be done to generate electrical energy.",
      keyDeduction: "Induced current direction opposes the change in magnetic flux (Lenz's Law)."
    }
  ],
  "mutual-induction-transformer-principle": [
    {
      question: "Why do transformers operate only on Alternating Current (AC) and NOT Direct Current (DC)?",
      conceptTitle: "Varying Magnetic Flux Requirement",
      explanation: "Induction requires a continuously changing magnetic flux (dΦ/dt). AC current alternates cyclically, creating a varying magnetic field in the core. Steady DC produces a static field, inducing zero voltage in the secondary coil.",
      keyDeduction: "Transformers require changing magnetic flux from AC; steady DC produces no induction."
    },
    {
      question: "How does the transformer turns ratio relate primary and secondary voltages?",
      conceptTitle: "Transformer Turns Ratio Formula",
      explanation: "The ratio of secondary voltage (Vs) to primary voltage (Vp) equals the ratio of secondary coil turns (Ns) to primary coil turns (Np).",
      keyDeduction: "Vs / Vp = Ns / Np (Step-Up if Ns > Np; Step-Down if Ns < Np)"
    }
  ],
  "diode-forward-reverse-bias": [
    {
      question: "Why does a PN junction semiconductor diode conduct current only when forward biased?",
      conceptTitle: "Depletion Region Dynamics",
      explanation: "Forward bias (+ to P, - to N) narrows and overcomes the internal depletion barrier, enabling majority carriers to cross. Reverse bias widens the depletion layer, blocking current flow.",
      keyDeduction: "Forward Bias: High current (Conducting) | Reverse Bias: Zero current (Blocking)"
    },
    {
      question: "How does the one-way valve property of diodes enable AC to DC rectification in power adapters?",
      conceptTitle: "Rectification Fundamentals",
      explanation: "Diodes pass only the positive half-cycles of alternating current while blocking negative half-cycles, converting bidirectional AC into pulsating unidirectional DC.",
      keyDeduction: "Diodes act as electronic one-way valves for AC-to-DC conversion."
    }
  ],
  "transistor-switching-action": [
    {
      question: "How does a small base current control a large collector current in an NPN transistor?",
      conceptTitle: "Transistor Switching Principle",
      explanation: "Applying a tiny forward-bias voltage (> 0.7 V) to the base injects charge carriers that turn on conduction between collector and emitter, acting as a rapid electronic switch with no moving parts.",
      keyDeduction: "Small base current (Ib) switches large collector current (Ic) ON and OFF."
    },
    {
      question: "What are the key advantages of electronic transistor switches over mechanical relays?",
      conceptTitle: "Solid-State Advantages",
      explanation: "Transistors have no moving parts to wear out, operate in nanoseconds, produce no contact sparking, and consume negligible control power.",
      keyDeduction: "High speed, zero mechanical wear, silent operation, and long operating lifespan."
    }
  ],
  "transistor-ldr-dark-sensor": [
    {
      question: "Why does an LDR (Light Dependent Resistor) trigger the transistor switch when darkness falls?",
      conceptTitle: "Potential Divider & LDR Resistance",
      explanation: "In darkness, LDR resistance increases dramatically (to mega-ohms). In a potential divider circuit, this raises base voltage above 0.7 V, switching the transistor ON and illuminating the LED.",
      keyDeduction: "Darkness → LDR resistance rises → Base voltage rises (>0.7V) → Lamp switches ON."
    },
    {
      question: "What is the purpose of the variable resistor (potentiometer) in the dark sensor circuit?",
      conceptTitle: "Sensitivity Calibration",
      explanation: "The variable resistor adjusts the voltage division ratio, allowing precise calibration of the darkness threshold at which the automatic street light turns on.",
      keyDeduction: "Potentiometer sets the exact ambient light sensitivity threshold."
    }
  ],
  "transverse-and-longitudinal-waves": [
    {
      question: "How do particle vibrations differ between transverse waves and longitudinal waves?",
      conceptTitle: "Direction of Particle Oscillation",
      explanation: "In transverse waves (e.g. water surface waves, light), particles oscillate perpendicular to energy propagation. In longitudinal waves (e.g. sound waves, slinky spring compressions), particles oscillate parallel to wave motion.",
      keyDeduction: "Transverse: Perpendicular oscillation (Crests & Troughs) | Longitudinal: Parallel oscillation (Compressions & Rarefactions)"
    },
    {
      question: "What wave property determines the pitch of a sound wave vs. its loudness?",
      conceptTitle: "Sound Frequency & Amplitude",
      explanation: "Pitch is determined strictly by the wave frequency (vibrations per second, Hz), while loudness is determined by wave amplitude (energy carried by the wave).",
      keyDeduction: "Pitch ∝ Frequency (Hz) | Loudness ∝ Amplitude²"
    }
  ]
};

// Universal helper to retrieve curated or generated scientific explanation
export function getConceptExplanations(slug: string, questions: string[] = []): ConceptExplanation[] {
  if (CONCLUSION_EXPLANATIONS[slug]) {
    return CONCLUSION_EXPLANATIONS[slug];
  }

  // If questions exist but slug wasn't in explicit table, construct structured explanations
  if (questions.length > 0) {
    return questions.map((q, idx) => ({
      question: q,
      conceptTitle: `Curriculum Scientific Deduction ${idx + 1}`,
      explanation: `According to the Sri Lankan O/L Science syllabus, this observation directly verifies the expected scientific principle under standard laboratory conditions.`,
      keyDeduction: `Observation aligns with standard curriculum theory and verified experimental evidence.`
    }));
  }

  return [];
}
