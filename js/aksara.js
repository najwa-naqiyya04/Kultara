/* =========================================
   DATA AKSARA PUSAKA
   ========================================= */

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

/* =========================================
   ELEMENT HTML
   ========================================= */

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

/* =========================================
   KONFIGURASI
   ========================================= */

const scriptTargets = {
  jawa: "Javanese",
  bali: "Balinese",
  sunda: "Sundanese",
  lontara: "Buginese",
};

let selectedScript = "jawa";
let transliteratorPromise = null;
let conversionId = 0;

/* =========================================
   STATUS PESAN
   ========================================= */

function showStatus(message) {
  if (status) {
    status.textContent = message;
  }
}

/* =========================================
   MESIN TRANSLITERASI
   ========================================= */

async function getTransliterator() {
  if (!window.Aksharamukha) {
    throw new Error(
      "Library Aksharamukha belum dimuat. Periksa script di HTML.",
    );
  }

  if (!transliteratorPromise) {
    transliteratorPromise = window.Aksharamukha.new().catch((error) => {
      // Izinkan inisialisasi dicoba kembali jika gagal.
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

/* =========================================
   TAMPILKAN DAFTAR KARAKTER
   ========================================= */

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

/* =========================================
   SALIN TEKS
   ========================================= */

async function copyText(text) {
  if (!text) {
    throw new Error("Tidak ada teks untuk disalin.");
  }

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback untuk browser yang tidak mendukung Clipboard API.
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

/* =========================================
   UPDATE HASIL KONVERSI
   ========================================= */

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

    // Abaikan proses lama jika input atau pilihan aksara berubah.
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

/* =========================================
   PILIH AKSARA
   ========================================= */

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

/* =========================================
   INPUT LATIN
   ========================================= */

if (input) {
  input.addEventListener("input", updateOutput);
}

/* =========================================
   TOMBOL SALIN HASIL
   ========================================= */

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

/* =========================================
   INISIALISASI
   ========================================= */

renderCharacters();
updateOutput();
