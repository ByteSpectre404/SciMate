import React from "react";

interface VisualProps {
  normId: string;
  state?: string;
  accumulatedItems?: string[];
  expectedValue?: string;
  resultColor?: string;
  resultState?: string;
}

export const ChemistryVisuals: React.FC<VisualProps> = ({
  normId,
  state = "idle",
  accumulatedItems = [],
  expectedValue,
  resultColor,
  resultState,
}) => {
  const hasAcc = (...keys: string[]) =>
    accumulatedItems.some((acc) => {
      const n = acc.toLowerCase().replace(/[^a-z0-9]/g, "_");
      return keys.some((k) => n.includes(k.toLowerCase()));
    });

  // 1. IRON NAILS & CORROSION / RUSTING SPECIMENS
  if (
    normId.includes("nail") ||
    normId.includes("iron_wool") ||
    normId.includes("metals_wrapped")
  ) {
    const isWrappedCopper = normId.includes("copper") || hasAcc("copper");
    const isWrappedZinc = normId.includes("zinc") || hasAcc("zinc");
    const isRusted =
      normId.includes("rust") ||
      normId.includes("humid") ||
      normId.includes("ordinary") ||
      hasAcc("rust", "water");

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Flat Nail Head */}
        <ellipse cx="50" cy="18" rx="14" ry="4" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
        {/* Nail Shank tapering to point */}
        <polygon
          points="46,20 54,20 52,78 50,88 48,78"
          fill={isRusted ? "#b45309" : "#94a3b8"}
          stroke="#475569"
          strokeWidth="1.5"
        />
        {/* Rust corrosion patches if corroded */}
        {isRusted && (
          <g fill="#92400e" opacity="0.85">
            <circle cx="50" cy="35" r="2.5" />
            <circle cx="49" cy="50" r="3" />
            <circle cx="51" cy="65" r="2.5" />
            <circle cx="50" cy="76" r="2" />
          </g>
        )}
        {/* Metallic Wire Spiral Wrapping (Copper or Zinc) */}
        {isWrappedCopper && (
          <g stroke="#d97706" strokeWidth="2.5" strokeLinecap="round">
            <line x1="45" y1="36" x2="55" y2="40" />
            <line x1="45" y1="48" x2="55" y2="52" />
            <line x1="45" y1="60" x2="55" y2="64" />
          </g>
        )}
        {isWrappedZinc && (
          <g stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round">
            <line x1="45" y1="36" x2="55" y2="40" />
            <line x1="45" y1="48" x2="55" y2="52" />
            <line x1="45" y1="60" x2="55" y2="64" />
          </g>
        )}
        <text x="50" y="96" textAnchor="middle" fill="#334155" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
          {isWrappedCopper ? "NAIL + COPPER" : isWrappedZinc ? "NAIL + ZINC" : isRusted ? "RUSTED IRON" : "IRON NAIL"}
        </text>
      </svg>
    );
  }

  // 2. LITMUS & INDICATOR PAPERS & CHROMATOGRAPHY STRIP
  if (
    normId.includes("litmus") ||
    normId.includes("cobalt_chloride") ||
    normId.includes("chromatography_paper")
  ) {
    if (normId.includes("chromatography")) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Chromatography paper strip */}
          <rect x="34" y="10" width="32" height="78" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Solvent pencil baseline */}
          <line x1="36" y1="72" x2="62" y2="72" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,1" />
          {/* Separated pigment spots */}
          <circle cx="50" cy="72" r="3" fill="#15803d" />
          <circle cx="50" cy="52" r="3.5" fill="#eab308" />
          <circle cx="50" cy="34" r="3.5" fill="#3b82f6" />
          {/* Solvent front */}
          <line x1="36" y1="24" x2="62" y2="24" stroke="#60a5fa" strokeWidth="1" />
          <text x="50" y="96" textAnchor="middle" fill="#0284c7" fontSize="6" fontWeight="bold" fontFamily="monospace">
            CHROMATOGRAPHY
          </text>
        </svg>
      );
    }

    if (normId.includes("cobalt")) {
      // Cobalt Chloride: Blue (dry) -> Pink (hydrated/moist)
      const isPink = normId.includes("pink") || normId.includes("moist") || hasAcc("moist", "water");
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <rect
            x="32"
            y="18"
            width="36"
            height="64"
            rx="3"
            fill={isPink ? "#f472b6" : "#3b82f6"}
            stroke={isPink ? "#db2777" : "#1d4ed8"}
            strokeWidth="2"
          />
          <text x="50" y="48" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">
            CoCl₂ PAPER
          </text>
          <text x="50" y="60" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="bold" fontFamily="monospace">
            {isPink ? "(PINK/MOIST)" : "(BLUE/DRY)"}
          </text>
        </svg>
      );
    }

    // Red / Blue Litmus Strip
    const isRed = normId.includes("red");
    const isTurnedBlue = isRed && (hasAcc("base", "naoh", "ammonia") || state === "active");
    const isTurnedRed = !isRed && (hasAcc("acid", "hcl", "citric") || state === "active");

    const topColor = isRed ? "#ef4444" : "#3b82f6";
    const bottomColor = isTurnedBlue ? "#3b82f6" : isTurnedRed ? "#ef4444" : topColor;

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <rect x="34" y="16" width="32" height="68" rx="2" fill={topColor} stroke="#475569" strokeWidth="1.5" />
        <rect x="34" y="52" width="32" height="32" rx="2" fill={bottomColor} stroke="#475569" strokeWidth="1.5" />
        <text x="50" y="40" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace">
          {isRed ? "RED" : "BLUE"}
        </text>
        <text x="50" y="70" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="bold" fontFamily="monospace">
          LITMUS
        </text>
      </svg>
    );
  }

  // 3. SOLID CHEMICALS, METALS, STRIPS, CHIPS, GRANULES & POWDERS
  if (
    normId.includes("magnesium_ribbon") ||
    normId.includes("magnesium_strip") ||
    normId.includes("zinc_strip") ||
    normId.includes("copper_strip") ||
    normId.includes("zinc_granule") ||
    normId.includes("caco3") ||
    normId.includes("marble_chips") ||
    normId.includes("kmno4_crystals") ||
    normId.includes("mno2_powder") ||
    normId.includes("naoh_pellets") ||
    normId.includes("naphthalene_ball") ||
    normId.includes("sodium_metal")
  ) {
    if (normId.includes("ribbon") || normId.includes("strip")) {
      const isCopper = normId.includes("copper");
      const isZinc = normId.includes("zinc");
      const stripColor = isCopper ? "#d97706" : isZinc ? "#94a3b8" : "#cbd5e1";
      const label = isCopper ? "COPPER STRIP" : isZinc ? "ZINC STRIP" : "MAGNESIUM STRIP";

      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Polished metallic strip with chamfered edges */}
          <polygon points="32,15 68,15 68,85 32,85" fill={stripColor} stroke="#334155" strokeWidth="2" />
          <line x1="38" y1="18" x2="38" y2="82" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
          <line x1="62" y1="18" x2="62" y2="82" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
          <text x="50" y="52" textAnchor="middle" fill="#0f172a" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
            {label}
          </text>
        </svg>
      );
    }

    if (normId.includes("sodium_metal")) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Watch Glass */}
          <path d="M 15 50 Q 50 82 85 50" fill="rgba(240,249,255,0.7)" stroke="#0284c7" strokeWidth="2" />
          {/* Freshly Cut Shiny Sodium Cube in Paraffin Oil */}
          <polygon points="40,38 60,38 68,48 48,48" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
          <polygon points="40,38 48,48 48,68 40,58" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <polygon points="48,48 68,48 68,68 48,68" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
          <text x="50" y="88" textAnchor="middle" fill="#0369a1" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
            SODIUM METAL (Na)
          </text>
        </svg>
      );
    }

    // Watch glass with solid granules / crystals / pellets / chips
    let solidColor = "#ffffff";
    let solidLabel = "SOLID REAGENT";
    if (normId.includes("zinc")) {
      solidColor = "#64748b";
      solidLabel = "ZINC GRANULES (Zn)";
    } else if (normId.includes("caco3") || normId.includes("marble")) {
      solidColor = "#f8fafc";
      solidLabel = "CaCO₃ MARBLE CHIPS";
    } else if (normId.includes("kmno4")) {
      solidColor = "#581c87";
      solidLabel = "KMnO₄ CRYSTALS";
    } else if (normId.includes("mno2")) {
      solidColor = "#0f172a";
      solidLabel = "MnO₂ CATALYST";
    } else if (normId.includes("naoh")) {
      solidColor = "#f1f5f9";
      solidLabel = "NaOH PELLETS";
    } else if (normId.includes("naphthalene")) {
      solidColor = "#f8fafc";
      solidLabel = "NAPHTHALENE BALL";
    }

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Watch Glass Dish */}
        <path d="M 16 52 Q 50 84 84 52" fill="rgba(240,249,255,0.75)" stroke="#0284c7" strokeWidth="2.5" />
        {/* Solid pieces pile */}
        <ellipse cx="50" cy="56" rx="22" ry="12" fill={solidColor} stroke="#475569" strokeWidth="1.5" />
        <circle cx="44" cy="52" r="3.5" fill={solidColor} stroke="#475569" strokeWidth="1" />
        <circle cx="56" cy="50" r="4" fill={solidColor} stroke="#475569" strokeWidth="1" />
        <circle cx="50" cy="46" r="3.5" fill={solidColor} stroke="#475569" strokeWidth="1" />
        <text x="50" y="90" textAnchor="middle" fill="#0f172a" fontSize="6" fontWeight="bold" fontFamily="monospace">
          {solidLabel}
        </text>
      </svg>
    );
  }

  // 4. DROPPER PIPETTES
  if (normId.includes("dropper") || normId.includes("pipette")) {
    let liquidColor = "#38bdf8";
    let label = "DROPPER";
    if (normId.includes("iodine")) {
      liquidColor = "#78350f";
      label = "IODINE DROPPER";
    } else if (normId.includes("universal")) {
      liquidColor = "#16a34a";
      label = "UNIVERSAL IND.";
    } else if (normId.includes("oil")) {
      liquidColor = "#facc15";
      label = "OIL DROPPER";
    }

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Rubber Bulb */}
        <ellipse cx="50" cy="18" rx="12" ry="10" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
        {/* Glass Pipette Tube */}
        <rect x="46" y="28" width="8" height="42" fill="rgba(240,249,255,0.85)" stroke="#0284c7" strokeWidth="1.5" />
        {/* Liquid filled stem */}
        <rect x="47" y="44" width="6" height="26" fill={liquidColor} />
        {/* Tapered Nozzle Tip */}
        <polygon points="46,70 54,70 51,84 49,84" fill="rgba(240,249,255,0.85)" stroke="#0284c7" strokeWidth="1.5" />
        <polygon points="47,70 53,70 51,80 49,80" fill={liquidColor} />
        {/* Liquid Droplet dripping */}
        <circle cx="50" cy="91" r="3" fill={liquidColor} className="animate-bounce" />
        <text x="50" y="98" textAnchor="middle" fill="#0369a1" fontSize="5.5" fontWeight="bold" fontFamily="monospace">
          {label}
        </text>
      </svg>
    );
  }

  // 5. GLASS STIRRING RODS, SPATULAS & COMBUSTION SPOONS
  if (
    normId.includes("glass_rod") ||
    normId.includes("stirrer") ||
    normId.includes("stirring_rod") ||
    normId.includes("spoon")
  ) {
    if (normId.includes("spoon")) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Metal handle angled into cup */}
          <line x1="50" y1="12" x2="50" y2="68" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 50 68 L 64 68 Q 68 84 50 84 Q 32 84 36 68 Z" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
          {normId.includes("heated") && (
            <path d="M 50 60 Q 56 66 50 72 Q 44 66 50 60 Z" fill="#f97316" className="animate-pulse" />
          )}
          <text x="50" y="94" textAnchor="middle" fill="#334155" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
            COMBUSTION SPOON
          </text>
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Solid Borosilicate Glass Stirring Rod */}
        <rect
          x="46"
          y="12"
          width="8"
          height="76"
          rx="4"
          fill="rgba(224,242,254,0.75)"
          stroke="#0284c7"
          strokeWidth="2"
          transform="rotate(15 50 50)"
        />
        <text x="50" y="96" textAnchor="middle" fill="#0284c7" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
          GLASS STIRRER
        </text>
      </svg>
    );
  }

  // 6. LAB KNIVES, SCALPEL & DISSECTING SCISSORS
  if (
    normId.includes("knife") ||
    normId.includes("scissors") ||
    normId.includes("craft_knife")
  ) {
    if (normId.includes("scissors")) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Scissors finger loops */}
          <circle cx="34" cy="78" r="9" fill="none" stroke="#334155" strokeWidth="3" />
          <circle cx="66" cy="78" r="9" fill="none" stroke="#334155" strokeWidth="3" />
          {/* Blades crossing at pivot pin */}
          <line x1="36" y1="70" x2="62" y2="20" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="64" y1="70" x2="38" y2="20" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="50" cy="48" r="3" fill="#0f172a" />
          <text x="50" y="96" textAnchor="middle" fill="#334155" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
            LAB SCISSORS
          </text>
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Knife Handle */}
        <rect x="22" y="44" width="34" height="12" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        {/* Stainless Steel Cutting Blade */}
        <polygon points="56,45 84,45 74,55 56,55" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
        <line x1="56" y1="55" x2="74" y2="55" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="50" y="80" textAnchor="middle" fill="#0f172a" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
          LAB SCALPEL / KNIFE
        </text>
      </svg>
    );
  }

  // 7. LIEBIG CONDENSER & WATER TUBING / JUGS
  if (
    normId.includes("condenser") ||
    normId.includes("water_inlet") ||
    normId.includes("water_jug")
  ) {
    if (normId.includes("jug")) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Water Pitcher / Jug */}
          <path d="M 28 32 L 68 32 L 64 86 Q 64 90 58 90 L 34 90 Q 28 90 28 86 Z" fill="rgba(240,249,255,0.85)" stroke="#0284c7" strokeWidth="2.5" />
          <path d="M 29 48 L 67 48 L 64 86 Q 64 89 58 89 L 34 89 Q 29 89 29 86 Z" fill="#38bdf8" opacity="0.7" />
          <path d="M 68 38 Q 84 55 66 74" fill="none" stroke="#0284c7" strokeWidth="3" />
          <text x="48" y="70" textAnchor="middle" fill="#0369a1" fontSize="7" fontWeight="bold">WATER JUG</text>
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Outer cooling jacket with side inlet/outlet ports */}
        <rect x="20" y="38" width="60" height="24" rx="3" fill="rgba(224,242,254,0.7)" stroke="#0284c7" strokeWidth="2" />
        <rect x="30" y="24" width="8" height="14" fill="rgba(224,242,254,0.7)" stroke="#0284c7" strokeWidth="1.5" />
        <rect x="62" y="62" width="8" height="14" fill="rgba(224,242,254,0.7)" stroke="#0284c7" strokeWidth="1.5" />
        {/* Inner vapor condensing tube */}
        <line x1="8" y1="50" x2="92" y2="50" stroke="#0369a1" strokeWidth="4" />
        <text x="50" y="88" textAnchor="middle" fill="#0284c7" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
          CONDENSER & HOSE
        </text>
      </svg>
    );
  }

  // 8. TEST TUBE RACK & BENCH RETORT STANDS
  if (
    normId.includes("test_tube_rack") ||
    normId.includes("bench_stand") ||
    normId.includes("manifold_base") ||
    normId.includes("ready_for_gas_collection")
  ) {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Heavy Cast-Iron Retort Stand Base */}
        <rect x="18" y="78" width="64" height="12" rx="2" fill="#334155" stroke="#0f172a" strokeWidth="2" />
        {/* Vertical Steel Support Rod */}
        <line x1="32" y1="12" x2="32" y2="78" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        {/* Bosshead Clamp with Test Tube Rack / Ring */}
        <rect x="28" y="42" width="8" height="8" rx="1" fill="#0f172a" />
        <line x1="36" y1="46" x2="68" y2="46" stroke="#64748b" strokeWidth="3" />
        <ellipse cx="68" cy="46" rx="12" ry="4" fill="none" stroke="#64748b" strokeWidth="2.5" />
        <text x="50" y="96" textAnchor="middle" fill="#0f172a" fontSize="6.5" fontWeight="bold" fontFamily="monospace">
          LAB RETORT STAND
        </text>
      </svg>
    );
  }

  return null;
};
