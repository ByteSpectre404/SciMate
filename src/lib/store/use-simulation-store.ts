import { useState, useCallback } from "react";
import { ExperimentContent, ExperimentStep, StepActionRecord } from "../../types.js";
import { markExperimentComplete } from "../storage/progress.js";

export function useSimulationEngine(initialExperiment: ExperimentContent | null) {
  const [experiment, setExperiment] = useState<ExperimentContent | null>(initialExperiment);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [mode, setMode] = useState<"tap" | "drag">("drag"); // Default drag mode as requested
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [stepCompleted, setStepCompleted] = useState<boolean>(false);
  const [showWhy, setShowWhy] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [isWrongFlash, setIsWrongFlash] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [accumulatedActions, setAccumulatedActions] = useState<StepActionRecord[]>([]);

  const currentStep: ExperimentStep | null =
    experiment && experiment.steps[currentStepIndex] ? experiment.steps[currentStepIndex] : null;

  const resetStepState = useCallback(() => {
    setSelectedItemId(null);
    setStepCompleted(false);
    setShowWhy(false);
    setShowHint(false);
    setInputValue("");
    setSelectedOption(null);
    setWrongAttempts(0);
    setIsWrongFlash(false);
  }, []);

  const initExperiment = useCallback((exp: ExperimentContent) => {
    setExperiment(exp);
    setCurrentStepIndex(0);
    setIsFinished(false);
    setAccumulatedActions([]);
    resetStepState();
  }, [resetStepState]);

  const handleCorrectAction = useCallback((actionDetail?: { itemId?: string; targetId?: string }) => {
    setStepCompleted(true);
    setShowWhy(true);
    setIsWrongFlash(false);

    if (currentStep) {
      const record: StepActionRecord = {
        stepIndex: currentStepIndex,
        stepId: currentStep.id,
        itemId: actionDetail?.itemId || currentStep.dragItemId,
        targetId: actionDetail?.targetId || currentStep.dropTargetId,
        actionType: currentStep.actionType,
        label: actionDetail?.itemId || currentStep.dragItemId || currentStep.instruction.substring(0, 24),
      };

      setAccumulatedActions((prev) => {
        const filtered = prev.filter((r) => r.stepIndex !== currentStepIndex);
        return [...filtered, record];
      });
    }
  }, [currentStep, currentStepIndex]);

  const handleIncorrectAction = useCallback(() => {
    setIsWrongFlash(true);
    setTimeout(() => setIsWrongFlash(false), 800);
    setWrongAttempts((prev) => {
      const next = prev + 1;
      if (next >= 2) {
        setShowHint(true);
      }
      return next;
    });
  }, []);

  // Action Handler for Drag or Tap placement/connection
  const performPlacement = useCallback((itemId: string, targetId: string) => {
    if (!currentStep || stepCompleted) return;

    // Normalize IDs for forgiving match
    const reqItem = (currentStep.dragItemId || "").toLowerCase();
    const reqTarget = (currentStep.dropTargetId || "").toLowerCase();
    const actItem = itemId.toLowerCase();
    const actTarget = targetId.toLowerCase();

    // Check match or substring match for flexible naming
    const isItemMatch = !reqItem || actItem.includes(reqItem) || reqItem.includes(actItem);
    const isTargetMatch = !reqTarget || actTarget.includes(reqTarget) || reqTarget.includes(actTarget);

    if (isItemMatch && isTargetMatch) {
      handleCorrectAction({ itemId, targetId });
    } else {
      handleIncorrectAction();
    }
  }, [currentStep, stepCompleted, handleCorrectAction, handleIncorrectAction]);

  // Action Handler for Toggle Switch
  const toggleSwitchAction = useCallback(() => {
    if (!currentStep || stepCompleted) return;
    if (currentStep.actionType === "toggle_switch") {
      handleCorrectAction({ itemId: "switch", targetId: "circuit_board" });
    }
  }, [currentStep, stepCompleted, handleCorrectAction]);

  // Action Handler for Numeric Input
  const submitNumericInput = useCallback(() => {
    if (!currentStep || stepCompleted) return;
    if (!currentStep.expectedValue) {
      handleCorrectAction();
      return;
    }

    const valStr = inputValue.trim();
    if (!valStr) return;

    const num = parseFloat(valStr);

    if (currentStep.expectedValue.includes("-")) {
      const [minStr, maxStr] = currentStep.expectedValue.split("-");
      const min = parseFloat(minStr);
      const max = parseFloat(maxStr);

      if (!isNaN(num) && num >= min && num <= max) {
        handleCorrectAction();
      } else {
        handleIncorrectAction();
      }
    } else {
      const expectedNum = parseFloat(currentStep.expectedValue);
      if (!isNaN(num) && !isNaN(expectedNum) && Math.abs(num - expectedNum) <= 0.1) {
        handleCorrectAction();
      } else if (valStr.toLowerCase() === currentStep.expectedValue.toLowerCase()) {
        handleCorrectAction();
      } else {
        handleIncorrectAction();
      }
    }
  }, [currentStep, stepCompleted, inputValue, handleCorrectAction, handleIncorrectAction]);

  // Action Handler for Option Select
  const selectOptionAction = useCallback((option: string) => {
    if (!currentStep || stepCompleted) return;
    setSelectedOption(option);

    if (currentStep.correctOption && option.trim().toLowerCase() === currentStep.correctOption.trim().toLowerCase()) {
      handleCorrectAction();
    } else {
      handleIncorrectAction();
    }
  }, [currentStep, stepCompleted, handleCorrectAction, handleIncorrectAction]);

  // Go to next step
  const nextStep = useCallback(() => {
    if (!experiment) return;

    if (currentStepIndex + 1 < experiment.steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
      resetStepState();
    } else {
      setIsFinished(true);
      markExperimentComplete(experiment.slug, experiment.title);
    }
  }, [experiment, currentStepIndex, resetStepState]);

  return {
    experiment,
    currentStep,
    currentStepIndex,
    totalSteps: experiment ? experiment.steps.length : 0,
    mode,
    setMode,
    selectedItemId,
    setSelectedItemId,
    stepCompleted,
    showWhy,
    showHint,
    inputValue,
    setInputValue,
    selectedOption,
    wrongAttempts,
    isWrongFlash,
    isFinished,
    accumulatedActions,
    initExperiment,
    performPlacement,
    toggleSwitchAction,
    submitNumericInput,
    selectOptionAction,
    nextStep,
  };
}
