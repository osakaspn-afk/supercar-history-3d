import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { type BrandId, SUPERCAR_BRANDS } from '../data/supercarsData';

interface SiteFooterProps {
  isThai: boolean;
  onNavigateTab: (tab: 'home' | 'showroom' | 'articles' | 'about' | 'contact') => void;
  onSelectBrand?: (brandId: BrandId) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  isThai,
  onNavigateTab,
  onSelectBrand,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const brandKeys: BrandId[] = ['porsche', 'nissan', 'lamborghini', 'toyota'];

  return (
    <footer className="w-full border-t border-white/10 bg-[#06080d] pt-14 pb-10 px-4 md:px-8 text-slate-400 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-red-600/30">
                ⚡
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white font-mono">
                  SUPERCAR ARCHIVE 3D
                </span>
                <p className="text-[11px] font-mono text-slate-400">
                  {isThai
                    ? 'คลังประวัติศาสตร์และเสียงเครื่องยนต์ซูเปอร์คาร์ 3 มิติ'
                    : 'Digital Museum of Internal Combustion Heritage'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-1">
              {isThai
                ? 'ร่วมเฉลิมฉลองศิลปะวิศวกรรมสันดาปภายในระดับตำนานของ Porsche, Nissan, Lamborghini และ Toyota ผ่านระบบ 3D WebGL และการสังเคราะห์เสียงลูกสูบเสมือนจริง'
                : 'A living digital tribute to peak internal combustion engineering across Porsche, Nissan, Lamborghini, and Toyota through real-time 3D WebGL.'}
            </p>

            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://github.com/osakaspn-afk/supercar-history-3d"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-mono transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {isThai ? 'หน้าหลัก' : 'Navigation'}
            </span>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('home');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  {isThai ? 'หน้าแรก (Home)' : 'Home Overview'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('showroom');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  {isThai ? 'คลังรถยนต์ 3D (Products)' : '3D Showroom Studio'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('articles');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  {isThai ? 'บทความวิศวกรรม (Articles)' : 'Engineering Articles'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('about');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  {isThai ? 'เกี่ยวกับเรา (About Us)' : 'About Archive'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigateTab('contact');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  {isThai ? 'ติดต่อเรา (Contact Us)' : 'Contact & FAQ'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Featured Marques */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {isThai ? 'ยนตรกรรมระดับตำนาน' : 'Iconic Marques'}
            </span>
            <ul className="flex flex-col gap-2 text-xs">
              {brandKeys.map((bId) => {
                const b = SUPERCAR_BRANDS[bId];
                return (
                  <li key={bId}>
                    <button
                      onClick={() => {
                        onSelectBrand?.(bId);
                        onNavigateTab('showroom');
                        scrollToTop();
                      }}
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span>{b.countryFlag}</span>
                      <span>{b.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 5: Technical Engine Highlights */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {isThai ? 'เทคโนโลยีการแสดงผล' : '3D Engine & Audio'}
            </span>
            <ul className="flex flex-col gap-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Three.js Real-time 60 FPS WebGL</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>Web Audio Harmonic Synthesizer</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Physical PBR Shader Materials</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Streamline Aerodynamics Physics</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span>© 2026 SUPERCAR ARCHIVE 3D</span>
            <span>•</span>
            <span className="text-slate-500">
              {isThai
                ? 'สงวนลิขสิทธิ์เพื่อการศึกษาและการอนุรักษ์ประวัติศาสตร์ยานยนต์'
                : 'Curated for educational & non-commercial automotive preservation'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all border border-white/5"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{isThai ? 'กลับขึ้นด้านบน' : 'Back to Top'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
