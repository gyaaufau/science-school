"use client";

import React, { useState } from "react";
import { SubjectId } from "@/types/simulation";
import { SUBJECT_SIMULATIONS, SUBJECT_LABELS } from "@/data/simulations";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  activeSubject: SubjectId;
  activeSimulation: string;
  onSelectSimulation: (subject: SubjectId, simId: string) => void;
}

export default function Sidebar({
  activeSubject,
  activeSimulation,
  onSelectSimulation,
}: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<SubjectId, boolean>>({
    physics: true,
    biology: true,
    chemistry: true,
  });

  const toggleGroup = (subject: SubjectId) => {
    setExpandedGroups((prev) => ({ ...prev, [subject]: !prev[subject] }));
  };

  const subjects: SubjectId[] = ["physics", "biology", "chemistry"];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarTitle}>SIMULASI</span>
      </div>

      <nav className={styles.navGroupList}>
        {subjects.map((subKey) => {
          const info = SUBJECT_LABELS[subKey];
          const isExpanded = expandedGroups[subKey];
          const simList = SUBJECT_SIMULATIONS[subKey] || [];

          return (
            <div key={subKey} className={styles.subjectGroup}>
              {/* Subject Group Header */}
              <button
                onClick={() => toggleGroup(subKey)}
                className={styles.groupHeaderBtn}
              >
                <div className={styles.groupHeaderLeft}>
                  <span className={styles.subjectIcon} style={{ color: info.color }}>
                    {info.badge}
                  </span>
                  <span className={styles.subjectTitle}>{info.title}</span>
                </div>
                <span className={`${styles.chevron} ${isExpanded ? styles.expanded : ""}`}>
                  ▾
                </span>
              </button>

              {/* Simulation List Items */}
              {isExpanded && (
                <div className={styles.itemList}>
                  {simList.map((sim) => {
                    const isActive = activeSimulation === sim.id;
                    return (
                      <button
                        key={sim.id}
                        onClick={() => onSelectSimulation(subKey, sim.id)}
                        className={`${styles.simItemBtn} ${isActive ? styles.activeItem : ""}`}
                      >
                        <span className={`${styles.itemDot} ${isActive ? styles.activeDot : ""}`} />
                        <span className={styles.itemTitle}>{sim.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
