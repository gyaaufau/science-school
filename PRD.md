# PRD — Science Lab Interactive

## 1. Product Summary

Science Lab Interactive adalah web satu halaman untuk membantu guru SD, SMP, dan SMA mendemonstrasikan konsep Fisika, Biologi, dan Kimia melalui simulasi interaktif di kelas.

Guru memilih mata pelajaran, simulasi, dan jenjang melalui tab. Guru kemudian mengubah variabel, menjalankan simulasi, menyembunyikan hasil untuk meminta prediksi siswa, dan membandingkan dua eksperimen.

Produk ini adalah **alat simulasi murni**. Semua hasil ditentukan oleh rumus atau model edukatif yang sudah didefinisikan.

Tidak ada:

* AI tutor;
* chatbot;
* model bahasa;
* konten generatif;
* respons berbasis AI;
* personalisasi otomatis;
* rekomendasi pembelajaran AI.

---

## 2. Product Goal

Membuat alat demonstrasi sains yang:

* dapat langsung digunakan guru tanpa login;
* mudah ditampilkan melalui proyektor;
* membantu menjelaskan hubungan sebab-akibat;
* memungkinkan perubahan variabel secara langsung;
* konsisten di seluruh simulasi;
* cukup lengkap untuk didemokan ke sekolah sebagai produk nyata.

---

## 3. Target User

### Pengguna utama

Guru sains SD, SMP, dan SMA.

### Konteks penggunaan

* demonstrasi di depan kelas;
* diskusi konsep;
* meminta siswa membuat prediksi;
* membandingkan dua kondisi;
* menjelaskan eksperimen yang sulit dilakukan langsung;
* mengulang eksperimen dengan cepat.

### Perangkat utama

* laptop;
* desktop;
* proyektor;
* smart display;
* tablet.

Mobile harus tetap berfungsi, tetapi bukan prioritas utama.

---

## 4. MVP Scope

MVP berbentuk **single-page application** dengan:

* 3 mata pelajaran;
* 6 simulasi;
* 3 pilihan jenjang;
* tab mata pelajaran;
* tab simulasi;
* mode presentasi;
* Predict Mode;
* Compare Mode;
* preset eksperimen;
* kontrol play, pause, step, reset;
* panel hasil;
* panel konsep dan rumus;
* pertanyaan diskusi statis.

### Mata pelajaran dan simulasi

#### Fisika

1. Gaya dan Gerak
2. Energi Kinetik dan Potensial

#### Biologi

1. Fotosintesis
2. Transport Membran

#### Kimia

1. Asam dan Basa
2. Perubahan Wujud Zat

---

## 5. Non-Goals

Jangan membangun fitur berikut:

* AI tutor;
* chatbot;
* AI assistant;
* autentikasi;
* akun guru atau siswa;
* backend;
* database;
* dashboard sekolah;
* pembuatan kelas;
* tugas dan pengumpulan jawaban;
* penilaian;
* leaderboard;
* multiplayer;
* pembayaran;
* LMS integration;
* analitik pengguna;
* sinkronisasi cloud;
* ekspor PDF;
* CMS;
* editor simulasi;
* animasi 3D;
* fitur sosial;
* landing page marketing terpisah.

Semua simulasi dijalankan secara lokal di browser.

---

## 6. Application Structure

Aplikasi hanya memiliki satu route utama:

```text
/
```

Semua pergantian mata pelajaran dan simulasi terjadi tanpa page reload.

```text
ScienceLabApp
├── Header
│   ├── ProductName
│   ├── GradeSelector
│   └── PresentationToggle
├── SubjectTabs
├── SimulationTabs
├── MainWorkspace
│   ├── SimulationStage
│   └── ControlPanel
│       ├── VariableControls
│       ├── ObservationResults
│       └── DisplayToggles
├── PlaybackBar
└── TeacherTools
    ├── Presets
    ├── Discussion
    ├── Concept
    └── Compare
```

---

## 7. Global Navigation

### Subject Tabs

