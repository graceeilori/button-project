'use client';

import "./SolarSystem.css";
import { useState, useEffect} from "react";

export default function SolarSystem() {
  return (
    <div className="solar-system">
      <div className="sun"></div>

      <MoveMoon/>
      <Planet
       className="planet planet-top" 
       planetImg="/caleb_icons/calebMotorcyclePlanet.png"
       moons={[
          "/caleb_icons/hiking.png",
          "/caleb_icons/piano.png",
          "/caleb_icons/snowboarding.png",
          "/caleb_icons/terminator.png",
        ]}
      />
      <Planet 
        className="planet planet-right" 
        planetImg="/chris_icons/chris_icon.png"
        moons={[
          "/chris_icons/catalog-magazine.png",
          "/chris_icons/gun-shooting.svg",
          "/jj_icons/hearts.png",
          "/chris_icons/snowboarding.svg",
        ]}
        />
      <Planet 
        className="planet planet-bottom padded-planet" 
        planetImg="/grace_icons/Planet.png"
        moons={[
          "/jj_icons/oven.png",
          "/chris_icons/gun-shooting.svg",
          "/grace_icons/scd.png",
          "/grace_icons/piano.png",
        ]}
        />
      <Planet 
        className="planet planet-left" 
        planetImg="/jj_icons/JJ_Cards_581.png"
         moons={[
          "/jj_icons/transgender_flag.png",
          "/jj_icons/hiking.png",
          "/jj_icons/oven.png",
          "/jj_icons/hearts.png",
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

type PlanetProps = {
  className: string;
  planetImg: string;
  moons: [string, string, string, string];
};


//Testing stuff- ideally id like to pass the relevent buttons as params but i have NO idea how to do that
function MoveMoon() { // Base of this was AI gen but was heavily modified
  
  //Use states for each button
  const [chrisPlanet, chrisSet] = useState(false);
  const [calebPlanet, calebSet] = useState(false);
  const [gracePlanet, graceSet] = useState(false);
  const [jjPlanet, jjSet] = useState(false);

  //useStates for each moon. 0 = at planet 1 = in sun 2 = astroid (ideally. Bool for now. Sun or Not.)
  //This is a bit of a monster so if anyone has any better ideas let me know
  const [movedChC, setChC] = useState(true); //Christ & Caleb
  const [movedChG, setChG] = useState(true); //Chris & Grace 
  const [movedChJ, setChJ] = useState(true); //Chris & JJ 
  const [movedCG, setCG] = useState(true); //Caleb & Grace 
  const [movedCJ, setCJ] = useState(true); //Caleb & JJ 
  const [movedGJ, setGJ] = useState(true); //Grace & JJ 

  //Also kind of a monster
  const handleMove = () => { //Is "one step behind". Needs some refinement
    if (chrisPlanet && calebPlanet) {
      setChC(!movedChC); //Move to area
    }
    if (chrisPlanet && gracePlanet) {
      setChC(!movedChG); //Move to area
    }
    if (chrisPlanet && jjPlanet) {
      setChC(!movedChJ); //Move to area
    }
    if (calebPlanet && gracePlanet) {
      setChC(!movedCG); //Move to area
    }
    if (calebPlanet && jjPlanet) {
      setChC(!movedCJ); //Move to area
    }
    if (gracePlanet && jjPlanet) {
      setChC(!movedGJ); //Move to area
    }

  };

  const objectStyle = { //This will be the moon
    width: '100px',
    height: '100px',
    backgroundColor: 'blue',
    
    transition: 'transform 0.5s ease',
    // Moves object right when isMoved is true
    //Currently doesnt move to the center but i know we can do this somehow
    transform: movedChC ? 'translate(50%, 50%)' : 'translateX(0px)', //Should be translate(inital) in the actual code
  };

  return (
    <div>
      <button 
        onClick={() => { calebSet(!calebPlanet); handleMove(); }} 
        style={{ background: calebPlanet ? 'green' : 'gray' }}
      >
        Caleb
      </button>
      <button 
        onClick={() => { chrisSet(!chrisPlanet); handleMove(); }} 
        style={{ background: chrisPlanet ? 'green' : 'gray' }}
      >
        Chris
      </button>
      <button 
        onClick={() => { graceSet(!gracePlanet); handleMove(); }} 
        style={{ background: gracePlanet ? 'green' : 'gray' }}
      >
        Grace
      </button>
      <button 
        onClick={() => { jjSet(!jjPlanet); handleMove(); }} 
        style={{ background: jjPlanet ? 'green' : 'gray' }}
      >
        JJ
      </button>
      
      <div>
        <div style={objectStyle}></div>
        <button onClick={handleMove}>
          {movedChC ? 'Move Back' : 'Move Forward'}
        </button>
      </div>
    </div>
  );
}

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
