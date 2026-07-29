---
name: "ScienceLab — Locked Visual System"
version: "1.0"
status: "design-locked"
language: "id-ID"
product_type: "single-page teacher simulation workspace"
design_intent: "Clean, minimal, precise, projection-friendly, LMS-like navigation, simulation-first."
theme:
  mode: "light-only-mvp"
  density: "comfortable"
  visual_style: "flat-instrumental"
tokens:
  color:
    canvas: "#F7F8FA"
    sidebar: "#FFFFFF"
    surface: "#FFFFFF"
    surface_subtle: "#F4F6F8"
    stage: "#F2F7FA"
    stage_ground: "#E7EDF1"

    text_primary: "#161B22"
    text_secondary: "#56606B"
    text_muted: "#7B8591"
    text_disabled: "#A8B0B9"
    text_inverse: "#FFFFFF"

    border: "#E1E5E9"
    border_strong: "#C8CFD6"
    divider: "#E8EBEE"

    primary: "#1769E0"
    primary_hover: "#1259C2"
    primary_pressed: "#0F4EA9"
    primary_subtle: "#EAF2FF"
    primary_subtle_hover: "#DFEBFF"
    focus_ring: "#78A9F5"

    success: "#258653"
    success_subtle: "#E9F5EE"
    warning: "#A66A12"
    warning_subtle: "#FFF5E5"
    danger: "#C33D34"
    danger_subtle: "#FCECEA"

    physics: "#1769E0"
    biology: "#26945B"
    chemistry: "#7C4DDA"

    force_applied: "#26945B"
    force_opposing: "#D74C3F"
    energy_kinetic: "#E47718"
    energy_potential: "#7C4DDA"
    water: "#3284B8"
    solute: "#A26035"
    acid: "#D04B45"
    neutral: "#5D8268"
    base: "#3978A8"

  typography:
    family_ui: "Inter, Geist, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    family_numeric: "'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace"

    page_title:
      size: "28px"
      line_height: "36px"
      weight: 650
      letter_spacing: "-0.02em"

    section_title:
      size: "18px"
      line_height: "26px"
      weight: 650

    component_title:
      size: "15px"
      line_height: "22px"
      weight: 600

    body:
      size: "15px"
      line_height: "23px"
      weight: 400

    body_small:
      size: "13px"
      line_height: "20px"
      weight: 400

    label:
      size: "14px"
      line_height: "20px"
      weight: 600

    label_small:
      size: "12px"
      line_height: "17px"
      weight: 600

    metric:
      family: "{tokens.typography.family_numeric}"
      size: "24px"
      line_height: "30px"
      weight: 600
      numeric_style: "tabular-nums"

    formula:
      family: "{tokens.typography.family_numeric}"
      size: "14px"
      line_height: "24px"
      weight: 500
      numeric_style: "tabular-nums"

  spacing:
    0: "0"
    1: "4px"
    2: "8px"
    3: "12px"
    4: "16px"
    5: "20px"
    6: "24px"
    8: "32px"
    10: "40px"
    12: "48px"

  radius:
    xs: "4px"
    sm: "6px"
    md: "8px"
    lg: "10px"
    pill: "999px"

  border:
    default: "1px solid {tokens.color.border}"
    strong: "1px solid {tokens.color.border_strong}"
    active: "1px solid {tokens.color.primary}"

  shadow:
    none: "none"
    floating: "0 8px 24px rgba(22, 27, 34, 0.08)"

  sizing:
    header_height: "72px"
    sidebar_width: "256px"
    inspector_width: "328px"
    control_height: "40px"
    touch_target_min: "40px"
    stage_min_height: "340px"
---

# 1. Design North Star

ScienceLab adalah **alat laboratorium digital untuk guru**, bukan landing page, bukan game, bukan chatbot, dan bukan dashboard admin.

Kesan pertama yang harus muncul:

- bersih;
- tenang;
- profesional;
- mudah dipelajari;
- siap diproyeksikan;
- simulasi menjadi pusat perhatian.

Antarmuka harus terasa seperti gabungan:

- LMS yang sederhana untuk memilih materi;
- alat ukur laboratorium untuk mengatur variabel;
- kanvas demonstrasi untuk menjelaskan konsep di kelas.

Gunakan screenshot preview dengan sidebar kiri sebagai referensi komposisi utama.

# 2. Non-Negotiable Product Structure

## 2.1 Tidak ada grade toggle global

Jangan pernah menampilkan kontrol:

`SD | SMP | SMA`

sebagai segmented toggle di header atau workspace.

Alasannya:

