(function () {
  const C = window.CONFIG;
  if (!C) return;

  document.documentElement.style.setProperty("--accent", C.accent || "#ff9a4d");

  // Populate DOM from config.js
  document.getElementById("loader-name").textContent = C.name.toUpperCase();
  document.getElementById("nav-brand").textContent = (C.brand || "PORTFOLIO").toUpperCase();
  document.getElementById("intro-first").textContent = C.firstName.toUpperCase();
  document.getElementById("intro-last").textContent = C.lastName.toUpperCase();
  document.getElementById("intro-role").textContent = C.role;
  document.getElementById("intro-status").textContent = C.status;

  document.getElementById("about-eyebrow").textContent = C.about.eyebrow;
  document.getElementById("about-title").textContent = C.about.title;
  document.getElementById("about-bio").textContent = C.about.bio;
  const statsEl = document.getElementById("about-stats");
  statsEl.innerHTML = C.about.stats
    .map((s) => `<div><div class="stat-val">${s.value}</div><div class="stat-lbl">${s.label}</div></div>`)
    .join("");

  if (C.skillsEyebrow) document.getElementById("skills-eyebrow").textContent = C.skillsEyebrow;
  if (C.skillsTitle) document.getElementById("skills-title").textContent = C.skillsTitle;
  const skillsEl = document.getElementById("skills-list");
  C.skills.forEach((sk, i) => {
    const span = document.createElement("span");
    span.className = "skill-chip";
    span.style.transitionDelay = `${i * 22}ms`;
    span.textContent = sk;
    skillsEl.appendChild(span);
  });

  if (C.workEyebrow) document.getElementById("work-eyebrow").textContent = C.workEyebrow;
  const workEl = document.getElementById("work-cards");
  C.projects.forEach((p, i) => {
    const el = document.createElement(p.link ? "a" : "div");
    el.className = "work-card";
    if (p.link) {
      el.href = p.link;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
    el.style.transitionDelay = `${i * 100}ms`;
    const num = String(i + 1).padStart(2, "0");
    el.innerHTML = `
      <div class="work-header">
        <div class="work-title">${p.title}</div>
        <span class="work-index">${num}</span>
      </div>
      <div class="work-tech">${p.tech}</div>
      <p class="work-desc">${p.description}</p>
    `;
    workEl.appendChild(el);
  });

  document.getElementById("resume-eyebrow").textContent = C.resume.eyebrow;
  document.getElementById("resume-exp").innerHTML = C.resume.experience
    .map((e) => `<div class="paper-item"><div class="paper-role">${e.role}</div><div class="paper-meta">${e.company} • ${e.period}</div></div>`)
    .join("");
  document.getElementById("resume-edu").innerHTML = C.resume.education
    .map((e) => `<div class="paper-item"><div class="paper-role">${e.degree}</div><div class="paper-meta">${e.school} • ${e.period}</div></div>`)
    .join("");
  document.getElementById("resume-download").href = C.resume.file;

  document.getElementById("contact-eyebrow").textContent = C.contact.eyebrow;
  document.getElementById("contact-h1").textContent = C.contact.headlineLine1;
  document.getElementById("contact-h2").textContent = C.contact.headlineLine2;
  const emailEl = document.getElementById("contact-email");
  emailEl.textContent = C.contact.email;
  emailEl.href = `mailto:${C.contact.email}`;
  document.getElementById("contact-links").innerHTML = C.contact.links
    .map((l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} ↗</a>`)
    .join("");

  // Copy email helper
  const copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn && navigator.clipboard) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(C.contact.email).then(() => {
        copyBtn.textContent = "Copied ✓";
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = "Copy";
          copyBtn.classList.remove("copied");
        }, 1800);
      }).catch(() => {});
    });
  }

  // Video & Loader
  const video = document.getElementById("film");
  const videoWrap = document.getElementById("video-wrap");
  const stageGlow = document.getElementById("stage-glow");
  const loader = document.getElementById("loader");
  const loaderBar = document.getElementById("loader-bar");
  const loaderPct = document.getElementById("loader-pct");
  const progressBar = document.getElementById("scroll-progress");
  const scrollHint = document.getElementById("scroll-hint");
  const resumeCard = document.getElementById("resume-card");
  const contactSvg = document.getElementById("contact-svg");
  const contactRect = document.getElementById("contact-rect");
  const contactCorners = document.getElementById("contact-corners");

  const rectLen = contactRect.getTotalLength ? contactRect.getTotalLength() : 2200;
  contactRect.style.strokeDasharray = rectLen;
  contactRect.style.strokeDashoffset = rectLen;
  const cornerLen = contactCorners && contactCorners.getTotalLength ? contactCorners.getTotalLength() : 600;
  if (contactCorners) {
    contactCorners.style.strokeDasharray = cornerLen;
    contactCorners.style.strokeDashoffset = cornerLen;
  }

  const isMobile = () => window.innerWidth <= 760;
  const mediaSrc = isMobile() ? "media/film_mobile.mp4?v=6" : "media/film.mp4?v=6";

  let loaderDone = false;
  let fetchActive = false;
  function hideLoader() {
    if (loaderDone) return;
    loaderDone = true;
    loaderBar.style.width = "100%";
    loaderPct.textContent = "100%";
    setTimeout(() => loader.classList.add("hidden"), 250);
  }

  // Fallback timeout only if stream fetch fails to progress
  const fallbackTimer = setTimeout(() => {
    if (!loaderDone && !fetchActive) {
      if (!video.src) video.src = mediaSrc;
      hideLoader();
    }
  }, 8000);

  // Fetch whole film to blob URL for instant forward/reverse scrubbing
  fetch(mediaSrc)
    .then((res) => {
      if (!res.ok) throw new Error("Fetch failed");
      fetchActive = true;
      const total = parseInt(res.headers.get("content-length") || "0", 10);
      const reader = res.body.getReader();
      let received = 0;
      const chunks = [];
      function pump() {
        return reader.read().then(({ done, value }) => {
          if (done) return new Blob(chunks, { type: "video/mp4" });
          chunks.push(value);
          received += value.length;
          if (total > 0) {
            const pct = Math.min(99, Math.round((received / total) * 100));
            loaderBar.style.width = pct + "%";
            loaderPct.textContent = pct + "%";
          }
          return pump();
        });
      }
      return pump();
    })
    .then((blob) => {
      clearTimeout(fallbackTimer);
      const prevTime = video.currentTime || 0;
      video.src = URL.createObjectURL(blob);
      video.addEventListener("loadeddata", () => {
        if (prevTime > 0 && video.duration) {
          video.currentTime = Math.min(video.duration, prevTime);
        }
        hideLoader();
      }, { once: true });
      video.addEventListener("error", hideLoader, { once: true });
    })
    .catch(() => {
      clearTimeout(fallbackTimer);
      video.src = mediaSrc;
      video.addEventListener("loadeddata", hideLoader, { once: true });
      video.addEventListener("error", hideLoader, { once: true });
    });

  // iOS touch unlock
  window.addEventListener("touchstart", () => {
    video.play().then(() => video.pause()).catch(() => {});
  }, { once: true, passive: true });

  // Build scroll spacer height from segments
  const segments = C.timeline.segments;
  const spacer = document.getElementById("scroll-spacer");
  let totalH = 0;
  const segBounds = [];
  function layoutSegments() {
    totalH = 0;
    segBounds.length = 0;
    const vh = window.innerHeight;
    segments.forEach((seg) => {
      const startY = totalH;
      const px = seg.h * vh;
      totalH += px;
      segBounds.push({ ...seg, startY, endY: totalH });
    });
    spacer.style.height = (totalH + vh) + "px";
  }
  layoutSegments();
  window.addEventListener("resize", layoutSegments);

  function jumpToSection(id) {
    const found = segBounds.find((s) => s.id === id);
    if (found) {
      const y = (found.startY + found.endY) * 0.5;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  document.querySelectorAll(".nav button, #chapter-rail button").forEach((btn) => {
    btn.addEventListener("click", () => jumpToSection(btn.dataset.target));
  });

  document.getElementById("nav-brand").addEventListener("click", (e) => {
    e.preventDefault();
    jumpToSection("home");
  });

  function scrollToFilmTime(y) {
    if (y <= 0) return segments[0].t[0];
    for (let i = 0; i < segBounds.length; i++) {
      const s = segBounds[i];
      if (y <= s.endY) {
        const p = (y - s.startY) / Math.max(1, s.endY - s.startY);
        return s.t[0] + (s.t[1] - s.t[0]) * p;
      }
    }
    return segments[segments.length - 1].t[1];
  }

  function interpShift(t) {
    if (isMobile()) return 0;
    const kf = C.timeline.desktopShift;
    if (t <= kf[0][0]) return kf[0][1];
    for (let i = 1; i < kf.length; i++) {
      if (t <= kf[i][0]) {
        const p = (t - kf[i - 1][0]) / (kf[i][0] - kf[i - 1][0]);
        // Ease in-out cubic for smooth stage transitions
        const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        return kf[i - 1][1] + (kf[i][1] - kf[i - 1][1]) * ease;
      }
    }
    return kf[kf.length - 1][1];
  }

  // Subtle pointer parallax for cinematic depth
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener("pointermove", (e) => {
    pointer.tx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
    pointer.ty = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
  });

  const sections = {
    home: document.getElementById("sec-home"),
    about: document.getElementById("sec-about"),
    skills: document.getElementById("sec-skills"),
    work: document.getElementById("sec-work"),
    resume: document.getElementById("sec-resume"),
    contact: document.getElementById("sec-contact")
  };

  let targetTime = 0;
  let smoothTime = 0;

  function tick() {
    const y = window.scrollY;
    const maxScroll = Math.max(1, totalH);
    const pct = Math.min(1, Math.max(0, y / maxScroll));
    progressBar.style.width = (pct * 100) + "%";
    if (y > 40) scrollHint.classList.add("hidden");

    pointer.x += (pointer.tx - pointer.x) * 0.08;
    pointer.y += (pointer.ty - pointer.y) * 0.08;

    targetTime = scrollToFilmTime(y);
    smoothTime += (targetTime - smoothTime) * 0.16;

    if (video.readyState >= 2 && !video.seeking) {
      const dur = video.duration || 22.875;
      const clamped = Math.min(dur, Math.max(0, smoothTime));
      if (Math.abs(video.currentTime - clamped) > 0.015) {
        video.currentTime = clamped;
      }
    }

    // Desktop horizontal video shift + subtle pointer parallax
    const shiftVw = interpShift(smoothTime);
    const px = isMobile() ? 0 : pointer.x * -0.7;
    const py = isMobile() ? 0 : pointer.y * -0.35;
    videoWrap.style.transform = `translate3d(calc(${shiftVw.toFixed(2)}vw + ${px.toFixed(2)}vw), ${py.toFixed(2)}vh, 0)`;
    if (stageGlow) {
      stageGlow.style.transform = `translate3d(${(shiftVw * 0.95).toFixed(2)}vw, 0, 0)`;
    }

    // Toggle section visibility & active chapter markers
    Object.entries(C.timeline.windows).forEach(([key, [s, e]]) => {
      const active = smoothTime >= s && smoothTime <= e;
      if (sections[key]) sections[key].classList.toggle("visible", active);
      document
        .querySelectorAll(`.nav button[data-target="${key}"], #chapter-rail button[data-target="${key}"]`)
        .forEach((btn) => btn.classList.toggle("active", active));
    });

    // Resume warm-amber card deployment synced with card release & ember dissolve
    const [rStart, rEnd] = C.timeline.resumeDrop;
    const rRaw = Math.min(1, Math.max(0, (smoothTime - rStart) / Math.max(0.01, rEnd - rStart)));
    const rEase = 1 - Math.pow(1 - rRaw, 3);
    const scale = 0.78 + 0.22 * rEase;
    const tx = (1 - rEase) * -58;
    const ty = (1 - rEase) * -8;
    const blur = (1 - rEase) * 5;
    const cardGlow = Math.sin(rRaw * Math.PI) * 0.45;
    resumeCard.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
    resumeCard.style.filter = blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : "none";
    resumeCard.style.opacity = `${Math.min(1, Math.max(0.05, rEase * 1.25))}`;
    resumeCard.style.boxShadow = `0 28px 70px rgba(0, 0, 0, 0.85), 0 0 ${(32 + cardGlow * 56).toFixed(0)}px rgba(255, 154, 77, ${(0.12 + cardGlow * 0.34).toFixed(2)}), inset 0 1px 0 rgba(255, 214, 175, 0.14)`;

    // Contact architectural frame draw
    const [cStart, cEnd] = C.timeline.contactFrame;
    const cProg = Math.min(1, Math.max(0, (smoothTime - cStart) / Math.max(0.01, cEnd - cStart)));
    contactSvg.style.opacity = cProg > 0.02 ? "1" : "0";
    contactRect.style.strokeDashoffset = rectLen * (1 - cProg);
    if (contactCorners) {
      contactCorners.style.strokeDashoffset = cornerLen * (1 - Math.min(1, cProg * 1.2));
    }

    requestAnimationFrame(tick);
  }

  // Setup inner scroll containment for scrollable cards (Work cards and Resume)
  function setupInnerScroll(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("wheel", (e) => {
      const isScrollable = el.scrollHeight > el.clientHeight;
      if (!isScrollable) return;
      const atTop = el.scrollTop <= 1;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if ((scrollingDown && !atBottom) || (scrollingUp && !atTop)) {
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop += e.deltaY;
      }
    }, { passive: false });
  }
  setupInnerScroll("work-cards");
  setupInnerScroll("resume-card");

  requestAnimationFrame(tick);
})();
