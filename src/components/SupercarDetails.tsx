import React from 'react';
import {
  Zap,
  Gauge,
  Weight,
  Flame,
  Award,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import type { SupercarModel, BrandData } from '../data/supercarsData';

interface SupercarDetailsProps {
  currentBrand: BrandData;
  currentModel: SupercarModel;
  onSelectModel: (model: SupercarModel) => void;
  isThai: boolean;
  onOpenCompare: () => void;
}

export const SupercarDetails: React.FC<SupercarDetailsProps> = ({
  currentBrand,
  currentModel,
  onSelectModel,
  isThai,
  onOpenCompare,
}) => {
  return (
    <div className="w-full flex flex-col gap-6 text-white">
      {/* 1. Model Header & Badges */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full border"
              style={{
                color: currentBrand.heritageColor,
                borderColor: `${currentBrand.heritageColor}40`,
                backgroundColor: `${currentBrand.heritageColor}15`,
              }}
            >
              {currentModel.heroBadge}
            </span>
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {currentModel.year}
            </span>
            <span className="text-[11px] font-mono text-slate-500">•</span>
            <span className="text-[11px] font-mono text-slate-400">
              {currentModel.generation}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white m-0">
            {currentModel.name}
          </h1>

          <p className="text-base md:text-lg text-slate-300 font-medium mt-1.5 max-w-2xl">
            {isThai ? currentModel.tagline.th : currentModel.tagline.en}
          </p>
        </div>

        {/* Action Button: Compare with other supercars */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCompare}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <TrendingUp className="w-4 h-4" />
            {isThai ? 'เปรียบเทียบกับรุ่นอื่น (BATTLE)' : 'COMPARE SPECS (BATTLE)'}
          </button>
        </div>
      </div>

      {/* 2. Interactive Supercar Era Timeline Bar */}
      <div className="glass-panel p-3 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            {isThai ? 'ไทม์ไลน์วิวัฒนาการซูเปอร์คาร์' : 'SUPERCAR LINEAGE & TIMELINE'}
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            {currentBrand.models.length} {isThai ? 'รุ่นตำนาน' : 'Iconic Models'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {currentBrand.models.map((model) => {
            const isSelected = model.id === currentModel.id;
            return (
              <button
                key={model.id}
                onClick={() => onSelectModel(model)}
                className={`p-2.5 rounded-xl text-left transition-all relative overflow-hidden border ${
                  isSelected
                    ? 'bg-slate-800 border-white/30 shadow-lg'
                    : 'bg-slate-900/50 hover:bg-slate-800/60 border-white/5 opacity-75 hover:opacity-100'
                }`}
              >
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: currentBrand.heritageColor }}
                  />
                )}
                <div className="text-[10px] font-mono text-slate-400">{model.year}</div>
                <div className="text-xs font-bold truncate text-white mt-0.5">{model.name}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5 font-mono">
                  {model.specs.power} HP • {model.specs.acceleration}s
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Key Performance Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Power */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>{isThai ? 'พละกำลังสูงสุด' : 'MAX POWER'}</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl md:text-3xl font-black text-white font-mono">
              {currentModel.specs.power}{' '}
              <span className="text-xs text-amber-400 font-semibold">HP</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              {currentModel.specs.torque} Nm Torque
            </div>
          </div>
        </div>

        {/* 0-100 Acceleration */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>0-100 KM/H</span>
            <Gauge className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl md:text-3xl font-black text-white font-mono">
              {currentModel.specs.acceleration}{' '}
              <span className="text-xs text-emerald-400 font-semibold">SEC</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              Launch Control Ready
            </div>
          </div>
        </div>

        {/* Top Speed */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>{isThai ? 'ความเร็วสูงสุด' : 'TOP SPEED'}</span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl md:text-3xl font-black text-white font-mono">
              {currentModel.specs.topSpeed}{' '}
              <span className="text-xs text-rose-400 font-semibold">KM/H</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              ~{Math.round(currentModel.specs.topSpeed * 0.621371)} MPH
            </div>
          </div>
        </div>

        {/* Curb Weight / Power to Weight */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>{isThai ? 'น้ำหนักตัวถัง' : 'CURB WEIGHT'}</span>
            <Weight className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-3">
            <div className="text-2xl md:text-3xl font-black text-white font-mono">
              {currentModel.specs.weight}{' '}
              <span className="text-xs text-sky-400 font-semibold">KG</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              {(currentModel.specs.weight / currentModel.specs.power).toFixed(2)} kg / HP
            </div>
          </div>
        </div>
      </div>

      {/* 4. Heritage Story & Historical Significance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Story */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-red-500" />
            {isThai ? 'เรื่องราวและประวัติศาสตร์' : 'Heritage & Engineering Story'}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {isThai ? currentModel.description.th : currentModel.description.en}
          </p>
        </div>

        {/* Historical Significance */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            {isThai ? 'ความสำคัญทางประวัติศาสตร์' : 'Historical Significance'}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {isThai ? currentModel.historicalSignificance.th : currentModel.historicalSignificance.en}
          </p>

          {/* Nurburgring or Production info */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono">
            {currentModel.specs.nurburgringLap && (
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">🏁 Nürburgring Lap</span>
                <span className="font-bold text-emerald-400">{currentModel.specs.nurburgringLap}</span>
              </div>
            )}
            {currentModel.specs.productionCount && (
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">📦 Production Run</span>
                <span className="font-bold text-amber-400">{currentModel.specs.productionCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Detailed Engineering Highlights */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-amber-400" />
          {isThai ? 'ไฮไลต์เทคโนโลยีวิศวกรรมเฉพาะตัว' : 'Bespoke Engineering Milestones'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentModel.highlights.map((h, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
              <h4 className="text-sm font-bold text-white mb-1.5">
                {isThai ? h.title.th : h.title.en}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isThai ? h.desc.th : h.desc.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
