import React from 'react';
import {  useState } from "react";
const Planet = (props: { make: string; name: string; chris: string; caleb: string; grace: string; jj: string; } ) => {
  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <h2>{props.name}</h2>
      <p>name: {props.name}</p>
      <p>moonCh: {props.chris}</p>
      <p>moonC: {props.caleb}</p>
      <p>moonG: {props.grace}</p>
      <p>moonJ: {props.jj}</p>
    </div>
  );
};

export default Planet;

/*

Above is basic planet constant  i was going to try and use but alas couldnt get to work properly. Below is a vauge function that does move AN objext when two buttons are press,
But i was unable to make it focus on the planets and the moons. 

*/

// function MoveMoon() { // Base of this was AI gen but was heavily modified
  
  
//   //Use states for each button
//   const [chrisPlanet, chrisSet] = useState(false);
//   const [calebPlanet, calebSet] = useState(false);
//   const [gracePlanet, graceSet] = useState(false);
//   const [jjPlanet, jjSet] = useState(false);

//   //useStates for each moon. 0 = at planet 1 = in sun 2 = astroid (ideally. Bool for now. Sun or Not.)
//   //This is a bit of a monster so if anyone has any better ideas let me know
//   const [movedChC, setChC] = useState(true); //Christ & Caleb
//   const [movedChG, setChG] = useState(true); //Chris & Grace 
//   const [movedChJ, setChJ] = useState(true); //Chris & JJ 
//   const [movedCG, setCG] = useState(true); //Caleb & Grace 
//   const [movedCJ, setCJ] = useState(true); //Caleb & JJ 
//   const [movedGJ, setGJ] = useState(true); //Grace & JJ 

//   //Also kind of a monster
//   const handleMove = () => { //Is "one step behind". Needs some refinement
//     if (chrisPlanet && calebPlanet) {
//       setChC(!movedChC); //Move to area
//     }
//     if (chrisPlanet && gracePlanet) {
//       setChC(!movedChG); //Move to area
//     }
//     if (chrisPlanet && jjPlanet) {
//       setChC(!movedChJ); //Move to area
//     }
//     if (calebPlanet && gracePlanet) {
//       setChC(!movedCG); //Move to area
//     }
//     if (calebPlanet && jjPlanet) {
//       setChC(!movedCJ); //Move to area
//     }
//     if (gracePlanet && jjPlanet) {
//       setChC(!movedGJ); //Move to area
//     }

//   };

//   const objectStyle = { //This will be the moon
//     width: '100px',
//     height: '100px',
//     backgroundColor: 'blue',
    
//     transition: 'transform 0.5s ease',
//     // Moves object right when isMoved is true
//     //Currently doesnt move to the center but i know we can do this somehow
//     transform: movedChC ? 'translate(50%, 50%)' : 'translateX(0px)', //Should be translate(inital) in the actual code
//   };

//   return (
//     <div>
//       <button 
//         onClick={() => { calebSet(!calebPlanet); handleMove(); }} 
//         style={{ background: calebPlanet ? 'green' : 'gray' }}
//       >
//         Caleb
//       </button>
//       <button 
//         onClick={() => { chrisSet(!chrisPlanet); handleMove(); }} 
//         style={{ background: chrisPlanet ? 'green' : 'gray' }}
//       >
//         Chris
//       </button>
//       <button 
//         onClick={() => { graceSet(!gracePlanet); handleMove(); }} 
//         style={{ background: gracePlanet ? 'green' : 'gray' }}
//       >
//         Grace
//       </button>
//       <button 
//         onClick={() => { jjSet(!jjPlanet); handleMove(); }} 
//         style={{ background: jjPlanet ? 'green' : 'gray' }}
//       >
//         JJ
//       </button>
      
//       <div>
//         <div style={objectStyle}></div>
//         <button onClick={handleMove}>
//           {movedChC ? 'Move Back' : 'Move Forward'}
//         </button>
//       </div>
//     </div>
//   );
// }
