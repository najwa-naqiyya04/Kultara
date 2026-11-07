/* ==========================================================
   1. CONCAVE INFINITE CAROUSEL (Refactored for Pinterest Style)
   ================================================---------- */
(() => {
  "use strict";

  const CONFIG = Object.freeze({
    speed: 100, // Kecepatan gerak (px/detik). Sesuaikan jika ingin lebih cepat/lambat
    centerScale: 1.1, // Ukuran kartu di tengah (lebih besar & menonjol)
    edgeScale: 0.85, // Ukuran kartu di pinggir (lebih kecil)
    centerZ: 60, // Kedalaman Z kartu tengah (px)
    edgeZ: -100, // Kedalaman Z kartu pinggir (memberi efek cekung ke dalam)
    maxRotateY: 18, // Sudut kemiringan 3D kartu di pinggir (derajat)
    centerY: 0, // Posisi vertikal kartu tengah
    edgeY: 25, // Posisi vertikal kartu pinggir (turun membentuk kurva lengkung)
  });

  const SELECTORS = Object.freeze({
    root: "[data-carousel]",
    track: "[data-carousel-track]",
    item: "[data-carousel-item]",
  });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const lerp = (from, to, t) => from + (to - from) * t;

  class ConcaveCarousel {
    constructor(root) {
      this.root = root;
      this.track = root.querySelector(SELECTORS.track);
      this.originals = [...root.querySelectorAll(SELECTORS.item)];
      this.reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      this.offset = 0;
      this.setWidth = 0;
      this.viewportCenter = 0;
      this.lastTime = null;
      this.frameId = null;
      this.isPaused = false;

      this.tick = this.tick.bind(this);
    }

    init() {
      if (!this.track || this.originals.length === 0) return;
      this.buildLoop();
      this.measure();
      this.offset = this.setWidth; // Mulai dari set tengah agar infinite loop mulus
      this.render();
      this.bindEvents();
      this.play();
    }

    /** Gandakan kartu jadi 3 set untuk seamless infinite loop */
    buildLoop() {
      const createCopies = () =>
        this.originals.map((item) => {
          const copy = item.cloneNode(true);
          copy.setAttribute("aria-hidden", "true");
          const img = copy.querySelector("img");
          if (img) img.alt = "";
          return copy;
        });

      this.track.prepend(...createCopies());
      this.track.append(...createCopies());
      this.items = [...this.track.querySelectorAll(SELECTORS.item)];
    }

    measure() {
      this.setWidth =
        this.items[this.originals.length].offsetLeft - this.items[0].offsetLeft;
      this.viewportCenter = this.root.clientWidth / 2;
    }

    bindEvents() {
      const pause = () => (this.isPaused = true);
      const resume = () => (this.isPaused = false);

      this.root.addEventListener("mouseenter", pause);
      this.root.addEventListener("mouseleave", resume);
      this.root.addEventListener("focusin", pause);
      this.root.addEventListener("focusout", resume);

      let resizeTimeout;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => this.handleResize(), 100);
      });

      // Hemat performa: hentikan animasi saat carousel tidak terlihat di layar
      const observer = new IntersectionObserver(
        ([entry]) => {
          entry.isIntersecting ? this.play() : this.stop();
        },
        { threshold: 0.1 },
      );

      observer.observe(this.root);
    }

    handleResize() {
      const progress = this.setWidth ? this.offset / this.setWidth : 1;
      this.measure();
      this.offset = progress * this.setWidth;
    }

    play() {
      if (this.frameId !== null || this.reducedMotion.matches) return;
      this.lastTime = performance.now();
      this.frameId = requestAnimationFrame(this.tick);
    }

    stop() {
      if (this.frameId !== null) {
        cancelAnimationFrame(this.frameId);
        this.frameId = null;
      }
    }

    tick(currentTime) {
      if (this.lastTime === null) this.lastTime = currentTime;
      const deltaTime = (currentTime - this.lastTime) / 1000;
      this.lastTime = currentTime;

      if (!this.isPaused) {
        this.advance(deltaTime);
      }

      this.render();
      this.frameId = requestAnimationFrame(this.tick);
    }

    advance(deltaSeconds) {
      this.offset += CONFIG.speed * deltaSeconds;
      if (this.offset >= this.setWidth * 2) {
        this.offset -= this.setWidth;
      } else if (this.offset < this.setWidth) {
        this.offset += this.setWidth;
      }
    }

    render() {
      this.track.style.transform = `translate3d(${-this.offset}px, 0, 0)`;
      this.items.forEach((item) => this.applyConcaveTransform(item));
    }

    /** Hitung transformasi 3D cekung berdasarkan jarak kartu ke tengah layar */
    applyConcaveTransform(item) {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2 - this.offset;
      const distance = (itemCenter - this.viewportCenter) / this.viewportCenter;
      const edgeness = clamp(Math.abs(distance), 0, 1); // 0 = di tengah, 1 = di pinggir

      const scale = lerp(CONFIG.centerScale, CONFIG.edgeScale, edgeness);
      const y = lerp(CONFIG.centerY, CONFIG.edgeY, edgeness);
      const z = lerp(CONFIG.centerZ, CONFIG.edgeZ, edgeness);
      const rotateY = Math.sign(distance) * CONFIG.maxRotateY * edgeness;

      item.style.transform = `translate3d(0, ${y}px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`;
    }
  }

  const root = document.querySelector(SELECTORS.root);
  if (root) {
    new ConcaveCarousel(root).init();
  }
})();

