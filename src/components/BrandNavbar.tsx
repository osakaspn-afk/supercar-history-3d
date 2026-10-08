import {
  Globe,
  Swords,
  Box,
  Cloud,
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { SUPERCAR_BRANDS, type BrandId } from '../data/supercarsData';

interface BrandNavbarProps {
  currentBrandId: BrandId;
  onSelectBrand: (brandId: BrandId) => void;
  isThai: boolean;
  onToggleLanguage: () => void;
  onOpenCompare: () => void;
}

export const BrandNavbar: React.FC<BrandNavbarProps> = ({
  currentBrandId,
  onSelectBrand,
  isThai,
  onToggleLanguage,
  onOpenCompare,
}) => {
  const brandList: BrandId[] = ['porsche', 'nissan', 'lamborghini', 'toyota'];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 md:px-8 py-3.5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Supercar Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-red-600/30">
              ⚡
            </div>
            <div>
              <div className="text-sm md:text-base font-black tracking-tight text-white flex items-center gap-2">
                SUPERCAR ARCHIVE
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                  3D INTERACTIVE
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                PORSCHE • NISSAN • LAMBORGHINI • TOYOTA
              </div>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={onToggleLanguage}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono font-bold border border-slate-700"
            >
              {isThai ? 'TH' : 'EN'}
            </button>
          </div>
        </div>

        {/* Brand Selector Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 overflow-x-auto w-full md:w-auto justify-center">
          {brandList.map((bId) => {
            const brand = SUPERCAR_BRANDS[bId];
            const isActive = currentBrandId === bId;
            return (
              <button
                key={bId}
                onClick={() => onSelectBrand(bId)}
                className={`px-3 md:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg border border-white/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
                style={{
                  boxShadow: isActive ? `0 0 20px ${brand.heritageColor}35` : undefined,
                }}
              >
                <span>{brand.countryFlag}</span>
                <span>{brand.name}</span>
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: brand.heritageColor }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Global Action Tools */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Compare Button */}
          <button
            onClick={onOpenCompare}
            className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-all"
            title={isThai ? 'เปรียบเทียบซูเปอร์คาร์' : 'Compare Supercars'}
          >
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span>{isThai ? 'ประลองสเปก' : 'VS BATTLE'}</span>
          </button>

          {/* Language Switch */}
          <button
            onClick={onToggleLanguage}
            className="px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{isThai ? 'ภาษาไทย' : 'ENGLISH'}</span>
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/osakaspn-afk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-all"
            title="GitHub osakaspn-afk"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Docker & Cloudflare Badge Tooltip */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono px-2 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400">
            <span title="Docker Desktop Ready" className="flex items-center">
              <Box className="w-3.5 h-3.5 text-blue-400" />
            </span>
            <span title="Cloudflare Enabled" className="flex items-center">
              <Cloud className="w-3.5 h-3.5 text-orange-400" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
