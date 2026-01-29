'use client'

import { useState } from "react";
import "./SolarSystem.css";

export default function SolarSystem() {
  const [active, setActive] = useState(null);

  const buttons = [
    { id: 1, label: "One" },
    { id: 2, label: "Two" },
    { id: 3, label: "Three" },
    { id: 4, label: "Four" },
  ];

  return (
    <div className="solar-system">
      {/* Center planet */}
      <div className="center-planet">
        {active ?? "Center"}
      </div>

      {/* Orbit ring */}
      <div className="orbit-ring" />

      {/* Planets */}
      {buttons.map((btn, i) => (
        <button
          key={btn.id}
          className={`planet planet-${i}`}
          onClick={() => setActive(btn.label)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
