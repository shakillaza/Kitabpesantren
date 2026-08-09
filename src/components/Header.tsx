import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  ShieldCheck,
  Bell,
  Search,
  Key,
  Menu,
  X,
  FileCode2,
} from "lucide-react";
import { ActiveTab, LicenseInfo } from "../types";

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  license: LicenseInfo;
  onOpenLicenseModal: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  license,
  onOpenLicenseModal,
  onOpenNotifications,
  unreadCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-white shadow-lg border-b border-emerald-500/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("library")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-300 flex items-center justify-center text-emerald-950 font-extrabold shadow-md text-xl tracking-wider border border-emerald-300">
              99
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-wide text-white">SHAQILA DIGITAL</span>
                <span className="text-xs bg-emerald-800/80 text-white font-semibold px-2 py-0.5 rounded-full border border-emerald-400/40">
                  SMART AI
                </span>
              </div>
              <p className="text-[11px] text-white/90 -mt-1 font-sans">
                Platform Smart AI Kitab Pesantren Indonesia
              </p>
            </div>
          </div>

          {/* Quick Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 bg-emerald-950/80 p-1.5 rounded-xl border border-emerald-500/30 text-sm">
            <button
              onClick={() => setActiveTab("docs")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "docs"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 font-bold shadow-md"
                  : "text-white hover:bg-emerald-900/60"
              }`}
            >
              <FileCode2 className="w-4 h-4" />
              <span>Arsitektur Sistem</span>
            </button>

            <button
              onClick={() => setActiveTab("library")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "library"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 font-bold shadow-md"
                  : "text-white hover:bg-emerald-900/60"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Perpustakaan Kitab</span>
            </button>

            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "chat"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 font-bold shadow-md"
                  : "text-white hover:bg-emerald-900/60"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Chat Ustadz</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* License VIP Status Badge */}
            <button
              onClick={onOpenLicenseModal}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-800/60 via-teal-800/50 to-emerald-800/60 border border-emerald-400/50 px-3 py-1.5 rounded-xl text-xs font-semibold text-white hover:bg-emerald-800/80 transition-all cursor-pointer"
              title="Aktivasi & Status Lisensi VIP"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{license.tier}</span>
              <Key className="w-3.5 h-3.5 text-emerald-300 ml-1 opacity-80" />
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-white hover:bg-emerald-900/60 transition-all"
              aria-label="Notifikasi"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-400 text-emerald-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-white hover:bg-emerald-900/60"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-emerald-950 via-teal-950 to-emerald-900 border-t border-emerald-500/30 px-4 py-3 space-y-2 text-sm">
          <button
            onClick={() => {
              setActiveTab("docs");
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-emerald-100 hover:bg-emerald-900/60"
          >
            <FileCode2 className="w-4 h-4 text-emerald-400" />
            <span>Spesifikasi Arsitektur Sistem (Phase 1)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("library");
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-emerald-100 hover:bg-emerald-900/60"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Perpustakaan Kitab Digital</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("chat");
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-emerald-100 hover:bg-emerald-900/60"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>AI Chat Ustadz Virtual</span>
          </button>

          <button
            onClick={() => {
              onOpenLicenseModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-800/40 text-emerald-300 font-semibold border border-emerald-400/30"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Status Lisensi: {license.tier}</span>
          </button>
        </div>
      )}
    </header>
  );
};
