export type SubjectId = "physics" | "biology" | "chemistry";
export type GradeId = "sd" | "smp" | "sma";

export interface VariableControlConfig {
  id: string;
  name: string;
  unit: string;
  type: "slider" | "select" | "toggle";
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number | string | boolean;
  options?: { label: string; value: string | number }[];
  helperText?: string;
}

export interface GradeConfig {
  variables: VariableControlConfig[];
  defaultValues: Record<string, number | string | boolean>;
}

export interface ObservationMetric {
  id: string;
  label: string;
  unit: string;
  format?: (val: number | string) => string;
  interpretation?: (val: number | string, inputs: Record<string, any>) => string;
}

export interface Preset {
  id: string;
  title: string;
  description: string;
  values: Record<string, number | string | boolean>;
}

export interface DiscussionContent {
  predict: string;
  observe: string;
  conclude: string;
}

export interface ConceptContent {
  summary: string;
  formulaText?: string;
  variablesExplain?: { symbol: string; meaning: string }[];
}

export interface SimulationResult {
  metrics: Record<string, number | string>;
  stageData: Record<string, any>;
}

export interface SimulationDefinition {
  id: string;
  subject: SubjectId;
  title: string;
  description: string;
  gradeConfigs: Record<GradeId, GradeConfig>;
  metrics: Record<GradeId, ObservationMetric[]>;
  presets: Preset[];
  discussions: Record<GradeId, DiscussionContent>;
  concepts: Record<GradeId, ConceptContent>;
  calculate: (
    inputs: Record<string, number | string | boolean>,
    elapsedTime: number,
    grade: GradeId
  ) => SimulationResult;
}

export interface ComparisonSnapshot {
  simulationId: string;
  grade: GradeId;
  timestamp: string;
  inputs: Record<string, number | string | boolean>;
  metrics: Record<string, number | string>;
}

export interface AppState {
  activeSubject: SubjectId;
  activeSimulation: string;
  activeGrade: GradeId;
  isPlaying: boolean;
  elapsedTime: number;
  playbackSpeed: 0.5 | 1 | 2;
  presentationMode: boolean;
  predictMode: boolean;
  showFormula: boolean;
  showLabels: boolean;
  showVectors: boolean;
  simulationInputs: Record<string, Record<string, number | string | boolean>>;
  comparisonA: ComparisonSnapshot | null;
}