Tampilkan tiga tab:

```text
Fisika | Biologi | Kimia
```

Saat subject berubah:

* simulation tabs diperbarui;
* simulasi pertama pada subject tersebut dibuka;
* state simulasi sebelumnya tetap disimpan selama sesi;
* halaman tidak reload.

### Simulation Tabs

Setiap subject memiliki dua tab.

```text
Fisika:
Gaya dan Gerak | Energi

Biologi:
Fotosintesis | Transport Membran

Kimia:
Asam dan Basa | Perubahan Wujud
```

Pada layar sempit, simulation tabs berubah menjadi native `<select>`.

### Grade Selector

Pilihan:

```text
SD | SMP | SMA
```

Saat jenjang berubah:

* simulasi aktif tetap sama;
* variabel di-reset ke default jenjang;
* label dan satuan diperbarui;
* jumlah kontrol dapat berubah;
* rumus dan tingkat penjelasan diperbarui;
* preset dan pertanyaan diskusi diperbarui.

---

## 8. Main Layout

### Desktop

Gunakan layout dua kolom:

```text
┌─────────────────────────────────────────────────────────┐
│ Header                                                  │
├─────────────────────────────────────────────────────────┤
│ Subject Tabs                                            │
│ Simulation Tabs                                         │
├─────────────────────────────────┬───────────────────────┤
│                                 │ Variable Controls     │
│                                 │                       │
│        Simulation Stage         │ Observation Results   │
│                                 │                       │
│                                 │ Display Toggles       │
├─────────────────────────────────┴───────────────────────┤
│ Play | Pause | Step | Reset | Speed                    │
├─────────────────────────────────────────────────────────┤
│ Presets | Discussion | Concept | Compare                │
└─────────────────────────────────────────────────────────┘
```

Proporsi:

* stage: 65%;
* control panel: 35%;
* stage menjadi elemen visual paling dominan;
* kontrol inti terlihat tanpa scrolling pada layar laptop 1366 × 768.

### Tablet dan mobile

* stage berada di atas;
* kontrol berada di bawah;
* hasil menggunakan grid dua kolom jika ruang cukup;
* semua elemen berubah menjadi satu kolom pada layar kecil;
* tidak boleh ada horizontal page overflow.

---

## 9. Design Direction

Desain harus terasa seperti **alat laboratorium digital**, bukan game anak-anak dan bukan dashboard SaaS generik.

### Karakter

* tenang;
* presisi;
* modern;
* fungsional;
* mudah dibaca dari jarak jauh;
* ramah guru;
* tidak berisik secara visual.

### Gunakan

* background netral;
* surface dengan perbedaan tonal tipis;
* border tipis;
* satu warna accent utama;
* warna subject hanya sebagai indikator kecil;
* radius 6–10 px;
* shadow minimal;
* ikon outline sederhana;
* whitespace yang cukup;
* typography dengan hierarchy jelas.

### Hindari

* gradient ungu-biru;
* glassmorphism;
* neon dan glow;
* blob abstrak;
* ilustrasi stok 3D;
* emoji sebagai ikon utama;
* card di dalam card;
* shadow besar;
* radius ekstrem;
* hero marketing;
* headline bombastis;
* dekorasi tanpa fungsi;
* animasi ambient;
* puluhan badge;
* warna berbeda untuk setiap widget;
* sidebar enterprise;
* tampilan seperti template AI-generated.

### Typography

Gunakan salah satu:

* Geist;
* Inter;
* IBM Plex Sans;
* Source Sans 3.

Gunakan font mono untuk:

* nilai hasil;
* satuan;
* rumus;
* data observasi.

### Warna subject

Gunakan hanya pada garis aktif, titik indikator, atau label kecil:

* Fisika: biru;
* Biologi: hijau;
* Kimia: amber.

Jangan mengganti seluruh background berdasarkan mata pelajaran.

---

## 10. Global Controls

### Variable Control

Setiap variabel harus memiliki:

