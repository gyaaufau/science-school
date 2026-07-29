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
  elapsedTime: number;
}

export default function PlaybackBar({
  isPlaying,
  onTogglePlay,
  onStep,
  onReset,
  playbackSpeed,
  onSpeedChange,
  elapsedTime,
}: PlaybackBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.controlsGroup}>
        {/* Play / Pause */}
        <button onClick={onTogglePlay} className={styles.playBtn}>
          {isPlaying ? "⏸️ Pause" : "▶️ Play"}
        </button>

        {/* Step Forward */}
        <button onClick={onStep} className={styles.stepBtn} title="Majukan simulasi 0.5 detik">
          ⏭️ Step (+0.5s)
        </button>

        {/* Reset */}
        <button onClick={onReset} className={styles.resetBtn} title="Reset waktu dan posisi">
          🔄 Reset
        </button>
      </div>

      <div className={styles.timeGroup}>
        <span className={styles.timeLabel}>Durasi Waktu:</span>
        <span className={styles.timeVal}>{elapsedTime.toFixed(1)} s</span>
      </div>

      {/* Speed Multipliers */}
      <div className={styles.speedGroup}>
        <span className={styles.speedLabel}>Kecepatan:</span>
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
  );
}
