import React, { useState } from 'react';
import { Trash2, Check, X, Loader2 } from 'lucide-react';

export default function InlineDeleteAction({ studentId, studentName, onDelete, isDeleting }) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    onDelete(studentId);
  };

  if (isConfirming) {
    return (
      <div className="inline-flex items-center gap-1.5 p-1 bg-rose-50 border border-rose-200 rounded-lg animate-in fade-in duration-200">
        <span className="text-xs font-semibold text-rose-700 px-1 hidden sm:inline">
          Delete?
        </span>
        <button
          onClick={handleConfirm}
          disabled={isDeleting}
          title={`Confirm delete ${studentName || 'student'}`}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-md transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
        >
          {isDeleting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Yes</span>
            </>
          )}
        </button>
        <button
          onClick={() => setIsConfirming(false)}
          disabled={isDeleting}
          title="Cancel delete"
          className="p-1 text-slate-500 hover:text-slate-800 hover:bg-rose-100 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      title="Delete student"
      className="inline-flex items-center gap-1 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
    >
      <Trash2 className="w-4 h-4" />
      <span className="sr-only">Delete</span>
    </button>
  );
}
