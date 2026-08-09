import React, { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { ArchitectureDocsModule } from "./components/ArchitectureDocsModule";
import { PerpustakaanModule } from "./components/PerpustakaanModule";
import { AIChatModule } from "./components/AIChatModule";
import { AIOCRModule } from "./components/AIOCRModule";
import { AINahwuSharafModule } from "./components/AINahwuSharafModule";
import { AITafsirHaditsModule } from "./components/AITafsirHaditsModule";
import { AIHafalanQuizModule } from "./components/AIHafalanQuizModule";
import { ForumModule } from "./components/ForumModule";
import { MarketplaceModule } from "./components/MarketplaceModule";
import { AdminAnalyticsModule } from "./components/AdminAnalyticsModule";
import { LicenseModal } from "./components/LicenseModal";
import { NotificationDrawer } from "./components/NotificationDrawer";
import { ActiveTab, LicenseInfo } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("library");
  const [licenseModalOpen, setLicenseModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [license, setLicense] = useState<LicenseInfo>({
    isLicensed: true,
    key: "SHAQILA-VIP-999",
    tier: "Pesantren Enterprise VIP",
    expiresAt: "2028-12-31",
    licensedTo: "Pondok Pesantren Shaqila Digital 99",
    tokenQuota: 5000000,
    tokenUsed: 12500,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 flex flex-col font-sans text-white antialiased selection:bg-emerald-400 selection:text-emerald-950">
      {/* Top Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        license={license}
        onOpenLicenseModal={() => setLicenseModalOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        unreadCount={2}
      />

      {/* Main Container Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 space-y-6 min-w-0">
          {activeTab === "docs" && <ArchitectureDocsModule />}
          {activeTab === "library" && <PerpustakaanModule />}
          {activeTab === "chat" && <AIChatModule />}
          {activeTab === "ocr" && <AIOCRModule />}
          {activeTab === "nahwu" && <AINahwuSharafModule />}
          {activeTab === "tafsir" && <AITafsirHaditsModule />}
          {activeTab === "hafalan" && <AIHafalanQuizModule />}
          {activeTab === "forum" && <ForumModule />}
          {activeTab === "marketplace" && (
            <MarketplaceModule
              license={license}
              onUpdateLicense={(newInfo) => setLicense(newInfo)}
            />
          )}
          {activeTab === "admin" && <AdminAnalyticsModule />}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 border-t border-emerald-500/40 text-white text-xs py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-bold text-white">SHAQILA DIGITAL 99</span> — Platform Smart AI Kitab Pesantren Indonesia
            <p className="text-[11px] text-emerald-100 mt-0.5">
              Clean Architecture & Enterprise License
            </p>
          </div>
          <div className="text-[11px] text-emerald-100">
            © 2026 SHAQILA Digital Indonesia. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <LicenseModal
        isOpen={licenseModalOpen}
        onClose={() => setLicenseModalOpen(false)}
        license={license}
        onUpdateLicense={(newInfo) => setLicense(newInfo)}
      />

      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
}
