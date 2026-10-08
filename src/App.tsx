import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { SUPERCAR_BRANDS, type BrandId, type SupercarModel } from './data/supercarsData';
import { ScrollExperienceCanvas } from './components/ScrollExperienceCanvas';
import { ScrollStorySections } from './components/ScrollStorySections';
import { ShowroomCanvas, type CameraPreset, type StudioEnvironment } from './components/ShowroomCanvas';
import { ViewportControls } from './components/ViewportControls';
import { EngineRevGauge } from './components/EngineRevGauge';
import { SupercarDetails } from './components/SupercarDetails';
import { NavigationHeader, type NavTab } from './components/NavigationHeader';
import { BrandHero } from './components/BrandHero';
import { ChapterNav } from './components/ChapterNav';
import { CompareModal } from './components/CompareModal';
import { ArticlesPage } from './components/ArticlesPage';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactUsPage } from './components/ContactUsPage';
import { SiteFooter } from './components/SiteFooter';
import { ScrollText, Rotate3d, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation State: 'home' | 'showroom' | 'articles' | 'about' | 'contact'
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Brand & Model State
  const [selectedBrandId, setSelectedBrandId] = useState<BrandId>('porsche');
  const currentBrand = SUPERCAR_BRANDS[selectedBrandId];

  const [selectedModel, setSelectedModel] = useState<SupercarModel>(currentBrand.models[0]);
  const [selectedColor, setSelectedColor] = useState<string>(currentBrand.models[0].colorPalette[0].hex);
  const [finish, setFinish] = useState<'metallic' | 'matte' | 'carbon'>('metallic');

  // Home presentation mode: 'scrollStory' (Cinematic Scrollytelling) vs 'quickOverview'
  const [homeViewMode, setHomeViewMode] = useState<'scrollStory' | 'turntable'>('scrollStory');

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
  const [flameActive, setFlameActive] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isFlashActive, setIsFlashActive] = useState<boolean>(false);

  // Localization (Thai / English)
  const [isThai, setIsThai] = useState<boolean>(true);

  // Modals
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  // Fullscreen sync handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleFullscreen = () => {
    const stage = document.getElementById('showroom-stage');
    if (!document.fullscreenElement) {
      stage?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleTakeSnapshot = () => {
    const canvas = document.querySelector('#showroom-stage canvas') as HTMLCanvasElement;
    if (!canvas) return;

    // Flash visual shutter feedback
    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 350);

    try {
      const offscreen = document.createElement('canvas');
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const ctx = offscreen.getContext('2d');
      if (!ctx) return;

      // Draw 3D scene from WebGL canvas
      ctx.drawImage(canvas, 0, 0);

      // Watermark footer bar
      const bannerHeight = Math.max(54, Math.round(offscreen.height * 0.08));
      ctx.fillStyle = 'rgba(10, 13, 20, 0.88)';
      ctx.fillRect(0, offscreen.height - bannerHeight, offscreen.width, bannerHeight);

      // Accent color top border on banner
      ctx.fillStyle = currentBrand.heritageColor || '#ef4444';
      ctx.fillRect(0, offscreen.height - bannerHeight, offscreen.width, 3);

      // Car Title & Badge
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(bannerHeight * 0.36)}px "Courier New", monospace`;
      ctx.textBaseline = 'middle';
      ctx.fillText(`SUPERCAR 3D • ${selectedModel.name.toUpperCase()}`, 24, offscreen.height - bannerHeight / 2);

      // Engine info
      ctx.fillStyle = '#94a3b8';
      ctx.font = `normal ${Math.round(bannerHeight * 0.28)}px "Courier New", monospace`;
      ctx.textAlign = 'right';
      ctx.fillText(`${selectedModel.specs.engine.toUpperCase()} • 4K ULTRA HD`, offscreen.width - 24, offscreen.height - bannerHeight / 2);

      // Direct download as high-res PNG
      const link = document.createElement('a');
      link.download = `${selectedModel.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-supercar-3d.png`;
      link.href = offscreen.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Snapshot capture error:', err);
    }
  };

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
  };

  // Model switch handler
  const handleSelectModel = (model: SupercarModel) => {
    setSelectedModel(model);
    setSelectedColor(model.colorPalette[0].hex);
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-200 flex flex-col font-sans selection:bg-red-500 selection:text-white relative">
      {/* 1. TOP GLOBAL NAVIGATION */}
      <NavigationHeader
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentBrandId={selectedBrandId}
        onSelectBrand={handleSelectBrand}
        isThai={isThai}
        onToggleLanguage={() => setIsThai((prev) => !prev)}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* ========================================================================= */}
      {/* 2. TAB CONTENT ROUTING */}
      {/* ========================================================================= */}

      {/* ----------------- TAB A: HOME ----------------- */}
      {activeTab === 'home' && (
        <div className="relative w-full">
          {/* Floating Pill on Home to switch between Scroll Story & Studio */}
          <div className="fixed top-24 right-4 md:right-8 z-30 pointer-events-auto">
            <div className="glass-panel p-1 rounded-2xl flex items-center gap-1 border border-white/10 shadow-2xl bg-slate-950/80 backdrop-blur-xl">
              <button
                onClick={() => setHomeViewMode('scrollStory')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  homeViewMode === 'scrollStory'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ScrollText className="w-3.5 h-3.5" />
                <span>{isThai ? 'โหมดเรื่องราว (SCROLL)' : 'SCROLL STORY'}</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('showroom');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all text-slate-400 hover:text-white"
              >
                <Rotate3d className="w-3.5 h-3.5" />
                <span>{isThai ? 'เข้าคลัง 3D STUDIO' : 'ENTER 3D STUDIO'}</span>
              </button>
            </div>
          </div>

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

          {/* Deep Dive Archive Content at bottom of Home Story */}
          <section className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 py-16 flex flex-col gap-12 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14] to-transparent">
            {/* Quick Explore Banner leading to Products & Articles */}
            <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 bg-slate-900/60 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-2 max-w-2xl">
                <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                  {isThai ? 'สำรวจคลังรถยนต์และฟีเจอร์ 3D เต็มรูปแบบ' : 'EXPLORE FULL 3D SHOWROOM'}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white">
                  {isThai ? 'พร้อมทดสอบเสียงเครื่องยนต์และฟิสิกส์แอร์โรไดนามิกส์?' : 'Ready to Experience Acoustic Harmonics?'}
                </h3>
                <p className="text-sm text-slate-300">
                  {isThai
                    ? 'เปิดระบบประตู ปีก DRS อุโมงค์ลม และโหมดสแกนโครงสร้าง X-Ray ในหน้าคลังรถยนต์'
                    : 'Inspect scissor doors, wind tunnel streamlines, and procedural audio synthesis in the 360° Studio.'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveTab('showroom');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-105"
                >
                  <span>{isThai ? 'เข้าสู่คลังรถยนต์ (Products)' : 'Go to Showroom'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

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

      {/* ----------------- TAB B: PRODUCTS (360° SHOWROOM STUDIO) ----------------- */}
      {activeTab === 'showroom' && (
        <div className="flex flex-col w-full">
          {/* Main 3D Studio Stage */}
          <section
            id="showroom-stage"
            className="relative w-full h-[78vh] bg-gradient-to-b from-[#0f1420] via-[#0a0d14] to-[#0a0d14] overflow-hidden border-b border-white/5"
          >
            {/* Visual Camera Shutter Flash */}
            {isFlashActive && (
              <div className="absolute inset-0 bg-white z-50 pointer-events-none animate-camera-flash" />
            )}

            {/* Subtle Ambient Radial Lighting */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[150px] pointer-events-none opacity-25 transition-colors duration-700"
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
                flameActive={flameActive}
              />
            </div>

            {/* Top Badge */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <div className="glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-lg bg-slate-950/80 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
                  3D TURNTABLE STUDIO • {selectedModel.name.toUpperCase()}
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
                onFlameChange={setFlameActive}
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
                silhouette={selectedModel.silhouetteType}
                isFullscreen={isFullscreen}
                onToggleFullscreen={handleToggleFullscreen}
                onTakeSnapshot={handleTakeSnapshot}
              />
            </div>
          </section>

          {/* Details & Specs Section */}
          <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-10 flex flex-col gap-10 flex-1">
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

      {/* ----------------- TAB C: ARTICLES ----------------- */}
      {activeTab === 'articles' && (
        <ArticlesPage
          isThai={isThai}
          onExploreCar={(bId) => {
            handleSelectBrand(bId as BrandId);
            setActiveTab('showroom');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* ----------------- TAB D: ABOUT US ----------------- */}
      {activeTab === 'about' && (
        <AboutUsPage
          isThai={isThai}
          onNavigateToShowroom={() => {
            setActiveTab('showroom');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateToArticles={() => {
            setActiveTab('articles');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* ----------------- TAB E: CONTACT US ----------------- */}
      {activeTab === 'contact' && <ContactUsPage isThai={isThai} />}

      {/* ========================================================================= */}
      {/* 3. GLOBAL LUXURY FOOTER */}
      {/* ========================================================================= */}
      <SiteFooter
        isThai={isThai}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectBrand={handleSelectBrand}
      />

      {/* ========================================================================= */}
      {/* 4. MODALS */}
      {/* ========================================================================= */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        isThai={isThai}
        initialCar1={selectedModel}
      />
    </div>
  );
};

export default App;
