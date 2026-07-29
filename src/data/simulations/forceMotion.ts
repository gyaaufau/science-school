import { SimulationDefinition } from "@/types/simulation";

export const forceMotionSimulation: SimulationDefinition = {
  id: "force-motion",
  subject: "physics",
  title: "Gaya dan Gerak",
  description: "Demonstrasi Hukum Newton II, pengaruh gaya dorong, massa benda, dan gaya gesek terhadap percepatan.",
  gradeConfigs: {
    sd: {
      variables: [
        {
          id: "forcePreset",
          name: "Besar Dorongan",
          unit: "",
          type: "select",
          defaultValue: "medium",
          options: [
            { label: "Kecil (20 N)", value: "small" },
            { label: "Sedang (50 N)", value: "medium" },
            { label: "Besar (100 N)", value: "large" },
          ],
        },
        {
          id: "massPreset",
          name: "Berat Benda",
          unit: "",
          type: "select",
          defaultValue: "medium",
          options: [
            { label: "Ringan (2 kg)", value: "light" },
            { label: "Sedang (5 kg)", value: "medium" },
            { label: "Berat (10 kg)", value: "heavy" },
          ],
        },
        {
          id: "frictionPreset",
          name: "Lantai Kasar (Gesekan)",
          unit: "",
          type: "toggle",
          defaultValue: false,
        },
      ],
      defaultValues: {
        forcePreset: "medium",
        massPreset: "medium",
        frictionPreset: false,
      },
    },
    smp: {
      variables: [
        {
          id: "appliedForce",
          name: "Gaya Dorong (F)",
          unit: "N",
          type: "slider",
          min: 0,
          max: 100,
          step: 5,
          defaultValue: 40,
        },
        {
          id: "mass",
          name: "Massa Benda (m)",
          unit: "kg",
          type: "slider",
          min: 1,
          max: 20,
          step: 1,
          defaultValue: 5,
        },
        {
          id: "frictionForce",
          name: "Gaya Gesek (f)",
          unit: "N",
          type: "slider",
          min: 0,
          max: 40,
          step: 2,
          defaultValue: 10,
        },
        {
          id: "duration",
          name: "Durasi Waktu (t)",
          unit: "s",
          type: "slider",
          min: 1,
          max: 10,
          step: 1,
          defaultValue: 5,
        },
      ],
      defaultValues: {
        appliedForce: 40,
        mass: 5,
        frictionForce: 10,
        duration: 5,
      },
    },
    sma: {
      variables: [
        {
          id: "appliedForce",
          name: "Gaya Dorong (F)",
          unit: "N",
          type: "slider",
          min: -100,
          max: 100,
          step: 5,
          defaultValue: 60,
        },
        {
          id: "mass",
          name: "Massa Benda (m)",
          unit: "kg",
          type: "slider",
          min: 1,
          max: 50,
          step: 1,
          defaultValue: 10,
        },
        {
          id: "mu",
          name: "Koefisien Gesek (μ)",
          unit: "",
          type: "slider",
          min: 0,
          max: 0.8,
          step: 0.05,
          defaultValue: 0.2,
        },
        {
          id: "initialVelocity",
          name: "Kecepatan Awal (v₀)",
          unit: "m/s",
          type: "slider",
          min: -10,
          max: 10,
          step: 1,
          defaultValue: 0,
        },
        {
          id: "duration",
          name: "Waktu Pengamatan (t)",
          unit: "s",
          type: "slider",
          min: 1,
          max: 15,
          step: 1,
          defaultValue: 5,
        },
      ],
      defaultValues: {
        appliedForce: 60,
        mass: 10,
        mu: 0.2,
        initialVelocity: 0,
        duration: 5,
      },
    },
  },
  metrics: {
    sd: [
      { id: "netForce", label: "Total Gaya", unit: "N" },
      { id: "acceleration", label: "Kecepatan Gerak", unit: "m/s²" },
      { id: "finalVelocity", label: "Laju Akhir", unit: "m/s" },
      { id: "distance", label: "Jarak Tempuh", unit: "m" },
    ],
    smp: [
      { id: "netForce", label: "Gaya Bersih (F_net)", unit: "N" },
      { id: "acceleration", label: "Percepatan (a)", unit: "m/s²" },
      { id: "finalVelocity", label: "Kecepatan Akhir (v)", unit: "m/s" },
      { id: "distance", label: "Jarak Tempuh (Δx)", unit: "m" },
    ],
    sma: [
      { id: "netForce", label: "Gaya Bersih (ΣF)", unit: "N" },
      { id: "acceleration", label: "Percepatan (a)", unit: "m/s²" },
      { id: "finalVelocity", label: "Kecepatan Akhir (v_t)", unit: "m/s" },
      { id: "distance", label: "Perpindahan (Δx)", unit: "m" },
    ],
  },
  presets: [
    {
      id: "same-force-diff-mass",
      title: "Gaya Sama, Massa Berbeda",
      description: "Gaya tetap 50N diterapkan pada massa ringan (2kg) dan berat (10kg).",
      values: { appliedForce: 50, mass: 2, frictionForce: 0, duration: 5, forcePreset: "medium", massPreset: "light", frictionPreset: false },
    },
    {
      id: "same-mass-diff-force",
      title: "Massa Sama, Gaya Berbeda",
      description: "Massa 5kg diberikan dorongan kecil (20N) versus dorongan besar (100N).",
      values: { appliedForce: 100, mass: 5, frictionForce: 10, duration: 5, forcePreset: "large", massPreset: "medium", frictionPreset: true },
    },
    {
      id: "friction-comparison",
      title: "Pengaruh Gesekan",
      description: "Benda bergerak di lantai licin (tanpa gesekan) dibanding lantai kasar.",
      values: { appliedForce: 40, mass: 5, frictionForce: 30, duration: 5, forcePreset: "medium", massPreset: "medium", frictionPreset: true },
    },
  ],
  discussions: {
    sd: {
      predict: "Apa yang terjadi pada benda berat jika didorong dengan gaya yang sama seperti benda ringan?",
      observe: "Perhatikan kotak di mana yang bergerak lebih cepat setelah didorong selama 5 detik.",
      conclude: "Semakin berat benda, semakin lambat gerakannya jika gaya dorong sama.",
    },
    smp: {
      predict: "Jika gaya gesek lebih besar dari gaya dorong, apakah benda akan meluncur maju?",
      observe: "Bandingkan nilai percepatan (a) saat gaya gesek dinaikkan mendekati gaya dorong.",
      conclude: "Percepatan sebanding dengan gaya bersih (F_net = F - f) dan berbanding terbalik dengan massa (a = F/m).",
    },
    sma: {
      predict: "Bagaimana koefisien gesek μ mempengaruhi percepatan saat benda bergerak dengan kecepatan awal v₀?",
      observe: "Amati bagaimana gaya gesek f = μ × m × g memperlambat atau menahan gerak benda.",
      conclude: "Hukum II Newton ΣF = m·a menentukan arah dan nilai percepatan konstan.",
    },
  },
  concepts: {
    sd: {
      summary: "Gaya adalah dorongan atau tarikan. Gaya membuat benda diam menjadi bergerak. Semakin besar dorongan, semakin cepat benda bergerak.",
    },
    smp: {
      summary: "Hukum II Newton menyatakan bahwa percepatan benda sebanding dengan gaya bersih dan berbanding terbalik dengan massanya.",
      formulaText: "a = F_net / m = (F_dorong - F_gesek) / m",
    },
    sma: {
      summary: "Persamaan gerak lurus berubah beraturan (GLBB) di bawah pengaruh gaya dorong dan gesekan kinetik konstan.",
      formulaText: "ΣF = F - μ·m·g = m·a  ⇒  v(t) = v₀ + a·t  ⇒  x(t) = v₀·t + ½·a·t²",
    },
  },
  calculate: (inputs, elapsedTime, grade) => {
    let F = 0;
    let m = 1;
    let f = 0;
    let v0 = 0;
    const g = 9.8;

    if (grade === "sd") {
      const forceVal = inputs.forcePreset === "small" ? 20 : inputs.forcePreset === "large" ? 100 : 50;
      const massVal = inputs.massPreset === "light" ? 2 : inputs.massPreset === "heavy" ? 10 : 5;
      const fricVal = inputs.frictionPreset ? 15 : 0;
      F = forceVal;
      m = massVal;
      f = fricVal;
    } else if (grade === "smp") {
      F = Number(inputs.appliedForce ?? 40);
      m = Number(inputs.mass ?? 5);
      f = Number(inputs.frictionForce ?? 10);
    } else {
      F = Number(inputs.appliedForce ?? 60);
      m = Number(inputs.mass ?? 10);
      const mu = Number(inputs.mu ?? 0.2);
      f = mu * m * g;
      v0 = Number(inputs.initialVelocity ?? 0);
    }

    // Determine Net Force
    let Fnet = 0;
    if (F > 0) {
      Fnet = Math.max(0, F - f);
    } else if (F < 0) {
      Fnet = Math.min(0, F + f);
    } else {
      Fnet = 0;
    }

    const acceleration = Fnet / m;
    const currentT = Math.max(0, elapsedTime);

    const currentVelocity = v0 + acceleration * currentT;
    const currentDistance = v0 * currentT + 0.5 * acceleration * Math.pow(currentT, 2);

    return {
      metrics: {
        netForce: +Fnet.toFixed(1),
        acceleration: +acceleration.toFixed(2),
        finalVelocity: +currentVelocity.toFixed(2),
        distance: +Math.max(0, currentDistance).toFixed(2),
      },
      stageData: {
        appliedForce: F,
        frictionForce: f,
        netForce: Fnet,
        mass: m,
        acceleration,
        velocity: currentVelocity,
        distance: Math.max(0, currentDistance),
        elapsedTime: currentT,
      },
    };
  },
};
