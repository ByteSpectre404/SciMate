import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { ExperimentContent } from "../types.js";
import {
  Award,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  BookOpen,
  FlaskConical,
  Lightbulb,
  Check,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { getConceptExplanations, ConceptExplanation } from "../lib/content/conclusion-explanations.js";

interface OutcomeScreenProps {
  experiment: ExperimentContent;
  onRestart: () => void;
  onNavigateExperiments: () => void;
  onNavigateProgress: () => void;
}

export const OutcomeScreen: React.FC<OutcomeScreenProps> = ({
  experiment,
  onRestart,
  onNavigateExperiments,
  onNavigateProgress,
}) => {
  const [expandedInsights, setExpandedInsights] = useState<Record<number, boolean>>({
    0: true, // Expand first explanation by default
    1: true,
  });

  useEffect(() => {
    // Trigger celebratory confetti upon experiment completion
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Graceful fallback if confetti canvas not available
    }
  }, []);

  const toggleInsight = (idx: number) => {
    setExpandedInsights((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const explanations: ConceptExplanation[] = getConceptExplanations(
    experiment.slug,
    experiment.outcome.reflectionQuestions
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 max-w-3xl mx-auto my-4 animate-fadeIn">
      {/* Top Banner */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3 shadow-inner">
          <Award className="w-9 h-9 text-[#4F8A73]" />
        </div>
        <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300 uppercase tracking-widest">
          Experiment Completed & Verified
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16232E] mt-2.5 font-sans">
          {experiment.title}
        </h2>
        <p className="text-xs font-mono text-[#3E6E8E] mt-1">
          Grade {experiment.grade} {experiment.subject.toUpperCase()} • Unit: {experiment.unit}
        </p>
      </div>

      {/* 1. Primary Scientific Conclusion & Findings Card (Prominent & Clear) */}
      <div className="bg-gradient-to-br from-slate-900 to-[#0E2A47] text-white rounded-2xl p-6 border border-[#3E6E8E] mb-6 shadow-md">
        <div className="flex items-center space-x-2 mb-3">
          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </span>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 block">
              Core Scientific Finding
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white font-sans">
              Scientific Conclusion
            </h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans bg-white/5 rounded-xl p-4 border border-white/10">
          {experiment.outcome.summary}
        </p>

        {/* Formula Box (if applicable) */}
        {experiment.outcome.formula && (
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 bg-[#06182a] rounded-xl px-4 py-3 border border-cyan-500/30">
            <span className="text-[11px] font-mono text-cyan-200 uppercase tracking-wider">
              Governing Chemical / Physical Equation:
            </span>
            <span className="text-sm sm:text-base font-mono font-bold tracking-wider text-amber-300">
              {experiment.outcome.formula}
            </span>
          </div>
        )}
      </div>

      {/* 2. Key Scientific Deductions & Concepts (Complete Explanations & Answers) */}
      {explanations.length > 0 && (
        <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200 mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold text-amber-950 uppercase tracking-wider">
                O/L Science Deductions & Scientific Explanations
              </h4>
              <p className="text-[11px] text-amber-800">
                Key curriculum concepts and verified scientific answers for this experiment
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {explanations.map((item, idx) => {
              const isExpanded = expandedInsights[idx] ?? true;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-amber-200/80 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleInsight(idx)}
                    className="w-full text-left p-3.5 flex items-start justify-between gap-3 hover:bg-amber-50/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                          Concept {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-[#0E2A47] font-sans">
                          {item.conceptTitle}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-700">
                        {item.question}
                      </p>
                    </div>

                    <span className="text-amber-800 p-1 shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100 space-y-2 bg-slate-50/60 text-xs">
                      <div>
                        <span className="font-mono font-bold text-[10px] text-emerald-800 uppercase tracking-wider block mb-0.5">
                          Scientific Explanation & Deduction:
                        </span>
                        <p className="text-slate-800 leading-relaxed font-sans">
                          {item.explanation}
                        </p>
                      </div>

                      {item.keyDeduction && (
                        <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-mono text-[11px]">
                          <span className="font-bold text-emerald-800">Key Takeaway: </span>
                          <span>{item.keyDeduction}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Learning Outcomes Mastered */}
      {experiment.learningOutcomes && experiment.learningOutcomes.length > 0 && (
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-1.5 rounded-lg bg-[#0E2A47] text-white">
              <BookOpen className="w-4 h-4 text-amber-300" />
            </div>
            <h4 className="text-xs font-mono font-bold text-[#0E2A47] uppercase tracking-wider">
              Learning Outcomes Mastered
            </h4>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {experiment.learningOutcomes.map((outcome, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 4. Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200">
        <button
          onClick={onRestart}
          className="px-4 py-3 rounded-xl border border-slate-300 font-mono font-bold text-xs text-slate-700 hover:bg-slate-100 flex items-center justify-center space-x-2 transition-all shadow-sm"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>Repeat Lab</span>
        </button>

        <button
          onClick={onNavigateProgress}
          className="px-4 py-3 rounded-xl bg-[#0E2A47] font-mono font-bold text-xs text-white hover:bg-[#16385c] flex items-center justify-center space-x-2 transition-all shadow-sm"
        >
          <Award className="w-4 h-4 text-amber-300" />
          <span>View Badges & Stats</span>
        </button>

        <button
          onClick={onNavigateExperiments}
          className="px-4 py-3 rounded-xl bg-[#E8A33D] font-mono font-bold text-xs text-[#0E2A47] hover:bg-amber-400 flex items-center justify-center space-x-2 transition-all shadow-sm"
        >
          <span>More Experiments</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
