import React, { useState } from "react";
import {
  Compass,
  Search,
  Sparkles,
  RefreshCw,
  BookOpen,
  Award,
  Layers,
  Check,
  Copy,
  Volume2,
  VolumeX,
} from "lucide-react";
import { TafsirHaditsResult } from "../types";
import { safePostApi } from "../lib/apiClient";
import { generateTafsirFallback } from "../lib/aiFallback";
import { playTextToSpeech, stopTextToSpeech } from "../lib/audioService";

export const AITafsirHaditsModule: React.FC = () => {
  const [query, setQuery] = useState("Keutamaan menuntut ilmu dan adab guru murid");
  const [mode, setMode] = useState<"tafsir" | "hadits">("tafsir");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TafsirHaditsResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const sampleQueries = [
    { title: "Tafsir Keutamaan Ilmu (Surah Al-Mujadilah: 11)", mode: "tafsir" as const },
    { title: "Hadits Niat dan Keikhlasan (Bukhari-Muslim)", mode: "hadits" as const },
    { title: "Hukum Air Dua Qullah (Hadits Sunan Arba'ah)", mode: "hadits" as const },
    { title: "Tafsir Ayat Kursi (Ibnu Katsir & Jalalain)", mode: "tafsir" as const },
  ];

  const handleSearch = async (customQuery?: string, customMode?: "tafsir" | "hadits") => {
    const q = customQuery || query;
    const m = customMode || mode;
    if (!q.trim() || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await safePostApi<TafsirHaditsResult>(
        "/api/gemini/tafsir-hadits",
        { query: q, mode: m },
        () => generateTafsirFallback(q, m)
      );

      setResult(data);
    } catch (err: any) {
      setResult(generateTafsirFallback(q, m));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Topik: ${result.topik}\nSumber: ${result.sumber}\n${result.teksArab}\nTerjemahan: ${result.terjemahan}\nTafsir: ${result.tafsirPanjang}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleAudio = () => {
    if (!result) return;
    if (isPlayingAudio) {
      stopTextToSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const textToRead = `${result.teksArab}. Terjemahan: ${result.terjemahan}. ${result.tafsirPanjang}`;
      playTextToSpeech(
        textToRead,
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-red-950 to-amber-950 text-amber-100 p-5 rounded-2xl border border-amber-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-blue-950 flex items-center justify-center font-bold shadow">
            <Compass className="w-5 h-5 text-blue-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-amber-200">AI Tafsir & Ulumul Hadits Explorer</h1>
            <p className="text-xs text-amber-100/80">
              Eksplorasi penafsiran ayat Al-Qur'an lintas mufassir, pelacakan sanad/matan hadits, dan Asbabun Nuzul.
            </p>
          </div>
        </div>
      </div>

      {/* Search Input Window */}
      <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
        {/* Mode Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("tafsir")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === "tafsir"
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 shadow-md font-extrabold"
                : "bg-blue-950/80 text-amber-200 border border-amber-400/30 hover:bg-red-900/50"
            }`}
          >
            Mode Tafsir Al-Qur'an
          </button>
          <button
            onClick={() => setMode("hadits")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === "hadits"
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 shadow-md font-extrabold"
                : "bg-blue-950/80 text-amber-200 border border-amber-400/30 hover:bg-red-900/50"
            }`}
          >
            Mode Ulumul Hadits & Fiqih
          </button>
        </div>

        {/* Input Field */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-amber-400/70" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                mode === "tafsir"
                  ? "Cari Topik Ayat, Surah, atau Kata Kunci Tafsir..."
                  : "Cari Matan Hadits, Perawi, atau Topik Hukum..."
              }
              className="w-full pl-9 pr-4 py-3 text-xs sm:text-sm bg-blue-950/80 border border-amber-400/40 rounded-xl text-amber-100 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <button
            onClick={() => handleSearch()}
            disabled={loading || !query.trim()}
            className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-blue-950 px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-blue-950" />
                <span>Mencari Maraji'...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-blue-950" />
                <span>Riset {mode === "tafsir" ? "Tafsir" : "Hadits"}</span>
              </>
            )}
          </button>
        </div>

        {/* Preset Sample Queries */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-amber-300/80 uppercase">Preset Riset:</span>
          {sampleQueries.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(s.title);
                setMode(s.mode);
                handleSearch(s.title, s.mode);
              }}
              className="px-3 py-1.5 bg-red-900/40 hover:bg-rose-900/60 text-amber-100 border border-amber-400/30 rounded-xl font-medium transition-all cursor-pointer"
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-6 text-amber-100">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-amber-500/30">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-red-900/60 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                  {result.sumber}
                </span>
                {result.derajatHadits && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 bg-blue-900/80 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    Derajat: {result.derajatHadits}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-amber-200 mt-1">{result.topik}</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAudio}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isPlayingAudio
                    ? "bg-amber-400 text-blue-950 border-amber-300 font-bold animate-pulse"
                    : "bg-blue-900/80 hover:bg-rose-900/60 text-amber-200 border-amber-400/30"
                }`}
                title="Dengarkan Murottal / Audio Pembacaan"
              >
                {isPlayingAudio ? <Volume2 className="w-4 h-4 animate-bounce" /> : <Volume2 className="w-4 h-4" />}
                <span>{isPlayingAudio ? "Memutar Suara..." : "Dengarkan Audio"}</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 bg-blue-900/80 hover:bg-rose-900/60 text-amber-200 px-3 py-1.5 rounded-xl text-xs font-semibold border border-amber-400/30 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Tersalin!" : "Salin Riset"}</span>
              </button>
            </div>
          </div>

          {/* Teks Arab Matan */}
          <div className="bg-blue-950/80 p-6 rounded-2xl border border-amber-400/40 space-y-3">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
              Teks Matan (Arab & Syakal)
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-amber-100 font-medium leading-[2.4] text-right dir-rtl">
              {result.teksArab}
            </p>
            {result.teksLatin && (
              <div className="pt-3 mt-3 border-t border-amber-500/30">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Transliterasi Latin (Cara Baca):
                </span>
                <p className="text-xs sm:text-sm text-amber-200/90 font-medium italic">
                  {result.teksLatin}
                </p>
              </div>
            )}
          </div>

          {/* Terjemahan */}
          <div className="bg-blue-950/80 p-4 rounded-xl border border-amber-500/30 space-y-1.5">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Terjemahan Kontekstual Pesantren
            </span>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed italic">
              "{result.terjemahan}"
            </p>
          </div>

          {/* Asbabun Nuzul / Wurud */}
          {result.asbabunNuzul && (
            <div className="bg-blue-950/80 p-4 rounded-xl border border-amber-500/30 space-y-1">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                Asbabun Nuzul / Latar Belakang Historis:
              </span>
              <p className="text-xs text-amber-100/90 leading-relaxed">{result.asbabunNuzul}</p>
            </div>
          )}

          {/* Penjelasan Tafsir / Syarah */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              Penjelasan Mufassir / Syarah Hadits ({result.mufassirOrPerawi})
            </h3>
            <div className="bg-blue-950 text-amber-100 p-5 rounded-2xl text-xs sm:text-sm leading-relaxed border border-amber-400/40 space-y-2">
              <p className="whitespace-pre-wrap">{result.tafsirPanjang}</p>
            </div>
          </div>

          {/* Fawaid Hukum / Deductions */}
          {result.fawaidHukum && result.fawaidHukum.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Fawaid & Istinbath Hukum Fiqih
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {result.fawaidHukum.map((f, i) => (
                  <div key={i} className="bg-red-900/40 p-3 rounded-xl border border-amber-400/30 text-xs text-amber-100 font-medium flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-blue-950 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
