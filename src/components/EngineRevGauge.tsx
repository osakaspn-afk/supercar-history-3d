import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Flame } from 'lucide-react';
import { engineAudio } from '../utils/engineAudio';

interface EngineRevGaugeProps {
  soundProfile: 'flat6' | 'v6tt' | 'v12' | 'v10';
  accentColor: string;
  isThai: boolean;
  onRevSpeedChange: (speed: number) => void;
}

export const EngineRevGauge: React.FC<EngineRevGaugeProps> = ({
  soundProfile,
  accentColor,
  isThai,
  onRevSpeedChange,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [rpm, setRpm] = useState(0);
  const [isPressingPedal, setIsPressingPedal] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Sync profile when model changes
  useEffect(() => {
    engineAudio.setProfile(soundProfile);
  }, [soundProfile]);

  // Update gauge RPM loop
  useEffect(() => {
    const loop = () => {
      if (engineAudio.getIsRunning()) {
        const currentRpm = engineAudio.getRpm();
        setRpm(currentRpm);
        // Calculate normalized wheel spin speed for 3D model
        const speed = Math.max(0, (currentRpm - 900) / 8000) * 1.8 + (isRunning ? 0.1 : 0);
        onRevSpeedChange(speed);
      } else {
        setRpm(0);
        onRevSpeedChange(0);
      }
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRunning, onRevSpeedChange]);

  const toggleEngine = () => {
    if (isRunning) {
      engineAudio.stop();
      setIsRunning(false);
    } else {
      engineAudio.start(soundProfile);
      setIsRunning(true);
    }
  };

  const handleStartRev = () => {
    if (!isRunning) {
      engineAudio.start(soundProfile);
      setIsRunning(true);
    }
    setIsPressingPedal(true);
    const config = engineAudio.getProfileConfig();
    engineAudio.revTo(config.redlineRpm);
  };

  const handleStopRev = () => {
    setIsPressingPedal(false);
    engineAudio.releasePedal();
  };

  const config = engineAudio.getProfileConfig();
  const maxGaugeRpm = soundProfile === 'v10' ? 10000 : soundProfile === 'flat6' || soundProfile === 'v12' ? 9500 : 8000;
  const rpmPercent = Math.min(100, Math.max(0, (rpm / maxGaugeRpm) * 100));
  const isRedline = rpm >= config.redlineRpm * 0.88;

  const getProfileTitle = () => {
    switch (soundProfile) {
      case 'flat6':
        return '4.0L FLAT-6 BOXER';
      case 'v6tt':
        return '3.8L VR38 TWIN-TURBO';
      case 'v12':
        return '6.5L V12 NATURALLY ASPIRATED';
      case 'v10':
        return '4.8L YAMAHA V10 (LFA)';
    }
  };

  const getStatusText = () => {
    if (!isRunning) return 'OFFLINE';
    if (isPressingPedal) {
      switch (soundProfile) {
        case 'flat6':
          return '9,000 RPM BOXER SCREAM';
        case 'v6tt':
          return 'TURBO SPOOL & BOOST';
        case 'v12':
          return 'V12 F1 OPERATIC WAIL';
        case 'v10':
          return 'ROAR OF AN ANGEL (V10)';
      }
    }
    return 'IDLE RUMBLE';
  };

  return (
    <div className="glass-panel p-3.5 rounded-2xl flex flex-col items-center gap-2.5 w-64 border border-white/10 shadow-2xl backdrop-blur-md">
      {/* Top Header */}
      <div className="flex items-center justify-between w-full text-xs font-mono tracking-wider">
        <span className="text-slate-400 flex items-center gap-1.5 uppercase font-semibold text-[10px]">
          <Flame className={`w-3.5 h-3.5 ${isRedline ? 'text-red-500 animate-bounce' : 'text-amber-400'}`} />
          {getProfileTitle()}
        </span>
        <button
          onClick={toggleEngine}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
            isRunning
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
          }`}
        >
          {isRunning ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
          {isRunning ? (isThai ? 'ดับเครื่อง' : 'STOP') : (isThai ? 'สตาร์ทเครื่อง' : 'START')}
        </button>
      </div>

      {/* Tachometer Display */}
      <div className="w-full flex flex-col items-center justify-center py-1">
        <div className="relative w-full h-4 bg-slate-900/80 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
          {/* RPM Fill Bar */}
          <div
            className={`h-full rounded-full transition-all duration-75 ${
              isRedline
                ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
            }`}
            style={{ width: `${rpmPercent}%` }}
          />
          {/* Redline zone tick marker */}
          <div className="absolute top-0 right-7 w-0.5 h-full bg-red-500/70" />
        </div>

        {/* Numeric Readout */}
        <div className="flex items-baseline justify-between w-full mt-1.5 font-mono">
          <span className="text-slate-400 text-[10px] tracking-wider truncate max-w-[140px]">
            {getStatusText()}
          </span>
          <span className={`text-xl font-black tracking-tight ${isRedline ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            {rpm.toLocaleString()}{' '}
            <span className="text-[10px] text-slate-400 font-normal">RPM</span>
          </span>
        </div>
      </div>

      {/* Interactive Gas Pedal / Rev Button */}
      <button
        onMouseDown={handleStartRev}
        onMouseUp={handleStopRev}
        onMouseLeave={handleStopRev}
        onTouchStart={handleStartRev}
        onTouchEnd={handleStopRev}
        className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 select-none active:scale-95 ${
          isPressingPedal
            ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] translate-y-0.5'
            : 'bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-slate-200 border border-slate-600/50'
        }`}
        style={{ borderColor: isPressingPedal ? accentColor : undefined }}
      >
        <Flame className={`w-4 h-4 ${isPressingPedal ? 'text-yellow-300 animate-spin' : 'text-slate-400'}`} />
        {isPressingPedal
          ? isThai ? 'กำลังเหยียบคันเร่ง! (REV)' : 'REVING! (HOLD)'
          : isThai ? 'กดค้างเพื่อเบิ้ลเครื่อง (REV)' : 'HOLD TO REV ENGINE'}
      </button>
    </div>
  );
};
