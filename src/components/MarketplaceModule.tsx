import React, { useState } from "react";
import {
  ShoppingBag,
  Key,
  ShieldCheck,
  Check,
  Sparkles,
  RefreshCw,
  Building2,
  User,
  GraduationCap,
  CreditCard,
  QrCode,
  Tag,
  Download,
  Laptop,
  LogOut,
  PlusCircle,
  FileText,
  DollarSign,
  Layers,
  BookOpen,
} from "lucide-react";
import { LicenseInfo, DeviceBinding, MarketplaceDigitalProduct, CommercialTransaction } from "../types";

interface MarketplaceProps {
  license: LicenseInfo;
  onUpdateLicense: (info: LicenseInfo) => void;
}

export const MarketplaceModule: React.FC<MarketplaceProps> = ({
  license,
  onUpdateLicense,
}) => {
  const [activeTab, setActiveTab] = useState<"subscriptions" | "digital_store" | "checkout" | "devices">("subscriptions");
  const [inputKey, setInputKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; success: boolean } | null>(null);

  // Checkout State
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<{ name: string; priceIdr: number } | null>(null);
  const [customerName, setCustomerName] = useState("Ustadz Ahmad Syarif");
  const [customerEmail, setCustomerEmail] = useState("ustadz.syarif@pesantren.ac.id");
  const [couponInput, setCouponInput] = useState("SHAQILA99");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number; amount: number } | null>({ code: "SHAQILA99", percent: 20, amount: 50000 });
  const [paymentMethod, setPaymentMethod] = useState<"QRIS" | "Virtual Account BNI" | "Virtual Account Mandiri" | "Credit Card">("QRIS");
  const [checkoutResult, setCheckoutResult] = useState<CommercialTransaction | null>(null);

  // Device Binding State
  const [boundDevices, setBoundDevices] = useState<DeviceBinding[]>([
    { id: "dev-1", deviceId: "FP-MAC-98721", deviceName: "MacBook Pro Ustadz Syarif", os: "macOS Sonoma", browser: "Chrome 128", ipAddress: "180.252.19.12", activationTime: "2026-01-10", lastActive: "2026-08-09", isPrimary: true },
    { id: "dev-2", deviceId: "FP-WIN-44102", deviceName: "PC Lab Santri 01", os: "Windows 11 Pro", browser: "Edge 126", ipAddress: "180.252.19.14", activationTime: "2026-02-01", lastActive: "2026-08-08", isPrimary: false },
    { id: "dev-3", deviceId: "FP-ANDROID-1192", deviceName: "Samsung Galaxy Tab S9", os: "Android 14", browser: "Shaqila App", ipAddress: "36.85.120.4", activationTime: "2026-05-12", lastActive: "2026-08-09", isPrimary: false },
  ]);

  // Digital Products Catalog
  const digitalCatalog: MarketplaceDigitalProduct[] = [
    {
      id: "prod-1",
      title: "Bundle Kitab Gundul Turots 100+ Syarah Rare Edition",
      category: "Kitab Digital",
      authorOrVendor: "Pustaka Turots Nusantara",
      priceIdr: 150000,
      originalPriceIdr: 300000,
      rating: 4.9,
      salesCount: 1240,
      description: "Naskah digital resolusi tinggi lengkap dengan catatan pinggir (hasyiyah) dan makna gandul Jawa Pegon.",
      badge: "Terlaris",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    },
    {
      id: "prod-2",
      title: "Pack Prompt AI Ustadz: 50 System Prompts Bahsul Masail",
      category: "Prompt Package",
      authorOrVendor: "SHAQILA AI Lab",
      priceIdr: 75000,
      originalPriceIdr: 120000,
      rating: 4.8,
      salesCount: 890,
      description: "Kumpulan prompt tersetel presisi untuk analisis hukum fiqih muamalah, i'rab Alfiyah, dan takhrij hadits shahih.",
      badge: "Verified AI Prompt",
      coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
    },
    {
      id: "prod-3",
      title: "Plugin Syarat Nahwu Sharaf Visualizer for Classroom",
      category: "Plugin AI",
      authorOrVendor: "Gus Dev Studio",
      priceIdr: 199000,
      originalPriceIdr: 299000,
      rating: 5.0,
      salesCount: 450,
      description: "Modul visual diagram i'rab pohon sintaksis interaktif untuk diproyeksikan pada Smart Board TV Pesantren.",
      badge: "Plugin Resmi",
      coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
    },
    {
      id: "prod-4",
      title: "Paket Kuota Tambahan 1.000.000 Gemini AI Tokens",
      category: "Paket Kuota AI",
      authorOrVendor: "SHAQILA Cloud",
      priceIdr: 99000,
      rating: 4.9,
      salesCount: 2150,
      description: "Top-up kuota token AI tanpa batas masa berlaku untuk pemakaian analisis kitab skala besar.",
      badge: "Top-Up Kuota",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    },
  ];

  const plans = [
    {
      name: "Santri Basic",
      price: "Gratis",
      priceIdr: 0,
      period: "Selamanya",
      icon: User,
      badge: "Free Tier",
      badgeColor: "bg-slate-200 text-slate-800",
      features: [
        "Akses Perpustakaan Kitab Basic",
        "5x Chat AI Ustadz per hari",
        "3x OCR Kitab Gundul per hari",
        "Akses Forum Santri",
      ],
      buttonText: "Paket Aktif",
      disabled: true,
    },
    {
      name: "Ustadz Pro",
      price: "Rp 49.000",
      priceIdr: 49000,
      period: "/ bulan",
      icon: GraduationCap,
      badge: "Populer",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      features: [
        "Perpustakaan Kitab Turots Lengkap",
        "100x Chat AI Ustadz per hari",
        "50x OCR & Harakat Restoration",
        "AI Nahwu & Sharaf Sentence Parser",
        "AI Hafalan & Quiz Evaluator",
      ],
      buttonText: "Beli Paket Pro (Checkout Online)",
      keySample: "SHAQILA-PRO-888",
    },
    {
      name: "Pesantren Enterprise VIP",
      price: "Rp 299.000",
      priceIdr: 299000,
      period: "/ bulan (Multi-User)",
      icon: Building2,
      badge: "Rekomendasi Pesantren",
      badgeColor: "bg-amber-400 text-emerald-950 font-bold",
      features: [
        "Akses Seluruh Modul AI Kitab Tanpa Batas",
        "Unlimited OCR & Restorasi Harakat Manuskrip",
        "Lisensi Multi-User Santri & Ustadz (s/d 500 Akun)",
        "Database Bahsul Masail Pesantren Custom",
        "Prioritas Dukungan Teknis 24/7 & Training",
      ],
      buttonText: "Beli Paket Enterprise VIP",
      keySample: "SHAQILA-VIP-999",
    },
  ];

  const handleVerifyKey = async (e?: React.FormEvent, customKey?: string) => {
    if (e) e.preventDefault();
    const keyToUse = customKey || inputKey;
    if (!keyToUse.trim() || loading) return;

    setLoading(true);
    setMsg(null);

    try {
      const response = await fetch("/api/license/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseKey: keyToUse,
          deviceId: "FP-WEB-CURRENT",
          deviceName: "Primary Browser Session",
          os: "Web Application",
        }),
      });

      const data = await response.json();
      if (!data.valid) {
        setMsg({ text: data.message || "Kode Lisensi tidak valid", success: false });
      } else {
        setMsg({ text: `Selamat! Lisensi ${data.tier} terverifikasi secara online!`, success: true });
        onUpdateLicense({
          isLicensed: true,
          key: keyToUse,
          tier: data.tier,
          expiresAt: data.expiresAt,
          licensedTo: data.licensedTo,
          tokenQuota: data.tokenQuota,
          tokenUsed: 12500,
        });
        if (data.activeDevices) {
          setBoundDevices(data.activeDevices);
        }
      }
    } catch (err: any) {
      setMsg({ text: `Gagal memverifikasi: ${err.message}`, success: false });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput }),
      });
      const data = await res.json();
      if (data.valid) {
        const c = data.coupon;
        setAppliedDiscount({
          code: c.code,
          percent: c.discountPercent,
          amount: Math.min(Math.round(((selectedPlanForCheckout?.priceIdr || 299000) * c.discountPercent) / 100), c.maxDiscountIdr),
        });
      } else {
        alert(data.message || "Voucher tidak valid");
      }
    } catch (e) {
      alert("Gagal memvalidasi kupon");
    }
  };

  const handleExecuteCheckout = async () => {
    setLoading(true);
    try {
      const amount = selectedPlanForCheckout?.priceIdr || 299000;
      const res = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          planName: selectedPlanForCheckout?.name || "Pesantren Enterprise VIP",
          amountIdr: amount,
          couponCode: appliedDiscount?.code,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCheckoutResult(data.transaction);
        if (data.activatedLicenseKey) {
          onUpdateLicense({
            isLicensed: true,
            key: data.activatedLicenseKey,
            tier: data.transaction.planName,
            expiresAt: "2027-12-31",
            licensedTo: customerName,
            tokenQuota: 5000000,
            tokenUsed: 0,
          });
        }
      }
    } catch (e: any) {
      alert("Gagal memproses pembayaran online.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnbindDevice = async (devId: string) => {
    try {
      await fetch("/api/license/devices/unbind", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey: license.key, deviceBindingId: devId }),
      });
      setBoundDevices((prev) => prev.filter((d) => d.id !== devId));
    } catch (e) {
      setBoundDevices((prev) => prev.filter((d) => d.id !== devId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-red-950 to-amber-950 text-amber-100 p-5 rounded-2xl border border-amber-500/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-blue-950 flex items-center justify-center font-bold shadow">
            <ShoppingBag className="w-5 h-5 text-blue-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-amber-200">Marketplace, Payment Gateway & License Management</h1>
            <p className="text-xs text-amber-100/80">
              Checkout langganan online (Midtrans/QRIS), aktivasi lisensi resmi, toko produk digital, dan kelola perangkat terikat.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "subscriptions"
                ? "bg-amber-400 text-blue-950 shadow"
                : "bg-blue-950/80 text-amber-200 border border-amber-400/30"
            }`}
          >
            Paket & Lisensi
          </button>
          <button
            onClick={() => setActiveTab("digital_store")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "digital_store"
                ? "bg-amber-400 text-blue-950 shadow"
                : "bg-blue-950/80 text-amber-200 border border-amber-400/30"
            }`}
          >
            Toko Digital
          </button>
          <button
            onClick={() => setActiveTab("devices")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "devices"
                ? "bg-amber-400 text-blue-950 shadow"
                : "bg-blue-950/80 text-amber-200 border border-amber-400/30"
            }`}
          >
            Perangkat Terikat ({boundDevices.length})
          </button>
        </div>
      </div>

      {/* Active License Status Card */}
      <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/30 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-red-900/60 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
              Status Lisensi Aktif
            </span>
            <h2 className="text-xl font-bold text-amber-200 mt-1">{license.tier}</h2>
            <p className="text-xs text-amber-100/80">Terdaftar Atas Nama: {license.licensedTo}</p>
          </div>

          <div className="bg-blue-950/80 p-3 rounded-xl border border-amber-400/30 text-xs space-y-1">
            <div className="flex items-center justify-between gap-4 text-amber-200/80">
              <span>Masa Berlaku:</span>
              <span className="font-bold text-amber-100">{license.expiresAt}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-amber-200/80">
              <span>Kuota AI Tokens:</span>
              <span className="font-bold text-amber-300">{license.tokenQuota.toLocaleString()} Tokens</span>
            </div>
          </div>
        </div>

        {/* Input Activation Form */}
        <form onSubmit={handleVerifyKey} className="space-y-3 pt-2">
          <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
            <Key className="w-4 h-4 text-amber-400" />
            Aktivasi Kode Lisensi Baru (Online Validation)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Masukkan Kode Lisensi (Contoh: SHAQILA-VIP-999)"
              className="flex-1 uppercase font-mono px-4 py-2.5 text-xs sm:text-sm bg-blue-950/80 border border-amber-400/40 rounded-xl text-amber-100 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              disabled={loading || !inputKey.trim()}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-blue-950 px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-950" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-blue-950" />
                  <span>Verifikasi & Aktifkan</span>
                </>
              )}
            </button>
          </div>

          {msg && (
            <p
              className={`text-xs font-bold p-3 rounded-xl ${
                msg.success ? "bg-amber-400 text-blue-950 border border-amber-300" : "bg-red-900/80 text-amber-100 border border-red-500"
              }`}
            >
              {msg.text}
            </p>
          )}
        </form>
      </div>

      {/* TAB 1: Subscriptions & Pricing Plans */}
      {activeTab === "subscriptions" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <div
                key={i}
                className={`bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 rounded-2xl p-6 border shadow-xl space-y-4 flex flex-col justify-between text-amber-100 ${
                  plan.badge.includes("VIP") ? "border-amber-400 ring-2 ring-amber-400/30" : "border-amber-500/30"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5 text-blue-950" />
                    </div>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold border bg-red-900/60 border-amber-400/30 text-amber-200`}>
                      {plan.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-amber-200">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-extrabold text-amber-300">{plan.price}</span>
                      <span className="text-xs text-amber-200/70 font-medium">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 border-t border-amber-500/30 pt-3 text-xs text-amber-100">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.priceIdr > 0 ? (
                  <button
                    onClick={() => {
                      setSelectedPlanForCheckout({ name: plan.name, priceIdr: plan.priceIdr });
                      setActiveTab("checkout");
                    }}
                    className="w-full mt-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-blue-950" />
                    <span>Checkout Online (QRIS / Midtrans)</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full mt-4 bg-blue-950/60 text-amber-200/50 font-bold py-2.5 rounded-xl text-xs border border-amber-500/20"
                  >
                    {plan.buttonText}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Digital Store Catalog */}
      {activeTab === "digital_store" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Toko Kitab Digital, Prompt Package & Plugin AI
            </h2>
            <span className="text-xs text-amber-300 font-bold">4 Produk Tersedia</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {digitalCatalog.map((prod) => (
              <div
                key={prod.id}
                className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 rounded-2xl border border-amber-500/30 overflow-hidden shadow-xl flex flex-col justify-between text-amber-100"
              >
                <div>
                  <div className="relative h-32 overflow-hidden bg-blue-950">
                    <img src={prod.coverImage} alt={prod.title} className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-300" />
                    {prod.badge && (
                      <span className="absolute top-2 right-2 bg-amber-400 text-blue-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                        {prod.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] text-amber-300 font-bold uppercase">{prod.category}</span>
                    <h3 className="font-bold text-xs text-amber-200 line-clamp-2">{prod.title}</h3>
                    <p className="text-[11px] text-amber-100/70 line-clamp-2">{prod.description}</p>
                    <div className="pt-2 flex items-baseline justify-between">
                      <span className="text-sm font-extrabold text-amber-300">Rp {prod.priceIdr.toLocaleString("id-ID")}</span>
                      {prod.originalPriceIdr && (
                        <span className="text-[10px] text-amber-200/50 line-through">Rp {prod.originalPriceIdr.toLocaleString("id-ID")}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      setSelectedPlanForCheckout({ name: prod.title, priceIdr: prod.priceIdr });
                      setActiveTab("checkout");
                    }}
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 shadow cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-blue-950" />
                    <span>Beli Sekarang</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Checkout Online & Payment Gateway */}
      {activeTab === "checkout" && (
        <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-6 text-amber-100 max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-4">
            <div>
              <h2 className="text-base font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                Checkout & Interactive Payment Gateway
              </h2>
              <p className="text-xs text-amber-100/80">Proses tagihan resmi dengan PPN 11% dan aktivasi lisensi otomatis.</p>
            </div>
            <button onClick={() => setActiveTab("subscriptions")} className="text-xs text-amber-300 hover:underline">
              ← Kembali
            </button>
          </div>

          {!checkoutResult ? (
            <div className="space-y-4">
              {/* Product Summary */}
              <div className="p-4 bg-blue-950/80 border border-amber-400/40 rounded-xl space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase text-amber-300">Item Dipilih</span>
                <div className="flex justify-between items-center text-sm font-bold text-amber-200">
                  <span>{selectedPlanForCheckout?.name || "Pesantren Enterprise VIP"}</span>
                  <span>Rp {(selectedPlanForCheckout?.priceIdr || 299000).toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Customer Info Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-amber-300 block mb-1">Nama Pembeli / Lembaga</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 bg-blue-950 border border-amber-400/30 rounded-xl text-amber-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-amber-300 block mb-1">Email Tagihan & Invoice</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full p-2.5 bg-blue-950 border border-amber-400/30 rounded-xl text-amber-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Voucher Input */}
              <div className="p-3 bg-blue-950/80 border border-amber-500/30 rounded-xl space-y-2 text-xs">
                <label className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  Gunakan Voucher Diskon
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Contoh: SHAQILA99"
                    className="flex-1 uppercase font-mono p-2 bg-blue-950 border border-amber-400/30 rounded-lg text-amber-100 text-xs"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-blue-900 hover:bg-red-900/80 border border-amber-400/30 text-amber-200 px-4 py-2 rounded-lg font-bold text-xs"
                  >
                    Gunakan
                  </button>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2 text-xs">
                <label className="font-bold text-amber-300 block">Pilih Metode Pembayaran</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["QRIS", "Virtual Account BNI", "Virtual Account Mandiri", "Credit Card"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                        paymentMethod === m
                          ? "bg-amber-400 text-blue-950 border-amber-300 shadow"
                          : "bg-blue-950/60 text-amber-200 border-amber-500/20 hover:border-amber-400/40"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Calculation */}
              <div className="p-4 bg-blue-950 border border-amber-500/30 rounded-xl text-xs space-y-1.5">
                <div className="flex justify-between text-amber-200/80">
                  <span>Harga Subtotal:</span>
                  <span>Rp {(selectedPlanForCheckout?.priceIdr || 299000).toLocaleString("id-ID")}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-amber-300 font-bold">
                    <span>Diskon Voucher ({appliedDiscount.code}):</span>
                    <span>- Rp {appliedDiscount.amount.toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div className="flex justify-between text-amber-200/80">
                  <span>PPN 11%:</span>
                  <span>Rp {Math.round(((selectedPlanForCheckout?.priceIdr || 299000) - (appliedDiscount?.amount || 0)) * 0.11).toLocaleString("id-ID")}</span>
                </div>
                <div className="border-t border-amber-500/30 pt-2 flex justify-between text-base font-extrabold text-amber-200">
                  <span>Total Tagihan:</span>
                  <span>
                    Rp{" "}
                    {(
                      Math.round(((selectedPlanForCheckout?.priceIdr || 299000) - (appliedDiscount?.amount || 0)) * 1.11)
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <button
                onClick={handleExecuteCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-extrabold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-950" />
                ) : (
                  <QrCode className="w-4 h-4 text-blue-950" />
                )}
                <span>Bayar Sekarang & Aktifkan Lisensi</span>
              </button>
            </div>
          ) : (
            /* Invoice & QRIS Payment Success Display */
            <div className="space-y-4 text-xs bg-blue-950 p-5 rounded-xl border border-amber-400/50">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <span className="font-extrabold text-amber-300 text-sm">INVOICE PEMBAYARAN SUKSES</span>
                <span className="px-2.5 py-0.5 bg-amber-400 text-blue-950 font-extrabold rounded-full text-[10px]">PAID</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-amber-100/90">
                <p>No Invoice: <span className="font-mono font-bold text-amber-200">{checkoutResult.invoiceNumber}</span></p>
                <p>Waktu: <span className="font-bold text-amber-200">{checkoutResult.paidAt}</span></p>
                <p>Pembeli: <span className="font-bold text-amber-200">{checkoutResult.customerName}</span></p>
                <p>Metode: <span className="font-bold text-amber-300">{checkoutResult.paymentMethod}</span></p>
              </div>

              {checkoutResult.qrisPayloadUrl && (
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl text-slate-900 my-2">
                  <p className="text-[10px] font-bold text-slate-500 mb-1">QRIS NATIONAL PAYMENT VERIFIED</p>
                  <img src={checkoutResult.qrisPayloadUrl} alt="QRIS Code" className="w-36 h-36" />
                  <span className="text-xs font-extrabold text-emerald-800 mt-1">Status: Terverifikasi Otomatis</span>
                </div>
              )}

              <div className="p-3 bg-red-950/80 border border-amber-400/40 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-amber-300 uppercase">KODE LISENSI RESMI DITERBITKAN:</span>
                <p className="font-mono text-base font-extrabold text-amber-200 tracking-wider">
                  {checkoutResult.licenseKeyGenerated}
                </p>
                <p className="text-[10px] text-amber-100/80">Lisensi telah otomatis terpasang pada akun Anda.</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => alert(`Unduh PDF Invoice ${checkoutResult.invoiceNumber}...`)}
                  className="flex-1 bg-blue-900 border border-amber-400/30 text-amber-200 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Unduh PDF Invoice</span>
                </button>
                <button
                  onClick={() => {
                    setCheckoutResult(null);
                    setActiveTab("subscriptions");
                  }}
                  className="bg-amber-400 text-blue-950 px-5 py-2 rounded-xl font-extrabold"
                >
                  Selesai
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Bound Devices Management */}
      {activeTab === "devices" && (
        <div className="bg-gradient-to-br from-blue-950/90 via-red-950/90 to-amber-950/90 p-6 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-amber-100">
          <div>
            <h2 className="text-sm font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
              <Laptop className="w-4 h-4 text-amber-400" />
              Perangkat Terikat dengan Lisensi Saat Ini
            </h2>
            <p className="text-xs text-amber-100/80 mt-1">
              Setiap lisensi membatasi jumlah perangkat aktif untuk mencegah penyalahgunaan. Hapus (unbind) perangkat lama bila ingin berpindah device.
            </p>
          </div>

          <div className="overflow-x-auto border border-amber-500/30 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-blue-950 text-amber-300 font-bold border-b border-amber-500/30">
                  <th className="p-3">Nama Perangkat</th>
                  <th className="p-3">Device Fingerprint ID</th>
                  <th className="p-3">Sistem Operasi</th>
                  <th className="p-3">Browser</th>
                  <th className="p-3">Terakhir Aktif</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {boundDevices.map((dev) => (
                  <tr key={dev.id} className="border-b border-amber-500/20 hover:bg-red-900/40 transition-colors">
                    <td className="p-3 font-bold text-amber-200 flex items-center gap-1.5">
                      <Laptop className="w-3.5 h-3.5 text-amber-400" />
                      {dev.deviceName}
                      {dev.isPrimary && <span className="text-[9px] bg-amber-400 text-blue-950 font-extrabold px-1.5 py-0.2 rounded">Primary</span>}
                    </td>
                    <td className="p-3 font-mono text-amber-300/80">{dev.deviceId}</td>
                    <td className="p-3 text-amber-100">{dev.os}</td>
                    <td className="p-3 text-amber-100">{dev.browser}</td>
                    <td className="p-3 font-mono text-amber-200/70">{dev.lastActive}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleUnbindDevice(dev.id)}
                        className="text-[10px] bg-red-900/80 hover:bg-red-800 text-amber-100 font-bold px-2.5 py-1 rounded-lg border border-red-500/40 flex items-center gap-1 cursor-pointer"
                      >
                        <LogOut className="w-3 h-3 text-amber-300" />
                        <span>Unbind</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

