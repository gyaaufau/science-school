import { SimulationDefinition, SubjectId } from "@/types/simulation";
import { forceMotionSimulation } from "./forceMotion";
import { energySimulation } from "./energy";
import { photosynthesisSimulation } from "./photosynthesis";
import { membraneTransportSimulation } from "./membraneTransport";
import { acidBaseSimulation } from "./acidBase";
import { stateChangeSimulation } from "./stateChange";

export const ALL_SIMULATIONS: Record<string, SimulationDefinition> = {
  "force-motion": forceMotionSimulation,
  energy: energySimulation,
  photosynthesis: photosynthesisSimulation,
  "membrane-transport": membraneTransportSimulation,
  "acid-base": acidBaseSimulation,
  "state-change": stateChangeSimulation,
};

export const SUBJECT_SIMULATIONS: Record<SubjectId, SimulationDefinition[]> = {
  physics: [forceMotionSimulation, energySimulation],
  biology: [photosynthesisSimulation, membraneTransportSimulation],
  chemistry: [acidBaseSimulation, stateChangeSimulation],
};

export const SUBJECT_LABELS: Record<SubjectId, { title: string; color: string; badge: string }> = {
  physics: { title: "Fisika", color: "#3b82f6", badge: "⚙️" },
  biology: { title: "Biologi", color: "#10b981", badge: "🌿" },
  chemistry: { title: "Kimia", color: "#f59e0b", badge: "🧪" },
};
