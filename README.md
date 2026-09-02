# SciMate 🔬⚡🌱

> **Virtual Science Lab Experiments & AI Science Tutor**  
> Tailored for Sri Lankan Grade 10 & 11 students preparing for G.C.E. Ordinary Level (O/L) Science.

---

## 🌟 Project Purpose

In traditional classroom settings, access to fully equipped science laboratories, chemical reagents, and individual practical apparatus can be limited. **SciMate** bridges this gap by providing an interactive, digital lab bench where students can safely conduct mandatory O/L Physics, Chemistry, and Biology practicals.

With step-by-step guidance, authentic visual physical state changes, deep conceptual annotations, and an instant AI Science Tutor, SciMate empowers students to develop practical mastery and conceptual understanding for their O/L examinations.

---

## 🛠️ Tech Stack & Frameworks

- **Frontend Framework**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Bundler**: [Vite 6](https://vitejs.dev/) & [esbuild](https://esbuild.github.io/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.react.dev/)
- **Backend & Serverless API**: [Express.js](https://expressjs.com/) with native Vercel Serverless Functions (`api/index.ts`) & local dev server (`server.ts`)
- **AI Integration**: [@google/genai SDK](https://www.npmjs.com/package/@google/genai) powering **Gemini Flash** for the AI Lab Tutor
- **Interactivity**: Custom SVG apparatus renderers, canvas confetti, and local storage state management

---

## ✨ Core Features

### 🧪 1. Interactive Visual Lab Workbench
- **Authentic Apparatus Simulation**: Interactive SVGs for test tubes, beakers, bunsen burners, ammeters, voltmeters, switches, glass blocks, concave mirrors, slinky springs, bell jar breathing models, and compound microscopes.
- **Realistic Physical State Transitions**: Glassware starts completely empty and dynamically fills, boils, or changes colors upon adding specific chemical reagents.
- **Magnifying Stage Lens**: Zoom in (1.25x) to inspect fine visual phenomena such as precipitate formation, cell structures, or light ray reflections.

### 💡 2. Scientific "Why" Annotations & Step Explanations
- Every experiment step features instant context explaining the underlying chemical equations, physical laws (e.g., Ohm's Law, Snell's Law), or biological mechanisms.

### 🤖 3. AI Lab Tutor ("SciMate Tutor")
- Powered by **Gemini Flash** server-side proxy API.
- Understands current experiment context, step instructions, and student questions to provide real-time guidance, hints, and explanations without revealing direct answers prematurely.

### 📓 4. Scientist's Live Lab Notebook
- Automatically records experimental readings (e.g., pH values, temperatures, observed colors, electrical current).
- Includes a dedicated student note-taking area for hypotheses and observations during experiments.

### 🎮 5. Dual Interactivity Modes
- Supports both **Drag-and-Drop** and **Tap-to-Select** interaction modes for seamless experience on desktop, tablet, and mobile devices.

### 📊 6. Curriculum Alignment & Progress Tracking
- Structured across Grade 10 and Grade 11 Science syllabi in **Physics**, **Chemistry**, and **Biology**.
- Tracks experiment completions, accuracy scores, and offers practical review summaries.

---

## 🚀 Quick Setup & Installation

### Prerequisites
- **Node.js**: v18 or higher
- **npm** or **bun** / **pnpm**

### 1. Clone the Repository & Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory or copy from `.env.example`:

```bash
cp .env.example .env
```

Define your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note**: The Gemini API key is accessed securely on the server/serverless backend (`api/index.ts` and `server.ts`) and is never exposed to the client browser.

### 3. Run Development Server
```bash
npm run dev
```
The application will start on `http://localhost:3000`.

---

## 🌐 Deploying to Vercel

SciMate is ready for zero-config Vercel deployment:

1. **Import Project**: Connect your GitHub repository to Vercel.
2. **Framework Preset**: Select **Vite** (or Other).
3. **Build Command**: `npm run build` (or `vite build`)
4. **Output Directory**: `dist`
5. **Environment Variables**:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
   - `GEMINI_MODEL` *(optional)*: Defaults to `gemini-3.6-flash`.

The included `vercel.json` automatically bundles all `.txt` experiments from `content/experiments` into the `api/index.ts` serverless function.

---

## 📂 Project Structure

```
.
├── api/
│   └── index.ts                 # Vercel Serverless Function entry point
├── content/                     # Experiment definition data files
│   └── experiments/
│       ├── biology/             # Grade 10 & 11 Biology practicals
│       ├── chemistry/           # Grade 10 & 11 Chemistry practicals
│       └── physics/             # Grade 10 & 11 Physics practicals
├── src/
│   ├── assets/                  # High quality background images and assets
│   ├── components/              # Reusable React components (LabApparatusVisual, DiagramCanvas, TutorChat, etc.)
│   ├── lib/
│   │   ├── chemistry/           # Reagent reactions & color calculation logic
│   │   ├── content/             # Parser & loader for experiment files
│   │   ├── storage/             # Progress & local storage handlers
│   │   └── store/               # Simulation engine hook & state management
│   ├── views/                   # Main view screens (Home, Browse, Simulator, Progress)
│   ├── App.tsx                  # Primary view router
│   ├── main.tsx                 # Client entry point
│   └── types.ts                 # TypeScript type definitions
├── server.ts                    # Local Express + Vite development server
├── vercel.json                  # Vercel deployment and serverless routing config
├── metadata.json                # AI Studio application metadata
└── package.json                 # Dependency definitions & scripts
```
