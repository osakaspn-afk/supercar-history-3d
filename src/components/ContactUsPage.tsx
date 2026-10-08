import React, { useState } from 'react';
import {
  Mail,
  Send,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  Shield,
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';

interface ContactUsPageProps {
  isThai: boolean;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ isThai }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'model_request',
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 4000);
  };

  const faqs = [
    {
      q: isThai
        ? 'ระบบสังเคราะห์เสียงเครื่องยนต์ (Acoustic Engine) ทำงานอย่างไร?'
        : 'How does the procedural engine sound synthesis work?',
      a: isThai
        ? 'เราไม่ได้ใช้ไฟล์เสียงบันทึกแบบวนลูปธรรมดา แต่ใช้ Web Audio API สังเคราะห์ฮาร์มอนิกความถี่ตามกระบอกสูบจริง (เช่น Flat-6, V6 Twin-Turbo, V12 และ V10) คำนวณความถี่พื้นฐานจากค่า RPM และจำลองเสียงโบล์วออฟวาล์ว (Blow-Off Valve) กับแบคไฟร์ (Backfire) แบบเรียลไทม์'
        : 'Instead of simple recorded looping samples, we utilize the browser Web Audio API to procedurally generate cylinder pulse harmonics (Flat-6, VR38 V6, V12, V10) based on real-time RPM, throttle physics, and turbo blow-off flutter.',
    },
    {
      q: isThai
        ? 'สามารถใช้งานบนสมาร์ทโฟนหรือแท็บเล็ตได้ราบรื่นหรือไม่?'
        : 'Does this run smoothly on mobile devices and tablets?',
      a: isThai
        ? 'ตัวแอปพลิเคชันรองรับทั้งหน้าจอสัมผัสบนมือถือและคอมพิวเตอร์เดสก์ท็อป โดยเอนจิน Three.js จะปรับลดอัตราการจำลองฟิสิกส์และขนาด Shadow map อัตโนมัติเพื่อให้คงอัตราเฟรมเรต 60 FPS บนอุปกรณ์พกพา'
        : 'Yes! The responsive Three.js viewport adapts texture rendering and shadow passes dynamically to maintain a stable 60 FPS on modern smartphones and tablets.',
    },
    {
      q: isThai
        ? 'ข้อมูลความเร็วและเวลาต่อรอบสนาม Nürburgring อ้างอิงจากแหล่งใด?'
        : 'Where are the top speeds and Nürburgring lap times sourced from?',
      a: isThai
        ? 'ข้อมูลเวลาต่อรอบและสเปกเครื่องยนต์ทั้งหมดถูกรวบรวมจากสถิติเวลาอย่างเป็นทางการของผู้ผลิต (Official Factory Certified Lap Times) และการทดสอบของสื่อยานยนต์ระดับสากล เช่น Sport Auto บนสนาม Nürburgring Nordschleife'
        : 'Lap times and powertrain specifications are sourced directly from certified manufacturer factory records and internationally sanctioned tests such as Sport Auto Supertests on the Nürburgring Nordschleife.',
    },
    {
      q: isThai
        ? 'โมเดล 3D และเนื้อหาประวัติศาสตร์นำไปใช้เพื่อการศึกษาได้หรือไม่?'
        : 'Can the 3D models and technical specs be used for educational purposes?',
      a: isThai
        ? 'โปรเจกต์นี้สร้างขึ้นเพื่อการศึกษาและการอนุรักษ์ประวัติศาสตร์ยานยนต์ (Open Access / Non-commercial Educational Use) ข้อมูลเทเลเมทรีและสเปกทั้งหมดถูกรวบรวมจากเอกสารทางการของผู้ผลิตและประวัติการแข่งขันระดับสากล'
        : 'This project is created for non-commercial educational preservation. Vehicle telemetry, history, and technical specs are curated from manufacturer archives and sanctioned motorsport records.',
    },
  ];

  const locations = [
    {
      city: 'Stuttgart, Germany',
      brand: 'Porsche Heritage Liaison',
      desc: isThai ? 'ศูนย์กลางประวัติศาสตร์เครื่องยนต์ Boxer และสนามแข่ง Nürburgring' : 'Flat-6 engineering & Nürburgring telemetry records',
    },
    {
      city: "Sant'Agata Bolognese, Italy",
      brand: 'Lamborghini V12 Archive',
      desc: isThai ? 'บันทึกตำนานเครื่อง V12 ไร้ระบบอัดอากาศตั้งแต่ Miura สู่ Revuelto' : 'V12 acoustic heritage from Miura to Revuelto HPEV',
    },
    {
      city: 'Yokohama & Aichi, Japan',
      brand: 'Nissan & Toyota Engineering Hub',
      desc: isThai ? 'ตำนาน ATTESA E-TS, ขุมพลัง VR38DETT และการปรับจูนอะคูสติกส์ LFA V10' : 'VR38DETT twin-turbo data & Yamaha acoustic surge research',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-16">
      {/* 1. HEADER */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-emerald-400 mb-4 shadow-sm">
          <Mail className="w-3.5 h-3.5" />
          <span>{isThai ? 'ศูนย์ติดต่อ & สอบถามข้อมูล' : 'COLLECTOR & INQUIRY CENTER'}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
          {isThai ? 'ร่วมสร้างประวัติศาสตร์ยานยนต์กับเรา' : 'Connect with the Curators'}
        </h1>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          {isThai
            ? 'มีข้อเสนอแนะเกี่ยวกับโมเดล 3D ข้อมูลทางเทคนิคเครื่องยนต์ หรือต้องการร่วมมือในโปรเจกต์นิทรรศการยานยนต์ ติดต่อทีมงานได้โดยตรง'
            : 'Have requests for upcoming 3D vehicle models, sound telemetry feedback, or technical collaboration? Send us your message below.'}
        </p>
      </div>

      {/* 2. FORM & INFO CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Form (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 md:p-10 rounded-3xl border border-white/10 bg-slate-900/60 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />

          {submitted ? (
            <div className="flex flex-col items-center text-center py-12 gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {isThai ? 'ส่งข้อความเรียบร้อยแล้ว!' : 'Message Received!'}
              </h3>
              <p className="text-sm text-slate-300 max-w-md">
                {isThai
                  ? 'ขอบคุณที่ติดต่อเข้ามา ทีมงานภัณฑารักษ์ยานยนต์จะตรวจสอบข้อความและติดต่อกลับทางอีเมลของคุณโดยเร็วที่สุด'
                  : 'Thank you for reaching out. Our engineering curation team will review your feedback and get back to you shortly.'}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', topic: 'model_request', message: '' });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
              >
                {isThai ? 'ส่งข้อความอื่นเพิ่มเติม' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>{isThai ? 'แบบฟอร์มส่งข้อความ' : 'Inquiry Form'}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {isThai ? 'ตอบกลับภายใน 24 ชม.' : 'Typical reply: 24h'}
                </span>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">
                    {isThai ? 'ชื่อของคุณ / หน่วยงาน' : 'Your Name / Org'} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isThai ? 'เช่น พลศิษฐ์ หรือ Supercar Club' : 'e.g. Alex Henderson'}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 focus:border-red-500 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">
                    {isThai ? 'อีเมลสำหรับติดต่อกลับ' : 'Email Address'} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 focus:border-red-500 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-all"
                  />
                </div>
              </div>

              {/* Inquiry Topic */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-bold text-slate-300">
                  {isThai ? 'หัวข้อที่ต้องการติดต่อ' : 'Inquiry Category'}
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 focus:border-red-500 focus:outline-none text-white text-sm transition-all"
                >
                  <option value="model_request">
                    {isThai ? '🏎️ เสนอเพิ่มรุ่นรถ / โมเดล 3D (New Model Request)' : '🏎️ New 3D Vehicle Model Request'}
                  </option>
                  <option value="sound_feedback">
                    {isThai ? '🎙️ แนะนำข้อมูลเสียงเครื่องยนต์ / เทเลเมทรี (Acoustic Feedback)' : '🎙️ Engine Audio & Telemetry Feedback'}
                  </option>
                  <option value="collaboration">
                    {isThai ? '🏛️ สื่อมวลชน / นิทรรศการยานยนต์ (Press & Exhibition)' : '🏛️ Press & Exhibition Collaboration'}
                  </option>
                  <option value="tech_issue">
                    {isThai ? '💻 รายงานปัญหาเทคนิค / สถาปัตยกรรม (Bug & Tech Support)' : '💻 Bug Report & Technical Support'}
                  </option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono font-bold text-slate-300">
                  {isThai ? 'รายละเอียดข้อความ' : 'Message'} <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    isThai
                      ? 'ระบุข้อความของคุณ เช่น อยากเสนอให้เพิ่ม Ferrari F40 หรือ McLaren F1 เข้าคลังรถ...'
                      : 'Share your thoughts, suggestions, or collaboration proposals here...'
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 focus:border-red-500 focus:outline-none text-white text-sm placeholder:text-slate-500 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>{isThai ? 'ส่งข้อความถึงทีมภัณฑารักษ์' : 'Submit Inquiry'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Hubs & Quick Links (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Virtual Hubs */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-900/60 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>{isThai ? 'เครือข่ายวิจัยยานยนต์' : 'Heritage Liaison Hubs'}</span>
            </div>

            <div className="flex flex-col gap-3">
              {locations.map((loc, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/5 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-200">{loc.city}</span>
                    <span className="text-[10px] font-mono text-amber-400">{loc.brand}</span>
                  </div>
                  <p className="text-xs text-slate-400">{loc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Source & Community Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-slate-950/80 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>{isThai ? 'ชุมชนโอเพนซอร์ส' : 'Open Source Community'}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isThai
                ? 'โปรเจกต์นี้เปิดเผยซอร์สโค้ดบน GitHub คุณสามารถตรวจสอบโค้ด ส่ง Pull Request หรือร่วมสร้างโมเดล 3D เพิ่มเติมได้ตลอดเวลา'
                : 'Hosted publicly on GitHub. You can inspect the source code, open issues for new car telemetry, or contribute 3D assets.'}
            </p>
            <a
              href="https://github.com/osakaspn-afk/supercar-history-3d"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-mono font-bold text-slate-200 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <GithubIcon className="w-4 h-4 text-white" />
                <span>osakaspn-afk / supercar-history-3d</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-all" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. FAQ SECTION */}
      <section className="flex flex-col gap-6 max-w-4xl mx-auto w-full pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isThai ? 'คำถามที่พบบ่อย' : 'FREQUENTLY ASKED QUESTIONS'}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">
            {isThai ? 'สิ่งที่คุณอาจต้องการทราบ' : 'Everything You Need to Know'}
          </h2>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden bg-slate-900/50 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-bold text-white">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