* nama;
* nilai aktif;
* satuan;
* slider atau select;
* nilai minimum dan maksimum;
* helper text jika diperlukan.

Contoh:

```text
Gaya
40 N

0 N ─────────●───────── 100 N
```

Perubahan input langsung memperbarui preview dan nilai hasil.

### Playback Controls

Semua simulasi menggunakan posisi kontrol yang konsisten:

* Play;
* Pause;
* Step;
* Reset;
* Speed: 0.5×, 1×, 2×.

`Step` memajukan simulasi satu interval tetap.

### Display Toggles

Sediakan toggle yang relevan:

* sembunyikan hasil;
* tampilkan label;
* tampilkan rumus;
* tampilkan arah atau vektor;
* tampilkan data tambahan.

### Observation Results

Tampilkan maksimal empat hasil utama sekaligus.

Setiap hasil memiliki:

* label;
* nilai;
* satuan;
* interpretasi singkat bila perlu.

### Formula Panel

* default tertutup pada SD;
* default tertutup pada SMP, tetapi tersedia;
* default terbuka pada SMA;
* tampilkan rumus dan substitusi nilai;
* hindari derivasi panjang.

---

## 11. Predict Mode

Predict Mode digunakan guru sebelum memperlihatkan hasil.

Saat aktif:

* nilai hasil diganti `—`;
* interpretasi hasil disembunyikan;
* grafik atau indikator akhir tidak dibuka;
* stage tetap menampilkan kondisi awal;
* tampilkan teks: **“Apa prediksi kalian?”**

Guru dapat membuka hasil tanpa menjalankan ulang simulasi.

Predict Mode tidak memerlukan input atau jawaban siswa.

---

## 12. Presentation Mode

Ketika aktif:

* stage diperbesar;
* teks hasil diperbesar;
* navigasi dipadatkan;
* panel sekunder ditutup;
* kontrol inti tetap terlihat;
* tombol keluar selalu tersedia;
* tidak wajib menggunakan browser fullscreen API.

Mode harus dapat dioperasikan sepenuhnya dengan mouse atau sentuhan.

---

## 13. Presets

Setiap simulasi memiliki tiga preset eksperimen.

Preset:

* mengatur seluruh variabel;
* mereset timeline;
* memperbarui hasil;
* tidak langsung menjalankan simulasi;
* menampilkan nama dan deskripsi satu kalimat.

---

## 14. Compare Mode

Compare Mode membandingkan dua hasil eksperimen secara berurutan.

### Flow

1. Guru mengatur variabel.
2. Guru menjalankan eksperimen.
3. Guru memilih **Simpan sebagai A**.
4. Guru mengubah variabel.
5. Guru menjalankan eksperimen kedua.
6. Guru memilih **Bandingkan dengan A**.

### Output

Tampilkan tabel ringkas:

| Parameter   | Percobaan A | Percobaan B | Perubahan  |
| ----------- | ----------: | ----------: | ---------- |
| Input utama |       nilai |       nilai | naik/turun |
| Hasil utama |       nilai |       nilai | naik/turun |
| Hasil kedua |       nilai |       nilai | naik/turun |

Tidak perlu menampilkan dua animasi secara bersamaan.

Data A hilang ketika:

* simulasi diganti;
* jenjang diganti;
* pengguna menekan reset comparison.

---

# 15. Simulation Specifications

## 15.1 Gaya dan Gerak

### Learning objective

Menunjukkan hubungan antara gaya, massa, gesekan, percepatan, kecepatan, dan jarak.

### Stage

Tampilkan:

* lintasan horizontal;
* kotak;
* garis awal dan akhir;
* panah gaya terapan;
* panah gesekan;
* indikator waktu;
* indikator posisi.

### Inputs

#### SD

* dorongan: kecil, sedang, besar;
* massa: ringan, sedang, berat;
* gesekan: aktif atau nonaktif.

#### SMP

* gaya terapan: 0–100 N;
* massa: 1–20 kg;
* gaya gesek: 0–40 N;
* durasi: 1–10 detik.

