import React from 'react';
import {
  Wind,
  Zap,
  Flame,
  ChevronDown,
  Layers,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import type { SupercarModel, BrandData } from '../data/supercarsData';
import { EngineRevGauge } from './EngineRevGauge';

interface ScrollStorySectionsProps {
  currentBrand: BrandData;
  currentModel: SupercarModel;
  isThai: boolean;
  selectedColor: string;
  onSelectColor: (hex: string) => void;
  finish: 'metallic' | 'matte' | 'carbon';
  onSelectFinish: (finish: 'metallic' | 'matte' | 'carbon') => void;
  isFreeOrbit: boolean;
  onToggleFreeOrbit: () => void;
  onOpenCompare: () => void;
  onRevSpeedChange: (speed: number) => void;
}

export const ScrollStorySections: React.FC<ScrollStorySectionsProps> = ({
  currentBrand,
  currentModel,
  isThai,
  selectedColor,
  onSelectColor,
  finish,
  onSelectFinish,
  isFreeOrbit,
  onToggleFreeOrbit,
  onOpenCompare,
  onRevSpeedChange,
}) => {
  return (
    <div className="relative w-full z-10 pointer-events-none">
      {/* ========================================================================= */}
      {/* CHAPTER 0: HERO SECTION */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col justify-between p-6 md:p-16 relative">
        {/* Giant Background Watermark Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none w-full text-center overflow-hidden">
          <span className="text-[18vw] font-black uppercase tracking-tighter stroke-text opacity-40 leading-none">
            {currentBrand.name}
          </span>
        </div>

        {/* Top Header Badge */}
        <div className="flex items-center gap-3 pt-4">
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border shadow-lg"
            style={{
              color: currentBrand.heritageColor,
              borderColor: `${currentBrand.heritageColor}40`,
              backgroundColor: `${currentBrand.heritageColor}15`,
            }}
          >
            {currentBrand.countryFlag} {currentModel.heroBadge}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {currentModel.year} • {currentModel.generation}
          </span>
        </div>

        {/* Main Title & Hero Hook */}
        <div className="max-w-3xl my-auto">
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white m-0 uppercase leading-none drop-shadow-2xl">
            {currentModel.name}
          </h1>
          <p className="text-base md:text-2xl text-slate-300 font-medium mt-4 max-w-2xl leading-snug drop-shadow-md">
            {isThai ? currentModel.tagline.th : currentModel.tagline.en}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 pointer-events-auto">
            <button
              onClick={onOpenCompare}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl transition-all active:scale-95"
            >
              <TrendingUp className="w-4 h-4" />
              {isThai ? 'ประลองสเปก (VS BATTLE)' : 'COMPARE SPECS (BATTLE)'}
            </button>
            <button
              onClick={onToggleFreeOrbit}
              className={`px-5 py-3 rounded-2xl border text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                isFreeOrbit
                  ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                  : 'bg-slate-900/80 hover:bg-slate-800 border-white/20 text-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {isFreeOrbit
                ? isThai ? 'โหมดหมุนอิสระ 360° (เปิดอยู่)' : 'FREE 360° (ACTIVE)'
                : isThai ? 'กดเพื่อหมุนดูรอบคัน 360°' : 'ENTER 360° ORBIT'}
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 pb-8 text-center text-slate-400">
          <span className="text-[11px] font-mono tracking-widest uppercase">
            {isThai ? 'เลื่อนลงเพื่อชมเรื่องราว' : 'SCROLL TO EXPLORE'}
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce text-slate-300" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 1: AERODYNAMICS & SCULPTED CHASSIS */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex items-center justify-start p-6 md:p-16 relative">
        <div className="absolute top-1/2 right-12 -translate-y-1/2 select-none pointer-events-none text-right hidden lg:block">
          <span className="text-[15vw] font-black uppercase tracking-tighter stroke-text opacity-30 leading-none">
            AERO
          </span>
        </div>

        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-xl shadow-2xl backdrop-blur-xl pointer-events-auto">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-3">
            <Wind className="w-4 h-4" />
            CHAPTER 01 // AERODYNAMIC ARCHITECTURE
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-3">
            {isThai ? 'อากาศพลศาสตร์และแรงกดตัวถัง' : 'Aerodynamics & Downforce'}
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
            {isThai
              ? 'การออกแบบที่ควบคุมทิศทางการไหลเวียนของอากาศอย่างแม่นยำ ช่องดักลมหน้าขนาดใหญ่ สปลิตเตอร์คาร์บอน และระบบอุโมงค์ลมที่แปลงความเร็วสูงให้กลายเป็นแรงยึดเกาะถนนอันทรงพลัง'
              : 'Precision airflow sculpting engineered to harness atmospheric resistance, converting high-velocity air into immense mechanical downforce through carbon splitters and underbody venturi tunnels.'}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase">Aero Balance</span>
              <span className="text-cyan-400 font-bold text-base mt-0.5 block">High Downforce</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase">Airflow State</span>
              <span className="text-emerald-400 font-bold text-base mt-0.5 block">Laminar Flow</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 2: POWERTRAIN & MECHANICAL ROAR */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex items-center justify-end p-6 md:p-16 relative">
        <div className="absolute top-1/2 left-12 -translate-y-1/2 select-none pointer-events-none hidden lg:block">
          <span className="text-[15vw] font-black uppercase tracking-tighter stroke-text opacity-30 leading-none">
            POWER
          </span>
        </div>

        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-xl shadow-2xl backdrop-blur-xl pointer-events-auto">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400 mb-3">
            <Zap className="w-4 h-4" />
            CHAPTER 02 // POWERTRAIN BENCHMARK
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-3">
            {isThai ? 'ขุมพลังและสมรรถนะการขับเคลื่อน' : 'Combustion Force & Acceleration'}
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6 font-mono text-xs">
            {currentModel.specs.engine}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-amber-500/30 text-center">
              <div className="text-2xl md:text-3xl font-black text-white font-mono">
                {currentModel.specs.power}
              </div>
              <div className="text-[10px] font-mono text-amber-400 uppercase mt-0.5">HP POWER</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-emerald-500/30 text-center">
              <div className="text-2xl md:text-3xl font-black text-white font-mono">
                {currentModel.specs.acceleration}s
              </div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase mt-0.5">0-100 KM/H</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-rose-500/30 text-center">
              <div className="text-2xl md:text-3xl font-black text-white font-mono">
                {currentModel.specs.topSpeed}
              </div>
              <div className="text-[10px] font-mono text-rose-400 uppercase mt-0.5">KM/H MAX</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 3: COCKPIT & CARBON MONOCOQUE */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex items-center justify-start p-6 md:p-16 relative">
        <div className="absolute top-1/2 right-12 -translate-y-1/2 select-none pointer-events-none text-right hidden lg:block">
          <span className="text-[15vw] font-black uppercase tracking-tighter stroke-text opacity-30 leading-none">
            CHASSIS
          </span>
        </div>

        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-xl shadow-2xl backdrop-blur-xl pointer-events-auto">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-3">
            <Layers className="w-4 h-4" />
            CHAPTER 03 // CARBON FIBER MONOCOQUE
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-3">
            {isThai ? 'โครงสร้างน้ำหนักเบาและค็อกพิท' : 'Lightweight Monocoque Tub'}
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
            {isThai
              ? 'โครงสร้างตัวถังคาร์บอนไฟเบอร์คอมโพสิตผสานความแข็งแกร่งระดับมอเตอร์สปอร์ตเข้ากับน้ำหนักเบาพิเศษ ห้องโดยสารที่ออกแบบโอบล้อมผู้ขับขี่เพื่อการควบคุมที่แม่นยำดั่งเครื่องบินขับไล่'
              : 'Aerospace-grade carbon fiber reinforced plastic (CFRP) monocoque providing torsional rigidity while keeping curb weight minimal for hyper-responsive corner rotation.'}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase">Curb Weight</span>
              <span className="text-purple-400 font-bold text-base mt-0.5 block">
                {currentModel.specs.weight} KG
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase">Power to Weight</span>
              <span className="text-sky-400 font-bold text-base mt-0.5 block">
                {(currentModel.specs.weight / currentModel.specs.power).toFixed(2)} kg / HP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 4: ACTIVE REAR AERO & NÜRBURGRING APEX */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex items-center justify-end p-6 md:p-16 relative">
        <div className="absolute top-1/2 left-12 -translate-y-1/2 select-none pointer-events-none hidden lg:block">
          <span className="text-[15vw] font-black uppercase tracking-tighter stroke-text opacity-30 leading-none">
            APEX
          </span>
        </div>

        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 max-w-xl shadow-2xl backdrop-blur-xl pointer-events-auto">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-rose-500 mb-3">
            <Flame className="w-4 h-4" />
            CHAPTER 04 // NÜRBURGRING LAP BENCHMARK
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-3">
            {isThai ? 'ปีกหลังแปรผัน DRS & สถิติความเร็ว' : 'Active DRS Wing & Track Supremacy'}
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
            {isThai ? currentModel.historicalSignificance.th : currentModel.historicalSignificance.en}
          </p>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-500/30 mb-4">
            <span className="text-[11px] font-mono text-red-400 uppercase tracking-widest block mb-1">
              🏁 Nürburgring Nordschleife Lap Time
            </span>
            <span className="text-2xl md:text-3xl font-black text-white font-mono">
              {currentModel.specs.nurburgringLap || 'Track Verified'}
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 5: INTERACTIVE 3D CONFIGURATOR & SHOWROOM STUDIO */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col justify-end p-6 md:p-16 relative">
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 w-full max-w-5xl mx-auto shadow-2xl backdrop-blur-2xl pointer-events-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                CHAPTER 05 // 3D INTERACTIVE STUDIO
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                {isThai ? 'สตูดิโอปรับแต่งและทดลองเสียงเครื่องยนต์' : 'Configurator & Sound Engine'}
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                {isThai
                  ? 'หมุนดูรอบคัน 360° เลือกสีตัวถัง ปรับชนิดผิวสี และเบิ้ลเครื่องยนต์สังเคราะห์ได้ตามต้องการ'
                  : 'Orbit 360°, customize official paint finishes, and test the procedural engine rev synthesizer.'}
              </p>
            </div>

            {/* Free Orbit Toggle Button */}
            <button
              onClick={onToggleFreeOrbit}
              className={`px-5 py-3 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                isFreeOrbit
                  ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {isFreeOrbit
                ? isThai ? 'โหมดหมุน 360° อิสระ (เปิดอยู่)' : 'FREE ORBIT ACTIVE'
                : isThai ? 'เปิดโหมดหมุน 360° อิสระ' : 'ENABLE 360° ORBIT'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Color & Finish Configurator */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {isThai ? 'เลือกเฉดสีตัวถังอย่างเป็นทางการ:' : 'SELECT OFFICIAL COLOR:'}
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {currentModel.colorPalette.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => onSelectColor(c.hex)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
                        selectedColor === c.hex
                          ? 'border-white bg-white/20 text-white scale-105 shadow-lg'
                          : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shadow-inner"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {isThai ? 'เลือกชนิดผิวสี (FINISH):' : 'PAINT FINISH TYPE:'}
                </span>
                <div className="flex items-center gap-2">
                  {(['metallic', 'matte', 'carbon'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => onSelectFinish(f)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border ${
                        finish === f
                          ? 'bg-white text-slate-950 font-bold border-white'
                          : 'bg-slate-900/80 text-slate-400 hover:text-white border-white/10'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Procedural Engine Tachometer Dock */}
            <div className="flex justify-center md:justify-end">
              <EngineRevGauge
                soundProfile={currentModel.soundProfile}
                accentColor={currentBrand.heritageColor}
                isThai={isThai}
                onRevSpeedChange={onRevSpeedChange}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
