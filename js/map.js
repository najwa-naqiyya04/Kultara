(() => {
  /* =========================================================
     1. KONFIGURASI
     ========================================================= */
  // Sumber GeoJSON batas provinsi Indonesia (dicoba berurutan).
  // Ganti / tambahkan dengan file GeoJSON milikmu sendiri jika perlu.
  const GEOJSON_URLS = [
    "https://cdn.jsdelivr.net/gh/superpikar/indonesia-geojson@master/indonesia-province-simple.json",
    "https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json",
    "https://raw.githubusercontent.com/ans-4175/peta-indonesia-geojson/master/indonesia-prov.geojson",
  ];

  const W = 1000,
    H = 520;
  const HOVER_DELAY = 140; // ms, mencegah zoom "kedip" saat kursor melintas
  const LEAVE_DELAY = 300; // ms, jeda sebelum reset saat kursor keluar peta

  /* =========================================================
     2. DATA WILAYAH (edit sesuka hati)
     ========================================================= */
  const REGIONS = {
    sumatra: {
      name: "Sumatra",
      icon: "🐅",
      color: "#f7dc8c",
      tag: "Negeri Andalas",
      provinsi: "10 Provinsi Indonesia",
      area: "480.793 km²",
      pop: "59,9 Juta Jiwa",
      desc: "Pulau terbesar keenam di dunia dengan jajaran Bukit Barisan, danau vulkanik raksasa, dan kekayaan budaya dari Aceh, Minangkabau hingga Batak.",
      dest: [
        "Danau Toba",
        "Jam Gadang, Bukittinggi",
        "Masjid Raya Baiturrahman",
      ],
    },
    kalimantan: {
      name: "Kalimantan",
      icon: "🌳",
      color: "#dcf5b0",
      tag: "Paru-Paru Dunia",
      provinsi: "5 Provinsi Indonesia",
      area: "544.150 km² (Bag. ID)",
      pop: "16,6 Juta Jiwa",
      desc: "Kalimantan dikenal secara global sebagai salah satu paru-paru terbesar bumi dengan hutan hujan tropis berusia jutaan tahun dan budaya Dayak yang kaya.",
      dest: [
        "TN Tanjung Puting (Konservasi Orangutan)",
        "Kepulauan Derawan & Maratua",
        "Pasar Terapung Lok Baintan",
      ],
    },
    sulawesi: {
      name: "Sulawesi",
      icon: "🌊",
      color: "#fbcfb0",
      tag: "Surga Wallacea",
      provinsi: "6 Provinsi Indonesia",
      area: "188.522 km²",
      pop: "20,6 Juta Jiwa",
      desc: "Pulau berbentuk huruf K yang unik, rumah bagi budaya Toraja, Bugis-Makassar, serta taman laut kelas dunia di Bunaken dan Wakatobi.",
      dest: ["Tana Toraja", "Taman Laut Bunaken", "Kepulauan Wakatobi"],
    },
    jawa: {
      name: "Pulau Jawa",
      icon: "🏛️",
      color: "#f5a9a9",
      tag: "Jantung Nusantara",
      provinsi: "6 Provinsi Indonesia",
      area: "129.438 km²",
      pop: "156 Juta Jiwa",
      desc: "Pulau terpadat di Indonesia, pusat pemerintahan dan ekonomi, dengan warisan keraton, candi agung, batik, wayang, dan gamelan.",
      dest: ["Candi Borobudur", "Gunung Bromo", "Keraton Yogyakarta"],
    },
    nusatenggara: {
      name: "Nusa Tenggara",
      icon: "🐉",
      color: "#a9dcf5",
      tag: "Gugusan Pulau Eksotis",
      provinsi: "3 Provinsi Indonesia",
      area: "±73.070 km² (incl. Bali)",
      pop: "15 Juta Jiwa",
      desc: "Gugusan pulau dari Bali hingga Timor dengan tradisi Hindu-Bali, tenun ikat, pantai pink, dan habitat asli komodo.",
      dest: ["Pura Besakih & Ubud, Bali", "Pulau Komodo", "Danau Kelimutu"],
    },
    maluku: {
      name: "Maluku",
      icon: "🌶️",
      color: "#cbb8f5",
      tag: "Negeri Rempah",
      provinsi: "2 Provinsi Indonesia",
      area: "±78.900 km²",
      pop: "3,2 Juta Jiwa",
      desc: "Kepulauan rempah yang dulu diperebutkan bangsa-bangsa dunia, kaya akan pala, cengkih, benteng bersejarah, dan laut yang jernih.",
      dest: ["Kepulauan Banda Naira", "Pantai Ora", "Benteng Belgica"],
    },
    papua: {
      name: "Papua",
      icon: "🦜",
      color: "#aef0d8",
      tag: "Surga Timur Indonesia",
      provinsi: "6 Provinsi Indonesia",
      area: "±421.980 km²",
      pop: "5,5 Juta Jiwa",
      desc: "Tanah dengan keragaman suku dan bahasa terbesar di dunia, pegunungan bersalju tropis, serta hutan dan laut dengan biodiversitas luar biasa.",
      dest: ["Raja Ampat", "Lembah Baliem", "Danau Sentani"],
    },
  };

  // Aturan pencocokan nama provinsi -> wilayah (urutan penting)
  const RULES = [
    ["nusatenggara", /NUSA TENGGARA|\bBALI\b|\bNTB\b|\bNTT\b/],
    ["maluku", /MALUKU/],
    ["papua", /PAPUA|IRIAN/],
    ["sulawesi", /SULAWESI|GORONTALO/],
    ["kalimantan", /KALIMANTAN/],
    ["jawa", /JAWA|JAKARTA|BANTEN|YOGYAKARTA/],
    [
      "sumatra",
      /ACEH|SUMATERA|SUMATRA|RIAU|JAMBI|BENGKULU|LAMPUNG|BANGKA|BELITUNG/,
    ],
  ];

  function detectRegion(props) {
    const values = Object.values(props || {})
      .filter((v) => typeof v === "string")
      .map((v) => v.toUpperCase().trim());
    for (const [key, re] of RULES) {
      if (values.some((v) => re.test(v))) return key;
    }
    return null;
  }

  /* =========================================================
     3. ELEMEN
     ========================================================= */
  const $ = (id) => document.getElementById(id);
  const stage = $("stage"),
    viewport = $("viewport"),
    statusEl = $("status");
  const tag = $("tag"),
    panel = $("panel"),
    resetBtn = $("resetBtn");
  const isMobile = () => window.matchMedia("(max-width:860px)").matches;

  let bounds = {}; // bounding box per wilayah
  let current = null; // wilayah aktif
  let pinned = false; // dikunci via klik/tap
  let hoverTimer, leaveTimer;

  /* =========================================================
     4. LOAD DATA & RENDER PETA
     ========================================================= */
  async function loadGeo() {
    for (const url of GEOJSON_URLS) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const json = await res.json();
        if (json && json.features && json.features.length) return json;
      } catch (e) {
        /* coba sumber berikutnya */
      }
    }
    throw new Error("GeoJSON tidak dapat dimuat");
  }

  async function init() {
    let geo;
    try {
      geo = await loadGeo();
    } catch (e) {
      statusEl.textContent =
        "Gagal memuat data peta. Periksa koneksi atau ubah GEOJSON_URLS di script.";
      return;
    }

    const features = geo.features.filter((f) => f.geometry);
    const projection = d3.geoMercator().fitExtent(
      [
        [24, 24],
        [W - 24, H - 24],
      ],
      { type: "FeatureCollection", features },
    );
    const path = d3.geoPath(projection);

    const groups = {};
    features.forEach((f) => {
      const key = detectRegion(f.properties);
      f._region = key;
      if (key) (groups[key] = groups[key] || []).push(f);
    });

    Object.keys(groups).forEach((key) => {
      const [[x0, y0], [x1, y1]] = path.bounds({
        type: "FeatureCollection",
        features: groups[key],
      });
      bounds[key] = { x0, y0, x1, y1 };
    });

    const frag = document.createDocumentFragment();
    features.forEach((f) => {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", path(f));
      p.classList.add("prov");
      if (f._region) {
        p.dataset.region = f._region;
        p.style.setProperty("--region-color", REGIONS[f._region].color);
      } else {
        p.classList.add("other");
      }
      frag.appendChild(p);
    });
    viewport.appendChild(frag);
    statusEl.classList.add("hide");

    bindEvents();
  }

  /* =========================================================
     5. ZOOM + POP-UP
     ========================================================= */
  function zoomTo(key) {
    const b = bounds[key],
      r = REGIONS[key];
    if (!b) return;

    const bw = b.x1 - b.x0,
      bh = b.y1 - b.y0;
    const cx = (b.x0 + b.x1) / 2,
      cy = (b.y0 + b.y1) / 2;

    // sisakan ruang di kanan untuk panel info (desktop)
    const targetX = W * (isMobile() ? 0.5 : 0.37);
    const targetY = H * 0.54;
    const k = Math.max(
      1.3,
      Math.min(7, (W * (isMobile() ? 0.8 : 0.5)) / bw, (H * 0.68) / bh),
    );
    const tx = targetX - k * cx,
      ty = targetY - k * cy;

    viewport.style.transform = `translate(${tx}px, ${ty}px) scale(${k})`;

    // tandai provinsi aktif
    viewport
      .querySelectorAll(".prov")
      .forEach((p) => p.classList.toggle("active", p.dataset.region === key));
    stage.classList.add("is-zoomed");
    resetBtn.disabled = false;
    $("zoomChipText").textContent = "Zoom: " + r.name;

    // label melayang di atas wilayah
    const labelY = ty + k * (b.y0 + (b.y1 - b.y0) * 0.22);
    tag.style.left = (targetX / W) * 100 + "%";
    tag.style.top = (labelY / H) * 100 + "%";
    tag.style.display = isMobile() ? "none" : "";
    $("tagIcon").textContent = r.icon;
    $("tagSmall").textContent = r.tag;
    $("tagName").textContent = r.name;
    tag.classList.add("show");

    // panel info
    panel.style.setProperty("--region-color", r.color);
    $("pTag").textContent = r.tag;
    $("pIcon").textContent = r.icon;
    $("pName").textContent = r.name;
    $("pSub").textContent = r.provinsi;
    $("pArea").textContent = r.area;
    $("pPop").textContent = r.pop;
    $("pDesc").textContent = r.desc;
    $("pDest").innerHTML = r.dest.map((d) => `<span>${d}</span>`).join("");
    panel.classList.add("show");

    current = key;
  }

  function resetZoom() {
    clearTimeout(hoverTimer);
    current = null;
    pinned = false;
    viewport.style.transform = "translate(0px, 0px) scale(1)";
    viewport
      .querySelectorAll(".prov.active")
      .forEach((p) => p.classList.remove("active"));
    stage.classList.remove("is-zoomed");
    tag.classList.remove("show");
    panel.classList.remove("show");
    resetBtn.disabled = true;
  }

  /* =========================================================
     6. EVENT
     ========================================================= */
  function bindEvents() {
    // Hover (mouse): auto-zoom ke wilayah
    viewport.addEventListener("pointerover", (e) => {
      if (e.pointerType === "touch") return;
      const el = e.target.closest(".prov[data-region]");
      if (!el || pinned) return;
      const key = el.dataset.region;
      clearTimeout(leaveTimer);
      clearTimeout(hoverTimer);
      if (key === current) return;
      hoverTimer = setTimeout(() => zoomTo(key), HOVER_DELAY);
    });

    // Klik / tap: kunci wilayah (berguna di layar sentuh)
    viewport.addEventListener("click", (e) => {
      const el = e.target.closest(".prov[data-region]");
      if (!el) return;
      clearTimeout(hoverTimer);
      pinned = true;
      if (el.dataset.region !== current) zoomTo(el.dataset.region);
    });

    // Kursor keluar dari peta -> reset (kecuali dikunci)
    stage.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "touch") return;
      clearTimeout(hoverTimer);
      if (pinned) return;
      leaveTimer = setTimeout(resetZoom, LEAVE_DELAY);
    });

    // Masuk ke panel -> batalkan timer agar tidak pindah wilayah
    panel.addEventListener("pointerenter", () => {
      clearTimeout(hoverTimer);
      clearTimeout(leaveTimer);
    });

    resetBtn.addEventListener("click", resetZoom);
    $("pReset").addEventListener("click", resetZoom);
    $("pClose").addEventListener("click", resetZoom);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") resetZoom();
    });
  }

  init();
})();
