import React from 'react';
import {
  RotateCcw,
  Sun,
  Moon,
  Wind,
  Eye,
  Grid,
  Sparkles,
  Maximize2,
  Compass,
  Lightbulb,
} from 'lucide-react';
import type { CameraPreset, StudioEnvironment } from './ShowroomCanvas';

interface ViewportControlsProps {
  cameraPreset: CameraPreset;
  onSelectCameraPreset: (preset: CameraPreset) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  environment: StudioEnvironment;
  onSelectEnvironment: (env: StudioEnvironment) => void;
  headlightsOn: boolean;
  onToggleHeadlights: () => void;
  doorsOpen: boolean;
  onToggleDoors: () => void;
  wingActive: boolean;
  onToggleWing: () => void;
  windTunnelActive: boolean;
  onToggleWindTunnel: () => void;
  wireframe: boolean;
  onToggleWireframe: () => void;
  underglow: boolean;
  onToggleUnderglow: () => void;
  colorPalette: Array<{ name: string; hex: string }>;
  selectedColor: string;
  onSelectColor: (hex: string) => void;
  finish: 'metallic' | 'matte' | 'carbon';
  onSelectFinish: (finish: 'metallic' | 'matte' | 'carbon') => void;
  isThai: boolean;
}

export const ViewportControls: React.FC<ViewportControlsProps> = ({
  cameraPreset,
  onSelectCameraPreset,
  autoRotate,
  onToggleAutoRotate,
  environment,
  onSelectEnvironment,
  headlightsOn,
  onToggleHeadlights,
  doorsOpen,
  onToggleDoors,
  wingActive,
  onToggleWing,
  windTunnelActive,
  onToggleWindTunnel,
  wireframe,
  onToggleWireframe,
  underglow,
  onToggleUnderglow,
  colorPalette,
  selectedColor,
  onSelectColor,
  finish,
  onSelectFinish,
  isThai,
}) => {
  return (
    <div className="flex flex-col gap-3 pointer-events-auto">
      {/* 1. Floating Color Palette & Paint Finishes */}
      <div className="glass-panel p-2.5 rounded-2xl flex flex-wrap items-center gap-2 max-w-md shadow-xl border border-white/10">
        <span className="text-[10px] font-mono font-bold uppercase text-slate-400 px-1">
          {isThai ? 'สีตัวถัง:' : 'PAINT:'}
        </span>
        <div className="flex items-center gap-1.5">
          {colorPalette.map((c) => (
            <button
              key={c.name}
              title={c.name}
              onClick={() => onSelectColor(c.hex)}
              className={`w-6 h-6 rounded-full transition-all relative ${
                selectedColor === c.hex ? 'scale-125 ring-2 ring-white shadow-lg' : 'hover:scale-110 opacity-80'
              }`}
              style={{ backgroundColor: c.hex }}
            >
              {selectedColor === c.hex && (
                <span className="absolute inset-0 rounded-full border border-black/40" />
              )}
            </button>
          ))}
        </div>

        {/* Finish Selector */}
        <div className="h-4 w-[1px] bg-slate-700 mx-1 hidden sm:block" />
        <div className="flex items-center gap-1 bg-slate-900/80 rounded-xl p-0.5 border border-slate-700/50 text-[10px] font-mono">
          {(['metallic', 'matte', 'carbon'] as const).map((f) => (
            <button
              key={f}
              onClick={() => onSelectFinish(f)}
              className={`px-2 py-0.5 rounded-lg capitalize transition-all ${
                finish === f ? 'bg-white text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive Feature Toggles Bar */}
      <div className="glass-panel p-2 rounded-2xl flex items-center gap-1.5 shadow-xl border border-white/10 overflow-x-auto">
        {/* Headlights Toggle */}
        <button
          onClick={onToggleHeadlights}
          title={isThai ? 'เปิด/ปิด ไฟหน้า' : 'Toggle Headlights'}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
            headlightsOn
              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/40'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isThai ? 'ไฟหน้า' : 'LIGHTS'}</span>
        </button>

        {/* Active Aero / DRS Toggle */}
        <button
          onClick={onToggleWing}
          title={isThai ? 'ปรับองศาปีกหลัง DRS' : 'Active Aero Wing / DRS'}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
            wingActive
              ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isThai ? 'ปีก DRS' : 'ACTIVE WING'}</span>
        </button>

        {/* Doors Open/Close Toggle */}
        <button
          onClick={onToggleDoors}
          title={isThai ? 'เปิด/ปิด ประตู' : 'Toggle Doors'}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
            doorsOpen
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/40'
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{doorsOpen ? (isThai ? 'ปิดประตู' : 'CLOSE DOORS') : (isThai ? 'เปิดประตู' : 'OPEN DOORS')}</span>
        </button>

        {/* Wind Tunnel Aero Streamlines */}
        <button
          onClick={onToggleWindTunnel}
          title={isThai ? 'อุโมงค์ลม Aero Stream' : 'Wind Tunnel Aero Flow'}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
            windTunnelActive
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/40'
          }`}
        >
          <Wind className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isThai ? 'อุโมงค์ลม' : 'WIND TUNNEL'}</span>
        </button>

        {/* Underglow Neon */}
        <button
          onClick={onToggleUnderglow}
          title={isThai ? 'ไฟนีออนใต้ท้องรถ' : 'Underglow Neon'}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
            underglow
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/40'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">UNDERGLOW</span>
        </button>

        {/* Wireframe Engineering Mode */}
        <button
          onClick={onToggleWireframe}
          title={isThai ? 'โหมดพิมพ์เขียว X-Ray' : 'X-Ray Blueprint'}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
            wireframe
              ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/40'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">X-RAY</span>
        </button>
      </div>

      {/* 3. Camera Presets & Environment Selection */}
      <div className="glass-panel p-2 rounded-2xl flex flex-wrap items-center gap-1.5 shadow-xl border border-white/10">
        <span className="text-[10px] font-mono font-bold uppercase text-slate-400 px-1 flex items-center gap-1">
          <Compass className="w-3 h-3" />
          {isThai ? 'มุมกล้อง:' : 'CAMERA:'}
        </span>

        {/* Camera Preset Buttons */}
        {(
          [
            { id: 'cinematic', label: '360°' },
            { id: 'front_quarter', label: 'Front 3/4' },
            { id: 'side_profile', label: 'Profile' },
            { id: 'rear_aero', label: 'Diffuser' },
            { id: 'top_aero', label: 'Top' },
            { id: 'wheel_focus', label: 'Wheels' },
          ] as const
        ).map((cam) => (
          <button
            key={cam.id}
            onClick={() => onSelectCameraPreset(cam.id)}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all ${
              cameraPreset === cam.id
                ? 'bg-white text-slate-950 font-bold shadow'
                : 'bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            {cam.label}
          </button>
        ))}

        {/* Auto Rotate Toggle */}
        <button
          onClick={onToggleAutoRotate}
          title={isThai ? 'หมุนกล้องอัตโนมัติ' : 'Auto Rotate'}
          className={`p-1.5 rounded-lg text-xs transition-all ${
            autoRotate
              ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]'
              : 'bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
        </button>

        {/* Studio Environment Switcher */}
        <div className="h-4 w-[1px] bg-slate-700 mx-1 hidden sm:block" />
        <div className="flex items-center gap-1 bg-slate-900/80 rounded-xl p-0.5 border border-slate-700/50">
          {(
            [
              { id: 'cyber', icon: Moon, label: 'Cyber' },
              { id: 'showroom', icon: Sun, label: 'Studio' },
              { id: 'sunset', icon: Sparkles, label: 'Sunset' },
              { id: 'aero', icon: Wind, label: 'Wind' },
            ] as const
          ).map((env) => {
            const IconComponent = env.icon;
            return (
              <button
                key={env.id}
                onClick={() => onSelectEnvironment(env.id)}
                title={env.label}
                className={`p-1.5 rounded-lg text-xs transition-all flex items-center gap-1 ${
                  environment === env.id
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <IconComponent className="w-3 h-3" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
