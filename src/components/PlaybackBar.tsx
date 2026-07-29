"use client";

import React from "react";
import styles from "./PlaybackBar.module.css";

interface PlaybackBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStep: () => void;
  onReset: () => void;
  playbackSpeed: 0.5 | 1 | 2;
  onSpeedChange: (speed: 0.5 | 1 | 2) => void;
}

export default function PlaybackBar({
  isPlaying,
  onTogglePlay,
  onStep,
  onReset,
  playbackSpeed,
  onSpeedChange,
}: PlaybackBarProps) {
  return (
    <div className={styles.barContainer}>
      <div className={styles.leftGroup}>
        {/* Mulai (Primary) / Jeda */}
        <button
          onClick={onTogglePlay}
          className={isPlaying ? "btn-secondary" : "btn-primary"}
        >
          {isPlaying ? "⏸ Jeda" : "▶ Mulai"}
        </button>

        {/* Langkah */}
        <button onClick={onStep} className="btn-secondary" title="Majukan 0.5 detik">
          ⏭ Langkah
        </button>

        {/* Reset */}
        <button onClick={onReset} className="btn-secondary" title="Reset waktu">
          🔄 Reset
        </button>
      </div>

      <div className={styles.rightGroup}>
        <span className={styles.speedLabel}>Kecepatan Simulasi</span>
        <div className={styles.segmentedControl}>
          {([0.5, 1, 2] as const).map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`${styles.speedBtn} ${playbackSpeed === s ? styles.activeSpeed : ""}`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
