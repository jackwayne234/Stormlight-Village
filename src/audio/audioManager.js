import { busDefaults, soundCatalog } from "./soundCatalog.js";

export function createAudioManager(catalog = soundCatalog) {
  const buses = { ...busDefaults };
  const loadedSounds = new Map();
  const generatedLoops = new Map();
  const lastPlayed = new Map();
  let unlocked = false;
  let audioContext = null;

  function unlock() {
    unlocked = true;
    resumeAudioContext(audioContext);
    preloadAll();
    for (const sound of loadedSounds.values()) {
      sound.load();
    }
  }

  function isUnlocked() {
    return unlocked;
  }

  function setBusVolume(bus, volume) {
    buses[bus] = clamp(volume, 0, 1);
  }

  function getBusVolume(bus) {
    return buses[bus] ?? 1;
  }

  async function play(soundId, options = {}) {
    if (!unlocked) {
      return false;
    }

    const definition = catalog[soundId];
    if (!definition) {
      return false;
    }

    if (isCoolingDown(soundId, definition.cooldown)) {
      return false;
    }

    lastPlayed.set(soundId, performance.now());

    if (definition.generated) {
      return playGenerated(soundId, definition, options);
    }

    try {
      await playSample(soundId, definition, options);
      return true;
    } catch {
      const fallbackId = options.fallbackId || "weather.thunder.fallback";
      if (fallbackId && fallbackId !== soundId) {
        return play(fallbackId, { ...options, fallbackId: null });
      }
      return false;
    }
  }

  return {
    getBusVolume,
    isUnlocked,
    play,
    setBusVolume,
    unlock
  };

  function isCoolingDown(soundId, cooldown = 0) {
    if (!cooldown) {
      return false;
    }

    if (!lastPlayed.has(soundId)) {
      return false;
    }

    const lastTime = lastPlayed.get(soundId);
    return performance.now() - lastTime < cooldown * 1000;
  }

  async function playSample(soundId, definition, options) {
    const sound = getOrCreateSample(soundId, definition);

    if (!definition.restart && !sound.paused && sound.currentTime < sound.duration - 0.5) {
      return;
    }

    sound.volume = resolveVolume(definition, options);
    sound.currentTime = options.offset || 0;
    await sound.play();
  }

  function getOrCreateSample(soundId, definition) {
    if (loadedSounds.has(soundId)) {
      return loadedSounds.get(soundId);
    }

    const sound = new Audio(pickFile(definition.files));
    sound.preload = "auto";
    loadedSounds.set(soundId, sound);
    return sound;
  }

  function preloadAll() {
    Object.entries(catalog).forEach(([soundId, definition]) => {
      if (definition.files && !loadedSounds.has(soundId)) {
        getOrCreateSample(soundId, definition);
      }
    });
  }

  function playGenerated(soundId, definition, options) {
    audioContext = audioContext || createAudioContext();
    if (!audioContext) {
      return false;
    }
    resumeAudioContext(audioContext);

    if (definition.generated === "steadyRainLoop") {
      return playGeneratedRainLoop(audioContext, soundId, generatedLoops, resolveVolume(definition, options));
    }

    if (definition.generated === "lowThunder") {
      playGeneratedThunder(audioContext, resolveVolume(definition, options));
      return true;
    }

    if (definition.generated === "robotChirp") {
      playGeneratedRobotChirp(audioContext, resolveVolume(definition, options));
      return true;
    }

    if (definition.generated === "successChime") {
      playGeneratedSuccessChime(audioContext, resolveVolume(definition, options));
      return true;
    }

    if (definition.generated === "tileClick") {
      playGeneratedTileClick(audioContext, resolveVolume(definition, options));
      return true;
    }

    return false;
  }

  function resolveVolume(definition, options) {
    const master = buses.master ?? 1;
    const bus = buses[definition.bus] ?? 1;
    const soundVolume = definition.volume ?? 1;
    const optionVolume = options.volume ?? 1;
    return clamp(master * bus * soundVolume * optionVolume, 0, 1);
  }
}

function pickFile(files) {
  return files[Math.floor(Math.random() * files.length)];
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function createAudioContext() {
  const scope = typeof window !== "undefined" ? window : globalThis;
  const AudioContextClass = scope.AudioContext || scope.webkitAudioContext;
  return AudioContextClass ? new AudioContextClass() : null;
}

function resumeAudioContext(audioContext) {
  if (audioContext?.state === "suspended" && typeof audioContext.resume === "function") {
    audioContext.resume().catch(() => {});
  }
}

function playGeneratedThunder(audioContext, volume) {
  const now = audioContext.currentTime;
  const duration = 2.6;
  const peakVolume = safeRampVolume(volume);
  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i += 1) {
    const t = i / audioContext.sampleRate;
    const decay = Math.pow(1 - t / duration, 2.5);
    const slowRumble = Math.sin(t * 42) * 0.22 + Math.sin(t * 67) * 0.12;
    data[i] = (Math.random() * 2 - 1 + slowRumble) * decay;
  }

  const source = audioContext.createBufferSource();
  source.buffer = buffer;

  const lowpass = audioContext.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(155, now);
  lowpass.frequency.exponentialRampToValueAtTime(68, now + duration);

  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peakVolume, now + 0.18);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(audioContext.destination);
  source.start(now);
  source.stop(now + duration);
}

function playGeneratedRobotChirp(audioContext, volume) {
  const now = audioContext.currentTime;
  const peakVolume = safeRampVolume(volume);
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peakVolume, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
  gain.connect(audioContext.destination);

  [720, 1040].forEach((frequency, index) => {
    const start = now + index * 0.075;
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.2, start + 0.06);
    oscillator.connect(gain);
    oscillator.start(start);
    oscillator.stop(start + 0.12);
  });
}

function playGeneratedSuccessChime(audioContext, volume) {
  const now = audioContext.currentTime;
  const peakVolume = safeRampVolume(volume);
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peakVolume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.78);
  gain.connect(audioContext.destination);

  [523.25, 659.25, 880].forEach((frequency, index) => {
    const start = now + index * 0.105;
    const oscillator = audioContext.createOscillator();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.connect(gain);
    oscillator.start(start);
    oscillator.stop(start + 0.42);
  });
}

function playGeneratedTileClick(audioContext, volume) {
  const now = audioContext.currentTime;
  const peakVolume = safeRampVolume(volume);
  const oscillator = audioContext.createOscillator();
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(310, now);
  oscillator.frequency.exponentialRampToValueAtTime(155, now + 0.035);

  const lowpass = audioContext.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(900, now);

  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(peakVolume, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

  oscillator.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.06);
}

function safeRampVolume(volume) {
  return Math.max(volume, 0.0001);
}

function playGeneratedRainLoop(audioContext, soundId, generatedLoops, volume) {
  if (generatedLoops.has(soundId)) {
    resumeAudioContext(audioContext);
    return true;
  }

  const duration = 3;
  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i += 1) {
    const t = i / audioContext.sampleRate;
    const softNoise = Math.random() * 2 - 1;
    const mist = Math.sin(t * 980 + Math.sin(t * 0.7) * 4) * 0.05;
    data[i] = (softNoise * 0.16 + mist) * (0.88 + Math.sin(t * 2.4) * 0.08);
  }

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const highpass = audioContext.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.setValueAtTime(560, audioContext.currentTime);

  const lowpass = audioContext.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(4200, audioContext.currentTime);

  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(Math.max(volume, 0.0001), audioContext.currentTime + 1.2);

  source.connect(highpass);
  highpass.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(audioContext.destination);
  source.start();
  generatedLoops.set(soundId, { source, gain });
  return true;
}
