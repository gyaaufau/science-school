"use client";

import React from "react";

interface StageProps {
  data: any;
  showLabels: boolean;
}

export default function PhotosynthesisStage({ data, showLabels }: StageProps) {
  const { light = 70, ratePct = 50, bubbleRate = 20, limitingFactor = "Cahaya", elapsedTime = 0 } = data || {};

  const sunOpacity = Math.max(0.2, light / 100);

  return (
    <svg viewBox="0 0 800 400" className="w-full h-full block">
      <rect width="800" height="400" fill="#0b0f19" />

      {/* Sun / Lamp Light Source */}
      <g transform="translate(150, 90)">
        <circle cx="0" cy="0" r="35" fill="#f59e0b" opacity={sunOpacity} />
        <circle cx="0" cy="0" r="45" fill="none" stroke="#f59e0b" strokeWidth="2" opacity={sunOpacity * 0.6} />

        {/* Sun rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
          <line
            key={ang}
            x1={Math.cos((ang * Math.PI) / 180) * 45}
            y1={Math.sin((ang * Math.PI) / 180) * 45}
            x2={Math.cos((ang * Math.PI) / 180) * 65}
            y2={Math.sin((ang * Math.PI) / 180) * 65}
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={sunOpacity}
          />
        ))}

        {showLabels && (
          <text x="0" y="85" fill="#f59e0b" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            Cahaya: {light}%
          </text>
        )}
      </g>

      {/* Light Rays Beam towards Plant */}
      <polygon points="175,110 400,240 340,300 135,130" fill="url(#sunBeam)" opacity={sunOpacity * 0.4} />
      <defs>
        <linearGradient id="sunBeam" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Water Beaker Container */}
      <rect x="300" y="160" width="220" height="200" fill="rgba(14, 165, 233, 0.15)" stroke="#0ea5e9" strokeWidth="3" rx="16" />
      <rect x="304" y="190" width="212" height="166" fill="rgba(14, 165, 233, 0.25)" rx="12" />

      {/* Water Surface Lines */}
      <path d="M 304 190 Q 356 185 410 190 T 516 190" fill="none" stroke="#38bdf8" strokeWidth="2" />

      {/* Aquatic Plant (Elodea) */}
      <path d="M 410 340 C 400 280 430 250 410 210" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
      <circle cx="395" cy="280" r="14" fill="#10b981" opacity="0.9" />
      <circle cx="425" cy="260" r="16" fill="#10b981" opacity="0.9" />
      <circle cx="390" cy="235" r="12" fill="#10b981" opacity="0.9" />
      <circle cx="420" cy="215" r="10" fill="#10b981" opacity="0.9" />

      {/* Oxygen Bubbles Rising */}
      {bubbleRate > 0 && Array.from({ length: Math.min(12, Math.ceil(bubbleRate / 3)) }).map((_, i) => {
        const bubbleY = 320 - ((elapsedTime * 40 + i * 25) % 130);
        const bubbleX = 410 + Math.sin(elapsedTime * 2 + i) * 12;
        return (
          <circle key={i} cx={bubbleX} cy={bubbleY} r={3 + (i % 3)} fill="#ffffff" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
        );
      })}

      {/* Right Meter Gauge */}
      <g transform="translate(570, 100)">
        <rect width="180" height="240" fill="rgba(15, 23, 42, 0.85)" rx="12" stroke="rgba(255,255,255,0.08)" />
        <text x="90" y="30" fill="#f8fafc" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          Laju Fotosintesis
        </text>

        {/* Rate Gauge Meter */}
        <circle cx="90" cy="110" r="50" fill="none" stroke="#1e293b" strokeWidth="10" />
        <circle
          cx="90"
          cy="110"
          r="50"
          fill="none"
          stroke="#10b981"
          strokeWidth="10"
          strokeDasharray={`${(ratePct / 100) * 314} 314`}
          transform="rotate(-90 90 110)"
          strokeLinecap="round"
        />

        <text x="90" y="115" fill="#10b981" fontSize="22" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
          {ratePct}%
        </text>

        <text x="90" y="180" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" textAnchor="middle">
          Faktor Pembatas:
        </text>
        <text x="90" y="202" fill="#ef4444" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          ⚠️ {limitingFactor}
        </text>
      </g>
    </svg>
  );
}
