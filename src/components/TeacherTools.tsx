"use client";

import React, { useState } from "react";
import { ComparisonSnapshot, ConceptContent, DiscussionContent, GradeId, Preset } from "@/types/simulation";
import styles from "./TeacherTools.module.css";

interface TeacherToolsProps {
  grade: GradeId;
  presets: Preset[];
  onApplyPreset: (preset: Preset) => void;
  discussion: DiscussionContent;
  concept: ConceptContent;
  showFormula: boolean;
  onToggleFormula: () => void;
  currentInputs: Record<string, any>;
  currentMetrics: Record<string, any>;
  comparisonA: ComparisonSnapshot | null;
  onSaveComparisonA: () => void;
  onClearComparison: () => void;
}

export default function TeacherTools({
  grade,
  presets,
  onApplyPreset,
  discussion,
  concept,
  showFormula,
  onToggleFormula,
  currentInputs,
  currentMetrics,
  comparisonA,
  onSaveComparisonA,
  onClearComparison,
}: TeacherToolsProps) {
  const [activeTab, setActiveTab] = useState<"presets" | "discussion" | "concept" | "compare">("presets");

  return (
    <div className={styles.container}>
      {/* Tab Selectors */}
      <div className={styles.tabHeaders}>
        <button
          onClick={() => setActiveTab("presets")}
          className={`${styles.tabBtn} ${activeTab === "presets" ? styles.activeTab : ""}`}
        >
          ⚡ Preset Eksperimen ({presets.length})
        </button>
        <button
          onClick={() => setActiveTab("discussion")}
          className={`${styles.tabBtn} ${activeTab === "discussion" ? styles.activeTab : ""}`}
        >
          💬 Pertanyaan Diskusi
        </button>
        <button
          onClick={() => setActiveTab("concept")}
          className={`${styles.tabBtn} ${activeTab === "concept" ? styles.activeTab : ""}`}
        >
          📖 Konsep & Rumus
        </button>
        <button
          onClick={() => setActiveTab("compare")}
          className={`${styles.tabBtn} ${activeTab === "compare" ? styles.activeTab : ""}`}
        >
          ⚖️ Compare Mode {comparisonA ? "(Tersimpan A)" : ""}
        </button>
      </div>

      {/* Tab Content Box */}
      <div className={styles.tabBody}>
        {/* Presets */}
        {activeTab === "presets" && (
          <div className={styles.presetsGrid}>
            {presets.map((p) => (
              <div key={p.id} className={styles.presetCard}>
                <div className={styles.presetHeader}>
                  <h4 className={styles.presetTitle}>{p.title}</h4>
                  <button onClick={() => onApplyPreset(p)} className={styles.applyBtn}>
                    Gunakan Preset ➔
                  </button>
                </div>
                <p className={styles.presetDesc}>{p.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Discussion Questions */}
        {activeTab === "discussion" && (
          <div className={styles.discussionBox}>
            <div className={styles.qCard}>
              <span className={styles.qBadge}>1. Prediksi (Sebelum)</span>
              <p className={styles.qText}>{discussion.predict}</p>
            </div>
            <div className={styles.qCard}>
              <span className={styles.qBadge}>2. Observasi (Saat Simulasi)</span>
              <p className={styles.qText}>{discussion.observe}</p>
            </div>
            <div className={styles.qCard}>
              <span className={styles.qBadge}>3. Kesimpulan (Setelah)</span>
              <p className={styles.qText}>{discussion.conclude}</p>
            </div>
          </div>
        )}

        {/* Concept & Formula */}
        {activeTab === "concept" && (
          <div className={styles.conceptBox}>
            <div className={styles.summaryBox}>
              <h4 className={styles.conceptTitle}>Ringkasan Konsep Edutainment ({grade.toUpperCase()})</h4>
              <p className={styles.conceptSummary}>{concept.summary}</p>
            </div>

            {concept.formulaText && (
              <div className={styles.formulaBox}>
                <div className={styles.formulaHeader}>
                  <h4 className={styles.conceptTitle}>Persamaan Matematis / Model</h4>
                  <button onClick={onToggleFormula} className={styles.toggleFormulaBtn}>
                    {showFormula ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </div>
                {(showFormula || grade === "sma") && (
                  <div className={styles.formulaCode}>{concept.formulaText}</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Compare Mode */}
        {activeTab === "compare" && (
          <div className={styles.compareBox}>
            <div className={styles.compareActions}>
              <button onClick={onSaveComparisonA} className={styles.saveABtn}>
                📌 Simpan Kondisi Saat Ini sebagai Percobaan A
              </button>
              {comparisonA && (
                <button onClick={onClearComparison} className={styles.clearBtn}>
                  🗑️ Reset Comparison
                </button>
              )}
            </div>

            {comparisonA ? (
              <div className={styles.tableWrapper}>
                <h4 className={styles.tableTitle}>Tabel Perbandingan Experiment A vs B</h4>
                <table className={styles.compareTable}>
                  <thead>
                    <tr>
                      <th>Parameter Metrik</th>
                      <th>Percobaan A (Tersimpan)</th>
                      <th>Percobaan B (Saat Ini)</th>
                      <th>Perubahan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(currentMetrics).map((key) => {
                      const valA = comparisonA.metrics[key];
                      const valB = currentMetrics[key];

                      let change = "Konstan";
                      if (typeof valA === "number" && typeof valB === "number") {
                        if (valB > valA) change = "⬆️ Naik";
                        else if (valB < valA) change = "⬇️ Turun";
                      } else if (valA !== valB) {
                        change = "🔀 Berubah";
                      }

                      return (
                        <tr key={key}>
                          <td className={styles.paramName}>{key}</td>
                          <td className={styles.valCol}>{valA !== undefined ? String(valA) : "—"}</td>
                          <td className={styles.valCol}>{valB !== undefined ? String(valB) : "—"}</td>
                          <td className={styles.changeCol}>{change}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.compareHint}>
                💡 Belum ada data Percobaan A tersimpan. Atur variabel lalu klik tombol &quot;Simpan Kondisi Saat Ini sebagai Percobaan A&quot; di atas.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
