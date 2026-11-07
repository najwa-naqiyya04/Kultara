document.addEventListener("DOMContentLoaded", () => {
  const cards = gsap.utils.toArray(".cultural-card");
  const tags = gsap.utils.toArray(".tag");
  const tagWrappers = gsap.utils.toArray(".tag-wrapper");
  const folderBox = document.getElementById("folder-box");
  const folderFlap = document.getElementById("folder-front-flap");
  const folderGlow = document.getElementById("folder-glow");

  // Set rotasi awal aset budaya & badge
  cards.forEach((card) => {
    const rot = parseFloat(card.getAttribute("data-rot")) || 0;
    gsap.set(card, { rotation: rot });
  });

  tags.forEach((tag) => {
    const rot = parseFloat(tag.getAttribute("data-rotation")) || 0;
    gsap.set(tag, { rotation: rot });
  });

  // Garis SVG background
  gsap.utils.toArray(".hero-line").forEach((line) => {
    const length = line.getTotalLength ? line.getTotalLength() : 500;
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
  });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(".hero-line", {
    strokeDashoffset: 0,
    duration: 1.4,
    stagger: 0.1,
    ease: "power2.inOut",
  })
    .from(
      ".hero-title-line",
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
      },
      "-=1.1",
    )
    .from(
      "#folder-wrapper",
      {
        y: 120,
        scale: 0.85,
        opacity: 0,
        duration: 0.75,
        ease: "back.out(1.4)",
      },
      "-=0.7",
    )
    .to(
      folderFlap,
      {
        rotationX: -32,
        scaleY: 0.92,
        duration: 0.45,
        ease: "power2.out",
      },
      "-=0.1",
    )
    .fromTo(
      folderGlow,
      { scale: 0.6, opacity: 0.3 },
      { scale: 1.25, opacity: 1, duration: 0.5, ease: "power2.out" },
      "<",
    )
    // 10 Aset Budaya keluar dari dalam folder
    .from(
      cards,
      {
        y: 210,
        x: (index, target) => {
          if (!folderBox) return 0;
          const rect = target.getBoundingClientRect();
          const parentRect = folderBox.getBoundingClientRect();
          const folderCenterX = parentRect.left + parentRect.width / 2;
          const cardCenterX = rect.left + rect.width / 2;
          const val = folderCenterX - cardCenterX;
          return isNaN(val) ? 0 : val;
        },
        scale: 0.15,
        rotation: 0,
        opacity: 0,
        duration: 1.15,
        stagger: { each: 0.055, from: "center" },
        ease: "back.out(1.65)",
      },
      "-=0.25",
    )
    // 6 Badges melesat keluar dari folder ke posisinya masing-masing
    .from(
      tagWrappers,
      {
        x: (index, target) => {
          if (!folderBox) return 0;
          const rect = target.getBoundingClientRect();
          const folderRect = folderBox.getBoundingClientRect();
          const folderCenterX = folderRect.left + folderRect.width / 2;
          const tagCenterX = rect.left + rect.width / 2;
          const val = folderCenterX - tagCenterX;
          return isNaN(val) ? 0 : val;
        },
        y: (index, target) => {
          if (!folderBox) return 0;
          const rect = target.getBoundingClientRect();
          const folderRect = folderBox.getBoundingClientRect();
          const folderCenterY = folderRect.top + folderRect.height * 0.45;
          const tagCenterY = rect.top + rect.height / 2;
          const val = folderCenterY - tagCenterY;
          return isNaN(val) ? 0 : val;
        },
        scale: 0.1,
        opacity: 0,
        duration: 1.1,
        stagger: { each: 0.07, from: "center" },
        ease: "expo.out",
      },
      "-=0.95",
    )
    .to(
      folderFlap,
      {
        rotationX: 0,
        scaleY: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.6)",
      },
      "-=0.5",
    )
    .to(
      folderGlow,
      {
        scale: 1,
        opacity: 0.95,
        duration: 0.8,
        ease: "sine.inOut",
      },
      "<",
    )
    .add(() => {
      // Efek melayang kontinu (floating) pada 6 badges
      tags.forEach((tag, i) => {
        const baseRot = parseFloat(tag.getAttribute("data-rotation")) || 0;
        gsap.to(tag, {
          y: i % 2 === 0 ? -6 : 6,
          rotation: baseRot + (i % 2 === 0 ? 1.5 : -1.5),
          duration: 2.2 + (i % 3) * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      if (folderGlow) {
        gsap.to(folderGlow, {
          scale: 1.08,
          opacity: 0.8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

  // Interaksi hover pada aset budaya di dalam folder
  cards.forEach((card) => {
    const baseRot = parseFloat(card.getAttribute("data-rot")) || 0;
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -18,
        scale: 1.07,
        rotation: baseRot * 0.8,
        duration: 0.35,
        ease: "back.out(2)",
        overwrite: "auto",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotation: baseRot,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  });
});
