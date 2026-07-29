"use client";

import React from "react";
import { GradeId, ObservationMetric, VariableControlConfig } from "@/types/simulation";
import styles from "./InspectorPanel.module.css";

interface InspectorPanelProps {
  grade: GradeId;
  variables: VariableControlConfig[];
  inputs: Record<string, any>;
  onInputChange: (id: string, val: any) => void;
  formulaText?: string;
  showFormula: boolean;
  onToggleFormula: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  showVectors: boolean;
  onToggleVectors: () => void;
  predictMode: boolean;
  onTogglePredictMode: () => void;
}

export default function InspectorPanel({
  grade,
  variables,
  inputs,
  onInputChange,
  formulaText,
  showFormula,
  onToggleFormula,
  showLabels,
  onToggleLabels,
  showVectors,
  onToggleVectors,
  predictMode,
  onTogglePredictMode,
}: InspectorPanelProps) {
  return (
    <aside className={styles.inspector}>
      {/* 1. Variable Controls Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Kontrol Variabel</h3>
        <div className={styles.variablesList}>
          {variables.map((v) => {
            const currentVal = inputs[v.id] ?? v.defaultValue;

            return (
              <div key={v.id} className={styles.variableRow}>
                <div className={styles.topRow}>
                  <label className={styles.varLabel}>{v.name}</label>
                  <div className={styles.valueBoxGroup}>
                    <span className={`${styles.numBox} tabular-nums`}>
                      {String(currentVal)}
                    </span>
                    {v.unit && <span className={styles.unitText}>{v.unit}</span>}
                  </div>
                </div>

                {v.type === "slider" && (
                  <div className={styles.sliderContainer}>
                    <input
                      type="range"
                      min={v.min}
                      max={v.max}
                      step={v.step ?? 1}
                      value={Number(currentVal)}
                      onChange={(e) => onInputChange(v.id, Number(e.target.value))}
                      className={styles.sliderTrack}
                    />
                    <div className={styles.sliderTicks}>
                      <span>{v.min}</span>
                      <span>{v.max}</span>
                    </div>
                  </div>
                )}

                {v.type === "select" && (
                  <select
                    value={String(currentVal)}
                    onChange={(e) => onInputChange(v.id, e.target.value)}
                    className={styles.selectBox}
                  >
                    {v.options?.map((opt) => (
                      <option key={String(opt.value)} value={String(opt.value)}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {v.type === "toggle" && (
                  <label className={styles.toggleLabel}>
                    <input
                      type="checkbox"
                      checked={Boolean(currentVal)}
                      onChange={(e) => onInputChange(v.id, e.target.checked)}
                      className={styles.checkboxInput}
                    />
                    <span>{Boolean(currentVal) ? "Aktif" : "Nonaktif"}</span>
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Formula Panel */}
      {formulaText && (
        <div className={styles.section}>
          <div className={styles.sectionHeaderRow}>
            <h3 className={styles.sectionTitle}>Rumus Utama</h3>
            <button onClick={onToggleFormula} className={styles.textLinkBtn}>
              {showFormula ? "Sembunyikan" : "Tampilkan"}
            </button>
          </div>

          {(showFormula || grade === "sma") && (
            <div className={`${styles.formulaBox} tabular-nums`}>
              {formulaText}
            </div>
          )}
        </div>
      )}

      {/* 3. Display Toggles Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Tampilan</h3>
        <div className={styles.togglesList}>
          <label className={styles.toggleRow}>
            <input
              type="checkbox"
              checked={showLabels}
              onChange={onToggleLabels}
              className={styles.checkboxInput}
            />
            <span>Tampilkan Label</span>
          </label>

          <label className={styles.toggleRow}>
            <input
              type="checkbox"
              checked={showVectors}
              onChange={onToggleVectors}
              className={styles.checkboxInput}
            />
            <span>Tampilkan Panah Vektor</span>
          </label>

          <label className={styles.toggleRow}>
            <input
              type="checkbox"
              checked={predictMode}
              onChange={onTogglePredictMode}
              className={styles.checkboxInput}
            />
            <span>Predict Mode (Sembunyikan Hasil)</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
