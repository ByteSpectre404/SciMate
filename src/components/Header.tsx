import React, { useState } from "react";
import { FlaskConical, Award, BookOpen, Layers, Menu, X, HelpCircle, Sparkles } from "lucide-react";

interface HeaderProps {
  currentTab: "home" | "experiments" | "progress" | "simulator";
  onNavigate: (tab: "home" | "experiments" | "progress") => void;
  selectedGradeFilter: number | null; // null for All, 10 for G10, 11 for G11
  onSelectGradeFilter: (grade: number | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  selectedGradeFilter,
  onSelectGradeFilter,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#0E2A47] text-white border-b border-[#3E6E8E]/40 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate("home")}>
            <div className="w-10 h-10 rounded-lg bg-[#E8A33D] flex items-center justify-center text-[#0E2A47] shadow-inner font-bold text-xl">
              <FlaskConical className="w-6 h-6 text-[#0E2A47] stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-mono">SciMate</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#3E6E8E]/60 text-amber-200 uppercase tracking-widest border border-amber-300/30">
                  SL O/L
                </span>
              </div>
              <p className="text-[11px] text-cyan-200/80 font-sans hidden sm:block">
                Grade 10 & 11 Virtual Science Experiments
              </p>
            </div>
          </div>

          {/* Grade Quick Filter Switcher (Desktop) */}
          <div className="hidden md:flex items-center bg-[#07192C] p-1 rounded-lg border border-[#3E6E8E]/50">
            <button
              onClick={() => {
                onSelectGradeFilter(null);
                if (currentTab !== "experiments") onNavigate("experiments");
              }}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                selectedGradeFilter === null
                  ? "bg-[#3E6E8E] text-white font-semibold shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              All Grades
            </button>
            <button
              onClick={() => {
                onSelectGradeFilter(10);
                if (currentTab !== "experiments") onNavigate("experiments");
              }}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                selectedGradeFilter === 10
                  ? "bg-[#E8A33D] text-[#0E2A47] font-bold shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Grade 10
            </button>
            <button
              onClick={() => {
                onSelectGradeFilter(11);
                if (currentTab !== "experiments") onNavigate("experiments");
              }}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                selectedGradeFilter === 11
                  ? "bg-[#4F8A73] text-white font-bold shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Grade 11
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center space-x-1">
            <button
              onClick={() => onNavigate("home")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                currentTab === "home"
                  ? "bg-[#3E6E8E]/40 text-amber-300 font-semibold border-b-2 border-amber-400"
                  : "text-slate-200 hover:bg-[#3E6E8E]/20 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => onNavigate("experiments")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                currentTab === "experiments" || currentTab === "simulator"
                  ? "bg-[#3E6E8E]/40 text-amber-300 font-semibold border-b-2 border-amber-400"
                  : "text-slate-200 hover:bg-[#3E6E8E]/20 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Lab Experiments</span>
            </button>

            <button
              onClick={() => onNavigate("progress")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                currentTab === "progress"
                  ? "bg-[#3E6E8E]/40 text-amber-300 font-semibold border-b-2 border-amber-400"
                  : "text-slate-200 hover:bg-[#3E6E8E]/20 hover:text-white"
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>My Progress</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-200 hover:text-white hover:bg-[#3E6E8E]/30"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#07192C] border-b border-[#3E6E8E]/60 px-4 pt-3 pb-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#3E6E8E]/40">
            <span className="text-xs font-mono text-cyan-200 uppercase">Grade Filter:</span>
            <div className="flex space-x-1">
              <button
                onClick={() => {
                  onSelectGradeFilter(null);
                  onNavigate("experiments");
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded ${
                  selectedGradeFilter === null ? "bg-[#3E6E8E] text-white" : "bg-[#0E2A47] text-slate-300"
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  onSelectGradeFilter(10);
                  onNavigate("experiments");
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded ${
                  selectedGradeFilter === 10 ? "bg-[#E8A33D] text-[#0E2A47] font-bold" : "bg-[#0E2A47] text-slate-300"
                }`}
              >
                G10
              </button>
              <button
                onClick={() => {
                  onSelectGradeFilter(11);
                  onNavigate("experiments");
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded ${
                  selectedGradeFilter === 11 ? "bg-[#4F8A73] text-white font-bold" : "bg-[#0E2A47] text-slate-300"
                }`}
              >
                G11
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate("home");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-100 hover:bg-[#3E6E8E]/30 flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>Home Overview</span>
            </button>
            <button
              onClick={() => {
                onNavigate("experiments");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-100 hover:bg-[#3E6E8E]/30 flex items-center space-x-2"
            >
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Browse All Experiments</span>
            </button>
            <button
              onClick={() => {
                onNavigate("progress");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-100 hover:bg-[#3E6E8E]/30 flex items-center space-x-2"
            >
              <Award className="w-5 h-5 text-emerald-400" />
              <span>My Badges & Progress</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
