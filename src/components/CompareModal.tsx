import React, { useState } from 'react';
import { X, Trophy, Zap, Gauge, Weight, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SUPERCAR_BRANDS, type SupercarModel, type BrandId } from '../data/supercarsData';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  isThai: boolean;
  initialCar1?: SupercarModel;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  isThai,
  initialCar1,
}) => {
  // Collect all supercars across brands into a flat array
  const allCars: SupercarModel[] = Object.values(SUPERCAR_BRANDS).flatMap((brand) => brand.models);

  const [car1Id, setCar1Id] = useState<string>(initialCar1?.id || allCars[0]?.id || '');
  const [car2Id, setCar2Id] = useState<string>(
    allCars.find((c) => c.brandId !== initialCar1?.brandId)?.id || allCars[1]?.id || ''
  );

  React.useEffect(() => {
    if (initialCar1?.id) {
      setCar1Id(initialCar1.id);
    }
  }, [initialCar1?.id]);

  if (!isOpen) return null;

  const car1 = allCars.find((c) => c.id === car1Id) || allCars[0];
  const car2 = allCars.find((c) => c.id === car2Id) || allCars[1];

  const triggerBattle = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ef4444', '#3b82f6', '#eab308', '#10b981'],
    });
  };

  const getBrandBadge = (brandId: BrandId) => {
    const brand = SUPERCAR_BRANDS[brandId];
    return `${brand.countryFlag} ${brand.name}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold mb-2">
            <Trophy className="w-3.5 h-3.5" />
            SUPERCAR HEAD-TO-HEAD BATTLE
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">
            {isThai ? 'เปรียบเทียบสมรรถนะซูเปอร์คาร์' : 'Supercar Performance Benchmark'}
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            {isThai
              ? 'เปรียบเทียบข้อมูลจำเพาะเชิงลึกระหว่างซูเปอร์คาร์ตัวท็อปของแต่ละแบรนด์'
              : 'Direct specifications comparison between iconic titans'}
          </p>
        </div>

        {/* Car Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Car 1 Selector */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-700/60">
            <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
              {isThai ? 'เลือกซูเปอร์คาร์ คันที่ 1' : 'Select Competitor 1'}
            </label>
            <select
              value={car1Id}
              onChange={(e) => {
                setCar1Id(e.target.value);
                triggerBattle();
              }}
              className="w-full bg-slate-800 text-white border border-slate-600 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:border-red-500"
            >
              {allCars.map((c) => (
                <option key={`c1-${c.id}`} value={c.id}>
                  {getBrandBadge(c.brandId)} - {c.name} ({c.year})
                </option>
              ))}
            </select>
          </div>

          {/* Car 2 Selector */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-700/60">
            <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
              {isThai ? 'เลือกซูเปอร์คาร์ คันที่ 2' : 'Select Competitor 2'}
            </label>
            <select
              value={car2Id}
              onChange={(e) => {
                setCar2Id(e.target.value);
                triggerBattle();
              }}
              className="w-full bg-slate-800 text-white border border-slate-600 rounded-xl px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:border-blue-500"
            >
              {allCars.map((c) => (
                <option key={`c2-${c.id}`} value={c.id}>
                  {getBrandBadge(c.brandId)} - {c.name} ({c.year})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Head-to-Head Cards */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 mb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-b from-red-950/20 to-slate-900/50 border border-red-500/20 text-center">
            <span className="text-[10px] font-mono text-red-400 font-bold uppercase">{car1.heroBadge}</span>
            <h3 className="text-base md:text-xl font-bold mt-1 text-white">{car1.name}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{car1.year} • {car1.specs.engine}</p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-b from-blue-950/20 to-slate-900/50 border border-blue-500/20 text-center">
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">{car2.heroBadge}</span>
            <h3 className="text-base md:text-xl font-bold mt-1 text-white">{car2.name}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{car2.year} • {car2.specs.engine}</p>
          </div>
        </div>

        {/* Comparative Metric Rows */}
        <div className="space-y-4">
          {/* Horsepower */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1.5">
              <span className={`font-bold ${car1.specs.power >= car2.specs.power ? 'text-red-400' : 'text-slate-300'}`}>
                {car1.specs.power} HP {car1.specs.power > car2.specs.power && '👑'}
              </span>
              <span className="flex items-center gap-1 font-bold text-slate-200 uppercase">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                {isThai ? 'แรงม้าสูงสุด (Horsepower)' : 'Max Horsepower'}
              </span>
              <span className={`font-bold ${car2.specs.power >= car1.specs.power ? 'text-blue-400' : 'text-slate-300'}`}>
                {car2.specs.power > car1.specs.power && '👑'} {car2.specs.power} HP
              </span>
            </div>
            <div className="flex h-3 rounded-full bg-slate-950 overflow-hidden p-0.5 gap-1">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-rose-400 rounded-l-full transition-all duration-500"
                style={{ width: `${(car1.specs.power / (car1.specs.power + car2.specs.power)) * 100}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-r-full transition-all duration-500"
                style={{ width: `${(car2.specs.power / (car1.specs.power + car2.specs.power)) * 100}%` }}
              />
            </div>
          </div>

          {/* 0-100 km/h Acceleration (Lower is better) */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1.5">
              <span className={`font-bold ${car1.specs.acceleration <= car2.specs.acceleration ? 'text-red-400' : 'text-slate-300'}`}>
                {car1.specs.acceleration}s {car1.specs.acceleration < car2.specs.acceleration && '👑'}
              </span>
              <span className="flex items-center gap-1 font-bold text-slate-200 uppercase">
                <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                0-100 km/h {isThai ? '(ความเร็วการออกตัว)' : '(Acceleration)'}
              </span>
              <span className={`font-bold ${car2.specs.acceleration <= car1.specs.acceleration ? 'text-blue-400' : 'text-slate-300'}`}>
                {car2.specs.acceleration < car1.specs.acceleration && '👑'} {car2.specs.acceleration}s
              </span>
            </div>
            <div className="flex h-3 rounded-full bg-slate-950 overflow-hidden p-0.5 gap-1">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-rose-400 rounded-l-full transition-all duration-500"
                style={{ width: `${((1 / car1.specs.acceleration) / (1 / car1.specs.acceleration + 1 / car2.specs.acceleration)) * 100}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-r-full transition-all duration-500"
                style={{ width: `${((1 / car2.specs.acceleration) / (1 / car1.specs.acceleration + 1 / car2.specs.acceleration)) * 100}%` }}
              />
            </div>
          </div>

          {/* Top Speed */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1.5">
              <span className={`font-bold ${car1.specs.topSpeed >= car2.specs.topSpeed ? 'text-red-400' : 'text-slate-300'}`}>
                {car1.specs.topSpeed} km/h {car1.specs.topSpeed > car2.specs.topSpeed && '👑'}
              </span>
              <span className="flex items-center gap-1 font-bold text-slate-200 uppercase">
                <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                {isThai ? 'ความเร็วสูงสุด (Top Speed)' : 'Top Speed'}
              </span>
              <span className={`font-bold ${car2.specs.topSpeed >= car1.specs.topSpeed ? 'text-blue-400' : 'text-slate-300'}`}>
                {car2.specs.topSpeed > car1.specs.topSpeed && '👑'} {car2.specs.topSpeed} km/h
              </span>
            </div>
            <div className="flex h-3 rounded-full bg-slate-950 overflow-hidden p-0.5 gap-1">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-rose-400 rounded-l-full transition-all duration-500"
                style={{ width: `${(car1.specs.topSpeed / (car1.specs.topSpeed + car2.specs.topSpeed)) * 100}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-r-full transition-all duration-500"
                style={{ width: `${(car2.specs.topSpeed / (car1.specs.topSpeed + car2.specs.topSpeed)) * 100}%` }}
              />
            </div>
          </div>

          {/* Weight */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1.5">
              <span className={`font-bold ${car1.specs.weight <= car2.specs.weight ? 'text-red-400' : 'text-slate-300'}`}>
                {car1.specs.weight} kg {car1.specs.weight < car2.specs.weight && '👑'}
              </span>
              <span className="flex items-center gap-1 font-bold text-slate-200 uppercase">
                <Weight className="w-3.5 h-3.5 text-orange-400" />
                {isThai ? 'น้ำหนักตัวถัง (Curb Weight)' : 'Curb Weight'}
              </span>
              <span className={`font-bold ${car2.specs.weight <= car1.specs.weight ? 'text-blue-400' : 'text-slate-300'}`}>
                {car2.specs.weight < car1.specs.weight && '👑'} {car2.specs.weight} kg
              </span>
            </div>
          </div>

          {/* Nürburgring Lap Benchmark */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5 flex justify-between items-center text-xs">
            <span className="font-mono text-slate-300 font-semibold">{car1.specs.nurburgringLap || 'N/A'}</span>
            <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px]">
              🏁 Nürburgring Nordschleife
            </span>
            <span className="font-mono text-slate-300 font-semibold">{car2.specs.nurburgringLap || 'N/A'}</span>
          </div>

          {/* Transmission & Drivetrain */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900/30 border border-white/5">
              <p className="text-slate-400 text-[10px] uppercase">Drivetrain & Gearbox</p>
              <p className="text-slate-200 font-bold mt-0.5">{car1.specs.drivetrain}</p>
              <p className="text-slate-400 text-[11px] mt-0.5">{car1.specs.transmission}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/30 border border-white/5">
              <p className="text-slate-400 text-[10px] uppercase">Drivetrain & Gearbox</p>
              <p className="text-slate-200 font-bold mt-0.5">{car2.specs.drivetrain}</p>
              <p className="text-slate-400 text-[11px] mt-0.5">{car2.specs.transmission}</p>
            </div>
          </div>
        </div>

        {/* Footer Close */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs tracking-wider uppercase transition-all"
          >
            {isThai ? 'ปิดหน้าต่าง' : 'Close Comparison'}
          </button>
        </div>
      </div>
    </div>
  );
};
