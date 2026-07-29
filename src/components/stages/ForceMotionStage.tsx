"use client";

import React from "react";

interface StageProps {
  data: any;
  showLabels: boolean;
  showVectors: boolean;
}

export default function ForceMotionStage({ data, showLabels, showVectors }: StageProps) {
  const { appliedForce = 40, frictionForce = 10, mass = 5, distance = 0, velocity = 0, elapsedTime = 0 } = data || {};

  // Track length representation
  const trackWidth = 700;
  const startX = 80;
  const boxX = Math.min(startX + (distance % 540), startX + 540);
  const boxY = 220;

  return (
    <svg viewBox="0 0 800 400" style={{ width: "100%", height: "100%", display: "block" }}>
      {/* Background Grid */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </pattern>
        <marker id="arrowRight" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
        </marker>
        <marker id="arrowLeft" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
        </marker>
      </defs>

      <rect width="800" height="400" fill="#0b0f19" />
      <rect width="800" height="400" fill="url(#grid)" />

      {/* Track Floor */}
      <rect x="40" y="280" width={trackWidth} height="12" fill="#1e293b" rx="4" />
      <line x1="40" y1="280" x2={40 + trackWidth} y2="280" stroke="#334155" strokeWidth="2" />

      {/* Track Markers (0m, 10m, 20m, 30m, 40m, 50m) */}
      {[0, 10, 20, 30, 40, 50].map((m, idx) => {
        const x = startX + idx * 100;
        return (
          <g key={m}>
            <line x1={x} y1="280" x2={x} y2="292" stroke="#64748b" strokeWidth="2" />
            {showLabels && (
              <text x={x} y="312" fill="#64748b" fontSize="12" fontFamily="monospace" textAnchor="middle">
                {m}m
              </text>
            )}
          </g>
        );
      })}

      {/* Friction Texture */}
      {frictionForce > 0 && (
        <rect x="40" y="278" width={trackWidth} height="3" fill="#f59e0b" opacity="0.6" />
      )}

      {/* Moving Block */}
      <g transform={`translate(${boxX}, ${boxY})`}>
        {/* Shadow */}
        <ellipse cx="40" cy="60" rx="38" ry="6" fill="rgba(0,0,0,0.5)" />

        {/* Box Body */}
        <rect x="0" y="0" width="80" height="60" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="8" />
        <rect x="4" y="4" width="72" height="52" fill="rgba(59, 130, 246, 0.1)" rx="6" />

        {/* Mass Label */}
        <text x="40" y="34" fill="#f8fafc" fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          {mass} kg
        </text>

        {/* Wheels */}
        <circle cx="16" cy="60" r="8" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="64" cy="60" r="8" fill="#334155" stroke="#94a3b8" strokeWidth="2" />

        {/* Applied Force Vector (Blue Arrow to Right) */}
        {showVectors && appliedForce > 0 && (
          <g>
            <line x1="80" y1="30" x2={80 + Math.min(100, appliedForce * 1.2)} y2="30" stroke="#3b82f6" strokeWidth="4" markerEnd="url(#arrowRight)" />
            {showLabels && (
              <text x={80 + Math.min(100, appliedForce * 1.2) / 2} y="20" fill="#3b82f6" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                F = {appliedForce}N
              </text>
            )}
          </g>
        )}

        {/* Friction Vector (Red Arrow to Left) */}
        {showVectors && frictionForce > 0 && (
          <g>
            <line x1="0" y1="30" x2={-Math.min(80, frictionForce * 1.5)} y2="30" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrowLeft)" />
            {showLabels && (
              <text x={-Math.min(80, frictionForce * 1.5) / 2} y="20" fill="#ef4444" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                f = {Math.round(frictionForce)}N
              </text>
            )}
          </g>
        )}
      </g>

      {/* Top HUD Overlay */}
      <rect x="50" y="30" width="700" height="40" fill="rgba(15, 23, 42, 0.85)" rx="8" stroke="rgba(255,255,255,0.08)" />
      <text x="70" y="55" fill="#94a3b8" fontSize="12" fontFamily="monospace">
        Waktu (t): <tspan fill="#3b82f6" fontWeight="bold">{elapsedTime.toFixed(1)}s</tspan>
      </text>
      <text x="320" y="55" fill="#94a3b8" fontSize="12" fontFamily="monospace">
        Kecepatan (v): <tspan fill="#10b981" fontWeight="bold">{velocity.toFixed(2)} m/s</tspan>
      </text>
      <text x="580" y="55" fill="#94a3b8" fontSize="12" fontFamily="monospace">
        Jarak (Δx): <tspan fill="#f59e0b" fontWeight="bold">{distance.toFixed(1)} m</tspan>
      </text>
    </svg>
  );
}
