import React from "react";
import { ExperimentStep, StepActionRecord } from "../types.js";
import { LabApparatusVisual } from "./LabApparatusVisual.js";
import {
  FlaskConical,
  Zap,
  Dna,
  Hand,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Flame,
  Gauge,
  Info,
  Layers,
  Sparkles,
  GripVertical,
} from "lucide-react";

interface DiagramCanvasProps {
  currentStep: ExperimentStep;
  materials: string[];
  mode: "tap" | "drag";
  selectedItemId: string | null;
  onSelectItem: (id: string | null) => void;
  onPlaceAtTarget: (itemId: string, targetId: string) => void;
  onToggleSwitch: () => void;
  onSubmitNumeric: (val: string) => void;
  onSelectOption: (option: string) => void;
  inputValue: string;
  onInputChange: (val: string) => void;
  selectedOption: string | null;
  stepCompleted: boolean;
  showHint: boolean;
  isWrongFlash: boolean;
  accumulatedActions?: StepActionRecord[];
}

export const DiagramCanvas: React.FC<DiagramCanvasProps> = ({
  currentStep,
  materials,
  mode,
  selectedItemId,
  onSelectItem,
  onPlaceAtTarget,
  onToggleSwitch,
  onSubmitNumeric,
  onSelectOption,
  inputValue,
  onInputChange,
  selectedOption,
  stepCompleted,
  showHint,
  isWrongFlash,
  accumulatedActions = [],
}) => {
  const [isZoomed, setIsZoomed] = React.useState<boolean>(false);

  // Determine relevant items for materials tray
  const reqItemId = currentStep.dragItemId || materials[0] || "sample_item";
  const reqTargetId = currentStep.dropTargetId || "target_slot";

  // Drag handlers for Drag Mode
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text/plain");
    if (itemId) {
      onPlaceAtTarget(itemId, targetId);
    }
  };

  return (
    <div
      className={`relative bg-[#EDF1F5] rounded-2xl border-2 transition-colors duration-200 p-4 sm:p-6 shadow-inner flex flex-col justify-between min-h-[380px] overflow-hidden ${
        isWrongFlash
          ? "border-red-500 bg-red-50/50 animate-shake"
          : stepCompleted
          ? "border-[#4F8A73] bg-emerald-50/30"
          : "border-[#3E6E8E]/40"
      }`}
    >
      {/* Blueprint background grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3E6E8E15_1px,transparent_1px),linear-gradient(to_bottom,#3E6E8E15_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Header status bar inside canvas */}
      <div className="relative z-10 flex items-center justify-between mb-4 pb-2 border-b border-[#3E6E8E]/20">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-bold text-[#0E2A47] uppercase tracking-wider">
            Virtual Apparatus Stage
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsZoomed((prev) => !prev)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-all flex items-center space-x-1 ${
              isZoomed
                ? "bg-[#0E2A47] text-amber-300 border-[#0E2A47] shadow-sm"
                : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
            }`}
            title="Toggle Magnifying Lens View"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{isZoomed ? "Zoom 1.25x Active" : "Magnify Stage"}</span>
          </button>

          {stepCompleted ? (
            <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Step Validated!</span>
            </span>
          ) : (
            <span className="text-[11px] font-mono text-[#3E6E8E] hidden sm:inline">
              {mode === "tap" ? "Tap item then target" : "Drag item onto target"}
            </span>
          )}
        </div>
      </div>

      {/* Continuous Assembly Tracker Bar (Shows persistent tracking across steps) */}
      {accumulatedActions.length > 0 && (
        <div className="relative z-10 mb-3 p-2.5 rounded-xl bg-white/95 backdrop-blur-sm border border-emerald-500/40 shadow-sm flex items-center space-x-2 overflow-x-auto scrollbar-thin">
          <div className="flex items-center space-x-1.5 text-[11px] font-mono font-bold text-emerald-900 shrink-0 pr-2.5 border-r border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Accumulated Setup:</span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {accumulatedActions.map((act, idx) => (
              <div key={idx} className="flex items-center space-x-1.5">
                {idx > 0 && <span className="text-slate-300 font-bold text-xs">→</span>}
                <div className="flex items-center space-x-1 text-xs font-semibold text-slate-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="capitalize">{act.label.replace(/_/g, " ")}</span>
                  <span className="text-[9px] font-mono text-emerald-800 bg-emerald-100 px-1 py-0.2 rounded">
                    Step {act.stepIndex + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Canvas Interaction Area */}
      <div className={`relative z-10 flex-1 flex flex-col justify-center transition-transform duration-300 ${isZoomed ? "scale-105 origin-center z-20" : ""}`}>
        {/* ACTION TYPE: DRAG / TAP PLACE OR CONNECT OR MEASURE */}
        {(currentStep.actionType === "drag_place" ||
          currentStep.actionType === "drag_connect" ||
          currentStep.actionType === "drag_measure") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-2">
            {/* Left Tray: Apparatus & Materials Bench with Real Visual Images */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-[#3E6E8E]/30 shadow-md">
              <h5 className="text-xs font-mono font-bold text-[#0E2A47] uppercase mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-[#E8A33D]" />
                  <span>Lab Bench Equipment</span>
                </span>
                <span className="text-[10px] text-slate-400 font-sans font-normal">
                  {mode === "drag" ? "Drag image to drop zone" : "Tap image to select"}
                </span>
              </h5>

              <div className="grid grid-cols-2 gap-3">
                {/* Primary required item with visual apparatus image */}
                <div
                  draggable={mode === "drag"}
                  onDragStart={(e) => handleDragStart(e, reqItemId)}
                  onClick={() => {
                    if (mode === "tap") {
                      onSelectItem(selectedItemId === reqItemId ? null : reqItemId);
                    }
                  }}
                  className={`relative p-3 rounded-xl border-2 transition-all cursor-grab active:cursor-grabbing flex flex-col items-center text-center justify-between group bg-gradient-to-b from-white to-slate-50 ${
                    selectedItemId === reqItemId
                      ? "border-[#E8A33D] bg-amber-50/80 text-amber-950 shadow-lg ring-2 ring-amber-300 -translate-y-0.5"
                      : "border-slate-200 hover:border-[#3E6E8E] hover:shadow-md text-slate-800"
                  }`}
                >
                  <div className="absolute top-2 left-2 text-slate-300 group-hover:text-slate-500">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  {/* Real Apparatus Image Graphic */}
                  <div className="my-1 transform group-hover:scale-105 transition-transform">
                    <LabApparatusVisual
                      itemId={reqItemId}
                      size="lg"
                      state="active"
                      expectedValue={currentStep.expectedValue}
                      resultColor={currentStep.resultColor}
                      resultState={currentStep.resultState}
                    />
                  </div>

                  <div className="w-full pt-1 border-t border-slate-100">
                    <span className="text-xs font-bold font-sans capitalize block truncate text-[#0E2A47]">
                      {reqItemId.replace(/_/g, " ")}
                    </span>

                    <span
                      className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded-full mt-1 ${
                        selectedItemId === reqItemId
                          ? "bg-[#E8A33D] text-[#0E2A47] font-bold"
                          : "bg-slate-200/80 text-slate-600"
                      }`}
                    >
                      {selectedItemId === reqItemId ? "Selected ✓" : mode === "tap" ? "Tap to Select" : "Drag Item"}
                    </span>
                  </div>
                </div>

                {/* Additional materials for realistic lab bench */}
                {materials
                  .filter((m) => m.toLowerCase() !== reqItemId.toLowerCase())
                  .slice(0, 3)
                  .map((mat, idx) => {
                    const matId = mat.toLowerCase().replace(/[^a-z0-9]/g, "_");
                    const isSelected = selectedItemId === matId;
                    return (
                      <div
                        key={idx}
                        draggable={mode === "drag"}
                        onDragStart={(e) => handleDragStart(e, matId)}
                        onClick={() => {
                          if (mode === "tap") {
                            onSelectItem(isSelected ? null : matId);
                          }
                        }}
                        className={`relative p-3 rounded-xl border-2 transition-all cursor-grab active:cursor-grabbing flex flex-col items-center text-center justify-between group bg-gradient-to-b from-white to-slate-50 ${
                          isSelected
                            ? "border-amber-400 bg-amber-50 text-amber-950 shadow-md ring-2 ring-amber-200"
                            : "border-slate-200 hover:border-slate-300 hover:shadow-sm text-slate-700"
                        }`}
                      >
                        <div className="absolute top-2 left-2 text-slate-300">
                          <GripVertical className="w-3.5 h-3.5" />
                        </div>

                        <div className="my-1 transform group-hover:scale-105 transition-transform">
                          <LabApparatusVisual itemId={matId} size="md" />
                        </div>

                        <div className="w-full pt-1 border-t border-slate-100">
                          <span className="text-[11px] font-semibold font-sans capitalize block truncate">
                            {mat}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                            {isSelected ? "Selected" : "Bench tool"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Right Target Slot: Apparatus Assembly Drop Zone with Real Graphic Preview */}
            <div className="flex flex-col items-center justify-center">
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, reqTargetId)}
                onClick={() => {
                  if (mode === "tap" && selectedItemId) {
                    onPlaceAtTarget(selectedItemId, reqTargetId);
                  }
                }}
                className={`w-full max-w-sm min-h-[220px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-5 transition-all text-center cursor-pointer relative overflow-hidden ${
                  stepCompleted
                    ? "border-[#4F8A73] bg-emerald-50/90 shadow-md"
                    : selectedItemId
                    ? "border-[#E8A33D] bg-amber-100/70 shadow-lg ring-4 ring-amber-300/40 animate-pulse"
                    : "border-[#3E6E8E]/60 bg-white/80 hover:bg-white text-slate-600 hover:shadow-md"
                }`}
              >
                {stepCompleted ? (
                  <div className="flex flex-col items-center space-y-3 z-10 animate-fadeIn">
                    <div className="relative flex items-center justify-center space-x-2">
                      <LabApparatusVisual
                        itemId={reqTargetId}
                        size="xl"
                        state="connected"
                        accumulatedItems={[...accumulatedActions.map((a) => a.itemId), reqItemId]}
                        expectedValue={currentStep.expectedValue}
                        resultColor={currentStep.resultColor}
                        resultState={currentStep.resultState}
                      />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#4F8A73] text-white flex items-center justify-center shadow-lg border-2 border-white">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="bg-white/90 px-3 py-1.5 rounded-xl border border-emerald-300 shadow-sm">
                      <span className="text-xs font-bold font-sans capitalize text-[#4F8A73] block">
                        {reqItemId.replace(/_/g, " ")} placed on {reqTargetId.replace(/_/g, " ")}!
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700">Apparatus Stage Assembly Ready</span>
                    </div>

                    {/* Stage Contents Accumulated */}
                    {accumulatedActions.length > 0 && (
                      <div className="pt-2 border-t border-emerald-200 w-full max-w-[240px]">
                        <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block mb-1">
                          Active Stage Assembly:
                        </span>
                        <div className="flex flex-wrap justify-center gap-1">
                          {accumulatedActions.map((act, i) => (
                            <span key={i} className="text-[10px] font-semibold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300 flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              <span className="capitalize">{act.label.replace(/_/g, " ")}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-3 z-10">
                    {/* Real Graphic Visual Reference of the Target Apparatus */}
                    <div className="relative p-2 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-xs group">
                      <LabApparatusVisual
                        itemId={reqTargetId}
                        size="xl"
                        state="idle"
                        accumulatedItems={accumulatedActions.map((a) => a.itemId)}
                        expectedValue={currentStep.expectedValue}
                        resultColor={currentStep.resultColor}
                        resultState={currentStep.resultState}
                      />
                      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-amber-500/10 ring-2 ring-amber-400/60 ring-offset-2 animate-pulse">
                        <Hand className="w-8 h-8 text-[#0E2A47] animate-bounce" />
                      </div>
                    </div>

                    <div>
                      <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-100 text-[#0E2A47] border border-slate-300 text-xs font-bold font-mono uppercase mb-1">
                        <span>Target:</span>
                        <span className="capitalize">{reqTargetId.replace(/_/g, " ")}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-sans max-w-[220px] mx-auto mt-0.5">
                        {mode === "tap"
                          ? selectedItemId
                            ? `Tap here to place "${selectedItemId.replace(/_/g, " ")}" onto the ${reqTargetId.replace(/_/g, " ")}`
                            : `Select "${reqItemId.replace(/_/g, " ")}" from lab bench first`
                          : `Drag "${reqItemId.replace(/_/g, " ")}" onto the ${reqTargetId.replace(/_/g, " ")}`}
                      </p>
                    </div>

                    {/* Accumulated items from earlier steps visible on stage */}
                    {accumulatedActions.length > 0 && (
                      <div className="mt-1 pt-2 border-t border-slate-200/80 w-full max-w-[240px]">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">
                          Already On Stage:
                        </span>
                        <div className="flex flex-wrap justify-center gap-1">
                          {accumulatedActions.map((act, i) => (
                            <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300 flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span className="capitalize">{act.label.replace(/_/g, " ")}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ACTION TYPE: TOGGLE SWITCH */}
        {currentStep.actionType === "toggle_switch" && (
          <div className="flex flex-col items-center justify-center my-6 space-y-4">
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 shadow-md max-w-md w-full text-center">
              <div className="my-2 flex justify-center">
                <LabApparatusVisual
                  itemId={currentStep.dragItemId || currentStep.dropTargetId || reqItemId || "switch"}
                  size="xl"
                  state={stepCompleted ? "connected" : "idle"}
                  expectedValue={currentStep.expectedValue}
                  resultColor={currentStep.resultColor}
                  resultState={currentStep.resultState}
                  accumulatedItems={accumulatedActions.map((a) => a.itemId)}
                />
              </div>

              <h4 className="text-base font-bold text-[#0E2A47] font-sans mb-1 capitalize">
                {currentStep.dragItemId ? currentStep.dragItemId.replace(/_/g, " ") : "Apparatus Controller / Switch"}
              </h4>
              <p className="text-xs text-slate-600 mb-4">
                Toggle the switch to initiate heating, complete the electric loop, or actuate the diaphragm.
              </p>

              <button
                onClick={onToggleSwitch}
                disabled={stepCompleted}
                className={`w-full py-3 px-4 rounded-xl font-mono font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 ${
                  stepCompleted
                    ? "bg-[#4F8A73] text-white cursor-default"
                    : "bg-[#0E2A47] hover:bg-[#16385c] text-white active:scale-95"
                }`}
              >
                {stepCompleted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Switch Actuated / Active!</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-amber-300" />
                    <span>Toggle Switch Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ACTION TYPE: INPUT READING */}
        {currentStep.actionType === "input_reading" && (
          <div className="flex flex-col items-center justify-center my-6">
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 shadow-md max-w-md w-full">
              <div className="flex items-center space-x-4 mb-4 border-b border-slate-100 pb-3">
                <LabApparatusVisual
                  itemId={
                    currentStep.dragItemId ||
                    (currentStep.instruction?.toLowerCase().includes("voltmeter")
                      ? "voltmeter"
                      : currentStep.instruction?.toLowerCase().includes("thermometer")
                      ? "thermometer"
                      : "ammeter")
                  }
                  size="lg"
                  state={stepCompleted ? "connected" : "idle"}
                  expectedValue={currentStep.expectedValue}
                  resultColor={currentStep.resultColor}
                  resultState={currentStep.resultState}
                  accumulatedItems={accumulatedActions.map((a) => a.itemId)}
                />
                <div>
                  <h4 className="text-sm font-bold text-[#0E2A47] font-sans">
                    Digital Meter / Gauge Reading
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    Expected Reading Range: {currentStep.expectedValue || "e.g. 5.0"}
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmitNumeric(inputValue);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Enter Measured Value:
                  </label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder="e.g. 5.0"
                    disabled={stepCompleted}
                    className="w-full bg-slate-50 border-2 border-slate-300 focus:border-[#0E2A47] rounded-xl px-4 py-2 text-sm font-mono text-slate-900 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim() || stepCompleted}
                  className={`w-full py-2.5 px-4 rounded-xl font-mono font-bold text-xs shadow-sm transition-all ${
                    stepCompleted
                      ? "bg-[#4F8A73] text-white"
                      : "bg-[#0E2A47] text-white hover:bg-[#16385c]"
                  }`}
                >
                  {stepCompleted ? "Reading Verified ✓" : "Submit Reading"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ACTION TYPE: SELECT OBSERVATION */}
        {currentStep.actionType === "select_observation" && (
          <div className="my-4">
            <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 pb-3 border-b border-slate-100">
                <LabApparatusVisual
                  itemId={currentStep.dropTargetId || currentStep.dragItemId || reqTargetId}
                  size="lg"
                  state={stepCompleted ? "connected" : "active"}
                  expectedValue={currentStep.expectedValue}
                  resultColor={currentStep.resultColor}
                  resultState={currentStep.resultState}
                  accumulatedItems={accumulatedActions.map((a) => a.itemId)}
                />
                <div className="text-center sm:text-left">
                  <h4 className="text-xs font-mono font-bold text-[#0E2A47] uppercase flex items-center justify-center sm:justify-start space-x-1.5">
                    <Sparkles className="w-4 h-4 text-[#E8A33D]" />
                    <span>Apparatus State Observation</span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Examine the visual result on stage above and select the correct observation.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {currentStep.options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectOption(opt)}
                    disabled={stepCompleted}
                    className={`p-3 rounded-xl text-left text-xs font-sans font-semibold border-2 transition-all flex items-center justify-between ${
                      selectedOption === opt && stepCompleted
                        ? "border-[#4F8A73] bg-emerald-50 text-emerald-950 shadow-sm"
                        : selectedOption === opt
                        ? "border-amber-400 bg-amber-50 text-amber-950"
                        : "border-slate-200 bg-slate-50 hover:border-[#3E6E8E] text-slate-800"
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedOption === opt && stepCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-[#4F8A73]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ACTION TYPE: INFO / CONTEXT STEP */}
        {currentStep.actionType === "info" && (
          <div className="flex flex-col items-center justify-center my-6 text-center">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 shadow-sm max-w-md w-full">
              <div className="w-12 h-12 rounded-full bg-cyan-100 text-[#0E2A47] mx-auto flex items-center justify-center mb-3">
                <Info className="w-6 h-6 text-[#3E6E8E]" />
              </div>
              <h4 className="text-sm font-bold text-[#0E2A47] font-sans mb-2">
                Experiment Safety & Context
              </h4>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed font-sans">
                {currentStep.instruction}
              </p>
              <button
                onClick={onToggleSwitch}
                disabled={stepCompleted}
                className="w-full py-2.5 px-4 bg-[#0E2A47] text-white rounded-xl font-mono font-bold text-xs hover:bg-[#16385c]"
              >
                {stepCompleted ? "Ready ✓" : "Acknowledge & Continue"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hint Alert Bar */}
      {showHint && currentStep.hint && !stepCompleted && (
        <div className="relative z-10 mt-4 bg-amber-100 border border-amber-300 rounded-xl p-3 flex items-start space-x-2 text-xs text-amber-900 font-sans animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold font-mono uppercase block text-[10px] text-amber-800">
              SciMate Lab Hint:
            </span>
            <span>{currentStep.hint}</span>
          </div>
        </div>
      )}
    </div>
  );
};
