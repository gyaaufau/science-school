"use client";

import React from "react";

interface StageProps {
  data: any;
  showLabels: boolean;
}

export default function AcidBaseStage({ data, showLabels }: StageProps) {
  const { ph = 7.0, colorHex = "#059669", classification = "Netral", elapsedTime = 0 } = data || {};

  const liquidY = 160;
  const liquidHeight = 160;

  return (
    <svg viewBox="0 0 800 400" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="800" height="400" fill="#ffffff" />

      {/* Main Chemical Beaker */}
      <rect x="260" y="120" width="200" height="210" fill="rgba(248, 250, 252, 0.5)" stroke="#64748b" strokeWidth="4" rx="12" />
      <path d="M 250 120 L 260 120 L 260 320 Q 260 330 270 330 L 450 330 Q 460 330 460 320 L 460 120 L 470 120" fill="none" stroke="#64748b" strokeWidth="4" />

      {/* Liquid in Beaker with pH color glow */}
      <rect x="264" y={liquidY} width="192" height={liquidHeight} fill={colorHex} opacity="0.75" rx="8" />

      {/* Surface Liquid Ripple */}
      <ellipse cx="360" cy={liquidY} rx="94" ry="12" fill={colorHex} opacity="0.9" />

      {/* Beaker Volume Ticks */}
      {[100, 200, 300, 400].map((v, i) => {
        const y = 310 - i * 45;
        return (
          <g key={v}>
            <line x1="264" y1={y} x2="284" y2={y} stroke="#0f172a" strokeWidth="2" opacity="0.6" />
            {showLabels && (
              <text x="290" y={y + 4} fill="#334155" fontSize="11" fontWeight="600" fontFamily="monospace">
                {v}mL
              </text>
            )}
          </g>
        );
      })}

      {/* Burette / Dropper Animation */}
      <g transform="translate(360, 40)">
        <rect x="-10" y="0" width="20" height="60" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="4" />
        <polygon points="-6,60 6,60 0,72" fill="#64748b" />

        {/* Drops falling */}
        {Array.from({ length: 2 }).map((_, idx) => {
          const dropY = 72 + ((elapsedTime * 60 + idx * 35) % 80);
          return (
            <circle key={idx} cx="0" cy={dropY} r="3.5" fill={colorHex} />
          );
        })}
      </g>

      {/* Right pH 0-14 Scale Bar */}
      <g transform="translate(520, 60)">
        <rect width="220" height="280" fill="#f8fafc" rx="12" stroke="#cbd5e1" />
        <text x="110" y="32" fill="#0f172a" fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          Skala pH Indikator
        </text>

        {/* pH Spectrum Bar */}
        <defs>
          <linearGradient id="phSpectrum" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />   {/* Acid pH 0 */}
            <stop offset="25%" stopColor="#ea580c" />
            <stop offset="50%" stopColor="#059669" />  {/* Neutral pH 7 */}
            <stop offset="75%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#2563eb" /> {/* Base pH 14 */}
          </linearGradient>
        </defs>

        <rect x="30" y="55" width="24" height="180" fill="url(#phSpectrum)" rx="6" stroke="#cbd5e1" />

        {/* Pointer Triangle for Current pH */}
        {(() => {
          const pointerY = 55 + 180 * (1 - ph / 14);
          return (
            <g transform={`translate(56, ${pointerY})`}>
              <polygon points="0,0 14,-8 14,8" fill="#0f172a" />
              <text x="22" y="4" fill="#0f172a" fontSize="14" fontWeight="bold" fontFamily="monospace">
                pH {ph}
              </text>
            </g>
          );
        })()}

        <text x="110" y="255" fill={colorHex} fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          {classification}
        </text>
      </g>
    </svg>
  );
}
