import React from "react";
import {
  FileText,
  BookOpen,
  MessageSquareCode,
  ScanText,
  Binary,
  Compass,
  Mic,
  Users,
  ShoppingBag,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { ActiveTab } from "../types";

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuGroups = [
    {
      group: "LITERASI KITAB",
      items: [
        {
          id: "library" as ActiveTab,
          label: "Perpustakaan Kitab",
          icon: BookOpen,
        },
      ],
    },
    {
      group: "MODUL SMART AI KITAB",
      items: [
        {
          id: "chat" as ActiveTab,
          label: "AI Chat Ustadz Virtual",
          icon: MessageSquareCode,
          badge: "Gemini AI",
          badgeColor: "bg-emerald-800/60 text-emerald-200 border-emerald-400/30",
        },
        {
          id: "ocr" as ActiveTab,
          label: "AI OCR Kitab Gundul",
          icon: ScanText,
        },
        {
          id: "nahwu" as ActiveTab,
          label: "AI Nahwu & Sharaf",
          icon: Binary,
        },
        {
          id: "tafsir" as ActiveTab,
          label: "AI Tafsir & Hadits",
          icon: Compass,
        },
        {
          id: "hafalan" as ActiveTab,
          label: "AI Quiz & Hafalan",
          icon: Mic,
        },
      ],
    },
    {
      group: "KOMUNITAS & LISENSI",
      items: [
        {
          id: "forum" as ActiveTab,
          label: "Forum Bahsul Masail",
          icon: Users,
        },
        {
          id: "marketplace" as ActiveTab,
          label: "Marketplace & Lisensi",
          icon: ShoppingBag,
        },
        {
          id: "admin" as ActiveTab,
          label: "Admin Panel & Analitik",
          icon: BarChart3,
        },
      ],
    },
  ];

  return (
    <aside className="w-full lg:w-64 bg-gradient-to-b from-emerald-950/95 via-teal-950/95 to-emerald-900/95 border-r border-emerald-500/30 p-4 shrink-0 font-sans shadow-xl backdrop-blur-md">
      <div className="space-y-6">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-1.5">
            <p className="px-3 text-[11px] font-bold text-emerald-300/80 tracking-wider uppercase">
              {group.group}
            </p>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 shadow-md font-bold"
                      : "text-emerald-100 hover:bg-emerald-900/60 hover:text-emerald-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-emerald-950" : "text-emerald-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        isActive
                          ? "bg-emerald-950 text-emerald-300 font-extrabold border-emerald-400"
                          : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* Info Card Banner */}
        <div className="pt-4 border-t border-emerald-500/30">
          <div className="bg-gradient-to-br from-emerald-900/90 via-teal-900/90 to-emerald-950/90 p-3.5 rounded-2xl text-emerald-100 space-y-2 border border-emerald-400/40">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>SHAQILA AI VIP</span>
            </div>
            <p className="text-[11px] text-emerald-200/90 leading-relaxed">
              Platform AI Kitab terverifikasi untuk Pondok Pesantren di Indonesia.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
