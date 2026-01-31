'use client';

import "./SolarSystem.css";
import {  useState } from "react";

export default function SolarSystem() {
  return (
    <div className="solar-system">
      <div className="sun"></div>

      <Planet
       className="planet planet-top" 
       planetImg="/caleb_icons/calebMotorcyclePlanet.png"
       moons={[
          "/IconsUsed/hiking.png",
          "/IconsUsed/piano.png",
          "/IconsUsed/snowboarding.png",
          "/IconsUsed/terminator.png",
        ]}
      />
      <Planet 
        className="planet planet-right" 
        planetImg="/chris_icons/chris_icon.png"
        moons={[
          "/IconsUsed/catalog-magazine.png",
          "/IconsUsed/gun-shooting.svg",
          "/IconsUsed/hearts.png",
          "/IconsUsed/snowboarding.png",
        ]}
        />
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



function Planet({ className, planetImg, moons}: PlanetProps) {
   const [selected, setSelected] = useState(false);
  return (
    <div>
     <button
      type="button"
      className={`${className} planet-button ${
        selected ? "selected" : ""
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
