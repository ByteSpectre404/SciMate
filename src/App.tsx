import React, { useState, useEffect } from "react";
import { ExperimentContent } from "./types.js";
import { getLocalProgress } from "./lib/storage/progress.js";
import { Header } from "./components/Header.js";
import { HomeView } from "./views/HomeView.js";
import { BrowseView } from "./views/BrowseView.js";
import { SimulatorView } from "./views/SimulatorView.js";
import { ProgressView } from "./views/ProgressView.js";
import { RefreshCw, FlaskConical, Heart } from "lucide-react";

export default function App() {
  const [experiments, setExperiments] = useState<ExperimentContent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentTab, setCurrentTab] = useState<"home" | "experiments" | "progress" | "simulator">("home");
  const [selectedExperiment, setSelectedExperiment] = useState<ExperimentContent | null>(null);
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number | null>(null);

  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);

  // Load experiments from backend API
  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/experiments");
        if (!res.ok) throw new Error("Failed fetching experiments list");
        const data: ExperimentContent[] = await res.json();
        setExperiments(data);
      } catch (err: any) {
        console.error("Error loading experiments:", err);
        setError("Unable to load science experiments. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiments();

    // Read local progress
    const userProgress = getLocalProgress();
    setCompletedSlugs(userProgress.completedSlugs || []);
  }, []);

  const handleSelectExperimentBySlug = (slug: string) => {
    const exp = experiments.find((e) => e.slug === slug);
    if (exp) {
      setSelectedExperiment(exp);
      setCurrentTab("simulator");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavigate = (tab: "home" | "experiments" | "progress") => {
    setCurrentTab(tab);
    setSelectedExperiment(null);
    // Refresh completed slugs
    const userProgress = getLocalProgress();
    setCompletedSlugs(userProgress.completedSlugs || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectGradeFilter = (grade: number | null) => {
    setSelectedGradeFilter(grade);
  };

  return (
    <div className="min-h-screen bg-[#EDF1F5] text-slate-900 font-sans flex flex-col justify-between selection:bg-amber-200 selection:text-amber-950">
      <div>
        {/* Header Navigation */}
        <Header
          currentTab={currentTab}
          onNavigate={handleNavigate}
          selectedGradeFilter={selectedGradeFilter}
          onSelectGradeFilter={handleSelectGradeFilter}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
              <RefreshCw className="w-8 h-8 text-[#0E2A47] animate-spin" />
              <p className="text-sm font-mono text-[#3E6E8E] font-bold">
                Loading Sri Lanka O/L Science Experiments...
              </p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md mx-auto my-12 space-y-3">
              <p className="text-sm text-red-800 font-bold font-sans">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#0E2A47] text-white px-4 py-2 rounded-xl text-xs font-mono font-bold"
              >
                Reload
              </button>
            </div>
          ) : (
            <>
              {currentTab === "home" && (
                <HomeView
                  experiments={experiments}
                  completedSlugs={completedSlugs}
                  onSelectExperiment={handleSelectExperimentBySlug}
                  onNavigateBrowse={(gradeFilter) => {
                    if (gradeFilter !== undefined) setSelectedGradeFilter(gradeFilter);
                    handleNavigate("experiments");
                  }}
                />
              )}

              {currentTab === "experiments" && (
                <BrowseView
                  experiments={experiments}
                  completedSlugs={completedSlugs}
                  selectedGradeFilter={selectedGradeFilter}
                  onSelectGradeFilter={setSelectedGradeFilter}
                  onSelectExperiment={handleSelectExperimentBySlug}
                />
              )}

              {currentTab === "simulator" && selectedExperiment && (
                <SimulatorView
                  experiment={selectedExperiment}
                  onBack={() => handleNavigate("experiments")}
                  onNavigateExperiments={() => handleNavigate("experiments")}
                  onNavigateProgress={() => handleNavigate("progress")}
                />
              )}

              {currentTab === "progress" && (
                <ProgressView
                  experiments={experiments}
                  onSelectExperiment={handleSelectExperimentBySlug}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#0E2A47] text-slate-300 border-t border-[#3E6E8E]/40 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono gap-3">
          <div className="flex items-center space-x-2">
            <FlaskConical className="w-4 h-4 text-[#E8A33D]" />
            <span className="font-bold text-white font-sans">SciMate Virtual Lab</span>
            <span className="text-cyan-200/70">• Sri Lankan Science O/L Syllabus (Grades 10 & 11)</span>
          </div>

          <div className="text-slate-400 flex items-center space-x-1">
            <span>Built for accessible science education</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
