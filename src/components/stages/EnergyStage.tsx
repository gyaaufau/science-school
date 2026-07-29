"use client";

import React from "react";

interface StageProps {
  data: any;
  showLabels: boolean;
  showVectors: boolean;
}

export default function EnergyStage({ data, showLabels }: StageProps) {
  const { currentHeight = 6, height0 = 6, ep = 0, ek = 0, eTotal = 1, speed = 0, normalizedPos = 0 } = data || {};

  // U-Ramp Curve Path
  // Ramp from x=100 to x=500, y top = 80, y bottom = 300
  const ballX = 300 + normalizedPos * 180;
  const rampHeightNorm = Math.pow((ballX - 300) / 180, 2);
  const ballY = 300 - rampHeightNorm * 220;

  const epRatio = eTotal > 0 ? Math.min(1, ep / eTotal) : 0;
  const ekRatio = eTotal > 0 ? Math.min(1, ek / eTotal) : 0;

  return (
    <svg viewBox="0 0 800 400" className="w-full h-full block">
      <rect width="800" height="400" fill="#0b0f19" />

      {/* U-Track Path */}
      <path
        d="M 100 80 Q 300 350 500 80"
        fill="none"
        stroke="#334155"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M 100 80 Q 300 350 500 80"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeDasharray="6 4"
      />

      {/* Height Guidelines */}
      <line x1="80" y1="80" x2="520" y2="80" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
      <line x1="80" y1="190" x2="520" y2="190" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
      <line x1="80" y1="300" x2="520" y2="300" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />

      {showLabels && (
        <g fontSize="11" fontFamily="monospace" fill="#64748b">
          <text x="50" y="84">h = {height0.toFixed(1)}m</text>
          <text x="50" y="194">h = {(height0 / 2).toFixed(1)}m</text>
          <text x="50" y="304">h = 0m</text>
        </g>
      )}

      {/* Ball on Track */}
      <circle cx={ballX} cy={ballY} r="16" fill="#3b82f6" stroke="#f8fafc" strokeWidth="3" />
      <circle cx={ballX} cy={ballY} r="6" fill="#f8fafc" />

      {showLabels && (
        <text x={ballX} y={ballY - 24} fill="#f8fafc" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          v = {speed.toFixed(1)} m/s
        </text>
      )}

      {/* Bar Chart Panel for Energies */}
      <g transform="translate(560, 60)">
        <rect width="200" height="260" fill="rgba(15, 23, 42, 0.85)" rx="12" stroke="rgba(255,255,255,0.08)" />
        <text x="100" y="30" fill="#f8fafc" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          Diagram Energi (J)
        </text>

        {/* Ep Bar (Blue) */}
        <text x="35" y="65" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Ep</text>
        <rect x="25" y="80" width="20" height="130" fill="#1e293b" rx="4" />
        <rect x="25" y={80 + 130 * (1 - epRatio)} width="20" height={130 * epRatio} fill="#3b82f6" rx="4" />

        {/* Ek Bar (Green) */}
        <text x="100" y="65" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Ek</text>
        <rect x="90" y="80" width="20" height="130" fill="#1e293b" rx="4" />
        <rect x="90" y={80 + 130 * (1 - ekRatio)} width="20" height={130 * ekRatio} fill="#10b981" rx="4" />

        {/* Em Total Bar (Amber) */}
        <text x="165" y="65" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Em</text>
        <rect x="155" y="80" width="20" height="130" fill="#1e293b" rx="4" />
        <rect x="155" y="80" width="20" height="130" fill="#f59e0b" rx="4" />

        {/* Values Labels */}
        <text x="35" y="230" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">{Math.round(ep)}</text>
        <text x="100" y="230" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">{Math.round(ek)}</text>
        <text x="165" y="230" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">{Math.round(eTotal)}</text>
      </g>
    </svg>
  );
}
