const regionData = {
  sumatra: {
    name: "Sumatra",
    image: "assets/sumatra.jpg",
    alt: "Budaya Sumatra",
    description:
      "Sumatra dikenal dengan kekayaan adat istiadat Melayu, Minangkabau, Batak, hingga Aceh yang menjunjung tinggi nilai kekerabatan dan sastra lisan.",
    cultures: [
      "Rumah Gadang & Rumah Bolon",
      "Tari Saman & Tari Piring",
      "Kain Ulos & Songket Palembang",
      "Alat Musik Saluang & Gordang Sambilan",
      "Tradisi Lompat Batu Nias",
    ],
  },
  jawa: {
    name: "Jawa",
    image: "assets/jawa.jpg",
    alt: "Budaya Jawa",
    description:
      "Pulau Jawa menyimpan perpaduan harmonis antara tradisi keraton, kesenian rakyat, filosofi hidup, serta warisan sastra dan arsitektur klasik.",
    cultures: [
      "Pertunjukan Wayang Kulit & Wayang Golek",
      "Seni Musik Gamelan & Angklung",
      "Warisan Wastra Batik Nusantara",
      "Tari Bedhaya, Reog Ponorogo & Jaipong",
      "Arsitektur Rumah Joglo",
    ],
  },
  kalimantan: {
    name: "Kalimantan",
    image: "assets/kalimantan.jpg",
    alt: "Budaya Kalimantan",
    description:
      "Budaya Kalimantan tumbuh selaras dengan hutan tropis dan sungai-sungai besar, mencerminkan harmoni antara masyarakat Dayak, Banjar, dan Melayu.",
    cultures: [
      "Rumah Panjang (Rumah Betang)",
      "Tari Hudoq & Tari Kancet Papatai",
      "Alat Musik Sape (Sampe)",
      "Tenun Ikat Dayak & Sasirangan",
      "Pasar Terapung Lok Baintan",
    ],
  },
  sulawesi: {
    name: "Sulawesi",
    image: "assets/sulawesi.jpg",
    alt: "Budaya Sulawesi",
    description:
      "Sulawesi memiliki keragaman suku, bahasa, seni, dan tradisi maritim maupun agraris yang diwariskan dari generasi ke generasi.",
    cultures: [
      "Rumah Adat Tongkonan",
      "Tari Kipas Pakarena",
      "Tenun Sutra Bugis-Makassar",
      "Alat Musik Kacapi & Kolintang",
      "Upacara Adat Rambu Solo'",
    ],
  },
  "bali-nusa": {
    name: "Bali dan Nusa Tenggara",
    image: "assets/bali-nusa.jpg",
    alt: "Budaya Bali dan Nusa Tenggara",
    description:
      "Kawasan ini memadukan nilai spiritualitas seni ukir dan tari di Bali dengan kekayaan tradisi tenun ikat serta upacara adat di Nusa Tenggara.",
    cultures: [
      "Tari Kecak, Pendet & Tari Caci",
      "Alat Musik Sasando Rote",
      "Tenun Ikat Sumba & Flores",
      "Sistem Pengairan Subak Bali",
      "Tradisi Pasola & Bau Nyale",
    ],
  },
  maluku: {
    name: "Maluku",
    image: "assets/maluku.jpg",
    alt: "Budaya Maluku",
    description:
      "Kepulauan Rempah memiliki tradisi persaudaraan yang kuat seperti Pela Gandong, berpadu dengan seni musik dan tarian pesisir yang dinamis.",
    cultures: [
      "Rumah Adat Baileo",
      "Tari Cakalele & Tari Lenso",
      "Alat Musik Tifa Totobuang & Tahuri",
      "Tradisi Persaudaraan Pela Gandong",
      "Tenun Tanimbar",
    ],
  },
  papua: {
    name: "Papua",
    image: "assets/papua.jpg",
    alt: "Budaya Papua",
    description:
      "Papua kaya akan ekspresi seni ukir, tarian komunal, dan tradisi lisan dari ratusan suku yang hidup berdampingan dengan alam dari pesisir hingga pegunungan.",
    cultures: [
      "Rumah Adat Honai & Kariwari",
      "Seni Ukir Kayu Suku Asmat",
      "Tari Yospan & Tari Perang",
      "Tas Rajut Tradisional Noken",
      "Tradisi Bakar Batu",
    ],
  },
};

