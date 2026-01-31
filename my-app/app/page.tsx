'use client';

import "./SolarSystem.css";
import { useState } from "react";
import Image from 'next/image';

export default function SolarSystem() {
  return (
    <div className="page">
      <div className="main-container">
        <div className="title text-center">A FAMILY OF BUTTONS</div>
        {/* Orbits */}
        <div className="relative">
          {/* Outer orbit */}
          <div className="w-[800px] h-[800px] relative">
            <div className="w-full h-full absolute inset-0 rounded-full outline outline-4 outline-offset-[-2px] outline-white blur-sm"></div>
            <Image
              src="/assets/orbit_large.svg"
              alt="orbit"
              width={800}
              height={800}
              className="absolute inset-0"
            />
            <div className="absolute top-[5%] left-[45%] z-10">
              <Planet
                className="planet"
                planetImg="/caleb_icons/calebMotorcyclePlanet.png"
                moons={[
                  "/IconsUsed/hiking.png",
                  "/IconsUsed/piano.png",
                  "/IconsUsed/snowboarding.png",
                  "/IconsUsed/terminator.png",
                ]}
              />
            </div>
            <div className="absolute bottom-[50%] left-[18%] z-10">
              <Planet
                className="planet"
                planetImg="/chris_icons/chris_icon.png"
                moons={[
                  "/IconsUsed/catalog-magazine.png",
                  "/IconsUsed/gun-shooting.svg",
                  "/IconsUsed/hearts.png",
                  "/IconsUsed/snowboarding.png",
                ]}
              />
            </div>
          </div>
          {/* Inner orbit */}
          <div className="w-[480px] h-[480px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-full h-full absolute inset-0 rounded-full outline outline-4 outline-offset-[-2px] outline-white blur-sm"></div>
            <Image
              src="/assets/orbit_large.svg"
              alt="orbit"
              width={480}
              height={480}
              className="absolute inset-0"
            />
          </div>
          <div className="absolute bottom-[20%] right-[5%] z-10">
            <Planet
              className="planet planet-bottom padded-planet"
              planetImg="/grace_icons/Planet.png"
              moons={[
                "/IconsUsed/oven.png",
                "/IconsUsed/gun-shooting.svg",
                "/IconsUsed/scd.png",
                "/IconsUsed/piano.png",
              ]}
            />
          </div>
          <div className="absolute top-[20%] left-[0%] z-10">
            <Planet
              className="planet planet-left"
              planetImg="/jj_icons/JJ_Cards_581.png"
              moons={[
                "/IconsUsed/transgender_flag.png",
                "/IconsUsed/hiking.png",
                "/IconsUsed/oven.png",
                "/IconsUsed/hearts.png",
              ]}
            />
          </div>

          <div className="sun absolute top-1/2 left-1/2"></div>
        </div>
      </div>
    </div>
  );
}
/*
Click Planet 1 -> planet 1 toggle on
CLick Planet 2 -> planet 2 toggle on
  Shared unit between Planet 1 and planet 2 goes into the sun
Click Planet 3 -> Planet 3 toggle on
  Shared unit between planet 1 and planet 2 becomes "astroid" around the sun, as does p1/p3 and p2/p3.
Click planet 1 -> planet 1 toggle off
  Shared units with p1 go back to thier planets, while p2/p3 moves to the sun
  
*/


interface PlanetProps {
  className: string;
  planetImg: string;
  moons: [string, string, string, string];
};



function Planet({ className, planetImg, moons }: PlanetProps) {
  const [selected, setSelected] = useState(false);
  return (
    <div>
      <button
        type="button"
        className={`${className} planet-button ${selected ? "selected" : ""
          }`}
        onClick={() => setSelected(!selected)}
        aria-pressed={selected}>

        <div className={className}>
          {/* Planet core */}
          <div className="planet-core circle">
            <img src={planetImg} alt="Planet" />
          </div>

          {/* Moons */}
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
        </div>
      </button>
    </div>
  );
}