- jenjang bukan mode visual;
- materi bersifat progresif;
- guru tidak sedang mengubah satu materi menjadi tiga versi;
- jenjang melekat pada simulasi atau materi yang dipilih.

Aturan:

- setiap simulasi memiliki satu `targetGrade`;
- jenjang ditampilkan sebagai badge informasi, contoh: `Jenjang: SMP`;
- badge tidak interaktif;
- memilih simulasi lain dapat mengubah badge jenjang;
- konsep tingkat lebih tinggi boleh mengasumsikan konsep sebelumnya sudah dipelajari.

Jika kelak diperlukan filter jenjang, letakkan sebagai filter katalog/sidebar, bukan sebagai mode simulasi.

## 2.2 Tidak ada subject tabs horizontal

Jangan letakkan:

`Fisika | Biologi | Kimia`

sebagai tab bar horizontal di atas konten.

Seluruh pilihan mata pelajaran dan simulasi berada di sidebar kiri seperti LMS.

## 2.3 Satu halaman, satu workspace

Tidak ada perpindahan route untuk simulasi pada MVP.

Ketika item sidebar dipilih:

- judul berubah;
- stage berubah;
- controls berubah;
- results berubah;
- rumus berubah;
- presets berubah;
- URL dan shell boleh tetap sama;
- tidak ada full page reload.

# 3. Locked Desktop Layout

Target utama: laptop 1366 × 768 dan proyektor kelas.

```text
┌────────────────────────────────────────────────────────────────────┐
│ Header: brand                                      Presentation    │
├───────────────┬────────────────────────────────────────────────────┤
│               │ Title + description                  Grade badge   │
│ Sidebar LMS   ├─────────────────────────────┬──────────────────────┤
│               │                             │                      │
│ Fisika        │      Simulation Stage       │   Inspector Panel    │
│  • Gaya       │                             │   Controls            │
│  • Energi     │                             │   Formula             │
│               ├─────────────────────────────┤                      │
│ Biologi       │ Result Readouts             │                      │
│  • Foto...    ├─────────────────────────────┤                      │
│  • Membran    │ Playback Controls           │                      │
│               ├─────────────────────────────┴──────────────────────┤
│ Kimia         │ Presets / Concept / Compare                        │
│  • Asam       │                                                    │
│  • Wujud      │                                                    │
└───────────────┴────────────────────────────────────────────────────┘
```

## 3.1 Grid

Desktop application grid:

- header: full width, `72px`;
- sidebar: fixed `256px`;
- content canvas: remaining width;
- content padding: `28px 32px`;
- main workspace:
  - flexible simulation column;
  - fixed inspector `328px`;
  - gap `20px`.

The simulation column must always be wider than the inspector.

## 3.2 Visual hierarchy

Urutan dominasi visual:

1. simulation stage;
2. active simulation title;
3. controls and results;
4. playback;
5. presets and teaching tools;
6. sidebar;
7. metadata.

Sidebar harus mudah dipindai tetapi tidak boleh mengalahkan stage.

# 4. Header

Header hanya berisi:

- compact ScienceLab wordmark;
- optional subtitle `Interactive`;
- tombol `Presentasi`;
- optional fullscreen icon.

Jangan tambahkan:

- search;
- profile avatar;
- login;
- notification;
- breadcrumb panjang;
- subject tabs;
- grade selector;
- marketing CTA.

## Header styling

- background: `surface`;
- bottom border: `border`;
- no shadow;
- logo height: 32–36 px;
- horizontal padding: 28 px;
- Presentasi menggunakan secondary button, bukan primary;
- fullscreen memakai icon button.

# 5. Sidebar LMS

Sidebar adalah navigasi utama produk.

## 5.1 Structure

```text
SIMULASI

Fisika
  Gaya dan Gerak
  Energi Kinetik & Potensial

Biologi
  Fotosintesis
  Transport Membran

Kimia
  Asam dan Basa
  Perubahan Wujud
```

Setiap subject group terdiri dari:

- icon outline kecil;
- nama subject;
- expand/collapse chevron;
- list simulasi.

Untuk enam simulasi MVP, semua group boleh terbuka secara default.

## 5.2 Sidebar item

Default item:

- height: 44 px;
- padding-left: 20 px;
- text: `text_secondary`;
- transparent background;
- dot kecil berwarna muted.

Hover:

- background: `surface_subtle`;
- text: `text_primary`.

Active:

- background: `primary_subtle`;
- text: `primary`;
- font weight: 600;
- dot: `primary`;
- radius: `8px`;
- tidak memakai border tebal;
- tidak memakai glow.

## 5.3 Subject color usage

Subject color hanya digunakan untuk icon subject:

