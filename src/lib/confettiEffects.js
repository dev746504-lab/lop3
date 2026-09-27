import confetti from "canvas-confetti";

export function burstConfetti() {
  const duration = 1500;
  const end = Date.now() + duration;
  const colors = ["#FFC93C", "#FF8A3D", "#FF5E8E", "#7C4DFF", "#3DB2FF", "#22C55E"];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.6 },
      colors,
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  confetti({
    particleCount: 140,
    spread: 100,
    origin: { y: 0.5 },
    colors,
    startVelocity: 45,
  });
}

export function smallConfetti(originX = 0.5, originY = 0.5) {
  confetti({
    particleCount: 60,
    spread: 65,
    origin: { x: originX, y: originY },
    colors: ["#FFC93C", "#FF8A3D", "#FF5E8E", "#7C4DFF", "#3DB2FF", "#22C55E"],
    startVelocity: 35,
    scalar: 0.9,
  });
}
