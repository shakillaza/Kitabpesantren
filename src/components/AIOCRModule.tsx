import React, { useState } from "react";
import {
  ScanText,
  Upload,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  FileText,
  BookOpen,
  Volume2,
  VolumeX,
} from "lucide-react";
import { OCRResult } from "../types";
import { safePostApi } from "../lib/apiClient";
import { generateOCRFallback } from "../lib/aiFallback";
import { playTextToSpeech, stopTextToSpeech } from "../lib/audioService";

export const AIOCRModule: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OCRResult | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  const sampleGundulTexts = [
    {
      title: "Safinatun Najah (Pasal Rukun Islam)",
      text: "اركان الاسلام خمسة شهادة ان لا اله الا الله وان محمدا رسول الله واقام الصلاة وايتاء الزكاة وصوم رمضان وحج البيت من استطاع اليه سبيلا",
    },
    {
      title: "Alfiyah Ibnu Malik (Bab Kalam)",
      text: "كلامنا لفظ مفيد كاستقم واسم وفعل ثم حرف الكلم وواحده كلمة والقول عم وكلمة بها كلام قد يقصد",
    },
    {
      title: "Ta'lim Muta'allim (Bab Niat Belajar)",
      text: "وينبغي ان ينوي بالتعلم رضا الله تعالى والدار الاخرة ورفع الجهل عن نفسه وعن سائر الجهال واحياد الدين وابقاء الاسلام",
    },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcessOCR = async (textToProcess?: string) => {
    const raw = textToProcess || inputText;
    if (!raw && !selectedImageBase64) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await safePostApi<OCRResult>(
        "/api/gemini/ocr",
        {
          rawText: raw,
          imageBase64: selectedImageBase64,
        },
        () => generateOCRFallback(raw)
      );

      setResult(data);
    } catch (err: any) {
      setResult(generateOCRFallback(raw));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-red-950 to-amber-950 text-amber-100 p-5 rounded-2xl border border-amber-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-blue-950 flex items-center justify-center font-bold shadow">
            <ScanText className="w-5 h-5 text-blue-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-amber-200">AI OCR & Restorasi Kitab Gundul</h1>
            <p className="text-xs text-amber-100/80">
              Pindai foto manuskrip/teks gundul untuk merestorasi harakat, terjemahan, dan i'rab secara otomatis.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Window */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
          <h2 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Upload className="w-4 h-4 text-amber-400" />
            Upload Foto / Paste Teks Gundul
          </h2>

          {/* Image Upload Box */}
          <div className="border-2 border-dashed border-amber-400/40 rounded-2xl p-4 text-center hover:border-amber-300 transition-all bg-blue-950/80">
            {selectedImageBase64 ? (
              <div className="space-y-2">
                <img
                  src={selectedImageBase64}
                  alt="Manuscript Preview"
                  className="max-h-40 mx-auto rounded-xl shadow-md border border-amber-400/40"
                />
                <button
                  onClick={() => setSelectedImageBase64(null)}
                  className="text-xs text-red-400 font-bold hover:underline"
                >
                  Hapus Foto
                </button>
              </div>
            ) : (
              <label className="cursor-pointer space-y-2 block">
                <ImageIcon className="w-8 h-8 text-amber-400/70 mx-auto" />
                <span className="text-xs font-semibold text-amber-200 block">
                  Unggah Foto Kitab / Manuskrip Gundul
                </span>
                <span className="text-[10px] text-amber-300/70 block">Format PNG, JPG, WEBP (Max 5MB)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="relative text-center text-[11px] text-amber-300/80 font-bold uppercase">
            <span className="bg-blue-950 px-2 relative z-10">Atau Gunakan Teks Gundul</span>
            <div className="border-t border-amber-500/30 absolute top-2 inset-x-0"></div>
          </div>

          {/* Textarea Input */}
          <div>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ketik atau tempelkan teks Arab gundul di sini..."
              className="w-full text-sm font-serif p-3 bg-blue-950/80 border border-amber-400/40 rounded-xl text-amber-100 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400 dir-rtl"
            />
          </div>

          {/* Preset Samples */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-amber-300/80 uppercase">Uji Coba Sampel Teks Gundul:</span>
            <div className="space-y-1">
              {sampleGundulTexts.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(sample.text);
                    setSelectedImageBase64(null);
                    handleProcessOCR(sample.text);
                  }}
                  className="w-full text-left p-2 rounded-xl bg-red-900/40 hover:bg-rose-900/60 text-amber-100 text-xs font-semibold border border-amber-400/30 transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="line-clamp-1">{sample.title}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleProcessOCR()}
            disabled={loading || (!inputText && !selectedImageBase64)}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-blue-950 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-blue-950" />
                <span>Menganalisis Manuskrip AI...</span>
              </>
            ) : (
              <>
                <ScanText className="w-4 h-4 text-blue-950" />
                <span>Proses Restorasi Syakal & OCR</span>
              </>
            )}
          </button>
        </div>

        {/* Output Window */}
        <div className="lg:col-span-7 bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
          <h2 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-amber-500/30 pb-3">
            <FileText className="w-4 h-4 text-amber-400" />
            Hasil Restorasi & Syakal AI
          </h2>

          {!result && !loading && (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-amber-200/60 space-y-2 border-2 border-dashed border-amber-500/30 rounded-2xl bg-blue-950/40">
              <ScanText className="w-10 h-10 text-amber-400/50" />
              <p className="text-xs font-medium">
                Pilih sampel di sebelah kiri atau unggah foto manuskrip untuk memulai proses OCR.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-amber-200 space-y-3 bg-blue-950/40 rounded-2xl">
              <RefreshCw className="w-8 h-8 animate-spin text-amber-400" />
              <p className="text-xs font-bold">
                Mengidentifikasi aksara Arab, menyelaraskan harakat, dan menyusun I'rab...
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {/* Kitab & Hukum Info */}
              <div className="bg-blue-950 text-amber-100 p-4 rounded-xl border border-amber-400/40 flex flex-wrap items-center justify-between gap-2 shadow">
                <div>
                  <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Estimasi Kitab</span>
                  <p className="font-bold text-sm text-amber-200">{result.estNamaKitab || "Kitab Fiqih Turots"}</p>
                </div>
                <button
                  onClick={() => handleCopy(result.teksHarakat)}
                  className="bg-red-800/80 hover:bg-red-700 text-xs text-amber-200 px-3 py-1.5 rounded-lg border border-amber-400/30 flex items-center gap-1 cursor-pointer"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText ? "Tersalin" : "Salin Syakal"}</span>
                </button>
              </div>

              {/* Teks Gundul vs Restorasi Harakat */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-950/80 p-4 rounded-xl border border-amber-500/30 space-y-2">
                  <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-wider block">
                    Teks Asli (Gundul)
                  </span>
                  <p className="font-serif text-lg text-amber-100 dir-rtl text-right leading-relaxed">
                    {result.teksGundul}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-500/20 via-red-500/20 to-blue-500/20 p-4 rounded-xl border border-amber-400/50 space-y-2">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                    Restorasi Syakal / Harakat AI
                  </span>
                  <p className="font-serif text-lg text-amber-200 font-bold dir-rtl text-right leading-relaxed">
                    {result.teksHarakat}
                  </p>
                </div>
              </div>

              {/* Terjemahan */}
              <div className="bg-blue-950/80 p-4 rounded-xl border border-amber-500/30 space-y-1.5">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  Terjemahan Bahasa Indonesia
                </span>
                <p className="text-xs sm:text-sm text-amber-100 leading-relaxed italic">
                  "{result.terjemahan}"
                </p>
              </div>

              {/* Makna Gandul Pegon */}
              {result.maknaGandul && (
                <div className="bg-blue-950 text-amber-300 p-4 rounded-xl border border-amber-400/40 text-right font-serif text-base">
                  <span className="block text-left text-[10px] font-sans font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Makna Gandul Pesantren
                  </span>
                  {result.maknaGandul}
                </div>
              )}

              {/* Kandungan Hukum */}
              {result.kandunganHukum && (
                <div className="bg-blue-950/80 p-3.5 rounded-xl border border-amber-500/30 text-xs text-amber-100 space-y-1">
                  <span className="font-bold text-amber-300 block">Kandungan Hukum / Hikmah:</span>
                  <p className="leading-relaxed">{result.kandunganHukum}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
