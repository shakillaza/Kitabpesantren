import React, { useState } from "react";
import {
  FileText,
  Copy,
  Check,
  Download,
  Layers,
  Database,
  Shield,
  Workflow,
  Search,
  BookOpenCheck,
} from "lucide-react";
import { ARCHITECTURE_DOCS } from "../data/architectureDocsData";

export const ArchitectureDocsModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeSectionId, setActiveSectionId] = useState<string>("exec-summary");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Overview",
    "Requirements",
    "Diagrams & Modeling",
    "System Architecture",
    "Security & Ops",
    "Roadmap",
    "UI/UX Design System",
    "Database & Backend Architecture",
    "Backend & AI Integration",
    "Frontend & Responsive UI",
  ];

  const filteredSections = ARCHITECTURE_DOCS.filter((sec) => {
    const matchCat = selectedCategory === "All" || sec.category === selectedCategory;
    const matchSearch =
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.contentMarkdown.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const currentSection = ARCHITECTURE_DOCS.find((s) => s.id === activeSectionId) || ARCHITECTURE_DOCS[0];

  const handleCopyAllDocs = () => {
    const fullText = ARCHITECTURE_DOCS.map((s) => `# ${s.title}\n\n${s.contentMarkdown}`).join("\n\n---\n\n");
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadDocs = () => {
    const fullText = ARCHITECTURE_DOCS.map((s) => `# ${s.title}\n\n${s.contentMarkdown}`).join("\n\n---\n\n");
    const blob = new Blob([fullText], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SHAQILA_DIGITAL_99_PHASE_1_SYSTEM_ARCHITECTURE.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-red-950 to-amber-950 text-amber-100 rounded-2xl p-6 shadow-xl border border-amber-400/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs tracking-wider uppercase mb-1">
              <BookOpenCheck className="w-4 h-4 text-amber-400" />
              <span>Phase 1 — Project Analysis & System Architecture Specification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-200">
              SHAQILA DIGITAL 99 Enterprise Architecture
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-3xl leading-relaxed">
              Dokumen desain arsitektur sistem tingkat enterprise untuk platform Smart AI Kitab Pesantren Indonesia, mencakup Visi Misi, ERD, Sequence Diagram, Arsitektur Keamanan, dan Roadmap.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyAllDocs}
              className="flex items-center gap-2 bg-blue-900/80 hover:bg-blue-800 text-amber-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-amber-400/40 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-amber-300" /> : <Copy className="w-4 h-4 text-amber-300" />}
              <span>{copied ? "Tersalin!" : "Salin Blueprint"}</span>
            </button>

            <button
              onClick={handleDownloadDocs}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Spec (MD)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar List */}
        <div className="lg:col-span-4 bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 rounded-2xl p-4 border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-amber-300/70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari modul spesifikasi..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-blue-950/70 border border-amber-400/40 rounded-xl text-amber-100 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 font-bold"
                    : "bg-blue-900/60 text-amber-200 hover:bg-rose-900/60 border border-amber-500/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Section Items */}
          <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
            {filteredSections.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all border ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/30 via-red-500/20 to-blue-500/30 border-amber-400 text-amber-200 font-bold shadow-md"
                      : "bg-blue-950/50 border-amber-500/20 text-amber-100/90 hover:bg-rose-900/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="line-clamp-1">{sec.title}</span>
                    <span className="text-[10px] text-amber-300 font-normal px-1.5 py-0.5 bg-blue-950 rounded border border-amber-400/30 shrink-0 ml-1">
                      {sec.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Detail Viewer */}
        <div className="lg:col-span-8 bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 rounded-2xl p-6 border border-amber-500/30 shadow-xl space-y-6 text-amber-100">
          <div className="border-b border-amber-500/30 pb-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-red-600/50 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                {currentSection.category}
              </span>
              <h2 className="text-xl font-bold text-amber-200 mt-2">{currentSection.title}</h2>
            </div>
            <span className="text-xs text-amber-300/70 font-mono">Doc ID: {currentSection.id}</span>
          </div>

          {/* Render Markdown Content */}
          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-amber-100 space-y-4">
            {currentSection.contentMarkdown.split("\n\n").map((block, i) => {
              if (block.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-base font-bold text-amber-300 border-l-4 border-amber-400 pl-3 py-0.5 mt-4">
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              if (block.startsWith("```")) {
                return (
                  <pre
                    key={i}
                    className="bg-blue-950/90 text-amber-300 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-amber-400/40 leading-relaxed shadow-inner"
                  >
                    <code>{block.replace(/```/g, "").trim()}</code>
                  </pre>
                );
              }
              if (block.startsWith("|")) {
                const rows = block.split("\n").filter((r) => !r.includes("---"));
                return (
                  <div key={i} className="overflow-x-auto my-3 border border-amber-500/30 rounded-xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <tbody>
                        {rows.map((row, rIdx) => {
                          const cols = row.split("|").filter((c) => c.trim() !== "");
                          if (rIdx === 0) {
                            return (
                              <tr key={rIdx} className="bg-blue-900/80 font-bold border-b border-amber-500/30 text-amber-200">
                                {cols.map((col, cIdx) => (
                                  <th key={cIdx} className="p-2.5 border-r border-amber-500/30">
                                    {col.trim()}
                                  </th>
                                ))}
                              </tr>
                            );
                          }
                          return (
                            <tr key={rIdx} className="border-b border-amber-500/20 hover:bg-rose-900/30">
                              {cols.map((col, cIdx) => (
                                <td key={cIdx} className="p-2.5 border-r border-amber-500/20 text-amber-100">
                                  {col.trim()}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              }
              return (
                <p key={i} className="leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
