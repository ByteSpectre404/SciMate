import React from "react";
import { Sparkles, BookOpen, Atom, Lightbulb } from "lucide-react";

interface WhyAnnotationProps {
  whyText: string;
}

export const WhyAnnotation: React.FC<WhyAnnotationProps> = ({ whyText }) => {
  // Extract key formula or principle keywords if present
  const hasFormula = whyText.includes("->") || whyText.includes("=") || whyText.includes("+") || whyText.includes("°C");

  return (
    <div className="relative mt-4 mb-2 animate-fadeIn">
      {/* Dashed SVG Connecting Line / Arrow */}
      <div className="absolute -top-4 left-6 hidden sm:block pointer-events-none">
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
          <path
            d="M 12 0 Q 12 10 20 16"
            stroke="#E8A33D"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Margin Note Card */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 border-2 border-amber-300/80 rounded-xl p-4 shadow-sm relative overflow-hidden">
        {/* Lab Notebook Strip Accent */}
        <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#E8A33D]" />

        <div className="pl-2">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center space-x-2 text-amber-900 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600 fill-amber-200 animate-pulse" />
              <span>Scientific Principle Behind This Step:</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full flex items-center space-x-1">
              <BookOpen className="w-3 h-3" />
              <span>Core Concept</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans font-medium">
            {whyText}
          </p>

          {/* Special formula / reaction highlight box if equation present */}
          {hasFormula && (
            <div className="mt-2 pt-2 border-t border-amber-200/80 flex items-center space-x-2 text-xs font-mono text-amber-950 bg-white/80 p-2 rounded-lg border border-amber-200">
              <Atom className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-semibold text-[11px]">Key Reaction / Formula Mechanism Observed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

