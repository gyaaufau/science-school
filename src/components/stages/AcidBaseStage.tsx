"use client";

import React from "react";

interface StageProps {
  data: any;
  showLabels: boolean;
}

export default function AcidBaseStage({ data, showLabels }: StageProps) {
  const { ph = 7.0, colorHex = "#10b981", classification = "Netral", elapsedTime = 0 } = data || {};

  // Liquid Height in Beaker
  const liquidY = 160;
  const liquidHeight = 160;

  return (
    <svg viewBox="0 0 800 400" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="800" height="400" fill="#0b0f19" />

      {/* Main Chemical Beaker */}
      <rect x="260" y="120" width="200" height="210" fill="rgba(255, 255, 255, 0.03)" stroke="#94a3b8" strokeWidth="4" rx="12" />
      <path d="M 250 120 L 260 120 L 260 320 Q 260 330 270 330 L 450 330 Q 460 330 460 320 L 460 120 L 470 120" fill="none" stroke="#94a3b8" strokeWidth="4" />

      {/* Liquid in Beaker with pH color glow */}
      <rect x="264" y={liquidY} width="192" height={liquidHeight} fill={colorHex} opacity="0.65" rx="8" />

      {/* Surface Liquid Ripple */}
      <ellipse cx="360" cy={liquidY} rx="94" ry="12" fill={colorHex} opacity="0.85" />

      {/* Beaker Volume Ticks (100mL, 200mL, 300mL, 400mL) */}
      {[100, 200, 300, 400].map((v, i) => {
        const y = 310 - i * 45;
        return (
          <g key={v}>
            <line x1="264" y1={y} x2="284" y2={y} stroke="#f8fafc" strokeWidth="2" opacity="0.6" />
            {showLabels && (
              <text x="290" y={y + 4} fill="#94a3b8" fontSize="10" fontFamily="monospace">
                {v}mL
              </text>
            )}
          </g>
        );
      })}

      {/* Burette / Dropper Animation */}
      <g transform="translate(360, 40)">
        <rect x="-10" y="0" width="20" height="60" fill="rgba(255,255,255,0.1)" stroke="#cbd5e1" strokeWidth="2" rx="4" />
        <polygon points="-6,60 6,60 0,72" fill="#cbd5e1" />

        {/* Drops falling */}
        {Array.from({ length: 2 }).map((_, idx) => {
          const dropY = 72 + ((elapsedTime * 60 + idx * 35) % 80);
          return (
            <circle key={idx} cx="0" cy={dropY} r="3" fill={colorHex} />
          );
        })}
      </g>

      {/* Right pH 0-14 Scale Bar */}
      <g transform="translate(520, 60)">
        <rect width="220" height="280" fill="rgba(15, 23, 42, 0.85)" rx="12" stroke="rgba(255,255,255,0.08)" />
        <text x="110" y="30" fill="#f8fafc" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          Skala pH Indikator
        </text>

        {/* pH Spectrum Bar */}
        <defs>
          <linearGradient id="phSpectrum" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />   {/* Acid pH 0 */}
            <stop offset="25%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#10b981" />  {/* Neutral pH 7 */}
            <stop offset="75%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" /> {/* Base pH 14 */}
          </linearGradient>
        </defs>

        <rect x="30" y="55" width="24" height="180" fill="url(#phSpectrum)" rx="6" stroke="rgba(255,255,255,0.2)" />

        {/* Pointer Triangle for Current pH */}
        {(() => {
          const pointerY = 55 + 180 * (1 - ph / 14);
          return (
            <g transform={`translate(56, ${pointerY})`}>
              <polygon points="0,0 14,-8 14,8" fill="#f8fafc" />
              <text x="22" y="4" fill="#f8fafc" fontSize="13" fontWeight="bold" fontFamily="monospace">
                pH {ph}
              </text>
            </g>
          );
        })()}

        <text x="110" y="255" fill={colorHex} fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          {classification}
        </text>
      </g>
    </svg>
  );
}
