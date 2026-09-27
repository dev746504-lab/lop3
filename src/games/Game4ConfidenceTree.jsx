import React, { useState } from "react";
import { Plus, Quote, X, HeartHandshake } from "lucide-react";
import soundEffects from "../lib/soundEffects.js";
import { smallConfetti } from "../lib/confettiEffects.js";

const QUESTIONS = [
  "Hãy kể 1 điểm mạnh hoặc điều em tự hào về bản thân",
  "Em sẽ làm gì ở nhà để rèn tính tự lập?",
  "Hãy tự tin giới thiệu tên và sở thích của em trước lớp",
  "Khi đến nơi đông người, em làm gì để thể hiện sự tự tin?",
  "Hãy dành 1 lời khen cho người bạn ngồi cạnh em",
];

const INITIAL_POSITIONS = [
  { x: 22, y: 30 },
  { x: 34, y: 18 },
  { x: 48, y: 12 },
  { x: 62, y: 17 },
  { x: 74, y: 28 },
  { x: 20, y: 46 },
  { x: 38, y: 40 },
  { x: 55, y: 36 },
  { x: 68, y: 44 },
  { x: 78, y: 42 },
];

const EXTRA_POOL = [
  { x: 46, y: 28 },
  { x: 30, y: 55 },
  { x: 60, y: 55 },
  { x: 42, y: 15 },
  { x: 15, y: 38 },
  { x: 84, y: 34 },
];

function TreeBackdrop() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMax meet">
      <defs>
        <radialGradient id="canopy" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#8FDC7F" />
          <stop offset="100%" stopColor="#3DAE5C" />
        </radialGradient>
        <linearGradient id="trunk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5A2B" />
          <stop offset="100%" stopColor="#6B4020" />
        </linearGradient>
      </defs>
      <path d="M185 400 L185 240 Q200 200 215 240 L215 400 Z" fill="url(#trunk)" />
      <path d="M185 260 Q140 240 120 280" stroke="#6B4020" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M215 260 Q260 240 280 280" stroke="#6B4020" strokeWidth="10" fill="none" strokeLinecap="round" />
      <ellipse cx="200" cy="160" rx="175" ry="130" fill="url(#canopy)" />
      <ellipse cx="120" cy="200" rx="90" ry="75" fill="url(#canopy)" opacity="0.9" />
      <ellipse cx="290" cy="200" rx="90" ry="75" fill="url(#canopy)" opacity="0.9" />
      <ellipse cx="200" cy="90" rx="120" ry="80" fill="url(#canopy)" opacity="0.95" />
    </svg>
  );
}

