"use client";

import React from "react";

interface StageProps {
  data: any;
  showLabels: boolean;
}

export default function StateChangeStage({ data, showLabels }: StageProps) {
  const { temperature = 25, stateName = "Cair (Air)", particleSpeed = 1.0, elapsedTime = 0 } = data || {};

  // Particle positions generation (32 particles inside beaker)
  const isSolid = temperature < 0;
  const isGas = temperature >= 100;

  return (
    <svg viewBox="0 0 800 400" className="w-full h-full block">
      <rect width="800" height="400" fill="#0b0f19" />

      {/* Main Container Chamber */}
      <rect x="240" y="100" width="240" height="220" fill="rgba(255, 255, 255, 0.03)" stroke="#94a3b8" strokeWidth="4" rx="12" />

      {/* Burner / Cooler Element under Container */}
      <g transform="translate(360, 330)">
        <rect x="-60" y="0" width="120" height="20" fill="#334155" rx="4" />
        {temperature > 25 ? (
          /* Flame Glow */
          <path d="M -30 0 Q 0 -35 30 0" fill="#f59e0b" opacity="0.8" />
        ) : (
          /* Ice Glow */
          <path d="M -40 0 L 40 0" stroke="#00f2fe" strokeWidth="6" strokeDasharray="4 4" />
        )}
      </g>

      {/* Thermal Particles */}
      {Array.from({ length: 28 }).map((_, idx) => {
        let px = 0;
        let py = 0;
        const speedMult = typeof particleSpeed === "number" ? particleSpeed : 1.0;

        if (isSolid) {
          // Rigid Crystal Grid Lattice with subtle jitter
          const col = idx % 7;
          const row = Math.floor(idx / 7);
          px = 270 + col * 30 + Math.sin(elapsedTime * 8 + idx) * 1.5;
          py = 220 + row * 24 + Math.cos(elapsedTime * 8 + idx) * 1.5;
        } else if (isGas) {
          // Bouncing chaotic gas particles filling whole chamber
          px = 260 + ((idx * 55 + elapsedTime * 120 * speedMult) % 200);
          py = 120 + ((idx * 37 + elapsedTime * 100 * speedMult) % 180);
        } else {
          // Liquid fluid flow in lower container
          px = 260 + (idx % 7) * 30 + Math.sin(elapsedTime * 3 * speedMult + idx) * 6;
          py = 230 + Math.floor(idx / 7) * 20 + Math.cos(elapsedTime * 3 * speedMult + idx) * 4;
        }

        return (
          <g key={idx}>
            <circle cx={px} cy={py} r="8" fill={isGas ? "#38bdf8" : isSolid ? "#00f2fe" : "#3b82f6"} stroke="#ffffff" strokeWidth="1" opacity="0.9" />
          </g>
        );
      })}

      {/* Thermometer Tube on Left */}
      <g transform="translate(140, 70)">
        <rect width="24" height="240" fill="rgba(255,255,255,0.08)" stroke="#94a3b8" strokeWidth="2" rx="12" />
        <circle cx="12" cy="245" r="18" fill="#ef4444" stroke="#94a3b8" strokeWidth="2" />

        {/* Mercury Column */}
        {(() => {
          const clampedT = Math.min(150, Math.max(-30, temperature));
          const hNorm = (clampedT + 30) / 180;
          const mercuryH = 200 * hNorm;
          return (
            <rect x="8" y={230 - mercuryH} width="8" height={mercuryH + 15} fill="#ef4444" rx="4" />
          );
        })()}

        {showLabels && (
          <text x="12" y="-10" fill="#ef4444" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
            {Math.round(temperature)}°C
          </text>
        )}
      </g>

      {/* Right HUD Information Box */}
      <g transform="translate(540, 90)">
        <rect width="200" height="200" fill="rgba(15, 23, 42, 0.85)" rx="12" stroke="rgba(255,255,255,0.08)" />
        <text x="100" y="30" fill="#f8fafc" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          Status Wujud Zat
        </text>

        <text x="100" y="80" fill="#38bdf8" fontSize="16" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          {stateName}
        </text>

        <text x="100" y="130" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" textAnchor="middle">
          Gerak Kinetik Partikel:
        </text>
        <text x="100" y="152" fill="#10b981" fontSize="14" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
          {typeof particleSpeed === "string" ? particleSpeed : `${particleSpeed}x`}
        </text>
      </g>
    </svg>
  );
}
