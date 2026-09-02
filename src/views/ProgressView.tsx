import React, { useState, useEffect } from "react";
import { ExperimentContent, UserProgress } from "../types.js";
import { getLocalProgress, resetLocalProgress } from "../lib/storage/progress.js";
import {
  Award,
  Flame,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  BookOpen,
  Zap,
  FlaskConical,
  Dna,
  GraduationCap,
} from "lucide-react";

interface ProgressViewProps {
  experiments: ExperimentContent[];
  onSelectExperiment: (slug: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  experiments,
  onSelectExperiment,
}) => {
  const [progress, setProgress] = useState<UserProgress>(getLocalProgress());

  useEffect(() => {
    setProgress(getLocalProgress());
  }, []);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your local experiment progress?")) {
      const reset = resetLocalProgress();
      setProgress(reset);
    }
  };

  const completedCount = progress.completedSlugs.length;
  const totalCount = experiments.length;
  const percentage = Math.round((completedCount / (totalCount || 1)) * 100);

  const allBadges = [
    {
      id: "first_lab",
      title: "First Circuit / Test",
      description: "Completed 1 virtual lab experiment",
      icon: <FlaskConical className="w-6 h-6 text-amber-500" />,
    },
    {
      id: "lab_assistant",
      title: "Lab Assistant",
      description: "Completed 3 virtual lab experiments",
      icon: <Sparkles className="w-6 h-6 text-cyan-500" />,
    },
    {
      id: "science_scholar",
      title: "Science Scholar",
      description: "Completed 5 virtual lab experiments",
      icon: <GraduationCap className="w-6 h-6 text-emerald-500" />,
    },
    {
      id: "ol_champion",
      title: "O/L Champion",
      description: "Completed 10+ virtual lab experiments",
      icon: <Award className="w-6 h-6 text-amber-400" />,
    },
    {
      id: "streak_master",
      title: "3-Day Streak Master",
      description: "Practiced virtual labs 3 days in a row",
      icon: <Flame className="w-6 h-6 text-orange-500" />,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Completion */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0E2A47] text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#16232E] font-mono">
              {completedCount} / {totalCount}
            </div>
            <p className="text-xs text-slate-500 font-mono">Experiments Completed ({percentage}%)</p>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#16232E] font-mono">
              {progress.streakDays || 1} Day
            </div>
            <p className="text-xs text-slate-500 font-mono">Lab Practice Streak</p>
          </div>
        </div>

        {/* Badges Unlocked */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#16232E] font-mono">
              {progress.unlockedBadges.length} / {allBadges.length}
            </div>
            <p className="text-xs text-slate-500 font-mono">O/L Badges Earned</p>
          </div>
        </div>
      </div>

      {/* Unlocked O/L Badges Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-[#16232E] font-sans flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Curriculum Badges & Achievement Milestones</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {allBadges.map((badge) => {
            const isUnlocked = progress.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border-2 transition-all text-center flex flex-col items-center justify-between ${
                  isUnlocked
                    ? "border-amber-300 bg-amber-50/50 shadow-sm"
                    : "border-slate-200 bg-slate-50/60 opacity-50 grayscale"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm mb-2">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-sans mb-1">{badge.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-tight">{badge.description}</p>
                </div>
                <span
                  className={`mt-3 text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                    isUnlocked ? "bg-amber-200 text-amber-900" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {isUnlocked ? "Unlocked ✓" : "Locked"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* History Log */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-lg font-extrabold text-[#16232E] font-sans flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[#3E6E8E]" />
            <span>Lab Execution History</span>
          </h2>

          {progress.completedSlugs.length > 0 && (
            <button
              onClick={handleReset}
              className="text-xs font-mono text-slate-400 hover:text-red-600 flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Local Progress</span>
            </button>
          )}
        </div>

        {progress.history && progress.history.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {progress.history.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectExperiment(item.slug)}
                className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 font-sans">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Completed {new Date(item.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  100% Correct
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 font-sans text-xs">
            No virtual experiments completed yet. Select an experiment from the library to begin!
          </div>
        )}
      </div>
    </div>
  );
};
