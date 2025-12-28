import React, { useState, useRef, useEffect } from "react";
import { portfolioAI } from "../services/geminiService";
import { Message } from "../types";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey, I am Raghav’s AI sidekick. Want to talk builds, automations, or security ideas?",
      timestamp: Date.now(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    const response = await portfolioAI.chat(input, history);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: response, timestamp: Date.now() },
    ]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100]">
      {isOpen ? (
        <div className="w-[calc(100vw-2rem)] sm:w-[380px] lg:w-[420px] h-[500px] sm:h-[550px] max-w-[420px] glass rounded-[20px] sm:rounded-[40px] overflow-hidden flex flex-col shadow-2xl border border-emerald-500/20 animate-fade-up">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-emerald-500/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <span className="font-bold block text-sm">
                  Raghav Assistant
                </span>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                  Builder Mode
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-400 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-emerald-600 text-white rounded-tr-none"
                      : "bg-white/5 text-slate-200 rounded-tl-none border border-white/5"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 px-5 py-4 rounded-3xl rounded-tl-none border border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/5 bg-slate-900/40">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-emerald-500/50 pr-14 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-2 w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white hover:bg-emerald-500 disabled:opacity-50 transition-all hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 rounded-[30px] bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:bg-emerald-500 transition-all hover:scale-110 active:scale-95 group relative"
        >
          <svg
            className="w-9 h-9 transition-transform duration-500 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <div className="absolute top-0 right-0 w-5 h-5 bg-cyan-400 rounded-full border-4 border-slate-950 animate-pulse"></div>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
