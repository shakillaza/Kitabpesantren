import React from "react";
import { Bell, X, Sparkles, CheckCircle2 } from "lucide-react";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: "n-1",
      title: "Pembaruan Model Gemini AI 3.6 Flash",
      time: "10 menit lalu",
      desc: "Model AI Chat & Nahwu Parser telah diperbarui dengan peningkatan akurasi rujukan kitab Fathul Qarib dan Alfiyah.",
    },
    {
      id: "n-2",
      title: "Lisensi Pesantren VIP Aktif",
      time: "1 jam lalu",
      desc: "Akses tanpa batas untuk seluruh modul OCR Kitab Gundul dan Bahsul Masail telah aktif.",
    },
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-gradient-to-b from-blue-950 via-red-950 to-amber-950 border-l border-amber-500/40 shadow-2xl p-5 space-y-4 font-sans flex flex-col justify-between text-amber-100">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3 border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-200 font-bold text-sm">
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Pusat Notifikasi</span>
          </div>
          <button onClick={onClose} className="text-amber-400 hover:text-amber-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className="p-3 bg-blue-950/80 border border-amber-500/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {n.title}
                </span>
                <span className="text-[10px] text-amber-300/70">{n.time}</span>
              </div>
              <p className="text-[11px] text-amber-100/90 leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 py-2 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow"
      >
        <CheckCircle2 className="w-4 h-4 text-blue-950" />
        <span>Tandai Sudah Dibaca</span>
      </button>
    </div>
  );
};
