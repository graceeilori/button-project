'use client';

import "./SolarSystem.css";
import { useState } from "react";
import Image from 'next/image';
import { Planet } from "./planetComponent";
import { SpacedockPanel } from "./SpacedockPanel";

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
          <div className="text-center w-[600px] text-[#E6B86A]">Click a planet to explore individual personality • Select multiple planets to see what makes us similar or different</div>
        </div>
        {/* Orbits */}
        <div className="relative w-[720px] h-[720px]">
          {/* Outer orbit ring */}
          <div className="w-[720px] h-[720px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Default state - fades out when selected */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${outerOrbitBothSelected ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-full h-full absolute inset-0 rounded-full outline outline-4 outline-offset-[-2px] outline-white blur-sm"></div>
              <Image
                src="/assets/orbit_large.svg"
                alt="orbit"
                width={720}
                height={720}
                className="absolute inset-0"
              />
            </div>
            {/* Selected state - fades in when selected */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${outerOrbitBothSelected ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-full h-full absolute inset-0 rounded-full outline outline-4 outline-offset-[-2px] outline-[#79ABB9] blur-sm"></div>
              <Image
                src="/assets/outer_orbit_selected.svg"
                alt="orbit"
                width={720}
                height={720}
                className="absolute inset-0"
              />
            </div>
          </div>

          {/* Inner orbit ring */}
          <div className="w-[400px] h-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Default state - fades out when selected */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${innerOrbitBothSelected ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-full h-full absolute inset-0 rounded-full outline outline-4 outline-offset-[-2px] outline-white blur-sm"></div>
              <Image
                src="/assets/orbit_large.svg"
                alt="orbit"
                width={400}
                height={400}
                className="absolute inset-0"
              />
            </div>
            {/* Selected state - fades in when selected */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${innerOrbitBothSelected ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-full h-full absolute inset-0 rounded-full outline outline-4 outline-offset-[-2px] outline-[#B393CB] blur-sm"></div>
              <Image
                src="/assets/inner_orbit_selected.svg"
                alt="orbit"
                width={400}
                height={400}
                className="absolute inset-0"
              />
            </div>
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

      {/* Spacedock Panel - appears when any planet is selected */}
      <SpacedockPanel
        isOpen={selectedCount > 0}
        onClose={() => setSelectedPlanets(new Set())}
        title={selectedCount === 1 ? "PERSONALITY DATA" : "COMPARISON MODE"}
      >
        <div style={{ fontFamily: 'var(--font-space-mono)' }}>
          {selectedPlanets.has(1) && <p>• Chris selected</p>}
          {selectedPlanets.has(2) && <p>• Grace selected</p>}
          {selectedPlanets.has(3) && <p>• Caleb selected</p>}
          {selectedPlanets.has(4) && <p>• JJ selected</p>}
        </div>

        {/* SINGLE-SELECTION: show Personality + Interests when exactly one planet selected */}
        {selectedCount === 1 && (() => {
          const selectedId = Array.from(selectedPlanets)[0] as number;

          const planetData: Record<number, {
            name: string;
            interests: string[];
            traits: {
              Extraversion: string;
              Conscientiousness: string;
              Openness: string;
              Agreeableness: string;
              Emotionality: string;
            };
          }> = {
            1: {
              name: "Chris",
              interests: ["Reading", "Call Of Duty", "Girlfriend", "Snowboarding"],
              traits: {
                Extraversion: "Moderate",
                Conscientiousness: "Moderate",
                Openness: "Moderate",
                Agreeableness: "Moderate",
                Emotionality: "Moderate",
              },
            },
            2: {
              name: "Grace",
              interests: ["Call Of Duty", "Piano", "Baking", "Sickle Cell"],
              traits: {
                Extraversion: "Low",
                Conscientiousness: "Moderate",
                Openness: "Low",
                Agreeableness: "Moderate",
                Emotionality: "Moderate",
              },
            },
            3: {
              name: "Caleb",
              interests: ["Snowboarding", "Jhonston Canyon", "Piano", "Titanium Shoulder"],
              traits: {
                Extraversion: "Moderate",
                Conscientiousness: "Moderate",
                Openness: "Moderate",
                Agreeableness: "Moderate",
                Emotionality: "Moderate",
              },
            },
            4: {
              name: "JJ",
              interests: ["Baking", "Girlfriend", "Trans", "Jhonston Canyon"],
              traits: {
                Extraversion: "Moderate",
                Conscientiousness: "Low",
                Openness: "Moderate",
                Agreeableness: "Moderate",
                Emotionality: "Moderate",
              },
            },
          };

          const InterestPanel = () => {
            const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
            const data = planetData[selectedId];
            const interests = data?.interests ?? [];
            const t = data?.traits;

            return (
              <div className="spacedock-personality-container" style={{ fontFamily: 'var(--font-space-mono)' }}>
                <h3 className="spacedock-heading">Personality Traits</h3>

                <div className="spacedock-traits">
                  <div className="spacedock-trait-row">
                    <div className="trait-name">Extraversion</div>
                    <div className="trait-value">{t?.Extraversion}</div>
                  </div>
                  <div className="spacedock-trait-row">
                    <div className="trait-name">Conscientiousness</div>
                    <div className="trait-value">{t?.Conscientiousness}</div>
                  </div>
                  <div className="spacedock-trait-row">
                    <div className="trait-name">Openness</div>
                    <div className="trait-value">{t?.Openness}</div>
                  </div>
                  <div className="spacedock-trait-row">
                    <div className="trait-name">Agreeableness</div>
                    <div className="trait-value">{t?.Agreeableness}</div>
                  </div>
                  <div className="spacedock-trait-row">
                    <div className="trait-name">Emotionality</div>
                    <div className="trait-value">{t?.Emotionality}</div>
                  </div>
                </div>

                <h4 className="spacedock-subheading">Interests/Traits</h4>
                <div className="spacedock-interests" role="list">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      role="button"
                      aria-pressed={selectedInterest === interest}
                      className={`interest-bubble ${selectedInterest === interest ? "selected" : ""}`}
                      onClick={() => setSelectedInterest(prev => (prev === interest ? null : interest))}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            );
          };

          return <InterestPanel />;
        })()}
      </SpacedockPanel>
    </div>
  );
}