const aksaraData = {
  jawa: {
    title: "Karakter Aksara Jawa",
    note: "Aksara Jawa memiliki pasangan dan sandhangan. Hasil konversi mengikuti kemampuan mesin transliterasi.",
    characters: [
      ["ꦲ", "Ha"],
      ["ꦤ", "Na"],
      ["ꦕ", "Ca"],
      ["ꦫ", "Ra"],
      ["ꦏ", "Ka"],
      ["ꦢ", "Da"],
      ["ꦠ", "Ta"],
      ["ꦱ", "Sa"],
      ["ꦮ", "Wa"],
      ["ꦭ", "La"],
      ["ꦥ", "Pa"],
      ["ꦧ", "Ba"],
      ["ꦩ", "Ma"],
      ["ꦒ", "Ga"],
      ["ꦔ", "Nga"],
      ["ꦚ", "Nya"],
    ],
  },
  bali: {
    title: "Karakter Aksara Bali",
    note: "Aksara Bali menggunakan aksara dasar dan tanda vokal untuk membentuk bunyi.",
    characters: [
      ["ᬳ", "Ha"],
      ["ᬦ", "Na"],
      ["ᬘ", "Ca"],
      ["ᬭ", "Ra"],
      ["ᬓ", "Ka"],
      ["ᬤ", "Da"],
      ["ᬢ", "Ta"],
      ["ᬲ", "Sa"],
      ["ᬯ", "Wa"],
      ["ᬮ", "La"],
      ["ᬧ", "Pa"],
      ["ᬩ", "Ba"],
      ["ᬫ", "Ma"],
      ["ᬕ", "Ga"],
      ["ᬗ", "Nga"],
      ["ᬜ", "Nya"],
    ],
  },
  sunda: {
    title: "Karakter Aksara Sunda",
    note: "Aksara Sunda menggunakan rarangkén untuk mengubah bunyi vokal dan bunyi aksara.",
    characters: [
      ["ᮃ", "A"],
      ["ᮊ", "Ka"],
      ["ᮌ", "Ga"],
      ["ᮍ", "Nga"],
      ["ᮎ", "Ca"],
      ["ᮏ", "Ja"],
      ["ᮑ", "Nya"],
      ["ᮒ", "Ta"],
      ["ᮓ", "Da"],
      ["ᮔ", "Na"],
      ["ᮕ", "Pa"],
      ["ᮘ", "Ba"],
      ["ᮙ", "Ma"],
      ["ᮛ", "Ra"],
      ["ᮜ", "La"],
      ["ᮞ", "Sa"],
    ],
  },
  lontara: {
    title: "Karakter Lontara Bugis",
    note: "Lontara memiliki sistem penulisan sendiri. Penulisan vokal dan konsonan akhir perlu diperhatikan.",
    characters: [
      ["ᨀ", "Ka"],
      ["ᨁ", "Ga"],
      ["ᨂ", "Nga"],
      ["ᨃ", "Ngka"],
      ["ᨄ", "Pa"],
      ["ᨅ", "Ba"],
      ["ᨆ", "Ma"],
      ["ᨇ", "Mpa"],
      ["ᨈ", "Ta"],
      ["ᨉ", "Da"],
      ["ᨊ", "Na"],
      ["ᨋ", "Nra"],
      ["ᨌ", "Ca"],
      ["ᨍ", "Ja"],
      ["ᨎ", "Nya"],
      ["ᨏ", "Nca"],
    ],
  },
};

const mapRegions = document.querySelectorAll("#indonesia-map .map-region");
const regionNameEl = document.getElementById("region-name");
const regionImageEl = document.getElementById("region-image");
const regionDescEl = document.getElementById("region-description");
const cultureListEl = document.getElementById("culture-list");

const tabs = document.querySelectorAll("#studio-aksara .script-tab");
const input = document.getElementById("latin-input");
const output = document.getElementById("script-output");
const title = document.getElementById("character-title");
const description = document.getElementById("character-description");
const note = document.getElementById("script-note");
const grid = document.getElementById("character-grid");
const count = document.getElementById("character-count");
const status = document.getElementById("status-message");
const copyButton = document.getElementById("copy-button");

