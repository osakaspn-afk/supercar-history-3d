import React from 'react';
import { Trophy, MapPin, User, History } from 'lucide-react';
import type { BrandData } from '../data/supercarsData';

interface BrandHeroProps {
  brand: BrandData;
  isThai: boolean;
}

export const BrandHero: React.FC<BrandHeroProps> = ({ brand, isThai }) => {
  return (
    <div className="w-full glass-panel rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden text-white shadow-2xl">
      {/* Subtle background ambient glow */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
        style={{ backgroundColor: brand.heritageColor }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-3xl">
          {/* Country & Founded Year */}
          <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/60 text-slate-200">
              <span>{brand.countryFlag}</span>
              <span>{brand.country}</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/60 text-slate-200">
              <History className="w-3 h-3 text-amber-400" />
              <span>Est. {brand.foundedYear}</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/60 text-slate-200">
              <MapPin className="w-3 h-3 text-red-400" />
              <span>{brand.headquarters}</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/60 text-slate-200">
              <User className="w-3 h-3 text-sky-400" />
              <span>{brand.founder}</span>
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-2">
            {brand.name} Supercar Legacy
          </h2>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            {isThai ? brand.overview.th : brand.overview.en}
          </p>
        </div>

        {/* Racing Heritage Showcase Card */}
        <div className="w-full md:w-80 p-4 rounded-2xl bg-slate-900/80 border border-white/10 shrink-0 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{isThai ? 'เกียรติยศมอเตอร์สปอร์ต' : 'MOTORSPORT PEDIGREE'}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            {isThai ? brand.racingHeritage.th : brand.racingHeritage.en}
          </p>
        </div>
      </div>
    </div>
  );
};
