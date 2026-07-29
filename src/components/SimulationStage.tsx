"use client";

import React from "react";
import ForceMotionStage from "./stages/ForceMotionStage";
import EnergyStage from "./stages/EnergyStage";
import PhotosynthesisStage from "./stages/PhotosynthesisStage";
import MembraneTransportStage from "./stages/MembraneTransportStage";
import AcidBaseStage from "./stages/AcidBaseStage";
import StateChangeStage from "./stages/StateChangeStage";

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
    <div className="relative w-full h-full min-h-[380px] bg-[#07090e] rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
      {/* Predict Banner Overlay */}
      {predictMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs md:text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2">
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
