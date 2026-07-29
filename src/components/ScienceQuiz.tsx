"use client";

import React, { useState } from "react";
import styles from "./ScienceQuiz.module.css";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Which quantum phenomenon states that particles can exist in multiple states simultaneously until observed?",
    options: [
      "Quantum Tunneling",
      "Superposition",
      "Wave-Particle Duality",
      "Heisenberg Uncertainty Principle"
    ],
    correct: 1,
    explanation: "Superposition allows a quantum system to be in a linear combination of states until a measurement is conducted.",
  },
  {
    id: 2,
    question: "What enzyme acts as the molecular scissors in CRISPR-Cas9 genome editing?",
    options: ["DNA Ligase", "RNA Polymerase", "Cas9 Nuclease", "Helicase"],
    correct: 2,
    explanation: "Cas9 is an RNA-guided DNA endonuclease enzyme that cuts double-stranded DNA at specified target sites.",
  },
  {
    id: 3,
    question: "Gravitational waves were first directly detected by LIGO in 2015 from which cosmic event?",
    options: [
      "Supernova explosion in Andromeda",
      "Binary Black Hole Merger",
      "Neutron star collision with Sun",
      "Gamma-ray burst in Orion Nebula"
    ],
    correct: 1,
    explanation: "GW150914 was produced by the collision and merger of two stellar-mass black holes about 1.3 billion light-years away.",
  },
];

export default function ScienceQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const q = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === q.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.tag}>DAILY BRAIN TEASER</div>
          <h2 className={styles.title}>
            Interactive <span className="gradient-text-emerald">Science Challenge</span>
          </h2>
          <p className={styles.subtitle}>
            Test your quantum, biological, and astronomical knowledge daily.
          </p>
        </div>

        <div className={`glass-card ${styles.quizCard}`}>
          {!isCompleted ? (
            <>
              <div className={styles.progressRow}>
                <span className={styles.stepCount}>
                  Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className={styles.questionText}>{q.question}</h3>

              <div className={styles.optionsList}>
                {q.options.map((opt, idx) => {
                  let btnStyle = styles.optionBtn;
                  if (isAnswered) {
                    if (idx === q.correct) btnStyle += ` ${styles.correctOpt}`;
                    else if (idx === selectedOption) btnStyle += ` ${styles.wrongOpt}`;
                  } else if (selectedOption === idx) {
                    btnStyle += ` ${styles.selectedOpt}`;
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={btnStyle}
                    >
                      <span className={styles.optLetter}>{String.fromCharCode(65 + idx)}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className={styles.explanationBox}>
                  <p className={styles.expTitle}>
                    {selectedOption === q.correct ? "🎉 Correct!" : "💡 Explanation:"}
                  </p>
                  <p className={styles.expText}>{q.explanation}</p>
                </div>
              )}

              <div className={styles.quizFooter}>
                {isAnswered && (
                  <button className="btn-primary" onClick={handleNext}>
                    {currentIdx < QUIZ_QUESTIONS.length - 1 ? "Next Question ➔" : "View Final Results 🏆"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className={styles.resultBox}>
              <div className={styles.scoreTrophy}>🏆</div>
              <h3 className={styles.resultTitle}>Challenge Completed!</h3>
              <p className={styles.scoreText}>
                You scored <span className="gradient-text">{score}</span> / {QUIZ_QUESTIONS.length} ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
              </p>
              <p className={styles.resultSub}>
                {score === QUIZ_QUESTIONS.length
                  ? "Outstanding! You possess advanced scientific aptitude."
                  : "Great effort! Review the virtual lab and courses to sharpen your concepts."}
              </p>
              <button className="btn-primary" onClick={handleReset} style={{ marginTop: "16px" }}>
                Try Challenge Again 🔄
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