#### SMA

* gaya terapan: -100–100 N;
* massa: 1–50 kg;
* koefisien gesek: 0–0.8;
* durasi: 1–15 detik;
* kecepatan awal: -10–10 m/s.

### Model

Untuk SMP:

```text
Fnet = Fapplied - Ffriction
a = Fnet / m
v = a × t
x = ½ × a × t²
```

Untuk SMA:

```text
N = m × g
Ffriction = μ × N
Fnet = Fapplied - Ffriction
a = Fnet / m
v = v₀ + a × t
x = v₀t + ½at²
```

Jika gesekan lebih besar dari gaya terapan dan benda awalnya diam, benda tetap diam.

### Outputs

* gaya bersih;
* percepatan;
* kecepatan akhir;
* jarak tempuh.

### Presets

1. Gaya sama, massa berbeda.
2. Massa sama, gaya berbeda.
3. Tanpa gesekan dan dengan gesekan.

---

## 15.2 Energi Kinetik dan Potensial

### Learning objective

Menunjukkan perubahan energi potensial menjadi energi kinetik serta pengaruh gesekan.

### Stage

Tampilkan:

* lintasan berbentuk U;
* bola pada lintasan;
* garis tinggi;
* arah gerak;
* tiga bar energi;
* indikator kecepatan.

### Inputs

#### SD

* tinggi awal: rendah, sedang, tinggi;
* massa: ringan atau berat;
* gesekan: aktif atau nonaktif.

#### SMP

* massa: 1–10 kg;
* tinggi awal: 1–10 m;
* gesekan: 0–40%.

#### SMA

* massa: 1–20 kg;
* tinggi awal: 1–20 m;
* gravitasi: 1–15 m/s²;
* kehilangan energi: 0–60%;
* kecepatan awal: 0–10 m/s.

### Model

```text
Ep = mgh
Ek = ½mv²
Etotal = Ep + Ek
```

Tanpa gesekan, energi mekanik total tetap.

Dengan gesekan:

```text
Eavailable = Einitial × (1 - lossFactor)
```

Model visual tidak perlu menggunakan solver fisika kompleks. Gerakan harus konsisten dengan distribusi energi yang ditampilkan.

### Outputs

* energi potensial;
* energi kinetik;
* energi mekanik;
* kecepatan.

### Presets

1. Titik awal rendah dan tinggi.
2. Massa berbeda pada tinggi yang sama.
3. Tanpa gesekan dan dengan gesekan.

---

## 15.3 Fotosintesis

### Learning objective

Menunjukkan bahwa laju fotosintesis ditentukan oleh faktor yang paling membatasi.

### Stage

Tampilkan:

* tanaman;
* sumber cahaya;
* tanah dan air;
* partikel karbon dioksida;
* gelembung oksigen;
* meter laju fotosintesis.

### Inputs

#### SD

* cahaya: rendah, sedang, tinggi;
* air: sedikit atau cukup;
* karbon dioksida: sedikit atau cukup.

#### SMP

* cahaya: 0–100%;
* air: 0–100%;
* karbon dioksida: 0–100%.

#### SMA

* cahaya: 0–100%;
* air: 0–100%;
* karbon dioksida: 0–100%;
* suhu: 5–50°C.

### Model

Normalisasi setiap faktor ke rentang 0–1.

```text
lightFactor = light / 100
waterFactor = water / 100
co2Factor = co2 / 100
temperatureFactor = max(0, 1 - abs(temperature - 28) / 23)

rate = min(
  lightFactor,
  waterFactor,
  co2Factor,
  temperatureFactor
)
```

Untuk SD dan SMP, `temperatureFactor = 1`.

### Outputs

* laju fotosintesis: 0–100%;
* produksi oksigen relatif;
* faktor pembatas;
* kondisi tanaman.

### Presets

1. Kekurangan cahaya.
2. Kekurangan air.
3. Karbon dioksida tinggi tetapi cahaya rendah.

---

## 15.4 Transport Membran

### Learning objective

