import React, { useEffect, useRef, useState } from "react";
import { Gift, Check, TimerReset, PartyPopper, RotateCcw } from "lucide-react";
import soundEffects from "../lib/soundEffects.js";
import { burstConfetti } from "../lib/confettiEffects.js";

const BOXES = [
  { id: 1, challenge: "Cười thật tươi và vẫy tay chào các bạn xung quanh!" },
  { id: 2, challenge: "Đứng thẳng lưng, ưỡn ngực và hô thật to tên của chính mình!" },
  { id: 3, challenge: "Tạo một dáng đứng siêu anh hùng tự tin nhất trong 5 giây!" },
  { id: 4, challenge: "Quay sang đập tay (High-five) với bạn bên cạnh và nói: Bạn tuyệt lắm!" },
  { id: 5, challenge: "Giơ cao tay xung phong phát biểu với gương mặt rạng rỡ nhất!" },
  { id: 6, challenge: "Đặt tay lên ngực và nói dõng dạc: Tôi tin vào bản thân mình!" },
];

const BOX_COLORS = [
  "from-confidence-pink to-confidence-purple",
  "from-confidence-yellow to-confidence-orange",
  "from-confidence-blue to-confidence-purple",
  "from-confidence-green to-confidence-blue",
  "from-confidence-orange to-confidence-pink",
  "from-confidence-purple to-confidence-blue",
];

export default function Game2MysteryBoxes() {
  const [openedBoxes, setOpenedBoxes] = useState([]);
  const [activeBox, setActiveBox] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [counting, setCounting] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const openBox = (box) => {
    soundEffects.click();
    setActiveBox(box);
    setTimeLeft(10);
    setCounting(false);
    setFinished(false);
  };

  const closeModal = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveBox(null);
    setCounting(false);
    setFinished(false);
  };

  const finishChallenge = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCounting(false);
    setFinished(true);
    soundEffects.win();
    burstConfetti();
    setOpenedBoxes((prev) => (prev.includes(activeBox.id) ? prev : [...prev, activeBox.id]));
  };

  const startCountdown = () => {
    soundEffects.click();
    setCounting(true);
    setTimeLeft(10);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next <= 3 && next > 0) {
          soundEffects.countdownTick();
        }
        if (next <= 0) {
          clearInterval(intervalRef.current);
          soundEffects.countdownFinal();
          finishChallenge();
          return 0;
        }
        return next;
      });
    }, 1000);
  };

  const handleReset = () => {
    soundEffects.click();
    setOpenedBoxes([]);
    closeModal();
  };

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-5 sm:py-8">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl text-confidence-purple mb-1">
          🎁 HỘP QUÀ BÍ MẬT - BẮT CHƯỚC THẦN THÁI
        </h2>
        <p className="text-sm sm:text-lg text-slate-600 font-semibold">
          Chạm vào một hộp quà để nhận thử thách tự tin nhé!
        </p>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">
          Đã mở: {openedBoxes.length} / 6 hộp
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto">
        {BOXES.map((box, idx) => {
          const isOpened = openedBoxes.includes(box.id);
          return (
            <button
              key={box.id}
              onClick={() => openBox(box)}
              className={`relative aspect-square rounded-3xl flex flex-col items-center justify-center gap-2 shadow-xl border-4 border-white/60 bg-gradient-to-br ${BOX_COLORS[idx]} ${
                isOpened ? "opacity-60" : "animate-wiggle"
              } active:scale-90 transition-all hover:scale-105`}
            >
              {isOpened && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-confidence-green" strokeWidth={3} />
                </div>
              )}
              <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-lg" strokeWidth={2} />
              <span className="font-display font-extrabold text-white text-lg sm:text-2xl drop-shadow">
                {box.id}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-white border-2 border-confidence-purple/30 hover:border-confidence-purple/60 text-confidence-purple font-display font-bold px-5 py-2.5 rounded-2xl active:scale-95 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Đóng lại tất cả hộp quà
        </button>
      </div>

      {activeBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-xl w-full text-center shadow-2xl border-4 border-confidence-pink animate-pop">
            <div className="text-6xl sm:text-7xl mb-3">🎁</div>
            <h3 className="font-display font-extrabold text-lg sm:text-2xl text-confidence-purple mb-4">
              Hộp quà số {activeBox.id}
            </h3>
            <p className="text-lg sm:text-2xl font-bold text-slate-800 mb-6 leading-relaxed">
              {activeBox.challenge}
            </p>

            {!finished ? (
              <>
                <div
                  className={`mx-auto mb-6 w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center font-display font-extrabold text-4xl sm:text-5xl border-8 ${
                    timeLeft <= 3 && counting
                      ? "border-red-400 text-red-500 animate-shake"
                      : "border-confidence-purple/30 text-confidence-purple"
                  }`}
                >
                  {timeLeft}
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  {!counting && (
                    <button
                      onClick={startCountdown}
                      className="flex items-center justify-center gap-2 bg-confidence-green hover:bg-emerald-600 text-white font-display font-extrabold text-base sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg active:scale-95 transition-all"
                    >
                      <TimerReset className="w-6 h-6" />
                      Bắt đầu đếm
                    </button>
                  )}
                  <button
                    onClick={finishChallenge}
                    className="flex items-center justify-center gap-2 bg-confidence-orange hover:bg-orange-600 text-white font-display font-extrabold text-base sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg active:scale-95 transition-all"
                  >
                    <Check className="w-6 h-6" />
                    Hoàn thành sớm
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <PartyPopper className="w-16 h-16 text-confidence-yellow animate-bounce-slow" />
                <p className="font-display font-extrabold text-xl sm:text-2xl text-confidence-green">
                  Tuyệt vời! Con thật tự tin! 🎉
                </p>
              </div>
            )}

            <button
              onClick={closeModal}
              className="mt-6 text-slate-400 hover:text-slate-600 font-semibold text-sm underline"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
