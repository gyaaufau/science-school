import { SimulationDefinition } from "@/types/simulation";

export const stateChangeSimulation: SimulationDefinition = {
  id: "state-change",
  subject: "chemistry",
  title: "Perubahan Wujud Zat",
  description: "Simulasi perubahan wujud (Padat, Cair, Gas), suhu, transfer energi termal, dan kinetika gerak molekul partikel.",
  gradeConfigs: {
    sd: {
      variables: [
        {
          id: "actionPreset",
          name: "Perlakuan Panas",
          unit: "",
          type: "select",
          defaultValue: "heat",
          options: [
            { label: "Panaskan (Beri Energi)", value: "heat" },
            { label: "Dinginkan (Kurangi Energi)", value: "cool" },
          ],
        },
        {
          id: "energyPreset",
          name: "Tingkat Energi Termal",
          unit: "",
          type: "select",
          defaultValue: "medium",
          options: [
            { label: "Rendah (Es)", value: "low" },
            { label: "Sedang (Air)", value: "medium" },
            { label: "Tinggi (Uap)", value: "high" },
          ],
        },
      ],
      defaultValues: { actionPreset: "heat", energyPreset: "medium" },
    },
    smp: {
      variables: [
        { id: "temperature", name: "Suhu (T)", unit: "°C", type: "slider", min: -30, max: 150, step: 5, defaultValue: 25 },
        { id: "heatAmount", name: "Jumlah Panas Ditambah", unit: "unit", type: "slider", min: -100, max: 100, step: 10, defaultValue: 0 },
        {
          id: "pressurePreset",
          name: "Tekanan Udara",
          unit: "",
          type: "select",
          defaultValue: "normal",
          options: [
            { label: "Rendah (Pegunungan)", value: "low" },
            { label: "Normal (1 atm)", value: "normal" },
            { label: "Tinggi (Presto)", value: "high" },
          ],
        },
      ],
      defaultValues: { temperature: 25, heatAmount: 0, pressurePreset: "normal" },
    },
    sma: {
      variables: [
        { id: "initialTemp", name: "Suhu Awal (T₀)", unit: "°C", type: "slider", min: -50, max: 200, step: 5, defaultValue: 20 },
        { id: "heatAdded", name: "Energi Ditambahkan (Q)", unit: "kJ", type: "slider", min: 0, max: 500, step: 25, defaultValue: 100 },
        { id: "sampleMass", name: "Massa Sampel (m)", unit: "g", type: "slider", min: 50, max: 500, step: 50, defaultValue: 100 },
        { id: "pressureRel", name: "Tekanan Relatif (P)", unit: "atm", type: "slider", min: 0.5, max: 3.0, step: 0.5, defaultValue: 1.0 },
      ],
      defaultValues: { initialTemp: 20, heatAdded: 100, sampleMass: 100, pressureRel: 1.0 },
    },
  },
  metrics: {
    sd: [
      { id: "tempDisplay", label: "Suhu Termometer", unit: "°C" },
      { id: "stateName", label: "Wujud Zat", unit: "" },
      { id: "particleSpeed", label: "Gerak Partikel", unit: "" },
      { id: "processName", label: "Proses Perubahan", unit: "" },
    ],
    smp: [
      { id: "tempDisplay", label: "Suhu Efektif (T)", unit: "°C" },
      { id: "stateName", label: "Fase Wujud", unit: "" },
      { id: "particleSpeed", label: "Energi Kinetik Partikel", unit: "" },
      { id: "boilingPt", label: "Titik Didih (T_d)", unit: "°C" },
    ],
    sma: [
      { id: "tempDisplay", label: "Suhu Akhir (T_f)", unit: "°C" },
      { id: "stateName", label: "Keadaan Fase", unit: "" },
      { id: "particleSpeed", label: "Kecepatan Rata-Rata (v_rms)", unit: "m/s" },
      { id: "latentHeat", label: "Status Kalor Laten", unit: "" },
    ],
  },
  presets: [
    {
      id: "solid-to-liquid",
      title: "Peleburan (Padat → Cair)",
      description: "Meningkatkan suhu es (-20°C) hingga meleleh menjadi air pada titik lebur (0°C).",
      values: { temperature: 0, heatAmount: 50, actionPreset: "heat", energyPreset: "low", initialTemp: -20, heatAdded: 150, sampleMass: 100, pressureRel: 1.0 },
    },
    {
      id: "liquid-to-gas",
      title: "Penguapan / Mendidih (Cair → Gas)",
      description: "Pemanasan air (25°C) hingga mencapai titik didih (100°C) dan berubah menjadi uap.",
      values: { temperature: 100, heatAmount: 80, actionPreset: "heat", energyPreset: "high", initialTemp: 25, heatAdded: 450, sampleMass: 100, pressureRel: 1.0 },
    },
    {
      id: "gas-condensation",
      title: "Pengembunan (Gas → Cair)",
      description: "Pendinginan uap air dari 120°C menjadi cairan.",
      values: { temperature: 60, heatAmount: -60, actionPreset: "cool", energyPreset: "medium", initialTemp: 130, heatAdded: 0, sampleMass: 100, pressureRel: 1.0 },
    },
  ],
  discussions: {
    sd: {
      predict: "Apa yang terjadi pada es jika terus-menerus dipanaskan?",
      observe: "Lihat pergerakan molekul saat suhu naik di atas 0°C dan di atas 100°C.",
      conclude: "Panas membuat partikel bergerak semakin cepat sehingga wujud berubah dari padat → cair → uap.",
    },
    smp: {
      predict: "Apakah suhu air akan terus naik saat air sedang mendidih?",
      observe: "Amati grafik/indikator suhu saat terjadi transisi wujud (kalor laten).",
      conclude: "Selama perubahan wujud berlangsung (meleleh/mendidih), suhu zat tetap konstan.",
    },
    sma: {
      predict: "Bagaimana peningkatan tekanan mempengaruhi titik didih uap zat?",
      observe: "Amati bagaimana tekanan P mempengaruhi suhu didih (hukum Clausius-Clapeyron).",
      conclude: "Kalor laten Q = m·L diserap/dilepas selama perubahan fase tanpa perubahan suhu.",
    },
  },
  concepts: {
    sd: {
      summary: "Zat padat partikelnya rapat & diam. Cairan bergerak bebas. Uap gas terbang bebas ke segala arah.",
    },
    smp: {
      summary: "Perubahan wujud zat dipengaruhi oleh perubahan energi kinetik partikel dan titik lebur/didih.",
      formulaText: "Q = m·c·ΔT  (Sensibel)   dan   Q = m·L  (Laten transisi)",
    },
    sma: {
      summary: "Termodinamika transisi fase orde pertama, grafik heating curve, dan distribusi Boltzmann energi partikel.",
      formulaText: "T_didih = 100°C × P^0.28   ⇒   v_rms = √(3·R·T / M)",
    },
  },
  calculate: (inputs, elapsedTime, grade) => {
    let temp = 25;
    let meltingPt = 0;
    let boilingPt = 100;

    if (grade === "sd") {
      const preset = inputs.energyPreset;
      if (preset === "low") temp = -10;
      else if (preset === "high") temp = 110;
      else temp = 30;
      if (inputs.actionPreset === "cool") temp -= 20;
      else if (inputs.actionPreset === "heat") temp += 20;
    } else if (grade === "smp") {
      const baseT = Number(inputs.temperature ?? 25);
      const heat = Number(inputs.heatAmount ?? 0);
      const press = inputs.pressurePreset;
      if (press === "low") boilingPt = 85;
      else if (press === "high") boilingPt = 120;

      temp = baseT + heat * 0.5;
    } else {
      const T0 = Number(inputs.initialTemp ?? 20);
      const Q = Number(inputs.heatAdded ?? 100);
      const m = Number(inputs.sampleMass ?? 100);
      const P = Number(inputs.pressureRel ?? 1.0);

      boilingPt = 100 * Math.pow(P, 0.25);
      const c = 4.18; // J/g·°C
      const deltaT = Q / ((m * c) / 10);
      temp = T0 + deltaT;
    }

    let stateName = "Cair (Air)";
    let processName = "Stabil";
    let particleV = 1.0;

    if (temp < meltingPt) {
      stateName = "Padat (Es)";
      processName = "Membeku";
      particleV = Math.max(0.1, 0.3 * (1 + (temp + 30) / 30));
    } else if (temp >= boilingPt) {
      stateName = "Gas (Uap)";
      processName = "Mendidih / Menguap";
      particleV = Math.min(4.0, 2.0 + (temp - boilingPt) * 0.05);
    } else {
      stateName = "Cair (Air)";
      processName = "Mencair / Mengalir";
      particleV = 0.8 + (temp / 100) * 1.0;
    }

    const vRms = Math.round(400 * Math.sqrt((temp + 273.15) / 273.15));

    return {
      metrics: {
        tempDisplay: +temp.toFixed(1),
        stateName,
        particleSpeed: grade === "sma" ? `${vRms} m/s` : `${+particleV.toFixed(1)}x`,
        processName,
        boilingPt: +boilingPt.toFixed(1),
        latentHeat: temp >= boilingPt ? "Menguap (Fase Gas)" : temp <= meltingPt ? "Membeku (Fase Padat)" : "Sensibel (Fase Cair)",
      },
      stageData: {
        temperature: +temp.toFixed(1),
        meltingPt,
        boilingPt,
        stateName,
        particleSpeed: particleV,
        elapsedTime,
      },
    };
  },
};
