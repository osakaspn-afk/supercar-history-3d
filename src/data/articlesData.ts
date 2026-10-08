// In-depth Engineering and Historical Articles for Supercar Heritage Archive

export interface ArticleItem {
  id: string;
  brandId: 'porsche' | 'nissan' | 'lamborghini' | 'toyota' | 'general';
  brandName: string;
  badge: string;
  title: { en: string; th: string };
  subtitle: { en: string; th: string };
  readTime: string;
  publishDate: string;
  author: string;
  coverImageAlt: string;
  summary: { en: string; th: string };
  keyTakeaways: Array<{ en: string; th: string }>;
  contentSections: Array<{
    heading: { en: string; th: string };
    paragraphs: Array<{ en: string; th: string }>;
    quote?: { text: { en: string; th: string }; author: string };
    stats?: Array<{ label: { en: string; th: string }; value: string }>;
  }>;
}

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'lfa-yamaha-acoustic-miracle',
    brandId: 'toyota',
    brandName: 'Toyota / Lexus',
    badge: 'ACOUSTIC ENGINEERING',
    title: {
      en: 'The Acoustic Miracle: Inside Yamaha’s Musical Tuning of the Lexus LFA V10',
      th: 'ปาฏิหาริย์แห่งสุ้มเสียง: เบื้องหลังการจูนเสียงเครื่องยนต์ระดับดนตรีของ Lexus LFA V10 ร่วมกับ Yamaha'
    },
    subtitle: {
      en: 'How automotive engineers and orchestral instrument makers crafted the greatest exhaust note in history.',
      th: 'เมื่อวิศวกรยานยนต์ร่วมมือกับช่างทำเครื่องดนตรีออร์เคสตรา เพื่อสร้างเสียงไอเสียที่ไพเราะที่สุดในประวัติศาสตร์ยานยนต์'
    },
    readTime: '6 min read',
    publishDate: 'October 2026',
    author: 'Haruhiko Tanahashi & Acoustic Lab',
    coverImageAlt: 'Lexus LFA 1LR-GUE Engine with Yamaha Surge Tank',
    summary: {
      en: 'The Lexus LFA’s 4.8-liter V10 was not designed merely for power; it was engineered as an instrument. Yamaha’s musical instrument division designed an acoustic surge tank with dedicated sound pipes funneled directly into the passenger cabin, creating the "Roar of an Angel".',
      th: 'เครื่องยนต์ 4.8 ลิตร V10 รหัส 1LR-GUE ของ Lexus LFA ไม่ได้ถูกสร้างขึ้นมาเพื่อแรงม้าเพียงอย่างเดียว แต่ถูกออกแบบให้เป็น "เครื่องดนตรี" โดยแผนกเครื่องดนตรีของ Yamaha ได้ออกแบบท่อร่วมไอดีและท่อส่งเสียงนำคลื่นความถี่สูงตรงเข้าสู่ห้องโดยสาร กลายเป็นเสียงระดับตำนานที่ถูกขนานนามว่า "เสียงคำรามของเทพธิดา"'
    },
    keyTakeaways: [
      {
        en: 'Revving from idle to 9,000 RPM takes only 0.6 seconds, mandating the world’s first production digital TFT gauge.',
        th: 'กวาดรอบจากเดินเบาสู่ 9,000 รอบ/นาที ในเวลาเพียง 0.6 วินาที เร็วจนเข็มแอนะล็อกหมุนตามไม่ทัน ทำให้ต้องใช้หน้าปัดดิจิทัล TFT คันแรกของโลก'
      },
      {
        en: 'Yamaha Musical Instrument Division treated the intake plenum as an acoustic resonance sound box.',
        th: 'แผนกเครื่องดนตรีของยามาฮ่า ออกแบบห้องรวมไอดีให้ทำหน้าที่เสมือนกล่องสะท้อนเสียงของเครื่องสายออร์เคสตรา'
      },
      {
        en: 'Three triangular exhaust outlets combine high-frequency soundwaves to eliminate harsh turbulence.',
        th: 'ปลายท่อไอเสียสามท่อทรงสามเหลี่ยมกลับหัว ผสานคลื่นความถี่สูงเพื่อขจัดเสียงแตกพร่า ให้เหลือเพียงเสียงร้องกังวานบริสุทธิ์'
      }
    ],
    contentSections: [
      {
        heading: {
          en: '1. A Decade of Uncompromised Obsession',
          th: '1. ทศวรรษแห่งความหลงใหลและการไม่ยอมจำนน'
        },
        paragraphs: [
          {
            en: 'Development of the LFA began in early 2000 under project code TXS (Toyota Experimental Sportscar). Chief Engineer Haruhiko Tanahashi and Toyota’s legendary test driver Hiromu Naruse wanted an exotic with unprecedented emotional engagement.',
            th: 'โครงการพัฒนา LFA เริ่มต้นในปี 2000 ภายใต้รหัส TXS (Toyota Experimental Sportscar) หัวหน้าวิศวกร Haruhiko Tanahashi และนักทดสอบระดับปรมาจารย์ Hiromu Naruse ตั้งเป้าสร้างรถสปอร์ตที่มอบอารมณ์ร่วมในการขับขี่สูงสุดอย่างที่ไม่เคยมีมาก่อน'
          },
          {
            en: 'Halfway through development, after building aluminum prototypes, Tanahashi realized aluminum was too heavy. In an unprecedented move, Toyota restarted the chassis in 65% Carbon Fiber Reinforced Plastic (CFRP), inventing a circular laser-guided 3D carbon loom.',
            th: 'เมื่อพัฒนาไปได้ครึ่งทางหลังสร้างรถต้นแบบอะลูมิเนียมเสร็จสิ้น ทีมงานตระหนักว่าอะลูมิเนียมยังหนักเกินไป โตโยต้าจึงตัดสินใจรื้อโครงสร้างใหม่ทั้งหมดเปลี่ยนเป็นคาร์บอนไฟเบอร์ CFRP 65% พร้อมสร้างเครื่องทอคาร์บอนทรงกลม 3 มิติขึ้นมาเพื่อถักทอเสาหลังคาแบบไร้รอยต่อ'
          }
        ],
        quote: {
          text: {
            en: 'We wanted a car whose sound gave goosebumps before the driver even reached the first corner.',
            th: 'เราต้องการสร้างรถที่เพียงแค่ได้ยินเสียงเครื่องยนต์ ก็ทำให้ผู้ขับขนลุกซู่ตั้งแต่ยังไม่ถึงโค้งแรก'
          },
          author: 'Haruhiko Tanahashi, LFA Chief Engineer'
        }
      },
      {
        heading: {
          en: '2. The 1LR-GUE Engine: Sized Like a V8, Lightweight as a V6',
          th: '2. เครื่องยนต์ 1LR-GUE: ขนาดเท่า V8 แต่น้ำหนักเบากว่า V6'
        },
        paragraphs: [
          {
            en: 'Collaborating with Yamaha, the 4.8L naturally aspirated 72° V10 featured titanium valves, forged aluminum pistons, and independent throttle bodies for all 10 cylinders. It is physically more compact than a standard 3.5L V6 and lighter than Toyota’s 2GR V6.',
            th: 'ด้วยความร่วมมือกับยามาฮ่า เครื่องยนต์ 4.8L V10 มุมเอียง 72 องศา ใช้ลิ้นไอดี-ไอเสียไทเทเนียม ลูกสูบอะลูมิเนียมฟอร์จ และลิ้นปีกผีเสื้อแยกเดี่ยวครบทั้ง 10 สูบ มีขนาดกะทัดรัดกว่าเครื่อง V8 ทั่วไป และน้ำหนักเบากว่าเครื่องยนต์ V6 รหัส 2GR ของโตโยต้าเสียอีก'
          }
        ],
        stats: [
          { label: { en: 'Redline', th: 'รอบสูงสุด' }, value: '9,500 RPM' },
          { label: { en: 'Rev Time (Idle to 9k)', th: 'เวลากวาดรอบ' }, value: '0.6 Sec' },
          { label: { en: 'Specific Output', th: 'แรงม้าต่อลิตร' }, value: '117.3 HP/L' }
        ]
      }
    ]
  },
  {
    id: 'porsche-992-gt3rs-aero-mastery',
    brandId: 'porsche',
    brandName: 'Porsche',
    badge: 'AERODYNAMIC WEAPON',
    title: {
      en: 'The 860kg Downforce Miracle: Inside the Porsche 911 GT3 RS (992)',
      th: 'ปาฏิหาริย์แรงกด 860 กก.: เจาะลึกแอโรไดนามิก Porsche 911 GT3 RS (992)'
    },
    subtitle: {
      en: 'How active aerodynamics and Formula 1 DRS technology conquered the Nürburgring Nordschleife.',
      th: 'การนำเทคโนโลยีปีกเปิด-ปิด DRS จาก Formula 1 มาสู่รถโปรดักชันเพื่อพิชิตสนามเขียว Nürburgring Nordschleife'
    },
    readTime: '5 min read',
    publishDate: 'October 2026',
    author: 'Andreas Preuninger & GT Department',
    coverImageAlt: 'Porsche 911 GT3 RS Active Wing and Swan Neck Struts',
    summary: {
      en: 'The 992 GT3 RS sacrificed its front luggage compartment for a single large central radiator inspired by the Le Mans-winning 911 RSR. This freed front wheel arch space for active underbody flaps, producing an astounding 860 kg of downforce at 285 km/h.',
      th: 'Porsche 911 GT3 RS รหัส 992 ยอมสละพื้นที่เก็บสัมภาระด้านหน้าเพื่อติดตั้งหม้อน้ำเดี่ยวขนาดใหญ่ตรงกลางแบบรถแข่งเลอม็อง 911 RSR เปิดทางให้ติดตั้งแผ่นครีบรีดอากาศใต้ท้องรถ ทำงานผสานกับปีกหลัง Active Wing สร้างแรงกดมหาศาลถึง 860 กิโลกรัม ที่ความเร็ว 285 กม./ชม.'
    },
    keyTakeaways: [
      {
        en: 'Generates more downforce than a Porsche 911 GT3 Cup factory racing car.',
        th: 'สร้างแรงกดตัวถังได้มากกว่ารถแข่งพันธุ์แท้ 911 GT3 Cup เสียอีก'
      },
      {
        en: 'Features hydraulic DRS (Drag Reduction System) operated via a steering wheel button.',
        th: 'ติดตั้งระบบ DRS (Drag Reduction System) ไฮดรอลิก ควบคุมเปิด-ปิดได้จากปุ่มบนพวงมาลัย'
      },
      {
        en: 'Nürburgring Nordschleife lap time: 6 minutes 49.328 seconds.',
        th: 'ทำเวลาต่อรอบสนาม Nürburgring Nordschleife สถิติโลก 6 นาที 49.328 วินาที'
      }
    ],
    contentSections: [
      {
        heading: {
          en: '1. The Death of the Front Trunk',
          th: '1. การอำลาที่เก็บของด้านหน้าเพื่อชัยชนะในสนามแข่ง'
        },
        paragraphs: [
          {
            en: 'In previous generations, the 911 used a three-radiator layout. For the 992 GT3 RS, Porsche Motorsport eliminated the front trunk completely. The center radiator angles air upward through dramatic carbon fiber nostrils on the hood.',
            th: 'ในรุ่นก่อนๆ 911 ใช้หม้อน้ำ 3 ตัวแยกส่วน แต่สำหรับ 992 GT3 RS แผนก Porsche Motorsport ได้ตัดพื้นที่เก็บของหน้ารถออกทั้งหมด ติดตั้งหม้อน้ำขนาดใหญ่ตัวเดียวที่เอียงทำมุม และระบายลมร้อนขึ้นผ่านช่องลมคาร์บอนขนาดมหึมาบนฝากระโปรงหน้า'
          }
        ],
        quote: {
          text: {
            en: 'We didn’t build a sports car with track capability; we built a race car that happens to be road-legal.',
            th: 'เราไม่ได้สร้างรถสปอร์ตที่ขับลงสนามได้ แต่เราสร้างรถแข่งที่บังเอิญถูกกฎหมายวิ่งบนถนนได้'
          },
          author: 'Andreas Preuninger, Head of Porsche GT Line'
        }
      }
    ]
  },
  {
    id: 'nissan-gtr-godzilla-evolution',
    brandId: 'nissan',
    brandName: 'Nissan',
    badge: 'ALL-WHEEL DRIVE TITAN',
    title: {
      en: 'The Godzilla Genesis: From 1969 KPGC10 to the VR38DETT Titan',
      th: 'ตำนานก็อดซิลล่า: วิวัฒนาการจาก 1969 KPGC10 สู่ขุมพลัง VR38DETT ปราบยุโรป'
    },
    subtitle: {
      en: 'How a Japanese four-door sedan evolved into an all-wheel-drive supercar slayer.',
      th: 'จากรถซีดานครอบครัว สู่รถซูเปอร์คาร์ขับเคลื่อนสี่ล้อที่โค่นยักษ์ใหญ่แห่งยุโรป'
    },
    readTime: '5 min read',
    publishDate: 'October 2026',
    author: 'Kazutoshi Mizuno & Nismo Heritage',
    coverImageAlt: 'Nissan GT-R R35 Nismo Engine and Aerodynamics',
    summary: {
      en: 'The name Godzilla was coined by Australian automotive journalists in 1990 when the R32 GT-R decimated the Australian Touring Car Championship. With the R35, chief engineer Kazutoshi Mizuno reimagined the GT-R with a rear transaxle and hand-built twin-turbo VR38DETT.',
      th: 'ฉายา "Godzilla" กำเนิดขึ้นในปี 1990 โดยสื่อยานยนต์ออสเตรเลีย เมื่อ R32 GT-R ลงแข่งและกวาดชัยชนะแบบไร้พ่ายในรายการ ATCC จนกระทั่งในรุ่น R35 หัวหน้าวิศวกร Kazutoshi Mizuno ได้ปฏิวัติโครงสร้างใหม่ด้วยระบบขับเคลื่อนสี่ล้ออิสระและเครื่องยนต์ประกอบมือทวินเทอร์โบ VR38DETT'
    },
    keyTakeaways: [
      {
        en: 'The VR38DETT engine is hand-assembled in a dust-free cleanroom by one of five master craftsmen known as "Takumi".',
        th: 'เครื่องยนต์ VR38DETT ประกอบด้วยมือในห้องปลอดฝุ่นโดยปรมาจารย์ช่างฝีมือ "Takumi" เพียงไม่กี่คนในโลก'
      },
      {
        en: 'ATTESA E-TS all-wheel drive can route up to 100% of torque to the rear wheels, or 50% to the front.',
        th: 'ระบบขับเคลื่อน 4 ล้อ ATTESA E-TS สามารถถ่ายกำลังไปล้อหลังได้ 100% และกระจายไปล้อหน้าได้ถึง 50% ในเสี้ยววินาที'
      }
    ],
    contentSections: [
      {
        heading: {
          en: '1. The Takumi Tradition',
          th: '1. จิตวิญญาณช่างฝีมือทาคุมิ (Takumi)'
        },
        paragraphs: [
          {
            en: 'Every single GT-R engine is built by hand in Yokohama. Only a master craftsman with decades of precision experience can bear the title of Takumi, stamping their personal plaque onto the front of the intake manifold.',
            th: 'เครื่องยนต์ GT-R ทุกตัวถูกประกอบด้วยมือที่โรงงานโยโกฮาม่า มีเพียงช่างผู้ชำนาญการที่ผ่านประสบการณ์หลายสิบปีเท่านั้นที่จะได้ชื่อว่าเป็น ทาคุมิ และได้รับเกียรติให้สลักแผ่นป้ายชื่อตัวเองลงบนหน้าเครื่องยนต์'
          }
        ]
      }
    ]
  },
  {
    id: 'lamborghini-v12-operatic-legacy',
    brandId: 'lamborghini',
    brandName: 'Lamborghini',
    badge: 'NATURALLY ASPIRATED PURITY',
    title: {
      en: 'The 60-Year Opera: The Unbroken Lineage of Lamborghini V12s',
      th: 'โอเปร่า 60 ปี: สายเลือดเครื่องยนต์ V12 ไร้ระบบอัดอากาศของลัมโบร์กินี'
    },
    subtitle: {
      en: 'From Bizzarrini’s 1963 350GT to the ferocious 6.5L Aventador SVJ and Revuelto.',
      th: 'จากผลงานออกแบบของ Giotto Bizzarrini ในปี 1963 สู่ความดุดัน 6.5 ลิตรใน Aventador'
    },
    readTime: '6 min read',
    publishDate: 'October 2026',
    author: 'Ferruccio’s Legacy & Squadra Corse',
    coverImageAlt: 'Lamborghini Aventador V12 Transparent Engine Bay',
    summary: {
      en: 'Ferruccio Lamborghini founded his company with a single directive: build a V12 that produces more refinement, speed, and drama than Ferrari. For 48 years, the original Bizzarrini V12 powered everything from the Miura to the Murciélago, before the ground-up L539 was born for the Aventador.',
      th: 'Ferruccio Lamborghini ก่อตั้งบริษัทด้วยปณิธานเดียว: สร้างเครื่องยนต์ V12 ที่ทรงพลัง เร็ว และมีเสน่ห์ดึงดูดใจยิ่งกว่าเฟอร์รารี่ เครื่องยนต์ดั้งเดิมของ Bizzarrini ถูกใช้นานถึง 48 ปีตั้งแต่ Miura จนถึง Murciélago ก่อนจะถูกสร้างใหม่หมดจดเป็นรหัส L539 ใน Aventador'
    },
    keyTakeaways: [
      {
        en: 'The Aventador’s carbon fiber monocoque weighs just 147.5 kg, delivering 35,000 Nm/degree of torsional stiffness.',
        th: 'โมโนค็อกคาร์บอนไฟเบอร์ของ Aventador หนักเพียง 147.5 กก. แต่ทนแรงบิดตัวได้มหาศาลถึง 35,000 Nm ต่อองศา'
      },
      {
        en: 'Pushrod suspension inspired by Formula 1 cars decouples spring and damping forces.',
        th: 'ระบบกันสะเทือนแบบ Pushrod แนวนอน ได้รับแรงบันดาลใจจากรถแข่ง Formula 1'
      }
    ],
    contentSections: [
      {
        heading: {
          en: '1. Defiance from Sant’Agata Bolognese',
          th: '1. ความท้าทายจาก Sant’Agata Bolognese'
        },
        paragraphs: [
          {
            en: 'When Enzo Ferrari dismissed Ferruccio Lamborghini as a mere tractor maker, he ignited one of the fiercest rivalries in industrial history. Lamborghini answered with mid-engine packaging in the 1966 Miura, inventing the supercar blueprint.',
            th: 'เมื่อ Enzo Ferrari ปฏิเสธคำติชมของ Ferruccio โดยดูถูกว่าเขาเป็นเพียงคนทำรถแทรกเตอร์ นั่นคือจุดประกายความขัดแย้งที่ยิ่งใหญ่ที่สุดในประวัติศาสตร์ยานยนต์ ลัมโบร์กินีตอบโต้ด้วยการวางเครื่องยนต์กลางลำใน Miura ปี 1966 และให้กำเนิดคำว่า "ซูเปอร์คาร์" ขึ้นบนโลก'
          }
        ]
      }
    ]
  }
];
