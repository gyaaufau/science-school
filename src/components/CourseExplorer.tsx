"use client";

import React, { useState } from "react";
import styles from "./CourseExplorer.module.css";

interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  level: string;
  duration: string;
  enrolled: number;
  rating: number;
  description: string;
  badge: string;
  gradient: string;
}

const COURSES: Course[] = [
  {
    id: "qphysics",
    title: "Quantum Computing & Entanglement",
    category: "Physics",
    instructor: "Dr. Elena Vance",
    level: "Advanced",
    duration: "8 Weeks",
    enrolled: 1420,
    rating: 4.9,
    description: "Master qubit dynamics, quantum algorithms (Shor's & Grover's), and physical hardware simulations.",
    badge: "⚡ MOST POPULAR",
    gradient: "linear-gradient(135deg, rgba(0, 242, 254, 0.15), rgba(127, 0, 255, 0.15))",
  },
  {
    id: "crispr",
    title: "CRISPR-Cas9 Bio-Engineering",
    category: "Biotechnology",
    instructor: "Prof. Marcus Thorne",
    level: "Intermediate",
    duration: "6 Weeks",
    enrolled: 980,
    rating: 4.8,
    description: "Genome editing mechanisms, RNA-guided nucleases, and synthetic biology lab protocol simulation.",
    badge: "🧬 HIGH DEMAND",
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15))",
  },
  {
    id: "astrophysics",
    title: "Astrophysics & Gravitational Waves",
    category: "Astronomy",
    instructor: "Dr. Sarah Al-Mansoor",
    level: "All Levels",
    duration: "10 Weeks",
    enrolled: 2150,
    rating: 5.0,
    description: "Explore spacetime curvature, black hole event horizons, and interferometry data analysis.",
    badge: "🌌 FEATURED",
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.15))",
  },
  {
    id: "aimolecules",
    title: "AI-Driven Molecular Design",
    category: "Data Science",
    instructor: "Dr. Kevin Zhang",
    level: "Advanced",
    duration: "7 Weeks",
    enrolled: 1120,
    rating: 4.9,
    description: "Deep learning models for protein folding predictions and automated drug candidate discovery.",
    badge: "🤖 NEW 2026",
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(127, 0, 255, 0.15))",
  },
];

export default function CourseExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  const categories = ["All", "Physics", "Biotechnology", "Astronomy", "Data Science"];

  const filteredCourses = selectedCategory === "All"
    ? COURSES
    : COURSES.filter((c) => c.category === selectedCategory);

  return (
    <section id="courses" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.tag}>CURRICULUM</div>
        <h2 className={styles.title}>
          Explore <span className="gradient-text">Science Tracks</span>
        </h2>
        <p className={styles.subtitle}>
          Interactive modules led by top researchers with integrated hands-on lab projects.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterBar}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${styles.filterTab} ${selectedCategory === cat ? styles.activeTab : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className={styles.grid}>
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className={`glass-card ${styles.card}`}
            style={{ background: course.gradient }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.badge}>{course.badge}</span>
              <span className={styles.rating}>★ {course.rating}</span>
            </div>

            <h3 className={styles.courseTitle}>{course.title}</h3>
            <p className={styles.instructor}>by {course.instructor}</p>

            <p className={styles.description}>{course.description}</p>

            <div className={styles.metaRow}>
              <span>⏱️ {course.duration}</span>
              <span>📊 {course.level}</span>
              <span>👥 {course.enrolled} Students</span>
            </div>

            <div className={styles.cardFooter}>
              <button
                onClick={() => setActiveCourseModal(course)}
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                View Syllabus & Enroll
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {activeCourseModal && (
        <div className={styles.modalBackdrop} onClick={() => setActiveCourseModal(null)}>
          <div className={`glass-card ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.badge}>{activeCourseModal.badge}</span>
              <button className={styles.closeBtn} onClick={() => setActiveCourseModal(null)}>✕</button>
            </div>
            <h2 className={styles.modalTitle}>{activeCourseModal.title}</h2>
            <p className={styles.modalInstructor}>Lead Instructor: {activeCourseModal.instructor}</p>

            <div className={styles.modalBody}>
              <p>{activeCourseModal.description}</p>

              <div className={styles.syllabusBox}>
                <h4 className={styles.syllabusHeading}>📜 Included Learning Modules:</h4>
                <ul>
                  <li>Module 1: Theoretical Foundations & Math Notation</li>
                  <li>Module 2: Virtual Simulation Lab Practicum</li>
                  <li>Module 3: Peer-Reviewed Research Analysis</li>
                  <li>Module 4: Capstone Experiment & Certification</li>
                </ul>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                Enroll Now (Free Access)
              </button>
              <button className="btn-secondary" onClick={() => setActiveCourseModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
