import React from "react";

interface ProgressBarProps {
  currentStepIndex: number;
  totalSteps: number;
  subject: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStepIndex,
  totalSteps,
  subject,
}) => {
  const percentage = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const getBarColor = () => {
    switch (subject) {
      case "physics":
        return "bg-[#C1703F]";
      case "chemistry":
        return "bg-[#4F8A73]";
      case "biology":
      default:
        return "bg-emerald-600";
    }
  };

  return (
    <div className="w-full bg-slate-100 p-3 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5 text-slate-700">
        <span className="text-[#0E2A47]">
          STEP {String(currentStepIndex + 1).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
        </span>
        <span className="text-[#3E6E8E]">{percentage}% Completed</span>
      </div>

      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${getBarColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
