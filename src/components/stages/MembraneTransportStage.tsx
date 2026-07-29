"use client";

import React from "react";

interface StageProps {
  data: any;
  showLabels: boolean;
}

export default function MembraneTransportStage({ data, showLabels }: StageProps) {
  const { type = "simple", cOut = 80, cIn = 20, channels = 4, hasATP = true, direction = "Luar → Dalam", elapsedTime = 0 } = data || {};

  const outsideCount = Math.min(25, Math.ceil(cOut / 4));
  const insideCount = Math.min(25, Math.ceil(cIn / 4));

  return (
    <svg viewBox="0 0 800 400" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="800" height="400" fill="#ffffff" />

      {/* Compartment Titles */}
      {showLabels && (
        <>
          <text x="200" y="42" fill="#0284c7" fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            Luar Sel (Ekstraseluler) — {cOut} mM
          </text>
          <text x="600" y="42" fill="#059669" fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            Dalam Sel (Intraseluler) — {cIn} mM
          </text>
        </>
      )}

      {/* Phospholipid Bilayer Membrane */}
      <rect x="380" y="60" width="40" height="300" fill="#f1f5f9" rx="4" stroke="#cbd5e1" strokeWidth="1" />

      {/* Phospholipid Heads & Tails */}
      {Array.from({ length: 12 }).map((_, i) => {
        const y = 70 + i * 24;
        return (
          <g key={i}>
            {/* Outer Head & Tails */}
            <circle cx="372" cy={y} r="6" fill="#d97706" />
            <line x1="378" y1={y - 2} x2="395" y2={y - 2} stroke="#64748b" strokeWidth="1.5" />
            <line x1="378" y1={y + 2} x2="395" y2={y + 2} stroke="#64748b" strokeWidth="1.5" />

            {/* Inner Head & Tails */}
            <circle cx="428" cy={y} r="6" fill="#d97706" />
            <line x1="422" y1={y - 2} x2="405" y2={y - 2} stroke="#64748b" strokeWidth="1.5" />
            <line x1="422" y1={y + 2} x2="405" y2={y + 2} stroke="#64748b" strokeWidth="1.5" />
          </g>
        );
      })}

      {/* Protein Channels / Pumps */}
      {type !== "simple" && Array.from({ length: Math.min(4, channels) }).map((_, idx) => {
        const py = 100 + idx * 70;
        return (
          <g key={idx}>
            <rect x="375" y={py} width="50" height="40" fill={type === "active" ? "#7c3aed" : "#2563eb"} rx="8" stroke="#ffffff" strokeWidth="2" />
            <rect x="395" y={py - 2} width="10" height="44" fill="#ffffff" rx="2" />
            {showLabels && (
              <text x="400" y={py + 25} fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                {type === "active" ? "ATP" : "Gate"}
              </text>
            )}
          </g>
        );
      })}

      {/* Extracellular Particles (Left side) */}
      {Array.from({ length: outsideCount }).map((_, idx) => {
        const px = 60 + (idx % 6) * 45 + Math.sin(elapsedTime * 2 + idx) * 8;
        const py = 80 + Math.floor(idx / 6) * 50 + Math.cos(elapsedTime * 2 + idx) * 8;
        return (
          <circle key={`out-${idx}`} cx={px} cy={py} r="8" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
        );
      })}

      {/* Intracellular Particles (Right side) */}
      {Array.from({ length: insideCount }).map((_, idx) => {
        const px = 470 + (idx % 6) * 45 + Math.sin(elapsedTime * 2 + idx) * 8;
        const py = 80 + Math.floor(idx / 6) * 50 + Math.cos(elapsedTime * 2 + idx) * 8;
        return (
          <circle key={`in-${idx}`} cx={px} cy={py} r="8" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
        );
      })}

      {/* Bottom Summary Bar */}
      <rect x="150" y="340" width="500" height="42" fill="#f8fafc" rx="8" stroke="#cbd5e1" />
      <text x="400" y="366" fill="#0f172a" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
        Fluks Transport: <tspan fill="#0284c7">{direction}</tspan> {type === "active" && !hasATP && <tspan fill="#dc2626"> (Gagal: Membutuhkan ATP)</tspan>}
      </text>
    </svg>
  );
}
