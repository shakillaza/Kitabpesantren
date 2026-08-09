import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  BookOpen,
  RefreshCw,
  Copy,
  Check,
  Volume2,
  VolumeX,
} from "lucide-react";
import { ChatMessage } from "../types";
import { safePostApi } from "../lib/apiClient";
import { generateChatFallback } from "../lib/aiFallback";
import { playTextToSpeech, stopTextToSpeech } from "../lib/audioService";

export const AIChatModule: React.FC = () => {
  const [playingMsgId, setPlayingMsgId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      text: "Assalamu'alaikum Warahmatullahi Wabarakatuh. Saya **USTADZ MUHAMMAD IKRAM**, asisten keilmuan Islam dan Kitab Kuning Pesantren. Ada masalah Fiqih, Nahwu, Sharaf, Tafsir, atau Hadits yang ingin didiskusikan hari ini?",
      timestamp: "Baru saja",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    "Apa saja syarat sah Shalat Berjamaah menurut Kitab Safinatun Najah?",
    "Jelaskan pengertian Kalam dan pembagiannya menurut Alfiyah Ibnu Malik!",
    "Sebutkan rukun Wudhu beserta dalilnya dalam Kitab Fathul Qarib!",
    "Bagaimana kaidah I'rab untuk Isim Mu'rab dan Isim Mabni?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const data = await safePostApi<{ text: string }>(
        "/api/gemini/chat",
        {
          message: query,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        },
        () => generateChatFallback(query)
      );

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sources: ["Safinatun Najah", "Taqrib", "Alfiyah Ibnu Malik"],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const fallback = generateChatFallback(query);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: fallback.text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          sources: ["Safinatun Najah", "Taqrib"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleAudioMsg = (id: string, text: string) => {
    if (playingMsgId === id) {
      stopTextToSpeech();
      setPlayingMsgId(null);
    } else {
      setPlayingMsgId(id);
      playTextToSpeech(
        text,
        () => setPlayingMsgId(null),
        () => setPlayingMsgId(null)
      );
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        text: "Percakapan dibersihkan. Ada pertanyaan Kitab Kuning lainnya?",
        timestamp: "Baru saja",
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-red-950 to-amber-950 text-amber-100 p-5 rounded-2xl border border-amber-500/30 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-blue-950 flex items-center justify-center font-bold shadow">
            <Sparkles className="w-5 h-5 text-blue-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-amber-200">AI Chat Ustadz Virtual</h1>
            <p className="text-xs text-amber-100/80">
              Diskusi interaktif Keilmuan Pesantren, Fiqih, Nahwu-Sharaf, dan Maraji' Turots Aswaja.
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="flex items-center gap-1.5 bg-blue-900/80 hover:bg-rose-900/60 text-xs px-3 py-1.5 rounded-xl border border-amber-400/30 text-amber-200 transition-all cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5 text-amber-300" />
          <span>Bersihkan Chat</span>
        </button>
      </div>

      {/* Main Chat Container */}
      <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 rounded-2xl border border-amber-500/30 shadow-xl overflow-hidden flex flex-col h-[580px] text-amber-100">
        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-blue-950/40">
          {messages.map((msg) => {
            const isBot = msg.role === "assistant";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold text-xs shrink-0 shadow">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm space-y-2 border ${
                    isBot
                      ? "bg-gradient-to-r from-blue-950/90 to-red-950/90 border-amber-400/30 text-amber-100 shadow-md"
                      : "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-blue-950 font-semibold border-amber-300 shadow-md"
                  }`}
                >
                  <div className={`flex items-center justify-between gap-4 border-b pb-1.5 ${isBot ? "border-amber-500/20 text-amber-200" : "border-blue-950/30 text-blue-950"}`}>
                    <span className="font-bold text-[11px]">
                      {isBot ? "USTADZ MUHAMMAD IKRAM" : "Santri"}
                    </span>
                    <span className="text-[10px] opacity-80">{msg.timestamp}</span>
                  </div>

                  <div className="leading-relaxed whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>

                  {msg.sources && (
                    <div className={`pt-2 border-t flex items-center gap-2 text-[10px] ${isBot ? "border-amber-500/20 text-amber-300" : "border-blue-950/30 text-blue-950"}`}>
                      <BookOpen className="w-3 h-3" />
                      <span>Maraji': {msg.sources.join(", ")}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-1">
                    <button
                      onClick={() => handleToggleAudioMsg(msg.id, msg.text)}
                      className={`text-[10px] flex items-center gap-1 cursor-pointer transition-colors ${
                        playingMsgId === msg.id
                          ? "text-amber-400 font-bold animate-pulse"
                          : isBot
                          ? "text-amber-300/80 hover:text-amber-200"
                          : "text-blue-950/80 hover:text-blue-950 font-bold"
                      }`}
                      title="Dengarkan Suara Ustadz"
                    >
                      {playingMsgId === msg.id ? <Volume2 className="w-3.5 h-3.5 animate-bounce" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{playingMsgId === msg.id ? "Memutar Suara..." : "Dengarkan"}</span>
                    </button>

                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.text)}
                      className={`text-[10px] flex items-center gap-1 cursor-pointer ${isBot ? "text-amber-300/80 hover:text-amber-200" : "text-blue-950/80 hover:text-blue-950 font-bold"}`}
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? "Tersalin" : "Salin"}</span>
                    </button>
                  </div>
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-xl bg-red-600 text-amber-100 flex items-center justify-center font-bold text-xs shrink-0 shadow border border-amber-400/30">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold text-xs shrink-0 shadow">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="bg-blue-950/90 border border-amber-400/40 rounded-2xl p-4 text-xs text-amber-200 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                <span>Ustadz AI sedang menelaah kitab maraji'...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Sample Prompts */}
        <div className="px-4 py-2 bg-blue-950/80 border-t border-amber-500/30 overflow-x-auto flex items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-amber-300/80 uppercase shrink-0">Contoh Pertanyaan:</span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 bg-red-900/40 hover:bg-amber-400 hover:text-blue-950 text-amber-100 border border-amber-400/30 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-blue-950/90 border-t border-amber-500/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tanyakan masalah Fiqih, Nahwu, Sharaf, atau Kitab Kuning..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-blue-950/80 border border-amber-400/40 rounded-xl text-amber-100 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-blue-950 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow"
            >
              <Send className="w-4 h-4 text-blue-950" />
              <span className="hidden sm:inline">Kirim</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
