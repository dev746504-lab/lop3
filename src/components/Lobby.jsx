import React from "react";
import { Sparkles, Gift, Swords, Flower2, PlayCircle } from "lucide-react";
import soundEffects from "../lib/soundEffects.js";

const CARDS = [
  {
    id: "game1",
    icon: Sparkles,
    emoji: "🦕",
    title: "NẠP NĂNG LƯỢNG TỰ TIN",
    desc: "Khởi động: Hứng bong bóng tích cực, đổ đầy thanh năng lượng tự tin cho chú khủng long!",
    color: "from-confidence-yellow to-confidence-orange",
  },
  {
    id: "game2",
    icon: Gift,
    emoji: "🎁",
    title: "HỘP QUÀ BÍ MẬT",
    desc: "Khởi động: Mở hộp quà, nhận thử thách bắt chước thần thái tự tin trong 10 giây!",
    color: "from-confidence-pink to-confidence-purple",
  },
  {
    id: "game3",
    icon: Swords,
    emoji: "🛡️",
    title: "NÂNG CẤP CHIẾN BINH TỰ TIN",
    desc: "Luyện tập: Trả lời 6 tình huống, mở khóa trang bị và cùng đọc 3 khẩu hiệu tự tin!",
    color: "from-confidence-blue to-confidence-purple",
  },
  {
    id: "game4",
    icon: Flower2,
    emoji: "🌳",
    title: "CÂY TỰ TIN NỞ HOA",
    desc: "Vận dụng: Chạm vào nụ hoa, chia sẻ và nở hoa chúc mừng bạn đã tự tin thể hiện bản thân!",
    color: "from-confidence-green to-confidence-blue",
  },
];

export default function Lobby({ onNavigate }) {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="text-center mb-8 sm:mb-12">
        <div className="text-5xl sm:text-7xl mb-3 animate-bounce-slow">🌟</div>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl text-confidence-purple mb-3">
          SẢNH TRÒ CHƠI
        </h2>
        <p className="text-base sm:text-xl md:text-2xl text-slate-600 font-semibold">
          Chọn một hoạt động để bắt đầu tiết học nhé!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => {
                soundEffects.click();
                onNavigate(card.id);
              }}
              className={`group relative overflow-hidden rounded-3xl p-6 sm:p-8 text-left bg-gradient-to-br ${card.color} shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-200 border-4 border-white/40`}
            >
              <div className="absolute -right-4 -top-4 text-8xl sm:text-9xl opacity-25 group-hover:opacity-35 transition-opacity select-none">
                {card.emoji}
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/30 flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
                </div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-white mb-2 drop-shadow">
                  {card.title}
                </h3>
                <p className="text-white/95 text-sm sm:text-base md:text-lg font-semibold mb-4 max-w-md">
                  {card.desc}
                </p>
                <div className="inline-flex items-center gap-2 bg-white/95 text-slate-800 font-display font-bold px-4 py-2 rounded-full text-sm sm:text-base">
                  <PlayCircle className="w-5 h-5" />
                  Bắt đầu chơi
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
