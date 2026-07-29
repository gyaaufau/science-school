"use client";

import React from "react";
import ForceMotionStage from "./stages/ForceMotionStage";
import EnergyStage from "./stages/EnergyStage";
import PhotosynthesisStage from "./stages/PhotosynthesisStage";
import MembraneTransportStage from "./stages/MembraneTransportStage";
import AcidBaseStage from "./stages/AcidBaseStage";
import StateChangeStage from "./stages/StateChangeStage";
import styles from "./SimulationStage.module.css";

interface SimulationStageProps {
  simulationId: string;
  data: any;
  predictMode: boolean;
  showLabels: boolean;
  showVectors: boolean;
}

export default function SimulationStage({
  simulationId,
  data,
  predictMode,
  showLabels,
  showVectors,
}: SimulationStageProps) {
  return (
    <div className={styles.stageWrapper}>
      {/* Predict Banner Overlay */}
      {predictMode && (
        <div className={styles.predictBanner}>
          <span>❓ Mode Prediksi Aktif:</span>
          <span>&quot;Apa prediksi kalian sebelum simulasi dijalankan?&quot;</span>
        </div>
      )}

      {/* Dynamic Simulation Stage Dispatcher */}
      {(() => {
        switch (simulationId) {
          case "force-motion":
            return <ForceMotionStage data={data} showLabels={showLabels} showVectors={showVectors} />;
          case "energy":
            return <EnergyStage data={data} showLabels={showLabels} showVectors={showVectors} />;
          case "photosynthesis":
            return <PhotosynthesisStage data={data} showLabels={showLabels} />;
          case "membrane-transport":
            return <MembraneTransportStage data={data} showLabels={showLabels} />;
          case "acid-base":
            return <AcidBaseStage data={data} showLabels={showLabels} />;
          case "state-change":
            return <StateChangeStage data={data} showLabels={showLabels} />;
          default:
            return <ForceMotionStage data={data} showLabels={showLabels} showVectors={showVectors} />;
        }
      })()}
    </div>
  );
}
