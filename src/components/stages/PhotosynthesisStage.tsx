"use client";

import React from "react";

interface StageProps {
  data: any;
  showLabels: boolean;
}

export default function PhotosynthesisStage({ data, showLabels }: StageProps) {
  const { light = 70, ratePct = 50, bubbleRate = 20, limitingFactor = "Cahaya", elapsedTime = 0 } = data || {};

  const sunOpacity = Math.max(0.3, light / 100);

  return (
    <svg viewBox="0 0 800 400" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="800" height="400" fill="#ffffff" />

      {/* Sun / Lamp Light Source */}
      <g transform="translate(150, 90)">
        <circle cx="0" cy="0" r="35" fill="#f59e0b" opacity={sunOpacity} />
        <circle cx="0" cy="0" r="45" fill="none" stroke="#d97706" strokeWidth="2" opacity={sunOpacity * 0.8} />

        {/* Sun rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
          <line
            key={ang}
            x1={Math.cos((ang * Math.PI) / 180) * 45}
            y1={Math.sin((ang * Math.PI) / 180) * 45}
            x2={Math.cos((ang * Math.PI) / 180) * 65}
            y2={Math.sin((ang * Math.PI) / 180) * 65}
            stroke="#d97706"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={sunOpacity}
          />
        ))}

        {showLabels && (
          <text x="0" y="85" fill="#b45309" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
            Cahaya: {light}%
          </text>
        )}
      </g>

      {/* Light Rays Beam towards Plant */}
      <polygon points="175,110 400,240 340,300 135,130" fill="url(#sunBeamLight)" opacity={sunOpacity * 0.5} />
      <defs>
        <linearGradient id="sunBeamLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Water Beaker Container */}
      <rect x="300" y="160" width="220" height="200" fill="rgba(14, 165, 233, 0.08)" stroke="#0284c7" strokeWidth="3" rx="16" />
      <rect x="304" y="190" width="212" height="166" fill="rgba(14, 165, 233, 0.15)" rx="12" />

      {/* Water Surface Lines */}
      <path d="M 304 190 Q 356 185 410 190 T 516 190" fill="none" stroke="#0284c7" strokeWidth="2" />

      {/* Aquatic Plant (Elodea) */}
      <path d="M 410 340 C 400 280 430 250 410 210" fill="none" stroke="#059669" strokeWidth="6" strokeLinecap="round" />
      <circle cx="395" cy="280" r="14" fill="#059669" opacity="0.9" />
      <circle cx="425" cy="260" r="16" fill="#059669" opacity="0.9" />
      <circle cx="390" cy="235" r="12" fill="#059669" opacity="0.9" />
      <circle cx="420" cy="215" r="10" fill="#059669" opacity="0.9" />

      {/* Oxygen Bubbles Rising */}
      {bubbleRate > 0 && Array.from({ length: Math.min(12, Math.ceil(bubbleRate / 3)) }).map((_, i) => {
        const bubbleY = 320 - ((elapsedTime * 40 + i * 25) % 130);
        const bubbleX = 410 + Math.sin(elapsedTime * 2 + i) * 12;
        return (
          <circle key={i} cx={bubbleX} cy={bubbleY} r={4 + (i % 3)} fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" opacity="0.9" />
        );
      })}

      {/* Right Meter Gauge */}
      <g transform="translate(560, 80)">
        <rect width="200" height="240" fill="#f8fafc" rx="12" stroke="#cbd5e1" />
        <text x="100" y="32" fill="#0f172a" fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          Laju Fotosintesis
        </text>

        {/* Rate Gauge Meter */}
        <circle cx="100" cy="115" r="50" fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle
          cx="100"
          cy="115"
          r="50"
          fill="none"
          stroke="#059669"
          strokeWidth="10"
          strokeDasharray={`${(ratePct / 100) * 314} 314`}
          transform="rotate(-90 100 115)"
          strokeLinecap="round"
        />

        <text x="100" y="122" fill="#059669" fontSize="24" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
          {ratePct}%
        </text>

        <text x="100" y="185" fill="#64748b" fontSize="12" fontWeight="600" fontFamily="sans-serif" textAnchor="middle">
          Faktor Pembatas:
        </text>
        <text x="100" y="208" fill="#dc2626" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          ⚠️ {limitingFactor}
        </text>
      </g>
    </svg>
  );
}
