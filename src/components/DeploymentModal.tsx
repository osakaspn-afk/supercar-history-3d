import { X, Box, Cloud, Terminal, Copy } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  isThai: boolean;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({
  isOpen,
  onClose,
  isThai,
}) => {
  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn text-white">
      <div className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold mb-2">
            <Terminal className="w-3.5 h-3.5" />
            DEPLOYMENT & CLOUD INTEGRATION
          </div>
          <h2 className="text-2xl md:text-3xl font-black">
            {isThai ? 'คู่มือการรัน Docker Desktop & Cloudflare' : 'Docker Desktop & Cloudflare Setup'}
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            {isThai
              ? 'คำสั่งพร้อมใช้สำหรับการรันผ่าน Docker Desktop และเผยแพร่สู่ Cloudflare / GitHub'
              : 'Turn-key commands for running on Docker Desktop and deploying to Cloudflare & GitHub'}
          </p>
        </div>

        <div className="space-y-6">
          {/* 1. Docker Desktop */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 font-bold text-sm text-blue-400">
                <Box className="w-4 h-4" />
                1. {isThai ? 'รันด้วย Docker Desktop (Local)' : 'Run with Docker Desktop (Local)'}
              </span>
              <button
                onClick={() => copyToClipboard('docker compose up --build')}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
              >
                <Copy className="w-3 h-3" />
                Copy
              </button>
            </div>
            <p className="text-xs text-slate-300 mb-2">
              {isThai
                ? 'เปิดโปรแกรม Docker Desktop บนคอมพิวเตอร์ของคุณ จากนั้นรันคำสั่งด้านล่างในโฟลเดอร์โปรเจกต์:'
                : 'Ensure Docker Desktop is running, then execute:'}
            </p>
            <pre className="bg-black/60 p-3 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto border border-white/5">
              docker compose up --build
            </pre>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              → {isThai ? 'เปิดเบราว์เซอร์เข้าที่' : 'Access application at'}:{' '}
              <a href="http://localhost:8090" target="_blank" rel="noreferrer" className="text-cyan-400 underline">
                http://localhost:8090
              </a>
            </p>
          </div>

          {/* 2. Cloudflare Deployment */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-orange-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 font-bold text-sm text-orange-400">
                <Cloud className="w-4 h-4" />
                2. {isThai ? 'เผยแพร่สู่ Cloudflare (Pages หรือ Tunnel)' : 'Deploy to Cloudflare (Pages or Tunnel)'}
              </span>
            </div>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <p className="font-semibold text-white mb-1">
                  Option A: Cloudflare Pages (Direct Deployment)
                </p>
                <pre className="bg-black/60 p-3 rounded-xl font-mono text-xs text-amber-300 overflow-x-auto border border-white/5">
                  npm run build{'\n'}npx wrangler pages deploy dist --project-name=supercar-archive
                </pre>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">
                  Option B: Cloudflare Zero-Trust Tunnel (via Docker Compose)
                </p>
                <p className="text-[11px] text-slate-400">
                  {isThai
                    ? 'ในไฟล์ docker-compose.yml มีการคอนฟิก service cloudflared ไว้เรียบร้อยแล้ว'
                    : 'The cloudflared service is integrated in docker-compose.yml ready to expose port 3000 safely without opening router ports.'}
                </p>
              </div>
            </div>
          </div>

          {/* 3. GitHub Repository */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 font-bold text-sm text-slate-200">
                <GithubIcon className="w-4 h-4" />
                3. {isThai ? 'เชื่อมต่อและพุชขึ้น GitHub' : 'Push to GitHub Repository'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-2">
              GitHub Profile:{' '}
              <a
                href="https://github.com/osakaspn-afk"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline font-mono"
              >
                https://github.com/osakaspn-afk
              </a>
            </p>
            <pre className="bg-black/60 p-3 rounded-xl font-mono text-xs text-sky-300 overflow-x-auto border border-white/5">
              git init{'\n'}git add .{'\n'}git commit -m "feat: 3D interactive supercar archive"{'\n'}git remote add origin https://github.com/osakaspn-afk/supercar-archive.git{'\n'}git branch -M main{'\n'}git push -u origin main
            </pre>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs tracking-wider uppercase transition-all"
          >
            {isThai ? 'ปิด' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
