"use client";

import React from "react";

interface StageProps {
  data: any;
  showLabels: boolean;
}

export default function StateChangeStage({ data, showLabels }: StageProps) {
  const { temperature = 25, stateName = "Cair (Air)", particleSpeed = 1.0, elapsedTime = 0 } = data || {};

  const isSolid = temperature < 0;
  const isGas = temperature >= 100;

  return (
    <svg viewBox="0 0 800 400" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="800" height="400" fill="#ffffff" />

      {/* Main Container Chamber */}
      <rect x="240" y="100" width="240" height="220" fill="#f8fafc" stroke="#64748b" strokeWidth="4" rx="12" />

      {/* Burner / Cooler Element under Container */}
      <g transform="translate(360, 330)">
        <rect x="-60" y="0" width="120" height="20" fill="#cbd5e1" rx="4" />
        {temperature > 25 ? (
          /* Flame Glow */
          <path d="M -30 0 Q 0 -35 30 0" fill="#d97706" opacity="0.9" />
        ) : (
          /* Ice Glow */
          <path d="M -40 0 L 40 0" stroke="#0284c7" strokeWidth="6" strokeDasharray="4 4" />
        )}
      </g>

      {/* Thermal Particles */}
      {Array.from({ length: 28 }).map((_, idx) => {
        let px = 0;
        let py = 0;
        const speedMult = typeof particleSpeed === "number" ? particleSpeed : 1.0;

        if (isSolid) {
          const col = idx % 7;
          const row = Math.floor(idx / 7);
          px = 270 + col * 30 + Math.sin(elapsedTime * 8 + idx) * 1.5;
          py = 220 + row * 24 + Math.cos(elapsedTime * 8 + idx) * 1.5;
        } else if (isGas) {
          px = 260 + ((idx * 55 + elapsedTime * 120 * speedMult) % 200);
          py = 120 + ((idx * 37 + elapsedTime * 100 * speedMult) % 180);
        } else {
          px = 260 + (idx % 7) * 30 + Math.sin(elapsedTime * 3 * speedMult + idx) * 6;
          py = 230 + Math.floor(idx / 7) * 20 + Math.cos(elapsedTime * 3 * speedMult + idx) * 4;
        }

        return (
          <g key={idx}>
            <circle cx={px} cy={py} r="8" fill={isGas ? "#0284c7" : isSolid ? "#0284c7" : "#2563eb"} stroke="#ffffff" strokeWidth="1.5" />
          </g>
        );
      })}

      {/* Thermometer Tube on Left */}
      <g transform="translate(140, 70)">
        <rect width="24" height="240" fill="#f8fafc" stroke="#64748b" strokeWidth="2" rx="12" />
        <circle cx="12" cy="245" r="18" fill="#dc2626" stroke="#64748b" strokeWidth="2" />

        {/* Mercury Column */}
        {(() => {
          const clampedT = Math.min(150, Math.max(-30, temperature));
          const hNorm = (clampedT + 30) / 180;
          const mercuryH = 200 * hNorm;
          return (
            <rect x="8" y={230 - mercuryH} width="8" height={mercuryH + 15} fill="#dc2626" rx="4" />
          );
        })()}

        {showLabels && (
          <text x="12" y="-10" fill="#dc2626" fontSize="14" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
            {Math.round(temperature)}°C
          </text>
        )}
      </g>

      {/* Right HUD Information Box */}
      <g transform="translate(540, 90)">
        <rect width="200" height="200" fill="#f8fafc" rx="12" stroke="#cbd5e1" />
        <text x="100" y="32" fill="#0f172a" fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          Status Wujud Zat
        </text>

        <text x="100" y="85" fill="#0284c7" fontSize="17" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          {stateName}
        </text>

        <text x="100" y="135" fill="#64748b" fontSize="12" fontWeight="600" fontFamily="sans-serif" textAnchor="middle">
          Gerak Kinetik Partikel:
        </text>
        <text x="100" y="158" fill="#059669" fontSize="15" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
          {typeof particleSpeed === "string" ? particleSpeed : `${particleSpeed}x`}
        </text>
      </g>
    </svg>
  );
}
