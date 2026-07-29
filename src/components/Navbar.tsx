"use client";

import React, { useState } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logoBadge}>⚛️</div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>SCIENCE</span>
            <span className={styles.brandSub}>SCHOOL</span>
          </div>
        </div>

        <div className={styles.desktopNav}>
          {[
            { id: "home", label: "Overview", href: "#hero" },
            { id: "lab", label: "Virtual Lab 🧪", href: "#lab" },
            { id: "courses", label: "Courses", href: "#courses" },
            { id: "quiz", label: "Daily Challenge 🎯", href: "#quiz" },
            { id: "research", label: "Research", href: "#research" },
          ].map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveTab(item.id)}
              className={`${styles.navLink} ${
                activeTab === item.id ? styles.active : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          <div className={styles.liveIndicator}>
            <span className={styles.liveDot}></span>
            <span className={styles.liveText}>Lab Server Online</span>
          </div>
          <button className="btn-primary" style={{ padding: "8px 18px", fontSize: "0.9rem" }}>
            Portal Access 🚀
          </button>
        </div>
      </div>
    </nav>
  );
}
