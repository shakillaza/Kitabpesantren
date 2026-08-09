import React, { useState } from "react";
import {
  Users,
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  Plus,
  BookOpen,
  Send,
  X,
} from "lucide-react";
import { ForumPost } from "../types";

export const ForumModule: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: "f-1",
      title: "Hukum Shalat di Atas Kendaraan / Pesawat Tanpa Mengetahui Arah Kiblat",
      author: "Santri Abdullah",
      role: "Santri",
      category: "Fiqh",
      question: "Bagaimana hukum melaksanakan shalat fardhu di atas pesawat jika sulit menghadap kiblat secara sempurna? Apakah wajib diulangi (I'adah)?",
      votes: 18,
      answersCount: 3,
      timestamp: "2 jam yang lalu",
      verifiedAnswer: {
        author: "Ustadz Hidayatullah, M.Ag",
        answer: "Berdasarkan rincian dalam Fathul Qarib dan Tuhfatul Muhtaj: Shalat di atas kendaraan tanpa bisa menghadap kiblat dinamakan Shalat Lihurmatil Waqti (menghormati waktu). Shalat tersebut sah dilakukan pada waktunya, namun wajib diulangi (I'adah) setelah tiba di daratan jika merupakan shalat fardhu.",
        kitabRef: "Fathul Qarib Al-Mujib hal. 14 / Tuhfatul Muhtaj Bab Shalat",
      },
    },
    {
      id: "f-2",
      title: "Kaidah I'rab Laa Naafiyah lil Jinsi pada Alfiyah Bait 142",
      author: "Kang Rifqy Salaf",
      role: "Santri",
      category: "Nahwu",
      question: "Mohon syarah mengenai syarat agar Isim Laa Naafiyah lil Jinsi dibaca Mabni 'alal Fathi dalam Nazham Alfiyah Ibnu Malik.",
      votes: 12,
      answersCount: 1,
      timestamp: "5 jam yang lalu",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newCategory, setNewCategory] = useState<"Fiqh" | "Nahwu" | "Bahsul Masail" | "Umum">("Fiqh");

  const categories = ["All", "Fiqh", "Nahwu", "Bahsul Masail", "Umum"];

  const filteredPosts = posts.filter((p) => selectedCategory === "All" || p.category === selectedCategory);

  const handleUpvote = (id: string) => {
    setPosts(
      posts.map((p) => (p.id === id ? { ...p, votes: p.votes + 1 } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQuestion.trim()) return;

    const newPost: ForumPost = {
      id: `f-${Date.now()}`,
      title: newTitle,
      author: "Santri Anda",
      role: "Santri",
      category: newCategory,
      question: newQuestion,
      votes: 1,
      answersCount: 0,
      timestamp: "Baru saja",
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewQuestion("");
    setShowNewPostModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-red-950 to-amber-950 text-amber-100 p-5 rounded-2xl border border-amber-500/30 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-blue-950 flex items-center justify-center font-bold shadow">
            <Users className="w-5 h-5 text-blue-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-amber-200">Forum Bahsul Masail & Diskusi Santri</h1>
            <p className="text-xs text-amber-100/80">
              Musyawarah fiqih kontemporer dan tanya jawab keilmuan turots bersama para Ustadz.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-extrabold px-4 py-2 rounded-xl text-xs shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-blue-950" />
          <span>Buat Musyawarah</span>
        </button>
      </div>

      {/* Filter Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 shadow-md font-bold"
                : "bg-blue-950/80 text-amber-200 border border-amber-400/30 hover:bg-red-900/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Forum Thread List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-red-900/60 border border-amber-400/30 px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-amber-300/70">• {post.timestamp}</span>
                  <span className="text-xs text-amber-200 font-semibold">• oleh {post.author} ({post.role})</span>
                </div>
                <h2 className="text-base font-bold text-amber-200">{post.title}</h2>
              </div>

              <button
                onClick={() => handleUpvote(post.id)}
                className="flex items-center gap-1.5 bg-blue-900/80 hover:bg-rose-900/60 text-amber-200 px-3 py-1.5 rounded-xl border border-amber-400/30 text-xs font-bold transition-all cursor-pointer shrink-0"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                <span>{post.votes}</span>
              </button>
            </div>

            <p className="text-xs text-amber-100 leading-relaxed bg-blue-950/80 p-3.5 rounded-xl border border-amber-500/30">
              "{post.question}"
            </p>

            {/* Verified Answer Component */}
            {post.verifiedAnswer && (
              <div className="bg-blue-950 text-amber-100 p-4 rounded-xl border border-amber-400/40 space-y-2 text-xs shadow-md">
                <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    Jawaban Verifikasi: {post.verifiedAnswer.author}
                  </span>
                  <span className="text-[10px] bg-amber-400 text-blue-950 px-2 py-0.5 rounded font-extrabold">
                    Turots Verified
                  </span>
                </div>

                <p className="leading-relaxed text-amber-100">{post.verifiedAnswer.answer}</p>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-amber-300 font-serif">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ibarat Maraji': {post.verifiedAnswer.kitabRef}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Thread Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 bg-blue-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-blue-950 via-red-950 to-amber-950 rounded-2xl max-w-lg w-full p-6 space-y-4 border border-amber-500/40 shadow-2xl text-amber-100">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <h3 className="font-bold text-amber-200 text-sm">Buat Topik Musyawarah Baru</h3>
              <button onClick={() => setShowNewPostModal(false)} className="text-amber-400 hover:text-amber-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-amber-300 block mb-1">Kategori Musyawarah</label>
                <select
                  value={newCategory}
                  onChange={(e: any) => setNewCategory(e.target.value)}
                  className="w-full p-2.5 bg-blue-950/80 border border-amber-400/40 rounded-xl text-amber-100"
                >
                  <option value="Fiqh" className="bg-blue-950 text-amber-100">Fiqh & Hukum Islam</option>
                  <option value="Nahwu" className="bg-blue-950 text-amber-100">Nahwu & Sharaf</option>
                  <option value="Bahsul Masail" className="bg-blue-950 text-amber-100">Bahsul Masail Kontemporer</option>
                  <option value="Umum" className="bg-blue-950 text-amber-100">Umum / Santri Q&A</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-amber-300 block mb-1">Judul Topik</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Hukum Jual Beli Saham menurut Fiqih Muamalah..."
                  className="w-full p-2.5 bg-blue-950/80 border border-amber-400/40 rounded-xl text-amber-100 placeholder-amber-200/50"
                />
              </div>

              <div>
                <label className="font-bold text-amber-300 block mb-1">Detail Pertanyaan / Musyawarah</label>
                <textarea
                  rows={4}
                  required
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Tuliskan latar belakang masalah dan pertanyaan lengkap..."
                  className="w-full p-2.5 bg-blue-950/80 border border-amber-400/40 rounded-xl text-amber-100 placeholder-amber-200/50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 bg-red-900/60 text-amber-200 rounded-xl font-bold border border-amber-400/30"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-extrabold rounded-xl flex items-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5 text-blue-950" />
                  <span>Kirim Topik</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
