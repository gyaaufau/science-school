"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AppState, ComparisonSnapshot, GradeId, Preset, SubjectId } from "@/types/simulation";
import { ALL_SIMULATIONS, SUBJECT_SIMULATIONS } from "@/data/simulations";
import Header from "./Header";
import SubjectTabs from "./SubjectTabs";
import SimulationTabs from "./SimulationTabs";
import SimulationStage from "./SimulationStage";
import ControlPanel from "./ControlPanel";
import PlaybackBar from "./PlaybackBar";
import TeacherTools from "./TeacherTools";
import styles from "./ScienceLabApp.module.css";

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
  const currentGradeConfig = activeSimDef.gradeConfigs[appState.activeGrade];

  // Get or initialize inputs for active simulation
  const currentInputs = appState.simulationInputs[appState.activeSimulation] || currentGradeConfig.defaultValues;

  // Perform calculation
  const calculatedResult = activeSimDef.calculate(currentInputs, appState.elapsedTime, appState.activeGrade);

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

  // Handlers
  const handleSubjectChange = (subject: SubjectId) => {
    const firstSim = SUBJECT_SIMULATIONS[subject][0].id;
    setAppState((prev) => ({
      ...prev,
      activeSubject: subject,
      activeSimulation: firstSim,
      isPlaying: false,
      elapsedTime: 0,
    }));
  };

  const handleSimulationChange = (simId: string) => {
    setAppState((prev) => ({
      ...prev,
      activeSimulation: simId,
      isPlaying: false,
      elapsedTime: 0,
    }));
  };

  const handleGradeChange = (grade: GradeId) => {
    const targetSimDef = ALL_SIMULATIONS[appState.activeSimulation];
    const newDefaults = targetSimDef.gradeConfigs[grade].defaultValues;

    setAppState((prev) => ({
      ...prev,
      activeGrade: grade,
      elapsedTime: 0,
      showFormula: grade === "sma", // Default formula open on SMA
      simulationInputs: {
        ...prev.simulationInputs,
        [prev.activeSimulation]: newDefaults,
      },
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
      grade: appState.activeGrade,
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
      {/* Top Header */}
      <Header
        activeGrade={appState.activeGrade}
        onGradeChange={handleGradeChange}
        presentationMode={appState.presentationMode}
        onTogglePresentation={() => setAppState((p) => ({ ...p, presentationMode: !p.presentationMode }))}
        predictMode={appState.predictMode}
        onTogglePredict={() => setAppState((p) => ({ ...p, predictMode: !p.predictMode }))}
      />

      {/* Global Subject & Simulation Tabs */}
      <SubjectTabs activeSubject={appState.activeSubject} onSubjectChange={handleSubjectChange} />
      <SimulationTabs
        activeSubject={appState.activeSubject}
        activeSimulation={appState.activeSimulation}
        onSimulationChange={handleSimulationChange}
      />

      {/* Main Workspace Grid (65% Stage, 35% Control Panel) */}
      <main className={styles.workspace}>
        {/* Simulation Stage Viewport */}
        <div className={styles.stageContainer}>
          <SimulationStage
            simulationId={appState.activeSimulation}
            data={calculatedResult.stageData}
            predictMode={appState.predictMode}
            showLabels={appState.showLabels}
            showVectors={appState.showVectors}
          />
        </div>

        {/* Control Panel (Variables & Observations) */}
        {!appState.presentationMode && (
          <div className={styles.controlPanelContainer}>
            <ControlPanel
              grade={appState.activeGrade}
              variables={currentGradeConfig.variables}
              inputs={currentInputs}
              onInputChange={handleInputChange}
              metrics={activeSimDef.metrics[appState.activeGrade]}
              calculatedMetrics={calculatedResult.metrics}
              predictMode={appState.predictMode}
              showFormula={appState.showFormula}
              onToggleFormula={() => setAppState((p) => ({ ...p, showFormula: !p.showFormula }))}
              showLabels={appState.showLabels}
              onToggleLabels={() => setAppState((p) => ({ ...p, showLabels: !p.showLabels }))}
              showVectors={appState.showVectors}
              onToggleVectors={() => setAppState((p) => ({ ...p, showVectors: !p.showVectors }))}
            />
          </div>
        )}
      </main>

      {/* Playback Controls Bar */}
      <PlaybackBar
        isPlaying={appState.isPlaying}
        onTogglePlay={() => setAppState((p) => ({ ...p, isPlaying: !p.isPlaying }))}
        onStep={handleStep}
        onReset={handleReset}
        playbackSpeed={appState.playbackSpeed}
        onSpeedChange={(speed) => setAppState((p) => ({ ...p, playbackSpeed: speed }))}
        elapsedTime={appState.elapsedTime}
      />

      {/* Teacher Tools Section (Presets, Questions, Concepts, Compare) */}
      {!appState.presentationMode && (
        <TeacherTools
          grade={appState.activeGrade}
          presets={activeSimDef.presets}
          onApplyPreset={handleApplyPreset}
          discussion={activeSimDef.discussions[appState.activeGrade]}
          concept={activeSimDef.concepts[appState.activeGrade]}
          showFormula={appState.showFormula}
          onToggleFormula={() => setAppState((p) => ({ ...p, showFormula: !p.showFormula }))}
          currentInputs={currentInputs}
          currentMetrics={calculatedResult.metrics}
          comparisonA={appState.comparisonA}
          onSaveComparisonA={handleSaveComparisonA}
          onClearComparison={handleClearComparison}
        />
      )}
    </div>
  );
}
