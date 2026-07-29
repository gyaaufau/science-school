"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AppState, ComparisonSnapshot, GradeId, Preset, SubjectId } from "@/types/simulation";
import { ALL_SIMULATIONS } from "@/data/simulations";
import Header from "./Header";
import Sidebar from "./Sidebar";
import PageHeading from "./PageHeading";
import SimulationStage from "./SimulationStage";
import ResultsReadouts from "./ResultsReadouts";
import InspectorPanel from "./InspectorPanel";
import PlaybackBar from "./PlaybackBar";
import TeacherTools from "./TeacherTools";
import styles from "./ScienceLabApp.module.css";

// Simulation Default Grades Mapping
const SIMULATION_TARGET_GRADES: Record<string, GradeId> = {
  "force-motion": "smp",
  energy: "sma",
  photosynthesis: "sd",
  "membrane-transport": "sma",
  "acid-base": "smp",
  "state-change": "sd",
};

export default function ScienceLabApp() {
  const [appState, setAppState] = useState<AppState>({
    activeSubject: "physics",
    activeSimulation: "force-motion",
    activeGrade: "smp",
    isPlaying: false,
    elapsedTime: 0,
    playbackSpeed: 1,
    presentationMode: false,
    predictMode: false,
    showFormula: false,
    showLabels: true,
    showVectors: true,
    simulationInputs: {},
    comparisonA: null,
  });

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const activeSimDef = ALL_SIMULATIONS[appState.activeSimulation] || ALL_SIMULATIONS["force-motion"];
  const currentGrade = SIMULATION_TARGET_GRADES[appState.activeSimulation] || appState.activeGrade;
  const currentGradeConfig = activeSimDef.gradeConfigs[currentGrade];

  // Get or initialize inputs for active simulation
  const currentInputs = appState.simulationInputs[appState.activeSimulation] || currentGradeConfig.defaultValues;

  // Perform calculation
  const calculatedResult = activeSimDef.calculate(currentInputs, appState.elapsedTime, currentGrade);

  // Animation Loop Tick
  const animate = useCallback((time: number) => {
    if (lastTimeRef.current !== null) {
      const deltaTime = (time - lastTimeRef.current) / 1000;
      setAppState((prev) => {
        if (!prev.isPlaying) return prev;
        return {
          ...prev,
          elapsedTime: prev.elapsedTime + deltaTime * prev.playbackSpeed,
        };
      });
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (appState.isPlaying) {
      lastTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = null;
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [appState.isPlaying, animate]);

  // Select simulation from LMS Sidebar
  const handleSelectSimulation = (subject: SubjectId, simId: string) => {
    const targetGrade = SIMULATION_TARGET_GRADES[simId] || "smp";
    setAppState((prev) => ({
      ...prev,
      activeSubject: subject,
      activeSimulation: simId,
      activeGrade: targetGrade,
      isPlaying: false,
      elapsedTime: 0,
      showFormula: targetGrade === "sma",
      comparisonA: null,
    }));
  };

  const handleInputChange = (varId: string, val: any) => {
    setAppState((prev) => ({
      ...prev,
      simulationInputs: {
        ...prev.simulationInputs,
        [prev.activeSimulation]: {
          ...(prev.simulationInputs[prev.activeSimulation] || currentGradeConfig.defaultValues),
          [varId]: val,
        },
      },
    }));
  };

  const handleApplyPreset = (preset: Preset) => {
    setAppState((prev) => ({
      ...prev,
      isPlaying: false,
      elapsedTime: 0,
      simulationInputs: {
        ...prev.simulationInputs,
        [prev.activeSimulation]: preset.values,
      },
    }));
  };

  const handleSaveComparisonA = () => {
    const snapshot: ComparisonSnapshot = {
      simulationId: appState.activeSimulation,
      grade: currentGrade,
      timestamp: new Date().toLocaleTimeString(),
      inputs: { ...currentInputs },
      metrics: { ...calculatedResult.metrics },
    };
    setAppState((prev) => ({ ...prev, comparisonA: snapshot }));
  };

  const handleClearComparison = () => {
    setAppState((prev) => ({ ...prev, comparisonA: null }));
  };

  const handleStep = () => {
    setAppState((prev) => ({ ...prev, elapsedTime: prev.elapsedTime + 0.5 }));
  };

  const handleReset = () => {
    setAppState((prev) => ({ ...prev, isPlaying: false, elapsedTime: 0 }));
  };

  return (
    <div className={`${styles.appShell} ${appState.presentationMode ? styles.presentationModeActive : ""}`}>
      {/* Top Header (72px) */}
      <Header
        presentationMode={appState.presentationMode}
        onTogglePresentation={() => setAppState((p) => ({ ...p, presentationMode: !p.presentationMode }))}
      />

      {/* App Body Container (Sidebar LMS + Main Workspace) */}
      <div className={styles.bodyContainer}>
        {/* Left LMS Sidebar (256px) */}
        {!appState.presentationMode && (
          <Sidebar
            activeSubject={appState.activeSubject}
            activeSimulation={appState.activeSimulation}
            onSelectSimulation={handleSelectSimulation}
          />
        )}

        {/* Main Content Area */}
        <main className={styles.mainContent}>
          {/* Page Heading (Title, 1-line description, Grade Badge) */}
          <PageHeading
            title={activeSimDef.title}
            description={activeSimDef.description}
            grade={currentGrade}
          />

          {/* Desktop Workspace Grid (Flexible Stage Column | 328px Inspector Column) */}
          <div className={styles.workspaceGrid}>
            {/* Left Column: Stage, Results, Playback */}
            <div className={styles.stageColumn}>
              <SimulationStage
                simulationId={appState.activeSimulation}
                data={calculatedResult.stageData}
                predictMode={appState.predictMode}
                showLabels={appState.showLabels}
                showVectors={appState.showVectors}
              />

              {/* Results Readouts directly below stage */}
              <ResultsReadouts
                metrics={activeSimDef.metrics[currentGrade]}
                calculatedValues={calculatedResult.metrics}
                predictMode={appState.predictMode}
              />

              {/* Playback Controls Bar directly below results */}
              <PlaybackBar
                isPlaying={appState.isPlaying}
                onTogglePlay={() => setAppState((p) => ({ ...p, isPlaying: !p.isPlaying }))}
                onStep={handleStep}
                onReset={handleReset}
                playbackSpeed={appState.playbackSpeed}
                onSpeedChange={(speed) => setAppState((p) => ({ ...p, playbackSpeed: speed }))}
              />
            </div>

            {/* Right Column: Fixed Inspector Panel (328px) */}
            {!appState.presentationMode && (
              <InspectorPanel
                grade={currentGrade}
                variables={currentGradeConfig.variables}
                inputs={currentInputs}
                onInputChange={handleInputChange}
                formulaText={activeSimDef.concepts[currentGrade]?.formulaText}
                showFormula={appState.showFormula}
                onToggleFormula={() => setAppState((p) => ({ ...p, showFormula: !p.showFormula }))}
                showLabels={appState.showLabels}
                onToggleLabels={() => setAppState((p) => ({ ...p, showLabels: !p.showLabels }))}
                showVectors={appState.showVectors}
                onToggleVectors={() => setAppState((p) => ({ ...p, showVectors: !p.showVectors }))}
                predictMode={appState.predictMode}
                onTogglePredictMode={() => setAppState((p) => ({ ...p, predictMode: !p.predictMode }))}
              />
            )}
          </div>

          {/* Bottom Teaching Tools Panel */}
          {!appState.presentationMode && (
            <div className={styles.bottomTeachingContainer}>
              <TeacherTools
                grade={currentGrade}
                presets={activeSimDef.presets}
                onApplyPreset={handleApplyPreset}
                discussion={activeSimDef.discussions[currentGrade]}
                concept={activeSimDef.concepts[currentGrade]}
                currentInputs={currentInputs}
                currentMetrics={calculatedResult.metrics}
                comparisonA={appState.comparisonA}
                onSaveComparisonA={handleSaveComparisonA}
                onClearComparison={handleClearComparison}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
