import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { apiRouter } from "./api/index.js";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Mount API endpoints
  app.use("/api", apiRouter);

  // Vite Dev Server or Production Static Serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SciMate server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
