import { useCallback, useEffect, useRef } from 'react';

const createAudioContext = (): AudioContext | null => {
  const AudioContextCtor =
    window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextCtor) return null;
  return new AudioContextCtor();
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

const createNoiseBuffer = (context: AudioContext, durationSec: number) => {
  const length = Math.max(1, Math.floor(context.sampleRate * durationSec));
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    // White noise with mild attenuation.
    data[i] = (Math.random() * 2 - 1) * 0.55;
  }
  return buffer;
};

const playClick = (context: AudioContext, at: number, intensity: number) => {
  const safeIntensity = clamp(intensity, 0, 1);

  // A "tạch" = short noise burst + low thump.
  const noise = context.createBufferSource();
  noise.buffer = createNoiseBuffer(context, 0.028);

  const noiseFilter = context.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 1800 + Math.random() * 600;
  noiseFilter.Q.value = 0.9;

  const noiseGain = context.createGain();
  noiseGain.gain.setValueAtTime(0.0001, at);
  noiseGain.gain.exponentialRampToValueAtTime(0.12 * safeIntensity + 0.0001, at + 0.004);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, at + 0.028);

  const thump = context.createOscillator();
  thump.type = 'triangle';
  thump.frequency.value = 110 + Math.random() * 25;

  const thumpGain = context.createGain();
  thumpGain.gain.setValueAtTime(0.0001, at);
  thumpGain.gain.exponentialRampToValueAtTime(0.05 * safeIntensity + 0.0001, at + 0.006);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, at + 0.035);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(context.destination);

  thump.connect(thumpGain);
  thumpGain.connect(context.destination);

  noise.start(at);
  noise.stop(at + 0.03);

  thump.start(at);
  thump.stop(at + 0.04);
};

export const usePumpSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const tickIntervalRef = useRef<number | null>(null);

  const ensureAudio = useCallback(() => {
    if (audioContextRef.current) return audioContextRef.current;
    audioContextRef.current = createAudioContext();
    return audioContextRef.current;
  }, []);

  const stopTicks = useCallback(() => {
    if (tickIntervalRef.current !== null) {
      window.clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
  }, []);

  const startTicks = useCallback(() => {
    const context = ensureAudio();
    if (!context) return;

    // Some browsers require explicit resume after user gesture.
    void context.resume?.();

    stopTicks();

    tickIntervalRef.current = window.setInterval(() => {
      const now = context.currentTime;
      // Slight humanized timing + intensity for a more "mechanical" feel.
      const intensity = 0.85 + Math.random() * 0.15;
      playClick(context, now, intensity);
      if (Math.random() < 0.22) {
        playClick(context, now + 0.04, intensity * 0.75);
      }
    }, 120);
  }, [ensureAudio, stopTicks]);

  const playSuccessSound = useCallback(() => {
    const context = ensureAudio();
    if (!context) return;
    void context.resume?.();

    const now = context.currentTime;
    const make = (frequency: number, at: number, durationSec: number, gainValue: number) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(gainValue, at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + durationSec);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(at);
      oscillator.stop(at + durationSec);
    };

    make(784, now + 0.0, 0.13, 0.045);
    make(1175, now + 0.12, 0.13, 0.04);
    make(1568, now + 0.24, 0.15, 0.03);
  }, [ensureAudio]);

  useEffect(() => {
    return () => {
      stopTicks();
      // Let the browser reclaim audio context; stopping is enough for this demo.
    };
  }, [stopTicks]);

  return { startTicks, stopTicks, playSuccessSound };
};

