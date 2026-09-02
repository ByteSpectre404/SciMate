import { ExperimentContent, ExperimentStep, ActionType, Subject } from "../../types.js";

export function parseExperimentText(rawText: string, filenameSlug: string): ExperimentContent | null {
  try {
    const lines = rawText.split(/\r?\n/);
    
    // Divide into Header section, Steps sections, and Outcome section
    const stepSplits = rawText.split(/===STEP===/i);
    if (stepSplits.length < 2) {
      console.warn(`[Parser] Skipping ${filenameSlug}: Missing ===STEP=== sections`);
      return null;
    }

    const headerSection = stepSplits[0];
    const outcomeSplits = stepSplits[stepSplits.length - 1].split(/===OUTCOME===/i);
    
    // Adjust last step content
    stepSplits[stepSplits.length - 1] = outcomeSplits[0];
    const outcomeSection = outcomeSplits[1] || "";

    // Parse Header
    let title = "";
    let subject: Subject = "physics";
    let grade: 10 | 11 = 10;
    let unit = "";
    let difficulty: "easy" | "medium" | "hard" = "medium";
    let durationMinutes = 15;
    let description = "";
    const materials: string[] = [];
    const learningOutcomes: string[] = [];

    let currentListMode: "materials" | "outcomes" | null = null;

    const headerLines = headerSection.split(/\r?\n/);
    for (const rawLine of headerLines) {
      const line = rawLine.trim();
      if (!line) continue;

      if (line.startsWith("TITLE:")) {
        title = line.replace("TITLE:", "").trim();
      } else if (line.startsWith("SUBJECT:")) {
        const sub = line.replace("SUBJECT:", "").trim().toLowerCase();
        if (sub === "chemistry" || sub === "biology" || sub === "physics") {
          subject = sub;
        }
      } else if (line.startsWith("GRADE:")) {
        const gr = parseInt(line.replace("GRADE:", "").trim(), 10);
        if (gr === 11) grade = 11;
        else grade = 10;
      } else if (line.startsWith("UNIT:")) {
        unit = line.replace("UNIT:", "").trim();
      } else if (line.startsWith("DIFFICULTY:")) {
        const diff = line.replace("DIFFICULTY:", "").trim().toLowerCase();
        if (diff === "easy" || diff === "hard" || diff === "medium") {
          difficulty = diff;
        }
      } else if (line.startsWith("DURATION_MINUTES:")) {
        const dur = parseInt(line.replace("DURATION_MINUTES:", "").trim(), 10);
        if (!isNaN(dur)) durationMinutes = dur;
      } else if (line.startsWith("DESCRIPTION:")) {
        description = line.replace("DESCRIPTION:", "").trim();
      } else if (line.startsWith("MATERIALS:")) {
        currentListMode = "materials";
      } else if (line.startsWith("LEARNING_OUTCOMES:")) {
        currentListMode = "outcomes";
      } else if (line.startsWith("-")) {
        const item = line.replace(/^-/, "").trim();
        if (currentListMode === "materials") materials.push(item);
        if (currentListMode === "outcomes") learningOutcomes.push(item);
      }
    }

    if (!title) {
      console.warn(`[Parser] Skipping ${filenameSlug}: Missing TITLE`);
      return null;
    }

    // Parse Steps
    const rawStepSections = stepSplits.slice(1);
    const steps: ExperimentStep[] = [];

    rawStepSections.forEach((stepText, idx) => {
      const sLines = stepText.split(/\r?\n/);
      let id = `step-${idx + 1}`;
      let instruction = "";
      let actionType: ActionType = "info";
      let dragItemId: string | undefined;
      let dropTargetId: string | undefined;
      let expectedValue: string | undefined;
      let options: string[] | undefined;
      let correctOption: string | undefined;
      let hint: string | undefined;
      let resultColor: string | undefined;
      let resultState: string | undefined;
      let why = "";

      sLines.forEach(rawLine => {
        const line = rawLine.trim();
        if (!line) return;

        if (line.startsWith("ID:")) id = line.replace("ID:", "").trim();
        else if (line.startsWith("INSTRUCTION:")) instruction = line.replace("INSTRUCTION:", "").trim();
        else if (line.startsWith("ACTION_TYPE:")) {
          const at = line.replace("ACTION_TYPE:", "").trim().toLowerCase() as ActionType;
          actionType = at;
        }
        else if (line.startsWith("DRAG_ITEM_ID:")) dragItemId = line.replace("DRAG_ITEM_ID:", "").trim();
        else if (line.startsWith("DROP_TARGET_ID:")) dropTargetId = line.replace("DROP_TARGET_ID:", "").trim();
        else if (line.startsWith("EXPECTED_VALUE:")) expectedValue = line.replace("EXPECTED_VALUE:", "").trim();
        else if (line.startsWith("RESULT_COLOR:")) resultColor = line.replace("RESULT_COLOR:", "").trim();
        else if (line.startsWith("RESULT_STATE:")) resultState = line.replace("RESULT_STATE:", "").trim();
        else if (line.startsWith("OPTIONS:")) {
          const rawOpts = line.replace("OPTIONS:", "").trim();
          options = rawOpts.split("|").map(o => o.trim());
        }
        else if (line.startsWith("CORRECT_OPTION:")) correctOption = line.replace("CORRECT_OPTION:", "").trim();
        else if (line.startsWith("HINT:")) hint = line.replace("HINT:", "").trim();
        else if (line.startsWith("WHY:")) why = line.replace("WHY:", "").trim();
      });

      if (instruction) {
        steps.push({
          id,
          instruction,
          actionType,
          dragItemId,
          dropTargetId,
          expectedValue,
          options,
          correctOption,
          hint,
          why: why || "Follow the procedure steps to complete the experiment observation.",
          resultColor,
          resultState,
        });
      }
    });

    if (steps.length === 0) {
      console.warn(`[Parser] Skipping ${filenameSlug}: No valid steps found`);
      return null;
    }

    // Parse Outcome
    let summary = "";
    let formula: string | undefined;
    const reflectionQuestions: string[] = [];

    const outcomeLines = outcomeSection.split(/\r?\n/);
    let inQuestions = false;

    for (const rawLine of outcomeLines) {
      const line = rawLine.trim();
      if (!line) continue;

      if (line.startsWith("SUMMARY:")) {
        summary = line.replace("SUMMARY:", "").trim();
        inQuestions = false;
      } else if (line.startsWith("FORMULA:")) {
        formula = line.replace("FORMULA:", "").trim();
        inQuestions = false;
      } else if (line.startsWith("REFLECTION_QUESTIONS:")) {
        inQuestions = true;
      } else if (line.startsWith("-") && inQuestions) {
        reflectionQuestions.push(line.replace(/^-/, "").trim());
      }
    }

    return {
      slug: filenameSlug,
      title,
      subject,
      grade,
      unit: unit || "General Science",
      difficulty,
      durationMinutes,
      description: description || title,
      materials,
      learningOutcomes,
      steps,
      outcome: {
        summary: summary || "Experiment completed successfully.",
        formula,
        reflectionQuestions
      },
      hasCustomDiagram: false
    };

  } catch (err) {
    console.error(`[Parser] Error parsing ${filenameSlug}:`, err);
    return null;
  }
}
