import React from "react";
import styles from "./ResearchHighlights.module.css";

export default function ResearchHighlights() {
  const highlights = [
    {
      title: "Quantum Entanglement at Room Temperature",
      authors: "Science School Quantum Lab",
      date: "July 2026",
      impact: "IF: 38.4",
      abstract: "Demonstrating sustained coherence in nitrogen-vacancy color centers in diamond matrices.",
      tag: "PHYSICS",
    },
    {
      title: "Synthetic Enzyme Synthesis for Plastics Recycling",
      authors: "Bio-Molecular Engineering Department",
      date: "June 2026",
      impact: "IF: 29.1",
      abstract: "Engineered PETase variant capable of degrading polyolefins in under 72 hours at ambient pH.",
      tag: "BIOTECH",
    },
    {
      title: "Deep Neural Folding of Unstructured RNA",
      authors: "AI Science Computational Group",
      date: "May 2026",
      impact: "IF: 34.7",
      abstract: "Predicting tertiary structures of long non-coding RNA with sub-angstrom spatial precision.",
      tag: "AI & DATA",
    },
  ];

  return (
    <section id="research" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.tag}>ACADEMIC PUBLICATIONS</div>
        <h2 className={styles.title}>
          Latest <span className="gradient-text">Faculty Research</span>
        </h2>
        <p className={styles.subtitle}>
          Peer-reviewed breakthroughs produced directly within our virtual research labs.
        </p>
      </div>

      <div className={styles.grid}>
        {highlights.map((h, i) => (
          <div key={i} className={`glass-card ${styles.card}`}>
            <div className={styles.topRow}>
              <span className={styles.researchTag}>{h.tag}</span>
              <span className={styles.impactBadge}>{h.impact}</span>
            </div>

            <h3 className={styles.cardTitle}>{h.title}</h3>
            <p className={styles.authors}>{h.authors} • {h.date}</p>
            <p className={styles.abstract}>{h.abstract}</p>

            <a href="#lab" className={styles.readLink}>
              Read Full Paper (PDF) ↗
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
