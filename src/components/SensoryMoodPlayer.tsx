import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Disc, Radio } from 'lucide-react';
import { SOUNDSCAPE_TRACKS, SoundscapeTrack } from '../data/fragrances';
import { ambientPlayer } from '../utils/ambientAudio';

interface SensoryMoodPlayerProps {
  onSelectFragranceName?: (name: string) => void;
}

export const SensoryMoodPlayer: React.FC<SensoryMoodPlayerProps> = ({ onSelectFragranceName }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.6);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const activeTrack: SoundscapeTrack = SOUNDSCAPE_TRACKS[currentTrackIndex];
  const timerRef = useRef<number | null>(null);

  // Audio state loop
  useEffect(() => {
    if (isPlaying) {
      ambientPlayer.play(activeTrack.ambientType);
      ambientPlayer.setVolume(isMuted ? 0 : volume);

      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= activeTrack.durationSeconds) {
            // Loop track
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      ambientPlayer.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentTrackIndex, activeTrack]);

  // Volume updates
  useEffect(() => {
    ambientPlayer.setVolume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectTrack = (idx: number) => {
    setCurrentTrackIndex(idx);
    setCurrentTime(0);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = Math.floor(ratio * activeTrack.durationSeconds);
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = (currentTime / activeTrack.durationSeconds) * 100;

  return (
    <section className="w-full bg-[#131314] text-[#E5E2E3] py-16 md:py-24 border-b border-[#85817C]/20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#85817C]/20 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C6AD85]">
              <Radio className="w-3.5 h-3.5 text-[#C6AD85]" />
              <span>Olfactive Resonance · Ambient Acoustics</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F1ECE4]">
              Sensory Audio & Olfactive Mood Player
            </h2>
            <p className="font-sans text-xs text-[#85817C] max-w-xl leading-relaxed">
              Synthesized specifically to accompany each formulation. Designed to tune the senses before sampling extrait concentrates.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#85817C] uppercase tracking-[0.2em] font-mono">
            <span className="text-[#C6AD85]">Frequency:</span>
            <span>432Hz Pure Tuning</span>
          </div>
        </div>

        {/* The Sensory Audio Console */}
        <div className="bg-[#0B0B0C] border border-[#C6AD85]/30 p-8 sm:p-10 shadow-2xl space-y-8">
          
          {/* Top Bar: Active Track Info & Roman Numeral */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#85817C]/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1B1A1A] border border-[#C6AD85]/40 flex items-center justify-center shrink-0">
                <Disc className={`w-6 h-6 text-[#C6AD85] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#C6AD85] uppercase tracking-[0.2em]">
                  Track {activeTrack.romanNumeral} · {activeTrack.olfactiveMood}
                </span>
                <h3 className="font-serif text-2xl text-[#F1ECE4] mt-0.5">
                  {activeTrack.title}
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#85817C] uppercase tracking-wider block font-sans">
                Accompanying Flacon:
              </span>
              <button
                onClick={() => onSelectFragranceName?.(activeTrack.fragranceLink)}
                className="font-serif text-base text-[#C6AD85] hover:text-[#D8C4A5] underline underline-offset-4 cursor-pointer"
              >
                {activeTrack.fragranceLink} &rarr;
              </button>
            </div>
          </div>

          {/* Audio Description */}
          <p className="font-sans text-xs text-[#CBC6C0] italic">
            "{activeTrack.audioDescription}"
          </p>

          {/* Understated Hairline 1px Scrubber (Exact Design Spec Requirement!) */}
          <div className="space-y-2 pt-2">
            <div
              onClick={handleScrub}
              className="relative w-full h-4 flex items-center cursor-pointer group"
              title="Click to seek"
            >
              {/* Hairline 1px Track in Smoke Gray */}
              <div className="w-full h-[1px] bg-[#85817C]/40 group-hover:h-[2px] transition-all relative">
                {/* Active Duration rendered in Champagne Gold */}
                <div
                  className="h-full bg-[#C6AD85] relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  {/* Subtle Scrubber Pin */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#F1ECE4] shadow-[0_0_8px_#C6AD85] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>

            {/* Discreet Timestamp Indicators in label-sm */}
            <div className="flex items-center justify-between text-xs font-mono text-[#85817C] tracking-[0.15em] uppercase">
              <span>{formatTime(currentTime)}</span>
              <span className="text-[10px] text-[#85817C]/60 tracking-[0.25em]">HARMONIC RESONANCE</span>
              <span>{formatTime(activeTrack.durationSeconds)}</span>
            </div>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
            
            {/* Play/Pause Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="w-14 h-14 bg-[#C6AD85] hover:bg-[#D8C4A5] text-[#0B0B0C] flex items-center justify-center transition-all cursor-pointer shadow-lg hover:shadow-[#C6AD85]/20 focus-visible:outline-none"
                aria-label={isPlaying ? 'Pause soundscape' : 'Play soundscape'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              <div className="text-xs font-sans tracking-[0.15em] uppercase">
                <p className="text-[#F1ECE4] font-medium">
                  {isPlaying ? 'Synthesizing Live' : 'Soundscape Paused'}
                </p>
                <p className="text-[#85817C] text-[10px]">
                  Web Audio Synthesizer
                </p>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-[#85817C] hover:text-[#C6AD85] transition-colors cursor-pointer"
                aria-label="Toggle mute"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-28 accent-[#C6AD85] cursor-pointer h-1 bg-[#85817C]/30"
              />
              <span className="font-mono text-xs text-[#85817C] w-8">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>

          </div>

          {/* Track Selection Tabs */}
          <div className="pt-6 border-t border-[#85817C]/20 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SOUNDSCAPE_TRACKS.map((t, idx) => {
              const isCurrent = currentTrackIndex === idx;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTrack(idx)}
                  className={`p-3 text-left border transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-[#C6AD85] bg-[#141314] text-[#F1ECE4]'
                      : 'border-[#85817C]/20 bg-[#0E0E0F] text-[#85817C] hover:border-[#85817C]/50 hover:text-[#CBC6C0]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-[#C6AD85]">Movement {t.romanNumeral}</span>
                    <span>{formatTime(t.durationSeconds)}</span>
                  </div>
                  <p className="font-serif text-sm text-[#F1ECE4] truncate">{t.title}</p>
                  <p className="text-[10px] text-[#85817C] font-sans truncate mt-0.5">{t.olfactiveMood}</p>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
