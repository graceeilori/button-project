'use client';

import "./SolarSystem.css";
import { useState } from "react";
import Image from 'next/image';
import { Planet } from "./planetComponent";

export default function SolarSystem() {
  // Track which planets are selected (multiple selection)
  const [selectedPlanets, setSelectedPlanets] = useState<Set<number>>(new Set());

  // Check if an orbit should be paused (any planet on that orbit is selected)
  const innerOrbitPaused = selectedPlanets.has(1) || selectedPlanets.has(2);
  const outerOrbitPaused = selectedPlanets.has(3) || selectedPlanets.has(4);

  // Check if both planets on an orbit are selected (for orbit glow)
  const outerOrbitBothSelected = selectedPlanets.has(3) && selectedPlanets.has(4);
  const innerOrbitBothSelected = selectedPlanets.has(1) && selectedPlanets.has(2);

  // Count selected planets for sun glow
  const selectedCount = selectedPlanets.size;

  const handlePlanetClick = (planetId: number) => {
    setSelectedPlanets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(planetId)) {
        newSet.delete(planetId);
      } else {
        newSet.add(planetId);
      }
      return newSet;
    });
  };

  return (
    <div className="page">
      <div className="main-container">
        <div className="relative flex flex-col items-center gap-2">
          <div className="relative">
            <div className="title text-center">A FAMILY OF BUTTONS</div>
            <div className="title title-glow text-center absolute inset-0">A FAMILY OF BUTTONS</div>
          </div>
          <div className="text-center w-[600px] text-[#E6B86A]">Click a planet to explore individual personality • Select multiple planets to see what makes them similar or different</div>
        </div>
        {/* Orbits */}
        <div className="relative w-[720px] h-[720px]">
          {/* Outer orbit ring */}
          <div className="w-[720px] h-[720px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {outerOrbitBothSelected && (
              <>
                <div className="w-full h-full absolute inset-0 rounded-full outline outline-4 outline-offset-[-2px] outline-[#79ABB9] blur-sm"></div>
                <Image
                  src="/assets/outer_orbit_selected.svg"
                  alt="orbit"
                  width={720}
                  height={720}
                  className="absolute inset-0"
                />
              </>
            )}
            {/* Default state */}
            {!outerOrbitBothSelected && (
              <>
                <div className="w-full h-full absolute inset-0 rounded-full outline outline-4 outline-offset-[-2px] outline-white blur-sm"></div>
                <Image
                  src="/assets/orbit_large.svg"
                  alt="orbit"
                  width={720}
                  height={720}
                  className="absolute inset-0"
                />
              </>
            )}
          </div>

          {/* Inner orbit ring */}
          <div className="w-[480px] h-[480px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {innerOrbitBothSelected && (
              <>
                <div className="w-full h-full absolute inset-0 rounded-full outline outline-4 outline-offset-[-2px] outline-[#B393CB] blur-sm"></div>
                <Image
                  src="/assets/inner_orbit_selected.svg"
                  alt="orbit"
                  width={480}
                  height={480}
                  className="absolute inset-0"
                />
              </>
            )}
            {!innerOrbitBothSelected && (
              <>
                <div className="w-full h-full absolute inset-0 rounded-full outline outline-4 outline-offset-[-2px] outline-white blur-sm"></div>
                <Image
                  src="/assets/orbit_large.svg"
                  alt="orbit"
                  width={480}
                  height={480}
                  className="absolute inset-0"
                />
              </>
            )}
          </div>

          {/* Sun at center with glow layers */}
          <div className="sun z-20">
            {/* Glow layers - shown based on selection count */}
            {selectedCount >= 2 && (
              <Image src="/assets/sun_glow1.svg" alt="" width={640} height={640} className="absolute inset-0 sun-glow" />
            )}
            {selectedCount >= 3 && (
              <Image src="/assets/sun_glow2.svg" alt="" width={640} height={640} className="absolute inset-0 sun-glow" />
            )}
            {selectedCount >= 4 && (
              <Image src="/assets/sun_glow3.svg" alt="" width={640} height={640} className="absolute inset-0 sun-glow" />
            )}
            {/* Main sun - always visible */}
            <Image src="/assets/sun.svg" alt="Sun" width={320} height={320} className="relative z-10" />
          </div>

          {/* Inner orbit planets (1, 2) */}
          <Planet
            planetId={1}
            planetImg="/chris_icons/chris_icon.png"
            moons={[
              "/IconsUsed/catalog-magazine.png",
              "/IconsUsed/gun-shooting.svg",
              "/IconsUsed/hearts.png",
              "/IconsUsed/snowboarding.png",
            ]}
            selected={selectedPlanets.has(1)}
            paused={innerOrbitPaused}
            onSelect={() => handlePlanetClick(1)}
          />
          <Planet
            planetId={2}
            planetImg="/grace_icons/Planet.png"
            moons={[
              "/IconsUsed/oven.png",
              "/IconsUsed/gun-shooting.svg",
              "/IconsUsed/scd.png",
              "/IconsUsed/piano.png",
            ]}
            isPadded
            selected={selectedPlanets.has(2)}
            paused={innerOrbitPaused}
            onSelect={() => handlePlanetClick(2)}
          />

          {/* Outer orbit planets (3, 4) */}
          <Planet
            planetId={3}
            planetImg="/caleb_icons/calebMotorcyclePlanet.png"
            moons={[
              "/IconsUsed/hiking.png",
              "/IconsUsed/piano.png",
              "/IconsUsed/snowboarding.png",
              "/IconsUsed/terminator.png",
            ]}
            selected={selectedPlanets.has(3)}
            paused={outerOrbitPaused}
            onSelect={() => handlePlanetClick(3)}
          />
          <Planet
            planetId={4}
            planetImg="/jj_icons/JJ_Cards_581.png"
            moons={[
              "/IconsUsed/transgender_flag.png",
              "/IconsUsed/hiking.png",
              "/IconsUsed/oven.png",
              "/IconsUsed/hearts.png",
            ]}
            selected={selectedPlanets.has(4)}
            paused={outerOrbitPaused}
            onSelect={() => handlePlanetClick(4)}
          />
        </div>
      </div>
    </div>
  );
}
