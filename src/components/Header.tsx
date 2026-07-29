"use client";

import React from "react";
import { GradeId } from "@/types/simulation";
import styles from "./Header.module.css";

interface HeaderProps {
  activeGrade: GradeId;
  onGradeChange: (grade: GradeId) => void;
  presentationMode: boolean;
  onTogglePresentation: () => void;
  predictMode: boolean;
  onTogglePredict: () => void;
}

export default function Header({
  activeGrade,
  onGradeChange,
  presentationMode,
  onTogglePresentation,
  predictMode,
  onTogglePredict,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brandGroup}>
        <div className={styles.logoBadge}>🔬</div>
        <div>
          <h1 className={styles.title}>Science Lab Interactive</h1>
          <p className={styles.subtitle}>Alat Demonstrasi Sains Kelas Interaktif</p>
        </div>
      </div>

      <div className={styles.controlsGroup}>
        {/* Grade Selector */}
        <div className={styles.gradeSelector}>
          <span className={styles.gradeLabel}>Jenjang:</span>
          {(["sd", "smp", "sma"] as GradeId[]).map((g) => (
            <button
              key={g}
              onClick={() => onGradeChange(g)}
              className={`${styles.gradeBtn} ${activeGrade === g ? styles.activeGrade : ""}`}
            >
              {g.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Predict Mode Toggle */}
        <button
          onClick={onTogglePredict}
          className={`${styles.toolBtn} ${predictMode ? styles.activePredict : ""}`}
          title="Sembunyikan hasil untuk meminta prediksi siswa"
        >
          {predictMode ? "❓ Predict: ON" : "❓ Predict Mode"}
        </button>

        {/* Presentation Mode Toggle */}
        <button
          onClick={onTogglePresentation}
          className={`${styles.toolBtn} ${presentationMode ? styles.activePresent : ""}`}
          title="Perbesar tampilan simulasi untuk proyektor"
        >
          {presentationMode ? "📺 Exit Full Display" : "📺 Mode Presentasi"}
        </button>
      </div>
    </header>
  );
}