/* ==========================================================
   2. STACK CARD ANIMATION
   ================================================---------- */
(() => {
  "use strict";

  const SELECTOR = {
    track: "[data-stack-track]",
    card: "[data-stack-card]",
  };

  const CONFIG = {
    openAngle: 88,
    holdRatio: 0.1,
    liftRatio: 0.35,
    liftDistance: 100,
    exitStart: 0.8,
    exitDistance: 45,
    peekOffset: 14,
    peekScaleStep: 0.05,
    maxVisibleDepth: 2,
    fadeStart: 0.95,
  };

  const clamp = (value, min = 0, max = 1) =>
    Math.min(Math.max(value, min), max);

  const easeOutCubic = (value) => 1 - (1 - value) ** 3;
  const easeInCubic = (value) => value ** 3;

  const easeInOutCubic = (value) =>
    value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;

  function getScrollProgress(track, cardCount) {
    const scrollDistance = track.offsetHeight - window.innerHeight;

    if (scrollDistance <= 0 || cardCount < 2) return 0;

    const distanceScrolled = -track.getBoundingClientRect().top;
    return clamp(distanceScrolled / scrollDistance) * (cardCount - 1);
  }

  function getExitProgress(progress) {
    return clamp((progress - CONFIG.holdRatio) / (1 - CONFIG.holdRatio));
  }

  function getExitTransform(progress) {
    const lift =
      easeOutCubic(clamp(progress / CONFIG.liftRatio)) * CONFIG.liftDistance;

    const exit =
      easeInCubic(
        clamp((progress - CONFIG.exitStart) / (1 - CONFIG.exitStart)),
      ) * CONFIG.exitDistance;

    const angle =
      easeInOutCubic(clamp((progress - 0.05) / 0.8)) * CONFIG.openAngle;

    return `translate3d(0, ${-(lift + exit)}%, 0) rotateX(${angle}deg)`;
  }

  function getQueuedTransform(depth) {
    const visibleDepth = clamp(depth, 0, CONFIG.maxVisibleDepth);
    const offset = visibleDepth * CONFIG.peekOffset;
    const scale = 1 - visibleDepth * CONFIG.peekScaleStep;

    return `translate3d(0, ${offset}px, 0) scale(${scale})`;
  }

  function initializeStackCards() {
    const track = document.querySelector(SELECTOR.track);
    if (!track) return;

    const cards = [...track.querySelectorAll(SELECTOR.card)];
    if (cards.length < 2) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let animationFrame = null;

    function resetCards() {
      cards.forEach((card) => {
        card.style.removeProperty("transform");
        card.style.removeProperty("opacity");
        card.style.removeProperty("z-index");
        card.style.removeProperty("pointer-events");
      });
    }

    function renderCards() {
      animationFrame = null;

      if (motionPreference.matches) {
        resetCards();
        return;
      }

      const progress = getScrollProgress(track, cards.length);
      const activeIndex = Math.min(Math.floor(progress), cards.length - 1);

      const exitProgress = getExitProgress(progress - activeIndex);
      const currentProgress = activeIndex + exitProgress;

      cards.forEach((card, index) => {
        const isGone = index < activeIndex;
        const isExiting =
          index === activeIndex && exitProgress > 0 && index < cards.length - 1;

        card.style.zIndex = String(cards.length - index);
        card.style.pointerEvents = isGone || isExiting ? "none" : "";

        if (isGone) {
          card.style.transform = getExitTransform(1);
          card.style.opacity = "0";
          return;
        }

        if (isExiting) {
          const fadeProgress = clamp(
            (exitProgress - CONFIG.fadeStart) / (1 - CONFIG.fadeStart),
          );

          card.style.transform = getExitTransform(exitProgress);
          card.style.opacity = String(1 - fadeProgress);
          return;
        }

        card.style.transform = getQueuedTransform(index - currentProgress);
        card.style.opacity = "1";
      });
    }

    function requestRender() {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(renderCards);
    }

    window.addEventListener("scroll", requestRender, {
      passive: true,
    });
    window.addEventListener("resize", requestRender);
    motionPreference.addEventListener("change", requestRender);

    renderCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeStackCards, {
      once: true,
    });
  } else {
    initializeStackCards();
  }
})();
//footer
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("site-footer");
  const glowMain = document.getElementById("cursor-glow-main");
  const glowSec = document.getElementById("cursor-glow-sec");

  if (!footer || !glowMain || !glowSec) return;

  // Posisi target kursor & posisi aktual cahaya
  let mouse = { x: footer.offsetWidth / 2, y: footer.offsetHeight / 2 };
  let posMain = { x: mouse.x, y: mouse.y };
  let posSec = { x: mouse.x, y: mouse.y };

  // Kecepatan kehalusan (Lerp factor) - semakin kecil semakin smooth / mengayun
  const speedMain = 0.08;
  const speedSec = 0.05;

  // Update koordinat saat kursor bergerak di dalam area footer
  footer.addEventListener("mousemove", (e) => {
    const rect = footer.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  // Efek kembali ke tengah secara halus saat kursor keluar dari area footer
  footer.addEventListener("mouseleave", () => {
    mouse.x = footer.offsetWidth / 2;
    mouse.y = footer.offsetHeight / 2;
  });

  // Loop Animasi menggunakan RequestAnimationFrame agar 60/120 FPS tanpa patah-patah
  function renderGlow() {
    // Rumus Lerp: posisi sekarang ditambah selisih dikali kecepatan
    posMain.x += (mouse.x - posMain.x) * speedMain;
    posMain.y += (mouse.y - posMain.y) * speedMain;

    posSec.x += (mouse.x - posSec.x) * speedSec;
    posSec.y += (mouse.y - posSec.y) * speedSec;

    // Terapkan posisi ke elemen cahaya menggunakan translate
    glowMain.style.left = `${posMain.x}px`;
    glowMain.style.top = `${posMain.y}px`;

    glowSec.style.left = `${posSec.x}px`;
    glowSec.style.top = `${posSec.y}px`;

    requestAnimationFrame(renderGlow);
  }

  requestAnimationFrame(renderGlow);
});
