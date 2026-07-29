"use client";

import React from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  presentationMode: boolean;
  onTogglePresentation: () => void;
}

export default function Header({
  presentationMode,
  onTogglePresentation,
}: HeaderProps) {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.brandGroup}>
        <div className={styles.logoBadge}>🔬</div>
        <div className={styles.titleGroup}>
          <h1 className={styles.brandName}>ScienceLab</h1>
          <span className={styles.brandSub}>Interactive</span>
        </div>
      </div>

      <div className={styles.actionsGroup}>
        <button
          onClick={onTogglePresentation}
          className={`btn-secondary ${presentationMode ? styles.activePresent : ""}`}
          title="Mode Presentasi Proyektor"
        >
          <span>📺</span>
          <span>{presentationMode ? "Keluar Presentasi" : "Presentasi"}</span>
        </button>

        <button
          onClick={toggleFullscreen}
          className={styles.iconBtn}
          title="Layar Penuh"
        >
          ⛶
        </button>
      </div>
    </header>
  );
}
