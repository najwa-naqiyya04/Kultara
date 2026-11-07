const slides = [
  {
    title: "APUSE",
    subtitle: "PAPUA, INDONESIA",
    desc: "Lagu daerah Papua yang menceritakan perpisahan seorang cucu dengan kakek dan neneknya saat hendak merantau. Lagu ini menggambarkan kasih sayang keluarga dan keberanian untuk memulai perjalanan baru.",
    image:
      "https://images.unsplash.com/photo-1703769605297-cc74106244d9?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    color: "#f59e0b",
  },
  {
    title: "JANGER",
    subtitle: "BALI, INDONESIA",
    desc: "Lagu yang berkaitan dengan kesenian tradisional Janger dari Bali, yang menampilkan nyanyian dan gerakan tari secara berkelompok. Kesenian ini mencerminkan kebersamaan, keceriaan, dan kekayaan budaya Bali.",
    image:
      "https://images.unsplash.com/photo-1711609110590-5ad5c4599e56?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    color: "#06b6d4",
  },
  {
    title: "Manuk Dadali",
    subtitle: "JAWA BARAT, INDONESIA",
    desc: "Lagu berbahasa Sunda yang menggambarkan burung garuda sebagai simbol kegagahan, keberanian, dan persatuan. Lagu ini mengajarkan pentingnya cinta tanah air dan semangat kebangsaan.",
    image:
      "https://plus.unsplash.com/premium_photo-1730035378601-e4b6183f3398?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    color: "#10b981",
  },
  {
    title: "RASA SAYANGE",
    subtitle: "MALUKU, INDONESIA",
    desc: "Lagu daerah yang terkenal dengan irama ceria dan pantun bersahutan. Lagu ini mengungkapkan rasa kasih sayang, kepedulian, serta keakraban dalam kehidupan bermasyarakat.",
    image:
      "https://images.unsplash.com/photo-1703081350237-ef57fafb6f6a?q=80&w=1330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    color: "#8b5cf6",
  },
];

/* =========================================
   2. STATE
========================================= */

let currentIndex = 0;
let rotationTurns = 0;

let isMusicPlaying = false;
let userPausedMusic = false;
let currentSongIndex = -1;
let heroIsVisible = false;

let wheelCooldown = false;
let touchStartX = 0;
let touchStartYPosition = 0;

/* =========================================
   3. MUSIC DATA
========================================= */

const slideSongs = [
  {
    title: "Apuse",
    src: "asset/audio/apuse.mp3",
  },
  {
    title: "Janger",
    src: "asset/audio/janger.mp3",
  },
  {
    title: "Manuk Dadali",
    src: "asset/audio/manukdadali.mp3",
  },
  {
    title: "Rasa Sayange",
    src: "asset/audio/Rasa Sayange.mp3",
  },
];

const slideAudio = new Audio();

slideAudio.loop = true;
slideAudio.volume = 0.5;
slideAudio.preload = "auto";

/* =========================================
   4. DOM ELEMENTS
========================================= */

const bgSlide = document.getElementById("bg-slide");
const slideTitle = document.getElementById("slide-title");
const slideSubtitle = document.getElementById("slide-subtitle");
const slideDesc = document.getElementById("slide-desc");

const slideCurrent = document.getElementById("slide-current");
const slideTotal = document.getElementById("slide-total");

const titleAccentBar = document.getElementById("title-accent-bar");

const ringOuter = document.getElementById("ring-outer");
const ringInner = document.getElementById("ring-inner");

const ringImgOuter = document.getElementById("ring-img-outer");
const ringImgInner = document.getElementById("ring-img-inner");

const progressBar = document.getElementById("progress-bar");

const heroSection = document.getElementById("concentric-hero");

const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const btnMusic = document.getElementById("btn-music");

/* =========================================
   5. VALIDATE HTML ELEMENTS
========================================= */

