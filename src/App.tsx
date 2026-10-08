import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { SUPERCAR_BRANDS, type BrandId, type SupercarModel } from './data/supercarsData';
import { ScrollExperienceCanvas } from './components/ScrollExperienceCanvas';
import { ScrollStorySections } from './components/ScrollStorySections';
import { ShowroomCanvas, type CameraPreset, type StudioEnvironment } from './components/ShowroomCanvas';
import { ViewportControls } from './components/ViewportControls';
import { EngineRevGauge } from './components/EngineRevGauge';
import { SupercarDetails } from './components/SupercarDetails';
import { BrandNavbar } from './components/BrandNavbar';
import { BrandHero } from './components/BrandHero';
import { ChapterNav } from './components/ChapterNav';
import { CompareModal } from './components/CompareModal';
import { DeploymentModal } from './components/DeploymentModal';
import { GithubIcon } from './components/GithubIcon';
import { Box, ScrollText, Rotate3d } from 'lucide-react';

export const App: React.FC = () => {
  // Brand & Model State
  const [selectedBrandId, setSelectedBrandId] = useState<BrandId>('porsche');
  const currentBrand = SUPERCAR_BRANDS[selectedBrandId];

  const [selectedModel, setSelectedModel] = useState<SupercarModel>(currentBrand.models[0]);
  const [selectedColor, setSelectedColor] = useState<string>(currentBrand.models[0].colorPalette[0].hex);
  const [finish, setFinish] = useState<'metallic' | 'matte' | 'carbon'>('metallic');

  // Presentation Mode: 'scrollStory' (Gazadevs-style 3D Cinematic Scrollytelling) vs 'showroom' (360° Turntable Studio)
  const [viewMode, setViewMode] = useState<'scrollStory' | 'showroom'>('scrollStory');

  // Scroll Story States
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [isFreeOrbitInScroll, setIsFreeOrbitInScroll] = useState<boolean>(false);

  // Showroom Sandbox States (Used when in showroom mode)
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('cinematic');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [environment, setEnvironment] = useState<StudioEnvironment>('cyber');
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(true);
  const [doorsOpen, setDoorsOpen] = useState<boolean>(false);
  const [wingActive, setWingActive] = useState<boolean>(true);
  const [windTunnelActive, setWindTunnelActive] = useState<boolean>(false);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [underglow, setUnderglow] = useState<boolean>(true);
  const [wheelSpinSpeed, setWheelSpinSpeed] = useState<number>(0);

  // Localization (Thai / English)
  const [isThai, setIsThai] = useState<boolean>(true);

  // Modals
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isDeploymentOpen, setIsDeploymentOpen] = useState<boolean>(false);

  // Initialize Lenis Smooth Scroll on Mount
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      lerp: 0.08,
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScrollProgress(progress);

      const chapterIndex = Math.min(5, Math.floor(progress * 6));
      setActiveChapter(chapterIndex);
    };

    lenis.on('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Jump to specific chapter in scroll mode
  const handleJumpToChapter = (chapterIdx: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (chapterIdx / 5) * maxScroll;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Brand switch handler
  const handleSelectBrand = (brandId: BrandId) => {
    setSelectedBrandId(brandId);
    const newBrand = SUPERCAR_BRANDS[brandId];
    const defaultModel = newBrand.models[0];
    setSelectedModel(defaultModel);
    setSelectedColor(defaultModel.colorPalette[0].hex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Model switch handler
  const handleSelectModel = (model: SupercarModel) => {
    setSelectedModel(model);
    setSelectedColor(model.colorPalette[0].hex);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-red-500 selection:text-white relative">
      {/* 1. TOP NAVBAR */}
      <BrandNavbar
        currentBrandId={selectedBrandId}
        onSelectBrand={handleSelectBrand}
        isThai={isThai}
        onToggleLanguage={() => setIsThai((prev) => !prev)}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Mode Switcher Floating Pill */}
      <div className="fixed top-16 right-4 md:right-8 z-30 pointer-events-auto">
        <div className="glass-panel p-1 rounded-2xl flex items-center gap-1 border border-white/10 shadow-2xl">
          <button
            onClick={() => setViewMode('scrollStory')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'scrollStory'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ScrollText className="w-3.5 h-3.5" />
            <span>{isThai ? 'โหมดเรื่องราว (SCROLL)' : 'SCROLL STORY'}</span>
          </button>
          <button
            onClick={() => setViewMode('showroom')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'showroom'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>{isThai ? 'โหมดโชว์รูม 360°' : '360° STUDIO'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE A: GAZADEVS-STYLE 3D SCROLL-DRIVEN STORYTELLING EXPERIENCE */}
      {/* ========================================================================= */}
      {viewMode === 'scrollStory' && (
        <div className="relative w-full">
          {/* Pinned 3D WebGL Canvas Fixed in Viewport */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <ScrollExperienceCanvas
              scrollProgress={scrollProgress}
              isFreeOrbit={isFreeOrbitInScroll}
              color={selectedColor}
              finish={finish}
              silhouette={selectedModel.silhouetteType}
              accentColor={currentBrand.heritageColor}
              wheelSpinSpeed={wheelSpinSpeed}
            />
          </div>

          {/* Vertical Chapter Indicator HUD */}
          <ChapterNav
            activeChapter={activeChapter}
            onJumpToChapter={handleJumpToChapter}
            isThai={isThai}
            accentColor={currentBrand.heritageColor}
          />

          {/* Interactive Scroll Chapters with Giant Typography & Story Cards */}
          <ScrollStorySections
            currentBrand={currentBrand}
            currentModel={selectedModel}
            isThai={isThai}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            finish={finish}
            onSelectFinish={setFinish}
            isFreeOrbit={isFreeOrbitInScroll}
            onToggleFreeOrbit={() => setIsFreeOrbitInScroll((prev) => !prev)}
            onOpenCompare={() => setIsCompareOpen(true)}
            onRevSpeedChange={setWheelSpinSpeed}
          />

          {/* Deep Dive Archive Content at bottom of Story */}
          <section className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 py-16 flex flex-col gap-8 bg-gradient-to-t from-[#07090e] via-[#07090e] to-transparent">
            <BrandHero brand={currentBrand} isThai={isThai} />
            <SupercarDetails
              currentBrand={currentBrand}
              currentModel={selectedModel}
              onSelectModel={handleSelectModel}
              isThai={isThai}
              onOpenCompare={() => setIsCompareOpen(true)}
            />
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE B: 3D TURNTABLE SHOWROOM STUDIO */}
      {/* ========================================================================= */}
      {viewMode === 'showroom' && (
        <div className="flex flex-col w-full">
          <section className="relative w-full h-[76vh] bg-gradient-to-b from-[#090d16] via-[#07090e] to-[#07090e] overflow-hidden border-b border-white/5">
            {/* Background Subtle Ambience Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-25"
              style={{ backgroundColor: selectedColor }}
            />

            {/* 3D WebGL Canvas */}
            <div className="absolute inset-0">
              <ShowroomCanvas
                color={selectedColor}
                finish={finish}
                silhouette={selectedModel.silhouetteType}
                headlightsOn={headlightsOn}
                doorsOpen={doorsOpen}
                wingActive={wingActive}
                wireframe={wireframe}
                underglow={underglow}
                wheelSpinSpeed={wheelSpinSpeed}
                autoRotate={autoRotate}
                cameraPreset={cameraPreset}
                environment={environment}
                windTunnelActive={windTunnelActive}
                accentColor={currentBrand.heritageColor}
              />
            </div>

            {/* Top Floating Badge */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-300">
                  3D TURNTABLE SHOWROOM
                </span>
              </div>
            </div>

            {/* Floating Left: Procedural Audio Engine Tachometer */}
            <div className="absolute bottom-4 left-4 z-20 pointer-events-auto">
              <EngineRevGauge
                soundProfile={selectedModel.soundProfile}
                accentColor={currentBrand.heritageColor}
                isThai={isThai}
                onRevSpeedChange={setWheelSpinSpeed}
              />
            </div>

            {/* Floating Bottom-Right: 3D HUD Viewport Controls */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-none flex flex-col items-end">
              <ViewportControls
                cameraPreset={cameraPreset}
                onSelectCameraPreset={setCameraPreset}
                autoRotate={autoRotate}
                onToggleAutoRotate={() => setAutoRotate((prev) => !prev)}
                environment={environment}
                onSelectEnvironment={setEnvironment}
                headlightsOn={headlightsOn}
                onToggleHeadlights={() => setHeadlightsOn((prev) => !prev)}
                doorsOpen={doorsOpen}
                onToggleDoors={() => setDoorsOpen((prev) => !prev)}
                wingActive={wingActive}
                onToggleWing={() => setWingActive((prev) => !prev)}
                windTunnelActive={windTunnelActive}
                onToggleWindTunnel={() => setWindTunnelActive((prev) => !prev)}
                wireframe={wireframe}
                onToggleWireframe={() => setWireframe((prev) => !prev)}
                underglow={underglow}
                onToggleUnderglow={() => setUnderglow((prev) => !prev)}
                colorPalette={selectedModel.colorPalette}
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
                finish={finish}
                onSelectFinish={setFinish}
                isThai={isThai}
              />
            </div>
          </section>

          {/* Details Section */}
          <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex flex-col gap-8 flex-1">
            <BrandHero brand={currentBrand} isThai={isThai} />
            <SupercarDetails
              currentBrand={currentBrand}
              currentModel={selectedModel}
              onSelectModel={handleSelectModel}
              isThai={isThai}
              onOpenCompare={() => setIsCompareOpen(true)}
            />
          </main>
        </div>
      )}

      {/* FOOTER */}
      <footer className="w-full border-t border-white/10 bg-[#05070a] py-8 px-4 md:px-8 text-xs text-slate-400 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white font-mono">SUPERCAR ARCHIVE 3D</span>
            <span>•</span>
            <span>Porsche, Nissan, Lamborghini, Toyota</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDeploymentOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-400 border border-slate-700/60 font-mono transition-all"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Docker & Cloudflare Setup</span>
            </button>

            <a
              href="https://github.com/osakaspn-afk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-all font-mono"
            >
              <GithubIcon className="w-4 h-4" />
              <span>github.com/osakaspn-afk</span>
            </a>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        isThai={isThai}
        initialCar1={selectedModel}
      />

      <DeploymentModal
        isOpen={isDeploymentOpen}
        onClose={() => setIsDeploymentOpen(false)}
        isThai={isThai}
      />
    </div>
  );
};

export default App;
