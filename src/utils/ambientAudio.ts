/**
 * Pure Web Audio API Ambient Soundscape Synthesizer
 * Generates warm, continuous luxury ambient soundscapes:
 * - Embers & Cistus (warm crackling hearth + meditative drone)
 * - Midnight Rain on Stone (soothing gentle petrichor rain)
 * - Vault of Agarwood (deep resonant Tibetan singing bowl & acoustic drone)
 */

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isRunning: boolean = false;
  private currentType: string | null = null;
  private nodes: (AudioNode | number)[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime, 0.05);
    }
  }

  public stop() {
    if (!this.ctx || !this.isRunning) return;
    this.nodes.forEach(item => {
      if (typeof item === 'number') {
        window.clearInterval(item);
      } else {
        try {
          (item as AudioScheduledSourceNode).stop?.();
          item.disconnect();
        } catch {
          // ignore disconnect errors
        }
      }
    });
    this.nodes = [];
    this.isRunning = false;
    this.currentType = null;
  }

  public play(type: 'embers' | 'rain' | 'subterranean') {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.isRunning && this.currentType === type) {
      return;
    }
    this.stop();

    const now = this.ctx.currentTime;
    const fadeGain = this.ctx.createGain();
    fadeGain.gain.setValueAtTime(0.001, now);
    fadeGain.gain.exponentialRampToValueAtTime(0.4, now + 1.2);
    fadeGain.connect(this.masterGain);
    this.nodes.push(fadeGain);

    if (type === 'embers') {
      this.createEmbersTrack(fadeGain);
    } else if (type === 'rain') {
      this.createRainTrack(fadeGain);
    } else {
      this.createSubterraneanTrack(fadeGain);
    }

    this.isRunning = true;
    this.currentType = type;
  }

  private createEmbersTrack(dest: GainNode) {
    if (!this.ctx) return;

    // Warm Low Drone (D & A notes, 73.4Hz & 110Hz)
    [73.4, 110, 220].forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
      oscGain.gain.setValueAtTime(idx === 0 ? 0.25 : 0.08, this.ctx!.currentTime);
      
      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx!.currentTime);

      osc.connect(oscGain);
      oscGain.connect(filter);
      filter.connect(dest);
      osc.start();
      this.nodes.push(osc);
    });

    // Soft Vinyl / Wood Crackle simulation via buffer noise bursts
    const crackleInterval = window.setInterval(() => {
      if (!this.ctx || !this.isRunning) return;
      const count = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < count; i++) {
        const osc = this.ctx.createOscillator();
        const crackleGain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600 + Math.random() * 2400, this.ctx.currentTime);
        crackleGain.gain.setValueAtTime(0.04 * Math.random(), this.ctx.currentTime);
        crackleGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03 + Math.random() * 0.04);
        
        osc.connect(crackleGain);
        crackleGain.connect(dest);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      }
    }, 180);
    this.nodes.push(crackleInterval);
  }

  private createRainTrack(dest: GainNode) {
    if (!this.ctx) return;

    // Generate Pink/Filtered noise for steady rainfall
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.12;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(1400, this.ctx.currentTime);

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(240, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    whiteNoise.connect(lowpass);
    lowpass.connect(highpass);
    highpass.connect(rainGain);
    rainGain.connect(dest);
    whiteNoise.start();
    this.nodes.push(whiteNoise);
  }

  private createSubterraneanTrack(dest: GainNode) {
    if (!this.ctx) return;

    // Deep Tibetan Bowl Harmonic Series (C#2 68.68 Hz + harmonic overtone)
    const freqs = [68.68, 137.36, 274.72, 412.08];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      // Subtle slow pitch drift for singing bowl illusion
      const lfo = this.ctx!.createOscillator();
      const lfoGain = this.ctx!.createGain();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.04, this.ctx!.currentTime);
      lfoGain.gain.setValueAtTime(1.2, this.ctx!.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      this.nodes.push(lfo);

      gain.gain.setValueAtTime(0.28 / (idx + 1), this.ctx!.currentTime);
      osc.connect(gain);
      gain.connect(dest);
      osc.start();
      this.nodes.push(osc);
    });
  }

  public getPlaybackState() {
    return {
      isPlaying: this.isRunning,
      currentType: this.currentType
    };
  }
}

export const ambientPlayer = new AmbientAudioEngine();
