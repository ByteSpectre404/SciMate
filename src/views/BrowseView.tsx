import React, { useState, useMemo } from "react";
import { ExperimentContent, Subject } from "../types.js";
import { ExperimentCard } from "../components/ExperimentCard.js";
import { Search, Filter, Layers, CheckCircle2, RotateCcw } from "lucide-react";

interface BrowseViewProps {
  experiments: ExperimentContent[];
  completedSlugs: string[];
  selectedGradeFilter: number | null;
  onSelectGradeFilter: (grade: number | null) => void;
  onSelectExperiment: (slug: string) => void;
}

export const BrowseView: React.FC<BrowseViewProps> = ({
  experiments,
  completedSlugs,
  selectedGradeFilter,
  onSelectGradeFilter,
  onSelectExperiment,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<Subject | "all">("all");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");

  // Extract unique units for filter dropdown
  const uniqueUnits = useMemo(() => {
    const unitsSet = new Set<string>();
    experiments.forEach((e) => {
      if (e.unit) unitsSet.add(e.unit);
    });
    return Array.from(unitsSet).sort();
  }, [experiments]);

  // Filter experiments based on state
  const filteredExperiments = useMemo(() => {
    return experiments.filter((exp) => {
      // Grade filter
      if (selectedGradeFilter !== null && exp.grade !== selectedGradeFilter) {
        return false;
      }
      // Subject filter
      if (selectedSubject !== "all" && exp.subject !== selectedSubject) {
        return false;
      }
      // Unit filter
      if (selectedUnit !== "all" && exp.unit !== selectedUnit) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = exp.title.toLowerCase().includes(query);
        const matchesUnit = exp.unit.toLowerCase().includes(query);
        const matchesDesc = exp.description.toLowerCase().includes(query);
        const matchesMaterials = exp.materials.some((m) => m.toLowerCase().includes(query));
        return matchesTitle || matchesUnit || matchesDesc || matchesMaterials;
      }
      return true;
    });
  }, [experiments, selectedGradeFilter, selectedSubject, selectedUnit, searchTerm]);

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Filter Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-5 border-b border-slate-100">
          <div>
            <h1 className="text-2xl font-extrabold text-[#16232E] font-sans flex items-center space-x-2">
              <Layers className="w-6 h-6 text-[#3E6E8E]" />
              <span>Experiment Library</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Filter by Grade Level, Subject, or Search by experiment title & unit
            </p>
          </div>

          {/* Result Count Badge */}
          <div className="inline-flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono">
            <span className="text-[#0E2A47] font-bold">
              Showing {filteredExperiments.length} of {experiments.length}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-700 font-semibold">
              {completedSlugs.length} Completed
            </span>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search experiments..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E2A47]"
            />
          </div>

          {/* Grade Filter Pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onSelectGradeFilter(null)}
              className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                selectedGradeFilter === null
                  ? "bg-[#0E2A47] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => onSelectGradeFilter(10)}
              className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                selectedGradeFilter === 10
                  ? "bg-[#E8A33D] text-[#0E2A47] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Grade 10
            </button>
            <button
              onClick={() => onSelectGradeFilter(11)}
              className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-lg transition-all ${
                selectedGradeFilter === 11
                  ? "bg-[#4F8A73] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Grade 11
            </button>
          </div>

          {/* Subject Filter Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setSelectedSubject("all")}
              className={`flex-1 py-1.5 text-[11px] font-mono font-bold rounded-lg transition-all ${
                selectedSubject === "all"
                  ? "bg-[#0E2A47] text-white shadow-sm"
                  : "text-slate-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedSubject("physics")}
              className={`flex-1 py-1.5 text-[11px] font-mono font-bold rounded-lg transition-all ${
                selectedSubject === "physics"
                  ? "bg-[#C1703F] text-white shadow-sm"
                  : "text-slate-600"
              }`}
            >
              Physics
            </button>
            <button
              onClick={() => setSelectedSubject("chemistry")}
              className={`flex-1 py-1.5 text-[11px] font-mono font-bold rounded-lg transition-all ${
                selectedSubject === "chemistry"
                  ? "bg-[#4F8A73] text-white shadow-sm"
                  : "text-slate-600"
              }`}
            >
              Chemistry
            </button>
            <button
              onClick={() => setSelectedSubject("biology")}
              className={`flex-1 py-1.5 text-[11px] font-mono font-bold rounded-lg transition-all ${
                selectedSubject === "biology"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600"
              }`}
            >
              Biology
            </button>
          </div>

          {/* Unit Dropdown */}
          <div className="relative">
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-sans text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0E2A47]"
            >
              <option value="all">All Syllabus Units</option>
              {uniqueUnits.map((u, idx) => (
                <option key={idx} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Experiment Cards */}
      {filteredExperiments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExperiments.map((exp) => (
            <ExperimentCard
              key={exp.slug}
              experiment={exp}
              isCompleted={completedSlugs.includes(exp.slug)}
              onSelect={onSelectExperiment}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-3">
          <Filter className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No experiments match your filter criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting search terms or switching Grade Level / Subject filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              onSelectGradeFilter(null);
              setSelectedSubject("all");
              setSelectedUnit("all");
            }}
            className="inline-flex items-center space-x-1.5 bg-[#0E2A47] text-white px-4 py-2 rounded-xl text-xs font-mono font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
