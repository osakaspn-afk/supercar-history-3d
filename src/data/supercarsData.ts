export type BrandId = 'porsche' | 'nissan' | 'lamborghini' | 'toyota';

export interface SupercarSpec {
  engine: string;
  power: number; // HP
  torque: number; // Nm
  acceleration: number; // 0-100 km/h in seconds
  topSpeed: number; // km/h
  weight: number; // kg
  drivetrain: string;
  transmission: string;
  nurburgringLap?: string;
  productionCount?: string;
}

export interface HighlightItem {
  title: { en: string; th: string };
  desc: { en: string; th: string };
}

export interface SupercarModel {
  id: string;
  name: string;
  year: number;
  generation: string;
  brandId: BrandId;
  tagline: { en: string; th: string };
  description: { en: string; th: string };
  historicalSignificance: { en: string; th: string };
  specs: SupercarSpec;
  colorPalette: Array<{ name: string; hex: string }>;
  silhouetteType: 'porsche' | 'nissan' | 'lamborghini' | 'toyota';
  soundProfile: 'flat6' | 'v6tt' | 'v12' | 'v10';
  heroBadge: string;
  highlights: HighlightItem[];
}

export interface BrandData {
  id: BrandId;
  name: string;
  country: string;
  countryFlag: string;
  foundedYear: number;
  headquarters: string;
  founder: string;
  tagline: { en: string; th: string };
  overview: { en: string; th: string };
  racingHeritage: { en: string; th: string };
  heritageColor: string;
  accentColor: string;
  models: SupercarModel[];
}

