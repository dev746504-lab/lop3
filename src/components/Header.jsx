import React from "react";
import {
  Home,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Sparkles,
  Gift,
  Swords,
  Flower2,
} from "lucide-react";
import soundEffects from "../lib/soundEffects.js";

const GAMES = [
  { id: "lobby", label: "Sảnh trò chơi", icon: Home },
  { id: "game1", label: "Game 1: Nạp năng lượng", icon: Sparkles },
  { id: "game2", label: "Game 2: Hộp quà bí mật", icon: Gift },
  { id: "game3", label: "Game 3: Nâng cấp chiến binh", icon: Swords },
  { id: "game4", label: "Game 4: Cây tự tin nở hoa", icon: Flower2 },
];

export default function Header({ current, onNavigate, muted, onToggleMute, isFullscreen, onToggleFullscreen }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b-4 border-confidence-purple/20 shadow-md">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-2 sm:py-3">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl sm:text-3xl">🦖</span>
            <h1 className="font-display font-extrabold text-sm sm:text-xl md:text-2xl text-confidence-purple leading-tight truncate">
              KỸ NĂNG TỰ TIN THỂ HIỆN BẢN THÂN - TIẾT 2
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                soundEffects.click();
                onToggleMute();
              }}
              className="p-2.5 sm:p-3 rounded-2xl bg-confidence-blue/10 hover:bg-confidence-blue/20 active:scale-90 transition-all"
              title={muted ? "Bật âm thanh" : "Tắt âm thanh"}
            >
              {muted ? (
                <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-confidence-blue" />
              ) : (
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-confidence-blue" />
              )}
            </button>
            <button
              onClick={() => {
                soundEffects.click();
                onToggleFullscreen();
              }}
              className="p-2.5 sm:p-3 rounded-2xl bg-confidence-purple/10 hover:bg-confidence-purple/20 active:scale-90 transition-all"
              title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
            >
              {isFullscreen ? (
                <Minimize className="w-5 h-5 sm:w-6 sm:h-6 text-confidence-purple" />
              ) : (
                <Maximize className="w-5 h-5 sm:w-6 sm:h-6 text-confidence-purple" />
              )}
            </button>
          </div>
        </div>

        <nav className="mt-2 sm:mt-3 flex flex-wrap gap-2">
          {GAMES.map((g) => {
            const Icon = g.icon;
            const active = current === g.id;
            return (
              <button
                key={g.id}
                onClick={() => {
                  soundEffects.click();
                  onNavigate(g.id);
                }}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-display font-bold text-xs sm:text-sm md:text-base transition-all active:scale-95 border-2 ${
                  active
                    ? "bg-confidence-purple text-white border-confidence-purple shadow-lg scale-105"
                    : "bg-white text-confidence-purple border-confidence-purple/30 hover:border-confidence-purple/60"
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{g.label}</span>
                <span className="sm:hidden">{g.label.split(":")[0]}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export { GAMES };
