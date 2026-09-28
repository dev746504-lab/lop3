import React, { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, X } from "lucide-react";
import soundEffects from "../lib/soundEffects.js";
import { burstConfetti } from "../lib/confettiEffects.js";
import HelpButton from "../components/HelpButton.jsx";

const HELP_STEPS = [
  "Đọc tình huống hiển thị bên phải màn hình (hoặc phía dưới trên điện thoại).",
  "Chọn đáp án đúng nhất trong 3 lựa chọn để thể hiện cách rèn luyện sự tự tin phù hợp.",
  "Trả lời đúng sẽ mở khóa 1 món trang bị cho nhân vật bên trái và tự động chuyển sang mốc tiếp theo.",
  "Nếu chọn sai, hãy đọc lại tình huống và thử lại - không giới hạn số lần chọn.",
  "Hoàn thành đủ 6 mốc để nhân vật trở thành Chiến binh Tự tin và mở màn hình chiến thắng.",
  "Ở màn hình chiến thắng, cô giáo bấm lần lượt 3 nút khẩu hiệu để cả lớp cùng đọc to.",
];

const STAGES = [
  {
    id: 1,
    title: "Ý thức được giá trị bản thân",
    situation:
      "Trong giờ sinh hoạt lớp, cô giáo hỏi cả lớp: 'Điểm mạnh của các con là gì?'. Em nên làm gì?",
    options: [
      { text: "Tự tin đứng lên nói ra điểm mạnh của mình", correct: true },
      { text: "Im lặng vì sợ các bạn cười", correct: false },
      { text: "Nói rằng mình chẳng có điểm mạnh nào cả", correct: false },
    ],
    equipment: { name: "Huy hiệu Giá trị", emoji: "🏅" },
  },
  {
    id: 2,
    title: "Trau dồi kiến thức",
    situation: "Em gặp một bài toán khó mà chưa hiểu cách làm. Em nên làm gì?",
    options: [
      { text: "Bỏ qua, không làm bài nữa", correct: false },
      { text: "Chăm chỉ đọc thêm sách và hỏi thầy cô, bạn bè", correct: true },
      { text: "Chép bài của bạn cho nhanh", correct: false },
    ],
    equipment: { name: "Cuốn sách Thông thái", emoji: "📖" },
  },
  {
    id: 3,
    title: "Rèn luyện sở thích",
    situation: "Em thích vẽ tranh nhưng vẽ chưa đẹp lắm. Em nên làm gì?",
    options: [
      { text: "Từ bỏ vì thấy mình vẽ xấu", correct: false },
      { text: "Chỉ ngồi xem các bạn khác vẽ", correct: false },
      { text: "Kiên trì luyện tập vẽ mỗi ngày để giỏi hơn", correct: true },
    ],
    equipment: { name: "Bảng màu Năng khiếu", emoji: "🎨" },
  },
  {
    id: 4,
    title: "Chăm chút ngoại hình",
    situation: "Trước khi đến lớp và đi đến nơi đông người, em nên làm gì?",
    options: [
      { text: "Mặc quần áo tùy tiện, không cần gọn gàng", correct: false },
      { text: "Ăn mặc gọn gàng, sạch sẽ, đầu tóc chỉnh tề", correct: true },
      { text: "Không cần quan tâm đến ngoại hình", correct: false },
    ],
    equipment: { name: "Đồng phục Tỏa sáng", emoji: "👔" },
  },
  {
    id: 5,
    title: "Tham gia các hoạt động tập thể",
    situation: "Lớp tổ chức trò chơi và văn nghệ tập thể. Em nên làm gì?",
    options: [
      { text: "Ngồi một mình, không tham gia", correct: false },
      { text: "Chờ các bạn rủ thật nhiều lần mới miễn cưỡng tham gia", correct: false },
      { text: "Hào hứng, chủ động tham gia cùng các bạn", correct: true },
    ],
    equipment: { name: "Áo choàng Năng động", emoji: "🦸" },
  },
  {
    id: 6,
    title: "Tự lập",
    situation: "Góc học tập ở nhà của em đang bừa bộn. Em nên làm gì?",
    options: [
      { text: "Tự giác dọn dẹp và sắp xếp sách vở gọn gàng", correct: true },
      { text: "Nhờ bố mẹ dọn giúp", correct: false },
      { text: "Để nguyên như vậy", correct: false },
    ],
    equipment: { name: "Vương miện Tự tin", emoji: "👑" },
  },
];

