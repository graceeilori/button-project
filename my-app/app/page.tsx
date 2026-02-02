'use client';

import "./SolarSystem.css";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { Planet } from "./planetComponent";
import { SpacedockPanel } from "./SpacedockPanel";

export default function SolarSystem() {
  // Track which planets are selected
  const [selectedPlanets, setSelectedPlanets] = useState<Set<number>>(new Set());

  // Track currently selected interest
  // null or { planetId, interest }
  const [selectedInterest, setSelectedInterest] = useState<{ planetId: number; interest: string } | null>(null);

  // Shared interest selection
  const [selectedSharedInterest, setSelectedSharedInterest] = useState<string | null>(null);

  // Planet data for interests & traits 
  const planetData: Record<number, { name: string; interests: string[]; traits: Record<string, string> }> = {
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

  // Moon Mapping
  const interestToMoonMap: Record<number, Record<string, number>> = {
    1: { "Reading": 0, "Call Of Duty": 1, "Girlfriend": 2, "Snowboarding": 3 },
    2: { "Call Of Duty": 1, "Piano": 3, "Baking": 0, "Sickle Cell": 2 },
    3: { "Snowboarding": 2, "Jhonston Canyon": 0, "Piano": 1, "Titanium Shoulder": 3 },
    4: { "Baking": 2, "Girlfriend": 3, "Trans": 0, "Jhonston Canyon": 1 },
  };

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

    // if user toggles planet selection off, clear interest highlight when that planet is no longer selected
    setSelectedInterest(prev => {
      if (!prev) return prev;
      if (prev.planetId === planetId && selectedPlanets.has(planetId)) {
        // the click will unselect it — we clear the interest
        return null;
      }
      return prev;
    });
  };

  useEffect(() => {
    const keyToPlanetId: Record<string, number> = { k: 3, c: 1, j: 4, g: 2 };

    const onKeyDown = (e: KeyboardEvent) => {
      // ignore if any modifier is pressed
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;

      // don't intercept typing into form fields or contentEditable
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      const key = (e.key || '').toLowerCase();
      const planetId = keyToPlanetId[key];
      if (!planetId) return;

      e.preventDefault();

      // Toggle the planet selection in the same way as clicking
      setSelectedPlanets(prev => {
        const newSet = new Set(prev);
        if (newSet.has(planetId)) {
          newSet.delete(planetId);
          // if we're unselecting the planet, also clear its highlighted interest
          setSelectedInterest(prevInt => {
            if (!prevInt) return prevInt;
            return prevInt.planetId === planetId ? null : prevInt;
          });
        } else {
          newSet.add(planetId);
        }
        return newSet;
      });
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Toggle shared interest
  const toggleSharedInterest = (interest: string) => {
    setSelectedSharedInterest(prev => {
      const next = prev === interest ? null : interest;
      // clear single-planet selection whenever a shared interest is toggled
      setSelectedInterest(null);
      return next;
    });
  };

  // Toggle single-planet interest
  const togglePlanetInterest = (planetId: number, interest: string) => {
    setSelectedSharedInterest(null);
    setSelectedInterest(prev => {
      if (prev && prev.planetId === planetId && prev.interest === interest) {
        return null; // deselect
      }
      return { planetId, interest };
    });
  };

  // Compute shared interests among all selected planets
  const computeSharedInterests = (): string[] => {
    if (selectedCount < 2) return [];
    const ids = Array.from(selectedPlanets);
    // Start with interests of the first selected planet
    let shared = planetData[ids[0]]?.interests?.slice() ?? [];
    for (let i = 1; i < ids.length; i++) {
      const next = planetData[ids[i]]?.interests ?? [];
      // intersection
      shared = shared.filter(s => next.indexOf(s) !== -1);
    }
    // ensure "Computer Science" appears when 2 or more planets are selected 
    // because we are all in CPSC
    if (selectedCount >= 2 && shared.indexOf("Computer Science") === -1) {
      shared.push("Computer Science");
    }
    return shared;
  };

  // Given a planetId and compute the highlighted moon index based on current selection
  const getHighlightedMoonIndex = (planetId: number): number | null => {
    const interestToUse =
      selectedSharedInterest !== null
        ? selectedSharedInterest
        : selectedInterest && selectedInterest.planetId === planetId
        ? selectedInterest.interest
        : null;

    if (!interestToUse) return null;

    // do not highlight a moon for "Computer Science"
    if (interestToUse === "Computer Science") return null;

    // Try custom mapping first
    const mapForPlanet = interestToMoonMap[planetId];
    if (mapForPlanet && mapForPlanet[interestToUse] !== undefined) {
      return mapForPlanet[interestToUse];
    }

    // Fallback find the interest in the planet's interests array
    const interests = planetData[planetId]?.interests ?? [];
    const idx = interests.indexOf(interestToUse);
    return idx >= 0 ? idx : null;
  };

  // Shared interests to show in comparison mode
  const sharedInterests = computeSharedInterests();

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

            {/* CPSC overlay when shared "Computer Science" is selected */}
            {selectedSharedInterest === "Computer Science" && (
              <div className="cpsc-overlay" aria-hidden>
                CPSC
              </div>
            )}
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
            highlightedMoonIndex={getHighlightedMoonIndex(1)}
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
            highlightedMoonIndex={getHighlightedMoonIndex(2)}
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
            highlightedMoonIndex={getHighlightedMoonIndex(3)}
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
            highlightedMoonIndex={getHighlightedMoonIndex(4)}
          />
        </div>
        {/* bottom spacer */}
        <div className="page-bottom-spacer" aria-hidden="true" />
      </div>

      {/* Spacedock Panel - appears when any planet is selected */}
      <SpacedockPanel
        isOpen={selectedCount > 0}
        onClose={() => {
          setSelectedPlanets(new Set());
          setSelectedInterest(null);
          setSelectedSharedInterest(null);
        }}
        title={selectedCount === 1 ? "PERSONALITY DATA" : "COMPARISON MODE"}
      >
        <div style={{ fontFamily: 'var(--font-space-mono)' }}>
          {selectedPlanets.has(1) && <p>• Chris selected</p>}
          {selectedPlanets.has(2) && <p>• Grace selected</p>}
          {selectedPlanets.has(3) && <p>• Caleb selected</p>}
          {selectedPlanets.has(4) && <p>• JJ selected</p>}
        </div>

        {/* COMPARISON MODE - Shared Interests when two or more planets are selected */}
        {selectedCount >= 2 && (
          <div style={{ fontFamily: 'var(--font-space-mono)' }}>
            <h4 className="spacedock-subheading">Shared Interests</h4>
            <div className="spacedock-interests" role="list">
              {sharedInterests.map((si) => (
                <button
                  key={si}
                  type="button"
                  aria-pressed={selectedSharedInterest === si}
                  className={`interest-bubble ${selectedSharedInterest === si ? "selected" : ""}`}
                  onClick={() => toggleSharedInterest(si)}
                >
                  {si}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SINGLE-SELECTION - show Personality + Interests when exactly one planet selected */}
        {selectedCount === 1 && (() => {
          const selectedId = Array.from(selectedPlanets)[0] as number;
          const data = planetData[selectedId];
          const interests = data?.interests ?? [];
          const t = data?.traits;

          // Selected interest string for this planet 
          const selectedInterestForThisPlanet =
            selectedInterest && selectedInterest.planetId === selectedId ? selectedInterest.interest : null;

          const onToggleInterestLocal = (interest: string) => togglePlanetInterest(selectedId, interest);

          // Renders the traits + interests for the single-selected planet
          function InterestPanel({
            selectedInterestStr,
            onToggle,
            interestsList,
          }: {
            selectedInterestStr: string | null;
            onToggle: (i: string) => void;
            interestsList: string[];
          }) {
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

                <h4 className="spacedock-subheading">Interests/About</h4>
                <div className="spacedock-interests" role="list">
                  {interestsList.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      role="button"
                      aria-pressed={selectedInterestStr === interest}
                      className={`interest-bubble ${selectedInterestStr === interest ? "selected" : ""}`}
                      onClick={() => onToggle(interest)}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <InterestPanel
              selectedInterestStr={selectedInterestForThisPlanet}
              onToggle={onToggleInterestLocal}
              interestsList={interests}
            />
          );
        })()}
      </SpacedockPanel>
    </div>
  );
}
