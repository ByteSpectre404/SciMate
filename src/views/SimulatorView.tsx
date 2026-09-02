import React, { useState } from "react";
import { ExperimentContent } from "../types.js";
import { useSimulationEngine } from "../lib/store/use-simulation-store.js";
import { ProgressBar } from "../components/ProgressBar.js";
import { ModeToggle } from "../components/ModeToggle.js";
import { DiagramCanvas } from "../components/DiagramCanvas.js";
import { WhyAnnotation } from "../components/WhyAnnotation.js";
import { TutorChat } from "../components/TutorChat.js";
import { OutcomeScreen } from "../components/OutcomeScreen.js";
import {
  ArrowLeft,
  RotateCcw,
  ArrowRight,
  BookOpen,
  X,
  CheckCircle2,
  Sparkles,
  ClipboardList,
  PenTool,
} from "lucide-react";

interface SimulatorViewProps {
  experiment: ExperimentContent;
  onBack: () => void;
  onNavigateExperiments: () => void;
  onNavigateProgress: () => void;
}

export const SimulatorView: React.FC<SimulatorViewProps> = ({
  experiment,
  onBack,
  onNavigateExperiments,
  onNavigateProgress,
}) => {
  const engine = useSimulationEngine(experiment);
  const [showNotebook, setShowNotebook] = useState<boolean>(false);
  const [userNotes, setUserNotes] = useState<string>("");

  const getSubjectBadge = () => {
    switch (experiment.subject) {
      case "physics":
        return "bg-[#C1703F]/15 text-[#C1703F] border-[#C1703F]/40";
      case "chemistry":
        return "bg-[#4F8A73]/15 text-[#4F8A73] border-[#4F8A73]/40";
      case "biology":
      default:
        return "bg-emerald-500/15 text-emerald-700 border-emerald-500/40";
    }
  };

  return (
    <div className="space-y-6 pb-12 relative">
      {/* Navigation & Title Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Return to library"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${getSubjectBadge()}`}
                >
                  {experiment.subject}
                </span>
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded">
                  Grade {experiment.grade}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Unit: {experiment.unit}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#16232E] font-sans">
                {experiment.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowNotebook(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-bold transition-all flex items-center space-x-1.5 shadow-2xs"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Lab Notebook</span>
              {engine.accumulatedActions.length > 0 && (
                <span className="ml-1 bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">
                  {engine.accumulatedActions.length}
                </span>
              )}
            </button>

            <ModeToggle mode={engine.mode} onToggle={engine.setMode} />

            <button
              onClick={() => engine.initExperiment(experiment)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              title="Restart experiment"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {!engine.isFinished && (
          <ProgressBar
            currentStepIndex={engine.currentStepIndex}
            totalSteps={engine.totalSteps}
            subject={experiment.subject}
          />
        )}
      </div>

      {/* Scientist's Live Lab Notebook Drawer / Modal */}
      {showNotebook && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full border-2 border-[#0E2A47] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-[#0E2A47] text-white p-5 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center space-x-2.5">
                <ClipboardList className="w-5 h-5 text-[#E8A33D]" />
                <div>
                  <h3 className="font-bold text-base font-sans">
                    Scientist's Live Lab Notebook
                  </h3>
                  <p className="text-xs text-amber-200 font-mono">
                    {experiment.title}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNotebook(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Accumulated Readings Log */}
              <div>
                <h4 className="text-xs font-mono font-bold text-[#0E2A47] uppercase mb-3 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-[#E8A33D]" />
                  <span>Recorded Experimental Phenomena & Readings</span>
                </h4>

                {experiment.steps.slice(0, engine.currentStepIndex + (engine.stepCompleted ? 1 : 0)).length === 0 ? (
                  <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-200">
                    No steps completed yet. Proceed through the experiment steps to record real-world data and observations!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {experiment.steps
                      .slice(0, engine.currentStepIndex + (engine.stepCompleted ? 1 : 0))
                      .map((step, idx) => (
                        <div
                          key={step.id}
                          className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between font-bold text-slate-800">
                            <span className="flex items-center space-x-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Step {idx + 1}: {step.instruction}</span>
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                            {step.resultState && (
                              <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded">
                                State: {step.resultState.replace(/_/g, " ")}
                              </span>
                            )}
                            {step.resultColor && (
                              <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded flex items-center space-x-1">
                                <span>Observed Color:</span>
                                <span
                                  className="w-3 h-3 rounded-full border border-slate-400 inline-block"
                                  style={{ backgroundColor: step.resultColor }}
                                />
                              </span>
                            )}
                            {step.expectedValue && (
                              <span className="bg-sky-100 text-sky-900 border border-sky-300 px-2 py-0.5 rounded">
                                Reading: {step.expectedValue}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Student Personal Notes */}
              <div>
                <h4 className="text-xs font-mono font-bold text-[#0E2A47] uppercase mb-2 flex items-center space-x-1.5">
                  <PenTool className="w-4 h-4 text-[#E8A33D]" />
                  <span>Student Observations & Hypotheses</span>
                </h4>
                <textarea
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Write down your own observations, predictions, or questions about this experiment..."
                  className="w-full h-28 p-3 text-xs text-slate-800 bg-amber-50/40 border border-amber-300 rounded-xl focus:ring-2 focus:ring-[#0E2A47] focus:outline-none font-sans"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowNotebook(false)}
                className="bg-[#0E2A47] hover:bg-[#16232E] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
              >
                Close Notebook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Workspace or Outcome */}
      {engine.isFinished ? (
        <OutcomeScreen
          experiment={experiment}
          onRestart={() => engine.initExperiment(experiment)}
          onNavigateExperiments={onNavigateExperiments}
          onNavigateProgress={onNavigateProgress}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Stage & Step Instruction Panel (2 Columns on large screen) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Step Instruction Card */}
            {engine.currentStep && (
              <div className="bg-white rounded-2xl p-5 border-2 border-[#0E2A47] shadow-sm relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E8A33D] bg-[#0E2A47] px-2.5 py-0.5 rounded">
                      Active Task Instruction
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#16232E] font-sans pt-1">
                      {engine.currentStep.instruction}
                    </h3>
                  </div>
                </div>

                {/* "Why This?" Signature Margin Note */}
                {engine.showWhy && engine.currentStep.why && (
                  <WhyAnnotation whyText={engine.currentStep.why} />
                )}

                {/* Next Step Action Button */}
                {engine.stepCompleted && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={engine.nextStep}
                      className="bg-[#E8A33D] hover:bg-amber-400 text-[#0E2A47] font-mono font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center space-x-2 animate-bounce"
                    >
                      <span>
                        {engine.currentStepIndex + 1 < engine.totalSteps
                          ? "Proceed to Next Step"
                          : "Finish & See Scientific Summary"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Virtual Apparatus Stage Canvas */}
            {engine.currentStep && (
              <DiagramCanvas
                currentStep={engine.currentStep}
                materials={experiment.materials}
                mode={engine.mode}
                selectedItemId={engine.selectedItemId}
                onSelectItem={engine.setSelectedItemId}
                onPlaceAtTarget={engine.performPlacement}
                onToggleSwitch={engine.toggleSwitchAction}
                onSubmitNumeric={engine.submitNumericInput}
                onSelectOption={engine.selectOptionAction}
                inputValue={engine.inputValue}
                onInputChange={engine.setInputValue}
                selectedOption={engine.selectedOption}
                stepCompleted={engine.stepCompleted}
                showHint={engine.showHint}
                isWrongFlash={engine.isWrongFlash}
                accumulatedActions={engine.accumulatedActions}
              />
            )}
          </div>

          {/* AI SciMate Tutor Chat Panel (1 Column on large screen) */}
          <div className="lg:col-span-1">
            <TutorChat
              experimentSlug={experiment.slug}
              experimentTitle={experiment.title}
              currentStepId={engine.currentStep?.id}
              currentStepInstruction={engine.currentStep?.instruction}
            />
          </div>
        </div>
      )}
    </div>
  );
};
