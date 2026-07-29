"use client";

import React from "react";
import { SubjectId } from "@/types/simulation";
import { SUBJECT_SIMULATIONS } from "@/data/simulations";
import styles from "./SimulationTabs.module.css";

interface SimulationTabsProps {
  activeSubject: SubjectId;
  activeSimulation: string;
  onSimulationChange: (simId: string) => void;
}

export default function SimulationTabs({
  activeSubject,
  activeSimulation,
  onSimulationChange,
}: SimulationTabsProps) {
  const simList = SUBJECT_SIMULATIONS[activeSubject] || [];

  return (
    <div className={styles.container}>
      {/* Desktop & Tablet Tabs */}
      <div className={styles.desktopTabs}>
        {simList.map((sim) => (
          <button
            key={sim.id}
            onClick={() => onSimulationChange(sim.id)}
            className={`${styles.simTabBtn} ${activeSimulation === sim.id ? styles.activeSim : ""}`}
          >
            {sim.title}
          </button>
        ))}
      </div>

      {/* Mobile Fallback Native Select */}
      <div className={styles.mobileSelectWrapper}>
        <select
          value={activeSimulation}
          onChange={(e) => onSimulationChange(e.target.value)}
          className={styles.mobileSelect}
        >
          {simList.map((sim) => (
            <option key={sim.id} value={sim.id}>
              {sim.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
