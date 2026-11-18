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
  C.about.stats.forEach((s) => {
    statsEl.innerHTML += `<div><div class="stat-val">${s.value}</div><div class="stat-lbl">${s.label}</div></div>`;
  });

  const workEl = document.getElementById("work-cards");
  C.projects.forEach((p, i) => {
    const el = document.createElement(p.link ? "a" : "div");
    el.className = "work-card";
    if (p.link) {
      el.href = p.link;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
    el.style.transitionDelay = `${i * 110}ms`;
    el.innerHTML = `<div class="work-title">${p.title}</div><div class="work-tech">${p.tech}</div><p class="work-desc">${p.description}</p>`;
    workEl.appendChild(el);
  });

  const skillsEl = document.getElementById("skills-list");
  C.skills.forEach((sk, i) => {
    const span = document.createElement("span");
    span.className = "skill-chip";
    span.style.transitionDelay = `${i * 45}ms`;
    span.textContent = sk;
    skillsEl.appendChild(span);
  });

  document.getElementById("resume-eyebrow").textContent = C.resume.eyebrow;
  const expEl = document.getElementById("resume-exp");
  C.resume.experience.forEach((e) => {
    expEl.innerHTML += `<div class="paper-item"><div class="paper-role">${e.role}</div><div class="paper-meta">${e.company} • ${e.period}</div></div>`;
  });
  const eduEl = document.getElementById("resume-edu");
  C.resume.education.forEach((e) => {
    eduEl.innerHTML += `<div class="paper-item"><div class="paper-role">${e.degree}</div><div class="paper-meta">${e.school} • ${e.period}</div></div>`;
  });
  document.getElementById("resume-download").href = C.resume.file;

  document.getElementById("contact-eyebrow").textContent = C.contact.eyebrow;
  document.getElementById("contact-h1").textContent = C.contact.headlineLine1;
  document.getElementById("contact-h2").textContent = C.contact.headlineLine2;
  const emailEl = document.getElementById("contact-email");
  emailEl.textContent = C.contact.email;
  emailEl.href = `mailto:${C.contact.email}`;
  const linksEl = document.getElementById("contact-links");
  C.contact.links.forEach((l) => {
    linksEl.innerHTML += `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label} ↗</a>`;
  });

  // Video & Loader
  const video = document.getElementById("film");
  const videoWrap = document.getElementById("video-wrap");
  const loader = document.getElementById("loader");
  const loaderBar = document.getElementById("loader-bar");
  const loaderPct = document.getElementById("loader-pct");
  const progressBar = document.getElementById("scroll-progress");
  const scrollHint = document.getElementById("scroll-hint");
  const resumeCard = document.getElementById("resume-card");
  const contactSvg = document.getElementById("contact-svg");
  const contactRect = document.getElementById("contact-rect");

  const rectLen = contactRect.getTotalLength ? contactRect.getTotalLength() : 2500;
  contactRect.style.strokeDasharray = rectLen;
  contactRect.style.strokeDashoffset = rectLen;

  const isMobile = () => window.innerWidth <= 760;
  const mediaSrc = isMobile() ? "media/film_mobile.mp4" : "media/film.mp4";

  let loaderDone = false;
  function hideLoader() {
    if (loaderDone) return;
    loaderDone = true;
    loaderBar.style.width = "100%";
    loaderPct.textContent = "100%";
    setTimeout(() => loader.classList.add("hidden"), 250);
  }

  // Fallback timeout so loader never gets stuck
  setTimeout(hideLoader, 15000);

  // Fetch whole film to blob URL for instant scrubbing
  fetch(mediaSrc)
    .then((res) => {
      if (!res.ok) throw new Error("Fetch failed");
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
      video.src = URL.createObjectURL(blob);
      video.addEventListener("loadeddata", hideLoader, { once: true });
      video.addEventListener("error", hideLoader, { once: true });
    })
    .catch(() => {
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

  // Nav smooth scroll to hold centers
  document.querySelectorAll(".nav button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.target;
      const found = segBounds.find((s) => s.id === id);
      if (found) {
        const y = (found.startY + found.endY) * 0.5;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
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
        return kf[i - 1][1] + (kf[i][1] - kf[i - 1][1]) * p;
      }
    }
    return kf[kf.length - 1][1];
  }

  const sections = {
    home: document.getElementById("sec-home"),
    about: document.getElementById("sec-about"),
    work: document.getElementById("sec-work"),
    skills: document.getElementById("sec-skills"),
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

    targetTime = scrollToFilmTime(y);
    smoothTime += (targetTime - smoothTime) * 0.16;

    if (video.readyState >= 2 && !video.seeking) {
      const clamped = Math.min(video.duration || smoothTime, Math.max(0, smoothTime));
      if (Math.abs(video.currentTime - clamped) > 0.02) {
        video.currentTime = clamped;
      }
    }

    // Desktop horizontal video shift
    const shiftVw = interpShift(smoothTime);
    videoWrap.style.transform = `translateX(${shiftVw}vw)`;

    // Toggle section visibility
    Object.entries(C.timeline.windows).forEach(([key, [s, e]]) => {
      const active = smoothTime >= s && smoothTime <= e;
      sections[key].classList.toggle("visible", active);
      const navBtn = document.querySelector(`.nav button[data-target="${key}"]`);
      if (navBtn) navBtn.classList.toggle("active", active);
    });

    // Resume card reveal
    const [rStart, rEnd] = C.timeline.resumeDrop;
    const rProg = Math.min(1, Math.max(0, (smoothTime - rStart) / Math.max(0.01, rEnd - rStart)));
    resumeCard.style.transform = `translateY(${(1 - rProg) * -16}px)`;
    resumeCard.style.opacity = `${Math.min(1, Math.max(0.25, rProg * 1.4))}`;

    // Contact SVG frame draw
    const [cStart, cEnd] = C.timeline.contactFrame;
    const cProg = Math.min(1, Math.max(0, (smoothTime - cStart) / Math.max(0.01, cEnd - cStart)));
    contactSvg.style.opacity = cProg > 0.01 ? "1" : "0";
    contactRect.style.strokeDashoffset = rectLen * (1 - cProg);

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
