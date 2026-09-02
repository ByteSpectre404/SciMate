import React from "react";
import { ExperimentContent } from "../types.js";
import { ExperimentCard } from "../components/ExperimentCard.js";
import {
  FlaskConical,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Layers,
  GraduationCap,
} from "lucide-react";

interface HomeViewProps {
  experiments: ExperimentContent[];
  completedSlugs: string[];
  onSelectExperiment: (slug: string) => void;
  onNavigateBrowse: (gradeFilter?: number | null) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  experiments,
  completedSlugs,
  onSelectExperiment,
  onNavigateBrowse,
}) => {
  const g10Count = experiments.filter((e) => e.grade === 10).length;
  const g11Count = experiments.filter((e) => e.grade === 11).length;

  const featuredList = experiments.slice(0, 6);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section with Blueprint Theme */}
      <section className="relative bg-[#0E2A47] text-white rounded-3xl p-6 sm:p-10 overflow-hidden shadow-xl border border-[#3E6E8E]/40">
        {/* Blueprint background grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3E6E8E25_1px,transparent_1px),linear-gradient(to_bottom,#3E6E8E25_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#3E6E8E]/50 border border-amber-300/30 px-3 py-1 rounded-full text-xs font-mono text-amber-200">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>Sri Lankan Curriculum • G10 & G11 O/L Science</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-white leading-tight">
            Virtual Science Lab & Interactive Experiments
          </h1>

          <p className="text-sm sm:text-base text-cyan-100/90 leading-relaxed font-sans">
            Perform authentic Grade 10 and Grade 11 physics, chemistry, and biology experiments directly on your browser. Get instant validation, "why this?" explanations, and an AI tutor grounded in your O/L syllabus.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateBrowse(null)}
              className="bg-[#E8A33D] hover:bg-amber-400 text-[#0E2A47] font-mono font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-all flex items-center space-x-2"
            >
              <span>Explore All Experiments ({experiments.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateBrowse(10)}
              className="bg-[#3E6E8E]/40 hover:bg-[#3E6E8E]/60 text-white font-mono font-bold text-sm px-4 py-3 rounded-xl border border-[#3E6E8E] transition-all"
            >
              Grade 10 ({g10Count})
            </button>

            <button
              onClick={() => onNavigateBrowse(11)}
              className="bg-[#4F8A73]/40 hover:bg-[#4F8A73]/60 text-white font-mono font-bold text-sm px-4 py-3 rounded-xl border border-[#4F8A73] transition-all"
            >
              Grade 11 ({g11Count})
            </button>
          </div>
        </div>
      </section>

      {/* Grade Level Selection Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grade 10 Card */}
        <div
          onClick={() => onNavigateBrowse(10)}
          className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg">
                Grade 10 O/L
              </span>
              <span className="text-xs font-mono text-slate-500">{g10Count} Experiments</span>
            </div>
            <h3 className="text-xl font-bold text-[#16232E] group-hover:text-[#0E2A47] transition-colors mb-2">
              Grade 10 Science Experiments
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Covers essential topics including Biomolecules, Starch-Amylase Digestion, Gas Preparation (CO2), Properties of Sodium Metal, and Ohm's Law.
            </p>
          </div>

          <div className="flex items-center text-xs font-mono font-bold text-[#0E2A47] group-hover:translate-x-1 transition-transform">
            <span>Browse Grade 10 Experiments</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Grade 11 Card */}
        <div
          onClick={() => onNavigateBrowse(11)}
          className="bg-white rounded-2xl p-6 border-2 border-cyan-200 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold bg-cyan-100 text-cyan-900 border border-cyan-300 px-2.5 py-1 rounded-lg">
                Grade 11 O/L
              </span>
              <span className="text-xs font-mono text-slate-500">{g11Count} Experiments</span>
            </div>
            <h3 className="text-xl font-bold text-[#16232E] group-hover:text-[#0E2A47] transition-colors mb-2">
              Grade 11 Science Experiments
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Includes Photosynthesis (Starch, Light, Oxygen), Plant Tissues, Separation Techniques (Distillation, Chromatography), Waves, Geometrical Optics, and Heat Changes.
            </p>
          </div>

          <div className="flex items-center text-xs font-mono font-bold text-[#0E2A47] group-hover:translate-x-1 transition-transform">
            <span>Browse Grade 11 Experiments</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </section>

      {/* Featured Experiments Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#16232E] font-sans">
              Featured Curriculum Experiments
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Filtered for Sri Lankan Grade 10 and Grade 11 practical syllabus
            </p>
          </div>

          <button
            onClick={() => onNavigateBrowse(null)}
            className="text-xs font-mono font-bold text-[#0E2A47] hover:underline flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredList.map((exp) => (
            <ExperimentCard
              key={exp.slug}
              experiment={exp}
              isCompleted={completedSlugs.includes(exp.slug)}
              onSelect={onSelectExperiment}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