- Fisika: `physics`;
- Biologi: `biology`;
- Kimia: `chemistry`.

Simulation list tetap memakai primary blue saat aktif agar pola interaksi konsisten.

Jangan mewarnai seluruh section berdasarkan subject.

## 5.4 Optional grade metadata

Jika dibutuhkan, tampilkan badge kecil di ujung item:

- `SD`, `SMP`, atau `SMA`;
- ukuran 11–12 px;
- neutral background;
- tidak clickable.

Jangan tampilkan badge pada semua item jika membuat sidebar ramai. Gunakan hanya saat daftar materi lintas jenjang sudah banyak.

# 6. Page Heading

Di atas workspace tampilkan:

- judul simulasi;
- deskripsi satu kalimat;
- badge jenjang non-interaktif di kanan.

Contoh:

```text
Gaya dan Gerak                            [Jenjang: SMP]
Simulasi hubungan gaya, massa, gesekan, percepatan, dan gerak benda.
```

Aturan:

- judul menggunakan `page_title`;
- deskripsi menggunakan `body`;
- badge memakai neutral surface;
- badge jenjang bukan primary action;
- tidak ada hero copy;
- tidak ada illustration header;
- tidak ada CTA marketing.

# 7. Simulation Stage

Simulation stage adalah area terbesar dan paling tenang.

## 7.1 Surface

- background: `stage`;
- border: `default`;
- radius: `10px`;
- no shadow;
- minimum height: `340px`;
- padding internal: 20–24 px;
- overflow hidden hanya untuk animasi, bukan untuk kontrol.

## 7.2 Visual language

Gunakan flat SVG instructional graphics:

- geometri sederhana;
- garis 1.5–2 px;
- label dekat objek;
- panah dengan ujung jelas;
- objek tanpa tekstur berlebihan;
- background sangat ringan;
- tidak photorealistic;
- tidak cartoon;
- tidak 3D.

Untuk Gaya dan Gerak:

- lintasan horizontal;
- satu benda berbentuk balok sederhana;
- panah gaya terapan;
- panah gesek;
- garis ukur jarak;
- finish marker;
- timer kecil.

Crate kayu realistis boleh diganti menjadi balok solid netral agar lebih minimal.

## 7.3 Stage color rules

- maksimum satu area background tint;
- scientific semantic colors boleh muncul di dalam visual;
- jangan memakai primary blue untuk semua variabel;
- setiap warna harus punya arti tetap;
- gunakan label dan arah selain warna.

## 7.4 No controls inside stage

Stage tidak boleh diisi slider, dropdown, preset, atau panel instruksi.

Kontrol visual seperti show label/vector ditempatkan di inspector, bukan melayang di atas stage.

# 8. Inspector Panel

Inspector berada di kanan dan bersifat sticky pada desktop jika halaman sedikit scroll.

Urutan:

1. `Kontrol`
2. `Rumus Utama`
3. optional `Tampilan`

## 8.1 Inspector surface

Setiap section boleh menjadi bordered group, tetapi jangan membuat card untuk setiap slider.

- background: `surface`;
- border: `default`;
- radius: `10px`;
- section padding: 20 px;
- vertical gap between sections: 16 px;
- no shadow.

## 8.2 Variable row

Setiap variable row:

```text
Gaya Terapan (F)                  [60] N
0  ─────────────●─────────────  100
```

Rules:

- label and current value share top row;
- numeric box width 64–72 px;
- unit is outside numeric box;
- slider below;
- min and max aligned with track;
- vertical gap between controls: 22–24 px;
- avoid helper text unless concept is ambiguous.

## 8.3 Slider

- track neutral;
- fill primary;
- thumb white with primary border;
- thumb size 18–20 px;
- visible focus ring;
- no gradient;
- no oversized thumb;
- slider only updates the relevant model.

## 8.4 Formula

Formula panel is collapsed by default for SD and SMP-level simulations unless the formula is the learning objective.

When open, show:

- canonical formula;
- current substitution;
- final result.

Example:

```text
Fnet = Fapplied − Ffriction
a = Fnet / m

a = (60 − 20) / 20
a = 2.00 m/s²
```

Do not show a long derivation or textbook paragraph.

# 9. Results

Results appear directly below the stage, not in the right inspector.

Use a horizontal grid of 3–4 readouts.

Each readout:

- surface background;
- border;
- radius 8 px;
- padding 14–16 px;
- label centered or left aligned consistently;
- value uses monospaced metric;
- optional unit inline;
- optional direction/helper line.

Example:

```text
Gaya Bersih
40 N
ke kanan
```

