import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseExperimentText } from "./parse-experiment.js";
import { ExperimentContent } from "../../types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getExperimentsDir(): string {
  const possiblePaths = [
    path.join(process.cwd(), "content", "experiments"),
    path.join(process.cwd(), "..", "content", "experiments"),
    path.resolve(process.cwd(), "content/experiments"),
    path.join(__dirname, "../../../content/experiments"),
    path.join(__dirname, "../../content/experiments"),
    path.join(__dirname, "../content/experiments"),
    path.join(__dirname, "content/experiments"),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  return path.join(process.cwd(), "content", "experiments");
}

export function loadAllExperiments(): ExperimentContent[] {
  const experimentsDir = getExperimentsDir();
  const experiments: ExperimentContent[] = [];

  if (!fs.existsSync(experimentsDir)) {
    console.warn(`[Content Loader] Directory ${experimentsDir} does not exist`);
    return [];
  }

  function readDirectoryRecursively(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        readDirectoryRecursively(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".txt")) {
        try {
          const content = fs.readFileSync(fullPath, "utf-8");
          const slug = path.basename(entry.name, ".txt");
          const parsed = parseExperimentText(content, slug);

          if (parsed) {
            experiments.push(parsed);
          }
        } catch (err) {
          console.error(`[Content Loader] Failed reading file ${fullPath}:`, err);
        }
      }
    }
  }

  readDirectoryRecursively(experimentsDir);

  // Sort by grade (10 first, then 11), subject, title
  return experiments.sort((a, b) => {
    if (a.grade !== b.grade) return a.grade - b.grade;
    if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
    return a.title.localeCompare(b.title);
  });
}
