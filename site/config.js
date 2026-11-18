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

  // Video scroll timeline (in seconds of film.mp4).
  // Complete animated flow:
  // Clip 1: 0.0 - 3.9s (Turn around -> Intro/Home)
  // Clip 2: 3.9 - 7.8s (Steps to close-up -> About)
  // Clip 3: 7.8 - 13.75s (Chair slides in, character sits & crosses leg -> Work)
  // Seated on chair: 13.75s - 24.5s (Held seated on chair while Skills, Resume, and Contact unfold)
  timeline: {
    segments: [
      { t: [0.0, 3.9],     h: 1.3 },                 // Clip 1: Turn around
      { t: [3.9, 3.9],     h: 0.9, id: "home" },     // HOLD: Intro (Home)
      { t: [3.9, 7.8],     h: 1.3 },                 // Clip 2: Steps to close-up
      { t: [7.8, 7.8],     h: 1.0, id: "about" },    // HOLD: About
      { t: [7.8, 13.75],   h: 1.6 },                 // Clip 3: Chair appears, sits & crosses leg
      { t: [13.75, 13.75], h: 1.8, id: "work" },     // HOLD: Work (generous hold for project reading)
      { t: [13.75, 17.5],  h: 1.3 },                 // Move to Skills
      { t: [17.5, 17.5],   h: 1.1, id: "skills" },   // HOLD: Skills & Stack
      { t: [17.5, 21.0],   h: 1.3 },                 // Move to Resume
      { t: [21.0, 21.0],   h: 1.4, id: "resume" },   // HOLD: Resume section
      { t: [21.0, 24.5],   h: 1.2 },                 // Move to Contact
      { t: [24.5, 24.5],   h: 1.2, id: "contact" }   // HOLD: Contact frame & form
    ],
    // Film-time windows [startSec, endSec] when each section is visible
    windows: {
      home:    [1.5, 4.4],
      about:   [5.5, 8.4],
      work:    [11.2, 15.2],
      skills:  [16.0, 18.5],
      resume:  [19.8, 22.4],
      contact: [23.5, 999]
    },
    // Special synced animation windows
    resumeDrop:   [20.0, 21.0],
    contactFrame: [23.5, 24.5],
    // Desktop horizontal video shift (vw) keyframes: [timeSec, shiftVw]
    desktopShift: [
      [0.0,   20],
      [4.4,   20],
      [6.0,   18],
      [8.0,    0],
      [11.0, -11],
      [24.5, -11]
    ]
  }
};
