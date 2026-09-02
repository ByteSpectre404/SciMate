import React from "react";
import { Hand, MousePointer, Touchpad } from "lucide-react";

interface ModeToggleProps {
  mode: "tap" | "drag";
  onToggle: (mode: "tap" | "drag") => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onToggle }) => {
  return (
    <div className="inline-flex items-center bg-[#07192C] p-1 rounded-lg border border-[#3E6E8E]/50 shadow-inner">
      <button
        onClick={() => onToggle("tap")}
        className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
          mode === "tap"
            ? "bg-[#E8A33D] text-[#0E2A47] shadow-sm"
            : "text-slate-300 hover:text-white"
        }`}
        title="Tap Mode: Select item then tap target (best for touchscreens & mobile)"
      >
        <Hand className="w-3.5 h-3.5" />
        <span>Tap Mode</span>
      </button>

      <button
        onClick={() => onToggle("drag")}
        className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold transition-all ${
          mode === "drag"
            ? "bg-[#3E6E8E] text-white shadow-sm"
            : "text-slate-300 hover:text-white"
        }`}
        title="Drag Mode: Drag item directly onto target slot"
      >
        <MousePointer className="w-3.5 h-3.5" />
        <span>Drag Mode</span>
      </button>
    </div>
  );
};
