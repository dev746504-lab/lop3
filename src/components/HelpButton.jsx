import React, { useState } from "react";
import { HelpCircle, X } from "lucide-react";
import soundEffects from "../lib/soundEffects.js";

export default function HelpButton({ title, steps, tip }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          soundEffects.click();
          setOpen(true);
        }}
        className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-confidence-purple hover:bg-purple-700 text-white shadow-xl border-4 border-white active:scale-90 transition-all animate-glow"
        title="Hướng dẫn chơi"
      >
        <span className="font-display font-extrabold text-2xl sm:text-3xl">?</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border-4 border-confidence-purple max-h-[85vh] overflow-y-auto animate-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-confidence-purple flex items-center gap-2">
                <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
                {title}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 shrink-0"
                title="Đóng"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <ol className="space-y-3">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-confidence-purple/10 text-confidence-purple font-display font-extrabold flex items-center justify-center text-sm sm:text-base">
                    {i + 1}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed pt-1">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            {tip && (
              <p className="mt-5 text-xs sm:text-sm text-slate-600 bg-confidence-yellow/15 rounded-2xl px-4 py-3 font-semibold">
                💡 {tip}
              </p>
            )}

            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full bg-confidence-purple hover:bg-purple-700 text-white font-display font-extrabold text-base sm:text-lg py-3 rounded-2xl active:scale-95 transition-all"
            >
              Đã hiểu, bắt đầu chơi!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
