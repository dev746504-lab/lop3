// Web Audio API sound helper - no external audio files needed.
// All sounds are synthesized with oscillators + noise buffers.

let ctx = null;
let muted = false;

function getCtx() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioCtx();
  }
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  return ctx;
}

function setMuted(value) {
  muted = value;
}

function isMuted() {
  return muted;
}

function tone({ freq = 440, duration = 0.15, type = "sine", startGain = 0.2, delay = 0, glideTo = null }) {
  if (muted) return;
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  const t0 = c.currentTime + delay;
  osc.frequency.setValueAtTime(freq, t0);
  if (glideTo) {
    osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + duration);
  }
  gain.gain.setValueAtTime(startGain, t0);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

function noiseBurst({ duration = 0.15, delay = 0, gainValue = 0.18, filterFreq = 2500 }) {
  if (muted) return;
  const c = getCtx();
  const bufferSize = c.sampleRate * duration;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = c.createBufferSource();
  noise.buffer = buffer;

  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = filterFreq;

  const gain = c.createGain();
  const t0 = c.currentTime + delay;
  gain.gain.setValueAtTime(gainValue, t0);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(c.destination);
  noise.start(t0);
  noise.stop(t0 + duration + 0.02);
}

const soundEffects = {
  setMuted,
  isMuted,

  click() {
    tone({ freq: 620, duration: 0.08, type: "triangle", startGain: 0.18 });
  },

  correct() {
    // cheerful ascending arpeggio
    tone({ freq: 523.25, duration: 0.14, type: "sine", startGain: 0.22, delay: 0 });
    tone({ freq: 659.25, duration: 0.14, type: "sine", startGain: 0.22, delay: 0.09 });
    tone({ freq: 783.99, duration: 0.2, type: "sine", startGain: 0.24, delay: 0.18 });
  },

  wrong() {
    // gentle descending warning, not harsh
    tone({ freq: 330, duration: 0.18, type: "sawtooth", startGain: 0.15, delay: 0, glideTo: 220 });
    tone({ freq: 220, duration: 0.22, type: "sawtooth", startGain: 0.12, delay: 0.16, glideTo: 165 });
  },

  countdownTick() {
    tone({ freq: 880, duration: 0.09, type: "square", startGain: 0.15 });
  },

  countdownFinal() {
    tone({ freq: 1046.5, duration: 0.22, type: "square", startGain: 0.2 });
  },

  win() {
    // victory fanfare + applause-like noise
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      tone({ freq: f, duration: 0.22, type: "triangle", startGain: 0.22, delay: i * 0.12 });
    });
    for (let i = 0; i < 10; i++) {
      noiseBurst({
        duration: 0.06 + Math.random() * 0.05,
        delay: 0.4 + Math.random() * 1.1,
        gainValue: 0.1 + Math.random() * 0.08,
        filterFreq: 1800 + Math.random() * 2200,
      });
    }
  },

  applause() {
    for (let i = 0; i < 16; i++) {
      noiseBurst({
        duration: 0.05 + Math.random() * 0.06,
        delay: Math.random() * 0.9,
        gainValue: 0.09 + Math.random() * 0.09,
        filterFreq: 1500 + Math.random() * 2500,
      });
    }
    tone({ freq: 784, duration: 0.18, type: "sine", startGain: 0.18, delay: 0.05 });
    tone({ freq: 988, duration: 0.22, type: "sine", startGain: 0.2, delay: 0.2 });
  },

  pop() {
    tone({ freq: 300, duration: 0.1, type: "sine", startGain: 0.2, glideTo: 700 });
  },

  whoosh() {
    noiseBurst({ duration: 0.25, gainValue: 0.08, filterFreq: 3200 });
  },
};

export default soundEffects;
