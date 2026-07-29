import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandInfo}>
            <div className={styles.brand}>
              <div className={styles.logoBadge}>⚛️</div>
              <span className={styles.brandName}>SCIENCE SCHOOL</span>
            </div>
            <p className={styles.brandDesc}>
              Empowering global minds with interactive virtual laboratories, cutting-edge STEM curricula, and peer-reviewed scientific discovery.
            </p>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkCol}>
              <h4 className={styles.colTitle}>Curriculum</h4>
              <a href="#courses">Quantum Physics</a>
              <a href="#courses">Bio-Engineering</a>
              <a href="#courses">Astrophysics</a>
              <a href="#courses">AI Molecular Design</a>
            </div>

            <div className={styles.linkCol}>
              <h4 className={styles.colTitle}>Platform</h4>
              <a href="#lab">Virtual Lab</a>
              <a href="#quiz">Daily Challenge</a>
              <a href="#research">Research Papers</a>
              <a href="#hero">Student Portal</a>
            </div>

            <div className={styles.linkCol}>
              <h4 className={styles.colTitle}>Stay Connected</h4>
              <p className={styles.newsletterText}>Get monthly research updates and lab releases.</p>
              <div className={styles.inputGroup}>
                <input type="email" placeholder="Enter your email" className={styles.emailInput} />
                <button className="btn-primary" style={{ padding: "8px 14px", fontSize: "0.85rem" }}>
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>© 2026 Science School Academy. All Rights Reserved.</span>
          <div className={styles.statusPill}>
            <span className={styles.statusDot}></span>
            <span>Quantum Computing Cluster: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
