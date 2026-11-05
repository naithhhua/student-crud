import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X, Info } from 'lucide-react';

export default function NotificationToast({ notification, onClose }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  const { type, message } = notification;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md ${
          isSuccess
            ? 'bg-emerald-50/95 border-emerald-300 text-emerald-900 shadow-emerald-900/10'
            : isError
            ? 'bg-rose-50/95 border-rose-300 text-rose-900 shadow-rose-900/10'
            : 'bg-indigo-50/95 border-indigo-300 text-indigo-900 shadow-indigo-900/10'
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {isError && <AlertTriangle className="w-5 h-5 text-rose-600" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-600" />}
        </div>

        <div className="flex-1 text-sm font-medium leading-relaxed">
          {message}
        </div>

        <button
          onClick={onClose}
          className="shrink-0 p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
