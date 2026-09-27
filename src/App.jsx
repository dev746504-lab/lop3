import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Lobby from "./components/Lobby.jsx";
import Game1EnergyBubbles from "./games/Game1EnergyBubbles.jsx";
import Game2MysteryBoxes from "./games/Game2MysteryBoxes.jsx";
import Game3ConfidenceWarrior from "./games/Game3ConfidenceWarrior.jsx";
import Game4ConfidenceTree from "./games/Game4ConfidenceTree.jsx";
import soundEffects from "./lib/soundEffects.js";

export default function App() {
  const [current, setCurrent] = useState("lobby");
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    soundEffects.setMuted(muted);
  }, [muted]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const renderScreen = () => {
    switch (current) {
      case "game1":
        return <Game1EnergyBubbles />;
      case "game2":
        return <Game2MysteryBoxes />;
      case "game3":
        return <Game3ConfidenceWarrior />;
      case "game4":
        return <Game4ConfidenceTree />;
      default:
        return <Lobby onNavigate={setCurrent} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        current={current}
        onNavigate={setCurrent}
        muted={muted}
        onToggleMute={() => setMuted((m) => !m)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />
      <main className="flex-1">{renderScreen()}</main>
    </div>
  );
}
