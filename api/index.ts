import express, { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { loadAllExperiments } from "../src/lib/content/load-experiments.js";

dotenv.config();

const app = express();
app.use(express.json());

// API Router
const apiRouter = express.Router();

// GET /api/experiments
apiRouter.get("/experiments", (req: Request, res: Response) => {
  try {
    const experiments = loadAllExperiments();
    res.json(experiments);
  } catch (err) {
    console.error("Error loading experiments:", err);
    res.status(500).json({ error: "Failed to load experiments" });
  }
});

// GET /api/experiments/:slug
apiRouter.get("/experiments/:slug", (req: Request, res: Response) => {
  try {
    const experiments = loadAllExperiments();
    const exp = experiments.find((e) => e.slug === req.params.slug);
    if (!exp) {
      return res.status(404).json({ error: "Experiment not found" });
    }
    res.json(exp);
  } catch (err) {
    console.error("Error loading experiment:", err);
    res.status(500).json({ error: "Failed to load experiment" });
  }
});

// POST /api/tutor
apiRouter.post("/tutor", async (req: Request, res: Response) => {
  const { experimentSlug, currentStepId, userMessage } = req.body;

  if (!userMessage || typeof userMessage !== "string") {
    return res.status(400).json({ error: "userMessage is required" });
  }

  // Load experiment context
  const experiments = loadAllExperiments();
  const exp = experiments.find((e) => e.slug === experimentSlug);

  let currentStepText = "General observation stage";
  let stepWhy = "";
  if (exp && currentStepId) {
    const step = exp.steps.find((s) => s.id === currentStepId);
    if (step) {
      currentStepText = step.instruction;
      stepWhy = step.why;
    }
  }

  const systemPrompt = `You are SciMate, an encouraging and expert AI lab tutor for Sri Lankan Grade 10 and Grade 11 (O/L) science students.

Context:
- Experiment: ${exp ? `${exp.title} (Grade ${exp.grade} ${exp.subject.toUpperCase()}, Unit: ${exp.unit})` : "General Science"}
- Learning Outcomes: ${exp ? exp.learningOutcomes.join("; ") : "Scientific inquiry and practical observations"}
- Current Active Step: "${currentStepText}"
- Step Scientific Explanation ("Why this matters"): "${stepWhy}"

Rules:
1. Provide concise, clear, and age-appropriate explanations (2-4 sentences max).
2. Ground your answer strictly in Sri Lankan G10/G11 O/L Science curriculum principles.
3. Be friendly and supportive. Use simple English and include Sinhala/Tamil terminology hints if relevant.
4. If asked what to do next, guide the student's reasoning rather than giving away immediate click instructions.
5. If the request is completely off-topic from science or school lab experiments, politely redirect them back to the current experiment.`;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback when GEMINI_API_KEY is not configured
      return res.json({
        reply: exp && stepWhy
          ? `SciMate Offline Hint: ${stepWhy}`
          : `I'm SciMate! Regarding your question: focus on observing changes in temperature, color, or reaction rates step by step.`,
        isFallback: true,
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Observe the changes on screen carefully. Let me know if you need more guidance!";
    return res.json({ reply: replyText });
  } catch (err) {
    console.error("Gemini API tutor error:", err);
    // Fallback on API failure or timeout
    return res.json({
      reply: exp && stepWhy
        ? `[SciMate Local Guidance]: ${stepWhy}`
        : "Observe how the ingredients react when combined. Try testing color or temperature changes!",
      isFallback: true,
    });
  }
});

// Mount on both /api and root / to support direct invocations and URL rewrites seamlessly
app.use("/api", apiRouter);
app.use("/", apiRouter);

export { apiRouter };
export default app;
