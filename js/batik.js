document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const batikSection = document.getElementById("ruang-batik");
  const batikTitle = document.getElementById("batik-title");
  const batikDesc = document.getElementById("batik-desc");
  const accordionWrapper = document.getElementById("batik-accordion-wrapper");
  const batikCards = gsap.utils.toArray("#ruang-batik .batik-g-card");

  if (!batikSection || !accordionWrapper || batikCards.length === 0) return;

  // Dukungan klik/tap untuk layar HP agar kartu membuka ke samping dengan mulus
  batikCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (accordionWrapper.classList.contains("is-entering")) return;
      const isAlreadyOpen = card.classList.contains("is-open");
      batikCards.forEach((c) => c.classList.remove("is-open"));
      if (!isAlreadyOpen) {
        card.classList.add("is-open");
      }
    });
  });

  // 1. Kondisi Awal: Layar Hitam Kosong (#202422)
  accordionWrapper.classList.add("is-entering");

  gsap.set([batikTitle, batikDesc], {
    opacity: 0,
    y: 45,
  });

  gsap.set(batikCards, {
    opacity: 0,
    y: -520,
  });

  // 2. Buat Timeline yang Terkunci (Pinned) Mengikuti Scroll Pengguna
  const batikScrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: batikSection,
      start: "top top",
      end: "+=280%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (self.progress > 0.92) {
          accordionWrapper.classList.remove("is-entering");
        } else {
          accordionWrapper.classList.add("is-entering");
          batikCards.forEach((c) => c.classList.remove("is-open"));
        }
      },
    },
  });

  // Tahap 1: Jeda sejenak saat layar baru ke-lock
  batikScrollTl
    .to({}, { duration: 0.25 })

    // Tahap 2: Muncul Judul & Deskripsi
    .to(batikTitle, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
    })
    .to(
      batikDesc,
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.45",
    )

    .to({}, { duration: 0.2 })

    // Tahap 3: Keenam kartu turun satu per satu dari atas ke bawah dalam keadaan tertutup
    .to(batikCards, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.45,
      ease: "power3.out",
    })

    // Tahap 4: Ruang jeda di akhir
    .to({}, { duration: 0.4 });
});