const scriptTargets = {
  jawa: "Javanese",
  bali: "Balinese",
  sunda: "Sundanese",
  lontara: "Buginese",
};

let selectedRegion = "sulawesi";
let selectedScript = "jawa";
let transliteratorPromise = null;
let conversionId = 0;
let isInitialMapRender = true;

function createFallbackImage(label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
    <rect width="100%" height="100%" fill="#e2efc2" rx="16"/>
    <circle cx="300" cy="145" r="42" fill="#82a829" opacity="0.25"/>
    <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="#2e4212">${label}</text>
    <text x="50%" y="64%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#526e24">Warisan Budaya Nusantara</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function updateRegionPanel(regionKey) {
  const data = regionData[regionKey];
  if (!data) return;

  selectedRegion = regionKey;

  mapRegions.forEach((group) => {
    const isActive = group.dataset.region === regionKey;
    group.classList.toggle("active", isActive);
    group.setAttribute("aria-pressed", String(isActive));
  });

  if (regionNameEl) {
    regionNameEl.textContent = data.name;
  }

  if (regionImageEl) {
    regionImageEl.onerror = () => {
      regionImageEl.onerror = null;
      regionImageEl.src = createFallbackImage(data.alt);
    };
    regionImageEl.src = data.image;
    regionImageEl.alt = data.alt;
  }

  if (regionDescEl) {
    regionDescEl.textContent = data.description;
  }

  if (cultureListEl) {
    cultureListEl.replaceChildren();
    data.cultures.forEach((itemText) => {
      const li = document.createElement("li");
      li.textContent = itemText;
      cultureListEl.appendChild(li);
    });
  }

  // Trigger animasi transisi panel & fokus peta jika bukan render awal halaman
  if (
    !isInitialMapRender &&
    typeof window.animateRegionSelection === "function"
  ) {
    window.animateRegionSelection(regionKey);
  }
}

mapRegions.forEach((regionGroup) => {
  regionGroup.addEventListener("click", () => {
    const regionKey = regionGroup.dataset.region;
    updateRegionPanel(regionKey);
  });

  regionGroup.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const regionKey = regionGroup.dataset.region;
      updateRegionPanel(regionKey);
    }
  });
});

function showStatus(message) {
  if (status) {
    status.textContent = message;
  }
}

async function getTransliterator() {
  if (!window.Aksharamukha) {
    throw new Error(
      "Library Aksharamukha belum dimuat. Periksa script di HTML.",
    );
  }

  if (!transliteratorPromise) {
    transliteratorPromise = window.Aksharamukha.new().catch((error) => {
      transliteratorPromise = null;
      throw error;
    });
  }

  return transliteratorPromise;
}

async function convertToAksara(text, scriptKey) {
  const transliterator = await getTransliterator();
  const targetName = scriptTargets[scriptKey];

  const sourceScript = window.Aksharamukha.Scripts.IAST;
  const targetScript = window.Aksharamukha.Scripts[targetName];

  if (!sourceScript) {
    throw new Error("Skrip sumber IAST tidak ditemukan.");
  }

  if (!targetScript) {
    throw new Error(`Skrip target tidak ditemukan: ${targetName}`);
  }

  return transliterator.process(sourceScript, targetScript, text);
}

function renderCharacters() {
  const data = aksaraData[selectedScript];

  if (!data || !grid) return;

  if (title) {
    title.textContent = data.title;
  }

  if (description) {
    description.textContent = "Klik karakter untuk menyalin simbolnya.";
  }

  if (note) {
    note.textContent = data.note;
  }

  grid.replaceChildren();

  data.characters.forEach(([symbol, name]) => {
    const card = document.createElement("button");

    card.type = "button";
    card.className = "character-card";
    card.setAttribute("aria-label", `Salin karakter ${name}: ${symbol}`);
    card.title = `Salin ${name}`;

    const symbolElement = document.createElement("span");
    symbolElement.className = "character-symbol";
    symbolElement.textContent = symbol;

    const nameElement = document.createElement("span");
    nameElement.className = "character-name";
    nameElement.textContent = name;

    const detailElement = document.createElement("span");
    detailElement.className = "character-description";
    detailElement.textContent = "Karakter dasar";

    card.append(symbolElement, nameElement, detailElement);

    card.addEventListener("click", async () => {
      try {
        await copyText(symbol);
        showStatus(`Karakter ${name} berhasil disalin.`);
      } catch (error) {
        console.error("Gagal menyalin karakter:", error);
        showStatus("Penyalinan otomatis gagal. Coba browser lain.");
      }
    });

    grid.appendChild(card);
  });
}

