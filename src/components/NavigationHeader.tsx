import React, { useState } from 'react';
import {
  Globe,
  Swords,
  Menu,
  X,
  Compass,
  Car,
  BookOpen,
  Info,
  Mail,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { SUPERCAR_BRANDS, type BrandId } from '../data/supercarsData';

export type NavTab = 'home' | 'showroom' | 'articles' | 'about' | 'contact';

interface NavigationHeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentBrandId: BrandId;
  onSelectBrand: (brandId: BrandId) => void;
  isThai: boolean;
  onToggleLanguage: () => void;
  onOpenCompare: () => void;
}

interface NavItemDef {
  id: NavTab;
  labelTh: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  activeTab,
  onSelectTab,
  currentBrandId,
  onSelectBrand,
  isThai,
  onToggleLanguage,
  onOpenCompare,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const brandList: BrandId[] = ['porsche', 'nissan', 'lamborghini', 'toyota'];

  const navItems: NavItemDef[] = [
    { id: 'home', labelTh: 'หน้าแรก', labelEn: 'Home', icon: Compass },
    { id: 'showroom', labelTh: 'คลังรถยนต์', labelEn: 'Products', icon: Car },
    { id: 'articles', labelTh: 'บทความวิศวกรรม', labelEn: 'Articles', icon: BookOpen },
    { id: 'about', labelTh: 'เกี่ยวกับเรา', labelEn: 'About Us', icon: Info },
    { id: 'contact', labelTh: 'ติดต่อเรา', labelEn: 'Contact Us', icon: Mail },
  ];

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 md:px-8 py-3 backdrop-blur-xl bg-slate-950/85">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* 1. BRAND LOGO & TITLE */}
        <div
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <div className="text-sm md:text-base font-black tracking-tight text-white flex items-center gap-2">
              SUPERCAR ARCHIVE
              <span className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                3D INTERACTIVE
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              PORSCHE • NISSAN • LAMBORGHINI • TOYOTA
            </div>
          </div>
        </div>

        {/* 2. MAIN NAVIGATION TABS (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 p-1 rounded-2xl border border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isThai ? item.labelTh : item.labelEn}</span>
              </button>
            );
          })}
        </nav>

        {/* 3. RIGHT TOOLS & ACTIONS */}
        <div className="flex items-center gap-2">
          {/* Compare VS Button */}
          <button
            onClick={onOpenCompare}
            className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-bold items-center gap-1.5 transition-all"
            title={isThai ? 'เปรียบเทียบซูเปอร์คาร์' : 'Compare Supercars'}
          >
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono">{isThai ? 'ประลองสเปก' : 'VS BATTLE'}</span>
          </button>

          {/* Language Switch */}
          <button
            onClick={onToggleLanguage}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-mono font-bold flex items-center gap-1 transition-all"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{isThai ? 'TH' : 'EN'}</span>
          </button>

          {/* GitHub Repo */}
          <a
            href="https://github.com/osakaspn-afk/supercar-history-3d"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-all"
            title="GitHub osakaspn-afk"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* SUB-BAR: QUICK BRAND SELECTOR (Shown on Home and Products/Showroom) */}
      {(activeTab === 'home' || activeTab === 'showroom') && (
        <div className="max-w-7xl mx-auto pt-2.5 mt-2 border-t border-white/5 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">{isThai ? 'เลือกรุ่นไฮไลต์:' : 'Active Marque:'}</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {brandList.map((bId) => {
              const brand = SUPERCAR_BRANDS[bId];
              const isBrandActive = currentBrandId === bId;
              return (
                <button
                  key={bId}
                  onClick={() => onSelectBrand(bId)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isBrandActive
                      ? 'bg-slate-800 text-white shadow-md border border-white/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                  style={{
                    boxShadow: isBrandActive ? `0 0 15px ${brand.heritageColor}40` : undefined,
                  }}
                >
                  <span>{brand.countryFlag}</span>
                  <span>{brand.name}</span>
                  {isBrandActive && (
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: brand.heritageColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-500 flex-shrink-0">
            <span>{SUPERCAR_BRANDS[currentBrandId].models[0].name}</span>
          </div>
        </div>
      )}

      {/* MOBILE DRAWER / MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 pb-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{isThai ? item.labelTh : item.labelEn}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenCompare();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-bold text-amber-400 p-2"
            >
              <Swords className="w-4 h-4" />
              <span>{isThai ? 'ประลองสเปก (VS Battle)' : 'VS Battle'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
