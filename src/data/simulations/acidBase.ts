import { SimulationDefinition } from "@/types/simulation";

export const acidBaseSimulation: SimulationDefinition = {
  id: "acid-base",
  subject: "chemistry",
  title: "Asam dan Basa",
  description: "Simulasi pH larutan, konsep asam/basa kuat dan lemah, perubahan warna indikator universal, serta titrasi netralisasi.",
  gradeConfigs: {
    sd: {
      variables: [
        {
          id: "liquidPreset",
          name: "Jenis Cairan",
          unit: "",
          type: "select",
          defaultValue: "acid",
          options: [
            { label: "Jus Lemon (Asam)", value: "acid" },
            { label: "Air Murni (Netral)", value: "water" },
            { label: "Air Sabun (Basa)", value: "base" },
          ],
        },
        {
          id: "indicatorToggle",
          name: "Teteskan Indikator Warna",
          unit: "",
          type: "toggle",
          defaultValue: true,
        },
      ],
      defaultValues: { liquidPreset: "acid", indicatorToggle: true },
    },
    smp: {
      variables: [
        {
          id: "solutionType",
          name: "Jenis Larutan Utama",
          unit: "",
          type: "select",
          defaultValue: "strongAcid",
          options: [
            { label: "Asam Kuat (HCl)", value: "strongAcid" },
            { label: "Asam Lemah (CH₃COOH)", value: "weakAcid" },
            { label: "Air Murni (H₂O)", value: "water" },
            { label: "Basa Lemah (NH₃)", value: "weakBase" },
            { label: "Basa Kuat (NaOH)", value: "strongBase" },
          ],
        },
        {
          id: "concentrationPreset",
          name: "Konsentrasi",
          unit: "",
          type: "select",
          defaultValue: "medium",
          options: [
            { label: "Rendah (0.01 M)", value: "low" },
            { label: "Sedang (0.1 M)", value: "medium" },
            { label: "Tinggi (1.0 M)", value: "high" },
          ],
        },
        { id: "volumeA", name: "Volume Larutan", unit: "mL", type: "slider", min: 50, max: 500, step: 25, defaultValue: 200 },
      ],
      defaultValues: { solutionType: "strongAcid", concentrationPreset: "medium", volumeA: 200 },
    },
    sma: {
      variables: [
        {
          id: "solutionA",
          name: "Larutan A (Wadah)",
          unit: "",
          type: "select",
          defaultValue: "strongAcid",
          options: [
            { label: "Asam Kuat (HCl)", value: "strongAcid" },
            { label: "Asam Lemah (CH₃COOH)", value: "weakAcid" },
            { label: "Air Murni (H₂O)", value: "water" },
          ],
        },
        { id: "molarityA", name: "Molaritas A (M_A)", unit: "M", type: "slider", min: 0.01, max: 1.0, step: 0.05, defaultValue: 0.1 },
        { id: "volumeA", name: "Volume A (V_A)", unit: "mL", type: "slider", min: 10, max: 500, step: 10, defaultValue: 100 },
        {
          id: "solutionB",
          name: "Larutan B (Penetrasional)",
          unit: "",
          type: "select",
          defaultValue: "strongBase",
          options: [
            { label: "Tanpa Pencampuran", value: "none" },
            { label: "Basa Kuat (NaOH)", value: "strongBase" },
            { label: "Basa Lemah (NH₃)", value: "weakBase" },
          ],
        },
        { id: "molarityB", name: "Molaritas B (M_B)", unit: "M", type: "slider", min: 0.01, max: 1.0, step: 0.05, defaultValue: 0.1 },
        { id: "volumeB", name: "Volume B Ditambah (V_B)", unit: "mL", type: "slider", min: 0, max: 500, step: 10, defaultValue: 100 },
      ],
      defaultValues: { solutionA: "strongAcid", molarityA: 0.1, volumeA: 100, solutionB: "strongBase", molarityB: 0.1, volumeB: 100 },
    },
  },
  metrics: {
    sd: [
      { id: "phValue", label: "Nilai pH", unit: "" },
      { id: "classification", label: "Jenis Larutan", unit: "" },
      { id: "colorName", label: "Warna Indikator", unit: "" },
      { id: "tasteFeel", label: "Ciri Khas Rasa/Raba", unit: "" },
    ],
    smp: [
      { id: "phValue", label: "Nilai pH (0–14)", unit: "" },
      { id: "classification", label: "Sifat Larutan", unit: "" },
      { id: "hConc", label: "Konsentrasi [H⁺]", unit: "M" },
      { id: "colorName", label: "Warna Lakmus", unit: "" },
    ],
    sma: [
      { id: "phValue", label: "pH Campuran", unit: "" },
      { id: "classification", label: "Status Netralisasi", unit: "" },
      { id: "hConc", label: "Konsentrasi [H⁺] / [OH⁻]", unit: "M" },
      { id: "excessMol", label: "Mol Sisa (Asam/Basa)", unit: "mmol" },
    ],
  },
  presets: [
    {
      id: "acid-water-base",
      title: "Asam, Air, dan Basa",
      description: "Membandingkan tingkat keasaman jus lemon (pH 2), air murni (pH 7), dan sabun (pH 11).",
      values: { liquidPreset: "acid", solutionType: "strongAcid", concentrationPreset: "medium", solutionA: "strongAcid", molarityA: 0.1, volumeA: 100, solutionB: "none", molarityB: 0, volumeB: 0 },
    },
    {
      id: "stoichiometric-neutralization",
      title: "Netralisasi Tepat Sempurna (pH 7)",
      description: "Mencampurkan 100mL HCl 0.1M dengan 100mL NaOH 0.1M membentuk larutan netral.",
      values: { liquidPreset: "water", solutionType: "water", concentrationPreset: "medium", solutionA: "strongAcid", molarityA: 0.1, volumeA: 100, solutionB: "strongBase", molarityB: 0.1, volumeB: 100 },
    },
    {
      id: "excess-acid",
      title: "Pencampuran Asam Berlebih",
      description: "Mencampurkan 200mL HCl 0.1M dengan 100mL NaOH 0.1M sehingga sisa asam membuat larutan tetap pH < 7.",
      values: { liquidPreset: "acid", solutionType: "strongAcid", concentrationPreset: "high", solutionA: "strongAcid", molarityA: 0.1, volumeA: 200, solutionB: "strongBase", molarityB: 0.1, volumeB: 100 },
    },
  ],
  discussions: {
    sd: {
      predict: "Apakah warna indikator akan berubah menjadi merah jika diteteskan ke cairan yang rasanya masam?",
      observe: "Lihat perubahan warna gelas kimia saat memilih jus lemon versus air sabun.",
      conclude: "Cairan asam membuat indikator berwarna merah-oranye, sedangkan basa berwarna biru-ungu.",
    },
    smp: {
      predict: "Berapakah pH air murni? Apa yang terjadi jika dimasukkan sedikit asam?",
      observe: "Amati bahwa semakin tinggi konsentrasi [H⁺], semakin kecil nilai pH larutan.",
      conclude: "pH < 7 adalah Asam, pH = 7 adalah Netral, dan pH > 7 adalah Basa.",
    },
    sma: {
      predict: "Berapa mL NaOH 0.1M yang dibutuhkan untuk menetralisir 100mL HCl 0.1M secara sempurna?",
      observe: "Amati perubahan drastis pH pada titik ekuivalen titrasi asam kuat - basa kuat.",
      conclude: "Netralisasi sempurna terjadi saat mol H⁺ dari asam sama dengan mol OH⁻ dari basa (V_A·M_A = V_B·M_B).",
    },
  },
  concepts: {
    sd: {
      summary: "Asam terasa masam dan berwarna merah pada indikator. Basa terasa licin dan berwarna biru.",
    },
    smp: {
      summary: "Skala pH (0-14) mengukur tingkat keasaman suatu larutan berdasarkan konsentrasi ion hidrogen [H⁺].",
      formulaText: "pH = -log₁₀[H⁺]  (pH < 7: Asam, pH 7: Netral, pH > 7: Basa)",
    },
    sma: {
      summary: "Perhitungan pH stoikiometri campuran asam kuat dan basa kuat serta prinsip indikator asam-basa.",
      formulaText: "Mol H⁺ = M_A · V_A ; Mol OH⁻ = M_B · V_B  ⇒  pH = -log₁₀([H⁺]_sisa / V_total)",
    },
  },
  calculate: (inputs, elapsedTime, grade) => {
    let ph = 7;
    let classification = "Netral";
    let colorHex = "#10b981"; // green neutral
    let colorName = "Hijau (Netral)";
    let tasteFeel = "Tawar";
    let hConc = 1e-7;
    let excessMol = 0;

    if (grade === "sd") {
      const type = inputs.liquidPreset;
      if (type === "acid") {
        ph = 2.5;
        classification = "Asam";
        colorHex = "#ef4444";
        colorName = "Merah / Oranye";
        tasteFeel = "Masam (Lemon)";
      } else if (type === "base") {
        ph = 11.5;
        classification = "Basa";
        colorHex = "#3b82f6";
        colorName = "Biru / Ungu";
        tasteFeel = "Licin & Pahit (Sabun)";
      } else {
        ph = 7.0;
        classification = "Netral";
        colorHex = "#10b981";
        colorName = "Hijau";
        tasteFeel = "Tawar (Air Murni)";
      }
    } else if (grade === "smp") {
      const sol = inputs.solutionType ?? "strongAcid";
      const concPreset = inputs.concentrationPreset ?? "medium";
      const M = concPreset === "low" ? 0.01 : concPreset === "high" ? 1.0 : 0.1;

      if (sol === "strongAcid") {
        hConc = M;
        ph = Math.max(0, -Math.log10(hConc));
        classification = "Asam Kuat";
      } else if (sol === "weakAcid") {
        hConc = Math.sqrt(1.8e-5 * M);
        ph = -Math.log10(hConc);
        classification = "Asam Lemah";
      } else if (sol === "strongBase") {
        const ohConc = M;
        const pOH = -Math.log10(ohConc);
        ph = 14 - pOH;
        classification = "Basa Kuat";
      } else if (sol === "weakBase") {
        const ohConc = Math.sqrt(1.8e-5 * M);
        const pOH = -Math.log10(ohConc);
        ph = 14 - pOH;
        classification = "Basa Lemah";
      } else {
        ph = 7.0;
        classification = "Netral";
      }
    } else {
      const solA = String(inputs.solutionA ?? "strongAcid");
      const mA = Number(inputs.molarityA ?? 0.1);
      const vA = Number(inputs.volumeA ?? 100);

      const solB = String(inputs.solutionB ?? "strongBase");
      const mB = Number(inputs.molarityB ?? 0.1);
      const vB = Number(inputs.volumeB ?? 100);

      let molH = 0;
      if (solA === "strongAcid") molH = mA * vA;
      else if (solA === "weakAcid") molH = Math.sqrt(1.8e-5 * mA) * vA;

      let molOH = 0;
      if (solB === "strongBase") molOH = mB * vB;
      else if (solB === "weakBase") molOH = Math.sqrt(1.8e-5 * mB) * vB;

      const vTotal = vA + vB;
      const netH = molH - molOH;
      excessMol = Math.abs(netH);

      if (Math.abs(netH) < 1e-4) {
        ph = 7.0;
        classification = "Netral Sempurna (Ekuivalen)";
      } else if (netH > 0) {
        hConc = netH / vTotal;
        ph = Math.max(0, -Math.log10(hConc));
        classification = "Kelebihan Asam";
      } else {
        const ohConc = Math.abs(netH) / vTotal;
        const pOH = Math.max(0, -Math.log10(ohConc));
        ph = Math.min(14, 14 - pOH);
        classification = "Kelebihan Basa";
      }
    }

    // Clamp pH 0 to 14
    ph = Math.min(14, Math.max(0, ph));

    // Dynamic Indicator Color map
    if (ph < 3) colorHex = "#ef4444"; // red
    else if (ph < 6) colorHex = "#f97316"; // orange
    else if (ph < 8) colorHex = "#10b981"; // green neutral
    else if (ph < 11) colorHex = "#06b6d4"; // cyan
    else colorHex = "#3b82f6"; // blue

    return {
      metrics: {
        phValue: +ph.toFixed(2),
        classification,
        colorName,
        tasteFeel,
        hConc: hConc.toExponential(2),
        excessMol: +excessMol.toFixed(2),
      },
      stageData: {
        ph: +ph.toFixed(2),
        colorHex,
        classification,
        elapsedTime,
      },
    };
  },
};
