"use client";

import React from "react";
import { ObservationMetric } from "@/types/simulation";
import styles from "./ResultsReadouts.module.css";

interface ResultsReadoutsProps {
  metrics: ObservationMetric[];
  calculatedValues: Record<string, any>;
  predictMode: boolean;
}

export default function ResultsReadouts({
  metrics,
  calculatedValues,
  predictMode,
}: ResultsReadoutsProps) {
  // Max 4 readouts as specified in PRD & DESIGN.md
  const activeMetrics = metrics.slice(0, 4);

  return (
    <div className={styles.readoutsGrid}>
      {activeMetrics.map((m) => {
        const val = calculatedValues[m.id];
        const displayVal = predictMode ? "—" : val !== undefined ? String(val) : "0";

        return (
          <div key={m.id} className={styles.readoutCard}>
            <span className={styles.label}>{m.label}</span>
            <div className={styles.valueRow}>
              <span className={`${styles.value} tabular-nums`}>{displayVal}</span>
              {!predictMode && m.unit && (
                <span className={styles.unit}>{m.unit}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
