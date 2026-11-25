window.CONFIG = {
  brand: "PORTFOLIO",
  name: "Pradeep Sakthivel",
  firstName: "Pradeep",
  lastName: "Sakthivel",
  role: "Senior Software Engineer — Mobile (Android & Flutter)",
  status: "Bengaluru / Chennai • Open to Relocation • 60 Days Notice",
  accent: "#ff9a4d",

  about: {
    eyebrow: "01 — ABOUT",
    title: "Architecting mission-critical mobile ecosystems.",
    bio: "Senior Software Engineer with 9+ years of production experience architecting and shipping mission-critical Native Android (Kotlin, Jetpack Compose) and Cross-Platform Flutter (Dart) applications across FinTech, Core Banking, and Digital Payments serving 500K+ MAU. Deep expertise in Clean Architecture, MVI/MVVM, reactive streaming, app startup & render optimization, and mobile security (Android Keystore, Biometrics, E2EE).",
    stats: [
      { value: "9+", label: "Years Experience" },
      { value: "500K+", label: "FinTech MAU" },
      { value: "99.9%", label: "Crash-Free Rate" }
    ]
  },

  skillsEyebrow: "02 — SKILLS & STACK",
  skillsTitle: "Engineered for scale, speed & security.",
  skills: [
    "Kotlin (Expert)",
    "Jetpack Compose",
    "Flutter & Dart",
    "Clean Architecture (MVI/MVVM)",
    "Coroutines & StateFlow",
    "Flutter BLoC & Riverpod",
    "Platform Channels",
    "Dagger-Hilt & Koin",
    "Room DB & Offline Sync",
    "Android Keystore & E2EE",
    "Baseline Profiles & Jank Elimination",
    "CI/CD (GitHub Actions & Fastlane)",
    "BiometricPrompt"
  ],

  workEyebrow: "03 — SELECTED WORK",
  projects: [
    {
      title: "LandbankPay — Digital Financial Wallet",
      tech: "Native Android • Kotlin • Coroutines • Clean Architecture",
      description: "High-concurrency national digital wallet serving 500,000+ Google Play users with custom thread pooling, network-throttling resilience, and secure state management."
    },
    {
      title: "Amret Core Mobile Banking Suite",
      tech: "Kotlin • Jetpack Compose • Room DB • BiometricPrompt",
      description: "Offline-first banking synchronization, biometric payment authorization, dynamic geofencing, and multi-factor transaction signing for 100,000+ retail users."
    },
    {
      title: "LuLu Money PH — Remittance Platform",
      tech: "Flutter • Dart • BLoC • MethodChannels • AES-256/RSA",
      description: "Cross-platform international remittance architecture with native security bridges, automated KYC identity verification, and production-hardened E2EE encryption."
    }
  ],

  resume: {
    eyebrow: "04 — RESUME",
    file: "media/resume.pdf",
    experience: [
      {
        role: "Senior Software Engineer",
        company: "Bank-Genie Pvt Ltd",
        period: "08/2020 – Present"
      },
      {
        role: "Software Development Engineer – Mobile",
        company: "Adhiipa Pvt Ltd",
        period: "10/2019 – 08/2020"
      },
      {
        role: "Associate Android Developer",
        company: "Gold Mine Techno Solutions",
        period: "10/2018 – 09/2019"
      },
      {
        role: "Junior Android Developer",
        company: "Softence Technologies",
        period: "05/2017 – 03/2018"
      }
    ],
    education: [
      {
        degree: "B.E. in Computer Science & Engineering",
        school: "Dhanalakshmi Srinivasan Engineering College",
        period: "Graduated"
      }
    ]
  },

  contact: {
    eyebrow: "05 — CONTACT",
    headlineLine1: "LET'S BUILD SOMETHING",
    headlineLine2: "TOGETHER.",
    email: "pradeep27mobile@gmail.com",
    links: [
      { label: "GitHub", url: "https://github.com/PradeepGIT27" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/pradeep-sakthivel-73a7abb1/" },
      { label: "Phone: +91-8778018930", url: "tel:+918778018930" }
    ]
  },

  // Video scroll timeline (calibrated to 22.875s film.mp4):
  // Clip 1 (0.00 - 3.80s):  Turns around to face camera -> Home
  // Clip 2 (3.80 - 7.36s):  Steps forward closer -> About
  // Dip    (7.36 - 7.71s):  Studio spotlight dip + horizontal stage shift
  // Clip 3 (7.71 - 10.80s): Turns & presents open palm right -> Skills
  // Dip    (10.80 - 11.20s):Studio spotlight dip into seated work scene
  // Clip 4 (11.20 - 16.52s):Chair glides in, sits & crosses leg -> Work
  // Clip 5 (16.52 - 20.08s):Stands from chair, reaches up, pulls down -> Resume
  // Dip    (20.08 - 20.43s):Studio spotlight dip into farewell wave
  // Clip 6 (20.43 - 22.87s):Waves warmly & smiles -> Contact
  timeline: {
    segments: [
      { t: [0.0, 3.75],    h: 1.25 },                 // Turn around
      { t: [3.75, 3.75],   h: 0.90, id: "home" },     // HOLD: Home
      { t: [3.75, 7.05],   h: 1.15 },                 // Step forward
      { t: [7.05, 7.05],   h: 1.05, id: "about" },    // HOLD: About
      { t: [7.05, 9.65],   h: 1.15 },                 // Spotlight dip -> open-palm Skills gesture
      { t: [9.65, 10.60],  h: 1.25, id: "skills" },   // HOLD: Skills & Stack
      { t: [10.60, 16.15], h: 1.65 },                 // Spotlight dip -> chair slides in, sits & crosses leg
      { t: [16.15, 16.15], h: 1.75, id: "work" },     // HOLD: Selected Work
      { t: [16.15, 19.90], h: 1.50 },                 // Stands up -> reaches overhead -> pulls down
      { t: [19.90, 19.90], h: 1.50, id: "resume" },   // HOLD: Resume sheet locked
      { t: [19.90, 20.65], h: 0.90 },                 // Spotlight dip -> raises hand to wave
      { t: [20.65, 22.75], h: 1.55, id: "contact" }   // HOLD: Waves warmly while scrolling Contact, settles smiling
    ],
    // Film-time windows [startSec, endSec] when each section is visible
    windows: {
      home:    [1.40, 4.15],
      about:   [5.10, 7.35],
      skills:  [8.45, 10.80],
      work:    [13.30, 16.65],
      resume:  [18.90, 20.12],
      contact: [20.48, 999]
    },
    // Synced animation windows
    resumeDrop:   [18.75, 19.60],
    contactFrame: [20.45, 21.15],
    // Desktop horizontal video shift (vw) keyframes: [timeSec, shiftVw]
    desktopShift: [
      [0.0,   18],
      [3.8,   18],
      [7.15,  17],
      [7.75, -14],
      [10.8, -14],
      [11.3, -13],
      [22.9, -13]
    ]
  }
};
