import React from 'react';
import {
  Compass,
  Award,
  Layers,
  Volume2,
  Wind,
  ShieldCheck,
  Cpu,
  Globe2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface AboutUsPageProps {
  isThai: boolean;
  onNavigateToShowroom?: () => void;
  onNavigateToArticles?: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  isThai,
  onNavigateToShowroom,
  onNavigateToArticles,
}) => {
  const milestones = [
    {
      year: '1963 - 1964',
      title: isThai ? 'จุดกำเนิดสองมหาตำนานยุโรป' : 'Birth of Two European Legends',
      desc: isThai
        ? 'Ferdinand Alexander Porsche เปิดตัว 911 คูเป้เครื่องวางหลัง ขณะที่ Ferruccio Lamborghini ก่อตั้งแบรนด์วัวกระทิงเพื่อท้าทายขนบเดิมของวงการซูเปอร์คาร์'
        : 'Ferdinand Alexander Porsche unveiled the rear-engine 911 coupe, while Ferruccio Lamborghini founded Automobili Lamborghini to challenge automotive orthodoxy.',
      tag: 'Porsche & Lamborghini',
    },
    {
      year: '1969 - 1989',
      title: isThai ? 'การจุติของ "Godzilla" และแชมป์ Group A' : 'Rise of "Godzilla" & Group A Dominance',
      desc: isThai
        ? 'Nissan พัฒนาระบบขับเคลื่อนสี่ล้อ ATTESA E-TS ร่วมกับเครื่องยนต์ RB26DETT ใน Skyline GT-R R32 จนไร้พ่าย 29 สนามรวดในรายการ JTCC กวาดแชมป์ระดับตำนาน'
        : 'Nissan engineered ATTESA E-TS all-wheel drive and RB26DETT twin-turbo in the Skyline GT-R R32, dominating JTCC with 29 straight victories.',
      tag: 'Nissan Skyline',
    },
    {
      year: '2000 - 2012',
      title: isThai ? 'ทศวรรษแห่งความสมบูรณ์แบบทางเสียงและแอนะล็อก' : 'A Decade of Acoustic Perfection',
      desc: isThai
        ? 'Toyota และ Yamaha ร่วมมือกันใช้เวลากว่า 10 ปี สร้าง Lexus LFA ซูเปอร์คาร์ตัวถังคาร์บอนไฟเบอร์ 65% พร้อมขุมพลัง 1LR-GUE V10 ที่ได้รับการยกย่องว่าเสียงไพเราะที่สุดในโลก'
        : 'Toyota and Yamaha spent a decade crafting the Lexus LFA with 65% CFRP chassis and the 1LR-GUE V10, revered as the most musical exhaust note in history.',
      tag: 'Lexus LFA & Yamaha',
    },
    {
      year: '2022 - 2026',
      title: isThai ? 'ยุคทองแห่งแอร์โรไดนามิกส์และไฮบริดสมรรถนะสูง' : 'Era of Le Mans Aero & Hybrid Hypercars',
      desc: isThai
        ? 'Porsche 911 GT3 RS (992) นำระบบ DRS ปีกคาร์บอนสร้างดาวน์ฟอร์ซ 860 กก. ขณะที่ Lamborghini ผสานเครื่อง V12 ไร้ระบบอัดอากาศเข้ากับมอเตอร์ไฟฟ้า 3 ตัวใน Revuelto'
        : 'Porsche 911 GT3 RS introduces F1 DRS generating 860 kg of downforce, while Lamborghini pairs an NA V12 with three electric motors in the 1,015 hp Revuelto.',
      tag: 'Modern Peak',
    },
  ];

  const pillars = [
    {
      icon: Layers,
      title: isThai ? 'เรขาคณิตสามมิติความละเอียดสูง' : 'Sub-millimeter 3D Fidelity',
      desc: isThai
        ? 'เรนเดอร์โมเดลรถระดับสมจริงด้วย WebGL และ PBR Shaders พร้อมโหมด X-Ray โครงสร้างภายในและระบบเปิดประตู/ปีกหลัง'
        : 'Interactive high-fidelity WebGL models featuring physical PBR shaders, wireframe chassis inspection, and active aerodynamic surfaces.',
      accent: 'from-amber-500/20 to-orange-500/10 text-amber-400',
    },
    {
      icon: Volume2,
      title: isThai ? 'การสังเคราะห์เสียงตามหลักกายภาพ' : 'Procedural Acoustic Synthesis',
      desc: isThai
        ? 'จำลองความถี่รอบเครื่อง (RPM) และลำดับการจุดระเบิดของลูกสูบอย่างแท้จริง ทั้ง Flat-6, V6 Twin-Turbo, V12 และ Yamaha V10'
        : 'Pure real-time Web Audio synthesis simulating physical cylinder displacement, harmonics, and exhaust surge frequencies up to 9,500 RPM.',
      accent: 'from-rose-500/20 to-red-500/10 text-rose-400',
    },
    {
      icon: Wind,
      title: isThai ? 'อุโมงค์ลมพลศาสตร์เสมือนจริง' : 'Virtual Aerodynamic Tunnel',
      desc: isThai
        ? 'แสดงทิศทางการไหลของกระแสลม (Streamlines) และการกระจายตัวของแรงกด (Downforce) ตามการเคลื่อนที่ของอากาศพลศาสตร์'
        : 'Interactive particle-based streamline visualization mapping high-pressure frontal vortexes and diffuser wake currents.',
      accent: 'from-cyan-500/20 to-blue-500/10 text-cyan-400',
    },
    {
      icon: ShieldCheck,
      title: isThai ? 'คลังข้อมูลประวัติศาสตร์ที่ไม่บิดเบือน' : 'Curated Engineering Archive',
      desc: isThai
        ? 'บันทึกเกียรติประวัติ สเปกเครื่องยนต์ ขนาดกระบอกสูบ ระยะชัก และเบื้องหลังการแข่งขันในสนาม Nürburgring อย่างครบถ้วน'
        : 'Uncompromising technical archiving of powertrain specs, lap telemetry records, and the engineering rivalries behind each flagship.',
      accent: 'from-emerald-500/20 to-teal-500/10 text-emerald-400',
    },
  ];

  const stats = [
    { value: '4', label: isThai ? 'แบรนด์ระดับตำนาน' : 'Iconic Marques' },
    { value: '60+', label: isThai ? 'ปีแห่งการวิวัฒนาการ' : 'Years of Evolution' },
    { value: '9,500', label: isThai ? 'รอบต่อนาที (Max RPM)' : 'Peak Redline Emulation' },
    { value: '100%', label: isThai ? 'เว็บแอป 3D บนเบราว์เซอร์' : 'Interactive 3D WebGL' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-950/80 border border-white/10 p-8 md:p-14">
        {/* Soft Ambient Radial Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-red-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-cyan-600/15 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-cyan-400 mb-6 shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>{isThai ? 'เกี่ยวกับโปรเจกต์ & พันธกิจ' : 'MISSION & CURATION PHILOSOPHY'}</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-6">
            {isThai ? (
              <>
                อนุรักษ์จิตวิญญาณแห่ง{' '}
                <span className="bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                  จักรกลสันดาปภายใน
                </span>
              </>
            ) : (
              <>
                Preserving the Zenith of{' '}
                <span className="bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
                  Internal Combustion
                </span>
              </>
            )}
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8">
            {isThai
              ? 'ในยุคเปลี่ยนผ่านสู่อนาคตพลังงานไฟฟ้าที่ขับเคลื่อนอย่างไร้เสียง SUPERCAR ARCHIVE 3D ถูกสร้างขึ้นด้วยความหลงใหลในศิลปะจักรกล เพื่อบันทึกประวัติศาสตร์ เสียงคำรามอันเร้าใจ และมรดกทางวิศวกรรมของ 4 ค่ายยานยนต์ที่ยิ่งใหญ่ที่สุด: Porsche, Nissan, Lamborghini และ Toyota ในรูปแบบ 3D Interactive ที่ทุกคนสัมผัสได้บนเบราว์เซอร์'
              : 'As the world transitions toward silent electric transportation, SUPERCAR ARCHIVE 3D stands as a living digital museum celebrating the pinnacle of mechanical emotion: the balance of the boxer flat-6, the twin-turbo brutality of Godzilla, the acoustic majesty of the naturally aspirated V10, and the ferocious wail of the Italian V12.'}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {onNavigateToShowroom && (
              <button
                onClick={onNavigateToShowroom}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-105"
              >
                <span>{isThai ? 'เข้าชมคลังรถ 3D Studio' : 'Enter 3D Showroom'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {onNavigateToArticles && (
              <button
                onClick={onNavigateToArticles}
                className="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 font-bold text-sm flex items-center gap-2 transition-all"
              >
                <span>{isThai ? 'อ่านบทความวิศวกรรม' : 'Read Engineering Articles'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10 relative z-10">
          {stats.map((st, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-3xl md:text-4xl font-black font-mono text-white tracking-tight">
                {st.value}
              </span>
              <span className="text-xs text-slate-400 font-sans mt-1">{st.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. THE 4 PILLARS OF OUR ARCHIVE */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isThai ? 'เสาหลักแห่งการจัดเก็บ' : 'FOUR PILLARS OF PRESERVATION'}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            {isThai ? 'เทคโนโลยีที่ทำให้ประวัติศาสตร์มีชีวิต' : 'Technologies Powering the Archive'}
          </h2>
          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            {isThai
              ? 'การผสมผสานวิทยาการคอมพิวเตอร์กราฟิกส์ ฟิสิกส์อะคูสติกส์ และข้อมูลวิศวกรรมสนามแข่งจริง'
              : 'Synthesizing real-time computer graphics, procedural acoustics, and authentic motorsport telemetry.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all flex gap-5 bg-gradient-to-br from-slate-900/80 to-slate-950/90"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${p.accent} border border-white/10 shadow-lg`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">{p.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. HISTORICAL TIMELINE */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>{isThai ? 'เส้นทางประวัติศาสตร์' : 'HISTORICAL TRAJECTORY'}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            {isThai ? 'วิวัฒนาการ 6 ทศวรรษแห่งความเร็ว' : 'Six Decades of Speed & Passion'}
          </h2>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 pl-6 md:pl-10 flex flex-col gap-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-red-500 group-hover:bg-red-500 transition-all shadow-md shadow-red-500/20" />

              <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/90 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                    {m.year}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {m.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PERFORMANCE & USER EXPERIENCE HIGHLIGHT */}
      <section className="glass-panel p-8 rounded-3xl border border-white/10 bg-slate-950/70 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">
              {isThai ? 'นวัตกรรมการแสดงผลสามมิติบนเว็บเบราว์เซอร์' : 'Next-Generation Browser 3D Experience'}
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              {isThai
                ? 'เข้าชมได้ทันทีผ่านคอมพิวเตอร์และสมาร์ทโฟนโดยไม่ต้องติดตั้งแอปพลิเคชันเพิ่มเติม ประมวลผลกราฟิกและฟิสิกส์อากาศพลศาสตร์แบบเรียลไทม์ 60 FPS'
                : 'Instantly accessible on desktop and mobile browsers with zero downloads. Delivers real-time 60 FPS graphics, PBR lighting, and physics-based aerodynamic simulation.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isThai ? 'เข้าชมได้ทุกอุปกรณ์' : 'Universal Compatibility'}</span>
          </span>
        </div>
      </section>
    </div>
  );
};
