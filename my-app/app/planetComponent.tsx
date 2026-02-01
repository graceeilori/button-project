"use client";

import React from "react";

interface PlanetProps {
  planetId: 1 | 2 | 3 | 4;
  planetImg: string;
  moons: [string, string, string, string];
  isPadded?: boolean;
  selected?: boolean;  // Visual glow on this planet
  paused?: boolean;    // Animation paused (orbit stopped)
  onSelect?: () => void;
}

/**
 * Planet - A planet for each person
 * Click to select (shows glow on clicked planet, pauses entire orbit)
 * 
 * Planet IDs: 1, 2 (inner orbit), 3, 4 (outer orbit)
 */
export function Planet({
  planetId,
  planetImg,
  moons,
  isPadded,
  selected = false,
  paused = false,
  onSelect,
}: PlanetProps) {
  return (
    <button
      type="button"
      className={`planet planet-${planetId} ${paused ? "paused" : ""} ${selected ? "selected" : ""} planet-button ${isPadded ? "padded-planet" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <div className="planet-core circle">
        <img src={planetImg} alt="Planet" />
      </div>
      {/* MOONS - commented out for now
      <div className="moons">
        <div className="moon moon-0 circle">
          <img src={moons[0]} alt="" />
        </div>
        <div className="moon moon-1 circle">
          <img src={moons[1]} alt="" />
        </div>
        <div className="moon moon-2 circle">
          <img src={moons[2]} alt="" />
        </div>
        <div className="moon moon-3 circle">
          <img src={moons[3]} alt="" />
        </div>
      </div>
      */}
    </button>
  );
}

export default Planet;
