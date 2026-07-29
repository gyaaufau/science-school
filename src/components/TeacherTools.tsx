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
  currentInputs: Record<string, any>;
  currentMetrics: Record<string, any>;
  comparisonA: ComparisonSnapshot | null;
  onSaveComparisonA: () => void;
  onClearComparison: () => void;
}

export default function TeacherTools({
  presets,
  onApplyPreset,
  discussion,
  concept,
  currentMetrics,
  comparisonA,
  onSaveComparisonA,
  onClearComparison,
}: TeacherToolsProps) {
  const [activeTab, setActiveTab] = useState<"presets" | "concept" | "compare">("presets");

  return (
    <div className={styles.teachingPanel}>
      {/* Internal Tabs Bar */}
      <div className={styles.tabBar}>
        <button
          onClick={() => setActiveTab("presets")}
          className={`${styles.tabBtn} ${activeTab === "presets" ? styles.activeTab : ""}`}
        >
          Preset & Panduan
        </button>
        <button
          onClick={() => setActiveTab("concept")}
          className={`${styles.tabBtn} ${activeTab === "concept" ? styles.activeTab : ""}`}
        >
          Konsep & Diskusi
        </button>
        <button
          onClick={() => setActiveTab("compare")}
          className={`${styles.tabBtn} ${activeTab === "compare" ? styles.activeTab : ""}`}
        >
          Bandingkan {comparisonA ? "(Tersimpan A)" : ""}
        </button>
      </div>

      {/* Tab Body Content */}
      <div className={styles.panelBody}>
        {/* Presets & Panduan */}
        {activeTab === "presets" && (
          <div className={styles.presetsRow}>
            {presets.map((p) => (
              <div key={p.id} className={styles.presetCard}>
                <div className={styles.presetTop}>
                  <span className={styles.presetTitle}>{p.title}</span>
                  <button onClick={() => onApplyPreset(p)} className="btn-secondary" style={{ padding: "4px 10px", minHeight: "32px", fontSize: "12px" }}>
                    Muat Variable
                  </button>
                </div>
                <p className={styles.presetDesc}>{p.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Konsep */}
        {activeTab === "concept" && (
          <div className={styles.conceptGrid}>
            <div className={styles.conceptCard}>
              <h4 className={styles.cardHeading}>Ringkasan Konsep</h4>
              <p className={styles.cardText}>{concept.summary}</p>
            </div>
            <div className={styles.conceptCard}>
              <h4 className={styles.cardHeading}>Pertanyaan Diskusi Kelas</h4>
              <ul className={styles.discussionList}>
                <li><strong>Prediksi:</strong> {discussion.predict}</li>
                <li><strong>Observasi:</strong> {discussion.observe}</li>
                <li><strong>Kesimpulan:</strong> {discussion.conclude}</li>
              </ul>
            </div>
          </div>
        )}

        {/* Bandingkan */}
        {activeTab === "compare" && (
          <div className={styles.compareContainer}>
            <div className={styles.compareHeaderRow}>
              <button onClick={onSaveComparisonA} className="btn-primary" style={{ minHeight: "36px", fontSize: "13px" }}>
                Simpan sebagai Percobaan A
              </button>
              {comparisonA && (
                <button onClick={onClearComparison} className="btn-secondary" style={{ minHeight: "36px", fontSize: "13px" }}>
                  Reset Perbandingan
                </button>
              )}
            </div>

            {comparisonA ? (
              <div className={styles.tableWrapper}>
                <table className={styles.compareTable}>
                  <thead>
                    <tr>
                      <th>Parameter Metrik</th>
                      <th>Percobaan A</th>
                      <th>Percobaan B (Saat Ini)</th>
                      <th>Perubahan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(currentMetrics).map((key) => {
                      const valA = comparisonA.metrics[key];
                      const valB = currentMetrics[key];

                      let change = "tetap";
                      if (typeof valA === "number" && typeof valB === "number") {
                        if (valB > valA) change = "naik";
                        else if (valB < valA) change = "turun";
                      } else if (valA !== valB) {
                        change = "berubah";
                      }

                      return (
                        <tr key={key}>
                          <td className={styles.paramCell}>{key}</td>
                          <td className="tabular-nums">{valA !== undefined ? String(valA) : "—"}</td>
                          <td className="tabular-nums">{valB !== undefined ? String(valB) : "—"}</td>
                          <td className={styles.statusCell}>
                            <span className={`${styles.statusBadge} ${styles[change] || ""}`}>
                              {change}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.compareHint}>
                Atur variabel simulasi, lalu klik &quot;Simpan sebagai Percobaan A&quot; untuk mulai membandingkan dua kondisi eksperimen.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
