import { SimulationDefinition } from "@/types/simulation";

export const photosynthesisSimulation: SimulationDefinition = {
  id: "photosynthesis",
  subject: "biology",
  title: "Fotosintesis",
  description: "Simulasi laju fotosintesis berdasarkan Hukum Faktor Pembatas (Hukum Blackman) untuk Cahaya, Air, CO₂, dan Suhu.",
  gradeConfigs: {
    sd: {
      variables: [
        {
          id: "lightPreset",
          name: "Sinar Matahari",
          unit: "",
          type: "select",
          defaultValue: "medium",
          options: [
            { label: "Redup / Gelap", value: "low" },
            { label: "Sedang / Terang", value: "medium" },
            { label: "Sangat Terang", value: "high" },
          ],
        },
        {
          id: "waterPreset",
          name: "Air",
          unit: "",
          type: "select",
          defaultValue: "sufficient",
          options: [
            { label: "Kering / Sedikit", value: "scarce" },
            { label: "Cukup Air", value: "sufficient" },
          ],
        },
        {
          id: "co2Preset",
          name: "Udara (CO₂)",
          unit: "",
          type: "select",
          defaultValue: "sufficient",
          options: [
            { label: "Sedikit CO₂", value: "scarce" },
            { label: "Cukup CO₂", value: "sufficient" },
          ],
        },
      ],
      defaultValues: { lightPreset: "medium", waterPreset: "sufficient", co2Preset: "sufficient" },
    },
    smp: {
      variables: [
        { id: "lightPercent", name: "Intensitas Cahaya", unit: "%", type: "slider", min: 0, max: 100, step: 5, defaultValue: 70 },
        { id: "waterPercent", name: "Ketersediaan Air", unit: "%", type: "slider", min: 0, max: 100, step: 5, defaultValue: 80 },
        { id: "co2Percent", name: "Kadar CO₂", unit: "%", type: "slider", min: 0, max: 100, step: 5, defaultValue: 60 },
      ],
      defaultValues: { lightPercent: 70, waterPercent: 80, co2Percent: 60 },
    },
    sma: {
      variables: [
        { id: "lightPercent", name: "Intensitas Cahaya", unit: "%", type: "slider", min: 0, max: 100, step: 5, defaultValue: 80 },
        { id: "waterPercent", name: "Ketersediaan Air", unit: "%", type: "slider", min: 0, max: 100, step: 5, defaultValue: 90 },
        { id: "co2Percent", name: "Kadar CO₂", unit: "%", type: "slider", min: 0, max: 100, step: 5, defaultValue: 70 },
        { id: "temperature", name: "Suhu Lingkungan", unit: "°C", type: "slider", min: 5, max: 50, step: 1, defaultValue: 28 },
      ],
      defaultValues: { lightPercent: 80, waterPercent: 90, co2Percent: 70, temperature: 28 },
    },
  },
  metrics: {
    sd: [
      { id: "rate", label: "Laju Fotosintesis", unit: "%" },
      { id: "oxygen", label: "Gelembung Oksigen", unit: "gelembung/s" },
      { id: "limitingFactor", label: "Faktor Kurang (Pembatas)", unit: "" },
      { id: "plantHealth", label: "Kondisi Daun", unit: "" },
    ],
    smp: [
      { id: "rate", label: "Laju Fotosintesis", unit: "%" },
      { id: "oxygen", label: "Produksi O₂ Relatif", unit: "%" },
      { id: "limitingFactor", label: "Faktor Pembatas", unit: "" },
      { id: "plantState", label: "Status Pertumbuhan", unit: "" },
    ],
    sma: [
      { id: "rate", label: "Laju Fotosintesis (v_foto)", unit: "%" },
      { id: "oxygen", label: "Laju Pelepasan O₂", unit: "μmol/m²/s" },
      { id: "limitingFactor", label: "Faktor Pembatas Utama", unit: "" },
      { id: "tempFactor", label: "Efisiensi Enzim (Suhu)", unit: "%" },
    ],
  },
  presets: [
    {
      id: "lack-of-light",
      title: "Kekurangan Cahaya",
      description: "Air dan CO₂ melimpah, tetapi intensitas cahaya sangat rendah.",
      values: { lightPercent: 15, waterPercent: 90, co2Percent: 90, temperature: 28, lightPreset: "low", waterPreset: "sufficient", co2Preset: "sufficient" },
    },
    {
      id: "lack-of-water",
      title: "Kekurangan Air (Kekeringan)",
      description: "Sinar matahari dan CO₂ cukup, namun tanah kekurangan air.",
      values: { lightPercent: 90, waterPercent: 10, co2Percent: 80, temperature: 28, lightPreset: "high", waterPreset: "scarce", co2Preset: "sufficient" },
    },
    {
      id: "high-co2-low-light",
      title: "CO₂ Tinggi tetapi Cahaya Redup",
      description: "Menunjukkan bahwa peningkatan CO₂ tidak berguna jika cahaya menjadi faktor pembatas.",
      values: { lightPercent: 20, waterPercent: 80, co2Percent: 100, temperature: 28, lightPreset: "low", waterPreset: "sufficient", co2Preset: "sufficient" },
    },
  ],
  discussions: {
    sd: {
      predict: "Apa yang terjadi pada gelembung oksigen jika tanaman diletakkan di tempat gelap?",
      observe: "Lihat gelembung O₂ yang keluar dari daun saat sinar matahari diredupkan.",
      conclude: "Tanaman membutuhkan cahaya matahari, air, dan CO₂ untuk menghasilkan makanan dan oksigen.",
    },
    smp: {
      predict: "Jika kadar CO₂ dinaikkan ke 100% namun cahaya hanya 20%, berapakah laju fotosintesis?",
      observe: "Amati bahwa laju fotosintesis selalu dibatasi oleh faktor dengan persentase terendah.",
      conclude: "Hukum Faktor Pembatas: Laju reaksi fotosintesis ditentukan oleh faktor terkecil yang paling membatasi.",
    },
    sma: {
      predict: "Mengapa suhu terlalu tinggi (di atas 45°C) menurunkan laju fotosintesis meskipun cahaya dan CO₂ melimpah?",
      observe: "Amati perubahan faktor efisiensi enzim akibat denaturasi termal protein pada suhu ekstrim.",
      conclude: "Enzim fotosintesis (seperti RuBisCO) memiliki suhu optimum (~28°C) dan mengalami denaturasi pada suhu tinggi.",
    },
  },
  concepts: {
    sd: {
      summary: "Fotosintesis adalah proses tanaman membuat makanan menggunakan cahaya matahari, air, dan karbon dioksida.",
    },
    smp: {
      summary: "Persamaan reaksi fotosintesis memerlukan air dan karbon dioksida yang diubah oleh energi cahaya menjadi glukosa dan oksigen.",
      formulaText: "6CO₂ + 6H₂O + Energi Cahaya  →  C₆H₁₂O₆ + 6O₂",
    },
    sma: {
      summary: "Laju fotosintesis mengikuti model Lieberman/Blackman limiting factor dikombinasikan dengan kurva aktivitas enzim suhu optimum.",
      formulaText: "Rate = min(Light, Water, CO₂, f(T))  di mana f(T) = max(0, 1 - |T - 28| / 23)",
    },
  },
  calculate: (inputs, elapsedTime, grade) => {
    let light = 70;
    let water = 80;
    let co2 = 60;
    let temp = 28;

    if (grade === "sd") {
      light = inputs.lightPreset === "low" ? 20 : inputs.lightPreset === "high" ? 100 : 60;
      water = inputs.waterPreset === "scarce" ? 25 : 85;
      co2 = inputs.co2Preset === "scarce" ? 25 : 85;
    } else if (grade === "smp") {
      light = Number(inputs.lightPercent ?? 70);
      water = Number(inputs.waterPercent ?? 80);
      co2 = Number(inputs.co2Percent ?? 60);
    } else {
      light = Number(inputs.lightPercent ?? 80);
      water = Number(inputs.waterPercent ?? 90);
      co2 = Number(inputs.co2Percent ?? 70);
      temp = Number(inputs.temperature ?? 28);
    }

    const lightFactor = light / 100;
    const waterFactor = water / 100;
    const co2Factor = co2 / 100;
    const tempFactor = Math.max(0, 1 - Math.abs(temp - 28) / 23);

    const effectiveFactors = [
      { name: "Cahaya", val: lightFactor },
      { name: "Air", val: waterFactor },
      { name: "Karbon Dioksida", val: co2Factor },
      { name: "Suhu", val: tempFactor },
    ];

    effectiveFactors.sort((a, b) => a.val - b.val);
    const limiting = effectiveFactors[0];

    const ratePct = Math.round(limiting.val * 100);
    const bubbleRate = Math.round(ratePct * 0.4);

    let plantHealth = "Subur & Segar";
    if (ratePct < 30) plantHealth = "Layu / Terhambat";
    else if (ratePct < 65) plantHealth = "Normal";

    return {
      metrics: {
        rate: ratePct,
        oxygen: bubbleRate,
        limitingFactor: limiting.name,
        plantHealth,
        plantState: plantHealth,
        tempFactor: Math.round(tempFactor * 100),
      },
      stageData: {
        light,
        water,
        co2,
        temp,
        ratePct,
        bubbleRate,
        limitingFactor: limiting.name,
        elapsedTime,
      },
    };
  },
};