const SLOGANS = [
  "TÔI YÊU QUÝ BẢN THÂN",
  "TÔI TIN VÀO KHẢ NĂNG CỦA TÔI",
  "TÔI TỰ TIN",
];

const CHARACTER_FACES = ["😟", "🙂", "😊", "😄", "🤩", "😎", "🦸"];

export default function Game3ConfidenceWarrior() {
  const [stageIndex, setStageIndex] = useState(0);
  const [unlocked, setUnlocked] = useState([]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null); // "correct" | "wrong"
  const [victory, setVictory] = useState(false);
  const [activeSlogan, setActiveSlogan] = useState(null);

  const stage = STAGES[stageIndex];
  const equippedCount = unlocked.length;

  const handleSelect = (option, idx) => {
    if (feedback === "correct") return;
    soundEffects.click();
    setSelected(idx);

    if (option.correct) {
      setFeedback("correct");
      soundEffects.correct();
      setUnlocked((prev) => [...prev, stage.equipment]);
      setTimeout(() => {
        if (stageIndex === STAGES.length - 1) {
          setVictory(true);
          soundEffects.win();
          burstConfetti();
        } else {
          setStageIndex((prev) => prev + 1);
          setSelected(null);
          setFeedback(null);
        }
      }, 1300);
    } else {
      setFeedback("wrong");
      soundEffects.wrong();
      setTimeout(() => {
        setFeedback(null);
        setSelected(null);
      }, 1000);
    }
  };

  const handleReset = () => {
    soundEffects.click();
    setStageIndex(0);
    setUnlocked([]);
    setSelected(null);
    setFeedback(null);
    setVictory(false);
    setActiveSlogan(null);
  };

  if (victory) {
    return (
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 py-8 sm:py-12 text-center">
        <div className="text-7xl sm:text-8xl mb-4">🦸‍♂️✨</div>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-confidence-purple mb-3">
          CHIẾN BINH TỰ TIN ĐÃ HOÀN THIỆN!
        </h2>
        <p className="text-base sm:text-xl text-slate-600 font-semibold mb-8">
          Cả lớp cùng đọc to 3 khẩu hiệu tự tin nào! Cô giáo bấm từng nút bên dưới nhé.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {unlocked.map((eq, i) => (
            <div
              key={i}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-confidence-yellow to-confidence-orange flex items-center justify-center text-4xl sm:text-5xl shadow-lg border-4 border-white animate-glow"
              title={eq.name}
            >
              {eq.emoji}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8">
          {SLOGANS.map((slogan, i) => (
            <button
              key={i}
              onClick={() => {
                soundEffects.correct();
                setActiveSlogan(slogan);
              }}
              className="font-display font-extrabold text-lg sm:text-xl md:text-2xl text-white bg-gradient-to-br from-confidence-pink via-confidence-purple to-confidence-blue rounded-3xl px-4 py-8 sm:py-10 shadow-xl hover:scale-105 active:scale-95 transition-all animate-glow"
            >
              {slogan}
            </button>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 mx-auto bg-white border-2 border-confidence-purple/30 hover:border-confidence-purple/60 text-confidence-purple font-display font-bold px-5 py-2.5 rounded-2xl active:scale-95 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Chơi lại từ đầu
        </button>

        {activeSlogan && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-confidence-purple p-6 cursor-pointer"
            onClick={() => setActiveSlogan(null)}
          >
            <p className="font-display font-extrabold text-white text-4xl sm:text-6xl md:text-7xl text-center leading-tight animate-pop">
              {activeSlogan}
            </p>
            <button
              onClick={() => setActiveSlogan(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white"
            >
              <X className="w-10 h-10" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-5 sm:py-8">
      <HelpButton title="Cách chơi: Nâng cấp chiến binh tự tin" steps={HELP_STEPS} />
      <div className="text-center mb-5 sm:mb-6">
        <h2 className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl text-confidence-purple mb-1">
          🛡️ NÂNG CẤP CHIẾN BINH TỰ TIN
        </h2>
        <p className="text-sm sm:text-lg text-slate-600 font-semibold">
          Mốc {stageIndex + 1} / 6: {stage.title}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 sm:gap-8">
        {/* Character column */}
        <div className="md:col-span-2 flex flex-col items-center bg-white rounded-3xl p-5 sm:p-8 shadow-lg border-4 border-confidence-purple/10">
          <div className="text-7xl sm:text-8xl md:text-9xl mb-3">
            {CHARACTER_FACES[Math.min(equippedCount, CHARACTER_FACES.length - 1)]}
          </div>
          <p className="font-display font-bold text-confidence-purple text-sm sm:text-base mb-4">
            Chiến binh nhỏ của chúng ta
          </p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
            {STAGES.map((s, i) => {
              const isUnlocked = i < unlocked.length;
              return (
                <div
                  key={s.id}
                  className={`aspect-square rounded-2xl flex items-center justify-center text-2xl sm:text-3xl border-2 ${
                    isUnlocked
                      ? "bg-gradient-to-br from-confidence-yellow to-confidence-orange border-white shadow-md animate-pop"
                      : "bg-slate-100 border-slate-200 opacity-50"
                  }`}
                  title={s.equipment.name}
                >
                  {isUnlocked ? s.equipment.emoji : "❓"}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quiz column */}
        <div className="md:col-span-3 bg-white rounded-3xl p-5 sm:p-8 shadow-lg border-4 border-confidence-purple/10">
          <p className="text-base sm:text-xl md:text-2xl font-bold text-slate-800 mb-5 leading-relaxed">
            {stage.situation}
          </p>
          <div className="flex flex-col gap-3 sm:gap-4">
            {stage.options.map((opt, idx) => {
              const isSelected = selected === idx;
              let styles =
                "bg-slate-50 border-slate-200 hover:border-confidence-blue hover:bg-blue-50 text-slate-800";
              if (isSelected && feedback === "correct") {
                styles = "bg-emerald-50 border-confidence-green text-emerald-700";
              } else if (isSelected && feedback === "wrong") {
                styles = "bg-red-50 border-red-400 text-red-600 animate-shake";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt, idx)}
                  disabled={feedback === "correct"}
                  className={`flex items-center justify-between gap-3 text-left px-5 py-4 sm:py-5 rounded-2xl border-2 font-semibold text-sm sm:text-lg transition-all active:scale-95 ${styles}`}
                >
                  <span>{opt.text}</span>
                  {isSelected && feedback === "correct" && (
                    <CheckCircle2 className="w-6 h-6 text-confidence-green shrink-0" />
                  )}
                  {isSelected && feedback === "wrong" && (
                    <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {feedback === "correct" && (
            <p className="mt-4 text-confidence-green font-display font-bold text-sm sm:text-base">
              Chính xác! Mở khóa trang bị: {stage.equipment.emoji} {stage.equipment.name}
            </p>
          )}
          {feedback === "wrong" && (
            <p className="mt-4 text-red-500 font-display font-bold text-sm sm:text-base">
              Chưa đúng rồi, hãy thử lại nhé!
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-white border-2 border-confidence-purple/30 hover:border-confidence-purple/60 text-confidence-purple font-display font-bold px-5 py-2.5 rounded-2xl active:scale-95 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Bắt đầu lại
        </button>
      </div>
    </div>
  );
}
