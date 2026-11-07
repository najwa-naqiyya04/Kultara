document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const section = document.getElementById("jejak-seni");
  const track = document.getElementById("jejak-carousel-track");
  if (!section || !track) return;

  // Gandakan kartu agar barisannya panjang dan tidak pernah putus saat berputar
  const baseCards = Array.from(track.querySelectorAll(".jejak-card"));
  baseCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  const cards = Array.from(track.querySelectorAll(".jejak-card"));
  const totalCards = cards.length; // 14 kartu

  const state = {
    scrollProgress: 0, // Dikontrol oleh ScrollTrigger (0 -> 1)
    offsetX: 0,
    baseSpeed: 1.45, // Kecepatan carousel berjalan otomatis
    speedMultiplier: 1,
  };

  // Melambat halus saat kursor diarahkan ke kartu
  track.addEventListener("mouseenter", () => {
    gsap.to(state, {
      speedMultiplier: 0.25,
      duration: 0.5,
      ease: "power2.out",
    });
  });
  track.addEventListener("mouseleave", () => {
    gsap.to(state, { speedMultiplier: 1, duration: 0.5, ease: "power2.out" });
  });

  // Pinning Section: User scroll -> kartu meliuk huruf S -> merata jadi Concave Carousel
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "+=160%",
    pin: true,
    scrub: 0.8,
    anticipatePin: 1,
    onUpdate: (self) => {
      state.scrollProgress = self.progress;
    },
  });

  function updateCarouselFrame() {
    const vw = window.innerWidth;
    const isMobile = vw < 640;
    const isTablet = vw >= 640 && vw < 1024;

    // Jarak antar kartu yang rapi (sedikit renggang mengikuti lengkungan)
    const cardSpacing = isMobile ? 205 : isTablet ? 245 : 280;
    const totalWidth = totalCards * cardSpacing;
    const halfWidth = totalWidth / 2;

    const p = state.scrollProgress;

    // Fase 1 (0 -> 0.65): Kartu masuk membentuk huruf S
    // Fase 2 (0.5 -> 1.0): Huruf S melurus menjadi Concave Carousel
    const enterProgress = gsap.utils.clamp(0, 1, p / 0.6);
    const concaveProgress = gsap.utils.clamp(0, 1, (p - 0.45) / 0.55);
    const sWavePeak = Math.sin(p * Math.PI); // Bernilai 0 di awal, 1 di tengah, 0 di akhir

    // Pergerakan jalan otomatis (tetap jalan terus secara smooth)
    state.offsetX -= state.baseSpeed * state.speedMultiplier;

    const filmSprocketOpacity = (1 - concaveProgress) * 0.7;

    cards.forEach((card, index) => {
      // Posisi horizontal бесконечный (infinite modulo loop)
      let loopX =
        ((((index * cardSpacing + state.offsetX) % totalWidth) + totalWidth) %
          totalWidth) -
        halfWidth;

      // Rasio posisi terhadap tengah layar (-1 = pinggir kiri, 0 = tengah, +1 = pinggir kanan)
      const normX = loopX / (vw * 0.5);
      const clampedNorm = gsap.utils.clamp(-1.5, 1.5, normX);
      const absNorm = Math.abs(clampedNorm);

      // =========================================================================
      // 1. TARGET CONCAVE CAROUSEL (Persis Gambar Figma: Tengah Kecil & Cekung)
      // =========================================================================
      // Saat di tengah (absNorm = 0) -> scale 0.82 (mengecil menjorok ke dalam)
      // Saat di pinggir kiri/kanan (absNorm = 1) -> scale 1.08 (membesar melengkung ke luar)
      const targetScale = 0.82 + Math.pow(absNorm, 1.5) * 0.28;

      // Rotasi Y 3D: Kartu kiri menghadap ke kanan (+28deg), kartu kanan menghadap ke kiri (-28deg)
      const targetRotateY = -clampedNorm * (isMobile ? 22 : 30);

      // =========================================================================
      // 2. EFEK S-CURVE FILMSTRIP SAAT SCROLL PERTAMA KALI
      // =========================================================================
      const sPhase = clampedNorm * Math.PI * 1.2 + (1 - enterProgress) * 3.5;
      const sWaveY = Math.sin(sPhase) * (isMobile ? 95 : 155) * sWavePeak;
      const sWaveRotZ = Math.cos(sPhase) * 18 * sWavePeak;
      const sWaveRotY = Math.sin(sPhase) * 35 * (1 - concaveProgress);

      // Kartu meluncur masuk dari kanan saat awal scroll
      const slideInX = (1 - enterProgress) * (vw * 0.65 + index * 35);

      // =========================================================================
      // 3. GABUNGKAN TRANSISI DENGAN AMAN (TANPA Z-CLIPPING)
      // =========================================================================
      const finalX = loopX + slideInX;
      const finalY = sWaveY;
      const finalRotY = gsap.utils.interpolate(
        sWaveRotY,
        targetRotateY,
        concaveProgress,
      );
      const finalRotZ = sWaveRotZ;
      const finalScale = gsap.utils.interpolate(
        0.78,
        targetScale,
        concaveProgress,
      );

      // Sembunyikan kartu yang berada jauh di luar batas layar agar tidak bertumpuk
      const isWithinScreen = Math.abs(finalX) < vw * 0.78;
      const finalOpacity = isWithinScreen
        ? gsap.utils.clamp(0, 1, enterProgress * 3)
        : 0;

      // Urutan tumpukan: kartu tengah paling dalam (z-index kecil), pinggir lebih depan
      card.style.zIndex = String(Math.round(absNorm * 50) + 1);
      card.style.setProperty("--film-opacity", filmSprocketOpacity.toFixed(2));

      gsap.set(card, {
        transformPerspective: 1200,
        x: finalX,
        y: finalY,
        rotationY: finalRotY,
        rotationZ: finalRotZ,
        scale: finalScale,
        opacity: finalOpacity,
      });
    });
  }

  gsap.ticker.add(updateCarouselFrame);
});
