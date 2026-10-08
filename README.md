# 🏎️ Supercar Heritage Archive 3D
### หอจดหมายเหตุประวัติศาสตร์และวิศวกรรมซูเปอร์คาร์ 3 มิติ (3D Interactive Web Application)

> แอปพลิเคชันเว็บ 3 มิติเชิงโต้ตอบ (Interactive 3D WebGL) รวบรวมประวัติศาสตร์ นวัตกรรมวิศวกรรม และจิตวิญญาณมอเตอร์สปอร์ตของสุดยอดซูเปอร์คาร์จาก 4 แบรนด์ระดับโลก: **Porsche**, **Nissan**, **Lamborghini**, และ **Toyota**  
> รองรับการรันด้วย **Docker Desktop**, เผยแพร่ผ่าน **Cloudflare (Pages & Tunnel)** และพร้อมเชื่อมต่อกับ **GitHub**: [github.com/osakaspn-afk](https://github.com/osakaspn-afk)

---

## 🌟 ฟีเจอร์เด่น (Key Features)

### 1. 🚘 หน้าต่างแสดงผล 3 มิติ Real-Time (3D Interactive Viewport)
- **3D Supercar Geometry & Shaders**: แสดงผลรถยนต์ 3 มิติเสมือนจริงด้วย Three.js & WebGL พร้อมระบบสีตัวถัง Clearcoat Metallic, Satin Matte, และ Carbon Fiber
- **Interactive Aero & Components**:
  - 💡 **ไฟหน้า & ไฟท้าย LED**: เปิด-ปิดไฟพร้อมลำแสงส่องสว่างบนพื้นถนนจริง
  - 🪽 **Active Aero DRS Wing**: ปรับองศาปีกหลังสร้างแรงกดอากาศ (Downforce) หรือลดแรงต้านอากาศ (Drag Reduction System)
  - 🚪 **ประตูเปิด-ปิดได้**: ประตูปีกนก Scissor Doors สไตล์ Lamborghini และประตู Coupe สไตล์ GT
  - 🌀 **Wind Tunnel Aerodynamic Flow**: จำลองสายกระแสลมพลศาสตร์ (Laminar Streamlines) ไหลผ่านตัวถังแบบเดียวกับห้องทดสอบอุโมงค์ลม
  - 📐 **Engineering X-Ray Blueprint**: โหมดพิมพ์เขียวโครงสร้างตัวถังแบบ Wireframe
  - 🟣 **Underglow Neon Lighting**: ระบบไฟนีออนใต้ท้องรถสไตล์ Street Racer
  - 🎥 **Camera Presets & 360° Orbit**: หมุนกล้องอิสระ 360 องศา พร้อมมุมกล้อง Front 3/4, Side Profile, Rear Diffuser, Top Down Aero, และ Wheel Close-up
  - 🏙️ **4 Studio Environments**: Cyberpunk Neon Night, Clean Luxury Showroom, Sunset Racetrack, และ Aero Wind Chamber

### 2. 🔊 เครื่องยนต์สังเคราะห์เสียงเสมือนจริง (Web Audio Sound Engine)
- สังเคราะห์คลื่นเสียงเครื่องยนต์ตามจำนวนลูกสูบและรอบเครื่องยนต์จริง (Procedural Audio Synthesis ผ่าน Web Audio API ไม่ต้องพึ่งพาไฟล์เสียงภายนอก)
- **4 Sound Profiles**:
  - `Flat-6`: เสียงเครื่องยนต์สูบนอนลากรอบจัด 9,000 RPM (Porsche GT3 RS)
  - `Twin-Turbo V6 (VR38)`: เสียงท่อเบสดุดันและเสียงระบายแรงดันเทอร์โบ Blow-off valve (Nissan GT-R)
  - `Naturally Aspirated V12`: สุ้มเสียงแผดก้องระดับโอเปร่า 9,500 RPM (Lamborghini Revuelto & SVJ)
  - `Acoustic V10`: เสียงคำรามสูงดั่งรถแข่ง Formula 1 จูนเสียงร่วมกับ Yamaha (Lexus LFA & Carrera GT)
- หน้าปัดวัดรอบดิจิทัล (Tachometer) และแป้นคันเร่งแบบกดค้าง (Hold to Rev)

### 3. 📚 ประวัติศาสตร์และข้อมูลเชิงลึก (Supercar Lineage & Specs Archive)
- **4 แบรนด์ระดับตำนาน**:
  - **Porsche**: 911 GT3 RS (992), Carrera GT, 918 Spyder, Porsche 959
  - **Nissan**: GT-R Nismo (R35), Skyline GT-R (R34 V-Spec II), R390 GT1 Road Car, Skyline 2000GT-R Hakosuka
  - **Lamborghini**: Revuelto, Aventador SVJ, Countach LP400 Periscopio, Diablo VT
  - **Toyota**: Lexus LFA (Toyota Flagship Supercar), Supra Mk4 (A80 Twin Turbo 2JZ), Toyota 2000GT (1967), GR Supra / GR GT3 Concept
- **ข้อมูลจำเพาะครบครัน**: แรงม้า (HP), แรงบิด (Nm), อัตราเร่ง 0-100 กม./ชม., ความเร็วสูงสุด (Top Speed), น้ำหนักตัวถัง, ระบบเกียร์, ขับเคลื่อน, สถิติเวลาสนามแข่ง Nürburgring Nordschleife และจำนวนการผลิต
- **สลับภาษา 2 ภาษา**: รองรับทั้งภาษาไทย (TH) และภาษาอังกฤษ (EN)

### 4. ⚔️ โหมดประลองสเปก (Head-to-Head Comparison Battle)
- จับคู่ซูเปอร์คาร์รุ่นใดก็ได้มาเทียบกันแบบตัวต่อตัว
- กราฟเปรียบเทียบสัดส่วนพลังและไฮไลต์ผู้ชนะในแต่ละหมวดหมู่พร้อมเอฟเฟกต์ Confetti

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Audio**: Web Audio API (Harmonic Oscillators, WaveShaper Distortion, Biquad Filter)
- **Containerization**: Docker, Docker Compose, Multi-stage Nginx Alpine
- **Cloud & Deployment**: Cloudflare Pages, Cloudflare Tunnel (`cloudflared`), GitHub Actions CI/CD

---

## 🐳 วิธีการรันด้วย Docker Desktop (Local Run)

### ขั้นตอนที่ 1: ตรวจสอบและเปิด Docker Desktop
เปิดโปรแกรม **Docker Desktop** บนคอมพิวเตอร์ของคุณ

### ขั้นตอนที่ 2: สั่งรันด้วย Docker Compose
เปิด Terminal หรือ PowerShell ในโฟลเดอร์นี้ แล้วรันคำสั่ง:

```bash
docker compose up -d --build web
```

### ขั้นตอนที่ 3: เปิดใช้งาน
เข้าเว็บผ่านเบราว์เซอร์ที่:
👉 **[http://localhost:8090](http://localhost:8090)**

*(หมายเหตุ: สามารถเปลี่ยนพอร์ตได้ตามต้องการในไฟล์ `.env` หรือ `docker-compose.yml`)*

หากต้องการหยุดการทำงาน:
```bash
docker compose down
```

---

## ☁️ วิธีการเผยแพร่ผ่าน Cloudflare

### วิธีที่ 1: เผยแพร่ผ่าน Cloudflare Pages (แนะนำสำหรับ Web โฮสต์ฟรี รวดเร็วทั่วโลก)

#### ก. Build และ Deploy ผ่าน Wrangler CLI โดยตรง:
```bash
npm run build
npx wrangler pages deploy dist --project-name=supercar-history-3d
```

#### ข. Deploy อัตโนมัติผ่าน GitHub Actions:
โปรเจกต์นี้มาพร้อมไฟล์ [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) เพียงคุณตั้งค่า Secrets ใน GitHub Repository:
1. `CLOUDFLARE_API_TOKEN`: API Token จาก Cloudflare Dashboard (สิทธิ์ Cloudflare Pages Edit)
2. `CLOUDFLARE_ACCOUNT_ID`: Account ID จากหน้า Cloudflare Overview

เมื่อกด `git push` ขึ้น GitHub แอ็กชันจะทำการ Build และ Deploy ขึ้น Cloudflare Pages ให้ทันที!

---

### วิธีที่ 2: รันผ่าน Cloudflare Zero-Trust Tunnel (ใน Docker)

หากต้องการเปิดให้คนอื่นเข้าชมเว็บที่รันอยู่บนคอมพิวเตอร์ของคุณ โดยไม่ต้องเปิดพอร์ตเราเตอร์ (No Port Forwarding):

```bash
docker compose --profile tunnel up -d
```
หรือรัน Quick Tunnel ฟรี:
```bash
docker run --rm --network host cloudflare/cloudflared:latest tunnel --url http://localhost:8090
```
จะได้รับ URL สาธารณะของ Cloudflare (เช่น `https://xxxx.trycloudflare.com`) ให้นำไปแชร์ได้ทันที!

---

## 🚀 วิธีการ Push โค้ดขึ้น GitHub (`osakaspn-afk`)

URL โปรไฟล์ GitHub ของคุณ: **[https://github.com/osakaspn-afk](https://github.com/osakaspn-afk)**

### วิธีที่ 1: รันสคริปต์อัตโนมัติ 1 คลิก (PowerShell)
```powershell
.\deploy-github.ps1
```

### วิธีที่ 2: คำสั่ง Git ทีละขั้นตอน

1. สร้าง Repository ใหม่บน GitHub ในชื่อ (เช่น `supercar-history-3d`)
2. รันคำสั่งต่อไปนี้ใน Terminal:

```bash
# 1. จัดเตรียมไฟล์ทั้งหมด
git add .

# 2. คอมมิตการเปลี่ยนแปลง
git commit -m "feat: 3D interactive supercar history archive (Porsche, Nissan, Lamborghini, Toyota)"

# 3. ตั้งชื่อ branch หลักเป็น main
git branch -M main

# 4. เพิ่ม Remote Repository ของคุณ
git remote add origin https://github.com/osakaspn-afk/supercar-history-3d.git

# 5. Push ขึ้น GitHub
git push -u origin main
```

---

## 📂 โครงสร้างโปรเจกต์ (Project Structure)

```
.
├── .github/
│   └── workflows/
│       ├── deploy.yml            # CI/CD Cloudflare Pages Deployment
│       └── docker-build.yml      # CI Docker Image Validation
├── src/
│   ├── components/
│   │   ├── BrandHero.tsx         # ส่วนหัวประวัติแบรนด์และมอเตอร์สปอร์ต
│   │   ├── BrandNavbar.tsx       # แถบเลือกแบรนด์, สลับภาษา, ปุ่มฟังก์ชัน
│   │   ├── Car3DModel.tsx        # โมเดล 3 มิติรถยนต์ ชิ้นส่วน แสง และแอนิเมชัน
│   │   ├── CompareModal.tsx      # หน้าต่างเปรียบเทียบสเปกซูเปอร์คาร์
│   │   ├── DeploymentModal.tsx   # คู่มือและคำสั่ง Docker / Cloudflare
│   │   ├── EngineRevGauge.tsx    # มาตรวัดรอบและระบบควบคุมเสียงเร่งเครื่อง
│   │   ├── GithubIcon.tsx        # ไอคอน GitHub SVG
│   │   ├── ShowroomCanvas.tsx    # Three.js Canvas ควบคุมแสงและกล้อง
│   │   ├── SupercarDetails.tsx   # สเปก ไทม์ไลน์ และไฮไลต์วิศวกรรม
│   │   ├── ViewportControls.tsx  # แผงควบคุม 3D HUD (สี, ปีก, ไฟ, อุโมงค์ลม)
│   │   └── WindTunnelAero.tsx    # การจำลองกระแสลมพลศาสตร์ในอุโมงค์ลม
│   ├── data/
│   │   └── supercarsData.ts      # ฐานข้อมูลประวัติและสเปกซูเปอร์คาร์ 4 แบรนด์
│   ├── utils/
│   │   └── engineAudio.ts        # ระบบสังเคราะห์เสียงเครื่องยนต์ (Web Audio API)
│   ├── App.tsx                   # หน้าหลักของแอปพลิเคชัน
│   ├── main.tsx                  # จุดเริ่มต้น React DOM
│   └── index.css                 # สไตล์ชีตหลักและเอฟเฟกต์ Glassmorphism
├── Dockerfile                    # Multi-stage production build (Node + Nginx)
├── docker-compose.yml            # การตั้งค่า Docker Service และ Cloudflare Tunnel
├── nginx.conf                    # Nginx SPA config พร้อมระบบบีบอัด Gzip
├── wrangler.toml                 # การตั้งค่า Cloudflare Pages
├── deploy-github.ps1             # สคริปต์อัตโนมัติสำหรับ Push ขึ้น GitHub (Windows)
├── deploy-github.sh              # สคริปต์อัตโนมัติสำหรับ Push ขึ้น GitHub (Linux/macOS)
└── package.json
```

---

## 👨‍💻 ผู้พัฒนา
- GitHub: [@osakaspn-afk](https://github.com/osakaspn-afk)
