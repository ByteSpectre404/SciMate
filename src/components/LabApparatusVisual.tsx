import React from "react";
import {
  getSubstanceInfo,
  getResultantAppearance,
  calculateMeterReading,
} from "../lib/chemistry/known-substances";

interface LabApparatusVisualProps {
  itemId: string;
  size?: "sm" | "md" | "lg" | "xl";
  state?: "idle" | "active" | "connected" | "heating" | "reacting";
  className?: string;
  accumulatedItems?: string[]; // Item IDs added in prior or current steps
  expectedValue?: string;
  resultColor?: string;
  resultState?: string;
}

export const LabApparatusVisual: React.FC<LabApparatusVisualProps> = ({
  itemId,
  size = "md",
  state = "idle",
  className = "",
  accumulatedItems = [],
  expectedValue,
  resultColor,
  resultState,
}) => {
  const normId = itemId.toLowerCase().replace(/[^a-z0-9]/g, "_");

  const dimensions = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  }[size];

  // Helper check for accumulated item keys
  const hasAccItem = (...keys: string[]) => {
    return accumulatedItems.some((acc) => {
      const normAcc = acc.toLowerCase().replace(/[^a-z0-9]/g, "_");
      return keys.some((k) => normAcc.includes(k.toLowerCase()));
    });
  };

  // Get scientifically calculated liquid appearance
  const appearance = getResultantAppearance(accumulatedItems, resultColor, resultState);

  // Render specific realistic 2D SVG visual
  const renderVisual = () => {
    // 1. ENVIRONMENTAL WASTE BINS (COLOR-CODED RECYCLING & COMPOST BINS)
    if (
      normId.includes("paper_bin") ||
      normId.includes("compost_bin") ||
      normId.includes("plastic_bin") ||
      normId.includes("metal_bin") ||
      (normId.includes("bin") && !normId.includes("combin"))
    ) {
      let binColor = "#3b82f6"; // Blue (Paper)
      let binLabel = "PAPER";
      let binIcon = "📄";
      if (normId.includes("green") || normId.includes("compost")) {
        binColor = "#16a34a"; // Green (Compost / Organic)
        binLabel = "ORGANIC";
        binIcon = "🍂";
      } else if (normId.includes("orange") || normId.includes("plastic")) {
        binColor = "#f97316"; // Orange (Plastic / Polythene)
        binLabel = "PLASTIC";
        binIcon = "🧴";
      } else if (normId.includes("red") || normId.includes("metal") || normId.includes("ewaste")) {
        binColor = "#dc2626"; // Red (Metal / E-Waste / Glass)
        binLabel = "METAL/E-WASTE";
        binIcon = "🔋";
      }

      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Bin Lid */}
          <path d="M 22 28 L 78 28 L 72 20 L 28 20 Z" fill={binColor} stroke="#0f172a" strokeWidth="2" />
          <rect x="42" y="14" width="16" height="6" rx="2" fill="#334155" />
          {/* Bin Tapered Body */}
          <path d="M 26 28 L 32 88 Q 33 92 38 92 L 62 92 Q 67 92 68 88 L 74 28 Z" fill={binColor} stroke="#0f172a" strokeWidth="2" />
          {/* Vertical Ribbing Lines */}
          <line x1="40" y1="36" x2="43" y2="84" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <line x1="50" y1="36" x2="50" y2="84" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <line x1="60" y1="36" x2="57" y2="84" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          {/* Recycle Symbol / Badge */}
          <circle cx="50" cy="55" r="14" fill="#ffffff" opacity="0.9" />
          <text x="50" y="60" textAnchor="middle" fontSize="14">{binIcon}</text>
          {/* Bin Label Text */}
          <rect x="25" y="74" width="50" height="12" rx="2" fill="#0f172a" opacity="0.8" />
          <text x="50" y="82.5" textAnchor="middle" fill="#ffffff" fontSize="5.5" fontWeight="bold" fontFamily="monospace">
            {binLabel}
          </text>
        </svg>
      );
    }

    // 2. SOLID WASTE ITEMS (PAPER/CARDBOARD, ORGANIC FOOD, PLASTIC, E-WASTE)
    if (
      normId.includes("cardboard_waste") ||
      normId.includes("organic_food_waste") ||
      normId.includes("plastic_polythene_waste") ||
      normId.includes("metallic_ewaste")
    ) {
      if (normId.includes("organic")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* Apple Core */}
            <path d="M 46 25 Q 50 15 56 12" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 38 25 Q 50 32 62 25 Q 60 48 56 50 Q 60 52 62 75 Q 50 68 38 75 Q 40 52 44 50 Q 40 48 38 25 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
            <circle cx="50" cy="42" r="2" fill="#78350f" />
            <circle cx="50" cy="58" r="2" fill="#78350f" />
            {/* Banana Peel Scrap */}
            <path d="M 20 75 Q 40 85 75 70 Q 82 78 68 85 Q 35 92 18 80 Z" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
            <text x="50" y="96" textAnchor="middle" fill="#15803d" fontSize="7" fontWeight="bold" fontFamily="monospace">ORGANIC WASTE</text>
          </svg>
        );
      }
      if (normId.includes("plastic")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* Crushed Plastic Bottle */}
            <rect x="44" y="16" width="12" height="8" rx="2" fill="#0284c7" />
            <path d="M 40 24 L 60 24 L 68 40 L 58 55 L 66 70 L 60 84 L 40 84 L 34 70 L 42 55 L 32 40 Z" fill="rgba(224,242,254,0.85)" stroke="#0284c7" strokeWidth="2" />
            <line x1="38" y1="45" x2="62" y2="45" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,2" />
            <line x1="36" y1="62" x2="64" y2="62" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x="50" y="95" textAnchor="middle" fill="#ea580c" fontSize="7" fontWeight="bold" fontFamily="monospace">PLASTIC / PET</text>
          </svg>
        );
      }
      if (normId.includes("ewaste") || normId.includes("metallic")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* Broken Green PCB Board with Copper Traces */}
            <rect x="22" y="25" width="56" height="50" rx="3" fill="#15803d" stroke="#14532d" strokeWidth="2" />
            <path d="M 30 35 L 45 35 L 50 45 L 68 45" fill="none" stroke="#facc15" strokeWidth="2" />
            <path d="M 30 55 L 40 55 L 50 65 L 70 65" fill="none" stroke="#facc15" strokeWidth="2" />
            <circle cx="30" cy="35" r="3" fill="#cbd5e1" stroke="#334155" />
            <circle cx="68" cy="45" r="3" fill="#cbd5e1" stroke="#334155" />
            <rect x="42" y="48" width="16" height="12" rx="1" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            <text x="50" y="90" textAnchor="middle" fill="#dc2626" fontSize="7" fontWeight="bold" fontFamily="monospace">E-WASTE / SCRAP</text>
          </svg>
        );
      }
      // Paper / Cardboard waste
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Cardboard Box & Newspaper sheaf */}
          <polygon points="30,40 60,25 85,38 55,55" fill="#d97706" stroke="#92400e" strokeWidth="2" />
          <polygon points="30,40 55,55 55,85 30,70" fill="#b45309" stroke="#92400e" strokeWidth="2" />
          <polygon points="55,55 85,38 85,68 55,85" fill="#78350f" stroke="#92400e" strokeWidth="2" />
          <line x1="20" y1="75" x2="45" y2="88" stroke="#ffffff" strokeWidth="4" />
          <text x="50" y="96" textAnchor="middle" fill="#0284c7" fontSize="7" fontWeight="bold" fontFamily="monospace">PAPER & BOARD</text>
        </svg>
      );
    }

    // 3. FOOD ADDITIVE DOSSIERS, CODEX CHARTS & E-NUMBER LABELS
    if (
      normId.includes("dossier") ||
      normId.includes("codex") ||
      normId.includes("e_number") ||
      normId.includes("additive") ||
      normId.includes("health_matrix") ||
      normId.includes("seasoning_label") ||
      normId.includes("soft_drink_label")
    ) {
      if (normId.includes("codex") || normId.includes("chart") || normId.includes("matrix")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* Official Codex E-Number Reference Matrix */}
            <rect x="12" y="14" width="76" height="72" rx="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
            <rect x="12" y="14" width="76" height="14" rx="3" fill="#0e2a47" />
            <text x="50" y="24" textAnchor="middle" fill="#f8fafc" fontSize="7" fontWeight="bold" fontFamily="sans-serif">CODEX E-NUMBERS</text>
            {/* Color Category Rows */}
            <rect x="18" y="34" width="12" height="10" rx="1.5" fill="#ef4444" />
            <text x="36" y="42" fill="#0f172a" fontSize="6.5" fontWeight="bold">E100s: Colourings</text>
            <rect x="18" y="48" width="12" height="10" rx="1.5" fill="#f59e0b" />
            <text x="36" y="56" fill="#0f172a" fontSize="6.5" fontWeight="bold">E200s: Preservatives</text>
            <rect x="18" y="62" width="12" height="10" rx="1.5" fill="#22c55e" />
            <text x="36" y="70" fill="#0f172a" fontSize="6.5" fontWeight="bold">E300s: Antioxidants</text>
            <rect x="18" y="76" width="12" height="10" rx="1.5" fill="#3b82f6" />
            <text x="36" y="84" fill="#0f172a" fontSize="6.5" fontWeight="bold">E600s: Flavour Boost</text>
          </svg>
        );
      }
      // Product Nutrition & Additive Ingredient Label / Dossier
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Folder Dossier Backing */}
          <path d="M 15 20 L 40 20 L 48 26 L 85 26 L 85 86 L 15 86 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          {/* White Food Facts Sheet */}
          <rect x="22" y="28" width="56" height="54" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <text x="50" y="38" textAnchor="middle" fill="#0f172a" fontSize="6" fontWeight="bold">INGREDIENTS</text>
          <line x1="26" y1="41" x2="74" y2="41" stroke="#0f172a" strokeWidth="1.5" />
          <text x="26" y="49" fill="#475569" fontSize="5">Sugar, Water, Flavour</text>
          <rect x="26" y="53" width="48" height="10" rx="2" fill="#fee2e2" stroke="#ef4444" strokeWidth="0.8" />
          <text x="50" y="60.5" textAnchor="middle" fill="#b91c1c" fontSize="5.5" fontWeight="bold">E102, E211, E621</text>
          <text x="50" y="72" textAnchor="middle" fill="#15803d" fontSize="5" fontWeight="bold">O/L AUDIT PASS</text>
        </svg>
      );
    }

    // 4. ACID RAIN & DROUGHT COMPARISON (TITRATION WELL CAVITIES & TEST SAMPLES)
    if (normId.includes("cavity") || normId.includes("rainwater")) {
      const isDrought = normId.includes("drought") || normId.includes("cavity_b");
      const wellColor = isDrought ? "#ef4444" : "#22c55e"; // Drought rain turns indicator red/orange (pH 4.2), normal rain yellow/green (pH 6.5)
      const phText = isDrought ? "pH 4.2 (ACIDIC)" : "pH 6.5 (NORMAL)";

      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* White Porcelain Reaction Block Cavity */}
          <rect x="18" y="20" width="64" height="60" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
          {/* Circular Depressed Well Cavity */}
          <circle cx="50" cy="46" r="22" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
          <circle cx="50" cy="46" r="18" fill={wellColor} opacity="0.85" />
          {/* Dropper liquid droplet ripple */}
          <circle cx="50" cy="46" r="8" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" className="animate-ping" />
          <text x="50" y="74" textAnchor="middle" fill="#0f172a" fontSize="6" fontWeight="bold" fontFamily="monospace">
            {isDrought ? "CAVITY B: DROUGHT" : "CAVITY A: NORMAL"}
          </text>
          <text x="50" y="92" textAnchor="middle" fill={isDrought ? "#dc2626" : "#16a34a"} fontSize="6.5" fontWeight="bold" fontFamily="monospace">
            {phText}
          </text>
        </svg>
      );
    }

    // 5. BREATHING MECHANISM (BELL JAR WITH BALLOON LUNGS & RUBBER DIAPHRAGM)
    if (normId.includes("bell_jar") || normId.includes("diaphragm")) {
      const isPulled = state === "active" || normId.includes("pull") || hasAccItem("pull");
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Top Cork Stopper with Y-Tube (Trachea) */}
          <rect x="42" y="10" width="16" height="8" rx="2" fill="#a16207" />
          <line x1="50" y1="4" x2="50" y2="28" stroke="#0284c7" strokeWidth="3.5" />
          {/* Y-Tube Branching Bronchi */}
          <line x1="50" y1="28" x2="38" y2="40" stroke="#0284c7" strokeWidth="3" />
          <line x1="50" y1="28" x2="62" y2="40" stroke="#0284c7" strokeWidth="3" />
          {/* Bell Jar Glass Dome */}
          <path d="M 42 18 C 30 20 22 35 22 75 L 78 75 C 78 35 70 20 58 18 Z" fill="rgba(240,249,255,0.75)" stroke="#0284c7" strokeWidth="2.5" />
          {/* Left Balloon Lung (Expands on Diaphragm Pull) */}
          <ellipse
            cx="37"
            cy="48"
            rx={isPulled ? "10" : "6"}
            ry={isPulled ? "14" : "9"}
            fill="#f43f5e"
            stroke="#be123c"
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          {/* Right Balloon Lung */}
          <ellipse
            cx="63"
            cy="48"
            rx={isPulled ? "10" : "6"}
            ry={isPulled ? "14" : "9"}
            fill="#f43f5e"
            stroke="#be123c"
            strokeWidth="1.5"
            className="transition-all duration-500"
          />
          {/* Flexible Rubber Sheet Diaphragm at Bottom */}
          <path
            d={isPulled ? "M 22 75 Q 50 92 78 75" : "M 22 75 Q 50 64 78 75"}
            fill="none"
            stroke="#e11d48"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Pull string / tab */}
          <line x1="50" y1={isPulled ? "84" : "70"} x2="50" y2={isPulled ? "96" : "82"} stroke="#94a3b8" strokeWidth="2" strokeDasharray="2,2" />
          <polygon points="50,98 46,92 54,92" fill="#e11d48" />
          <text x="50" y="62" textAnchor="middle" fill="#0369a1" fontSize="6.5" fontWeight="bold">
            {isPulled ? "INHALATION (LUNGS INFLATE)" : "EXHALATION"}
          </text>
        </svg>
      );
    }

    // 6. SAND BOTTLES (POTENTIAL ENERGY & PRESSURE EXPERIMENTS) & CLAY BED
    if (normId.includes("bottle") || normId.includes("sand") || normId.includes("clay")) {
      if (normId.includes("clay")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* Clay Tray Base */}
            <rect x="15" y="45" width="70" height="40" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            {/* Smooth Modeling Clay Surface */}
            <rect x="18" y="48" width="64" height="34" rx="2" fill="#d97706" />
            {/* Depression / Crater from dropped bottle */}
            {hasAccItem("bottle", "drop", "sand") ? (
              <ellipse cx="50" cy="62" rx="14" ry="8" fill="#92400e" stroke="#451a03" strokeWidth="1.5" />
            ) : (
              <line x1="25" y1="62" x2="75" y2="62" stroke="#b45309" strokeWidth="1.5" strokeDasharray="4,4" />
            )}
            {/* Wooden Smoothing Blade */}
            <rect x="52" y="24" width="30" height="10" rx="2" fill="#fde68a" stroke="#d97706" strokeWidth="1" transform="rotate(-20 52 24)" />
            <text x="50" y="92" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace">SMOOTH CLAY BED</text>
          </svg>
        );
      }
      // Plastic Sand Bottles (Empty, 1/4 full, Full)
      const isFull = normId.includes("full");
      const isQuarter = normId.includes("quarter");
      const sandHeight = isFull ? 48 : isQuarter ? 15 : 0;
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Bottle Cap */}
          <rect x="42" y="12" width="16" height="8" rx="2" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
          {/* Bottle Neck */}
          <rect x="45" y="20" width="10" height="8" fill="rgba(240,249,255,0.9)" stroke="#0284c7" strokeWidth="2" />
          {/* Clear Bottle Body */}
          <path d="M 45 28 L 30 40 L 30 84 Q 30 88 35 88 L 65 88 Q 70 88 70 84 L 70 40 L 55 28 Z" fill="rgba(240,249,255,0.85)" stroke="#0284c7" strokeWidth="2.5" />
          {/* Sand Fill */}
          {sandHeight > 0 && (
            <path
              d={`M 31 ${86 - sandHeight} L 69 ${86 - sandHeight} L 69 84 Q 69 87 65 87 L 35 87 Q 31 87 31 84 Z`}
              fill="#f59e0b"
            />
          )}
          {/* Sand Grains texture */}
          {sandHeight > 0 && (
            <g opacity="0.6">
              <circle cx="42" cy="74" r="1.5" fill="#78350f" />
              <circle cx="56" cy="68" r="1.5" fill="#78350f" />
              <circle cx="48" cy="80" r="1.5" fill="#78350f" />
            </g>
          )}
          <text x="50" y="58" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold" fontFamily="monospace">
            {isFull ? "FULL SAND" : isQuarter ? "1/4 SAND" : "EMPTY BOTTLE"}
          </text>
        </svg>
      );
    }

    // 7. SLINKY WAVE SPRINGS & RIBBON MARKERS
    if (normId.includes("slinky") || normId.includes("ribbon_marker")) {
      const isLongitudinal = normId.includes("push") || normId.includes("longitudinal");
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Smooth Table Support */}
          <line x1="5" y1="75" x2="95" y2="75" stroke="#64748b" strokeWidth="2" />
          {isLongitudinal ? (
            /* Longitudinal Wave: Compression & Rarefaction zones */
            <g>
              {/* Tight compression coil cluster */}
              <path d="M 10 50 C 12 35 14 65 16 50 C 18 35 20 65 22 50 C 24 35 26 65 28 50" fill="none" stroke="#475569" strokeWidth="3" />
              {/* Wide rarefaction stretch */}
              <path d="M 28 50 C 35 35 42 65 48 50 C 55 35 62 65 68 50" fill="none" stroke="#475569" strokeWidth="3" />
              {/* Next compression */}
              <path d="M 68 50 C 71 35 74 65 77 50 C 80 35 83 65 86 50 C 89 35 92 65 95 50" fill="none" stroke="#475569" strokeWidth="3" />
              <text x="20" y="30" fill="#dc2626" fontSize="6" fontWeight="bold">Compression</text>
              <text x="48" y="30" fill="#0284c7" fontSize="6" fontWeight="bold">Rarefaction</text>
            </g>
          ) : (
            /* Transverse Sine Wave Coils with Red Marker Ribbon */
            <g>
              <path
                d="M 8 50 Q 28 15 48 50 T 88 50"
                fill="none"
                stroke="#475569"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Red Ribbon Marker on center crest */}
              <circle cx="28" cy="24" r="5" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
              <path d="M 28 29 L 24 42 L 32 42 Z" fill="#ef4444" />
              <text x="28" y="15" textAnchor="middle" fill="#dc2626" fontSize="6.5" fontWeight="bold">Ribbon Crest</text>
            </g>
          )}
          <text x="50" y="90" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold" fontFamily="monospace">
            {isLongitudinal ? "LONGITUDINAL WAVE" : "TRANSVERSE WAVE"}
          </text>
        </svg>
      );
    }

    // 8. RAY TRACING, GLASS BLOCKS, OPTICAL PINS & CONCAVE MIRROR
    if (
      normId.includes("glass_sheet") ||
      normId.includes("glass_block") ||
      normId.includes("optical_pin") ||
      normId.includes("incident_line") ||
      normId.includes("emergent_side") ||
      normId.includes("ray_path") ||
      normId.includes("concave_mirror") ||
      normId.includes("mirror_screen") ||
      normId.includes("white_screen") ||
      normId.includes("axis_beyond")
    ) {
      if (normId.includes("pin")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* Optical Ray-Tracing Map Pins */}
            <line x1="35" y1="25" x2="35" y2="85" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="35" cy="25" r="9" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
            <line x1="65" y1="20" x2="65" y2="80" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="65" cy="20" r="9" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
            <text x="50" y="96" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold" fontFamily="monospace">OPTICAL PINS</text>
          </svg>
        );
      }
      if (normId.includes("mirror") || normId.includes("screen")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* Optical Bench Track */}
            <line x1="5" y1="78" x2="95" y2="78" stroke="#334155" strokeWidth="4" />
            {/* Concave Spherical Mirror on Stand */}
            <path d="M 25 24 Q 38 48 25 72" fill="none" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            <line x1="28" y1="72" x2="28" y2="85" stroke="#64748b" strokeWidth="3" />
            {/* White Projection Screen */}
            <rect x="68" y="26" width="6" height="46" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <line x1="71" y1="72" x2="71" y2="85" stroke="#64748b" strokeWidth="3" />
            {/* Focal Light Rays */}
            <line x1="25" y1="35" x2="68" y2="60" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,2" />
            <line x1="25" y1="60" x2="68" y2="35" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,2" />
            {/* Inverted Flame Image on Screen */}
            <path d="M 64 45 Q 60 48 64 52 Q 68 48 64 45 Z" fill="#ef4444" transform="rotate(180 64 48)" />
            <text x="50" y="94" textAnchor="middle" fill="#0369a1" fontSize="6.5" fontWeight="bold" fontFamily="monospace">CONCAVE MIRROR & SCREEN</text>
          </svg>
        );
      }
      // Glass Block Refraction Sheet
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Drawing Sheet */}
          <rect x="12" y="12" width="76" height="76" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          {/* Rectangular Glass Block */}
          <rect x="25" y="32" width="50" height="36" rx="2" fill="rgba(224,242,254,0.75)" stroke="#0284c7" strokeWidth="2" />
          {/* Normal dashed lines */}
          <line x1="42" y1="20" x2="42" y2="44" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="58" y1="56" x2="58" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
          {/* Incident, Refracted, Emergent Rays */}
          <line x1="20" y1="18" x2="42" y2="32" stroke="#dc2626" strokeWidth="2.5" />
          <line x1="42" y1="32" x2="58" y2="68" stroke="#dc2626" strokeWidth="2.5" />
          <line x1="58" y1="68" x2="80" y2="82" stroke="#dc2626" strokeWidth="2.5" />
          <text x="50" y="52" textAnchor="middle" fill="#0284c7" fontSize="7" fontWeight="bold">GLASS BLOCK</text>
        </svg>
      );
    }

    // 9. ELECTROSTATICS & LOW-FRICTION NEEDLE BEARING STAND
    if (
      normId.includes("needle_bearing") ||
      normId.includes("sewing_needle") ||
      normId.includes("polythene_cloth") ||
      normId.includes("electrostatic")
    ) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Sturdy Insulated Base Stand */}
          <polygon points="35,88 65,88 72,95 28,95" fill="#334155" stroke="#0f172a" strokeWidth="2" />
          {/* Upright Sharp Needle Pivot Point */}
          <line x1="50" y1="40" x2="50" y2="88" stroke="#64748b" strokeWidth="3" />
          <polygon points="50,36 47,42 53,42" fill="#0f172a" />
          {/* Balanced Rotating Needle / Charged Rod */}
          <g transform="rotate(-20 50 38)">
            <line x1="15" y1="38" x2="85" y2="38" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="38" r="4.5" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.5" />
            {/* Charged Polarity Sparks */}
            <text x="20" y="32" fill="#dc2626" fontSize="9" fontWeight="bold">- - -</text>
            <text x="70" y="32" fill="#dc2626" fontSize="9" fontWeight="bold">- - -</text>
          </g>
          <text x="50" y="22" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="bold" fontFamily="monospace">NEEDLE BEARING</text>
        </svg>
      );
    }

    // 10. AUDIO FREQUENCY SIGNAL GENERATOR & SPEAKER & AMPLIFIER
    if (
      normId.includes("signal_generator") ||
      normId.includes("speaker") ||
      normId.includes("amplifier") ||
      normId.includes("base_emitter")
    ) {
      if (normId.includes("speaker")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* Dynamic Speaker Magnet & Cone */}
            <rect x="18" y="36" width="22" height="28" rx="3" fill="#334155" stroke="#0f172a" strokeWidth="2" />
            <path d="M 40 36 L 70 18 L 70 82 L 40 64 Z" fill="#475569" stroke="#0f172a" strokeWidth="2" />
            {/* Sound Wave Ripples */}
            <path d="M 76 34 Q 88 50 76 66" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" className="animate-pulse" />
            <path d="M 84 22 Q 100 50 84 78" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" className="animate-pulse" />
            <text x="50" y="94" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold" fontFamily="monospace">MINI SPEAKER 8Ω</text>
          </svg>
        );
      }
      else if (normId.includes("amplifier")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* Op-Amp Triangle */}
            <polygon points="20,30 60,50 20,70" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="2" />
            {/* Inverting Input (-) */}
            <line x1="20" y1="25" x2="30" y2="25" stroke="#0284c7" strokeWidth="1.5" />
            {/* Non-inverting Input (+) */}
            <line x1="20" y1="35" x2="30" y2="35" stroke="#0284c7" strokeWidth="1.5" />
            {/* Output */}
            <line x1="60" y1="50" x2="80" y2="50" stroke="#0284c7" strokeWidth="2" />
            {/* Power Supplies */}
            <line x1="10" y1="10" x2="10" y2="90" stroke="#64748b" strokeWidth="1.5" />
            <line x1="90" y1="10" x2="90" y2="90" stroke="#64748b" strokeWidth="1.5" />
            <text x="50" y="88" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="bold" fontFamily="monospace">AMPLIFIER</text>
          </svg>
        );
      }
      // AF Signal Generator Device & Base Emitter
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Main Chassis Box */}
          <rect x="12" y="18" width="76" height="64" rx="6" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
          {/* Digital Frequency Readout */}
          <rect x="20" y="26" width="60" height="20" rx="3" fill="#022c22" stroke="#059669" strokeWidth="1.5" />
          <text x="50" y="40" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">1.00 kHz ~</text>
          {/* Control Dials */}
          <circle cx="32" cy="62" r="10" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          <line x1="32" y1="62" x2="38" y2="56" stroke="#f59e0b" strokeWidth="2" />
          {/* Output Terminals Red/Black */}
          <circle cx="62" cy="62" r="5" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
          <circle cx="76" cy="62" r="5" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
          <text x="50" y="92" textAnchor="middle" fill="#f8fafc" fontSize="7" fontWeight="bold" fontFamily="monospace">AF SIGNAL GENERATOR</text>
        </svg>
      );
    }

    // 11. TRANSFORMERS & MUTUAL INDUCTION
    if (
      normId.includes("transformer") ||
      normId.includes("primary_coil") ||
      normId.includes("enamelled_coil")
    ) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Laminated Soft Iron Core Rectangle with Hollow Center */}
          <rect x="18" y="20" width="64" height="60" rx="4" fill="#64748b" stroke="#334155" strokeWidth="3" />
          <rect x="36" y="36" width="28" height="28" rx="2" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
          {/* Primary Windings (Left - Copper Coils) */}
          <rect x="14" y="28" width="10" height="44" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
          <line x1="14" y1="36" x2="24" y2="36" stroke="#fef08a" strokeWidth="2" />
          <line x1="14" y1="44" x2="24" y2="44" stroke="#fef08a" strokeWidth="2" />
          <line x1="14" y1="52" x2="24" y2="52" stroke="#fef08a" strokeWidth="2" />
          <line x1="14" y1="60" x2="24" y2="60" stroke="#fef08a" strokeWidth="2" />
          {/* Secondary Windings (Right - High Turns) */}
          <rect x="76" y="24" width="10" height="52" rx="2" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
          <line x1="76" y1="30" x2="86" y2="30" stroke="#fef08a" strokeWidth="1.5" />
          <line x1="76" y1="38" x2="86" y2="38" stroke="#fef08a" strokeWidth="1.5" />
          <line x1="76" y1="46" x2="86" y2="46" stroke="#fef08a" strokeWidth="1.5" />
          <line x1="76" y1="54" x2="86" y2="54" stroke="#fef08a" strokeWidth="1.5" />
          <line x1="76" y1="62" x2="86" y2="62" stroke="#fef08a" strokeWidth="1.5" />
          <text x="50" y="92" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold" fontFamily="monospace">TRANSFORMER (Np/Ns)</text>
        </svg>
      );
    }

    // 12. DC MOTOR MODEL & AC GENERATOR
    if (
      normId.includes("motor") ||
      normId.includes("generator") ||
      normId.includes("rotor_coil") ||
      normId.includes("armature") ||
      normId.includes("commutator")
    ) {
      const isSpinning = state === "active" || state === "connected";
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* North Magnet Stator */}
          <path d="M 12 30 L 32 30 Q 38 50 32 70 L 12 70 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
          <text x="22" y="55" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">N</text>
          {/* South Magnet Stator */}
          <path d="M 88 30 L 68 30 Q 62 50 68 70 L 88 70 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
          <text x="78" y="55" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">S</text>
          {/* Central Rotating Armature Coil */}
          <g transform={`rotate(${isSpinning ? 45 : 0} 50 50)`} className={isSpinning ? "animate-spin origin-center" : ""}>
            <rect x="42" y="30" width="16" height="40" rx="2" fill="none" stroke="#d97706" strokeWidth="3.5" />
            <line x1="50" y1="18" x2="50" y2="82" stroke="#64748b" strokeWidth="2.5" />
          </g>
          {/* Split Ring Commutator */}
          <circle cx="50" cy="50" r="7" fill="none" stroke="#d97706" strokeWidth="2.5" strokeDasharray="9,3" />
          <text x="50" y="92" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold" fontFamily="monospace">DC MOTOR / ARMATURE</text>
        </svg>
      );
    }

    // 13. THERMAL EXPANSION (BALL & RING / BIMETALLIC STRIP)
    if (
      normId.includes("expanded_metal_ball") ||
      normId.includes("cold_iron_ball") ||
      normId.includes("brass_ring") ||
      normId.includes("bimetallic") ||
      normId.includes("thermal_expansion")
    ) {
      if (normId.includes("bimetallic")) {
        const isBending = state === "heating" || state === "active" || hasAccItem("heat", "burner");
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <rect x="14" y="42" width="12" height="24" rx="2" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
            {isBending ? (
              <g>
                <path d="M 26 50 Q 60 25 88 38" fill="none" stroke="#eab308" strokeWidth="5" strokeLinecap="round" />
                <path d="M 26 55 Q 60 30 88 43" fill="none" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
                <text x="60" y="20" fill="#dc2626" fontSize="7" fontWeight="bold">Brass (High Exp)</text>
                <text x="60" y="60" fill="#475569" fontSize="7" fontWeight="bold">Iron (Low Exp)</text>
              </g>
            ) : (
              <g>
                <line x1="26" y1="51" x2="88" y2="51" stroke="#eab308" strokeWidth="5" strokeLinecap="round" />
                <line x1="26" y1="57" x2="88" y2="57" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
                <text x="58" y="44" fill="#b45309" fontSize="7" fontWeight="bold">BRASS</text>
                <text x="58" y="70" fill="#334155" fontSize="7" fontWeight="bold">IRON</text>
              </g>
            )}
          </svg>
        );
      }
      // Gravesande's Ball & Ring Apparatus
      const isExpanded = state === "heating" || normId.includes("hot") || normId.includes("expanded") || hasAccItem("heat", "burner");
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <line x1="15" y1="50" x2="42" y2="50" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="50" r="14" fill="none" stroke="#ca8a04" strokeWidth="4" />
          <line x1="50" y1="12" x2="50" y2={isExpanded ? "38" : "50"} stroke="#94a3b8" strokeWidth="2" />
          <circle
            cx="50"
            cy={isExpanded ? "38" : "50"}
            r={isExpanded ? "16" : "12"}
            fill={isExpanded ? "#f59e0b" : "#e2e8f0"}
            stroke={isExpanded ? "#dc2626" : "#475569"}
            strokeWidth="2.5"
            className={isExpanded ? "animate-pulse" : ""}
          />
          <text x="50" y="86" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold" fontFamily="monospace">
            {isExpanded ? "EXPANDED (BLOCKED)" : "BALL & RING PASS"}
          </text>
        </svg>
      );
    }

    // 14. SPRING BALANCE / NEWTON METER / DYNAMOMETER
    if (
      normId.includes("spring_balance") ||
      normId.includes("newton_meter") ||
      normId.includes("dynamometer")
    ) {
      const readingValue = expectedValue || "5.0 N";
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <circle cx="50" cy="10" r="6" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <rect x="36" y="16" width="28" height="62" rx="4" fill="rgba(240, 249, 255, 0.9)" stroke="#0284c7" strokeWidth="2" />
          <line x1="42" y1="24" x2="48" y2="24" stroke="#0369a1" strokeWidth="1.5" />
          <line x1="42" y1="32" x2="46" y2="32" stroke="#0369a1" strokeWidth="1" />
          <line x1="42" y1="40" x2="48" y2="40" stroke="#0369a1" strokeWidth="1.5" />
          <line x1="42" y1="48" x2="46" y2="48" stroke="#0369a1" strokeWidth="1" />
          <line x1="42" y1="56" x2="48" y2="56" stroke="#0369a1" strokeWidth="1.5" />
          <path d="M 50 20 L 53 26 L 47 32 L 53 38 L 47 44 L 53 50 L 47 56 L 50 62" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          <polygon points="56,48 62,45 62,51" fill="#dc2626" />
          <text x="54" y="32" fill="#0369a1" fontSize="6" fontWeight="bold" fontFamily="monospace">N</text>
          <path d="M 50 78 L 50 86 Q 50 94 44 94 Q 38 94 38 88" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
          <text x="50" y="74" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold" fontFamily="monospace">{readingValue}</text>
        </svg>
      );
    }

    // 15. EUREKA CAN & MEASURING CYLINDERS
    if (
      normId.includes("eureka") ||
      normId.includes("overflow") ||
      normId.includes("cylinder") ||
      normId.includes("graduated")
    ) {
      if (normId.includes("cylinder") || normId.includes("measuring")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <polygon points="35,90 65,90 75,95 25,95" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <rect x="38" y="15" width="24" height="75" rx="2" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="2.5" />
            <rect x="39" y="45" width="22" height="44" fill="#38bdf8" opacity="0.75" />
            <ellipse cx="50" cy="45" rx="11" ry="3" fill="#0284c7" opacity="0.6" />
            <line x1="38" y1="25" x2="46" y2="25" stroke="#0369a1" strokeWidth="1.5" />
            <line x1="38" y1="35" x2="44" y2="35" stroke="#0369a1" strokeWidth="1" />
            <line x1="38" y1="45" x2="46" y2="45" stroke="#0369a1" strokeWidth="1.5" />
            <line x1="38" y1="55" x2="44" y2="55" stroke="#0369a1" strokeWidth="1" />
            <line x1="38" y1="65" x2="46" y2="65" stroke="#0369a1" strokeWidth="1.5" />
            <text x="50" y="38" textAnchor="middle" fill="#0369a1" fontSize="6" fontWeight="bold" fontFamily="monospace">50 ml</text>
          </svg>
        );
      }
      // Eureka Overflow Vessel
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <path d="M 25 30 L 25 84 Q 25 90 32 90 L 68 90 Q 75 90 75 84 L 75 30 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="2.5" />
          <ellipse cx="50" cy="30" rx="25" ry="6" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
          <path d="M 75 42 L 92 56 L 90 60 L 75 48 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
          <path d="M 26 44 L 74 44 L 74 84 Q 74 89 68 89 L 32 89 Q 26 89 26 84 Z" fill="#38bdf8" opacity="0.8" />
          <path d="M 91 58 Q 94 66 92 74" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,2" />
          <text x="50" y="68" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold" fontFamily="monospace">EUREKA CAN</text>
        </svg>
      );
    }

    // 16. SYRINGE & PISTON (GAS PRESSURE)
    if (normId.includes("syringe") || normId.includes("piston") || normId.includes("plunger")) {
      const isCompressed = state === "active" || state === "connected" || hasAccItem("finger", "press", "weight");
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <rect x="10" y="47" width="12" height="6" fill="#0284c7" />
          {isCompressed && <circle cx="8" cy="50" r="6" fill="#fbcfe8" stroke="#f43f5e" strokeWidth="1" />}
          <rect x="22" y="32" width="55" height="36" rx="3" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="2.5" />
          <rect x="75" y="24" width="4" height="52" rx="2" fill="#0284c7" />
          <line x1="32" y1="32" x2="32" y2="40" stroke="#0369a1" strokeWidth="1.5" />
          <line x1="42" y1="32" x2="42" y2="38" stroke="#0369a1" strokeWidth="1" />
          <line x1="52" y1="32" x2="52" y2="40" stroke="#0369a1" strokeWidth="1.5" />
          <rect x={isCompressed ? "34" : "55"} y="34" width="8" height="32" fill="#0f172a" rx="1" />
          <line x1={isCompressed ? "42" : "63"} y1="50" x2={isCompressed ? "78" : "96"} y2="50" stroke="#64748b" strokeWidth="5" />
          <circle cx={isCompressed ? "78" : "96"} cy="50" r="6" fill="#94a3b8" />
          <text x="50" y="80" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="bold" fontFamily="monospace">
            {isCompressed ? "GAS COMPRESSED" : "SYRINGE 20ml"}
          </text>
        </svg>
      );
    }

    // 17. CENTER-ZERO GALVANOMETER
    if (normId.includes("galvanometer") || normId.includes("microammeter")) {
      const isDeflecting = state === "active" || state === "connected";
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <rect x="14" y="14" width="72" height="72" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="3" />
          <rect x="20" y="20" width="60" height="44" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M 28 48 A 24 24 0 0 1 72 48" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="2,2" />
          <line x1="50" y1="26" x2="50" y2="32" stroke="#dc2626" strokeWidth="2" />
          <text x="50" y="38" textAnchor="middle" fill="#dc2626" fontSize="7" fontWeight="bold">0</text>
          <text x="32" y="44" textAnchor="middle" fill="#475569" fontSize="6">-30</text>
          <text x="68" y="44" textAnchor="middle" fill="#475569" fontSize="6">+30</text>
          <g transform={`rotate(${isDeflecting ? 28 : 0} 50 52)`} className={isDeflecting ? "animate-needle-sweep" : ""}>
            <line x1="50" y1="52" x2="50" y2="28" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
          </g>
          <circle cx="50" cy="52" r="3.5" fill="#0f172a" />
          <text x="50" y="78" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="900" fontFamily="monospace">G</text>
        </svg>
      );
    }

    // 18. ELECTROLYSIS / ELECTROPLATING CELL & ELECTRODES
    if (
      normId.includes("electrolysis") ||
      normId.includes("voltameter") ||
      normId.includes("electroplating") ||
      normId.includes("electrode") ||
      normId.includes("anode") ||
      normId.includes("cathode")
    ) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <rect x="18" y="32" width="64" height="58" rx="4" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="2.5" />
          <rect x="20" y="44" width="60" height="44" fill="#3b82f6" opacity="0.55" />
          <rect x="30" y="20" width="8" height="52" fill="#d97706" stroke="#78350f" strokeWidth="1" />
          <text x="34" y="16" textAnchor="middle" fill="#dc2626" fontSize="8" fontWeight="bold">+</text>
          <rect x="62" y="20" width="8" height="52" fill="#475569" stroke="#0f172a" strokeWidth="1" />
          <text x="66" y="16" textAnchor="middle" fill="#2563eb" fontSize="8" fontWeight="bold">-</text>
          <circle cx="34" cy="50" r="1.5" fill="#ffffff" className="animate-float-bubble" />
          <circle cx="66" cy="58" r="1.5" fill="#ffffff" className="animate-float-bubble" />
          <text x="50" y="86" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="bold" fontFamily="monospace">ELECTROLYSIS</text>
        </svg>
      );
    }

    // 19. GAS JAR & DEFLAGRATING SPOON
    if (
      normId.includes("gas_jar") ||
      normId.includes("deflagrating") ||
      normId.includes("combustion_spoon")
    ) {
      if (normId.includes("deflagrating") || normId.includes("spoon")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <path d="M 50 10 L 50 70 L 62 70" fill="none" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" />
            <circle cx="68" cy="70" r="8" fill="#eab308" stroke="#a16207" strokeWidth="1.5" />
            <path d="M 68 62 Q 74 66 68 70 Q 62 66 68 62 Z" fill="#ef4444" className="animate-pulse" />
            <text x="50" y="90" textAnchor="middle" fill="#78350f" fontSize="7" fontWeight="bold" fontFamily="monospace">DEFLAGRATING SPOON</text>
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <rect x="25" y="20" width="50" height="68" rx="4" fill="rgba(240, 249, 255, 0.8)" stroke="#0284c7" strokeWidth="3" />
          <rect x="20" y="14" width="60" height="6" rx="2" fill="rgba(224, 242, 254, 0.9)" stroke="#0284c7" strokeWidth="2" />
          <rect x="27" y="22" width="46" height="64" fill={appearance.color || "#e0f2fe"} opacity={appearance.opacity || 0.4} />
          <text x="50" y="60" textAnchor="middle" fill="#0369a1" fontSize="8" fontWeight="bold" fontFamily="monospace">GAS JAR</text>
        </svg>
      );
    }

    // 20. MOLECULAR MODELS (METHANE, ETHANE, ALKANES)
    if (
      normId.includes("methane") ||
      normId.includes("ethane") ||
      normId.includes("alkane") ||
      normId.includes("molecular") ||
      normId.includes("model_assembly")
    ) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <line x1="50" y1="50" x2="50" y2="20" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="50" x2="24" y2="70" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="50" x2="76" y2="70" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="50" x2="50" y2="82" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="50" r="14" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <text x="50" y="54" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">C</text>
          <circle cx="50" cy="20" r="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
          <text x="50" y="23" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">H</text>
          <circle cx="24" cy="70" r="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
          <text x="24" y="73" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">H</text>
          <circle cx="76" cy="70" r="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
          <text x="76" y="73" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">H</text>
          <circle cx="50" cy="82" r="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
          <text x="50" y="85" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">H</text>
        </svg>
      );
    }

    // 21. PETRI DISH & BREAD MOLD (MUCOR)
    if (
      normId.includes("petri_dish") ||
      normId.includes("mucor") ||
      normId.includes("bread_slice")
    ) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <circle cx="50" cy="50" r="40" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="32" y="32" width="36" height="36" rx="4" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
          <path d="M 38 48 Q 44 40 52 46 Q 60 42 64 50" fill="none" stroke="#f8fafc" strokeWidth="2.5" />
          <circle cx="42" cy="42" r="2.5" fill="#0f172a" />
          <circle cx="50" cy="38" r="3" fill="#0f172a" />
          <circle cx="58" cy="44" r="2.5" fill="#0f172a" />
          <circle cx="46" cy="54" r="2.5" fill="#0f172a" />
          <text x="50" y="84" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="bold" fontFamily="monospace">MUCOR COLONY</text>
        </svg>
      );
    }

    // 22. MONOCOT & DICOT BOTANICAL SPECIMENS (LEAF & ROOT ARRAYS)
    if (
      normId.includes("monocot") ||
      normId.includes("dicot") ||
      normId.includes("grass_plant") ||
      normId.includes("kuppameniya") ||
      normId.includes("tap_root") ||
      normId.includes("fibrous_root")
    ) {
      const isDicot = normId.includes("dicot") || normId.includes("kuppameniya") || normId.includes("tap");
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {isDicot ? (
            <g>
              <path d="M 50 10 C 25 25 25 45 50 55 C 75 45 75 25 50 10 Z" fill="#16a34a" stroke="#15803d" strokeWidth="2" />
              <line x1="50" y1="12" x2="50" y2="55" stroke="#86efac" strokeWidth="2" />
              <line x1="50" y1="25" x2="35" y2="20" stroke="#86efac" strokeWidth="1" />
              <line x1="50" y1="25" x2="65" y2="20" stroke="#86efac" strokeWidth="1" />
              <line x1="50" y1="55" x2="50" y2="92" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
              <line x1="50" y1="65" x2="36" y2="75" stroke="#b45309" strokeWidth="1.5" />
              <line x1="50" y1="65" x2="64" y2="75" stroke="#b45309" strokeWidth="1.5" />
              <text x="50" y="98" textAnchor="middle" fill="#15803d" fontSize="7" fontWeight="bold">DICOT (TAPROOT)</text>
            </g>
          ) : (
            <g>
              <path d="M 46 10 C 40 25 40 45 46 55 L 54 55 C 60 45 60 25 54 10 Z" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
              <line x1="48" y1="12" x2="48" y2="55" stroke="#bbf7d0" strokeWidth="1" />
              <line x1="50" y1="12" x2="50" y2="55" stroke="#bbf7d0" strokeWidth="1.5" />
              <line x1="50" y1="55" x2="32" y2="88" stroke="#92400e" strokeWidth="1.5" />
              <line x1="50" y1="55" x2="44" y2="92" stroke="#92400e" strokeWidth="1.5" />
              <line x1="50" y1="55" x2="56" y2="92" stroke="#92400e" strokeWidth="1.5" />
              <line x1="50" y1="55" x2="68" y2="88" stroke="#92400e" strokeWidth="1.5" />
              <text x="50" y="98" textAnchor="middle" fill="#15803d" fontSize="7" fontWeight="bold">MONOCOT (FIBROUS)</text>
            </g>
          )}
        </svg>
      );
    }

    // 23. SPOTTING TILES & PORCELAIN PLATES
    if (
      normId.includes("spotting_tile") ||
      normId.includes("porcelain") ||
      normId.includes("white_tile") ||
      normId.includes("dry_tile")
    ) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Glazed Porcelain Spotting Plate */}
          <rect x="15" y="15" width="70" height="70" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
          {/* 3x3 Cavity Wells */}
          {[28, 50, 72].map((cx) =>
            [28, 50, 72].map((cy) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
            ))
          )}
          {/* Active reaction spots */}
          {hasAccItem("iodine", "starch") && <circle cx="28" cy="28" r="6" fill="#1e1b4b" />}
          {hasAccItem("amylase") && <circle cx="50" cy="28" r="6" fill="#fde047" />}
          <text x="50" y="92" textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="bold" fontFamily="monospace">SPOTTING TILE</text>
        </svg>
      );
    }

    // 24. GLASS FILTER FUNNEL & SUCTION RIG
    if (normId.includes("funnel") || normId.includes("aspirator")) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Conical Funnel Body */}
          <polygon points="20,20 80,20 54,60 46,60" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="2.5" />
          {/* Stem Tube */}
          <polygon points="46,60 54,60 52,90 48,90" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="2" />
          {/* Filter Paper Cone Inside */}
          <polygon points="26,22 74,22 50,56" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
          <text x="50" y="16" textAnchor="middle" fill="#0284c7" fontSize="7" fontWeight="bold">FILTER FUNNEL</text>
        </svg>
      );
    }

    // 25. OPTICAL PRISM
    if (normId.includes("prism") || normId.includes("dispersion")) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <polygon points="50,15 15,78 85,78" fill="rgba(224, 242, 254, 0.85)" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="5" y1="52" x2="36" y2="48" stroke="#ffffff" strokeWidth="3" />
          <line x1="36" y1="48" x2="64" y2="52" stroke="#f59e0b" strokeWidth="2" />
          <line x1="64" y1="50" x2="95" y2="40" stroke="#ef4444" strokeWidth="2" />
          <line x1="64" y1="52" x2="95" y2="50" stroke="#22c55e" strokeWidth="2" />
          <line x1="64" y1="54" x2="95" y2="60" stroke="#3b82f6" strokeWidth="2" />
          <text x="50" y="74" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="bold" fontFamily="monospace">PRISM</text>
        </svg>
      );
    }

    // 26. OPTICAL LENSES & BENCH
    if (normId.includes("lens") || normId.includes("convex") || normId.includes("concave") || normId.includes("optical_bench")) {
      const isConvex = !normId.includes("concave");
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <rect x="42" y="75" width="16" height="18" rx="2" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="10" y1="92" x2="90" y2="92" stroke="#64748b" strokeWidth="4" />
          {isConvex ? (
            <path d="M 50 15 Q 64 45 50 75 Q 36 45 50 15 Z" fill="rgba(224, 242, 254, 0.85)" stroke="#0284c7" strokeWidth="2.5" />
          ) : (
            <path d="M 40 15 Q 46 45 40 75 L 60 75 Q 54 45 60 15 Z" fill="rgba(224, 242, 254, 0.85)" stroke="#0284c7" strokeWidth="2.5" />
          )}
          <line x1="5" y1="45" x2="95" y2="45" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />
          <text x="50" y="86" textAnchor="middle" fill="#f8fafc" fontSize="6" fontWeight="bold">
            {isConvex ? "CONVEX LENS" : "CONCAVE LENS"}
          </text>
        </svg>
      );
    }

    // 27. POTOMETER / TRANSPIRATION SETUP
    if (normId.includes("potometer") || normId.includes("transpiration")) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <path d="M 25 35 L 25 75 L 85 75" fill="none" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
          <path d="M 25 35 L 25 75 L 85 75" fill="none" stroke="#f0f9ff" strokeWidth="3" strokeLinecap="round" />
          <rect x="20" y="28" width="10" height="12" fill="#78350f" rx="2" />
          <path d="M 25 28 C 15 15 15 5 25 2 C 35 5 35 15 25 28 Z" fill="#16a34a" stroke="#15803d" strokeWidth="1.5" />
          <ellipse cx="60" cy="75" rx="4" ry="2" fill="#ef4444" className="animate-pulse" />
          <line x1="40" y1="82" x2="80" y2="82" stroke="#475569" strokeWidth="1.5" />
          <text x="60" y="92" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="bold" fontFamily="monospace">POTOMETER</text>
        </svg>
      );
    }

    // 28. TEST TUBES & BOILING TUBES & U-TUBES & STOPPERS
    if (normId.includes("tube") || normId.includes("u_tube") || normId.includes("manometer") || normId.includes("stopper")) {
      if (normId.includes("stopper")) {
        // Stopper SVG (rubber/bung stopper)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* Stopper body - tapered cylinder */}
            <path d="M 30 40 L 30 70 Q 30 75 35 78 L 65 78 Q 70 75 70 70 L 70 40" fill="#fbbf24" stroke="#92400e" strokeWidth="2" />
            {/* Stopper ridges */}
            <path d="M 35 45 L 65 45" stroke="#92400e" strokeWidth="1.5" />
            <path d="M 35 55 L 65 55" stroke="#92400e" strokeWidth="1.5" />
            <path d="M 35 65 L 65 65" stroke="#92400e" strokeWidth="1.5" />
            {/* Stopper handle */}
            <rect x="45" y="30" width="10" height="10" fill="#d97706" stroke="#92400e" strokeWidth="1.5" rx="2" />
            <text x="50" y="60" textAnchor="middle" fill="#92400e" fontSize="7" fontWeight="bold" fontFamily="monospace">STOPPER</text>
          </svg>
        );
      }
      const isUTube = normId.includes("u_tube") || normId.includes("manometer");
      if (isUTube) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <path d="M 28 20 L 28 65 Q 28 85 50 85 Q 72 85 72 65 L 72 20" fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" />
            <path d="M 28 20 L 28 65 Q 28 85 50 85 Q 72 85 72 65 L 72 20" fill="none" stroke="#f0f9ff" strokeWidth="8" strokeLinecap="round" />
            <path d="M 28 45 L 28 65 Q 28 85 50 85 Q 72 85 72 65 L 72 35" fill="none" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
            <text x="50" y="95" textAnchor="middle" fill="#0284c7" fontSize="7" fontWeight="bold">U-TUBE</text>
          </svg>
        );
      }
      // Standard / Boiling Test Tube
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <rect x="36" y="10" width="28" height="6" rx="2" fill="rgba(240, 249, 255, 0.9)" stroke="#0284c7" strokeWidth="2" />
          <path d="M 38 16 L 38 78 Q 38 90 50 90 Q 62 90 62 78 L 62 16 Z" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="2.5" />
          <path d="M 39 48 L 39 78 Q 39 89 50 89 Q 61 89 61 78 L 61 48 Z" fill={appearance.color || "#38bdf8"} opacity={appearance.opacity || 0.75} />
          <text x="50" y="40" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="bold" fontFamily="monospace">TEST TUBE</text>
        </svg>
      );
    }

    // 29. BEAKERS & FLASKS & CRUCIBLES & BASIN/TROUGH/VESSEL
    if (
      normId.includes("beaker") ||
      normId.includes("flask") ||
      normId.includes("crucible") ||
      normId.includes("basin") ||
      normId.includes("trough") ||
      normId.includes("vessel")
    ) {
      if (normId.includes("crucible")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <path d="M 25 35 L 75 35 L 68 78 Q 68 84 50 84 Q 32 84 32 78 Z" fill="#f8fafc" stroke="#64748b" strokeWidth="3" />
            <ellipse cx="50" cy="35" rx="25" ry="6" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
            <text x="50" y="60" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="bold">CRUCIBLE</text>
          </svg>
        );
      }
      else if (normId.includes("flask")) {
        // Flask SVG (Erlenmeyer/conical flask)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* Flask body */}
            <path d="M 30 20 L 30 60 Q 30 65 35 68 L 65 68 Q 70 65 70 60 L 70 20 L 65 15 L 35 15 Z" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="2.5" />
            {/* Flask neck */}
            <rect x="45" y="15" width="10" height="20" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="2" rx="2" />
            {/* Flask rim */}
            <rect x="42" y="35" width="16" height="5" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="2" rx="2" />
            <text x="50" y="50" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="bold" fontFamily="monospace">FLASK</text>
          </svg>
        );
      }
      else if (normId.includes("basin") || normId.includes("trough") || normId.includes("vessel")) {
        // Basin/Trough SVG (wide shallow container)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* Basin body */}
            <path d="M 20 30 L 80 30 L 85 40 L 85 70 L 80 80 L 20 80 L 15 70 L 15 40 Z" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="2.5" />
            {/* Water line */}
            <path d="M 25 50 L 75 50" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,2" />
            <text x="50" y="60" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="bold" fontFamily="monospace">BASIN</text>
          </svg>
        );
      }
      else {
        // Default beaker SVG
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <path d="M 24 18 L 18 18 L 18 24 L 24 84 Q 24 90 30 90 L 70 90 Q 76 90 76 84 L 82 24 L 82 18 L 76 18 L 76 24 Z" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="3" />
            <path d="M 25 44 L 75 44 L 75 84 Q 75 89 70 89 L 30 89 Q 25 89 25 84 Z" fill={appearance.color || "#38bdf8"} opacity={appearance.opacity || 0.75} />
            <text x="50" y="38" textAnchor="middle" fill="#0369a1" fontSize="8" fontWeight="bold" fontFamily="monospace">BEAKER</text>
          </svg>
        );
      }
    }

    // 30. BUNSEN BURNER & CANDLE & SPLINT & HEAT SOURCES
    if (
      normId.includes("burner") ||
      normId.includes("candle") ||
      normId.includes("splint") ||
      normId.includes("heat") ||
      normId.includes("flame")
    ) {
      if (normId.includes("candle")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <rect x="40" y="45" width="20" height="48" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            <line x1="50" y1="45" x2="50" y2="35" stroke="#0f172a" strokeWidth="2" />
            <path d="M 50 15 Q 58 26 50 35 Q 42 26 50 15 Z" fill="#f97316" className="animate-pulse" />
            <text x="50" y="80" textAnchor="middle" fill="#78350f" fontSize="7" fontWeight="bold">CANDLE</text>
          </svg>
        );
      }
      else if (normId.includes("splint")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <rect x="45" y="30" width="10" height="50" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />
            {/* Optional flame if active */}
            {state === "active" && (
              <>
                <path d="M 50 20 Q 52 10 50 5 Q 48 10 50 20 Z" fill="#f97316" />
                <path d="M 50 10 Q 51 5 50 0 Q 49 5 50 10 Z" fill="#fb923c" />
              </>
            )}
            <text x="50" y="88" textAnchor="middle" fill="#92400e" fontSize="7" fontWeight="bold" fontFamily="monospace">SPLINT</text>
          </svg>
        );
      }
      else if (normId.includes("heat")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <polygon points="25,90 75,90 70,95 30,95" fill="#334155" stroke="#0f172a" strokeWidth="2" />
            <rect x="45" y="42" width="10" height="48" fill="#64748b" stroke="#334155" strokeWidth="2" />
            <circle cx="50" cy="74" r="3" fill="#0f172a" />
            <text x="50" y="86" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="bold">HEAT SOURCE</text>
          </svg>
        );
      }
      else {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <polygon points="25,90 75,90 70,95 30,95" fill="#334155" stroke="#0f172a" strokeWidth="2" />
            <rect x="45" y="42" width="10" height="48" fill="#64748b" stroke="#334155" strokeWidth="2" />
            <circle cx="50" cy="74" r="3" fill="#0f172a" />
            <path d="M 50 12 Q 62 26 50 42 Q 38 26 50 12 Z" fill="#0284c7" className="animate-pulse" />
            <path d="M 50 20 Q 56 28 50 42 Q 44 28 50 20 Z" fill="#38bdf8" className="animate-pulse" />
            <text x="50" y="86" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="bold">BUNSEN</text>
          </svg>
        );
      }
    }

    // 31. MAGNETS & SOLENOIDS & COMPASS
    if (
      normId.includes("magnet") ||
      normId.includes("compass") ||
      normId.includes("solenoid") ||
      normId.includes("coil")
    ) {
      if (normId.includes("compass")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <circle cx="50" cy="50" r="40" fill="#ffffff" stroke="#334155" strokeWidth="4" />
            <text x="50" y="24" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">N</text>
            <text x="50" y="82" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="bold">S</text>
            <polygon points="50,26 44,50 56,50" fill="#dc2626" />
            <polygon points="50,74 44,50 56,50" fill="#2563eb" />
            <circle cx="50" cy="50" r="4" fill="#0f172a" />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <g transform="rotate(-15 50 50)">
            <rect x="20" y="36" width="30" height="28" rx="3" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
            <rect x="50" y="36" width="30" height="28" rx="3" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            <text x="35" y="55" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">N</text>
            <text x="65" y="55" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">S</text>
          </g>
        </svg>
      );
    }

    // 32. ELECTRICAL COMPONENTS (METERS, BATTERIES, SWITCHES, RESISTORS, DIODES)
    if (
      normId.includes("diode") ||
      normId.includes("transistor") ||
      normId.includes("switch") ||
      normId.includes("resistor") ||
      normId.includes("breadboard") ||
      normId.includes("ldr") ||
      normId.includes("potentiometer") ||
      normId.includes("power_supply") ||
      normId.includes("battery") ||
      normId.includes("cell") ||
      normId.includes("bulb") ||
      normId.includes("ammeter") ||
      normId.includes("voltmeter") ||
      normId.includes("multimeter") ||
      normId.includes("wire") ||
      normId.includes("circuit") ||
      normId.includes("terminal")
    ) {
      if (normId.includes("switch")) {
        const isClosed = state === "active" || state === "connected";
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <rect x="15" y="38" width="70" height="24" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <circle cx="32" cy="50" r="5" fill="#f59e0b" />
            <circle cx="68" cy="50" r="5" fill="#f59e0b" />
            <line x1="32" y1="50" x2={isClosed ? "68" : "60"} y2={isClosed ? "50" : "30"} stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
            <text x="50" y="80" textAnchor="middle" fill="#f59e0b" fontSize="7" fontWeight="bold">
              {isClosed ? "SWITCH CLOSED" : "SWITCH OPEN"}
            </text>
          </svg>
        );
      }
      else if (normId.includes("diode")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* Diode: triangle with vertical line at cathode */}
            <polyline points="30,40 50,30 50,60" stroke="#0284c7" strokeWidth="2" fill="none" />
            <line x1="50" y1="30" x2="50" y2="60" stroke="#0284c7" strokeWidth="2" />
            <text x="50" y="88" textAnchor="middle" fill="#0284c7" fontSize="7" fontWeight="bold" fontFamily="monospace">DIODE</text>
          </svg>
        );
      }
      else if (normId.includes("transistor")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            {/* NPN Transistor */}
            <circle cx="50" cy="50" r="20" stroke="#0284c7" strokeWidth="2" fill="none" />
            {/* Collector */}
            <line x1="50" y1="30" x2="50" y2="10" stroke="#0284c7" strokeWidth="2" />
            {/* Base */}
            <line x1="30" y1="50" x2="50" y2="50" stroke="#0284c7" strokeWidth="2" />
            {/* Emitter */}
            <line x1="50" y1="70" x2="70" y2="50" stroke="#0284c7" strokeWidth="2" />
            {/* Emitter arrow */}
            <path d="M 70 50 L 68 48 L 70 46 L 68 52 Z" fill="#0284c7" />
            <text x="50" y="88" textAnchor="middle" fill="#0284c7" fontSize="7" fontWeight="bold" fontFamily="monospace">TRANSISTOR</text>
          </svg>
        );
      }
      else if (normId.includes("resistor")) {
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <line x1="5" y1="50" x2="26" y2="50" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
            <line x1="74" y1="50" x2="95" y2="50" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
            <rect x="25" y="32" width="50" height="36" rx="6" fill="#fde047" stroke="#a16207" strokeWidth="2" />
            <rect x="34" y="32" width="5" height="36" fill="#dc2626" />
            <rect x="43" y="32" width="5" height="36" fill="#7c3aed" />
            <rect x="52" y="32" width="5" height="36" fill="#eab308" />
            <rect x="63" y="32" width="4" height="36" fill="#d97706" />
          </svg>
        );
      }
      else if (normId.includes("meter") || normId.includes("volt") || normId.includes("ammeter")) {
        const isVoltmeter = normId.includes("volt");
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <rect x="12" y="12" width="76" height="76" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="3" />
            <rect x="18" y="18" width="64" height="48" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M 26 52 A 28 28 0 0 1 74 52" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="2,3" />
            <line x1="50" y1="58" x2="65" y2="35" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="58" r="4" fill="#0f172a" />
            <text x="50" y="80" textAnchor="middle" fill={isVoltmeter ? "#3b82f6" : "#eab308"} fontWeight="900" fontSize="14" fontFamily="monospace">
              {expectedValue || (isVoltmeter ? "6.0 V" : "1.5 A")}
            </text>
          </svg>
        );
      }
      else {
        // General DC Battery / Power Supply
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <rect x="36" y="16" width="28" height="68" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <rect x="44" y="10" width="12" height="6" rx="1.5" fill="#fef08a" />
            <rect x="36" y="38" width="28" height="24" fill="#f59e0b" />
            <text x="50" y="28" textAnchor="middle" fill="#f8fafc" fontWeight="900" fontSize="13">+</text>
            <text x="50" y="76" textAnchor="middle" fill="#cbd5e1" fontWeight="900" fontSize="15">-</text>
          </svg>
        );
      }
    }

    // 33. CHEMICAL REAGENTS, DROPPER BOTTLES & BIOLOGICALS (DEFAULT CLEAN RENDERER)
    const info = getSubstanceInfo(normId);
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
        {/* Amber / Clear Glass Reagent Bottle */}
        <rect x="40" y="10" width="20" height="10" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <rect x="42" y="20" width="16" height="8" fill="rgba(240, 249, 255, 0.9)" stroke="#0284c7" strokeWidth="1.5" />
        <path d="M 25 35 L 75 35 L 75 84 Q 75 90 68 90 L 32 90 Q 25 90 25 84 Z" fill="rgba(240, 249, 255, 0.85)" stroke="#0284c7" strokeWidth="2.5" />
        {/* Liquid or solid contents */}
        <path d="M 26 50 L 74 50 L 74 84 Q 74 89 68 89 L 32 89 Q 26 89 26 84 Z" fill={info.color || "#38bdf8"} opacity={0.8} />
        {/* Label on Bottle */}
        <rect x="30" y="55" width="40" height="22" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="50" y="66" textAnchor="middle" fill="#0f172a" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">
          {normId.replace(/_/g, " ").slice(0, 10).toUpperCase()}
        </text>
        <text x="50" y="74" textAnchor="middle" fill="#475569" fontSize="5" fontWeight="bold">
          {info.name.slice(0, 12)}
        </text>
      </svg>
    );
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${dimensions} ${className}`}>
      {renderVisual()}
    </div>
  );
};
