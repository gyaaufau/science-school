"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./InteractiveLab.module.css";

interface ElementPreset {
  name: string;
  electrons: number;
  color: string;
  symbol: string;
  atomicNum: number;
  description: string;
}

const PRESETS: ElementPreset[] = [
  { name: "Hydrogen (H)", electrons: 1, color: "#00f2fe", symbol: "H", atomicNum: 1, description: "Simplest quantum state with a single electron wave function." },
  { name: "Carbon (C)", electrons: 6, color: "#10b981", symbol: "C", atomicNum: 6, description: "Tetravalent structure enabling organic chemistry and life foundations." },
  { name: "Neon (Ne)", electrons: 10, color: "#ec4899", symbol: "Ne", atomicNum: 10, description: "Stable noble gas configuration with full valence shell glow." },
  { name: "Quantum Exotic (Qx)", electrons: 16, color: "#7f00ff", symbol: "Qx", atomicNum: 118, description: "Hypothetical superheavy element with relativistic electron dynamics." },
];

export default function InteractiveLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<ElementPreset>(PRESETS[0]);
  const [speed, setSpeed] = useState<number>(1.5);
  const [electronsCount, setElectronsCount] = useState<number>(1);
  const [showWaves, setShowWaves] = useState<boolean>(true);
  const [energyLevel, setEnergyLevel] = useState<number>(3);
  const [labMetrics, setLabMetrics] = useState({ fps: 60, particles: 1, temperatureK: 298.15 });

  useEffect(() => {
    setElectronsCount(selectedPreset.electrons);
  }, [selectedPreset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 420;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const render = (currentTime: number) => {
      frameCount++;
      if (currentTime - lastTime >= 1000) {
        setLabMetrics((prev) => ({ ...prev, fps: Math.round((frameCount * 1000) / (currentTime - lastTime)) }));
        frameCount = 0;
        lastTime = currentTime;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw Outer Glow / Energy Field
      const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 180);
      gradient.addColorStop(0, "rgba(0, 242, 254, 0.15)");
      gradient.addColorStop(0.5, "rgba(127, 0, 255, 0.05)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 180, 0, Math.PI * 2);
      ctx.fill();

      // Draw Nucleus
      ctx.shadowBlur = 20;
      ctx.shadowColor = selectedPreset.color;
      ctx.fillStyle = selectedPreset.color;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Nucleus Symbol Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px var(--font-heading), sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(selectedPreset.symbol, centerX, centerY);

      // Draw Orbits & Electrons
      const totalRings = Math.min(4, Math.ceil(electronsCount / 4));
      let renderedElectrons = 0;

      angle += 0.015 * speed;

      for (let ring = 1; ring <= totalRings; ring++) {
        const ringRadius = ring * 45 + 25;
        const ringElectrons = Math.min(electronsCount - renderedElectrons, ring * 3 + 1);

        // Orbit path
        ctx.beginPath();
        ctx.strokeStyle = showWaves ? "rgba(0, 242, 254, 0.25)" : "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = showWaves ? 1.5 : 1;
        if (showWaves) ctx.setLineDash([4, 6]);
        else ctx.setLineDash([]);
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Electrons on this ring
        for (let i = 0; i < ringElectrons; i++) {
          const electronAngle = angle * (ring % 2 === 0 ? 1 : -0.8) + (i * Math.PI * 2) / ringElectrons;
          const ex = centerX + Math.cos(electronAngle) * ringRadius;
          const ey = centerY + Math.sin(electronAngle) * ringRadius;

          // Wave probability cloud trail
          if (showWaves) {
            ctx.beginPath();
            ctx.strokeStyle = selectedPreset.color;
            ctx.lineWidth = 2;
            ctx.setLineDash([]);
            ctx.arc(centerX, centerY, ringRadius, electronAngle - 0.3, electronAngle);
            ctx.stroke();
          }

          // Electron dot
          ctx.beginPath();
          ctx.fillStyle = "#ffffff";
          ctx.shadowBlur = 12;
          ctx.shadowColor = selectedPreset.color;
          ctx.arc(ex, ey, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          renderedElectrons++;
        }
      }

      setLabMetrics((prev) => ({
        ...prev,
        particles: renderedElectrons + 1,
        temperatureK: +(298.15 + (energyLevel * 12.5)).toFixed(1),
      }));

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [speed, electronsCount, showWaves, energyLevel, selectedPreset]);

  return (
    <section id="lab" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.tag}>VIRTUAL SCIENCE LABORATORY</div>
        <h2 className={styles.title}>
          Interactive Quantum & <span className="gradient-text">Atomic Simulation</span>
        </h2>
        <p className={styles.subtitle}>
          Real-time particle dynamics, probability cloud rendering, and valence shell configuration.
        </p>
      </div>

      <div className={styles.labGrid}>
        {/* Controls Panel */}
        <div className={`glass-card ${styles.controlPanel}`}>
          <h3 className={styles.panelTitle}>⚙️ Lab Parameters</h3>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Element Configuration</label>
            <div className={styles.presetButtons}>
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedPreset(p)}
                  className={`${styles.presetBtn} ${selectedPreset.name === p.name ? styles.activePreset : ""}`}
                >
                  <span className={styles.presetSymbol} style={{ color: p.color }}>{p.symbol}</span>
                  <span>{p.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.controlGroup}>
            <div className={styles.labelRow}>
              <label className={styles.label}>Electron Orbital Count</label>
              <span className={styles.valueDisplay}>{electronsCount} e⁻</span>
            </div>
            <input
              type="range"
              min={1}
              max={16}
              value={electronsCount}
              onChange={(e) => setElectronsCount(Number(e.target.value))}
              className={styles.rangeInput}
            />
          </div>

          <div className={styles.controlGroup}>
            <div className={styles.labelRow}>
              <label className={styles.label}>Orbital Velocity</label>
              <span className={styles.valueDisplay}>{speed}x</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={4.0}
              step={0.1}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className={styles.rangeInput}
            />
          </div>

          <div className={styles.controlGroup}>
            <div className={styles.labelRow}>
              <label className={styles.label}>Excitation State (n)</label>
              <span className={styles.valueDisplay}>n = {energyLevel}</span>
            </div>
            <input
              type="range"
              min={1}
              max={7}
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className={styles.rangeInput}
            />
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={showWaves}
                onChange={(e) => setShowWaves(e.target.checked)}
                className={styles.checkbox}
              />
              <span>Render Quantum Wave Probability Cloud</span>
            </label>
          </div>

          <div className={styles.infoBox}>
            <p className={styles.infoText}>{selectedPreset.description}</p>
          </div>
        </div>

        {/* Canvas & Realtime Metrics */}
        <div className={`glass-card ${styles.canvasWrapper}`}>
          <div className={styles.metricsBar}>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>ELEMENT</span>
              <span className={styles.metricVal} style={{ color: selectedPreset.color }}>{selectedPreset.name}</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>SYSTEM TEMP</span>
              <span className={styles.metricVal}>{labMetrics.temperatureK} K</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>PARTICLES</span>
              <span className={styles.metricVal}>{labMetrics.particles} Active</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>RENDER FPS</span>
              <span className={styles.metricVal}>{labMetrics.fps} FPS</span>
            </div>
          </div>

          <div className={styles.canvasContainer}>
            <canvas ref={canvasRef} className={styles.canvas} />
          </div>

          <div className={styles.canvasFooter}>
            <span>💡 Tip: Adjust excitation state or element preset to observe quantum ring shift.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