export default function Game4ConfidenceTree() {
  const [positions, setPositions] = useState(INITIAL_POSITIONS);
  const [blooms, setBlooms] = useState({}); // id -> { question, name }
  const [activeBud, setActiveBud] = useState(null); // { id, question }
  const [nameInput, setNameInput] = useState("");
  const [showQuote, setShowQuote] = useState(false);

  const addBud = () => {
    soundEffects.click();
    setPositions((prev) => {
      if (prev.length - INITIAL_POSITIONS.length >= EXTRA_POOL.length) return prev;
      const extraIdx = prev.length - INITIAL_POSITIONS.length;
      return [...prev, EXTRA_POOL[extraIdx]];
    });
  };

  const openBud = (id) => {
    if (blooms[id]) return;
    soundEffects.click();
    const question = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setActiveBud({ id, question });
    setNameInput("");
  };

  const closeModal = () => {
    setActiveBud(null);
    setNameInput("");
  };

  const bloomFlower = () => {
    if (!activeBud) return;
    soundEffects.applause();
    smallConfetti(0.5, 0.4);
    setBlooms((prev) => ({
      ...prev,
      [activeBud.id]: { question: activeBud.question, name: nameInput.trim() },
    }));
    setActiveBud(null);
    setNameInput("");
  };

  const bloomedCount = Object.keys(blooms).length;

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-5 sm:py-8">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl text-confidence-purple mb-1">
          🌳 CÂY TỰ TIN NỞ HOA
        </h2>
        <p className="text-sm sm:text-lg text-slate-600 font-semibold">
          Chạm vào một nụ hoa để mời bạn chia sẻ và nở hoa chúc mừng nhé!
        </p>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">
          Hoa đã nở: {bloomedCount} / {positions.length}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <button
          onClick={addBud}
          disabled={positions.length - INITIAL_POSITIONS.length >= EXTRA_POOL.length}
          className="flex items-center gap-2 bg-confidence-green hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-bold px-4 sm:px-5 py-2.5 rounded-2xl shadow active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" />
          Thêm nụ hoa
        </button>
        <button
          onClick={() => {
            soundEffects.click();
            setShowQuote(true);
          }}
          className="flex items-center gap-2 bg-confidence-purple hover:bg-purple-700 text-white font-display font-bold px-4 sm:px-5 py-2.5 rounded-2xl shadow active:scale-95 transition-all"
        >
          <Quote className="w-5 h-5" />
          Thông điệp tổng kết bài học
        </button>
      </div>

      <div className="relative w-full h-[52vh] sm:h-[60vh] rounded-3xl bg-gradient-to-b from-sky-100 to-lime-50 border-4 border-confidence-purple/10 overflow-hidden shadow-lg">
        <TreeBackdrop />

        {positions.map((pos, idx) => {
          const bloom = blooms[idx];
          return (
            <button
              key={idx}
              onClick={() => openBud(idx)}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all active:scale-90 ${
                bloom ? "cursor-default" : "hover:scale-110"
              }`}
            >
              <span className={`text-3xl sm:text-4xl md:text-5xl drop-shadow ${bloom ? "animate-bloom" : "animate-pulse"}`}>
                {bloom ? "🌸" : "🌱"}
              </span>
              {bloom && bloom.name && (
                <span className="mt-1 bg-white/95 text-confidence-purple font-display font-bold text-xs sm:text-sm px-2 py-0.5 rounded-full shadow whitespace-nowrap max-w-[110px] truncate">
                  {bloom.name}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeBud && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-xl w-full text-center shadow-2xl border-4 border-confidence-green animate-pop">
            <div className="text-6xl sm:text-7xl mb-3">🌱</div>
            <p className="text-lg sm:text-2xl font-bold text-slate-800 mb-6 leading-relaxed">
              {activeBud.question}
            </p>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Nhập tên học sinh vừa chia sẻ (không bắt buộc)"
              className="w-full mb-6 px-4 py-3 rounded-2xl border-2 border-confidence-green/30 focus:border-confidence-green outline-none text-center font-semibold text-base sm:text-lg"
            />
            <button
              onClick={bloomFlower}
              className="flex items-center justify-center gap-2 mx-auto bg-confidence-green hover:bg-emerald-600 text-white font-display font-extrabold text-lg sm:text-xl px-8 py-4 rounded-full shadow-lg active:scale-95 transition-all"
            >
              <HeartHandshake className="w-6 h-6" />
              Nở hoa &amp; Vỗ tay 👏
            </button>
            <button
              onClick={closeModal}
              className="mt-5 block mx-auto text-slate-400 hover:text-slate-600 font-semibold text-sm underline"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {showQuote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-confidence-purple to-confidence-blue p-6 cursor-pointer"
          onClick={() => setShowQuote(false)}
        >
          <div className="text-center max-w-3xl">
            <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-white/70 mx-auto mb-4" />
            <p className="font-display font-extrabold text-white text-2xl sm:text-4xl md:text-5xl leading-relaxed mb-6 animate-pop">
              "Chỉ cần tin tưởng là mình có thể làm được, bạn đã thành công được 50 phần trăm rồi đấy."
            </p>
            <p className="text-white/80 font-semibold text-lg sm:text-xl">— Theodore Roosevelt</p>
            <button
              onClick={() => setShowQuote(false)}
              className="absolute top-6 right-6 text-white/80 hover:text-white"
            >
              <X className="w-10 h-10" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
