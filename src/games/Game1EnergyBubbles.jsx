import React, { useCallback, useEffect, useRef, useState } from "react";
import { PlayCircle, RotateCcw, Zap } from "lucide-react";
import soundEffects from "../lib/soundEffects.js";
import { burstConfetti, smallConfetti } from "../lib/confettiEffects.js";

const POSITIVE_TEXTS = [
  "Tin tưởng vào bản thân",
  "Mạnh dạn phát biểu",
  "Mạnh dạn bày tỏ cảm xúc",
  "Chủ động tham gia hoạt động tập thể",
];

const NEGATIVE_TEXTS = ["Rụt rè không dám giơ tay", "Sợ hãi khi nói trước đám đông"];

let bubbleUid = 0;

export default function Game1EnergyBubbles() {
  const [energy, setEnergy] = useState(0);
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [jumpTick, setJumpTick] = useState(0);
  const [toast, setToast] = useState(null);
  const gameAreaRef = useRef(null);
  const spawnTimerRef = useRef(null);
  const toastTimerRef = useRef(null);

  const clearSpawnTimer = () => {
    if (spawnTimerRef.current) {
      clearInterval(spawnTimerRef.current);
      spawnTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearSpawnTimer();
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const spawnBubble = useCallback(() => {
    setBubbles((prev) => {
      if (prev.length >= 6) return prev;
      const isPositive = Math.random() < 0.65;
      const pool = isPositive ? POSITIVE_TEXTS : NEGATIVE_TEXTS;
      const text = pool[Math.floor(Math.random() * pool.length)];
      const bubble = {
        id: ++bubbleUid,
        type: isPositive ? "positive" : "negative",
        text,
        left: 6 + Math.random() * 82,
        duration: 6.5 + Math.random() * 2.5,
      };
      return [...prev, bubble];
    });
  }, []);

  const handleStart = () => {
    soundEffects.click();
    setStarted(true);
    setWon(false);
    setEnergy(0);
    setBubbles([]);
    clearSpawnTimer();
    spawnTimerRef.current = setInterval(spawnBubble, 1000);
  };

  const handleReset = () => {
    soundEffects.click();
    clearSpawnTimer();
    setStarted(false);
    setWon(false);
    setEnergy(0);
    setBubbles([]);
    setToast(null);
  };

  const showToast = (message) => {
    setToast(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 1600);
  };

  const popBubble = (bubble, e) => {
    setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));

    if (bubble.type === "positive") {
      soundEffects.correct();
      setJumpTick((t) => t + 1);
      if (gameAreaRef.current && e) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        smallConfetti(x, y);
      }
      setEnergy((prev) => {
        const next = Math.min(100, prev + 20);
        if (next >= 100) {
          setWon(true);
          setStarted(false);
          clearSpawnTimer();
          setTimeout(() => {
            soundEffects.win();
            burstConfetti();
          }, 150);
        }
        return next;
      });
    } else {
      soundEffects.wrong();
      showToast("Hãy suy nghĩ tích cực lên nhé! 💪");
      setEnergy((prev) => Math.max(0, prev - 10));
    }
  };

  const handleBubbleAnimEnd = (id) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-5 sm:py-8">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl text-confidence-purple mb-1">
          🦖 NẠP NĂNG LƯỢNG TỰ TIN
        </h2>
        <p className="text-sm sm:text-lg text-slate-600 font-semibold">
          Chạm vào bong bóng tích cực để nạp đầy năng lượng cho khủng long!
        </p>
      </div>

      {/* Energy bar */}
      <div className="max-w-2xl mx-auto mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-display font-bold text-sm sm:text-lg text-confidence-purple flex items-center gap-1.5">
            <Zap className="w-5 h-5 text-confidence-yellow" fill="currentColor" />
            Thanh Năng Lượng Tự Tin
          </span>
          <span className="font-display font-extrabold text-sm sm:text-lg text-confidence-orange">{energy}%</span>
        </div>
        <div className="h-7 sm:h-9 rounded-full bg-white border-4 border-confidence-purple/20 overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-confidence-yellow via-confidence-orange to-confidence-pink transition-all duration-500 ease-out flex items-center justify-end pr-2"
            style={{ width: `${energy}%` }}
          >
            {energy > 15 && <span className="text-sm sm:text-base">⚡</span>}
          </div>
        </div>
      </div>

      {/* Game area */}
      <div
        ref={gameAreaRef}
        className="relative w-full h-[46vh] sm:h-[52vh] rounded-3xl bg-gradient-to-b from-sky-100 to-emerald-50 border-4 border-confidence-purple/15 overflow-hidden shadow-lg"
      >
        {/* toast */}
        {toast && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-red-100 border-2 border-red-300 text-red-700 font-bold px-4 py-2 rounded-2xl text-sm sm:text-base animate-pop shadow-lg">
            {toast}
          </div>
        )}

        {/* start overlay */}
        {!started && !won && energy === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20 bg-white/40 backdrop-blur-sm">
            <div className="text-7xl sm:text-8xl animate-bounce-slow">🦖</div>
            <button
              onClick={handleStart}
              className="flex items-center gap-2 bg-confidence-green hover:bg-emerald-600 text-white font-display font-extrabold text-lg sm:text-2xl px-8 sm:px-10 py-4 sm:py-5 rounded-full shadow-xl active:scale-95 transition-all"
            >
              <PlayCircle className="w-7 h-7 sm:w-8 sm:h-8" />
              Bắt đầu
            </button>
          </div>
        )}

        {/* paused mid-game (energy lost to 0 shouldn't show start again automatically) */}
        {!started && !won && energy > 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20 bg-white/50 backdrop-blur-sm">
            <button
              onClick={handleStart}
              className="flex items-center gap-2 bg-confidence-blue hover:bg-blue-600 text-white font-display font-extrabold text-lg sm:text-2xl px-8 py-4 rounded-full shadow-xl active:scale-95 transition-all"
            >
              <PlayCircle className="w-7 h-7" />
              Chơi tiếp
            </button>
          </div>
        )}

        {/* bubbles */}
        {bubbles.map((b) => (
          <button
            key={b.id}
            onClick={(e) => popBubble(b, e)}
            onAnimationEnd={() => handleBubbleAnimEnd(b.id)}
            style={{
              left: `${b.left}%`,
              animationDuration: `${b.duration}s`,
            }}
            className={`absolute top-0 animate-float-down w-28 sm:w-36 md:w-40 px-2 py-3 rounded-full text-center font-display font-bold text-sm sm:text-base shadow-lg border-4 active:scale-90 transition-transform z-10 ${
              b.type === "positive"
                ? "bg-gradient-to-br from-confidence-yellow to-confidence-green text-slate-800 border-white"
                : "bg-gradient-to-br from-slate-500 to-slate-700 text-white border-slate-300"
            }`}
          >
            <div className="text-lg sm:text-xl mb-0.5">{b.type === "positive" ? "😊" : "😢"}</div>
            {b.text}
          </button>
        ))}

        {/* dino */}
        <div
          key={jumpTick}
          className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-7xl sm:text-9xl select-none pointer-events-none animate-bounce-slow"
        >
          🦖
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-white border-2 border-confidence-purple/30 hover:border-confidence-purple/60 text-confidence-purple font-display font-bold px-5 py-2.5 rounded-2xl active:scale-95 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Chơi lại
        </button>
      </div>

      {/* Win modal */}
      {won && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-2xl w-full text-center shadow-2xl border-4 border-confidence-yellow animate-pop">
            <div className="text-7xl sm:text-8xl mb-4">🎉🦖🎉</div>
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-confidence-purple mb-4">
              Năng lượng đã đầy 100%!
            </h3>
            <p className="text-base sm:text-xl text-slate-700 font-semibold mb-6 leading-relaxed">
              Vậy làm sao để giữ thanh năng lượng tự tin luôn đầy? Chúng ta cùng khám phá các cách
              rèn luyện sự tự tin ở Tiết 2 nhé!
            </p>
            <button
              onClick={handleReset}
              className="bg-confidence-purple hover:bg-purple-700 text-white font-display font-extrabold text-lg sm:text-xl px-8 py-4 rounded-full shadow-lg active:scale-95 transition-all"
            >
              Tuyệt vời! Chơi lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
