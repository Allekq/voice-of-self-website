const TAU = Math.PI * 2;

const fract = (value: number) => value - Math.floor(value);

const seededUnit = (seed: number, offset: number) =>
  fract(Math.sin((seed + offset) * 12.9898) * 43758.5453123);

export interface NoiseDriftConfig {
  seed: number;
  amplitudeX: number;
  amplitudeY: number;
  speed: number;
}

export interface DriftPoint {
  x: number;
  y: number;
}

export const createNoiseDrift = ({ seed, amplitudeX, amplitudeY, speed }: NoiseDriftConfig) => {
  const phaseA = seededUnit(seed, 0.1) * TAU;
  const phaseB = seededUnit(seed, 1.7) * TAU;
  const phaseC = seededUnit(seed, 2.9) * TAU;
  const phaseD = seededUnit(seed, 4.2) * TAU;

  return (timeMs: number): DriftPoint => {
    const t = (timeMs / 1000) * speed;

    const x =
      amplitudeX *
      (0.58 * Math.sin(t + phaseA) +
        0.27 * Math.sin(t * 1.83 + phaseB) +
        0.15 * Math.cos(t * 0.61 + phaseC));

    const y =
      amplitudeY *
      (0.56 * Math.cos(t * 0.92 + phaseC) +
        0.29 * Math.sin(t * 1.46 + phaseD) +
        0.15 * Math.cos(t * 0.57 + phaseA));

    return { x, y };
  };
};
