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
  highlightedMoonIndex?: number | null; // 0-based index of moon to highlight
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
  highlightedMoonIndex = null,
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
      <div className="moons">
        {/* Visual orbit ring for moons */}
        <div className="planet_orbit"></div>
        <div className={`moon moon-0 ${highlightedMoonIndex === 0 ? "moon--highlighted" : ""}`}>
          <img src={moons[0]} alt="" width={24} height={24} />
        </div>
        <div className={`moon moon-1 ${highlightedMoonIndex === 1 ? "moon--highlighted" : ""}`}>
          <img src={moons[1]} alt="" width={24} height={24} />
        </div>
        <div className={`moon moon-2 ${highlightedMoonIndex === 2 ? "moon--highlighted" : ""}`}>
          <img src={moons[2]} alt="" width={24} height={24} />
        </div>
        <div className={`moon moon-3 ${highlightedMoonIndex === 3 ? "moon--highlighted" : ""}`}>
          <img src={moons[3]} alt="" width={24} height={24} />
        </div>
      </div>
    </button>
  );
}

export default Planet;