## Color usage in results

Default:

- values use `text_primary`.

Semantic accent is allowed only when meaningful:

- force: physics blue;
- acceleration: warning orange;
- velocity: success green;
- distance: chemistry violet.

However, never rely on those colors alone. Labels and units remain mandatory.

If four colors make the screen feel noisy, use only primary blue for the main result and neutral text for the others.

# 10. Playback Bar

Playback bar sits directly below results.

Left group:

- `Mulai` primary;
- `Jeda` secondary;
- `Langkah` optional;
- `Reset` secondary.

Right group:

- label `Kecepatan Simulasi`;
- segmented values `0.5×`, `1×`, `2×`.

Rules:

- only `Mulai` is primary;
- active speed may use primary background;
- inactive speed uses neutral surface;
- no pill buttons except the speed group container;
- minimum height 48 px;
- keep controls visible at laptop height.

# 11. Bottom Teaching Tools

Bottom area is one bordered panel with internal tabs:

- `Preset & Panduan`;
- `Konsep`;
- `Bandingkan`.

This is the only horizontal tab pattern in the product besides optional local inspector sections.

Do not use horizontal tabs for subjects or simulations.

## 11.1 Preset & Panduan

Show 3 preset options in one row.

Each preset:

- concise name;
- one-sentence teaching purpose;
- small outline icon;
- no large illustration;
- click loads variables but does not autoplay.

Selected preset:

- primary border;
- primary-subtle background;
- not a permanent state after manual control changes.

## 11.2 Konsep

Show:

- one short explanation;
- one cause-and-effect highlight;
- optional static discussion prompts.

No chat UI. No assistant avatar. No generated response.

## 11.3 Bandingkan

Flow:

- `Simpan sebagai A`;
- run second experiment;
- `Bandingkan dengan A`.

Result:

- simple comparison table;
- no dual full-stage view;
- no competitive styling;
- labels `naik`, `turun`, `tetap`.

# 12. Presentation Mode

Presentation mode preserves the design system but simplifies the layout.

When active:

- sidebar collapses to icons or hides;
- inspector can collapse;
- stage expands;
- title and metrics increase one size;
- playback remains visible;
- show `Keluar Presentasi`;
- no browser fullscreen requirement.

Presentation mode must not introduce a dark theme or different colors.

# 13. Color Usage Contract

This section is strict.

## 13.1 Neutral-first ratio

Target visual ratio:

- 80–85% neutral surfaces and text;
- 10–15% primary blue;
- maximum 5% semantic or subject colors.

## 13.2 Primary blue

Use `primary` only for:

- active simulation item;
- primary action;
- active slider fill;
- active speed;
- focus and selected state;
- important active outline.

Do not use primary blue for:

- every heading;
- every icon;
- all result values;
- large background regions;
- decorative accents.

## 13.3 Subject colors

Use subject colors only for:

- subject icons;
- small metadata indicators;
- scientific semantic graphics when the meaning aligns.

Never use subject colors for active navigation state. Active navigation stays primary blue.

## 13.4 Semantic colors

Success:

- completed or valid state;
- positive direction only when semantically meaningful.

Warning:

- prediction prompt;
- limiting factor;
- state requiring attention.

Danger:

- opposing force;
- invalid input;
- destructive/reset comparison action.

Do not use red merely to make the screen visually interesting.

## 13.5 Stage colors

Scientific visual colors must remain stable between simulations.

Examples:

- opposing force is always red;
- applied force is always green;
- water is always blue;
- acid and base colors stay stable;
- energy categories retain stable colors.

## 13.6 Borders

Every major separation uses border before shadow.

- shell dividers: `divider`;
- panels: `border`;
- selected preset: `primary`;
- input focus: `focus_ring`.

# 14. Typography Contract

- maximum 3 visible font sizes in one local panel;
- page title is the only 28 px text in normal mode;
- body stays 15 px;
- helper copy stays 13 px;
- metrics use monospaced type;
- all changing numbers use tabular numerals;
- headings use sentence case;
- avoid uppercase except tiny section metadata.

No decorative display font.

# 15. Spacing Contract

Base spacing unit: 4 px.

Common spacing:

- control internal gap: 8 px;
- related elements: 12 px;
- panel padding: 20 px;
- workspace gap: 20 px;
- page horizontal padding: 32 px;
- major section gap: 24 px.

Avoid arbitrary values such as 13 px, 19 px, or 27 px unless required for optical alignment.

# 16. Radius and Shadow Contract

Radius:

- buttons and inputs: 6 px;
- navigation item: 8 px;
- panels and stage: 10 px;
- badges: pill allowed.

