import React from "react";
import { ExperimentContent } from "../types.js";
import { Clock, CheckCircle2, Zap, FlaskConical, Dna, ArrowRight } from "lucide-react";

interface ExperimentCardProps {
  experiment: ExperimentContent;
  isCompleted: boolean;
  onSelect: (slug: string) => void;
}

export const ExperimentCard: React.FC<ExperimentCardProps> = ({
  experiment,
  isCompleted,
  onSelect,
}) => {
  const getSubjectColor = () => {
    switch (experiment.subject) {
      case "physics":
        return {
          borderTop: "border-t-[#C1703F]",
          badgeBg: "bg-[#C1703F]/15 text-[#C1703F] border-[#C1703F]/40",
          icon: <Zap className="w-4 h-4 text-[#C1703F]" />,
        };
      case "chemistry":
        return {
          borderTop: "border-t-[#4F8A73]",
          badgeBg: "bg-[#4F8A73]/15 text-[#4F8A73] border-[#4F8A73]/40",
          icon: <FlaskConical className="w-4 h-4 text-[#4F8A73]" />,
        };
      case "biology":
      default:
        return {
          borderTop: "border-t-emerald-600",
          badgeBg: "bg-emerald-500/15 text-emerald-700 border-emerald-500/40",
          icon: <Dna className="w-4 h-4 text-emerald-600" />,
        };
    }
  };

  const subjectMeta = getSubjectColor();

  return (
    <div
      onClick={() => onSelect(experiment.slug)}
      className={`group relative bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 border-t-4 ${subjectMeta.borderTop} transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden hover:-translate-y-0.5`}
    >
      {/* Blueprint Index Card Background subtle grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#3E6E8E_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none" />

      <div className="p-5 relative z-10">
        {/* Top Badges Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded-md border ${subjectMeta.badgeBg}`}
            >
              {subjectMeta.icon}
              <span className="capitalize">{experiment.subject}</span>
            </span>

            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${
                experiment.grade === 10
                  ? "bg-amber-100 text-amber-900 border-amber-300"
                  : "bg-cyan-100 text-cyan-900 border-cyan-300"
              }`}
            >
              Grade {experiment.grade}
            </span>
          </div>

          {isCompleted && (
            <span className="inline-flex items-center space-x-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Completed</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#16232E] group-hover:text-[#0E2A47] transition-colors mb-1 font-sans line-clamp-2">
          {experiment.title}
        </h3>

        {/* Unit */}
        <p className="text-xs font-mono text-[#3E6E8E] mb-3 font-semibold">
          Unit: {experiment.unit}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {experiment.description}
        </p>
      </div>

      {/* Footer Info */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono relative z-10">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{experiment.durationMinutes} min</span>
          </span>
          <span className="capitalize px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700 text-[10px]">
            {experiment.difficulty}
          </span>
        </div>

        <span className="inline-flex items-center space-x-1 font-sans text-xs font-bold text-[#0E2A47] group-hover:translate-x-1 transition-transform">
          <span>Start</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
