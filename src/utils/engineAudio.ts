// Authentic Procedural Supercar Sound Synthesizer using Web Audio API
// Custom acoustic physical modeling for Porsche Flat-6, Nissan VR38DETT, Lamborghini V12, and Lexus LFA Yamaha V10

export type SoundProfile = 'flat6' | 'v6tt' | 'v12' | 'v10';

interface EngineCharacteristics {
  name: string;
  idleRpm: number;
  redlineRpm: number;
  revClimbSpeed: number; // RPM climb response speed
  revDecaySpeed: number; // RPM falloff speed
  fundamentalRatio: number;
  harmonics: number[];
  filterBaseFreq: number;
  filterQ: number;
  distortionAmount: number;
  hasTurbo: boolean;
  hasYamahaResonance: boolean;
}

const ENGINE_PROFILES: Record<SoundProfile, EngineCharacteristics> = {
  flat6: {
    name: 'Porsche 4.0L Boxer-6 (Naturally Aspirated)',
    idleRpm: 880,
    redlineRpm: 9000,
    revClimbSpeed: 0.14,
    revDecaySpeed: 0.08,
    fundamentalRatio: 0.048, // 3 firings per revolution
    harmonics: [1.0, 2.0, 3.0, 6.0],
    filterBaseFreq: 520,
    filterQ: 2.8,
    distortionAmount: 22,
    hasTurbo: false,
    hasYamahaResonance: false,
  },
  v6tt: {
    name: 'Nissan 3.8L VR38DETT (Twin-Turbo V6)',
    idleRpm: 780,
    redlineRpm: 7200,
    revClimbSpeed: 0.11,
    revDecaySpeed: 0.07,
    fundamentalRatio: 0.038, // Bassy low rumble
    harmonics: [0.5, 1.0, 2.0, 4.0],
    filterBaseFreq: 380,
    filterQ: 1.8,
    distortionAmount: 16,
    hasTurbo: true, // Dedicated turbo spool whistle & blow-off valve
    hasYamahaResonance: false,
  },
  v12: {
    name: 'Lamborghini 6.5L L539 V12 (Naturally Aspirated)',
    idleRpm: 950,
    redlineRpm: 8700,
    revClimbSpeed: 0.15,
    revDecaySpeed: 0.085,
    fundamentalRatio: 0.072, // 6 firings per revolution (high frequency)
    harmonics: [1.0, 2.0, 3.0, 4.0, 6.0],
    filterBaseFreq: 680,
    filterQ: 3.5,
    distortionAmount: 32, // Violent aggressive Italian roar
    hasTurbo: false,
    hasYamahaResonance: false,
  },
  v10: {
    name: 'Lexus LFA 4.8L 1LR-GUE Yamaha-Tuned V10',
    idleRpm: 850,
    redlineRpm: 9500,
    revClimbSpeed: 0.22, // F1-like ultra-fast rev climb (0.6s to 9,000 RPM)
    revDecaySpeed: 0.12,
    fundamentalRatio: 0.062, // 5 firings per revolution
    harmonics: [1.0, 2.0, 3.5, 5.0],
    filterBaseFreq: 750, // Yamaha acoustic surge tank tuning
    filterQ: 4.8, // Pure singing overtone resonance ("Roar of an Angel")
    distortionAmount: 14,
    hasTurbo: false,
    hasYamahaResonance: true, // Dual Yamaha surge tank resonators
  },
};

class SupercarSoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;

  // Primary combustion oscillators
  private oscSub: OscillatorNode | null = null;
  private oscMain: OscillatorNode | null = null;
  private oscHarmonic: OscillatorNode | null = null;
  private oscHighScream: OscillatorNode | null = null;

  // Turbo whistle oscillator (Nissan GT-R)
  private oscTurbo: OscillatorNode | null = null;
  private turboGain: GainNode | null = null;

  // Yamaha Acoustic Resonators (Lexus LFA)
  private yamahaFilter1: BiquadFilterNode | null = null;
  private yamahaFilter2: BiquadFilterNode | null = null;
  private yamahaGain: GainNode | null = null;

  // Main acoustic filters and distortion
  private mainFilter: BiquadFilterNode | null = null;
  private distortion: WaveShaperNode | null = null;

  private currentRpm: number = 900;
  private targetRpm: number = 900;
  private animFrameId: number | null = null;
  private currentProfile: SoundProfile = 'flat6';
  private lastBackfireTime: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start(profile: SoundProfile = 'flat6') {
    this.initContext();
    if (!this.ctx) return;

    if (this.isRunning) {
      this.setProfile(profile);
      return;
    }

    this.currentProfile = profile;
    const config = ENGINE_PROFILES[profile];
    this.currentRpm = config.idleRpm;
    this.targetRpm = config.idleRpm;

    const now = this.ctx.currentTime;

    // 1. Master Output Bus
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.32, now + 0.25);
    this.masterGain.connect(this.ctx.destination);

    // 2. Multi-stage Acoustic Enclosure Filter
    this.mainFilter = this.ctx.createBiquadFilter();
    this.mainFilter.type = 'lowpass';
    this.mainFilter.frequency.setValueAtTime(config.filterBaseFreq, now);
    this.mainFilter.Q.setValueAtTime(config.filterQ, now);

    // 3. Drive Distortion for exhaust pipe rasp
    this.distortion = this.ctx.createWaveShaper();
    this.distortion.curve = this.makeDistortionCurve(config.distortionAmount) as any;
    this.distortion.oversample = '4x';

    this.distortion.connect(this.mainFilter);
    this.mainFilter.connect(this.masterGain);

    // 4. Combustion Oscillators
    this.oscSub = this.ctx.createOscillator();
    this.oscSub.type = profile === 'v6tt' ? 'sine' : 'triangle';

    this.oscMain = this.ctx.createOscillator();
    this.oscMain.type = profile === 'v10' ? 'sawtooth' : profile === 'v12' ? 'sawtooth' : 'sawtooth';

    this.oscHarmonic = this.ctx.createOscillator();
    this.oscHarmonic.type = profile === 'flat6' ? 'sawtooth' : profile === 'v10' ? 'sine' : 'triangle';

    this.oscHighScream = this.ctx.createOscillator();
    this.oscHighScream.type = profile === 'v10' || profile === 'v12' ? 'sawtooth' : 'square';

    this.oscSub.connect(this.mainFilter);
    this.oscMain.connect(this.distortion);
    this.oscHarmonic.connect(this.distortion);
    this.oscHighScream.connect(this.distortion);

    // 5. Twin-Turbo Compressor Whistle (Nissan VR38DETT)
    this.oscTurbo = this.ctx.createOscillator();
    this.oscTurbo.type = 'sine';
    this.turboGain = this.ctx.createGain();
    this.turboGain.gain.setValueAtTime(profile === 'v6tt' ? 0.04 : 0.0001, now);
    this.oscTurbo.connect(this.turboGain);
    this.turboGain.connect(this.masterGain);

    // 6. Yamaha Musical Acoustic Chambers (Lexus LFA)
    this.yamahaFilter1 = this.ctx.createBiquadFilter();
    this.yamahaFilter1.type = 'bandpass';
    this.yamahaFilter1.frequency.setValueAtTime(780, now);
    this.yamahaFilter1.Q.setValueAtTime(5.5, now);

    this.yamahaFilter2 = this.ctx.createBiquadFilter();
    this.yamahaFilter2.type = 'bandpass';
    this.yamahaFilter2.frequency.setValueAtTime(1850, now);
    this.yamahaFilter2.Q.setValueAtTime(6.0, now);

    this.yamahaGain = this.ctx.createGain();
    this.yamahaGain.gain.setValueAtTime(profile === 'v10' ? 0.22 : 0.0001, now);

    this.oscMain.connect(this.yamahaFilter1);
    this.yamahaFilter1.connect(this.yamahaGain);
    this.oscHighScream.connect(this.yamahaFilter2);
    this.yamahaFilter2.connect(this.yamahaGain);
    this.yamahaGain.connect(this.masterGain);

    // Start all audio sources
    this.oscSub.start(now);
    this.oscMain.start(now);
    this.oscHarmonic.start(now);
    this.oscHighScream.start(now);
    this.oscTurbo.start(now);

    this.isRunning = true;
    this.startRpmLoop();
  }

  public setProfile(profile: SoundProfile) {
    if (this.currentProfile === profile) return;
    this.currentProfile = profile;
    const config = ENGINE_PROFILES[profile];

    if (!this.ctx || !this.isRunning) return;

    const now = this.ctx.currentTime;
    this.targetRpm = Math.min(this.targetRpm, config.redlineRpm);
    this.currentRpm = Math.min(this.currentRpm, config.redlineRpm);

    // Reconfigure wave shaper & filters for new acoustic profile
    if (this.distortion) {
      this.distortion.curve = this.makeDistortionCurve(config.distortionAmount) as any;
    }
    if (this.mainFilter) {
      this.mainFilter.Q.setTargetAtTime(config.filterQ, now, 0.05);
    }
    if (this.turboGain) {
      this.turboGain.gain.setTargetAtTime(config.hasTurbo ? 0.05 : 0.0001, now, 0.05);
    }
    if (this.yamahaGain) {
      this.yamahaGain.gain.setTargetAtTime(config.hasYamahaResonance ? 0.25 : 0.0001, now, 0.05);
    }
  }

  public revTo(rpm: number) {
    if (!this.isRunning) {
      this.start(this.currentProfile);
    }
    const config = ENGINE_PROFILES[this.currentProfile];
    this.targetRpm = Math.min(Math.max(rpm, config.idleRpm), config.redlineRpm);
  }

  public releasePedal() {
    const config = ENGINE_PROFILES[this.currentProfile];
    const prevRpm = this.currentRpm;
    this.targetRpm = config.idleRpm;

    // Trigger profile-specific overrun acoustics when lifting off from high RPM
    if (prevRpm > 4200) {
      if (this.currentProfile === 'v6tt') {
        // Nissan GT-R twin-turbo wastegate chatter ("tsu-tsu-tsu-paa!")
        this.playTurboFlutter();
      } else if (this.currentProfile === 'v12') {
        // Lamborghini aggressive backfire gunshot pops
        this.playBackfire(2);
      } else if (this.currentProfile === 'flat6') {
        // Porsche 911 GT3 RS exhaust burble & crackles
        this.playBackfire(1);
      } else if (this.currentProfile === 'v10') {
        // Lexus LFA high-frequency acoustic trailing wail
        this.playYamahaDecay();
      }
    }
  }

  private playTurboFlutter() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      // Multi-burst wastegate flutter pulses
      for (let i = 0; i < 4; i++) {
        const timeOffset = i * 0.085;
        const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.08, this.ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let j = 0; j < data.length; j++) {
          data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (this.ctx.sampleRate * 0.02));
        }

        const source = this.ctx.createBufferSource();
        source.buffer = noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2400 - i * 220, now + timeOffset);
        filter.Q.setValueAtTime(5.0, now + timeOffset);

        const gain = this.ctx.createGain();
        const pulseVol = (0.16 / (i + 1)) * 1.2;
        gain.gain.setValueAtTime(pulseVol, now + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.075);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        source.start(now + timeOffset);
      }
    } catch {
      // Ignored
    }
  }

  private playBackfire(burstCount: number = 1) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    if (now - this.lastBackfireTime < 0.18) return;
    this.lastBackfireTime = now;

    try {
      for (let b = 0; b < burstCount; b++) {
        const delay = b * 0.12;
        const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.15, this.ctx.sampleRate);
        const channel = buffer.getChannelData(0);
        for (let i = 0; i < channel.length; i++) {
          channel[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.015));
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(this.currentProfile === 'v12' ? 1800 : 950, now + delay);
        filter.Q.setValueAtTime(2.0, now + delay);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.35, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start(now + delay);
      }
    } catch {
      // Ignored
    }
  }

  private playYamahaDecay() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1420, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // Ignored
    }
  }

  private startRpmLoop() {
    const update = () => {
      if (!this.isRunning || !this.ctx) return;

      const config = ENGINE_PROFILES[this.currentProfile];
      const speed = this.targetRpm > this.currentRpm ? config.revClimbSpeed : config.revDecaySpeed;
      this.currentRpm += (this.targetRpm - this.currentRpm) * speed;

      const now = this.ctx.currentTime;
      const rpmRatio = this.currentRpm / config.redlineRpm;

      // Calculate distinct acoustic frequencies per engine profile
      const fBase = Math.max(30, this.currentRpm * config.fundamentalRatio);

      if (this.oscSub) {
        this.oscSub.frequency.setTargetAtTime(fBase * 0.5, now, 0.02);
      }
      if (this.oscMain) {
        this.oscMain.frequency.setTargetAtTime(fBase, now, 0.02);
      }
      if (this.oscHarmonic) {
        this.oscHarmonic.frequency.setTargetAtTime(fBase * config.harmonics[1], now, 0.02);
      }
      if (this.oscHighScream) {
        this.oscHighScream.frequency.setTargetAtTime(fBase * config.harmonics[2], now, 0.02);
      }

      // Dynamic main exhaust filter sweep
      if (this.mainFilter) {
        const targetCutoff = config.filterBaseFreq + rpmRatio * (this.currentProfile === 'v10' ? 4800 : 3600);
        this.mainFilter.frequency.setTargetAtTime(targetCutoff, now, 0.03);
      }

      // Turbo Spool Whistle modulation (Nissan GT-R)
      if (config.hasTurbo && this.oscTurbo && this.turboGain) {
        const turboPitch = 1200 + rpmRatio * 3800; // 1,200 Hz to 5,000 Hz whistle
        this.oscTurbo.frequency.setTargetAtTime(turboPitch, now, 0.04);
        const turboVol = 0.02 + Math.pow(rpmRatio, 2) * 0.12;
        this.turboGain.gain.setTargetAtTime(turboVol, now, 0.04);
      }

      // Yamaha Acoustic Surge Tank tracking (Lexus LFA)
      if (config.hasYamahaResonance && this.yamahaFilter1 && this.yamahaFilter2 && this.yamahaGain) {
        const yPitch1 = 750 + rpmRatio * 1400;
        const yPitch2 = 1850 + rpmRatio * 2200;
        this.yamahaFilter1.frequency.setTargetAtTime(yPitch1, now, 0.02);
        this.yamahaFilter2.frequency.setTargetAtTime(yPitch2, now, 0.02);
        const lfaSingingVolume = 0.15 + rpmRatio * 0.28;
        this.yamahaGain.gain.setTargetAtTime(lfaSingingVolume, now, 0.02);
      }

      this.animFrameId = requestAnimationFrame(update);
    };

    this.animFrameId = requestAnimationFrame(update);
  }

  private makeDistortionCurve(amount: number): Float32Array {
    const k = typeof amount === 'number' ? amount : 25;
    const nSamples = 44100;
    const curve = new Float32Array(nSamples);
    const deg = Math.PI / 180;
    for (let i = 0; i < nSamples; ++i) {
      const x = (i * 2) / nSamples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  public stop() {
    if (!this.isRunning || !this.ctx) return;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);
    }
    setTimeout(() => {
      try {
        this.oscSub?.stop();
        this.oscMain?.stop();
        this.oscHarmonic?.stop();
        this.oscHighScream?.stop();
        this.oscTurbo?.stop();

        this.oscSub?.disconnect();
        this.oscMain?.disconnect();
        this.oscHarmonic?.disconnect();
        this.oscHighScream?.disconnect();
        this.oscTurbo?.disconnect();
      } catch {
        // Safe disconnect
      }
      this.isRunning = false;
    }, 400);
  }

  public getRpm(): number {
    return Math.round(this.currentRpm);
  }

  public getProfileConfig(): EngineCharacteristics {
    return ENGINE_PROFILES[this.currentProfile];
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }
}

export const engineAudio = new SupercarSoundEngine();
