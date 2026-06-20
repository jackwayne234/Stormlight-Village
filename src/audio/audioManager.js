import { busDefaults, soundCatalog } from "./soundCatalog.js";

export function createAudioManager(catalog = soundCatalog) {
  const buses = { ...busDefaults };
  const loadedSounds = new Map();
  const lastPlayed = new Map();
  let unlocked = false;
  let audioContext = null;

  function unlock() {
    unlocked = true;
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
      return playGenerated(definition, options);
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

    const lastTime = lastPlayed.get(soundId) || 0;
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

  function playGenerated(definition, options) {
    audioContext = audioContext || createAudioContext();
    if (!audioContext) {
      return false;
    }

    if (definition.generated === "lowThunder") {
      playGeneratedThunder(audioContext, resolveVolume(definition, options));
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
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  return AudioContextClass ? new AudioContextClass() : null;
}

function playGeneratedThunder(audioContext, volume) {
  const now = audioContext.currentTime;
  const duration = 2.6;
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
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.18);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(audioContext.destination);
  source.start(now);
  source.stop(now + duration);
}
