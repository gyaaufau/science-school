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
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E1E5E9" strokeWidth="1" />
        </pattern>
        <marker id="arrowRight" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#26945B" />
        </marker>
        <marker id="arrowLeft" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#D74C3F" />
        </marker>
      </defs>

      {/* Stage Surface (#F2F7FA) */}
      <rect width="800" height="400" fill="#F2F7FA" />
      <rect width="800" height="400" fill="url(#gridLight)" />

      {/* Track Floor (#E7EDF1) */}
      <rect x="40" y="280" width={trackWidth} height="12" fill="#E7EDF1" rx="4" stroke="#C8CFD6" strokeWidth="1" />
      <line x1="40" y1="280" x2={40 + trackWidth} y2="280" stroke="#7B8591" strokeWidth="2" />

      {/* Track Markers (0m to 50m) */}
      {[0, 10, 20, 30, 40, 50].map((m, idx) => {
        const x = startX + idx * 100;
        return (
          <g key={m}>
            <line x1={x} y1="280" x2={x} y2="294" stroke="#56606B" strokeWidth="2" />
            {showLabels && (
              <text x={x} y="314" fill="#56606B" fontSize="12" fontWeight="600" fontFamily="monospace" textAnchor="middle">
                {m}m
              </text>
            )}
          </g>
        );
      })}

      {/* Friction Texture */}
      {frictionForce > 0 && (
        <rect x="40" y="278" width={trackWidth} height="3" fill="#D74C3F" opacity="0.6" />
      )}

      {/* Neutral Moving Block */}
      <g transform={`translate(${boxX}, ${boxY})`}>
        {/* Shadow */}
        <ellipse cx="40" cy="60" rx="38" ry="5" fill="rgba(22,27,34,0.1)" />

        {/* Box Body */}
        <rect x="0" y="0" width="80" height="60" fill="#FFFFFF" stroke="#1769E0" strokeWidth="2" rx="6" />

        {/* Mass Label */}
        <text x="40" y="34" fill="#161B22" fontSize="14" fontWeight="650" fontFamily="sans-serif" textAnchor="middle">
          {mass} kg
        </text>

        {/* Wheels */}
        <circle cx="16" cy="60" r="7" fill="#E7EDF1" stroke="#56606B" strokeWidth="1.5" />
        <circle cx="64" cy="60" r="7" fill="#E7EDF1" stroke="#56606B" strokeWidth="1.5" />

        {/* Applied Force Vector (Green Arrow Right) */}
        {showVectors && appliedForce > 0 && (
          <g>
            <line x1="80" y1="30" x2={80 + Math.min(100, appliedForce * 1.2)} y2="30" stroke="#26945B" strokeWidth="3" markerEnd="url(#arrowRight)" />
            {showLabels && (
              <text x={80 + Math.min(100, appliedForce * 1.2) / 2} y="18" fill="#26945B" fontSize="12" fontWeight="600" fontFamily="monospace" textAnchor="middle">
                F = {appliedForce}N
              </text>
            )}
          </g>
        )}

        {/* Friction Vector (Red Arrow Left) */}
        {showVectors && frictionForce > 0 && (
          <g>
            <line x1="0" y1="30" x2={-Math.min(80, frictionForce * 1.5)} y2="30" stroke="#D74C3F" strokeWidth="3" markerEnd="url(#arrowLeft)" />
            {showLabels && (
              <text x={-Math.min(80, frictionForce * 1.5) / 2} y="18" fill="#D74C3F" fontSize="12" fontWeight="600" fontFamily="monospace" textAnchor="middle">
                f = {Math.round(frictionForce)}N
              </text>
            )}
          </g>
        )}
      </g>
    </svg>
  );
}
