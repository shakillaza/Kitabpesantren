import React, { useState } from "react";
import { Key, ShieldCheck, X, RefreshCw } from "lucide-react";
import { LicenseInfo } from "../types";

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  license: LicenseInfo;
  onUpdateLicense: (info: LicenseInfo) => void;
}

export const LicenseModal: React.FC<LicenseModalProps> = ({
  isOpen,
  onClose,
  license,
  onUpdateLicense,
}) => {
  const [inputKey, setInputKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim() || loading) return;

    setLoading(true);
    setMsg(null);

    try {
      const response = await fetch("/api/license/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseKey: inputKey,
          deviceId: "FP-WEB-CURRENT",
          deviceName: "Primary Device Session",
          os: "Web Client",
        }),
      });

      const data = await response.json();
      if (!data.valid) {
        setMsg(data.message || "Kode Lisensi tidak valid.");
      } else {
        onUpdateLicense({
          isLicensed: true,
          key: inputKey,
          tier: data.tier,
          expiresAt: data.expiresAt,
          licensedTo: data.licensedTo,
          tokenQuota: data.tokenQuota,
          tokenUsed: 12500,
        });
        onClose();
      }
    } catch (err: any) {
      setMsg(`Gagal memverifikasi: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-blue-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-950 via-red-950 to-amber-950 rounded-2xl max-w-md w-full p-6 space-y-4 border border-amber-500/40 shadow-2xl text-amber-100">
        <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-amber-200 text-sm">Status & Aktivasi Lisensi</h3>
          </div>
          <button onClick={onClose} className="text-amber-400 hover:text-amber-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Info */}
        <div className="bg-blue-950/80 text-amber-100 p-4 rounded-xl space-y-2 border border-amber-400/40">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
            Paket Lisensi Saat Ini
          </span>
          <p className="font-extrabold text-base text-amber-200">{license.tier}</p>
          <div className="text-[11px] text-amber-100/80 space-y-0.5 border-t border-amber-500/30 pt-2">
            <p>Terdaftar: {license.licensedTo}</p>
            <p>Berlaku Sampai: {license.expiresAt}</p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleActivate} className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-amber-300 block mb-1">Kode Lisensi Baru</label>
            <input
              type="text"
              required
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Contoh: SHAQILA-VIP-999"
              className="w-full uppercase font-mono p-2.5 bg-blue-950/80 border border-amber-400/40 rounded-xl text-amber-100 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {msg && <p className="text-amber-100 font-bold bg-red-900/80 p-2 rounded-lg text-xs border border-red-500">{msg}</p>}

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-900/60 text-amber-200 rounded-xl font-bold border border-amber-400/30"
            >
              Tutup
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-extrabold rounded-xl flex items-center gap-1.5 shadow"
            >
              {loading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-950" />
              ) : (
                <Key className="w-3.5 h-3.5 text-blue-950" />
              )}
              <span>Aktifkan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
