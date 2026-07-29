"use client";

import React from "react";

interface StageProps {
  data: any;
  showLabels: boolean;
  showVectors: boolean;
}

export default function EnergyStage({ data, showLabels }: StageProps) {
  const { currentHeight = 6, height0 = 6, ep = 0, ek = 0, eTotal = 1, speed = 0, normalizedPos = 0 } = data || {};

  const ballX = 300 + normalizedPos * 180;
  const rampHeightNorm = Math.pow((ballX - 300) / 180, 2);
  const ballY = 300 - rampHeightNorm * 220;

  const epRatio = eTotal > 0 ? Math.min(1, ep / eTotal) : 0;
  const ekRatio = eTotal > 0 ? Math.min(1, ek / eTotal) : 0;

  return (
    <svg viewBox="0 0 800 400" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="800" height="400" fill="#ffffff" />

      {/* U-Track Path */}
      <path
        d="M 100 80 Q 300 350 500 80"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M 100 80 Q 300 350 500 80"
        fill="none"
        stroke="#2563eb"
        strokeWidth="3"
        strokeDasharray="6 4"
      />

      {/* Height Guidelines */}
      <line x1="80" y1="80" x2="520" y2="80" stroke="#cbd5e1" strokeDasharray="4 4" />
      <line x1="80" y1="190" x2="520" y2="190" stroke="#cbd5e1" strokeDasharray="4 4" />
      <line x1="80" y1="300" x2="520" y2="300" stroke="#cbd5e1" strokeDasharray="4 4" />

      {showLabels && (
        <g fontSize="12" fontFamily="monospace" fontWeight="600" fill="#475569">
          <text x="40" y="84">h = {height0.toFixed(1)}m</text>
          <text x="40" y="194">h = {(height0 / 2).toFixed(1)}m</text>
          <text x="40" y="304">h = 0m</text>
        </g>
      )}

      {/* Ball on Track */}
      <circle cx={ballX} cy={ballY} r="16" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
      <circle cx={ballX} cy={ballY} r="6" fill="#ffffff" />

      {showLabels && (
        <text x={ballX} y={ballY - 24} fill="#0f172a" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          v = {speed.toFixed(1)} m/s
        </text>
      )}

      {/* Bar Chart Panel for Energies */}
      <g transform="translate(550, 50)">
        <rect width="210" height="280" fill="#f8fafc" rx="12" stroke="#cbd5e1" />
        <text x="105" y="32" fill="#0f172a" fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          Diagram Energi (J)
        </text>

        {/* Ep Bar (Blue) */}
        <text x="40" y="65" fill="#2563eb" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Ep</text>
        <rect x="30" y="80" width="20" height="140" fill="#e2e8f0" rx="4" />
        <rect x="30" y={80 + 140 * (1 - epRatio)} width="20" height={140 * epRatio} fill="#2563eb" rx="4" />

        {/* Ek Bar (Green) */}
        <text x="105" y="65" fill="#059669" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Ek</text>
        <rect x="95" y="80" width="20" height="140" fill="#e2e8f0" rx="4" />
        <rect x="95" y={80 + 140 * (1 - ekRatio)} width="20" height={140 * ekRatio} fill="#059669" rx="4" />

        {/* Em Total Bar (Amber) */}
        <text x="170" y="65" fill="#d97706" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Em</text>
        <rect x="160" y="80" width="20" height="140" fill="#e2e8f0" rx="4" />
        <rect x="160" y="80" width="20" height="140" fill="#d97706" rx="4" />

        {/* Values Labels */}
        <text x="40" y="245" fill="#334155" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">{Math.round(ep)}</text>
        <text x="105" y="245" fill="#334155" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">{Math.round(ek)}</text>
        <text x="170" y="245" fill="#334155" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">{Math.round(eTotal)}</text>
      </g>
    </svg>
  );
}
