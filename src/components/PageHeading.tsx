"use client";

import React from "react";
import { GradeId } from "@/types/simulation";
import styles from "./PageHeading.module.css";

interface PageHeadingProps {
  title: string;
  description: string;
  grade: GradeId;
}

export default function PageHeading({ title, description, grade }: PageHeadingProps) {
  return (
    <div className={styles.headingContainer}>
      <div className={styles.titleTextGroup}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.gradeBadge}>
        <span className={styles.badgeLabel}>Jenjang:</span>
        <span className={styles.badgeValue}>{grade.toUpperCase()}</span>
      </div>
    </div>
  );
}
