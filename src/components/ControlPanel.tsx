"use client";

import React from "react";
import { GradeId, ObservationMetric, VariableControlConfig } from "@/types/simulation";
import styles from "./ControlPanel.module.css";

interface ControlPanelProps {
  grade: GradeId;
  variables: VariableControlConfig[];
  inputs: Record<string, any>;
  onInputChange: (id: string, val: any) => void;
  metrics: ObservationMetric[];
  calculatedMetrics: Record<string, any>;
  predictMode: boolean;
  showFormula: boolean;
  onToggleFormula: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  showVectors: boolean;
  onToggleVectors: () => void;
}

export default function ControlPanel({
  variables,
  inputs,
  onInputChange,
  metrics,
  calculatedMetrics,
  predictMode,
  showFormula,
  onToggleFormula,
  showLabels,
  onToggleLabels,
  showVectors,
  onToggleVectors,
}: ControlPanelProps) {
  return (
    <div className={styles.panel}>
      {/* 1. Variable Controls Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>⚙️ Kontrol Variabel</h3>
        <div className={styles.controlsList}>
          {variables.map((v) => {
            const currentVal = inputs[v.id] ?? v.defaultValue;

            return (
              <div key={v.id} className={styles.controlGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.label}>{v.name}</label>
                  <span className={styles.valueBadge}>
                    {String(currentVal)} {v.unit}
                  </span>
                </div>

                {v.type === "slider" && (
                  <div className={styles.sliderRow}>
                    <span className={styles.rangeLimit}>{v.min}</span>
                    <input
                      type="range"
                      min={v.min}
                      max={v.max}
                      step={v.step ?? 1}
                      value={Number(currentVal)}
                      onChange={(e) => onInputChange(v.id, Number(e.target.value))}
                      className={styles.slider}
                    />
                    <span className={styles.rangeLimit}>{v.max}</span>
                  </div>
                )}

                {v.type === "select" && (
                  <select
                    value={String(currentVal)}
                    onChange={(e) => onInputChange(v.id, e.target.value)}
                    className={styles.selectInput}
                  >
                    {v.options?.map((opt) => (
                      <option key={String(opt.value)} value={String(opt.value)}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {v.type === "toggle" && (
                  <label className={styles.toggleRow}>
                    <input
                      type="checkbox"
                      checked={Boolean(currentVal)}
                      onChange={(e) => onInputChange(v.id, e.target.checked)}
                      className={styles.checkbox}
                    />
                    <span>{Boolean(currentVal) ? "Aktif (ON)" : "Nonaktif (OFF)"}</span>
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Observation Results Section (Max 4 metrics) */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📊 Hasil Observasi Data</h3>
        <div className={styles.metricsGrid}>
          {metrics.slice(0, 4).map((m) => {
            const val = calculatedMetrics[m.id];
            const displayVal = predictMode ? "—" : val !== undefined ? String(val) : "0";

            return (
              <div key={m.id} className={styles.metricCard}>
                <span className={styles.metricLabel}>{m.label}</span>
                <span className={styles.metricValue}>
                  {displayVal} <span className={styles.metricUnit}>{!predictMode && m.unit}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Display Toggles Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>👁️ Opsi Tampilan Visual</h3>
        <div className={styles.togglesGrid}>
          <button
            onClick={onToggleFormula}
            className={`${styles.toggleBtn} ${showFormula ? styles.toggleActive : ""}`}
          >
            {showFormula ? "✅ Rumus" : "📐 Tampilkan Rumus"}
          </button>
          <button
            onClick={onToggleLabels}
            className={`${styles.toggleBtn} ${showLabels ? styles.toggleActive : ""}`}
          >
            {showLabels ? "✅ Label" : "🏷️ Tampilkan Label"}
          </button>
          <button
            onClick={onToggleVectors}
            className={`${styles.toggleBtn} ${showVectors ? styles.toggleActive : ""}`}
          >
            {showVectors ? "✅ Vektor" : "↗️ Panah Vektor"}
          </button>
        </div>
      </div>
    </div>
  );
}
