import { UserProgress } from "../../types.js";

const STORAGE_KEY = "scimate_user_progress_v1";

const DEFAULT_PROGRESS: UserProgress = {
  completedSlugs: [],
  lastCompletedAt: undefined,
  streakDays: 0,
  unlockedBadges: [],
  history: [],
};

export function getLocalProgress(): UserProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return JSON.parse(raw) as UserProgress;
  } catch (e) {
    console.error("Error reading user progress from localStorage", e);
    return DEFAULT_PROGRESS;
  }
}

export function saveLocalProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Error saving user progress to localStorage", e);
  }
}

export function markExperimentComplete(slug: string, title: string): UserProgress {
  const current = getLocalProgress();
  const nowStr = new Date().toISOString();
  const todayStr = new Date().toDateString();

  const isNew = !current.completedSlugs.includes(slug);
  const updatedCompleted = isNew ? [...current.completedSlugs, slug] : current.completedSlugs;

  // Calculate streak
  let newStreak = current.streakDays || 1;
  if (current.lastCompletedAt) {
    const lastDate = new Date(current.lastCompletedAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  // Calculate Badges
  const badges = new Set(current.unlockedBadges);
  if (updatedCompleted.length >= 1) badges.add("first_lab");
  if (updatedCompleted.length >= 3) badges.add("lab_assistant");
  if (updatedCompleted.length >= 5) badges.add("science_scholar");
  if (updatedCompleted.length >= 10) badges.add("ol_champion");
  if (newStreak >= 3) badges.add("streak_master");

  const newHistory = [
    {
      slug,
      title,
      completedAt: nowStr,
      scorePercent: 100,
    },
    ...(current.history || []).filter((h) => h.slug !== slug),
  ];

  const updated: UserProgress = {
    completedSlugs: updatedCompleted,
    lastCompletedAt: nowStr,
    streakDays: newStreak,
    unlockedBadges: Array.from(badges),
    history: newHistory,
  };

  saveLocalProgress(updated);
  return updated;
}

export function resetLocalProgress(): UserProgress {
  saveLocalProgress(DEFAULT_PROGRESS);
  return DEFAULT_PROGRESS;
}