async function copyText(text) {
  if (!text) {
    throw new Error("Tidak ada teks untuk disalin.");
  }

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const temporaryInput = document.createElement("textarea");

  temporaryInput.value = text;
  temporaryInput.setAttribute("readonly", "");
  temporaryInput.style.position = "fixed";
  temporaryInput.style.left = "-9999px";
  temporaryInput.style.top = "0";

  document.body.appendChild(temporaryInput);
  temporaryInput.select();

  const success = document.execCommand("copy");
  temporaryInput.remove();

  if (!success) {
    throw new Error("Browser menolak operasi salin.");
  }
}

async function updateOutput() {
  if (!input || !output) return;

  const text = input.value;
  const currentScript = selectedScript;
  const currentId = ++conversionId;

  if (count) {
    count.textContent = `${text.length} karakter`;
  }

  if (!text.trim()) {
    output.textContent = "Hasil aksara akan muncul di sini.";
    output.classList.add("empty");
    showStatus("");
    return;
  }

  output.textContent = "Mengonversi aksara...";
  output.classList.add("empty");
  showStatus("Sedang mengonversi teks...");

  try {
    const result = await convertToAksara(text, currentScript);

    if (currentId !== conversionId || currentScript !== selectedScript) {
      return;
    }

    if (typeof result !== "string" || !result.trim()) {
      output.textContent = "Hasil konversi kosong.";
      output.classList.add("empty");
      showStatus("Tidak ada hasil konversi untuk teks ini.");
      return;
    }

    output.textContent = result;
    output.classList.remove("empty");
    showStatus("Konversi selesai.");
  } catch (error) {
    if (currentId !== conversionId) return;

    console.error("Konversi aksara gagal:", error);

    output.textContent =
      "Konversi gagal. Periksa koneksi internet dan library aksara.";
    output.classList.add("empty");
    showStatus("Mesin konversi gagal dijalankan. Periksa Console browser.");
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const script = tab.dataset.script;

    if (!aksaraData[script]) {
      showStatus("Pilihan aksara tidak dikenali.");
      return;
    }

    if (selectedScript === script) return;

    selectedScript = script;

    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    renderCharacters();
    updateOutput();

    showStatus(`${tab.textContent.trim()} dipilih.`);
  });
});

if (input) {
  input.addEventListener("input", updateOutput);
}

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const text = output?.textContent?.trim() ?? "";

    const placeholders = [
      "Hasil aksara akan muncul di sini.",
      "Mengonversi aksara...",
      "Hasil konversi kosong.",
      "Konversi gagal. Periksa koneksi internet dan library aksara.",
    ];

    if (
      !input?.value.trim() ||
      !text ||
      placeholders.includes(text) ||
      output?.classList.contains("empty")
    ) {
      showStatus("Belum ada hasil konversi untuk disalin.");
      return;
    }

    try {
      await copyText(text);
      showStatus("Hasil aksara berhasil disalin.");
    } catch (error) {
      console.error("Gagal menyalin hasil:", error);
      showStatus("Penyalinan otomatis gagal. Coba browser lain.");
    }
  });
}

updateRegionPanel(selectedRegion);
isInitialMapRender = false;
renderCharacters();
updateOutput();

