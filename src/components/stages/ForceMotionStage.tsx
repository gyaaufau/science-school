"use client";

import React from "react";

interface StageProps {
  data: any;
  showLabels: boolean;
  showVectors: boolean;
}

export default function ForceMotionStage({ data, showLabels, showVectors }: StageProps) {
  const { appliedForce = 40, frictionForce = 10, mass = 5, distance = 0, velocity = 0, elapsedTime = 0 } = data || {};

  const trackWidth = 700;
  const startX = 80;
  const boxX = Math.min(startX + (distance % 540), startX + 540);
  const boxY = 220;

  return (
    <svg viewBox="0 0 800 400" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <pattern id="gridLight" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1" />
        </pattern>
        <marker id="arrowRight" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
        </marker>
        <marker id="arrowLeft" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
        </marker>
      </defs>

      {/* Clean White Canvas */}
      <rect width="800" height="400" fill="#ffffff" />
      <rect width="800" height="400" fill="url(#gridLight)" />

      {/* Track Floor */}
      <rect x="40" y="280" width={trackWidth} height="12" fill="#e2e8f0" rx="4" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="40" y1="280" x2={40 + trackWidth} y2="280" stroke="#94a3b8" strokeWidth="2" />

      {/* Track Markers (0m to 50m) */}
      {[0, 10, 20, 30, 40, 50].map((m, idx) => {
        const x = startX + idx * 100;
        return (
          <g key={m}>
            <line x1={x} y1="280" x2={x} y2="294" stroke="#64748b" strokeWidth="2" />
            {showLabels && (
              <text x={x} y="314" fill="#475569" fontSize="13" fontWeight="600" fontFamily="monospace" textAnchor="middle">
                {m}m
              </text>
            )}
          </g>
        );
      })}

      {/* Friction Texture */}
      {frictionForce > 0 && (
        <rect x="40" y="278" width={trackWidth} height="3" fill="#d97706" opacity="0.8" />
      )}

      {/* Moving Block */}
      <g transform={`translate(${boxX}, ${boxY})`}>
        {/* Shadow */}
        <ellipse cx="40" cy="60" rx="38" ry="6" fill="rgba(0,0,0,0.12)" />

        {/* Box Body */}
        <rect x="0" y="0" width="80" height="60" fill="#f8fafc" stroke="#2563eb" strokeWidth="3" rx="8" />
        <rect x="4" y="4" width="72" height="52" fill="rgba(37, 99, 235, 0.08)" rx="6" />

        {/* Mass Label */}
        <text x="40" y="34" fill="#0f172a" fontSize="15" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          {mass} kg
        </text>

        {/* Wheels */}
        <circle cx="16" cy="60" r="8" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
        <circle cx="64" cy="60" r="8" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />

        {/* Applied Force Vector (Blue Arrow Right) */}
        {showVectors && appliedForce > 0 && (
          <g>
            <line x1="80" y1="30" x2={80 + Math.min(100, appliedForce * 1.2)} y2="30" stroke="#2563eb" strokeWidth="4" markerEnd="url(#arrowRight)" />
            {showLabels && (
              <text x={80 + Math.min(100, appliedForce * 1.2) / 2} y="18" fill="#1d4ed8" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                F = {appliedForce}N
              </text>
            )}
          </g>
        )}

        {/* Friction Vector (Red Arrow Left) */}
        {showVectors && frictionForce > 0 && (
          <g>
            <line x1="0" y1="30" x2={-Math.min(80, frictionForce * 1.5)} y2="30" stroke="#dc2626" strokeWidth="4" markerEnd="url(#arrowLeft)" />
            {showLabels && (
              <text x={-Math.min(80, frictionForce * 1.5) / 2} y="18" fill="#b91c1c" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                f = {Math.round(frictionForce)}N
              </text>
            )}
          </g>
        )}
      </g>

      {/* Top HUD Overlay */}
      <rect x="40" y="24" width="720" height="46" fill="#f8fafc" rx="8" stroke="#cbd5e1" />
      <text x="60" y="52" fill="#334155" fontSize="13" fontWeight="600" fontFamily="sans-serif">
        Waktu (t): <tspan fill="#2563eb" fontWeight="bold" fontFamily="monospace">{elapsedTime.toFixed(1)}s</tspan>
      </text>
      <text x="320" y="52" fill="#334155" fontSize="13" fontWeight="600" fontFamily="sans-serif">
        Kecepatan (v): <tspan fill="#059669" fontWeight="bold" fontFamily="monospace">{velocity.toFixed(2)} m/s</tspan>
      </text>
      <text x="580" y="52" fill="#334155" fontSize="13" fontWeight="600" fontFamily="sans-serif">
        Jarak (Δx): <tspan fill="#d97706" fontWeight="bold" fontFamily="monospace">{distance.toFixed(1)} m</tspan>
      </text>
    </svg>
  );
}
