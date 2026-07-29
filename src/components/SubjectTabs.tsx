"use client";

import React from "react";
import { SubjectId } from "@/types/simulation";
import { SUBJECT_LABELS } from "@/data/simulations";
import styles from "./SubjectTabs.module.css";

interface SubjectTabsProps {
  activeSubject: SubjectId;
  onSubjectChange: (subject: SubjectId) => void;
}

export default function SubjectTabs({ activeSubject, onSubjectChange }: SubjectTabsProps) {
  const subjects: SubjectId[] = ["physics", "biology", "chemistry"];

  return (
    <div className={styles.container}>
      <div className={styles.tabsRow}>
        {subjects.map((sub) => {
          const info = SUBJECT_LABELS[sub];
          const isActive = activeSubject === sub;
          return (
            <button
              key={sub}
              onClick={() => onSubjectChange(sub)}
              className={`${styles.tabBtn} ${isActive ? styles.activeTab : ""}`}
              style={{
                borderColor: isActive ? info.color : "transparent",
              }}
            >
              <span className={styles.badge}>{info.badge}</span>
              <span>{info.title}</span>
              {isActive && (
                <span className={styles.activeDot} style={{ backgroundColor: info.color }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
