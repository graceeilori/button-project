import "./SolarSystem.css";

export default function SolarSystem() {
  return (
    <div className="solar-system">
      <div className="sun">☀</div>

      <Planet className="planet planet-top" />
      <Planet className="planet planet-right" />
      <Planet className="planet planet-bottom" />
      <Planet className="planet planet-left" />
    </div>
  );
}

function Planet({ className }: { className: string }) {
  return (
    <div className={className}>
      <div className="planet-core" />

      <div className="moons">
        <div className="moon moon-0" />
        <div className="moon moon-1" />
        <div className="moon moon-2" />
        <div className="moon moon-3" />
      </div>
    </div>
  );
}
