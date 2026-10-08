// Procedural Automotive Sound Synthesizer using Web Audio API

class SupercarSoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private oscLow: OscillatorNode | null = null;
  private oscMid: OscillatorNode | null = null;
  private oscHigh: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private currentRpm: number = 900; // Idle
  private targetRpm: number = 900;
  private animFrameId: number | null = null;
  private currentProfile: 'flat6' | 'v6tt' | 'v12' | 'v10' = 'flat6';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start(profile: 'flat6' | 'v6tt' | 'v12' | 'v10' = 'flat6') {
    this.initContext();
    if (!this.ctx) return;
    if (this.isRunning) {
      this.setProfile(profile);
      return;
    }

    this.currentProfile = profile;
    this.currentRpm = 900;
    this.targetRpm = 900;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.28, this.ctx.currentTime + 0.3);
    this.masterGain.connect(this.ctx.destination);

    // Multi-pole Lowpass Filter to simulate engine block enclosure
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(2.5, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // Three harmonic oscillators to synthesize complex engine combustion pulses
    this.oscLow = this.ctx.createOscillator();
    this.oscLow.type = 'sawtooth';

    this.oscMid = this.ctx.createOscillator();
    this.oscMid.type = profile === 'v12' ? 'triangle' : 'sawtooth';

    this.oscHigh = this.ctx.createOscillator();
    this.oscHigh.type = profile === 'v10' || profile === 'v12' ? 'sine' : 'sawtooth';

    // Distortion shaper for exhaust rasp
    const distortion = this.ctx.createWaveShaper();
    distortion.curve = this.makeDistortionCurve(18) as any;
    distortion.oversample = '4x';

    this.oscLow.connect(this.filter);
    this.oscMid.connect(distortion);
    distortion.connect(this.filter);
    this.oscHigh.connect(this.filter);

    const now = this.ctx.currentTime;
    this.oscLow.start(now);
    this.oscMid.start(now);
    this.oscHigh.start(now);

    this.isRunning = true;
    this.startRpmLoop();
  }

  public setProfile(profile: 'flat6' | 'v6tt' | 'v12' | 'v10') {
    this.currentProfile = profile;
  }

  public revTo(rpm: number) {
    if (!this.isRunning) {
      this.start(this.currentProfile);
    }
    this.targetRpm = Math.min(Math.max(rpm, 900), 9200);
  }

  public releasePedal() {
    this.targetRpm = 900;
    // Play subtle blowoff / turbo flutter if high RPM
    if (this.currentRpm > 4500 && (this.currentProfile === 'v6tt' || this.currentProfile === 'flat6')) {
      this.playTurboFlutter();
    }
  }

  private playTurboFlutter() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.45, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(2200, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(6.0, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start();
    } catch {
      // Ignored if sound buffers fail
    }
  }

  private startRpmLoop() {
    const update = () => {
      if (!this.isRunning || !this.ctx) return;

      // Smooth RPM lerp
      const delta = (this.targetRpm - this.currentRpm) * 0.12;
      this.currentRpm += delta;

      // Frequency calculation according to engine cylinder count & configuration
      let fundamentalFactor = 0.05;
      let midFactor = 0.12;
      let highFactor = 0.22;

      switch (this.currentProfile) {
        case 'flat6': // Porsche: dry, mechanical, rasp
          fundamentalFactor = 0.045;
          midFactor = 0.09;
          highFactor = 0.18;
          break;
        case 'v6tt': // Nissan GT-R: deep, bassy, aggressive induction
          fundamentalFactor = 0.04;
          midFactor = 0.08;
          highFactor = 0.16;
          break;
        case 'v12': // Lamborghini: high pitch, screaming, opera
          fundamentalFactor = 0.07;
          midFactor = 0.14;
          highFactor = 0.28;
          break;
        case 'v10': // LFA & Carrera GT: high resonant howl, Formula 1 style
          fundamentalFactor = 0.06;
          midFactor = 0.125;
          highFactor = 0.25;
          break;
      }

      const fLow = Math.max(35, this.currentRpm * fundamentalFactor);
      const fMid = Math.max(75, this.currentRpm * midFactor);
      const fHigh = Math.max(140, this.currentRpm * highFactor);

      const now = this.ctx.currentTime;
      if (this.oscLow) this.oscLow.frequency.setTargetAtTime(fLow, now, 0.03);
      if (this.oscMid) this.oscMid.frequency.setTargetAtTime(fMid, now, 0.03);
      if (this.oscHigh) this.oscHigh.frequency.setTargetAtTime(fHigh, now, 0.03);

      if (this.filter) {
        const filterCutoff = 350 + (this.currentRpm / 9000) * 3200;
        this.filter.frequency.setTargetAtTime(filterCutoff, now, 0.03);
      }

      this.animFrameId = requestAnimationFrame(update);
    };

    this.animFrameId = requestAnimationFrame(update);
  }

  private makeDistortionCurve(amount: number): Float32Array {
    const k = typeof amount === 'number' ? amount : 50;
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
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
    }
    setTimeout(() => {
      try {
        this.oscLow?.stop();
        this.oscMid?.stop();
        this.oscHigh?.stop();
        this.oscLow?.disconnect();
        this.oscMid?.disconnect();
        this.oscHigh?.disconnect();
      } catch {
        // Safe disconnect
      }
      this.isRunning = false;
    }, 450);
  }

  public getRpm(): number {
    return Math.round(this.currentRpm);
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }
}

export const engineAudio = new SupercarSoundEngine();
