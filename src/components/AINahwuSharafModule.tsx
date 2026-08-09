import React, { useState } from "react";
import {
  Binary,
  Sparkles,
  RefreshCw,
  BookOpen,
  Info,
  Check,
  Copy,
  Table,
} from "lucide-react";
import { NahwuAnalysisResult } from "../types";
import { safePostApi } from "../lib/apiClient";
import { generateNahwuFallback } from "../lib/aiFallback";

export const AINahwuSharafModule: React.FC = () => {
  const [sentenceInput, setSentenceInput] = useState("أَرْكَانُ الْإِسْلَامِ خَمْسَةٌ");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NahwuAnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleSentences = [
    "أَرْكَانُ الْإِسْلَامِ خَمْسَةٌ",
    "كَلَامُنَا لَفْظٌ مُفِيدٌ كَاسْتَقِمْ",
    "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    "يَكْتُبُ الطَّالِبُ الدَّرْسَ فِي الْمَدْرَسَةِ",
  ];

  const handleAnalyze = async (query?: string) => {
    const text = query || sentenceInput;
    if (!text.trim() || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await safePostApi<NahwuAnalysisResult>(
        "/api/gemini/nahwu-sharaf",
        { kalimatArab: text },
        () => generateNahwuFallback(text)
      );

      setResult(data);
    } catch (err: any) {
      setResult(generateNahwuFallback(text));
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (!result) return;
    const formatted = `Analisis Nahwu Sharaf: ${result.kalimat}\nRingkasan: ${result.ringkasanKaidah}\nSyahid: ${result.syahidNazham || "-"}`;
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-red-950 to-amber-950 text-amber-100 p-5 rounded-2xl border border-amber-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-blue-950 flex items-center justify-center font-bold shadow">
            <Binary className="w-5 h-5 text-blue-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-amber-200">AI Engine Nahwu & Sharaf Parser</h1>
            <p className="text-xs text-amber-100/80">
              Analisis struktur I'rab, kedudukan Isim/Fi'il/Huruf, Wazan Tashrif, dan Syahid Nazham Alfiyah Ibnu Malik.
            </p>
          </div>
        </div>
      </div>

      {/* Sentence Input Bar */}
      <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
        <div className="space-y-2">
          <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-400" />
            Masukkan Kalimat Arab
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={sentenceInput}
              onChange={(e) => setSentenceInput(e.target.value)}
              placeholder="Contoh: أَرْكَانُ الْإِسْلَامِ خَمْسَةٌ"
              className="flex-1 px-4 py-3 text-base sm:text-lg font-serif bg-blue-950/80 border border-amber-400/40 rounded-xl text-amber-100 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400 dir-rtl text-right"
            />
            <button
              onClick={() => handleAnalyze()}
              disabled={loading || !sentenceInput.trim()}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-blue-950 px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-950" />
                  <span>Membedah Kaidah...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-blue-950" />
                  <span>Analisis Nahwu</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preset Sentences */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-amber-300/80 uppercase">Sampel Kalimat:</span>
          {sampleSentences.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSentenceInput(s);
                handleAnalyze(s);
              }}
              className="px-3 py-1.5 bg-red-900/40 hover:bg-rose-900/60 text-amber-100 font-serif border border-amber-400/30 rounded-xl font-semibold transition-all cursor-pointer dir-rtl"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Results Display */}
      {result && (
        <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-6 text-amber-100">
          <div className="flex items-center justify-between border-b pb-4 border-amber-500/30">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-red-900/60 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                Hasil Analisis Sintaksis
              </span>
              <h2 className="text-2xl font-serif text-amber-200 font-bold mt-1 dir-rtl text-right">
                {result.kalimat}
              </h2>
            </div>

            <button
              onClick={handleCopyResult}
              className="flex items-center gap-1.5 bg-blue-900/80 hover:bg-rose-900/60 text-amber-200 px-3 py-1.5 rounded-xl text-xs font-semibold border border-amber-400/30 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Tersalin!" : "Salin Hasil"}</span>
            </button>
          </div>

          {/* Ringkasan Kaidah */}
          <div className="bg-blue-950/80 p-4 rounded-xl border border-amber-400/40 text-xs sm:text-sm text-amber-100 leading-relaxed space-y-1">
            <span className="font-bold text-amber-300 uppercase text-[10px] tracking-wider block">
              Ringkasan Kaidah & Hukum I'rab:
            </span>
            <p>{result.ringkasanKaidah}</p>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Table className="w-4 h-4 text-amber-400" />
              Rincian Per Kata (Kalimah & Tashrif)
            </h3>

            <div className="overflow-x-auto border border-amber-500/30 rounded-xl bg-blue-950/40">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-950 text-amber-300 text-xs border-b border-amber-500/30">
                    <th className="p-3 font-serif font-bold text-right">Kata (الكلمة)</th>
                    <th className="p-3 font-bold">Jenis</th>
                    <th className="p-3 font-bold">Kedudukan I'rab</th>
                    <th className="p-3 font-bold">Tanda I'rab</th>
                    <th className="p-3 font-bold">Alasan Hukum</th>
                    <th className="p-3 font-bold">Wazan & Bina'</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map((row, idx) => (
                    <tr key={idx} className="border-b border-amber-500/20 hover:bg-red-900/30">
                      <td className="p-3 font-serif font-bold text-base text-amber-200 dir-rtl text-right">
                        {row.kata}
                      </td>
                      <td className="p-3 font-semibold">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            row.jenis === "Isim"
                              ? "bg-blue-900 text-blue-200 border border-blue-400/40"
                              : row.jenis === "Fi'il"
                              ? "bg-red-900 text-amber-200 border border-amber-400/40"
                              : "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                          }`}
                        >
                          {row.jenis}
                        </span>
                      </td>
                      <td className="p-3 text-amber-100 font-medium">{row.irab}</td>
                      <td className="p-3 text-amber-100 font-medium">{row.tandaIrab}</td>
                      <td className="p-3 text-amber-200/80">{row.alasan}</td>
                      <td className="p-3 text-amber-300 font-mono text-[11px]">
                        {row.wazan || "-"} {row.bina ? `(${row.bina})` : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Syahid Nazham Alfiyah */}
          {result.syahidNazham && (
            <div className="bg-blue-950 text-amber-300 p-4 rounded-xl border border-amber-400/40 space-y-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Syahid Nazham Alfiyah / Imrithi Terkait
              </span>
              <p className="font-serif text-lg leading-relaxed text-right dir-rtl">
                {result.syahidNazham}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