export const SUPERCAR_BRANDS: Record<BrandId, BrandData> = {
  porsche: {
    id: 'porsche',
    name: 'Porsche',
    country: 'Germany',
    countryFlag: '🇩🇪',
    foundedYear: 1931,
    headquarters: 'Stuttgart, Baden-Württemberg, Germany',
    founder: 'Ferdinand Porsche',
    tagline: {
      en: 'Driven by Dreams – The Quintessence of German Precision Engineering',
      th: 'ขับเคลื่อนด้วยความฝัน – นิยามแห่งวิศวกรรมความแม่นยำระดับเยอรมัน'
    },
    overview: {
      en: 'Founded in Stuttgart in 1931, Porsche redefined the sports car universe by placing the engine behind the rear axle. Their philosophy fuses daily usability with uncompromising endurance racing dominance, winning the 24 Hours of Le Mans an unprecedented 19 times.',
      th: 'ก่อตั้งขึ้นที่เมืองชตุทท์การ์ทในปี 1931 ปอร์เช่ได้สร้างนิยามใหม่ให้แก่วงการซูเปอร์คาร์ด้วยเอกลักษณ์เครื่องยนต์วางท้าย ปรัชญาการออกแบบที่ผสมผสานความสามารถในการขับขี่ได้จริงทุกวันเข้ากับชัยชนะอันเกรียงไกร คว้าแชมป์การแข่งความทนทาน 24 Hours of Le Mans สูงสุดถึง 19 สมัย'
    },
    racingHeritage: {
      en: '19 Overall Le Mans Victories, over 30,000 motorsport wins worldwide, and undisputed Nürburgring Nordschleife supremacy with production track record holders.',
      th: 'ครองแชมป์รวม 24 Hours of Le Mans 19 สมัย ชัยชนะมอเตอร์สปอร์ตกว่า 30,000 รายการทั่วโลก และเจ้าสถิติความเร็วสนามแข่งระดับตำนาน Nürburgring Nordschleife'
    },
    heritageColor: '#d97706', // Porsche Racing Gold / Crest
    accentColor: '#ef4444',
    models: [
      {
        id: 'porsche-911-gt3-rs',
        name: 'Porsche 911 GT3 RS (992)',
        year: 2023,
        generation: '992 Generation',
        brandId: 'porsche',
        heroBadge: 'TRACK WEAPON',
        tagline: {
          en: 'Pure Aerodynamic Mastery with Formula 1 DRS Technology',
          th: 'สุดยอดงานวิศวกรรมแอโรไดนามิก พร้อมระบบ DRS ถอดแบบจาก Formula 1'
        },
        description: {
          en: 'The 992 GT3 RS represents the apex of naturally aspirated combustion engineering. Ditching a traditional front trunk for a massive central radiator, it produces an astonishing 860 kg of downforce at 285 km/h, featuring an active rear wing with DRS functionality.',
          th: '911 GT3 RS รหัส 992 คือจุดสูงสุดของเครื่องยนต์ไร้ระบบอัดอากาศ (Naturally Aspirated) โดยสละพื้นที่ฝากระโปรงหน้าเพื่อติดตั้งหม้อน้ำระบายความร้อนขนาดใหญ่ สร้างแรงกดตัวถังมหาศาลถึง 860 กก. ที่ความเร็ว 285 กม./ชม. พร้อมปีกหลัง Active Wing ที่มีระบบเปิด-ปิด DRS เหมือนรถแข่ง Formula 1'
        },
        historicalSignificance: {
          en: 'Clocked a blistering 6:49.328 around the 20.8 km Nürburgring Nordschleife, proving that downforce and mechanical grip can conquer raw straight-line horsepower.',
          th: 'สร้างประวัติศาสตร์ทำเวลาต่อรอบที่สนาม Nürburgring Nordschleife เพียง 6 นาที 49.328 วินาที พิสูจน์ว่าหลักอากาศพลศาสตร์และการทรงตัวที่สมบูรณ์แบบเหนือกว่าแรงม้าทางตรงล้วนๆ'
        },
        specs: {
          engine: '4.0L Naturally Aspirated Boxer-6 (9,000 RPM)',
          power: 525,
          torque: 465,
          acceleration: 3.2,
          topSpeed: 296,
          weight: 1450,
          drivetrain: 'Rear-Wheel Drive (RWD)',
          transmission: '7-speed Porsche Doppelkupplung (PDK)',
          nurburgringLap: '6:49.328 min',
          productionCount: 'Limited series production'
        },
        colorPalette: [
          { name: 'Guards Red', hex: '#d91e18' },
          { name: 'Shark Blue', hex: '#0070ba' },
          { name: 'GT Silver Metallic', hex: '#a6a8ab' },
          { name: 'Python Green', hex: '#00a843' },
          { name: 'Racing Yellow', hex: '#ffcc00' }
        ],
        silhouetteType: 'porsche',
        soundProfile: 'flat6',
        highlights: [
          {
            title: { en: 'Active Drag Reduction System (DRS)', th: 'ระบบลดแรงต้านอากาศ Active DRS' },
            desc: {
              en: 'Hydraulically adjusted rear wing flaps toggle instantly via steering wheel button to reduce drag on straights.',
              th: 'ปรับองศาปีกหลังด้วยระบบไฮดรอลิกเพียงกดปุ่มบนพวงมาลัย เพื่อลดแรงต้านในทางตรงและสร้างแรงเบรกอากาศเมื่อเข้าโค้ง'
            }
          },
          {
            title: { en: '4.0L High-Revving Flat-6', th: 'เครื่องยนต์ 4.0 ลิตร หมุนจัด 9,000 รอบ/นาที' },
            desc: {
              en: 'Individual throttle bodies derived directly from the GT3 R race car deliver razor-sharp throttle response.',
              th: 'ลิ้นปีกผีเสื้อแยกเดี่ยว 6 ลิ้น ถ่ายทอดเทคโนโลยีตรงจากรถแข่ง GT3 R ให้การตอบสนองคันเร่งฉับไวระดับเสี้ยววินาที'
            }
          }
        ]
      },
      {
        id: 'porsche-carrera-gt',
        name: 'Porsche Carrera GT',
        year: 2004,
        generation: 'Typ 980',
        brandId: 'porsche',
        heroBadge: 'ANALOG MASTERPIECE',
        tagline: {
          en: 'The Last True Analog Supercar with an F1-Derived V10 Scream',
          th: 'ซูเปอร์คาร์แอนะล็อกแท้รุ่นสุดท้าย เสียงคำรามเครื่องยนต์ V10 จากสนามแข่ง F1'
        },
        description: {
          en: 'Born from a cancelled Le Mans prototype project, the Carrera GT is celebrated as one of the rawest driving experiences in history. Built on a pure carbon-fiber monocoque with a 5.7L V10 and a beechwood manual gear knob paying homage to the legendary 917.',
          th: 'กำเนิดขึ้นจากโครงการรถแข่งต้นแบบ Le Mans Carrera GT ได้รับการยกย่องให้เป็นหนึ่งในรถที่มอบอารมณ์การขับขี่ดิบและบริสุทธิ์ที่สุด โครงสร้างคาร์บอนไฟเบอร์โมโนค็อกผสานเครื่องยนต์ V10 5.7 ลิตร เกียร์ธรรมดา 6 สปีดพร้อมหัวเกียร์ไม้บีชเพื่อคารวะตำนาน Porsche 917'
        },
        historicalSignificance: {
          en: 'The first production car to use a full carbon fiber reinforced plastic (CFRP) monocoque and subframe, cementing Porsche’s carbon composites leadership.',
          th: 'รถยนต์โปรดักชันรุ่นแรกของโลกที่ใช้โครงสร้างแชสซีส์และซับเฟรมทำจากคาร์บอนไฟเบอร์ CFRP เต็มรูปแบบ วางรากฐานเทคโนโลยีคาร์บอนของปอร์เช่ในยุคปัจจุบัน'
        },
        specs: {
          engine: '5.7L 68° Naturally Aspirated V10 (8,400 RPM)',
          power: 612,
          torque: 590,
          acceleration: 3.9,
          topSpeed: 334,
          weight: 1380,
          drivetrain: 'Rear-Wheel Drive (RWD)',
          transmission: '6-speed Manual with Ceramic Composite Clutch (PCCC)',
          nurburgringLap: '7:28.71 min (2004)',
          productionCount: '1,270 units produced'
        },
        colorPalette: [
          { name: 'GT Silver Metallic', hex: '#b5b7b9' },
          { name: 'Basalt Black', hex: '#111215' },
          { name: 'Fayence Yellow', hex: '#f0b726' },
          { name: 'Guards Red', hex: '#b91c1c' }
        ],
        silhouetteType: 'porsche',
        soundProfile: 'v10',
        highlights: [
          {
            title: { en: 'Formula 1 Heritage V10', th: 'เครื่องยนต์ V10 สายเลือด Formula 1' },
            desc: {
              en: 'Originally designed for the Footwork F1 team and resurrected for Le Mans, producing an unforgettable operatic exhaust howl.',
              th: 'พัฒนาขึ้นสำหรับทีมแข่ง F1 Footwork และเตรียมลง Le Mans ให้สุ้มเสียงแผดก้องระดับโอเปร่าที่เป็นเอกลักษณ์ที่สุดในโลกยานยนต์'
            }
          },
          {
            title: { en: 'No Electronic Safety Nets', th: 'ไร้ระบบช่วยเหลืออิเล็กทรอนิกส์ก้าวก่าย' },
            desc: {
              en: 'No electronic stability control (only rudimentary traction control), offering pure unfiltered human-machine connection.',
              th: 'ไม่มีระบบรักษาเสถียรภาพการทรงตัวอิเล็กทรอนิกส์ (ESC) มีเพียง Traction Control ขั้นพื้นฐาน ถ่ายทอดความดิบและการตอบสนองสู่ผู้ขับขี่อย่างแท้จริง'
            }
          }
        ]
      },
      {
        id: 'porsche-918-spyder',
        name: 'Porsche 918 Spyder',
        year: 2013,
        generation: 'Holy Trinity Era',
        brandId: 'porsche',
        heroBadge: 'HYBRID HYPERCAR',
        tagline: {
          en: 'Pioneered the Hybrid Hypercar Revolution with Top-Exit Exhausts',
          th: 'ผู้บุกเบิกการปฏิวัติไฮเปอร์คาร์ไฮบริด ท่อไอเสียออกบนหลังเครื่องยนต์'
        },
        description: {
          en: 'Part of the historic "Holy Trinity" hypercar triumvirate, the 918 Spyder paired a screaming 4.6L racing V8 with dual electric motors, delivering 887 hp and torque-vectoring all-wheel drive that completely rewrote performance benchmarks.',
          th: 'หนึ่งในขุนพล "Holy Trinity" ไฮเปอร์คาร์ 3 รุ่นแห่งประวัติศาสตร์ 918 Spyder ผสานเครื่องยนต์เรซซิ่ง V8 4.6 ลิตรเข้ากับมอเตอร์ไฟฟ้าคู่ รีดพละกำลังรวม 887 แรงม้า พร้อมระบบขับเคลื่อนสี่ล้ออัจฉริยะที่ฉีกกฎเกณฑ์สมรรถนะในยุคนั้น'
        },
        historicalSignificance: {
          en: 'First street-legal production car to smash the 7-minute barrier at the Nürburgring, setting a historic 6:57 lap time in September 2013.',
          th: 'รถยนต์สปอร์ตสำหรับวิ่งบนถนนคันแรกของโลกที่ทำลายกำแพงเวลา 7 นาที ณ สนาม Nürburgring ลงได้ ด้วยเวลา 6 นาที 57 วินาที ในปี 2013'
        },
        specs: {
          engine: '4.6L Naturally Aspirated V8 + 2 Electric Motors',
          power: 887,
          torque: 1280,
          acceleration: 2.6,
          topSpeed: 345,
          weight: 1634,
          drivetrain: 'All-Wheel Drive (AWD with e-front axle)',
          transmission: '7-speed Porsche Doppelkupplung (PDK)',
          nurburgringLap: '6:57.00 min',
          productionCount: '918 units worldwide'
        },
        colorPalette: [
          { name: 'Liquid Metal Silver', hex: '#cfd2d6' },
          { name: 'Acid Green Accent', hex: '#84cc16' },
          { name: 'Oryx White', hex: '#f8fafc' },
          { name: 'Sapphire Blue', hex: '#1d4ed8' }
        ],
        silhouetteType: 'porsche',
        soundProfile: 'v10',
        highlights: [
          {
            title: { en: 'Top-Exit Flame Exhausts', th: 'ท่อไอเสียพ่นไฟออกด้านบนตัวถัง' },
            desc: {
              en: 'Shortest exhaust routing directly above the engine block for minimum backpressure and dramatic thermal dissipation.',
              th: 'เดินท่อไอเสียสั้นที่สุดพุ่งตรงขึ้นด้านบนหลังห้องเครื่อง เพื่อลดแรงดันย้อนกลับและระบายความร้อนได้อย่างรวดเร็ว'
            }
          }
        ]
      },
      {
        id: 'porsche-959',
        name: 'Porsche 959',
        year: 1986,
        generation: 'Group B Era',
        brandId: 'porsche',
        heroBadge: 'RALLY TECH ICON',
        tagline: {
          en: 'The Most Technologically Advanced Supercar of the 20th Century',
          th: 'ซูเปอร์คาร์ที่ก้าวล้ำทางเทคโนโลยีที่สุดแห่งศตวรรษที่ 20'
        },
        description: {
          en: 'Originally engineered for the legendary Group B rally championship, the 959 introduced sequential twin-turbochargers, computer-controlled all-wheel drive (PSK), height-adjustable suspension, and hollow-spoke magnesium wheels with tire pressure sensors.',
          th: 'พัฒนาขึ้นเพื่อพิชิตการแข่งขันแรลลี่ระดับตำนาน Group B ปอร์เช่ 959 แนะนำระบบเทอร์โบคู่แบบ Sequential ระบบขับเคลื่อน 4 ล้อควบคุมด้วยคอมพิวเตอร์ (PSK) ช่วงล่างปรับระดับความสูงอัตโนมัติ และล้อแมกนีเซียมแบบก้านกลวงพร้อมเซนเซอร์วัดลมยางรุ่นแรก'
        },
        historicalSignificance: {
          en: 'Held the crown of the world’s fastest street-legal production car at 317 km/h (197 mph), out-innovating every contemporary supercar of the 1980s.',
          th: 'ครองสถิติรถยนต์โปรดักชันที่เร็วที่สุดในโลกในยุคนั้นด้วยความเร็ว 317 กม./ชม. ปูทางสู่เทคโนโลยีขับเคลื่อน 4 ล้อในตระกูล 911 Turbo จนถึงปัจจุบัน'
        },
        specs: {
          engine: '2.85L Sequential Twin-Turbo Flat-6',
          power: 450,
          torque: 500,
          acceleration: 3.7,
          topSpeed: 317,
          weight: 1450,
          drivetrain: 'Porsche-Steuer Kupplung (PSK) AWD',
          transmission: '6-speed Manual (with Gelande off-road gear)',
          nurburgringLap: 'Historical Benchmark',
          productionCount: '337 units total'
        },
        colorPalette: [
          { name: 'Classic Silver', hex: '#d1d5db' },
          { name: 'Guards Red', hex: '#dc2626' },
          { name: 'Grand Prix White', hex: '#f9fafb' }
        ],
        silhouetteType: 'porsche',
        soundProfile: 'flat6',
        highlights: [
          {
            title: { en: 'Sequential Twin-Turbocharging', th: 'ระบบเทอร์โบคู่เรียงลำดับ' },
            desc: {
              en: 'Small turbo spools early for instant low-end torque, while the second turbo unleashes explosive top-end power.',
              th: 'เทอร์โบลูกเล็กทำงานที่รอบต่ำเพื่อลดอาการรอรอบ ก่อนที่เทอร์โบลูกใหญ่จะบูสต์ต่อเนื่องในรอบสูงเพื่อพละกำลังมหาศาล'
            }
          }
        ]
      }
    ]
  },

  nissan: {
    id: 'nissan',
    name: 'Nissan',
    country: 'Japan',
    countryFlag: '🇯🇵',
    foundedYear: 1933,
    headquarters: 'Yokohama, Kanagawa, Japan',
    founder: 'Yoshisuke Aikawa',
    tagline: {
      en: 'Innovation that Excites – The Undisputed Reign of Godzilla',
      th: 'นวัตกรรมที่เร้าใจ – ตำนานการครองบัลลังก์แห่ง ก็อดซิลลา'
    },
    overview: {
      en: 'Born in Yokohama, Nissan proved that Japanese engineering could conquer European supercar royalty. The GT-R badge earned the immortal nickname "Godzilla" by winning 29 consecutive Japanese Touring Car races, evolving into the world’s premier giant-killer.',
      th: 'ก่อตั้งขึ้นที่เมืองโยโกฮาม่า นิสสันพิสูจน์ให้โลกเห็นว่าวิศวกรรมสไตล์ญี่ปุ่นสามารถล้มซูเปอร์คาร์ชั้นนำจากยุโรปได้ ป้ายชื่อรหัส GT-R ได้รับฉายาอมตะ "Godzilla" หลังกวาดชัยชนะ 29 สนามรวดในรายการ Japan Touring Car Championship และกลายเป็นสัญลักษณ์แห่งนักฆ่าซูเปอร์คาร์'
    },
    racingHeritage: {
      en: 'Dominant 29-race undefeated streak in JTCC Group A, Super GT 500 Championships, and Mount Panorama Bathurst 1000 conqueror.',
      th: 'ชนะรวด 29 สนามไม่เคยแพ้ใครใน JTCC Group A, คว้าแชมป์ Super GT 500 นับครั้งไม่ถ้วน และกำราบการแข่งมาราธอนสุดโหด Bathurst 1000'
    },
    heritageColor: '#dc2626', // Nismo Red
    accentColor: '#2563eb', // Bayside Blue
    models: [
      {
        id: 'nissan-gtr-r35-nismo',
        name: 'Nissan GT-R Nismo (R35)',
        year: 2024,
        generation: 'R35 Special Edition',
        brandId: 'nissan',
        heroBadge: 'GODZILLA APEX',
        tagline: {
          en: 'Handcrafted VR38DETT Engine with GT3 Race-Car Turbos',
          th: 'เครื่องยนต์ VR38DETT ประกอบมือโดยปรมาจารย์ทาคุมิ พร้อมเทอร์โบจากรถแข่ง GT3'
        },
        description: {
          en: 'The R35 GT-R revolutionized modern supercar performance upon debut and reached its definitive zenith with the Nismo Special Edition. Featuring carbon-fiber body panels, high-precision weight-balanced piston rings, and Garrett GT3 competition turbochargers.',
          th: 'R35 GT-R พลิกโฉมโลกซูเปอร์คาร์นับแต่วันเปิดตัว และก้าวสู่ขีดสุดในรุ่น Nismo Special Edition ตัวถังคาร์บอนไฟเบอร์น้ำหนักเบา ชิ้นส่วนลูกสูบและข้อเหวี่ยงบาลานซ์น้ำหนักด้วยความแม่นยำระดับไมครอน พร้อมเทอร์โบชาร์จเจอร์สเปกเดียวกับรถแข่งคลาส GT3'
        },
        historicalSignificance: {
          en: 'Showed that a front-engine all-wheel-drive GT could decimate mid-engine exotics costing three times as much, clocking 7:08.679 at the Nürburgring Nordschleife.',
          th: 'พิสูจน์ให้เห็นว่ารถเครื่องยนต์วางหน้าขับเคลื่อน 4 ล้อ สามารถเอาชนะซูเปอร์คาร์เครื่องวางกลางราคาแพงกว่า 3 เท่าได้อย่างราบคาบ พร้อมสถิติ Nürburgring 7:08.679 วินาที'
        },
        specs: {
          engine: '3.8L Twin-Turbo DOHC V6 (VR38DETT Handbuilt)',
          power: 600,
          torque: 652,
          acceleration: 2.7,
          topSpeed: 330,
          weight: 1725,
          drivetrain: 'ATTESA E-TS All-Wheel Drive with Rear Transaxle',
          transmission: '6-speed Dual-Clutch BorgWarner Transmission',
          nurburgringLap: '7:08.679 min (Nismo N-Attack)',
          productionCount: 'Special handcrafted edition'
        },
        colorPalette: [
          { name: 'Nismo Stealth Gray', hex: '#4b5563' },
          { name: 'Bayside Blue', hex: '#1d4ed8' },
          { name: 'Brilliant White Pearl', hex: '#f3f4f6' },
          { name: 'Super Black', hex: '#0f172a' },
          { name: 'Ultimate Metal Silver', hex: '#94a3b8' }
        ],
        silhouetteType: 'nissan',
        soundProfile: 'v6tt',
        highlights: [
          {
            title: { en: 'Takumi Handcrafted Engine', th: 'เครื่องยนต์ประกอบมือโดยทาคุมิ (Takumi)' },
            desc: {
              en: 'Each VR38 engine is hand-assembled in a dust-free clean room by one of only five master craftsmen, bearing an aluminum builder plaque.',
              th: 'เครื่องยนต์แต่ละตัวถูกบรรจงประกอบขึ้นด้วยมือในห้องปลอดฝุ่นโดยหนึ่งในห้าช่างฝีมือชั้นครู "Takumi" พร้อมแผ่นป้ายชื่อช่างผู้สร้างกำกับทุกคัน'
            }
          },
          {
            title: { en: 'Rear Transaxle ATTESA E-TS', th: 'ระบบขับเคลื่อน 4 ล้อพร้อมชุดเกียร์ด้านหลัง' },
            desc: {
              en: 'Independent rear transaxle and twin driveshafts deliver optimum 54:46 static front-to-rear weight balance under acceleration.',
              th: 'การแยกชุดเกียร์ไปไว้ที่เพลาหลังพร้อมเพลากลางคู่ ช่วยกระจายน้ำหนักหน้า-หลังให้สมดุลและถ่ายทอดแรงยึดเกาะเข้าสู่โค้งอย่างแม่นยำ'
            }
          }
        ]
      },
      {
        id: 'nissan-skyline-gtr-r34',
        name: 'Nissan Skyline GT-R (R34) V-Spec II',
        year: 1999,
        generation: 'R34 Generation',
        brandId: 'nissan',
        heroBadge: 'THE JDM LEGEND',
        tagline: {
          en: 'The Quintessential Japanese Icon with the Indestructible RB26DETT',
          th: 'สุดยอดตำนานแห่งวัฒนธรรม JDM ผสานขุมพลังในตำนาน RB26DETT'
        },
        description: {
          en: 'The R34 V-Spec II is revered globally as the holy grail of Japanese sports cars. Equipped with an advanced Multi-Function Display (MFD) showing G-force telemetry, carbon fiber hood with NACA duct, and the iconic ATTESA E-TS Pro all-wheel-drive system.',
          th: 'R34 V-Spec II คือจอกศักดิ์สิทธิ์แห่งรถสปอร์ตแดนอาทิตย์อุทัย โดดเด่นด้วยหน้าจอมัลติฟังก์ชัน MFD รุ่นบุกเบิกที่บอกค่าแรง G-Force และบูสต์เทอร์โบ ฝากระโปรงคาร์บอนไฟเบอร์พร้อมช่องลม NACA และระบบขับเคลื่อนสี่ล้อ ATTESA E-TS Pro'
        },
        historicalSignificance: {
          en: 'Cemented the GT-R into global pop-culture, motorsport lore, and enthusiast worship; easily tunable to 800+ hp on stock cast-iron engine blocks.',
          th: 'ก้าวขึ้นสู่จุดสูงสุดของวัฒนธรรมรถซิ่งและภาพยนตร์ระดับโลก เสื้อสูบเหล็กหล่อ RB26DETT ขึ้นชื่อเรื่องความทนทานจนสามารถโมดิฟายทะลุ 800+ แรงม้าได้อย่างสบาย'
        },
        specs: {
          engine: '2.6L Twin-Turbocharged Inline-6 (RB26DETT)',
          power: 327, // Gentlemans agreement rated 280 PS, actual ~330 PS
          torque: 392,
          acceleration: 4.8,
          topSpeed: 266,
          weight: 1560,
          drivetrain: 'ATTESA E-TS Pro All-Wheel Drive',
          transmission: '6-speed Getrag Manual Transmission',
          nurburgringLap: '7:52 min (Kazuo Shimizu)',
          productionCount: '1,855 V-Spec II models'
        },
        colorPalette: [
          { name: 'Bayside Blue (TV2)', hex: '#003399' },
          { name: 'Midnight Purple III (LX0)', hex: '#4c1d95' },
          { name: 'Millennium Jade (JW0)', hex: '#71797E' },
          { name: 'White (QM1)', hex: '#f8fafc' }
        ],
        silhouetteType: 'nissan',
        soundProfile: 'v6tt',
        highlights: [
          {
            title: { en: 'Multi-Function Telemetry Display', th: 'หน้าจอแสดงผลข้อมูลการขับขี่ MFD' },
            desc: {
              en: 'Collaborated with Polyphony Digital (Gran Turismo creators) to engineer an onboard 5.8-inch telemetry monitor in 1999.',
              th: 'ร่วมมือกับ Polyphony Digital (ผู้สร้างเกม Gran Turismo) พัฒนาหน้าจอ LCD วิเคราะห์ข้อมูลการขับขี่แบบเรียลไทม์ตั้งแต่ปี 1999'
            }
          }
        ]
      },
      {
        id: 'nissan-r390-gt1',
        name: 'Nissan R390 GT1 Road Car',
        year: 1997,
        generation: 'Le Mans Homologation',
        brandId: 'nissan',
        heroBadge: 'HOMOLOGATION EXOTIC',
        tagline: {
          en: 'A Pure Le Mans Race Car Cloaked for the Street',
          th: 'รถแข่ง Le Mans สายพันธุ์แท้ที่สร้างขึ้นตามกฎโฮโมโลเกชันเพื่อวิ่งบนถนน'
        },
        description: {
          en: 'Developed jointly with Tom Walkinshaw Racing (TWR) to conquer the 24 Hours of Le Mans in the GT1 class. Powered by the VRH35L 3.5L twin-turbo V8, this mid-engine hypercar is one of the rarest automobiles in existence.',
          th: 'พัฒนาร่วมกับ Tom Walkinshaw Racing (TWR) เพื่อลงชิงชัยในศึก 24 Hours of Le Mans คลาส GT1 ขับเคลื่อนด้วยขุมพลัง V8 ทวินเทอร์โบ 3.5 ลิตร วางกลางลำตัว เป็นหนึ่งในรถหายากที่สุดในประวัติศาสตร์ยานยนต์'
        },
        historicalSignificance: {
          en: 'Secured 3rd, 5th, 6th, and 10th places overall at the 1998 Le Mans 24 Hours, standing as Nissan’s only true mid-engine V8 supercar.',
          th: 'คว้าอันดับที่ 3, 5, 6 และ 10 ในศึก 24 Hours of Le Mans ปี 1998 นับเป็นซูเปอร์คาร์เครื่องยนต์ V8 วางกลางลำรุ่นเดียวในประวัติศาสตร์ของนิสสัน'
        },
        specs: {
          engine: '3.5L Twin-Turbocharged 90° V8 (VRH35L)',
          power: 550,
          torque: 637,
          acceleration: 3.3,
          topSpeed: 354,
          weight: 1029,
          drivetrain: 'Rear-Wheel Drive (RWD)',
          transmission: '6-speed Xtrac Sequential Manual',
          nurburgringLap: 'Racing Prototype',
          productionCount: '1 Road Car in Nissan Heritage Collection'
        },
        colorPalette: [
          { name: 'Heritage Deep Blue', hex: '#0f172a' },
          { name: 'Calsonic Racing Blue', hex: '#0284c7' }
        ],
        silhouetteType: 'nissan',
        soundProfile: 'v6tt',
        highlights: [
          {
            title: { en: 'Racing Monocoque Chassis', th: 'แชสซีส์คาร์บอนไฟเบอร์โมโนค็อกสำหรับสนามแข่ง' },
            desc: {
              en: 'Weighing barely 1,000 kg with race aerodynamics and pushrod suspension.',
              th: 'น้ำหนักเบาเพียง 1,029 กิโลกรัม ผสานแอโรไดนามิกระดับรถแข่งและช่วงล่างแบบพุชร็อด (Pushrod)'
            }
          }
        ]
      },
      {
        id: 'nissan-skyline-2000gtr',
        name: 'Skyline 2000GT-R (KPGC10) Hakosuka',
        year: 1969,
        generation: 'First Generation Hakosuka',
        brandId: 'nissan',
        heroBadge: 'THE GENESIS',
        tagline: {
          en: 'The Origin of the Legend – 50 Consecutive Racing Victories',
          th: 'จุดกำเนิดของตำนาน – กวาดชัยชนะ 50 สนามการแข่งขันในประวัติศาสตร์'
        },
        description: {
          en: 'Nicknamed "Hakosuka" (Boxy Skyline), the original GT-R was powered by the legendary Prince-derived S20 engine—a 2.0L inline-6 with double overhead cams, 4 valves per cylinder, and triple Mikuni-Solex carburetors.',
          th: 'ได้รับฉายา "ฮาโกะสุกะ" (สกายไลน์ทรงกล่อง) ขับเคลื่อนด้วยเครื่องยนต์ในตำนานรหัส S20 ขนาด 2.0 ลิตร 6 สูบเรียง DOHC 24 วาล์ว พร้อมคาร์บูเรเตอร์คู่สามตัวของ Mikuni-Solex'
        },
        historicalSignificance: {
          en: 'Established the GT-R racing pedigree by capturing 49 consecutive wins in Japanese domestic motorsport before wrapping 52 victories in total.',
          th: 'สร้างตำนานด้วยการคว้าชัยชนะติดต่อกันถึง 49 สนาม และทำสถิติรวม 52 ชัยชนะ วางรากฐานจิตวิญญาณแห่งการแข่งขันให้กับชื่อ GT-R ตราบจนปัจจุบัน'
        },
        specs: {
          engine: '2.0L Naturally Aspirated DOHC Inline-6 (S20 Engine)',
          power: 160,
          torque: 177,
          acceleration: 8.2,
          topSpeed: 200,
          weight: 1100,
          drivetrain: 'Rear-Wheel Drive (RWD) with LSD',
          transmission: '5-speed Manual Transmission',
          productionCount: '1,197 KPGC10 2-door coupes'
        },
        colorPalette: [
          { name: 'Silver Metallic', hex: '#9ca3af' },
          { name: 'Safari White', hex: '#f3f4f6' },
          { name: 'Racing Red', hex: '#dc2626' }
        ],
        silhouetteType: 'nissan',
        soundProfile: 'flat6',
        highlights: [
          {
            title: { en: 'S20 Race-Bred Powerplant', th: 'เครื่องยนต์เรซซิ่ง S20 จากสนามแข่ง' },
            desc: {
              en: 'Derived straight from the Prince R380 Grand Prix race car with cross-flow cylinder head.',
              th: 'พัฒนาต่อยอดโดยตรงจากรถแข่งกรังด์ปรีซ์ Prince R380 ฝาสูบแบบ Cross-flow หมุนได้ถึง 7,500 รอบต่อนาที'
            }
          }
        ]
      }
    ]
  },

  lamborghini: {
    id: 'lamborghini',
    name: 'Lamborghini',
    country: 'Italy',
    countryFlag: '🇮🇹',
    foundedYear: 1963,
    headquarters: 'Sant’Agata Bolognese, Emilia-Romagna, Italy',
    founder: 'Ferruccio Lamborghini',
    tagline: {
      en: 'Expect the Unexpected – The Unapologetic Raging Bull of Sant’Agata',
      th: 'เหนือความคาดหมาย – กระทิงเปลี่ยวผู้ไม่ยอมก้มหัวให้ใครแห่งซานต์อกาตา'
    },
    overview: {
      en: 'Founded in 1963 by tractor industrialist Ferruccio Lamborghini following an infamous clash with Enzo Ferrari, the company established the wedge-shaped mid-engine supercar template. Renowned for scissor doors, screaming naturally aspirated V12 engines, and spaceship-like styling.',
      th: 'ก่อตั้งขึ้นในปี 1963 โดยเจ้าของธุรกิจรถแทรกเตอร์ แฟร์รุชโช ลัมโบร์กินี ภายหลังข้อพิพาทอันโด่งดังกับ เอนโซ เฟอร์รารี ลัมโบร์กินีได้กำหนดนิยามรูปทรงลิ่มของซูเปอร์คาร์เครื่องวางกลาง โดดเด่นด้วยประตูปีกนก Scissor Doors เสียงคำรามกึกก้องของเครื่องยนต์ V12 และดีไซน์ดั่งยานอวกาศ'
    },
    racingHeritage: {
      en: 'Lamborghini Super Trofeo one-make championship, GT3 International titles at Daytona 24h and Sebring 12h, and the SC63 LMDh Hypercar program.',
      th: 'การแข่งขันวันเมคเรซ Super Trofeo, แชมป์ GT3 ระดับโลกในการแข่ง Daytona 24h และ Sebring 12h และโครงการไฮเปอร์คาร์ SC63 LMDh'
    },
    heritageColor: '#eab308', // Giallo Yellow
    accentColor: '#10b981', // Verde Green
    models: [
      {
        id: 'lamborghini-revuelto',
        name: 'Lamborghini Revuelto',
        year: 2024,
        generation: 'V12 HPEV Flagship',
        brandId: 'lamborghini',
        heroBadge: 'FIRST V12 HPEV',
        tagline: {
          en: '1,015 Horsepower V12 Hybrid Plug-in Hypercar for the New Era',
          th: 'ไฮเปอร์คาร์ V12 พลักอินไฮบริด 1,015 แรงม้า บุกเบิกยุคใหม่แห่งกระทิงดุ'
        },
        description: {
          en: 'The Revuelto ushers in the electrified era of Lamborghini as the first High Performance Electrified Vehicle (HPEV). Combining an all-new 6.5L naturally aspirated V12 that screams to 9,500 RPM with three electric axial-flux motors and a transverse 8-speed dual-clutch transmission.',
          th: 'Revuelto นำพาลัมโบร์กินีเข้าสู่ยุคระบบขับเคลื่อนไฟฟ้าเต็มรูปแบบ ในฐานะรถ HPEV รุ่นแรก ผสานเครื่องยนต์ V12 ไร้ระบบอัดอากาศ 6.5 ลิตรที่ลากรอบได้ถึง 9,500 รอบ/นาที เข้ากับมอเตอร์ไฟฟ้า 3 ตัว และเกียร์ดูอัลคลัตช์ 8 สปีดวางขวางด้านหลัง'
        },
        historicalSignificance: {
          en: 'Celebrated the 60th anniversary of Lamborghini, proving that electrification can enhance rather than mute the visceral drama of a naturally aspirated Italian V12.',
          th: 'เฉลิมฉลองครบรอบ 60 ปีของแบรนด์ พิสูจน์ให้เห็นว่าระบบไฮบริดสามารถช่วยเพิ่มพละกำลังและความเร้าใจ โดยไม่สูญเสียจิตวิญญาณเสียงคำรามของ V12 แบบดั้งเดิม'
        },
        specs: {
          engine: '6.5L Naturally Aspirated V12 (9,500 RPM) + 3 Electric Motors',
          power: 1015,
          torque: 1062,
          acceleration: 2.5,
          topSpeed: 350,
          weight: 1772,
          drivetrain: 'Four-Wheel Drive (Front e-axle + Mechanical Rear)',
          transmission: '8-speed Dual-Clutch Transverse Gearbox',
          nurburgringLap: 'Under testing (< 6:50 est.)',
          productionCount: 'Sold out for multiple production years'
        },
        colorPalette: [
          { name: 'Arancio Apodis (Orange)', hex: '#f97316' },
          { name: 'Verde Shock (Acid Green)', hex: '#22c55e' },
          { name: 'Giallo Auge (Yellow)', hex: '#eab308' },
          { name: 'Grigio Telesto (Battleship Gray)', hex: '#64748b' },
          { name: 'Nero Noctis (Pure Black)', hex: '#0a0a0c' }
        ],
        silhouetteType: 'lamborghini',
        soundProfile: 'v12',
        highlights: [
          {
            title: { en: 'Aerodynamic Y-Shaped DNA', th: 'เส้นสายดีไซน์รูปตัว Y รอบคัน' },
            desc: {
              en: 'From daytime running lights to side blades and tail illumination, the signature aerospace Y-motif dominates the silhouette.',
              th: 'ไฟหน้า DRL, ช่องดักอากาศด้านข้าง และแถบไฟท้าย ล้วนได้รับแรงบันดาลใจจากสัญลักษณ์ตัว Y และอากาศยานรบล่องหน'
            }
          },
          {
            title: { en: 'Monofuselage Carbon Tub', th: 'โครงสร้างคาร์บอนไฟเบอร์ Monofuselage' },
            desc: {
              en: '10% lighter and 25% stiffer in torsional rigidity than the Aventador chassis.',
              th: 'เบากว่าโครงสร้าง Aventador เดิม 10% แต่ทนแรงบิดตัวถังเพิ่มขึ้นถึง 25% มอบการทรงตัวที่เฉียบคมอย่างเหนือชั้น'
            }
          }
        ]
      },
      {
        id: 'lamborghini-aventador-svj',
        name: 'Lamborghini Aventador SVJ',
        year: 2018,
        generation: 'Super Veloce Jota',
        brandId: 'lamborghini',
        heroBadge: 'NÜRBURGRING KING',
        tagline: {
          en: 'Aerodinamica Lamborghini Attiva (ALA 2.0) Active Aero Mastery',
          th: 'สุดยอดระบบอากาศพลศาสตร์แปรผัน ALA 2.0 ราชันย์แห่งสนาม Nürburgring'
        },
        description: {
          en: 'The SVJ represents the rawest form of the Aventador bloodline. Packing a 770 hp naturally aspirated V12 and the cutting-edge ALA 2.0 system with active flaps inside the front splitter and hollow rear wing to direct airflow through aero-vectoring.',
          th: 'SVJ คือจุดสูงสุดของตระกูล Aventador มอบพละกำลัง 770 แรงม้าจากเครื่องยนต์ V12 ไร้ระบบอัดอากาศ พร้อมระบบ ALA 2.0 ที่ควบคุมครีบลมภายในสปลิตเตอร์หน้าและปีกหลังกลวง นำทางกระแสลมแบบ Aero-vectoring ซ้าย-ขวาขณะเข้าโค้ง'
        },
        historicalSignificance: {
          en: 'Shattered the production car Nürburgring lap record in July 2018 with a time of 6:44.97, reigning as the king of the Green Hell.',
          th: 'โค่นสถิติเวลาต่อรอบของรถโปรดักชันทั่วโลกที่สนาม Nürburgring ในปี 2018 ด้วยเวลา 6 นาที 44.97 วินาที ครองมงกุฎแห่งดินแดน Green Hell'
        },
        specs: {
          engine: '6.5L 60° Naturally Aspirated V12 (8,700 RPM)',
          power: 770,
          torque: 720,
          acceleration: 2.8,
          topSpeed: 352,
          weight: 1525,
          drivetrain: 'Electronically Controlled All-Wheel Drive (Haldex IV)',
          transmission: '7-speed Independent Shifting Rods (ISR)',
          nurburgringLap: '6:44.97 min (Production Record Holder)',
          productionCount: '900 units + 63 SVJ 63 Editions'
        },
        colorPalette: [
          { name: 'Verde Alceo (Matte Green)', hex: '#16a34a' },
          { name: 'Rosso Efesto (Metallic Red)', hex: '#b91c1c' },
          { name: 'Giallo Orion (Pearl Yellow)', hex: '#facc15' },
          { name: 'Viola Pasifae (Metallic Violet)', hex: '#7c3aed' }
        ],
        silhouetteType: 'lamborghini',
        soundProfile: 'v12',
        highlights: [
          {
            title: { en: 'Aero-Vectoring Active Flaps', th: 'ระบบแอร์โรเวกเตอร์ริ่งแปรผัน' },
            desc: {
              en: 'Air is routed internally through the rear wing struts to stall downforce independently on either wheel during hard cornering.',
              th: 'เปิดช่องลมผ่านเสาปีกหลังเพื่อลดหรือเพิ่มแรงกดของล้อฝั่งในและฝั่งนอกโค้งอย่างอิสระ เพิ่มความเร็วในโค้งสูงสุด'
            }
          }
        ]
      },
      {
        id: 'lamborghini-countach-lp400',
        name: 'Lamborghini Countach LP400',
        year: 1974,
        generation: 'Periscopio',
        brandId: 'lamborghini',
        heroBadge: 'THE POSTER CAR',
        tagline: {
          en: 'The Bertone Wedge Masterpiece That Defined the Word Supercar',
          th: 'ผลงานชิ้นเอกทรงลิ่มจาก Bertone ผู้บัญญัติคำว่า "ซูเปอร์คาร์" ให้โลกจารึก'
        },
        description: {
          en: 'Penned by Marcello Gandini at Bertone, the Countach shocked the world with its impossibly flat wedge profile and revolutionary scissor doors. Named after a Piedmontese exclamation of absolute astonishment ("Countach!"), it became the definitive bedroom wall poster car.',
          th: 'ออกแบบโดย Marcello Gandini แห่งสำนัก Bertone สร้างความตื่นตะลึงให้แก่โลกด้วยรูปทรงลิ่มแบนราบและประตูปีกนก Scissor Doors ที่เปิดขึ้นฟ้าเป็นครั้งแรก ตั้งชื่อตามคำอุทานภาษาปีเอมอนต์ที่แปลว่า "น่าตกตะลึงเหลือเกิน!" กลายเป็นรถในฝันบนโปสเตอร์ห้องนอนของเด็กทั่วโลก'
        },
        historicalSignificance: {
          en: 'Originated the iconic cab-forward wedge architecture that every mid-engine supercar has been influenced by for five decades.',
          th: 'เป็นต้นแบบโครงสร้างทรงลิ่มห้องโดยสารโน้มไปข้างหน้า (Cab-forward Wedge) ที่ส่งอิทธิพลต่อซูเปอร์คาร์เครื่องวางกลางทุกรุ่นตลอด 5 ทศวรรษ'
        },
        specs: {
          engine: '3.9L Naturally Aspirated V12 with 6 Weber Carburetors',
          power: 375,
          torque: 361,
          acceleration: 5.4,
          topSpeed: 290,
          weight: 1065,
          drivetrain: 'Rear-Wheel Drive (RWD) Longitudinal Rear (LP)',
          transmission: '5-speed Manual Transmission in front of engine',
          productionCount: '157 LP400 Periscopio units'
        },
        colorPalette: [
          { name: 'Giallo Sole (Yellow)', hex: '#f59e0b' },
          { name: 'Rosso Countach (Red)', hex: '#dc2626' },
          { name: 'Tahiti Blue', hex: '#2563eb' }
        ],
        silhouetteType: 'lamborghini',
        soundProfile: 'v12',
        highlights: [
          {
            title: { en: 'Periscopio Roof Channel', th: 'ช่องกระจกมองหลังสไตล์กล้องปริทรรศน์' },
            desc: {
              en: 'A depression routed through the roof allowed the interior rearview mirror to look out backward over the rear-mounted engine.',
              th: 'ร่องเว้าบนหลังคาถูกออกแบบมาเพื่อให้กระจกมองหลังสามารถมองข้ามฝากระโปรงเครื่องยนต์ V12 ด้านหลังได้'
            }
          }
        ]
      },
      {
        id: 'lamborghini-diablo-vt',
        name: 'Lamborghini Diablo VT',
        year: 1993,
        generation: 'Viscous Traction Era',
        brandId: 'lamborghini',
        heroBadge: '200 MPH DEMON',
        tagline: {
          en: 'First Lamborghini to Exceed 200 MPH with Viscous Traction AWD',
          th: 'ลัมโบร์กินีรุ่นแรกที่ทำความเร็วทะลุ 200 ไมล์/ชม. พร้อมระบบขับเคลื่อนสี่ล้อ VT'
        },
        description: {
          en: 'Named after a ferocious 19th-century fighting bull raised by the Duke of Veragua, the Diablo was the first Lamborghini capable of shattering the 200 mph (325 km/h) barrier. The VT version added an innovative viscous clutch sending up to 25% torque to the front wheels.',
          th: 'ตั้งชื่อตามวัวกระทิงดุร้ายในศตวรรษที่ 19 ของดยุกแห่งเวรากัว ดิอาโบลเป็นลัมโบร์กินีรุ่นแรกที่ทะลวงกำแพงความเร็ว 200 ไมล์/ชม. (325 กม./ชม.) รุ่น VT เสริมระบบขับเคลื่อน 4 ล้อ Viscous Traction ที่ส่งกำลังได้ถึง 25% สู่ล้อหน้าเพื่อการควบคุมที่เฉียบคม'
        },
        historicalSignificance: {
          en: 'Transitioned Lamborghini into the modern era of usable supercar handling while maintaining its terrifying presence and raw power.',
          th: 'เปลี่ยนผ่านลัมโบร์กินีเข้าสู่ยุคซูเปอร์คาร์ที่ควบคุมได้มั่นคงยิ่งขึ้น แต่ยังคงรูปลักษณ์ที่ดุดันและพละกำลังมหาศาล'
        },
        specs: {
          engine: '5.7L Naturally Aspirated 48-valve V12',
          power: 492,
          torque: 580,
          acceleration: 4.1,
          topSpeed: 328,
          weight: 1625,
          drivetrain: 'Viscous Traction All-Wheel Drive (VT AWD)',
          transmission: '5-speed Gated Manual with Dogleg First Gear',
          productionCount: '~400 VT first-series models'
        },
        colorPalette: [
          { name: 'Superfly Yellow', hex: '#eab308' },
          { name: 'Diablo Rosso', hex: '#b91c1c' },
          { name: 'Deep Purple Metallic', hex: '#581c87' }
        ],
        silhouetteType: 'lamborghini',
        soundProfile: 'v12',
        highlights: [
          {
            title: { en: 'Gated Manual Shifter', th: 'คันเกียร์ร่องโลหะ Open-Gate อันเป็นเอกลักษณ์' },
            desc: {
              en: 'Click-clack metallic feedback on every shift with reverse dogleg pattern.',
              th: 'ให้สัมผัสการเปลี่ยนเกียร์ที่กระชับ แม่นยำ และเสียงกระทบของโลหะอันเป็นเอกลักษณ์คลาสสิก'
            }
          }
        ]
      }
    ]
  },

  toyota: {
    id: 'toyota',
    name: 'Toyota',
    country: 'Japan',
    countryFlag: '🇯🇵',
    foundedYear: 1937,
    headquarters: 'Toyota City, Aichi Prefecture, Japan',
    founder: 'Kiichiro Toyoda',
    tagline: {
      en: 'Pushing the Limits for Better – The Spirit of Gazoo Racing & LFA Masterpiece',
      th: 'ก้าวข้ามขีดจำกัดเพื่อสิ่งที่ดีกว่า – จิตวิญญาณ Gazoo Racing และมาสเตอร์พีซ LFA'
    },
    overview: {
      en: 'From building Japan’s first true exotic with the 1967 2000GT to reigning supreme at Le Mans with 5 consecutive overall victories, Toyota and its Gazoo Racing (TGR) division embody relentless engineering perfection. Developed under the Toyota umbrella, the Lexus LFA stands as arguably the best-sounding V10 supercar ever conceived.',
      th: 'ตั้งแต่การสร้างซูเปอร์คาร์ระดับโลกคันแรกของญี่ปุ่นด้วย Toyota 2000GT ในปี 1967 สู่การคว้าแชมป์ 24 Hours of Le Mans ติดต่อกัน 5 สมัย โตโยต้าและแผนก Gazoo Racing (TGR) เป็นตัวแทนของความสมบูรณ์แบบทางวิศวกรรม โดยมีไฮไลต์อย่าง Lexus LFA ซูเปอร์คาร์เครื่องยนต์ V10 ที่ได้รับการยอมรับว่าเสียงไพเราะที่สุดในโลก'
    },
    racingHeritage: {
      en: '5 Consecutive Overall 24 Hours of Le Mans Victories (2018-2022), multiple FIA World Endurance Championships (WEC), and World Rally Championship (WRC) dominance.',
      th: 'แชมป์ 24 Hours of Le Mans 5 สมัยติดต่อกัน (2018-2022), แชมป์โลก FIA WEC และครองความยิ่งใหญ่ในการแข่งขันแรลลี่ระดับโลก WRC'
    },
    heritageColor: '#ef4444', // Gazoo Racing Red
    accentColor: '#1e293b', // GR Black
    models: [
      {
        id: 'toyota-lexus-lfa',
        name: 'Lexus LFA (Toyota Flagship Supercar)',
        year: 2010,
        generation: 'Nürburgring Package Era',
        brandId: 'toyota',
        heroBadge: 'V10 SYMPHONY',
        tagline: {
          en: 'Acoustically Tuned with Yamaha – The Most Sublime V10 Exhaust Note',
          th: 'จูนเสียงเครื่องยนต์ร่วมกับ Yamaha – ซูเปอร์คาร์ V10 สุ้มเสียงไพเราะที่สุดในโลก'
        },
        description: {
          en: 'Ten years in development by chief engineer Haruhiko Tanahashi and master driver Hiromu Naruse under personal backing from Akio Toyoda. Built with 65% in-house carbon fiber (CFRP) on a bespoke circular loom, its 4.8L 1LR-GUE V10 revs from idle to 9,000 RPM in just 0.6 seconds.',
          th: 'ใช้เวลาพัฒนาถึง 10 ปีเต็มโดยหัวหน้าวิศวกร Haruhiko Tanahashi และครูฝึกนักขับระดับตำนาน Hiromu Naruse ภายใต้การสนับสนุนของ อากิโอะ โตโยดะ ตัวถังคาร์บอนไฟเบอร์ 65% ผลิตด้วยเครื่องทอคาร์บอนทรงกลม เครื่องยนต์ 4.8 ลิตร V10 รหัส 1LR-GUE กวาดรอบจากเดินเบาสู่ 9,000 รอบ/นาที ในเวลาเพียง 0.6 วินาที'
        },
        historicalSignificance: {
          en: 'Engine revved so fast that analog tachometers could not keep up, mandating the world’s first production digital TFT gauge cluster. Set a 7:14.64 Nürburgring lap in Nürburgring Edition trim.',
          th: 'เครื่องยนต์กวาดรอบเร็วจัดจนเข็มวัดรอบแบบแอนะล็อกหมุนตามไม่ทัน ทำให้ต้องใช้หน้าปัดจอ TFT ดิจิทัลเป็นครั้งแรกของโลกในรถซูเปอร์คาร์ พร้อมทำเวลา Nürburgring 7:14.64 นาที'
        },
        specs: {
          engine: '4.8L Naturally Aspirated 72° V10 (1LR-GUE - 9,000 RPM)',
          power: 563, // 571 PS in Nurburgring Edition
          torque: 480,
          acceleration: 3.6,
          topSpeed: 326,
          weight: 1480,
          drivetrain: 'Rear-Wheel Drive (Front Mid-Engine RWD with Transaxle)',
          transmission: '6-speed Automated Sequential Gearbox (ASG)',
          nurburgringLap: '7:14.64 min (Nürburgring Edition)',
          productionCount: 'Strictly limited to 500 units'
        },
        colorPalette: [
          { name: 'Whitest White (077)', hex: '#ffffff' },
          { name: 'Lexus Pearl Yellow', hex: '#eab308' },
          { name: 'Obsidian Black', hex: '#0f172a' },
          { name: 'Sunset Orange', hex: '#ea580c' },
          { name: 'Steel Gray', hex: '#64748b' }
        ],
        silhouetteType: 'toyota',
        soundProfile: 'v10',
        highlights: [
          {
            title: { en: 'Yamaha Acoustic Surge Tank', th: 'ท่อรวมไอดีจูนเสียงร่วมกับ Yamaha Musical' },
            desc: {
              en: 'Yamaha musical instruments division tuned the acoustic surge tank and routed audio pipes directly into the cabin for an F1 scream.',
              th: 'แผนกเครื่องดนตรีของยามาฮ่าเป็นผู้ออกแบบท่อร่วมไอดีและนำทางสุ้มเสียงเครื่องยนต์เข้าสู่ห้องโดยสารราวกับนั่งอยู่ในรถแข่ง F1'
            }
          },
          {
            title: { en: 'In-House Circular Carbon Loom', th: 'เครื่องทอคาร์บอนไฟเบอร์ 3 มิติทรงกลม' },
            desc: {
              en: 'Toyota invented a circular laser-guided 3D carbon-fiber loom to weave hollow carbon A-pillars seamlessly.',
              th: 'โตโยต้าคิดค้นเครื่องทอคาร์บอนไฟเบอร์ทรงกลม 3 มิติ เพื่อขึ้นรูปเสาหลังคาแบบไร้รอยต่อ เพิ่มความแข็งแกร่งสูงสุด'
            }
          }
        ]
      },
      {
        id: 'toyota-supra-mk4-a80',
        name: 'Toyota Supra Mk4 (A80 Twin Turbo)',
        year: 1993,
        generation: 'A80 Generation',
        brandId: 'toyota',
        heroBadge: 'THE 2JZ TITAN',
        tagline: {
          en: 'The Bulletproof 2JZ-GTE Powerhouse and 90s Tuner Icon',
          th: 'ขุมพลังเหล็กไหล 2JZ-GTE อันทนทาน ไอคอนแห่งวงการโมดิฟายยุค 90s'
        },
        description: {
          en: 'The fourth-generation Supra combined voluptuous aerodynamic curves, an oversized hoop rear wing, and a cockpit curved tightly around the driver like a jet fighter. Under the hood lay the cast-iron 2JZ-GTE with sequential twin turbos, legendary for its over-engineered strength.',
          th: 'Supra เจเนอเรชันที่ 4 ผสมผสานเส้นสายตัวถังโค้งมน ปีกหลังทรงห่วงสูงอันโดดเด่น และค็อกพิทที่โอบล้อมผู้ขับขี่ดั่งเครื่องบินขับไล่ ขับเคลื่อนด้วยเครื่องยนต์เหล็กหล่อ 2JZ-GTE เทอร์โบคู่ Sequential ที่ขึ้นชื่อเรื่องความทนทานขั้นเทพจนรองรับการอัปเกรดเป็น 1,000+ แรงม้า'
        },
        historicalSignificance: {
          en: 'Achieved legendary status on the street, in drag racing, at the JGTC / Super GT circuits, and as the hero car in The Fast and the Furious franchise.',
          th: 'ก้าวสู่สถานะตำนานไร้กาลเวลา ทั้งในสนามแข่งทางตรง Drag, ในการแข่ง Super GT ของญี่ปุ่น และเป็นรถตัวเอกในภาพยนตร์ The Fast and the Furious'
        },
        specs: {
          engine: '3.0L Sequential Twin-Turbo Inline-6 (2JZ-GTE)',
          power: 325, // Export rating
          torque: 441,
          acceleration: 4.6,
          topSpeed: 250, // Electronically limited (capable of 285+)
          weight: 1530,
          drivetrain: 'Rear-Wheel Drive (RWD) with Torsen LSD',
          transmission: '6-speed Getrag V160/V161 Manual Transmission',
          nurburgringLap: 'Under 8 minutes (Best Motoring benchmark)',
          productionCount: 'Celebrated classic production'
        },
        colorPalette: [
          { name: 'Renaissance Red', hex: '#dc2626' },
          { name: 'Royal Sapphire Pearl', hex: '#1d4ed8' },
          { name: 'Super White', hex: '#f8fafc' },
          { name: 'Quick Silver Metallic', hex: '#94a3b8' },
          { name: 'Baltic Blue', hex: '#0284c7' }
        ],
        silhouetteType: 'toyota',
        soundProfile: 'v6tt',
        highlights: [
          {
            title: { en: 'Indestructible Cast-Iron Block', th: 'เสื้อสูบเหล็กหล่อเหนียวพิเศษรองรับ 1000+ แรงม้า' },
            desc: {
              en: 'Over-engineered closed-deck block capable of holding immense boost pressures without engine block failure.',
              th: 'เสื้อสูบแบบ Closed-deck ที่ผลิตอย่างแข็งแกร่ง สามารถรองรับแรงดันบูสต์มหาศาลได้โดยไม่ต้องเปลี่ยนท่อนล่าง'
            }
          }
        ]
      },
      {
        id: 'toyota-2000gt',
        name: 'Toyota 2000GT',
        year: 1967,
        generation: 'The Genesis Exotic',
        brandId: 'toyota',
        heroBadge: 'FIRST JAPANESE SUPERCAR',
        tagline: {
          en: 'Japan’s Very First Exotic Supercar and James Bond Stunner',
          th: 'ซูเปอร์คาร์รุ่นแรกสุดของญี่ปุ่น และรถคู่ใจเจมส์ บอนด์ 007'
        },
        description: {
          en: 'Debuted at the 1965 Tokyo Motor Show, the 2000GT proved that Japan could build an exotic grand tourer capable of rivaling Jaguar and Porsche. Designed in collaboration with Yamaha, it featured a sculpted aluminum body, rosewood interior trim, and four-wheel disc brakes.',
          th: 'เปิดตัวที่งาน Tokyo Motor Show ปี 1965 โตโยต้า 2000GT พิสูจน์ว่าประเทศญี่ปุ่นสามารถสร้างรถสปอร์ตระดับ Exotic เทียบชั้น Jaguar E-Type และ Porsche ได้ ออกแบบร่วมกับยามาฮ่า ตัวถังอะลูมิเนียมโค้งมน แดชบอร์ดไม้โรสวูด และดิสก์เบรก 4 ล้อรุ่นแรกของญี่ปุ่น'
        },
        historicalSignificance: {
          en: 'Famously custom-built as an open-top roadster for Sean Connery in the 1967 James Bond film "You Only Live Twice"; today fetches over $1,000,000 at auctions.',
          th: 'สร้างรุ่นเปิดประทุนพิเศษให้ ฌอน คอนเนอรี ขับในภาพยนตร์ เจมส์ บอนด์ 007 ภาค "You Only Live Twice" ปัจจุบันเป็นรถสะสมที่มีมูลค่าประมูลเกินกว่า 1 ล้านดอลลาร์สหรัฐ'
        },
        specs: {
          engine: '2.0L Naturally Aspirated DOHC Inline-6 (Yamaha 3M Head)',
          power: 150,
          torque: 175,
          acceleration: 8.4,
          topSpeed: 220,
          weight: 1120,
          drivetrain: 'Rear-Wheel Drive (RWD) with Limited-Slip Diff',
          transmission: '5-speed Manual with Overdrive',
          productionCount: 'Only 351 units hand-built'
        },
        colorPalette: [
          { name: 'Pegasus White', hex: '#f8fafc' },
          { name: 'Solar Red', hex: '#dc2626' },
          { name: 'Thunder Silver', hex: '#9ca3af' }
        ],
        silhouetteType: 'toyota',
        soundProfile: 'flat6',
        highlights: [
          {
            title: { en: 'FIA Speed & Endurance Records', th: 'ทำลายสถิติความเร็วและความทนทาน FIA 16 รายการ' },
            desc: {
              en: 'Ran continuously for 72 hours at Yatabe Test Track averaging 206 km/h in torrential rain.',
              th: 'วิ่งทดสอบต่อเนื่อง 72 ชั่วโมง ณ สนาม Yatabe ด้วยความเร็วเฉลี่ย 206 กม./ชม. ท่ามกลางพายุฝน ทำลายสถิติโลก 3 รายการ'
            }
          }
        ]
      },
      {
        id: 'toyota-gr-supra-gt3',
        name: 'Toyota GR Supra / GR GT3 Concept',
        year: 2024,
        generation: 'Gazoo Racing Era',
        brandId: 'toyota',
        heroBadge: 'RACE BRED MODERN',
        tagline: {
          en: 'Bred on the Nürburgring 24 Hours by Toyota Gazoo Racing',
          th: 'ถือกำเนิดและขัดเกลาจากสนามแข่ง Nürburgring 24 Hours โดย Toyota Gazoo Racing'
        },
        description: {
          en: 'Engineered with the golden ratio of 1.55 wheelbase-to-track ratio and a perfect 50:50 weight distribution. Honed under the direct stewardship of master driver "Morizo" (Akio Toyoda), proving modern Toyota’s commitment to pure driving thrills.',
          th: 'ออกแบบด้วยสัดส่วนทองคำ Wheelbase ต่อความกว้างล้อ 1.55 และการกระจายน้ำหนักหน้า-หลัง 50:50 อย่างสมบูรณ์แบบ ทดสอบและเซตอัพในสนามแข่งโดยมาสเตอร์ไดรเวอร์ "Morizo" (อากิโอะ โตโยดะ) ยืนยันความมุ่งมั่นในการสร้างรถเพื่อความสนุกในการขับขี่'
        },
        historicalSignificance: {
          en: 'Revived the iconic Supra nameplate for the modern era, forming the vanguard of Toyota’s victorious Gazoo Racing motorsport offensive.',
          th: 'ปลุกชีพชื่อ Supra ให้กลับมาผงาดในยุคโมเดิร์น เป็นหัวหอกของแบรนด์ Gazoo Racing ในการแข่งขันระดับนานาชาติ'
        },
        specs: {
          engine: '3.0L Twin-Scroll Turbocharged Inline-6 (B58)',
          power: 382,
          torque: 500,
          acceleration: 3.9,
          topSpeed: 250, // Electronically limited (270+ unrestricted)
          weight: 1500,
          drivetrain: 'Rear-Wheel Drive (RWD) with Active Differential',
          transmission: '6-speed Intelligent Manual Transmission (iMT) / 8-speed Auto',
          nurburgringLap: '7:52 min (Stock production)',
          productionCount: 'Global production'
        },
        colorPalette: [
          { name: 'Renaissance Red 2.0', hex: '#dc2626' },
          { name: 'Nitro Yellow', hex: '#eab308' },
          { name: 'Phantom Matte Gray', hex: '#475569' },
          { name: 'Horizon Blue', hex: '#0284c7' },
          { name: 'Nocturnal Black', hex: '#0f172a' }
        ],
        silhouetteType: 'toyota',
        soundProfile: 'v6tt',
        highlights: [
          {
            title: { en: 'Golden Ratio 1.55 Chassis', th: 'สัดส่วนตัวถัง Golden Ratio 1.55' },
            desc: {
              en: 'Shorter wheelbase than the GT86 with wider track width delivers hyper-agile corner rotation.',
              th: 'ระยะฐานล้อสั้นกว่า GT86 แต่มีความกว้างของฐานล้อมากกว่า ทำให้รถเลี้ยวเข้าโค้งได้อย่างคล่องแคล่วว่องไว'
            }
          }
        ]
      }
    ]
  }
};
