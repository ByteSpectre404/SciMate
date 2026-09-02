export type Subject = "physics" | "chemistry" | "biology";

export type ActionType =
  | "drag_connect"
  | "drag_place"
  | "drag_measure"
  | "toggle_switch"
  | "input_reading"
  | "select_observation"
  | "info";

export interface StepActionRecord {
  stepIndex: number;
  stepId: string;
  itemId?: string;
  targetId?: string;
  actionType: ActionType;
  label: string;
}

export interface ExperimentStep {
  id: string;
  instruction: string;
  actionType: ActionType;
  dragItemId?: string;
  dropTargetId?: string;
  expectedValue?: string;
  options?: string[];
  correctOption?: string;
  hint?: string;
  why: string;
  resultColor?: string;
  resultState?: string;
}

export interface ExperimentContent {
  slug: string;
  title: string;
  subject: Subject;
  grade: 10 | 11;
  unit: string;
  difficulty: "easy" | "medium" | "hard";
  durationMinutes: number;
  description: string;
  materials: string[];
  learningOutcomes: string[];
  steps: ExperimentStep[];
  outcome: {
    summary: string;
    formula?: string;
    reflectionQuestions: string[];
  };
  hasCustomDiagram?: boolean;
}

export interface UserProgress {
  completedSlugs: string[];
  lastCompletedAt?: string;
  streakDays: number;
  unlockedBadges: string[];
  history: {
    slug: string;
    title: string;
    completedAt: string;
    scorePercent: number;
  }[];
}

export interface TutorMessage {
  id: string;
  sender: "user" | "tutor";
  text: string;
  timestamp: string;
  isFallback?: boolean;
}
