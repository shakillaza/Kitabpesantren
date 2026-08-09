import React, { useState } from "react";
import {
  Mic,
  MicOff,
  Sparkles,
  RefreshCw,
  Award,
  AlertCircle,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { HafalanResult } from "../types";

export const AIHafalanQuizModule: React.FC = () => {
  const [selectedKitab, setSelectedKitab] = useState("Alfiyah Ibnu Malik");
  const [targetNazham, setTargetNazham] = useState("كَلَامُنَا لَفْظٌ مُفِيدٌ كَاسْتَقِمْ ۞ وَاسْمٌ وَفِعْلٌ ثُمَّ حَرْفٌ الْكَلِمْ");
  const [inputSantri, setInputSantri] = useState("كلامنا لفظ مفيد كاستقم واسم وفعل ثم حرف الكلم");
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HafalanResult | null>(null);

  const sampleBait = [
    {
      kitab: "Alfiyah Ibnu Malik",
      target: "كَلَامُنَا لَفْظٌ مُفِيدٌ كَاسْتَقِمْ ۞ وَاسْمٌ وَفِعْلٌ ثُمَّ حَرْفٌ الْكَلِمْ",
      santri: "كلامنا لفظ مفيد كاستقم واسم وفعل ثم حرف الكلم",
    },
    {
      kitab: "Matan Imrithi",
      target: "إِنَّ الْكَلَامَ عِنْدَنَا مُعَرَّفُ ۞ لَفْظٌ مُرَكَّبٌ مُفِيدٌ مُؤَلَّفُ",
      santri: "ان الكلام عندنا معرف لفظ مركب مفيد مؤلف",
    },
    {
      kitab: "Aqidatul Awam",
      target: "أَبْدَأُ بِاسْمِ اللهِ وَالرَّحْمٰنِ ۞ وَبِالرَّحِيمِ الدَّائِمِ الإِحْسَانِ",
      santri: "ابدا باسم الله والرحمان وبالرحيم الدائم الاحسان",
    },
  ];

  const handleTestHafalan = async () => {
    if (!inputSantri.trim() || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/gemini/hafalan-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kitab: selectedKitab,
          targetNazham,
          inputSantri,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gagal menguji hafalan");

      setResult(data);
    } catch (err: any) {
      alert(`Gagal menguji hafalan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleRecording = () => {
    if (!recording) {
      setRecording(true);
      setTimeout(() => {
        setRecording(false);
        setInputSantri(targetNazham.replace(/۞/g, ""));
      }, 3000);
    } else {
      setRecording(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-red-950 to-amber-950 text-amber-100 p-5 rounded-2xl border border-amber-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-blue-950 flex items-center justify-center font-bold shadow">
            <Mic className="w-5 h-5 text-blue-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-amber-200">AI Hafalan & Quiz Nazham Evaluator</h1>
            <p className="text-xs text-amber-100/80">
              Evaluator hafalan Nazham Alfiyah, Imrithi, dan Aqidatul Awam dengan skor akurasi dan koreksi tajwid/muroja'ah.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
          <h2 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            Setoran Hafalan Santri
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-200">Pilih Kitab / Nazham</label>
            <select
              value={selectedKitab}
              onChange={(e) => setSelectedKitab(e.target.value)}
              className="w-full text-xs p-2.5 bg-blue-950/80 border border-amber-400/40 rounded-xl text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="Alfiyah Ibnu Malik" className="bg-blue-950 text-amber-100">Alfiyah Ibnu Malik (1000 Bait)</option>
              <option value="Matan Imrithi" className="bg-blue-950 text-amber-100">Matan Al-Imrithi</option>
              <option value="Aqidatul Awam" className="bg-blue-950 text-amber-100">Aqidatul Awam (Tauhid)</option>
              <option value="Arbain Nawawi" className="bg-blue-950 text-amber-100">Hadits Arbain Nawawi</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-amber-200">Bait Target Rujukan</label>
            <textarea
              rows={2}
              value={targetNazham}
              onChange={(e) => setTargetNazham(e.target.value)}
              className="w-full text-sm font-serif p-2.5 bg-blue-950/80 border border-amber-400/40 rounded-xl text-amber-200 focus:outline-none dir-rtl text-right"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-200">Input Setoran Santri</label>
              <button
                onClick={toggleRecording}
                className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                  recording
                    ? "bg-red-600 text-amber-100 border-red-500 animate-pulse"
                    : "bg-blue-900/80 text-amber-200 border-amber-400/30"
                }`}
              >
                {recording ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3 text-amber-400" />}
                <span>{recording ? "Merekam Suara..." : "Setor Suara"}</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={inputSantri}
              onChange={(e) => setInputSantri(e.target.value)}
              placeholder="Tuliskan atau setor hafalan dalam aksara Arab..."
              className="w-full text-sm font-serif p-2.5 bg-blue-950/80 border border-amber-400/40 rounded-xl text-amber-100 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400 dir-rtl text-right"
            />
          </div>

          {/* Presets */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-amber-300/80 uppercase">Preset Uji Hafalan:</span>
            <div className="space-y-1">
              {sampleBait.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedKitab(item.kitab);
                    setTargetNazham(item.target);
                    setInputSantri(item.santri);
                  }}
                  className="w-full text-left p-2 rounded-xl bg-red-900/40 hover:bg-rose-900/60 text-amber-100 text-xs font-semibold border border-amber-400/30 transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>{item.kitab}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleTestHafalan}
            disabled={loading || !inputSantri.trim()}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-blue-950 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-blue-950" />
                <span>Mengevaluasi Hafalan...</span>
              </>
            ) : (
              <>
                <Award className="w-4 h-4 text-blue-950" />
                <span>Uji & Evaluasi Hafalan</span>
              </>
            )}
          </button>
        </div>

        {/* Result Window */}
        <div className="lg:col-span-7 bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
          <h2 className="text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-amber-500/30 pb-3">
            Hasil Penilaian & Koreksi Ustadz AI
          </h2>

          {!result && !loading && (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-amber-200/60 space-y-2 border-2 border-dashed border-amber-500/30 rounded-2xl bg-blue-950/40">
              <Award className="w-10 h-10 text-amber-400/50" />
              <p className="text-xs font-medium">
                Klik "Uji & Evaluasi Hafalan" untuk melihat skor akurasi dan koreksi.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-amber-200 space-y-3 bg-blue-950/40 rounded-2xl">
              <RefreshCw className="w-8 h-8 animate-spin text-amber-400" />
              <p className="text-xs font-bold">Mencocokkan bait matan, memeriksa huruf, dan menyusun skor...</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {/* Score Display */}
              <div className="bg-gradient-to-r from-blue-950 via-red-950 to-amber-950 text-amber-100 p-6 rounded-2xl border border-amber-400/40 flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Status Hafalan
                  </span>
                  <h3 className="text-xl font-extrabold text-amber-200">{result.statusHafalan}</h3>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-extrabold text-amber-400">{result.skorAkurasi}</span>
                  <span className="text-xs text-amber-200/80 block font-semibold">/ 100 Skor</span>
                </div>
              </div>

              {/* Koreksi Teks Arab */}
              <div className="bg-blue-950/80 p-4 rounded-xl border border-amber-400/40 space-y-2">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                  Koreksi Teks Matan yang Benar:
                </span>
                <p className="font-serif text-xl text-amber-100 font-bold dir-rtl text-right leading-relaxed">
                  {result.teksKoreksi}
                </p>
              </div>

              {/* Catatan Kesalahan */}
              {result.detailKesalahan && result.detailKesalahan.length > 0 && (
                <div className="bg-blue-950/80 p-4 rounded-xl border border-amber-500/30 space-y-2">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    Catatan Evaluasi / Muroja'ah:
                  </span>
                  <ul className="space-y-1 text-xs text-amber-100">
                    {result.detailKesalahan.map((err, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{err}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pesan Motivasi Ustadz */}
              <div className="bg-blue-950/80 p-4 rounded-xl border border-amber-500/30 space-y-1 text-xs text-amber-100">
                <span className="font-bold uppercase text-[10px] text-amber-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  Nasihat & Tips dari Ustadz AI:
                </span>
                <p className="leading-relaxed">{result.catatanUstadz}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
