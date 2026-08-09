import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Bookmark,
  Volume2,
  VolumeX,
  Languages,
  Eye,
  EyeOff,
  Sparkles,
  FileText,
  ChevronRight,
  Info,
  Check,
} from "lucide-react";
import { MOCK_KITAB_DATA } from "../data/mockKitabData";
import { KitabChapter, KitabItem } from "../types";
import { playTextToSpeech, stopTextToSpeech } from "../lib/audioService";

export const PerpustakaanModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeKitab, setActiveKitab] = useState<KitabItem>(MOCK_KITAB_DATA[0]);
  const [activeChapter, setActiveChapter] = useState<KitabChapter>(MOCK_KITAB_DATA[0].chapters[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // Reader Settings
  const [showHarakat, setShowHarakat] = useState(true);
  const [showMaknaGandul, setShowMaknaGandul] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [savedBookmarks, setSavedBookmarks] = useState<string[]>(["safinah-1"]);
  const [userNote, setUserNote] = useState("");
  const [savedNoteStatus, setSavedNoteStatus] = useState(false);
  const [selectedIrab, setSelectedIrab] = useState<{ kata: string; irab: string; arti: string } | null>(null);

  const categories = ["All", "Fiqh", "Nahwu-Sharaf", "Akhlaq", "Tafsir", "Hadits"];

  const filteredKitab = MOCK_KITAB_DATA.filter((k) => {
    const matchCat = selectedCategory === "All" || k.category === selectedCategory;
    const matchSearch =
      k.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.titleArab.includes(searchQuery) ||
      k.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleBookmark = (chapterId: string) => {
    if (savedBookmarks.includes(chapterId)) {
      setSavedBookmarks(savedBookmarks.filter((id) => id !== chapterId));
    } else {
      setSavedBookmarks([...savedBookmarks, chapterId]);
    }
  };

  const handleSaveNote = () => {
    setSavedNoteStatus(true);
    setTimeout(() => setSavedNoteStatus(false), 2000);
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopTextToSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const textToRead = `${activeChapter.contentArabWithHarakat || activeChapter.contentArabGundul}. ${activeChapter.translation}`;
      playTextToSpeech(
        textToRead,
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="bg-gradient-to-r from-blue-950 via-red-950 to-amber-950 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-amber-200 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>Perpustakaan Kitab Digital Turots Pesantren</span>
            </h1>
            <p className="text-xs text-amber-100/80 mt-0.5">
              Akses manuskrip Kitab Kuning lengkap dengan harakat, I'rab, makna gandul, dan audio pembacaan.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-amber-300/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Judul, Pengarang, Teks Arab..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-blue-950/70 border border-amber-400/40 rounded-xl text-amber-100 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 shadow-md font-bold"
                  : "bg-blue-900/60 text-amber-200 hover:bg-rose-900/60 border border-amber-500/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout: Kitab Selector + Interactive Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kitab & Chapter List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-4 rounded-2xl border border-amber-500/30 shadow-xl space-y-3 text-amber-100">
            <h2 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Pilih Kitab</h2>
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {filteredKitab.map((kitab) => {
                const isSelected = activeKitab.id === kitab.id;
                return (
                  <button
                    key={kitab.id}
                    onClick={() => {
                      setActiveKitab(kitab);
                      setActiveChapter(kitab.chapters[0]);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-amber-500/30 via-red-500/30 to-blue-500/30 border-amber-400 text-amber-200 shadow-md font-bold"
                        : "bg-blue-950/60 border-amber-500/20 text-amber-100 hover:bg-rose-900/40"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-sm leading-tight text-amber-200">{kitab.title}</h3>
                        <p className={`text-xs mt-0.5 font-serif ${isSelected ? "text-amber-300" : "text-amber-300/80"}`}>
                          {kitab.titleArab}
                        </p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${isSelected ? "bg-amber-400 text-blue-950 font-bold" : "bg-red-800/60 text-amber-200 border border-amber-400/30"}`}>
                        {kitab.category}
                      </span>
                    </div>
                    <p className={`text-[11px] mt-1.5 line-clamp-1 ${isSelected ? "text-amber-100" : "text-amber-200/70"}`}>
                      {kitab.author}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chapter Selector */}
          <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-4 rounded-2xl border border-amber-500/30 shadow-xl space-y-2 text-amber-100">
            <h2 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Daftar Fasal / Bab ({activeKitab.title})
            </h2>
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
              {activeKitab.chapters.map((chap) => {
                const isActive = activeChapter.id === chap.id;
                return (
                  <button
                    key={chap.id}
                    onClick={() => setActiveChapter(chap)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 font-bold shadow-md"
                        : "bg-blue-950/60 text-amber-100 hover:bg-rose-900/40 border border-amber-500/20"
                    }`}
                  >
                    <span className="line-clamp-1">{chap.title}</span>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-950" : "text-amber-400"}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive Reader Window */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-6 text-amber-100">
            {/* Chapter Reader Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/30 pb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-300 bg-red-600/50 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  {activeKitab.title} — {activeChapter.title}
                </span>
                <h2 className="text-2xl font-serif text-amber-200 font-bold mt-1 dir-rtl text-right">
                  {activeChapter.titleArab}
                </h2>
              </div>

              {/* Reader Action Toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHarakat(!showHarakat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    showHarakat ? "bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 border-amber-400 font-bold" : "bg-blue-950 text-amber-200 border-amber-400/30"
                  }`}
                  title="Toggle Harakat / Kitab Gundul"
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>{showHarakat ? "Syakal Full" : "Kitab Gundul"}</span>
                </button>

                <button
                  onClick={() => setShowMaknaGandul(!showMaknaGandul)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    showMaknaGandul ? "bg-red-600 text-amber-200 border-amber-400 font-bold" : "bg-blue-950 text-amber-200 border-amber-400/30"
                  }`}
                  title="Toggle Makna Gandul Pesantren"
                >
                  {showMaknaGandul ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>Makna Gandul</span>
                </button>

                <button
                  onClick={toggleAudio}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isPlayingAudio ? "bg-amber-400 text-blue-950 border-amber-300 animate-pulse font-bold" : "bg-blue-950 text-amber-200 border-amber-400/30"
                  }`}
                  title="Audio Pembacaan Kitab"
                >
                  {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => toggleBookmark(activeChapter.id)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    savedBookmarks.includes(activeChapter.id)
                      ? "bg-amber-400 text-blue-950 border-amber-300 font-bold"
                      : "bg-blue-950 text-amber-200 border-amber-400/30"
                  }`}
                  title="Simpan Bookmark"
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            {/* Audio Recitation Status Bar */}
            {isPlayingAudio && (
              <div className="bg-blue-950 border border-amber-400/40 p-3 rounded-xl flex items-center justify-between text-xs text-amber-200 font-medium">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span>Audio Pembacaan: {activeKitab.title} — {activeChapter.title}</span>
                </div>
                <span className="text-[10px] font-bold uppercase bg-amber-400 text-blue-950 px-2 py-0.5 rounded">Murottal Kitab Active</span>
              </div>
            )}

            {/* Main Matan Text Display */}
            <div className="bg-gradient-to-br from-blue-950/80 via-red-950/80 to-amber-950/80 p-6 rounded-2xl border border-amber-400/40 space-y-6">
              <div className="text-right leading-[2.6] font-serif text-2xl sm:text-3xl text-amber-200 tracking-wide font-normal dir-rtl select-text">
                {showHarakat ? activeChapter.contentArabWithHarakat : activeChapter.contentArabGundul}
              </div>

              {/* Makna Gandul Pesantren Box */}
              {showMaknaGandul && activeChapter.maknaGandul && (
                <div className="bg-blue-950 text-amber-300 p-4 rounded-xl text-right font-serif text-lg leading-relaxed border border-amber-400/40">
                  <span className="block text-left text-[10px] font-sans font-bold text-amber-400 uppercase tracking-widest mb-1">
                    Pegon / Makna Gandul Salaf
                  </span>
                  {activeChapter.maknaGandul}
                </div>
              )}

              {/* Terjemahan Bahasa Indonesia */}
              <div className="pt-4 border-t border-amber-500/30 space-y-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Terjemahan Kontekstual Pesantren
                </span>
                <p className="text-xs sm:text-sm text-amber-100 leading-relaxed italic bg-blue-950/80 p-3.5 rounded-xl border border-amber-400/30">
                  "{activeChapter.translation}"
                </p>
              </div>
            </div>

            {/* Interactive I'rab Notes Inspector */}
            {activeChapter.irabNotes && activeChapter.irabNotes.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  Kaidah I'rab Ringkas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeChapter.irabNotes.map((note, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedIrab(note)}
                      className="text-left bg-blue-950/80 hover:bg-rose-900/50 p-2.5 rounded-xl border border-amber-400/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-amber-200">{note.kata}</span>
                        <span className="text-[10px] bg-amber-400 text-blue-950 px-1.5 py-0.5 rounded font-bold">I'rab</span>
                      </div>
                      <p className="text-[11px] text-amber-100/80 mt-1 line-clamp-1">{note.irab}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Personal Notes Box */}
            <div className="pt-4 border-t border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-amber-400" />
                  Catatan Syarah Pribadi Santri
                </label>
                {savedNoteStatus && (
                  <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Tersimpan!
                  </span>
                )}
              </div>
              <textarea
                rows={2}
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="Tuliskan catatan penjelasan ustadz atau faedah hukum di sini..."
                className="w-full text-xs p-3 bg-blue-950/80 border border-amber-400/30 rounded-xl text-amber-100 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                onClick={handleSaveNote}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer shadow"
              >
                Simpan Catatan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected I'rab Modal */}
      {selectedIrab && (
        <div className="fixed inset-0 z-50 bg-blue-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-blue-950 via-red-950 to-amber-950 rounded-2xl max-w-md w-full p-6 space-y-4 border border-amber-400/50 shadow-2xl text-amber-100">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <h3 className="font-bold text-amber-200 text-sm">Analisis I'rab Kata</h3>
              <button
                onClick={() => setSelectedIrab(null)}
                className="text-amber-200 hover:text-amber-100 text-xs font-bold px-2.5 py-1 rounded bg-red-800/80 border border-amber-400/30 cursor-pointer"
              >
                Tutup
              </button>
            </div>

            <div className="text-center space-y-1">
              <span className="text-3xl font-serif font-bold text-amber-300">{selectedIrab.kata}</span>
              <p className="text-xs text-amber-200/80 font-medium">Arti: "{selectedIrab.arti}"</p>
            </div>

            <div className="bg-blue-950/90 p-3.5 rounded-xl border border-amber-400/40 text-xs text-amber-100 space-y-1">
              <span className="font-bold uppercase text-[10px] tracking-wider text-amber-300">Kedudukan & Tanda I'rab:</span>
              <p className="leading-relaxed">{selectedIrab.irab}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
