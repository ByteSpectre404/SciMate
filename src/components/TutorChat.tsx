import React, { useState, useRef, useEffect } from "react";
import { TutorMessage } from "../types.js";
import { Sparkles, Send, Bot, User, RefreshCw, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

interface TutorChatProps {
  experimentSlug: string;
  experimentTitle: string;
  currentStepId?: string;
  currentStepInstruction?: string;
}

export const TutorChat: React.FC<TutorChatProps> = ({
  experimentSlug,
  experimentTitle,
  currentStepId,
  currentStepInstruction,
}) => {
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: "welcome",
      sender: "tutor",
      text: `Hello! I'm SciMate, your AI lab tutor. Ask me anything about "${experimentTitle}" or what's happening in this step!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: TutorMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experimentSlug,
          currentStepId,
          userMessage: query.trim(),
        }),
      });

      const data = await res.json();

      const tutorMsg: TutorMessage = {
        id: (Date.now() + 1).toString(),
        sender: "tutor",
        text: data.reply || "Observe the virtual apparatus and observe the reaction step by step.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isFallback: data.isFallback,
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      console.error("Error communicating with AI tutor:", err);
      const fallbackMsg: TutorMessage = {
        id: (Date.now() + 1).toString(),
        sender: "tutor",
        text: "I'm experiencing a brief connection delay. Keep following the active step instruction on screen!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isFallback: true,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    "Why do we perform this step?",
    "What chemical formula applies here?",
    "How is this tested in Sri Lanka O/L exams?",
  ];

  return (
    <div className="bg-white rounded-xl border border-[#3E6E8E]/30 shadow-md flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="bg-[#0E2A47] text-white px-4 py-3 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-[#E8A33D] flex items-center justify-center text-[#0E2A47] font-bold">
            <Bot className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-sans flex items-center space-x-1.5">
              <span>SciMate Chat</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </h4>
            <p className="text-[10px] text-cyan-200 font-mono">O/L Science AI Tutor</p>
          </div>
        </div>

        <button className="text-slate-300 hover:text-white p-1">
          {isCollapsed ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Body */}
      {!isCollapsed && (
        <div className="flex-1 flex flex-col justify-between p-3 min-h-[280px] max-h-[420px]">
          {/* Chat Transcript */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start space-x-2 ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.sender === "tutor" && (
                  <div className="w-6 h-6 rounded-full bg-[#E8A33D] text-[#0E2A47] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#0E2A47] text-white font-sans rounded-tr-none"
                      : "bg-slate-100 text-slate-800 border border-slate-200 rounded-tl-none font-sans"
                  }`}
                >
                  <p>{m.text}</p>
                  <div
                    className={`text-[9px] mt-1 font-mono text-right ${
                      m.sender === "user" ? "text-cyan-200/70" : "text-slate-400"
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>

                {m.sender === "user" && (
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono italic p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                <span>SciMate is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Sample Prompts */}
          <div className="my-2 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(q)}
                disabled={loading}
                className="text-[10px] font-mono bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-2 py-1 rounded-md transition-colors text-left"
              >
                "{q}"
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center space-x-2 pt-2 border-t border-slate-100"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask SciMate about this step..."
              disabled={loading}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0E2A47] text-slate-900 font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-[#0E2A47] hover:bg-[#16385c] disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
