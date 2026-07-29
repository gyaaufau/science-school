import { SimulationDefinition } from "@/types/simulation";

export const membraneTransportSimulation: SimulationDefinition = {
  id: "membrane-transport",
  subject: "biology",
  title: "Transport Membran",
  description: "Simulasi difusi sederhana, difusi terfasilitasi, osmosis, dan transport aktif melintasi membran sel fosfolipid.",
  gradeConfigs: {
    sd: {
      variables: [
        { id: "outsideCount", name: "Jumlah Molekul Luar Sel", unit: "", type: "slider", min: 5, max: 40, step: 5, defaultValue: 30 },
        { id: "insideCount", name: "Jumlah Molekul Dalam Sel", unit: "", type: "slider", min: 5, max: 40, step: 5, defaultValue: 10 },
        { id: "membraneOpen", name: "Pintu Membran Terbuka", unit: "", type: "toggle", defaultValue: true },
      ],
      defaultValues: { outsideCount: 30, insideCount: 10, membraneOpen: true },
    },
    smp: {
      variables: [
        { id: "transportType", name: "Jenis Transport", unit: "", type: "select", defaultValue: "simple", options: [
            { label: "Difusi Sederhana", value: "simple" },
            { label: "Difusi Terfasilitasi (Channel)", value: "facilitated" },
            { label: "Osmosis (Pelarut Air)", value: "osmosis" },
            { label: "Transport Aktif (Pompa ATP)", value: "active" },
          ]
        },
        { id: "outsideConc", name: "Konsentrasi Luar Sel", unit: "mM", type: "slider", min: 0, max: 100, step: 10, defaultValue: 80 },
        { id: "insideConc", name: "Konsentrasi Dalam Sel", unit: "mM", type: "slider", min: 0, max: 100, step: 10, defaultValue: 20 },
      ],
      defaultValues: { transportType: "simple", outsideConc: 80, insideConc: 20 },
    },
    sma: {
      variables: [
        { id: "transportType", name: "Mekanisme Transport", unit: "", type: "select", defaultValue: "facilitated", options: [
            { label: "Difusi Sederhana", value: "simple" },
            { label: "Difusi Terfasilitasi", value: "facilitated" },
            { label: "Osmosis", value: "osmosis" },
            { label: "Transport Aktif (Pompa Na+/K+)", value: "active" },
          ]
        },
        { id: "outsideConc", name: "Konsentrasi Luar ([C]_out)", unit: "mM", type: "slider", min: 0, max: 100, step: 5, defaultValue: 80 },
        { id: "insideConc", name: "Konsentrasi Dalam ([C]_in)", unit: "mM", type: "slider", min: 0, max: 100, step: 5, defaultValue: 20 },
        { id: "channelCount", name: "Jumlah Channel Protein", unit: "unit", type: "slider", min: 1, max: 10, step: 1, defaultValue: 4 },
        { id: "hasATP", name: "Ketersediaan Energi ATP", unit: "", type: "toggle", defaultValue: true },
      ],
      defaultValues: { transportType: "facilitated", outsideConc: 80, insideConc: 20, channelCount: 4, hasATP: true },
    },
  },
  metrics: {
    sd: [
      { id: "direction", label: "Arah Perpindahan", unit: "" },
      { id: "rate", label: "Kecepatan Pindah", unit: "molekul/s" },
      { id: "equilibrium", label: "Status Setimbang", unit: "" },
      { id: "energyReq", label: "Butuh Energi?", unit: "" },
    ],
    smp: [
      { id: "direction", label: "Arah Neto Molekul", unit: "" },
      { id: "rate", label: "Laju Difusi/Transport", unit: "arbitrer" },
      { id: "equilibrium", label: "Keseimbangan (Equilibrium)", unit: "" },
      { id: "energyReq", label: "Kebutuhan ATP", unit: "" },
    ],
    sma: [
      { id: "direction", label: "Vektor Fluks Neto (J)", unit: "" },
      { id: "rate", label: "Laju Fluks (J = P·ΔC)", unit: "mmol/m²/s" },
      { id: "equilibrium", label: "Potensial Membran / Status", unit: "" },
      { id: "energyReq", label: "Konsumsi Energi (ATP)", unit: "" },
    ],
  },
  presets: [
    {
      id: "gradient-diffusion",
      title: "Difusi Mengikuti Gradien",
      description: "Molekul bergerak spontan dari area konsentrasi tinggi ke rendah tanpa ATP.",
      values: { transportType: "simple", outsideConc: 90, insideConc: 10, channelCount: 5, hasATP: false, outsideCount: 35, insideCount: 5, membraneOpen: true },
    },
    {
      id: "osmosis-hypertonic",
      title: "Osmosis Larutan Hipertonik",
      description: "Air bergerak keluar sel menuju lingkungan luar dengan konsentrasi zat terlarut pekat.",
      values: { transportType: "osmosis", outsideConc: 90, insideConc: 20, channelCount: 5, hasATP: false, outsideCount: 35, insideCount: 5, membraneOpen: true },
    },
    {
      id: "active-against-gradient",
      title: "Transport Aktif Melawan Gradien",
      description: "Pompa memindahkan molekul dari konsentrasi rendah ke tinggi menggunakan ATP.",
      values: { transportType: "active", outsideConc: 20, insideConc: 80, channelCount: 4, hasATP: true, outsideCount: 10, insideCount: 30, membraneOpen: true },
    },
  ],
  discussions: {
    sd: {
      predict: "Ke mana molekul akan berpindah jika di luar sel ada 30 molekul dan di dalam hanya ada 10?",
      observe: "Amati pergerakan molekul melewati pintu sel sampai jumlah di kedua sisi seimbang.",
      conclude: "Molekul akan bergerak dari tempat yang ramai (pekat) ke tempat yang sepi sampai seimbang.",
    },
    smp: {
      predict: "Apakah transport aktif dapat bekerja jika sel kehabisan pasokan ATP?",
      observe: "Bandingkan arah perpindahan zat pada difusi biasa dibanding transport aktif.",
      conclude: "Difusi bersifat pasif mengikuti gradien konsentrasi, sedangkan transport aktif butuh energi ATP untuk melawan gradien.",
    },
    sma: {
      predict: "Bagaimana ketersediaan channel protein mempengaruhi laju difusi terfasilitasi pada molekul polar besar?",
      observe: "Amati hubungan linear antara jumlah channel protein terhadap fluks molekul terfasilitasi.",
      conclude: "Transport pasif: J = P × ([C]_out - [C]_in). Transport aktif memerlukan hidrolisis ATP.",
    },
  },
  concepts: {
    sd: {
      summary: "Membran sel seperti pintu pagar sel. Molekul berpindah dari tempat pekat ke tempat encer.",
    },
    smp: {
      summary: "Difusi dan osmosis adalah transport pasif tanpa energi. Transport aktif memerlukan energi ATP.",
      formulaText: "ΔC = C_luar - C_dalam  (Pasif: tinggi → rendah, Aktif: rendah → tinggi + ATP)",
    },
    sma: {
      summary: "Hukum Fick tentang difusi melintasi membran lipid bilayer & kinetika transport aktif terfasilitasi.",
      formulaText: "Fluks Neto (J) = Permeabilitas × (C_out - C_in) + J_aktif(ATP)",
    },
  },
  calculate: (inputs, elapsedTime, grade) => {
    let type = "simple";
    let cOut = 80;
    let cIn = 20;
    let channels = 4;
    let hasATP = true;

    if (grade === "sd") {
      cOut = Number(inputs.outsideCount ?? 30);
      cIn = Number(inputs.insideCount ?? 10);
      const open = Boolean(inputs.membraneOpen ?? true);
      type = "simple";
      if (!open) cOut = cIn; // no movement if closed
    } else if (grade === "smp") {
      type = String(inputs.transportType ?? "simple");
      cOut = Number(inputs.outsideConc ?? 80);
      cIn = Number(inputs.insideConc ?? 20);
    } else {
      type = String(inputs.transportType ?? "facilitated");
      cOut = Number(inputs.outsideConc ?? 80);
      cIn = Number(inputs.insideConc ?? 20);
      channels = Number(inputs.channelCount ?? 4);
      hasATP = Boolean(inputs.hasATP ?? true);
    }

    const deltaC = cOut - cIn;
    let direction = "Luar → Dalam";
    let rate = Math.abs(deltaC) * 0.5;
    let energyReq = "Tidak Perlu (Pasif)";
    let equilibrium = Math.abs(deltaC) < 5 ? "Setimbang (Isotonik)" : "Belum Setimbang";

    if (type === "osmosis") {
      direction = deltaC > 0 ? "Dalam → Luar (Sel Menyusut)" : "Luar → Dalam (Sel Membengkak)";
      energyReq = "Tidak Perlu (Pasif)";
    } else if (type === "active") {
      energyReq = "Memerlukan ATP ⚡";
      if (!hasATP) {
        rate = 0;
        direction = "Terhenti (Tanpa ATP)";
      } else {
        direction = "Luar → Dalam (Melawan Gradien)";
        rate = 45 + channels * 5;
      }
    } else if (type === "facilitated") {
      rate = Math.abs(deltaC) * 0.2 * channels;
      direction = deltaC > 0 ? "Luar → Dalam" : "Dalam → Luar";
    } else {
      direction = deltaC > 0 ? "Luar → Dalam" : "Dalam → Luar";
    }

    return {
      metrics: {
        direction,
        rate: +rate.toFixed(1),
        equilibrium,
        energyReq,
      },
      stageData: {
        type,
        cOut,
        cIn,
        channels,
        hasATP,
        direction,
        rate,
        elapsedTime,
      },
    };
  },
};
