import { SimulationDefinition } from "@/types/simulation";

export const energySimulation: SimulationDefinition = {
  id: "energy",
  subject: "physics",
  title: "Energi Kinetik dan Potensial",
  description: "Simulasi konversi Energi Potensial (Ep = mgh) menjadi Energi Kinetik (Ek = ½mv²) pada lintasan parabola/skate ramp.",
  gradeConfigs: {
    sd: {
      variables: [
        {
          id: "heightPreset",
          name: "Ketinggian Awal",
          unit: "",
          type: "select",
          defaultValue: "medium",
          options: [
            { label: "Rendah (3 m)", value: "low" },
            { label: "Sedang (6 m)", value: "medium" },
            { label: "Tinggi (10 m)", value: "high" },
          ],
        },
        {
          id: "massPreset",
          name: "Massa Bola",
          unit: "",
          type: "select",
          defaultValue: "light",
          options: [
            { label: "Ringan (2 kg)", value: "light" },
            { label: "Berat (8 kg)", value: "heavy" },
          ],
        },
        {
          id: "frictionPreset",
          name: "Gesekan Lintasan",
          unit: "",
          type: "toggle",
          defaultValue: false,
        },
      ],
      defaultValues: { heightPreset: "medium", massPreset: "light", frictionPreset: false },
    },
    smp: {
      variables: [
        { id: "mass", name: "Massa (m)", unit: "kg", type: "slider", min: 1, max: 10, step: 1, defaultValue: 4 },
        { id: "height", name: "Tinggi Awal (h)", unit: "m", type: "slider", min: 1, max: 10, step: 1, defaultValue: 6 },
        { id: "frictionPercent", name: "Gesekan (%)", unit: "%", type: "slider", min: 0, max: 40, step: 5, defaultValue: 0 },
      ],
      defaultValues: { mass: 4, height: 6, frictionPercent: 0 },
    },
    sma: {
      variables: [
        { id: "mass", name: "Massa (m)", unit: "kg", type: "slider", min: 1, max: 20, step: 1, defaultValue: 5 },
        { id: "height", name: "Tinggi Awal (h)", unit: "m", type: "slider", min: 1, max: 20, step: 1, defaultValue: 10 },
        { id: "gravity", name: "Gravitasi (g)", unit: "m/s²", type: "slider", min: 1, max: 15, step: 0.5, defaultValue: 9.8 },
        { id: "energyLoss", name: "Kehilangan Energi", unit: "%", type: "slider", min: 0, max: 60, step: 5, defaultValue: 10 },
        { id: "initialVelocity", name: "Kecepatan Awal (v₀)", unit: "m/s", type: "slider", min: 0, max: 10, step: 1, defaultValue: 0 },
      ],
      defaultValues: { mass: 5, height: 10, gravity: 9.8, energyLoss: 10, initialVelocity: 0 },
    },
  },
  metrics: {
    sd: [
      { id: "ep", label: "Energi Potensial", unit: "J" },
      { id: "ek", label: "Energi Kinetik", unit: "J" },
      { id: "etotal", label: "Total Energi", unit: "J" },
      { id: "speed", label: "Kecepatan Bola", unit: "m/s" },
    ],
    smp: [
      { id: "ep", label: "Energi Potensial (Ep)", unit: "J" },
      { id: "ek", label: "Energi Kinetik (Ek)", unit: "J" },
      { id: "etotal", label: "Energi Mekanik (Em)", unit: "J" },
      { id: "speed", label: "Kecepatan (v)", unit: "m/s" },
    ],
    sma: [
      { id: "ep", label: "Energi Potensial (Ep = mgh)", unit: "J" },
      { id: "ek", label: "Energi Kinetik (Ek = ½mv²)", unit: "J" },
      { id: "etotal", label: "Energi Mekanik Total", unit: "J" },
      { id: "speed", label: "Kecepatan Sesaat (v)", unit: "m/s" },
    ],
  },
  presets: [
    {
      id: "low-vs-high",
      title: "Titik Awal Rendah vs Tinggi",
      description: "Membandingkan energi potensial bola dilepas dari tinggi 3m versus 10m.",
      values: { height: 10, mass: 4, frictionPercent: 0, heightPreset: "high", massPreset: "light", frictionPreset: false },
    },
    {
      id: "diff-mass-same-height",
      title: "Massa Berbeda pada Tinggi Sama",
      description: "Membandingkan energi kinetik maksimum bola 2kg versus 10kg.",
      values: { height: 6, mass: 10, frictionPercent: 0, heightPreset: "medium", massPreset: "heavy", frictionPreset: false },
    },
    {
      id: "with-friction-loss",
      title: "Pengaruh Gesekan (Disipasi Energi)",
      description: "Melihat pengurangan energi mekanik total menjadi energi panas akibat gesekan.",
      values: { height: 8, mass: 5, frictionPercent: 25, energyLoss: 25, heightPreset: "high", massPreset: "light", frictionPreset: true },
    },
  ],
  discussions: {
    sd: {
      predict: "Kapan bola memiliki kecepatan paling tinggi: di puncak lintasan atau di dasar lintasan?",
      observe: "Perhatikan perubahan diagram batang Energi Potensial dan Energi Kinetik saat bola turun.",
      conclude: "Di posisi tertinggi Energi Potensial paling besar, sedangkan di dasar Energi Kinetik paling besar.",
    },
    smp: {
      predict: "Apakah total energi mekanik akan berkurang jika lintasan tidak memiliki gesekan?",
      observe: "Amati bagaimana Ep berubah menjadi Ek saat bola meluncur menuju titik terendah (h = 0).",
      conclude: "Hukum Kekekalan Energi Mekanik: Em = Ep + Ek bernilai konstan jika tanpa gesekan.",
    },
    sma: {
      predict: "Bagaimana laju kehilangan energi disipasi mempengaruhi tinggi maksimum pantulan berikutnya?",
      observe: "Perhatikan bahwa Ek_max di dasar sama dengan Ep_awal minus disipasi gesekan.",
      conclude: "Gesekan mengubah sebagian energi mekanik menjadi energi termal (panas).",
    },
  },
  concepts: {
    sd: {
      summary: "Energi Potensial adalah energi karena ketinggian. Energi Kinetik adalah energi karena gerakan.",
    },
    smp: {
      summary: "Energi tidak dapat dimusnahkan tetapi berubah bentuk dari energi potensial menjadi kinetik.",
      formulaText: "Em = Ep + Ek = m·g·h + ½·m·v²",
    },
    sma: {
      summary: "Hukum kekekalan energi mekanik dan kerja oleh gaya non-konservatif (gesekan).",
      formulaText: "W_gesek = ΔEm = Em_akhir - Em_awal",
    },
  },
  calculate: (inputs, elapsedTime, grade) => {
    let m = 4;
    let h0 = 6;
    let g = 9.8;
    let lossRatio = 0;
    let v0 = 0;

    if (grade === "sd") {
      h0 = inputs.heightPreset === "low" ? 3 : inputs.heightPreset === "high" ? 10 : 6;
      m = inputs.massPreset === "heavy" ? 8 : 2;
      lossRatio = inputs.frictionPreset ? 0.2 : 0;
    } else if (grade === "smp") {
      m = Number(inputs.mass ?? 4);
      h0 = Number(inputs.height ?? 6);
      lossRatio = Number(inputs.frictionPercent ?? 0) / 100;
    } else {
      m = Number(inputs.mass ?? 5);
      h0 = Number(inputs.height ?? 10);
      g = Number(inputs.gravity ?? 9.8);
      lossRatio = Number(inputs.energyLoss ?? 10) / 100;
      v0 = Number(inputs.initialVelocity ?? 0);
    }

    const E_initial = m * g * h0 + 0.5 * m * v0 * v0;
    const E_effective = E_initial * (1 - lossRatio);

    // Oscillation phase along U-ramp
    const omega = Math.sqrt(g / Math.max(1, h0));
    const phase = elapsedTime * omega;
    const normalizedY = 0.5 * (1 + Math.cos(phase)); // 1 at top, 0 at bottom
    const currentH = h0 * normalizedY;

    const currentEp = Math.max(0, m * g * currentH);
    const currentEk = Math.max(0, E_effective - currentEp);
    const currentV = Math.sqrt((2 * currentEk) / m);

    return {
      metrics: {
        ep: +currentEp.toFixed(1),
        ek: +currentEk.toFixed(1),
        etotal: +E_effective.toFixed(1),
        speed: +currentV.toFixed(2),
      },
      stageData: {
        mass: m,
        height0: h0,
        currentHeight: currentH,
        ep: currentEp,
        ek: currentEk,
        eTotal: E_effective,
        speed: currentV,
        normalizedPos: Math.sin(phase), // -1 to 1 across U-track
      },
    };
  },
};