Shadow:

- no shadow for shell, sidebar, stage, inspector, readouts, or teaching panel;
- only floating menus may use `shadow.floating`.

Forbidden:

- glow;
- glassmorphism;
- blurred translucent surface;
- large soft card shadow;
- nested rounded cards.

# 17. Iconography

Use one outline icon set consistently, such as Lucide.

Rules:

- standard icon size: 18–20 px;
- stroke width: consistent;
- icons support labels, not replace them;
- no emoji;
- no 3D icons;
- no colored icon tiles unless they represent a subject.

Subject icons:

- Fisika: atom/orbit or force symbol;
- Biologi: leaf/cell;
- Kimia: flask.

# 18. Responsive Rules

## 18.1 Desktop ≥ 1180 px

- sidebar fixed 256 px;
- inspector fixed 328 px;
- stage flexible;
- results 4 columns;
- presets 3 columns.

## 18.2 Tablet 768–1179 px

- sidebar collapsible;
- inspector moves below stage;
- results 2 columns;
- presets 2 columns;
- header remains compact.

## 18.3 Mobile < 768 px

- sidebar becomes drawer;
- stage full width;
- inspector below;
- results 2 columns, then 1 at narrow width;
- playback wraps;
- bottom teaching tools become accordion;
- no horizontal overflow.

Do not transform the sidebar into horizontal subject tabs.

# 19. Interaction States

## Default

- sidebar visible;
- Fisika expanded;
- Gaya dan Gerak active;
- badge `Jenjang: SMP`;
- simulation paused at time 0;
- formula collapsed;
- results visible;
- no Experiment A.

## Playing

- `Mulai` becomes active/running state;
- `Jeda` enabled;
- timer updates;
- metrics update with tabular numbers;
- no layout shift.

## Paused

- stage freezes;
- `Langkah` advances fixed interval;
- variables remain available only if the simulation supports live adjustment.

## Reset

- reset current simulation variables and time;
- preserve active simulation;
- do not clear Experiment A unless explicitly requested.

## Simulation switch

- stop playback;
- update entire workspace;
- retain previous simulation session state if available;
- clear comparison state.

## Predict Mode

Predict Mode belongs under teaching tools or inspector display settings, not the main navigation.

When active:

- results display `—`;
- final interpretation hidden;
- stage initial state remains visible;
- show restrained warning banner `Apa prediksi kalian?`;
- action `Tampilkan Hasil`.

Do not blur the result cards.

# 20. Accessibility

- WCAG AA text contrast;
- keyboard navigation for sidebar, sliders, buttons, tabs, and accordions;
- focus ring always visible;
- control labels programmatically linked;
- dynamic results announced through `aria-live="polite"`;
- color paired with labels, direction, shapes, or patterns;
- minimum target 40 × 40 px;
- support `prefers-reduced-motion`;
- stage includes concise text description.

# 21. Anti-Slop Rules

Never generate:

- purple-blue gradients;
- giant rounded cards;
- glowing buttons;
- glass panels;
- floating decorative blobs;
- abstract background waves;
- 3D clay illustrations;
- cartoon mascot;
- dashboard KPI clutter;
- hero marketing section;
- excessive badges;
- random color per card;
- sidebar with avatars or workspace switcher;
- chat bubbles;
- AI tutor panel;
- recommendation feed;
- gamification;
- confetti;
- testimonial or pricing content.

Do not add features not specified in this file.

# 22. Stitch Generation Instruction

Generate **one responsive application workspace**, not a marketing site.

The generated screen must show:

- white header with ScienceLab brand;
- presentation button at top right;
- fixed left LMS sidebar;
- subject groups Fisika, Biologi, Kimia;
- active item Gaya dan Gerak;
- main title and one-line description;
- non-interactive `Jenjang: SMP` badge;
- large force-and-motion stage;
- right control inspector;
- four result readouts;
- playback bar;
- bottom teaching tools with presets active.

Prioritize exact layout and hierarchy over decorative styling.

Use Indonesian copy.

Do not create global subject tabs.
Do not create SD/SMP/SMA toggle.
Do not add AI features.
Do not add login or user profile.
Do not add a marketing hero.

# 23. Final Visual Test

The design passes only if:

- the selected simulation is obvious within 2 seconds;
- the simulation stage is the largest visual object;
- the sidebar reads like a simple LMS curriculum list;
- a teacher can find Play and Reset immediately;
- the grade appears as metadata, not a mode;
- colors feel disciplined and sparse;
- no component looks decorative without function;
- the layout remains calm even with all six simulations listed;
- the screen looks hand-designed, not template-generated.