/* =========================================================================
   MODUL ANIMASI GSAP PETA BUDAYA (COMPETITION-GRADE CHOREOGRAPHY)
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") return;
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) return;

  const mapSvg = document.getElementById("indonesia-map");
  const cameraGroup = document.getElementById("map-camera-group");
  const radarBeacon = document.getElementById("map-radar-beacon");
  const tooltip = document.getElementById("map-cursor-tooltip");
  const tooltipText = document.getElementById("tooltip-region-text");
  const mapViewport = document.getElementById("map-viewport");

  // Koordinat titik fokus radar & kamera per wilayah di atas SVG (viewBox 1000x430)
  const regionCoordinates = {
    sumatra: { x: 175, y: 215, panX: 35, panY: 10 },
    jawa: { x: 355, y: 352, panX: 18, panY: -18 },
    kalimantan: { x: 435, y: 218, panX: 8, panY: 10 },
    sulawesi: { x: 590, y: 250, panX: -10, panY: 0 },
    "bali-nusa": { x: 555, y: 382, panX: -8, panY: -22 },
    maluku: { x: 702, y: 235, panX: -24, panY: 5 },
    papua: { x: 855, y: 305, panX: -42, panY: -12 },
  };

  if (mapSvg) {
    mapSvg.classList.add("has-active");
  }

  // 1. Animasi Berdenyut Kontinu untuk Radar Beacon di Pulau Aktif
  gsap.to("#map-radar-beacon .radar-ring-1", {
    attr: { r: 28 },
    opacity: 0,
    duration: 1.8,
    repeat: -1,
    ease: "power2.out",
  });

  gsap.to("#map-radar-beacon .radar-ring-2", {
    attr: { r: 42 },
    opacity: 0,
    duration: 1.8,
    delay: 0.55,
    repeat: -1,
    ease: "power2.out",
  });

  // 2. Scroll-Triggered Entrance: Cloud Curtain, 3D Map Landing & SVG Coastline Draw
  const allMapPaths = gsap.utils.toArray("#indonesia-map .map-region path");
  allMapPaths.forEach((path) => {
    const len = path.getTotalLength ? path.getTotalLength() : 600;
    gsap.set(path, {
      strokeDasharray: len,
      strokeDashoffset: len,
      fillOpacity: 0,
    });
  });

  const entranceTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#peta-budaya",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  });

  entranceTl
    // Tirai awan membelah dari tengah ke sudut masing-masing
    .from(
      "#peta-budaya .cloud-top-left",
      {
        x: 140,
        y: 60,
        scale: 1.25,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      0,
    )
    .from(
      "#peta-budaya .cloud-bottom-left",
      {
        x: 160,
        y: -50,
        scale: 1.25,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      0.1,
    )
    .from(
      "#peta-budaya .cloud-bottom-right",
      {
        x: -160,
        y: -50,
        scale: 1.25,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      0.1,
    )
    // Judul kapsul & aksen lime memanjang keluar
    .from(
      "#peta-budaya .title-pill",
      { x: -50, opacity: 0, duration: 0.8, ease: "power3.out" },
      0.15,
    )
    .from(
      "#peta-budaya .title-accent",
      { scaleX: 0, opacity: 0, duration: 0.7, ease: "expo.out" },
      0.45,
    )
    // Panel Peta mendarat secara 3D
    .from(
      "#map-panel-card",
      {
        rotationX: 26,
        y: 65,
        scale: 0.92,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      0.25,
    )
    // Garis pantai SVG pulau-pulau tergambar dari Barat ke Timur
    .to(
      allMapPaths,
      {
        strokeDashoffset: 0,
        duration: 1.1,
        stagger: 0.03,
        ease: "power2.inOut",
      },
      0.45,
    )
    // Warna hijau pulau menyapu masuk disertai pop-up per pulau
    .to(
      allMapPaths,
      {
        fillOpacity: 1,
        duration: 0.65,
        stagger: 0.025,
        ease: "power2.out",
      },
      0.85,
    )
    .from(
      "#indonesia-map .map-region",
      {
        scale: 0.82,
        y: 18,
        duration: 0.75,
        stagger: 0.07,
        ease: "back.out(1.7)",
      },
      0.75,
    )
    // Panel Informasi di sebelah kanan masuk dengan efek editorial
    .from(
      "#info-panel-card",
      {
        x: 50,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      },
      0.55,
    )
    .from(
      "#region-image",
      {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        scale: 1.18,
        duration: 0.85,
        ease: "expo.out",
      },
      0.75,
    )
    .from(
      "#culture-list li",
      {
        x: 20,
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: "power2.out",
      },
      0.95,
    );

  // 3. Ambient Floating Clouds (Awan mengambang halus tanpa henti)
  gsap.to("#peta-budaya .cloud-top-left", {
    x: 18,
    y: 8,
    duration: 5.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
  gsap.to("#peta-budaya .cloud-bottom-left", {
    x: 22,
    y: -6,
    duration: 6.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
  gsap.to("#peta-budaya .cloud-bottom-right", {
    x: -20,
    y: -8,
    duration: 5.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // 4. Hover Levitation pada Pulau & Magnetic Cursor Tooltip
  const xTo = tooltip
    ? gsap.quickTo(tooltip, "x", { duration: 0.2, ease: "power3" })
    : null;
  const yTo = tooltip
    ? gsap.quickTo(tooltip, "y", { duration: 0.2, ease: "power3" })
    : null;

  if (mapViewport && tooltip && xTo && yTo) {
    mapViewport.addEventListener("mousemove", (e) => {
      const rect = mapViewport.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    });

    mapViewport.addEventListener("mouseleave", () => {
      gsap.to(tooltip, { opacity: 0, scale: 0.85, duration: 0.25 });
    });
  }

  mapRegions.forEach((region) => {
    region.addEventListener("mouseenter", () => {
      const key = region.dataset.region;
      const info = regionData[key];

      gsap.to(region, {
        y: -6,
        scale: 1.035,
        duration: 0.35,
        ease: "back.out(2)",
        overwrite: "auto",
      });

      if (tooltip && tooltipText && info) {
        tooltipText.textContent = `Jelajahi ${info.name} ↗`;
        gsap.to(tooltip, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "back.out(1.7)",
        });
      }
    });

    region.addEventListener("mouseleave", () => {
      const isActive = region.classList.contains("active");
      gsap.to(region, {
        y: isActive ? -4 : 0,
        scale: isActive ? 1.02 : 1,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (tooltip) {
        gsap.to(tooltip, { opacity: 0, scale: 0.85, duration: 0.2 });
      }
    });
  });

  // 5. Fungsi Animasi Saat User Mengklik Pulau (Dipanggil dari updateRegionPanel)
  window.animateRegionSelection = (regionKey) => {
    const coord = regionCoordinates[regionKey] || {
      x: 500,
      y: 250,
      panX: 0,
      panY: 0,
    };
    const activeGroup = document.querySelector(
      `#indonesia-map .map-region[data-region="${regionKey}"]`,
    );

    // a. Reset posisi pulau lain & angkat pulau yang dipilih
    mapRegions.forEach((group) => {
      const isTarget = group === activeGroup;
      gsap.to(group, {
        y: isTarget ? -6 : 0,
        scale: isTarget ? 1.04 : 1,
        duration: 0.5,
        ease: isTarget ? "back.out(2.2)" : "power2.out",
        overwrite: "auto",
      });
    });

    // b. Pindahkan Radar Beacon ke titik tengah pulau yang baru dipilih
    if (radarBeacon) {
      gsap.to(radarBeacon, {
        attr: { transform: `translate(${coord.x}, ${coord.y})` },
        duration: 0.65,
        ease: "expo.out",
      });
    }

    // c. Kamera Peta melakukan Smooth Tactical Pan & Slight Zoom ke arah pulau
    if (cameraGroup) {
      gsap.to(cameraGroup, {
        x: coord.panX,
        y: coord.panY,
        scale: 1.04,
        transformOrigin: "50% 50%",
        duration: 0.85,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    // d. Transisi Editorial pada Info Panel Kanan (Clip-Path Wipe + Staggered List)
    const panelTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    panelTl
      .fromTo(
        "#region-name",
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.45, ease: "expo.out" },
        0,
      )
      .fromTo(
        "#region-image",
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          scale: 1.16,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          scale: 1,
          duration: 0.65,
          ease: "expo.out",
        },
        0.05,
      )
      .fromTo(
        "#region-description",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.12,
      )
      .fromTo(
        ".info-divider",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.45, ease: "expo.out" },
        0.15,
      )
      .fromTo(
        "#culture-list li",
        { x: 18, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.38,
          stagger: 0.055,
          ease: "back.out(1.4)",
        },
        0.18,
      );
  };
});
