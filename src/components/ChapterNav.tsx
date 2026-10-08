import React from 'react';

interface ChapterNavProps {
  activeChapter: number;
  onJumpToChapter: (index: number) => void;
  isThai: boolean;
  accentColor: string;
}

export const ChapterNav: React.FC<ChapterNavProps> = ({
  activeChapter,
  onJumpToChapter,
  isThai,
  accentColor,
}) => {
  const chapters = [
    { num: '01', nameEn: 'Intro', nameTh: 'บทนำ' },
    { num: '02', nameEn: 'Aerodynamics', nameTh: 'อากาศพลศาสตร์' },
    { num: '03', nameEn: 'Powertrain', nameTh: 'ขุมพลัง' },
    { num: '04', nameEn: 'Monocoque', nameTh: 'แชสซีส์' },
    { num: '05', nameEn: 'Nürburgring', nameTh: 'สนามแข่ง' },
    { num: '06', nameEn: '3D Studio', nameTh: 'สตูดิโอ 3D' },
  ];

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-end gap-3 pointer-events-auto">
      {chapters.map((ch, idx) => {
        const isActive = activeChapter === idx;
        return (
          <button
            key={ch.num}
            onClick={() => onJumpToChapter(idx)}
            className="group flex items-center gap-2.5 transition-all text-right py-1"
          >
            <span
              className={`text-[11px] font-mono tracking-wider transition-all duration-300 ${
                isActive
                  ? 'text-white font-bold opacity-100 translate-x-0'
                  : 'text-slate-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
              }`}
            >
              {isThai ? ch.nameTh : ch.nameEn}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[10px] font-mono transition-all ${
                  isActive ? 'text-white font-bold' : 'text-slate-600 group-hover:text-slate-400'
                }`}
              >
                {ch.num}
              </span>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'scale-150 shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                    : 'bg-slate-700 group-hover:bg-slate-500 group-hover:scale-125'
                }`}
                style={{ backgroundColor: isActive ? accentColor : undefined }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};