if (
  bgSlide &&
  slideTitle &&
  slideSubtitle &&
  slideDesc &&
  slideCurrent &&
  slideTotal &&
  titleAccentBar &&
  ringOuter &&
  ringInner &&
  ringImgOuter &&
  ringImgInner &&
  progressBar &&
  heroSection &&
  btnNext &&
  btnPrev &&
  btnMusic
) {
  /* =========================================
       6. INITIALIZE COUNTER
    ========================================= */

  slideTotal.textContent = String(slides.length).padStart(2, "0");

  /* =========================================
       7. RENDER SLIDE
    ========================================= */

  function renderSlide(index, direction = 1) {
    const slide = slides[index];

    if (!slide) return;

    // Update background
    bgSlide.style.backgroundImage = `url("${slide.image}")`;

    // Fade out text
    slideTitle.style.opacity = "0";
    slideTitle.style.filter = "blur(6px)";
    slideTitle.style.transform = "translateY(16px)";

    slideSubtitle.style.opacity = "0";
    slideDesc.style.opacity = "0";

    // Update text after a short delay
    setTimeout(() => {
      slideTitle.textContent = slide.title;
      slideSubtitle.textContent = slide.subtitle;
      slideDesc.textContent = slide.desc;

      slideCurrent.textContent = String(index + 1).padStart(2, "0");

      slideCurrent.style.color = slide.color;

      titleAccentBar.style.backgroundColor = slide.color;

      slideTitle.style.transition = "all 0.55s cubic-bezier(0.22, 1, 0.36, 1)";

      slideSubtitle.style.transition =
        "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)";

      slideDesc.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";

      slideTitle.style.opacity = "1";
      slideTitle.style.filter = "blur(0px)";
      slideTitle.style.transform = "translateY(0)";

      slideSubtitle.style.opacity = "1";
      slideDesc.style.opacity = "1";
    }, 140);

    // Rotate rings in opposite directions
    rotationTurns += direction;

    ringOuter.style.transform = `rotate(${rotationTurns * 360}deg)`;

    ringInner.style.transform = `rotate(${-rotationTurns * 360}deg)`;

    // Update ring images
    ringImgOuter.style.backgroundImage = `url("${slide.image}")`;

    ringImgInner.style.backgroundImage = `url("${slide.image}")`;

    // Update progress bar
    progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;

    // Change song according to slide
    playSlideMusic(index);
  }

  /* =========================================
       8. NEXT & PREVIOUS SLIDES
    ========================================= */

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;

    renderSlide(currentIndex, 1);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;

    renderSlide(currentIndex, -1);
  }

  btnNext.addEventListener("click", nextSlide);
  btnPrev.addEventListener("click", prevSlide);

  /* =========================================
       9. ANIMASI RING SAAT MUSIK AKTIF
    ========================================= */

  function updateRingMusicAnimation(active) {
    ringOuter.classList.toggle("music-rotating", active);
  }

  /* =========================================
       10. MUSIC UI
    ========================================= */

  function updateMusicUI(active) {
    isMusicPlaying = active;

    const musicText = document.getElementById("music-text");

    const musicWave = document.getElementById("music-wave");

    const musicIcon = document.getElementById("music-icon");

    if (musicText) {
      musicText.textContent = active ? "Music Playing" : "Play Music";
    }

    if (musicWave) {
      musicWave.classList.toggle("hidden", !active);
      musicWave.classList.toggle("flex", active);
    }

    if (musicIcon) {
      musicIcon.textContent = active ? "♫" : "♪";
    }

    btnMusic.setAttribute(
      "aria-label",
      active ? "Matikan musik" : "Nyalakan musik",
    );

    btnMusic.setAttribute("aria-pressed", String(active));

    btnMusic.className = active
      ? "px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-400 text-slate-950 flex items-center gap-2 transition cursor-pointer shadow-md"
      : "glass-ui px-3.5 py-2 rounded-xl text-xs font-semibold text-white/90 hover:text-white flex items-center gap-2 transition cursor-pointer shadow-md";

    // TAMBAHAN: animasi ring mengikuti status musik
    updateRingMusicAnimation(active);
  }

  /* =========================================
       11. PLAY SONG FOR CURRENT SLIDE
    ========================================= */

  async function playSlideMusic(index) {
    const song = slideSongs[index];

    if (!song) return;

    currentSongIndex = index;

    // Do not play if user has manually paused music
    if (userPausedMusic) return;

    // Wait until hero section is visible
    if (!heroIsVisible) return;

    // Load the correct song
    slideAudio.src = song.src;
    slideAudio.load();

    try {
      await slideAudio.play();
      updateMusicUI(true);
    } catch (error) {
      // Browser may block autoplay
      updateMusicUI(false);

      console.info(
        `Autoplay belum diizinkan untuk ${song.title}. Klik tombol musik untuk memulai.`,
      );
    }
  }

  /* =========================================
       12. START MUSIC
    ========================================= */

  async function startMusic() {
    userPausedMusic = false;

    const songIndex = currentIndex;
    const song = slideSongs[songIndex];

    if (!song) return;

    // Load current slide's song if needed
    if (currentSongIndex !== songIndex || !slideAudio.src) {
      currentSongIndex = songIndex;
      slideAudio.src = song.src;
      slideAudio.load();
    }

    try {
      await slideAudio.play();
      updateMusicUI(true);
    } catch (error) {
      updateMusicUI(false);

      console.warn("Musik gagal diputar. Periksa file dan path audio.", error);
    }
  }

  /* =========================================
       13. STOP MUSIC
    ========================================= */

  function stopMusic() {
    userPausedMusic = true;

    slideAudio.pause();

    updateMusicUI(false);
  }

  /* =========================================
       14. MUSIC BUTTON
    ========================================= */

  btnMusic.addEventListener("click", () => {
    if (isMusicPlaying && !slideAudio.paused) {
      stopMusic();
    } else {
      startMusic();
    }
  });

  /* =========================================
       15. AUTOPLAY WHEN HERO APPEARS
    ========================================= */

  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        heroIsVisible = entry.isIntersecting;

        if (entry.isIntersecting) {
          // Try to play music when section appears
          if (!userPausedMusic) {
            playSlideMusic(currentIndex);
          }
        } else {
          // Pause music outside hero section
          slideAudio.pause();
          updateMusicUI(false);
        }
      });
    },
    {
      threshold: 0.35,
    },
  );

  heroObserver.observe(heroSection);

  /* =========================================
       16. SCROLL SLIDE CONTROL
       - Scroll down changes slides
       - Slide 4 allows normal page scrolling
    ========================================= */

  heroSection.addEventListener(
    "wheel",
    (event) => {
      // Allow normal upward scrolling
      if (event.deltaY < 0) return;

      // Ignore tiny scroll movements
      if (event.deltaY <= 18) return;

      // Prevent rapid repeated slide changes
      if (wheelCooldown) {
        if (currentIndex < slides.length - 1) {
          event.preventDefault();
        }

        return;
      }

      // While slides remain, scroll changes slide
      if (currentIndex < slides.length - 1) {
        event.preventDefault();

        wheelCooldown = true;
        nextSlide();

        setTimeout(() => {
          wheelCooldown = false;
        }, 1200);

        return;
      }

      // At the final slide, allow normal page scrolling
    },
    { passive: false },
  );

  /* =========================================
       17. MOBILE SWIPE SUPPORT
       Swipe left  = next slide
       Swipe right = previous slide
       Vertical swipe = normal page scroll
    ========================================= */

  heroSection.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.changedTouches[0];

      touchStartX = touch.clientX;
      touchStartYPosition = touch.clientY;
    },
    { passive: true },
  );

  heroSection.addEventListener(
    "touchend",
    (event) => {
      const touch = event.changedTouches[0];

      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartYPosition;

      // Ignore vertical gestures
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }

      // Ignore short swipes
      if (Math.abs(deltaX) < 60) {
        return;
      }

      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    },
    { passive: true },
  );

  /* =========================================
       18. INITIALIZE
    ========================================= */

  renderSlide(0, 1);
  updateMusicUI(false);
} else {
  console.error(
    "Concentric Hero: Ada elemen HTML yang belum ditemukan. Periksa semua ID.",
  );
}