Menjelaskan perpindahan partikel melalui membran dan kebutuhan energi pada transport aktif.

### Modes

* difusi sederhana;
* difusi terfasilitasi;
* osmosis;
* transport aktif.

### Stage

Tampilkan:

* dua kompartemen;
* phospholipid membrane sederhana;
* partikel pada kedua sisi;
* channel protein;
* carrier atau pump;
* arah perpindahan;
* label konsentrasi.

### Inputs

#### SD

* jumlah partikel luar;
* jumlah partikel dalam;
* membran dapat dilewati atau tidak.

#### SMP

* konsentrasi luar: 0–100;
* konsentrasi dalam: 0–100;
* jenis transport.

#### SMA

* konsentrasi luar: 0–100;
* konsentrasi dalam: 0–100;
* permeabilitas: 0–100%;
* jumlah channel: 0–10;
* ATP: tersedia atau tidak;
* jenis transport.

### Model

#### Difusi

Partikel bergerak dari konsentrasi tinggi ke rendah.

```text
rate ∝ concentrationDifference × permeability
```

#### Difusi terfasilitasi

Sama seperti difusi, tetapi rate dipengaruhi jumlah channel.

#### Osmosis

Air bergerak menuju sisi dengan konsentrasi zat terlarut lebih tinggi.

#### Transport aktif

Partikel bergerak melawan gradien hanya jika ATP tersedia.

### Outputs

* arah perpindahan;
* jumlah relatif yang berpindah;
* status setimbang;
* kebutuhan energi.

### Presets

1. Difusi mengikuti gradien.
2. Osmosis menuju larutan pekat.
3. Transport aktif melawan gradien.

---

## 15.5 Asam dan Basa

### Learning objective

Menunjukkan hubungan jenis larutan, konsentrasi, pencampuran, indikator, dan pH.

### Stage

Tampilkan:

* satu gelas kimia utama;
* cairan dengan warna indikator;
* skala pH 0–14;
* dua sumber larutan;
* indikator volume;
* label klasifikasi.

Gunakan nama larutan generik:

* asam kuat;
* asam lemah;
* air;
* basa lemah;
* basa kuat.

Jangan menampilkan prosedur laboratorium nyata atau bahan berbahaya.

### Inputs

#### SD

* jenis cairan;
* jumlah cairan;
* indikator aktif atau nonaktif.

#### SMP

* jenis larutan;
* konsentrasi: rendah, sedang, tinggi;
* volume;
* larutan pencampur.

#### SMA

* jenis larutan A;
* molaritas A: 0.01–1 M;
* volume A: 10–500 mL;
* jenis larutan B;
* molaritas B: 0.01–1 M;
* volume B: 0–500 mL.

### Model

Untuk asam kuat:

```text
pH = -log10([H+])
```

Untuk basa kuat:

```text
pOH = -log10([OH-])
pH = 14 - pOH
```

Untuk campuran asam kuat dan basa kuat:

```text
acidMoles = acidMolarity × acidVolumeLiters
baseMoles = baseMolarity × baseVolumeLiters
remainingMoles = acidMoles - baseMoles
totalVolume = volumeA + volumeB
```

* sisa asam menentukan `[H+]`;
* sisa basa menentukan `[OH-]`;
* jika seimbang, pH = 7.

Asam dan basa lemah menggunakan nilai pendekatan edukatif yang sudah ditentukan. Tidak perlu equilibrium solver.

Clamp hasil ke rentang pH 0–14.

### Outputs

* pH;
* klasifikasi: asam, netral, atau basa;
* warna indikator;
* zat berlebih setelah pencampuran.

### Presets

1. Asam, air, dan basa.
2. Asam kuat dengan basa kuat seimbang.
3. Asam berlebih setelah pencampuran.

---

## 15.6 Perubahan Wujud Zat

### Learning objective

Menunjukkan hubungan suhu, energi termal, gerak partikel, dan wujud zat.

### Stage

Tampilkan:

* wadah transparan;
* kumpulan partikel;
* termometer;
* indikator energi;
* label fase;
* animasi gerak partikel.

### Inputs

#### SD

* dinginkan atau panaskan;
* jenis zat generik;
* energi: rendah, sedang, tinggi.

#### SMP

* suhu: -30 sampai 150°C;
* jumlah panas: -100 sampai 100 unit;
* tekanan: rendah, normal, tinggi.

#### SMA

* suhu awal: -50 sampai 200°C;
* energi ditambahkan;
* massa sampel;
* tekanan relatif;
* laju pemanasan.

### Model

Gunakan zat generik dengan titik fase default:

```text
meltingPoint = 0°C
boilingPoint = 100°C
```

Klasifikasi dasar:

```text
temperature < meltingPoint       → solid
temperature < boilingPoint       → liquid
temperature >= boilingPoint      → gas
```

Untuk SMA, saat berada tepat pada area transisi, energi mengubah proporsi fase sebelum suhu kembali naik.

Tidak perlu menghitung termodinamika material nyata.

### Outputs

* suhu;
* wujud zat;
* energi relatif;
* tingkat gerak partikel.

### Presets

1. Padat menuju cair.
2. Cair menuju gas.
3. Pendinginan gas menuju cair.

---

## 16. Teacher Content

Setiap simulasi dan jenjang memiliki konten statis:

### Discussion

Tiga pertanyaan:

1. Prediksi.
2. Observasi.
3. Kesimpulan.

### Concept

Penjelasan maksimal:

* SD: 60 kata;
* SMP: 90 kata;
* SMA: 120 kata.

Konten tidak dihasilkan secara dinamis. Semua teks ditulis dalam konfigurasi aplikasi.

---

## 17. State Model

Minimal state:

```ts
type SubjectId = "physics" | "biology" | "chemistry";
type GradeId = "sd" | "smp" | "sma";

interface AppState {
  activeSubject: SubjectId;
  activeSimulation: string;
  activeGrade: GradeId;
  isPlaying: boolean;
  elapsedTime: number;
  playbackSpeed: 0.5 | 1 | 2;
  presentationMode: boolean;
  predictMode: boolean;
  showFormula: boolean;
  showLabels: boolean;
  simulationStates: Record<string, SimulationState>;
  comparisonA: ComparisonSnapshot | null;
}
```

State setiap simulasi tetap tersedia ketika pengguna berpindah tab selama sesi.

Tidak ada network request.

---

## 18. Suggested Technical Stack

Gunakan:

* React;
* TypeScript;
* Vite atau Next.js App Router;
* CSS Modules atau Tailwind CSS;
* SVG untuk visual simulasi;
* `requestAnimationFrame` untuk animasi;
* Vitest untuk unit tests;
* Playwright untuk basic interaction tests.

Gunakan SVG sebagai pilihan utama karena:

* responsif;
* mudah dianimasikan;
* tajam pada proyektor;
* mudah diberi label;
* tidak membutuhkan library grafis besar.

Jangan gunakan:

* Three.js;
* WebGL;
* game engine;
* chart library berat;
* physics engine eksternal;
* backend service;
* AI API.

---

## 19. Simulation Architecture

Setiap simulasi mengikuti interface yang sama:

```ts
interface SimulationDefinition {
  id: string;
  subject: SubjectId;
  title: string;
  description: string;
  gradeConfigs: Record<GradeId, GradeConfig>;
  presets: Preset[];
  discussions: Record<GradeId, DiscussionContent>;
  concepts: Record<GradeId, ConceptContent>;
  calculate: (
    inputs: Record<string, number | string | boolean>,
    elapsedTime: number
  ) => SimulationResult;
}
```

Pisahkan:

* calculation logic;
* UI controls;
* visual renderer;
* static educational content.

Jangan memasukkan rumus utama langsung ke komponen visual.

---

## 20. Accessibility

Wajib:

* seluruh kontrol dapat digunakan dengan keyboard;
* native button, range, select, dan checkbox;
* focus state terlihat;
* label terhubung ke input;
* warna bukan satu-satunya indikator;
* teks memiliki kontras minimal WCAG AA;
* stage memiliki deskripsi teks;
* hasil dinamis menggunakan `aria-live="polite"`;
* animasi mengikuti `prefers-reduced-motion`.

Saat reduced motion aktif:

* perpindahan menggunakan transisi minimal;
* hasil tetap dapat dipahami;
* Step Mode tetap bekerja.

---

## 21. Performance Requirements

* initial load cepat pada koneksi sekolah standar;
* tidak ada network call setelah asset dimuat;
* pergantian tab terasa instan;
* animasi menargetkan 60 FPS;
* tidak terjadi layout shift besar;
* bundle produksi dijaga tetap ringan;
* tidak ada asset video;
* tidak ada model 3D;
* tidak ada gambar resolusi besar yang tidak diperlukan.

---

## 22. Error Handling

* nilai input harus selalu berada dalam batas yang ditentukan;
* hasil `NaN`, `Infinity`, atau nilai negatif yang tidak valid tidak boleh tampil;
* pembagian dengan nol harus ditangani;
* reset selalu mengembalikan simulasi ke kondisi stabil;
* perubahan tab saat animasi berjalan otomatis menghentikan animasi;
* formula dan hasil harus berasal dari calculation function yang sama.

---

## 23. Acceptance Criteria

MVP dianggap selesai jika:

1. Aplikasi berjalan dalam satu halaman tanpa reload.
2. Ketiga subject tabs berfungsi.
3. Keenam simulasi dapat dibuka.
4. Setiap simulasi memiliki mode SD, SMP, dan SMA.
5. Semua input mengubah visual dan hasil secara konsisten.
6. Play, Pause, Step, Reset, dan speed control bekerja.
7. Predict Mode dapat menyembunyikan dan membuka hasil.
8. Presentation Mode memperbesar area demonstrasi.
9. Tiga preset tersedia untuk setiap simulasi.
10. Percobaan A dapat disimpan dan dibandingkan dengan percobaan B.
11. Formula mengikuti input aktif.
12. Pertanyaan diskusi dan penjelasan tersedia untuk setiap jenjang.
13. Layout berfungsi pada desktop, tablet, dan mobile.
14. Tidak ada backend atau network API.
15. Tidak ada fitur AI dalam bentuk apa pun.
16. Tidak ada console error pada flow utama.
17. Calculation logic utama memiliki unit test.
18. Aplikasi dapat dibuild sebagai static production bundle.

---

## 24. Build Order

Kerjakan dengan urutan berikut:

### Phase 1 — Foundation

* project setup;
* design tokens;
* single-page shell;
* subject tabs;
* simulation tabs;
* grade selector;
* global state;
* responsive layout.

### Phase 2 — Shared Components

* variable slider;
* select control;
* playback bar;
* result panel;
* formula panel;
* presets;
* teacher tools;
* Predict Mode;
* Presentation Mode;
* Compare Mode.

### Phase 3 — Simulations

Bangun berurutan:

1. Gaya dan Gerak.
2. Perubahan Wujud Zat.
3. Fotosintesis.
4. Energi.
5. Transport Membran.
6. Asam dan Basa.

### Phase 4 — Quality

* responsive pass;
* accessibility pass;
* unit tests;
* interaction tests;
* reduced-motion behavior;
* performance cleanup;
* visual consistency review.

---

## 25. Definition of Done

Produk akhir harus terasa seperti satu alat laboratorium digital yang konsisten, bukan enam demo terpisah.

Guru harus dapat:

1. membuka web;
2. memilih jenjang;
3. memilih simulasi;
4. menerapkan preset atau mengubah variabel;
5. meminta siswa memprediksi;
6. menjalankan eksperimen;
7. membaca hasil;
8. menjelaskan konsep;
9. membandingkan dua kondisi;

tanpa login, tanpa konfigurasi, tanpa bantuan AI, dan tanpa berpindah halaman.
