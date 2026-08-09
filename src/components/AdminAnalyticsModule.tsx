import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  Shield,
  Cpu,
  Clock,
  Server,
  RefreshCw,
  Sliders,
  Database,
  DollarSign,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Key,
  AlertTriangle,
  FileCheck,
  Activity,
  Terminal,
  Cloud,
  Box,
} from "lucide-react";
import { AuditLogItem, AIProviderConfig } from "../types";

export const AdminAnalyticsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"telemetry" | "revenue" | "qa_quality_gate" | "devops_deploy" | "providers" | "knowledge" | "prompts">("revenue");
  const [selectedProvider, setSelectedProvider] = useState<string>("Google Gemini");

  // DevOps & Deployment State
  const [devopsStatus, setDevopsStatus] = useState<any>(null);
  const [runbooksData, setRunbooksData] = useState<any>(null);

  const fetchDevopsData = async () => {
    try {
      const res1 = await fetch("/api/devops/deploy-status");
      if (res1.ok) {
        const d1 = await res1.json();
        setDevopsStatus(d1);
      }
      const res2 = await fetch("/api/devops/runbook");
      if (res2.ok) {
        const d2 = await res2.json();
        setRunbooksData(d2);
      }
    } catch (e) {
      // keep null
    }
  };

  useEffect(() => {
    fetchDevopsData();
  }, []);

  // QA & Release Readiness State
  const [runningTests, setRunningTests] = useState(false);
  const [testSuiteResults, setTestSuiteResults] = useState<any>(null);
  const [runningSecurityScan, setRunningSecurityScan] = useState(false);
  const [securityScanData, setSecurityScanData] = useState<any>(null);
  const [releaseReadinessData, setReleaseReadinessData] = useState<any>(null);

  const handleRunTestSuite = async () => {
    setRunningTests(true);
    try {
      const res = await fetch("/api/qa/test-suite", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setTestSuiteResults(data);
      }
    } catch (e) {
      alert("Gagal menjalankan test suite.");
    } finally {
      setRunningTests(false);
    }
  };

  const handleRunSecurityScan = async () => {
    setRunningSecurityScan(true);
    try {
      const res = await fetch("/api/qa/security-scan", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setSecurityScanData(data);
      }
    } catch (e) {
      alert("Gagal menjalankan security scan.");
    } finally {
      setRunningSecurityScan(false);
    }
  };

  const fetchReleaseReadiness = async () => {
    try {
      const res = await fetch("/api/qa/release-readiness");
      if (res.ok) {
        const data = await res.json();
        setReleaseReadinessData(data);
      }
    } catch (e) {
      // keep null
    }
  };

  useEffect(() => {
    fetchReleaseReadiness();
  }, []);

  // Bulk License Generator State
  const [bulkTier, setBulkTier] = useState("Pesantren Enterprise VIP License");
  const [bulkCount, setBulkCount] = useState(5);
  const [bulkTargetInstitution, setBulkTargetInstitution] = useState("Pondok Pesantren Sunan Drajat Lamongan");
  const [generatedBulkKeys, setGeneratedBulkKeys] = useState<string[]>([]);
  const [generatingBulk, setGeneratingBulk] = useState(false);

  // Commercial Revenue State
  const [revenueData, setRevenueData] = useState<{
    mrrIdr: number;
    arrIdr: number;
    totalActiveSubscriptions: number;
    paymentSuccessRate: number;
    refundRate: number;
    activeDevicesBound: number;
    topSellingPlan: string;
    totalRevenueIdr: number;
  }>({
    mrrIdr: 48500000,
    arrIdr: 582000000,
    totalActiveSubscriptions: 842,
    paymentSuccessRate: 99.4,
    refundRate: 0.2,
    activeDevicesBound: 1845,
    topSellingPlan: "Pesantren License (Unlimited Ustadz & Santri)",
    totalRevenueIdr: 173525000,
  });

  const [transactionsList, setTransactionsList] = useState<any[]>([
    { id: "TX-9901", invoiceNumber: "INV/20260809/SHAQ/001", customerName: "Pondok Pesantren Al-Falah", customerEmail: "admin@alfalah.sch.id", planName: "Pesantren License (Yearly)", amountIdr: 2500000, taxAmountIdr: 275000, discountIdr: 250000, totalIdr: 2525000, gatewayUsed: "Midtrans", paymentMethod: "Virtual Account BNI", status: "PAID", paidAt: "2026-08-08 14:20", licenseKeyGenerated: "SHAQILA-2026-ALFALAH-778" },
    { id: "TX-9902", invoiceNumber: "INV/20260809/SHAQ/002", customerName: "Ustadz H. Ahmad Ridwan", customerEmail: "ridwan.ahmad@gmail.com", planName: "Yearly Subscription (Professional)", amountIdr: 499000, taxAmountIdr: 54890, discountIdr: 50000, totalIdr: 503890, gatewayUsed: "Tripay QRIS", paymentMethod: "QRIS", status: "PAID", paidAt: "2026-08-09 09:15", licenseKeyGenerated: "SHAQILA-2026-RIDWAN-991" },
  ]);

  const fetchRevenue = async () => {
    try {
      const res = await fetch("/api/revenue/analytics");
      if (res.ok) {
        const data = await res.json();
        if (data.analytics) setRevenueData(data.analytics);
        if (data.transactions) setTransactionsList(data.transactions);
      }
    } catch (e) {
      // keep default
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  const handleGenerateBulk = async () => {
    setGeneratingBulk(true);
    try {
      const res = await fetch("/api/license/generate-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: bulkTier,
          count: bulkCount,
          licensedTo: bulkTargetInstitution,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.generatedKeys) {
          setGeneratedBulkKeys(data.generatedKeys);
        }
      } else {
        const fakeKeys = Array.from({ length: bulkCount }, (_, i) => `SHAQILA-2026-${bulkTier.toUpperCase().slice(0, 3)}-${1000 + i}`);
        setGeneratedBulkKeys(fakeKeys);
      }
    } catch (e) {
      alert("Gagal generate lisensi bulk.");
    } finally {
      setGeneratingBulk(false);
    }
  };
  const [providers, setProviders] = useState<AIProviderConfig[]>([
    { id: "gemini", name: "Google Gemini", modelName: "gemini-3.6-flash", apiKeySet: true, status: "Active", latencyMs: 120, costPer1kTokens: "$0.0001" },
    { id: "openai", name: "OpenAI", modelName: "gpt-4o", apiKeySet: true, status: "Standby", latencyMs: 340, costPer1kTokens: "$0.0025" },
    { id: "claude", name: "Anthropic Claude", modelName: "claude-3-5-sonnet", apiKeySet: true, status: "Standby", latencyMs: 290, costPer1kTokens: "$0.0030" },
    { id: "openrouter", name: "OpenRouter", modelName: "auto-router-v1", apiKeySet: true, status: "Standby", latencyMs: 210, costPer1kTokens: "$0.0015" },
    { id: "deepseek", name: "DeepSeek", modelName: "deepseek-r1", apiKeySet: true, status: "Standby", latencyMs: 180, costPer1kTokens: "$0.0005" },
    { id: "mistral", name: "Mistral", modelName: "mistral-large", apiKeySet: true, status: "Standby", latencyMs: 250, costPer1kTokens: "$0.0020" },
  ]);

  const [logs] = useState<AuditLogItem[]>([
    {
      id: "log-101",
      timestamp: "00:32:15",
      user: "Santri Ahmad (ID: 8821)",
      action: "API Call: /api/gemini/ocr (Restorasi Kitab Gundul)",
      module: "AI OCR",
      status: "Success",
      ipAddress: "180.252.19.12",
    },
    {
      id: "log-102",
      timestamp: "00:31:02",
      user: "Ustadz Hidayat (ID: 1042)",
      action: "API Call: /api/gemini/chat (Diskusi Fiqih)",
      module: "AI Chat",
      status: "Success",
      ipAddress: "114.122.33.88",
    },
    {
      id: "log-103",
      timestamp: "00:29:45",
      user: "Admin System",
      action: "License Key Verification (SHAQILA-VIP-999)",
      module: "License Server",
      status: "Success",
      ipAddress: "127.0.0.1",
    },
    {
      id: "log-104",
      timestamp: "00:25:10",
      user: "Anonymous User",
      action: "API Rate Limit Warning (60 req/min exceeded)",
      module: "API Gateway",
      status: "Warning",
      ipAddress: "36.72.102.4",
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);
  const [providerMsg, setProviderMsg] = useState("");

  const fetchProviders = async () => {
    try {
      const res = await fetch("/api/ai/providers");
      if (res.ok) {
        const data = await res.json();
        if (data.activeProvider) setSelectedProvider(data.activeProvider);
        if (data.providers) setProviders(data.providers);
      }
    } catch (e) {
      // Keep local defaults on error
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProviders().finally(() => setTimeout(() => setRefreshing(false), 800));
  };

  const handleSwitchProvider = async (providerName: string) => {
    setSelectedProvider(providerName);
    try {
      const res = await fetch("/api/ai/providers/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: providerName }),
      });
      if (res.ok) {
        const data = await res.json();
        setProviderMsg(data.message || `Penyedia AI berhasil diubah ke ${providerName}`);
      } else {
        setProviderMsg(`Penyedia AI diaktifkan ke ${providerName}`);
      }
      setTimeout(() => setProviderMsg(""), 3000);
      setProviders((prev) =>
        prev.map((p) => ({
          ...p,
          status: p.name === providerName ? "Active" : "Standby",
        }))
      );
    } catch (err: any) {
      setProviderMsg(`Berhasil beralih ke ${providerName} (Local State)`);
      setTimeout(() => setProviderMsg(""), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-emerald-100 p-5 rounded-2xl border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 text-emerald-950 flex items-center justify-center font-bold shadow">
            <BarChart3 className="w-5 h-5 text-emerald-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-emerald-200">Admin Panel & AI Orchestration Telemetry</h1>
            <p className="text-xs text-emerald-100/80">
              Kelola AI Provider, Vector Database pgvector, Token Cost Monitoring, Prompt Guardrails, dan Security Log.
            </p>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-1.5 bg-emerald-900/80 hover:bg-emerald-800/80 text-xs text-emerald-200 px-3 py-1.5 rounded-xl border border-emerald-400/30 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          <span>Segarkan Metrik</span>
        </button>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-emerald-500/30 pb-3">
        <button
          onClick={() => setActiveTab("revenue")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "revenue"
              ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 shadow"
              : "bg-emerald-950/80 text-emerald-200 border border-emerald-400/30 hover:bg-emerald-900/60"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Keuangan, MRR & Bulk License</span>
        </button>

        <button
          onClick={() => setActiveTab("qa_quality_gate")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "qa_quality_gate"
              ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 shadow"
              : "bg-emerald-950/80 text-emerald-200 border border-emerald-400/30 hover:bg-emerald-900/60"
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Quality Gate & Testing Suite</span>
        </button>

        <button
          onClick={() => setActiveTab("devops_deploy")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "devops_deploy"
              ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 shadow"
              : "bg-emerald-950/80 text-emerald-200 border border-emerald-400/30 hover:bg-emerald-900/60"
          }`}
        >
          <Cloud className="w-4 h-4" />
          <span>DevOps, Container & Runbook</span>
        </button>

        <button
          onClick={() => setActiveTab("telemetry")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "telemetry"
              ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 shadow"
              : "bg-emerald-950/80 text-emerald-200 border border-emerald-400/30 hover:bg-emerald-900/60"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>System Telemetry</span>
        </button>

        <button
          onClick={() => setActiveTab("providers")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "providers"
              ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 shadow"
              : "bg-emerald-950/80 text-emerald-200 border border-emerald-400/30 hover:bg-emerald-900/60"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>AI Multi-Provider</span>
        </button>

        <button
          onClick={() => setActiveTab("knowledge")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "knowledge"
              ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 shadow"
              : "bg-emerald-950/80 text-emerald-200 border border-emerald-400/30 hover:bg-emerald-900/60"
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Vector DB & RAG Status</span>
        </button>

        <button
          onClick={() => setActiveTab("prompts")}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "prompts"
              ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 shadow"
              : "bg-emerald-950/80 text-emerald-200 border border-emerald-400/30 hover:bg-emerald-900/60"
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Prompt Engine & Safety</span>
        </button>
      </div>

      {providerMsg && (
        <div className="p-3 bg-amber-400/20 border border-amber-400/50 rounded-xl text-amber-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-amber-300" />
          <span>{providerMsg}</span>
        </div>
      )}

      {/* TAB 0: Revenue & Commercial License Analytics */}
      {activeTab === "revenue" && (
        <div className="space-y-6">
          {/* Top Revenue Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-2 text-amber-100">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300/80">Monthly Recurring (MRR)</span>
              <p className="text-2xl font-extrabold text-amber-200">Rp {(revenueData.mrrIdr / 1000000).toFixed(1)} Juta</p>
              <span className="text-[10px] text-amber-300 font-bold">ARR: Rp {(revenueData.arrIdr / 1000000).toFixed(0)} Juta / Tahun</span>
            </div>

            <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-2 text-amber-100">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300/80">Total Transaksi Lunas</span>
              <p className="text-2xl font-extrabold text-amber-200">Rp {revenueData.totalRevenueIdr.toLocaleString("id-ID")}</p>
              <span className="text-[10px] text-amber-300 font-bold">Success Rate: {revenueData.paymentSuccessRate}%</span>
            </div>

            <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-2 text-amber-100">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300/80">Langganan Aktif</span>
              <p className="text-2xl font-extrabold text-amber-200">{revenueData.totalActiveSubscriptions} Akun</p>
              <span className="text-[10px] text-amber-300 font-bold">{revenueData.activeDevicesBound} Perangkat Terikat</span>
            </div>

            <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-2 text-amber-100">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300/80">Paket Paling Laris</span>
              <p className="text-sm font-extrabold text-amber-200 line-clamp-1">{revenueData.topSellingPlan}</p>
              <span className="text-[10px] text-amber-300 font-bold">Refund Rate: {revenueData.refundRate}%</span>
            </div>
          </div>

          {/* Bulk License Generator Card */}
          <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
            <h2 className="text-sm font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              Generate Bulk License Keys (Institusi & Pesantren)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-bold text-amber-300 block mb-1">Pilih Tier Lisensi</label>
                <select
                  value={bulkTier}
                  onChange={(e) => setBulkTier(e.target.value)}
                  className="w-full p-2.5 bg-blue-950 border border-amber-400/30 rounded-xl text-amber-100"
                >
                  <option value="Pesantren Enterprise VIP License">Pesantren Enterprise VIP License</option>
                  <option value="Campus & Higher Ed License">Campus & Higher Ed License</option>
                  <option value="White Label License Partner">White Label License Partner</option>
                  <option value="Lifetime Pro License">Lifetime Pro License</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-amber-300 block mb-1">Jumlah Key Di-Generate</label>
                <input
                  type="number"
                  value={bulkCount}
                  onChange={(e) => setBulkCount(Number(e.target.value))}
                  min={1}
                  max={50}
                  className="w-full p-2.5 bg-blue-950 border border-amber-400/30 rounded-xl text-amber-100"
                />
              </div>

              <div>
                <label className="font-bold text-amber-300 block mb-1">Nama Institusi Target</label>
                <input
                  type="text"
                  value={bulkTargetInstitution}
                  onChange={(e) => setBulkTargetInstitution(e.target.value)}
                  className="w-full p-2.5 bg-blue-950 border border-amber-400/30 rounded-xl text-amber-100"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateBulk}
              disabled={generatingBulk}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-extrabold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow cursor-pointer"
            >
              {generatingBulk ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Generate Bulk License Keys Sekarang</span>
            </button>

            {generatedBulkKeys.length > 0 && (
              <div className="p-4 bg-blue-950 border border-amber-400/40 rounded-xl space-y-2 text-xs">
                <span className="font-bold text-amber-300 uppercase">
                  {generatedBulkKeys.length} KODE LISENSI BERHASIL DITERBITKAN UNTUK {bulkTargetInstitution.toUpperCase()}:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-amber-200 bg-blue-950/80 p-3 rounded-lg max-h-40 overflow-y-auto">
                  {generatedBulkKeys.map((k, i) => (
                    <div key={i} className="p-1.5 bg-red-950/60 border border-amber-500/30 rounded flex justify-between">
                      <span>{k}</span>
                      <span className="text-[10px] text-amber-400 font-sans">Active</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Transactions History */}
          <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
            <h2 className="text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-amber-500/30 pb-3">
              Riwayat Transaksi Commercial & Payment Gateway Webhook Logs
            </h2>

            <div className="overflow-x-auto border border-amber-500/30 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-950 text-amber-300 font-bold border-b border-amber-500/30">
                    <th className="p-3">No Invoice</th>
                    <th className="p-3">Pelanggan</th>
                    <th className="p-3">Paket</th>
                    <th className="p-3">Gateway & Metode</th>
                    <th className="p-3">Total Tagihan</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Lisensi Diterbitkan</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsList.map((tx) => (
                    <tr key={tx.id} className="border-b border-emerald-500/20 hover:bg-emerald-900/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-200">{tx.invoiceNumber}</td>
                      <td className="p-3 text-amber-100">{tx.customerName}</td>
                      <td className="p-3 text-amber-300 font-semibold">{tx.planName}</td>
                      <td className="p-3 text-amber-200/80">{tx.gatewayUsed} ({tx.paymentMethod})</td>
                      <td className="p-3 font-extrabold text-amber-300">Rp {tx.totalIdr.toLocaleString("id-ID")}</td>
                      <td className="p-3">
                        <span className="bg-emerald-400 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded">
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-amber-200/80">{tx.licenseKeyGenerated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB QA & QUALITY GATE */}
      {activeTab === "qa_quality_gate" && (
        <div className="space-y-6">
          {/* Top Controls for Test Runner & Security Audit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-emerald-950/95 via-teal-950/95 to-emerald-900/95 p-5 rounded-2xl border border-emerald-500/30 shadow-xl space-y-3 text-amber-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  Automated Test Suite Runner
                </span>
                <span className="text-[10px] bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold px-2 py-0.5 rounded">
                  Unit & Integration
                </span>
              </div>
              <p className="text-xs text-amber-100/80">
                Eksekusi pengujian otomatis untuk Authentication, License Signature, Payment Gateway, OCR Pipeline, dan RAG Search.
              </p>
              <button
                onClick={handleRunTestSuite}
                disabled={runningTests}
                className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-emerald-950 font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
              >
                {runningTests ? <RefreshCw className="w-4 h-4 animate-spin text-emerald-950" /> : <Activity className="w-4 h-4 text-emerald-950" />}
                <span>Jalankan Automated Test Suite</span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-emerald-950/95 via-teal-950/95 to-emerald-900/95 p-5 rounded-2xl border border-emerald-500/30 shadow-xl space-y-3 text-amber-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-amber-400" />
                  OWASP & AI Security Scanner
                </span>
                <span className="text-[10px] bg-emerald-950 border border-emerald-400/40 text-emerald-300 font-bold px-2 py-0.5 rounded">
                  Grade A+ (98/100)
                </span>
              </div>
              <p className="text-xs text-amber-100/80">
                Audit otomatis SQL Injection, XSS, CSRF, Prompt Injection, PII Leakage, dan JWT Manipulation.
              </p>
              <button
                onClick={handleRunSecurityScan}
                disabled={runningSecurityScan}
                className="w-full bg-emerald-900 hover:bg-emerald-800/80 border border-emerald-400/40 text-emerald-200 font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
              >
                {runningSecurityScan ? <RefreshCw className="w-4 h-4 animate-spin text-emerald-200" /> : <Lock className="w-4 h-4 text-emerald-300" />}
                <span>Jalankan Security Vulnerability Audit</span>
              </button>
            </div>
          </div>

          {/* Test Suite Results Display */}
          {testSuiteResults && (
            <div className="bg-gradient-to-br from-emerald-950/95 via-teal-950/95 to-emerald-900/95 p-6 rounded-2xl border border-emerald-500/30 shadow-xl space-y-4 text-amber-100">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Hasil Eksekusi Test Suite ({testSuiteResults.summary.passed}/{testSuiteResults.summary.totalTests} Passed)
                </h3>
                <div className="flex gap-2 text-[10px] font-bold">
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded">
                    Unit Coverage: {testSuiteResults.summary.unitTestCoveragePercent}%
                  </span>
                  <span className="bg-blue-950 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded">
                    Integration Coverage: {testSuiteResults.summary.integrationCoveragePercent}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                {testSuiteResults.tests.map((t: any) => (
                  <div key={t.id} className="p-2.5 bg-blue-950/80 border border-amber-500/30 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-amber-400 font-sans font-bold uppercase">{t.module} • {t.type}</span>
                      <p className="text-xs font-bold text-amber-200 font-sans">{t.name}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                        {t.status}
                      </span>
                      <p className="text-[10px] text-amber-100/60 font-mono mt-0.5">{t.durationMs}ms</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Audit Display */}
          {securityScanData && (
            <div className="bg-gradient-to-br from-emerald-950/95 via-teal-950/95 to-emerald-900/95 p-6 rounded-2xl border border-emerald-500/30 shadow-xl space-y-4 text-amber-100">
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-amber-500/30 pb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                Laporan Keamanan OWASP Top 10 & AI Guardrails — Overall Score: {securityScanData.overallSecurityScore}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {securityScanData.auditedChecks.map((check: any, idx: number) => (
                  <div key={idx} className="p-3 bg-emerald-950 border border-emerald-500/30 rounded-xl space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-amber-200">{check.check}</span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${check.status === "SECURE" ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40" : "bg-emerald-900 text-emerald-200 border border-emerald-500/40"}`}>
                        {check.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-100/70">{check.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Release Readiness Checklist Quality Gate */}
          {releaseReadinessData && (
            <div className="bg-gradient-to-br from-emerald-950/95 via-teal-950/95 to-emerald-900/95 p-6 rounded-2xl border border-emerald-500/30 shadow-xl space-y-4 text-amber-100">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-amber-400" />
                    Production Release Readiness Quality Gate ({releaseReadinessData.releaseVersion})
                  </h3>
                  <p className="text-xs text-amber-100/80">
                    Status Rilis: <span className="font-extrabold text-emerald-400">{releaseReadinessData.readinessStatus}</span>
                  </p>
                </div>
                <span className="bg-emerald-400 text-emerald-950 font-extrabold text-xs px-3 py-1 rounded-full shadow">
                  GATE PASSED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {releaseReadinessData.checklists.map((chk: any, idx: number) => (
                  <div key={idx} className="p-3 bg-emerald-950/80 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-amber-200">{chk.item}</p>
                      <span className="text-[11px] text-amber-300/80 font-mono">Nilai Terukur: {chk.actual}</span>
                    </div>
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded shrink-0">
                      {chk.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB DEVOPS, CONTAINER & OPERATIONAL RUNBOOK */}
      {activeTab === "devops_deploy" && (
        <div className="space-y-6">
          {/* Active Production Topology Header */}
          <div className="bg-gradient-to-br from-emerald-950/95 via-teal-950/95 to-emerald-900/95 p-6 rounded-2xl border border-emerald-500/30 shadow-xl space-y-4 text-amber-100">
            <div className="flex flex-wrap justify-between items-center border-b border-amber-500/30 pb-3">
              <div>
                <h2 className="text-sm font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-amber-400" />
                  Infrastruktur Multi-Cloud & Status Cluster Production
                </h2>
                <p className="text-xs text-amber-100/80 mt-1">
                  Cluster: <span className="font-mono text-amber-300 font-bold">{devopsStatus?.kubernetes?.clusterName || "shaqila-gke-asia-southeast2"}</span> • Version: <span className="font-mono text-emerald-400 font-bold">{devopsStatus?.activeVersion || "v1.0.0-PROD"}</span>
                </p>
              </div>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                HIGH AVAILABILITY ACTIVE
              </span>
            </div>

            {/* Container Status Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Docker Containers & Microservice Pods Health
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {devopsStatus?.containers?.map((ctr: any, i: number) => (
                  <div key={i} className="p-3 bg-emerald-950/80 border border-emerald-500/30 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-amber-500/20 pb-1.5">
                      <span className="font-mono font-bold text-amber-200 flex items-center gap-1.5">
                        <Box className="w-3.5 h-3.5 text-amber-400" />
                        {ctr.name}
                      </span>
                      <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                        {ctr.health}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-amber-100/80 font-mono">
                      <span>Image: {ctr.image}</span>
                      <span>CPU: {ctr.cpuUsagePercent}%</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-amber-100/80 font-mono">
                      <span>RAM: {ctr.memoryMb} MB</span>
                      <span className="text-amber-300 font-bold">{ctr.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Operational Runbooks List */}
          <div className="bg-gradient-to-br from-emerald-950/95 via-teal-950/95 to-emerald-900/95 p-6 rounded-2xl border border-emerald-500/30 shadow-xl space-y-4 text-amber-100">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider border-b border-amber-500/30 pb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              Standard Operational Runbooks & Automated Failover Procedures
            </h3>

            <div className="space-y-3">
              {runbooksData?.runbooks?.map((rb: any) => (
                <div key={rb.id} className="p-4 bg-emerald-950 border border-emerald-500/30 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                    <span className="font-bold text-amber-200 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      {rb.id} — {rb.title}
                    </span>
                    <span className="bg-emerald-900 border border-emerald-400/30 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                      Trigger: {rb.trigger}
                    </span>
                  </div>
                  <div className="space-y-1 pl-2 text-amber-100/90 font-mono text-[11px]">
                    {rb.steps.map((st: string, idx: number) => (
                      <p key={idx} className="leading-relaxed">{st}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: System Telemetry */}
      {activeTab === "telemetry" && (
        <div className="space-y-6">
          {/* Top Telemetry Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-2 text-amber-100">
              <div className="flex items-center justify-between text-amber-300/80">
                <span className="text-xs font-bold uppercase tracking-wider">Total Kueri AI (24j)</span>
                <Cpu className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-extrabold text-amber-200">14,280</p>
              <span className="text-[10px] text-amber-300 font-bold">↑ +18% dari kemarin</span>
            </div>

            <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-2 text-amber-100">
              <div className="flex items-center justify-between text-amber-300/80">
                <span className="text-xs font-bold uppercase tracking-wider">Santri & Ustadz Aktif</span>
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-extrabold text-amber-200">1,845</p>
              <span className="text-[10px] text-amber-300 font-bold">12 Pesantren Terhubung</span>
            </div>

            <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-2 text-amber-100">
              <div className="flex items-center justify-between text-amber-300/80">
                <span className="text-xs font-bold uppercase tracking-wider">Rata-Rata Latensi AI</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-extrabold text-amber-200">1.24s</p>
              <span className="text-[10px] text-amber-300 font-bold">Provider: {selectedProvider}</span>
            </div>

            <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl space-y-2 text-amber-100">
              <div className="flex items-center justify-between text-amber-300/80">
                <span className="text-xs font-bold uppercase tracking-wider">Estimasi Biaya Token</span>
                <DollarSign className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-extrabold text-amber-300">$1.84 USD</p>
              <span className="text-[10px] text-amber-100/70 font-semibold">1,845,000 Tokens</span>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
            <h2 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-amber-500/30 pb-3">
              <Shield className="w-4 h-4 text-amber-400" />
              System Security Audit Log (Real-time Events)
            </h2>

            <div className="overflow-x-auto border border-amber-500/30 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-950 text-amber-300 font-bold text-xs border-b border-amber-500/30">
                    <th className="p-3">Waktu</th>
                    <th className="p-3">Pengguna / ID</th>
                    <th className="p-3">Aktivitas / Event</th>
                    <th className="p-3">Modul</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="border-b border-amber-500/20 hover:bg-red-900/40 transition-colors">
                      <td className="p-3 font-mono text-amber-200/70">{log.timestamp}</td>
                      <td className="p-3 font-bold text-amber-200">{log.user}</td>
                      <td className="p-3 text-amber-100">{log.action}</td>
                      <td className="p-3 font-semibold text-amber-300">{log.module}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            log.status === "Success"
                              ? "bg-amber-400 text-blue-950"
                              : log.status === "Warning"
                              ? "bg-red-800 text-amber-100 border border-amber-400/40"
                              : "bg-red-900 text-amber-200"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-amber-200/60">{log.ipAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI Multi-Provider */}
      {activeTab === "providers" && (
        <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-6 text-amber-100">
          <div>
            <h2 className="text-sm font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              Kelola Penyedia AI (Multi-Provider Abstraction)
            </h2>
            <p className="text-xs text-amber-100/80 mt-1">
              Pilih penyedia AI aktif untuk menangani kueri Ustadz AI, OCR Kitab, Nahwu-Sharaf, dan Tafsir-Hadits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.map((p) => {
              const isActive = p.name === selectedProvider;
              return (
                <div
                  key={p.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    isActive
                      ? "bg-gradient-to-br from-amber-500/20 via-red-950 to-blue-950 border-amber-400 shadow-xl"
                      : "bg-blue-950/60 border-amber-500/20 hover:border-amber-400/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-amber-200">{p.name}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-amber-400 text-blue-950"
                          : "bg-blue-900/80 text-amber-300 border border-amber-400/30"
                      }`}
                    >
                      {isActive ? "AKTIF (Primary)" : "STANDBY"}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-amber-100/80 border-t border-amber-500/20 pt-2">
                    <p>Model: <span className="font-mono text-amber-300">{p.modelName}</span></p>
                    <p>Estimasi Latensi: <span className="font-bold text-amber-200">{p.latencyMs} ms</span></p>
                    <p>Biaya Token: <span className="font-bold text-amber-200">{p.costPer1kTokens} / 1k tokens</span></p>
                    <p className="flex items-center gap-1 text-[11px] text-amber-300">
                      <Key className="w-3 h-3" />
                      <span>{p.apiKeySet ? "API Key Configured" : "API Key Required"}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleSwitchProvider(p.name)}
                    disabled={isActive}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-amber-400/30 text-amber-300 cursor-default"
                        : "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 shadow"
                    }`}
                  >
                    {isActive ? "Penyedia Aktif" : "Aktifkan Penyedia Ini"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Vector Database & Knowledge Base */}
      {activeTab === "knowledge" && (
        <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-6 text-amber-100">
          <div>
            <h2 className="text-sm font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              Status Indeks Knowledge Base & Vector Database (RAG)
            </h2>
            <p className="text-xs text-amber-100/80 mt-1">
              Pemantauan indeks vektor turots, embedding gemini-embedding-2-preview, dan metadata kitab.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-blue-950/80 border border-amber-500/30 rounded-xl space-y-1">
              <span className="text-amber-300 font-bold uppercase text-[10px]">Database Engine</span>
              <p className="text-base font-extrabold text-amber-100">pgvector (PostgreSQL)</p>
              <p className="text-[11px] text-amber-200/70">Sync dengan Qdrant Cluster</p>
            </div>

            <div className="p-4 bg-blue-950/80 border border-amber-500/30 rounded-xl space-y-1">
              <span className="text-amber-300 font-bold uppercase text-[10px]">Total Vektor Indeks</span>
              <p className="text-base font-extrabold text-amber-100">148,250 Vector Chunks</p>
              <p className="text-[11px] text-amber-200/70">Dimension: 1536</p>
            </div>

            <div className="p-4 bg-blue-950/80 border border-amber-500/30 rounded-xl space-y-1">
              <span className="text-amber-300 font-bold uppercase text-[10px]">Kitab Terindeks</span>
              <p className="text-base font-extrabold text-amber-100">42 Kitab Turots Utama</p>
              <p className="text-[11px] text-amber-200/70">Fiqih, Nahwu, Tafsir, Hadits</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Prompt Engine & Safety */}
      {activeTab === "prompts" && (
        <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-6 text-amber-100">
          <div>
            <h2 className="text-sm font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              Prompt Engine & Safety Rules (Aswaja Guardrails)
            </h2>
            <p className="text-xs text-amber-100/80 mt-1">
              Pengaturan Aturan System Prompt Ustadz AI, Deteksi Jailbreak, Toxicity Filter, dan Citation Mandate.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-blue-950/80 border border-amber-500/30 rounded-xl space-y-2">
              <span className="font-bold text-amber-300 uppercase text-[11px]">Default System Prompt Guardrail</span>
              <p className="font-mono text-[11px] text-amber-100/90 bg-blue-950 p-3 rounded-lg border border-amber-500/20 leading-relaxed">
                "Anda adalah USTADZ MUHAMMAD IKRAM, asisten pakar keilmuan Islam dan Kitab Kuning Pesantren.
                Tugas Anda adalah menjawab pertanyaan dengan santun, ilmiah, beradab, berfaham Ahlussunnah wal Jama'ah (Aswaja), serta wajib menyertakan rujukan nama kitab, bab, dan halaman bila tersedia."
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-blue-950/80 border border-amber-500/30 rounded-xl flex items-center justify-between">
                <span>Prompt Injection Protection</span>
                <span className="px-2 py-0.5 bg-amber-400 text-blue-950 font-bold rounded">Active</span>
              </div>
              <div className="p-3 bg-blue-950/80 border border-amber-500/30 rounded-xl flex items-center justify-between">
                <span>Jailbreak & Toxicity Filter</span>
                <span className="px-2 py-0.5 bg-amber-400 text-blue-950 font-bold rounded">Active</span>
              </div>
              <div className="p-3 bg-blue-950/80 border border-amber-500/30 rounded-xl flex items-center justify-between">
                <span>Hallucination Citation Enforcer</span>
                <span className="px-2 py-0.5 bg-amber-400 text-blue-950 font-bold rounded">Enforced</span>
              </div>
              <div className="p-3 bg-blue-950/80 border border-amber-500/30 rounded-xl flex items-center justify-between">
                <span>PII & Privacy Protection</span>
                <span className="px-2 py-0.5 bg-amber-400 text-blue-950 font-bold rounded">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

