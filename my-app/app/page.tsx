import "./SolarSystem.css";

export default function SolarSystem() {
  return (
    <div className="solar-system">
      <div className="sun"></div>

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
        className="planet planet-bottom" 
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

type PlanetProps = {
  className: string;
  planetImg: string;
  moons: [string, string, string, string];
};

function Planet({ className, planetImg, moons }: PlanetProps) {
  return (
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
  );
}