export type IconName =
  | "mic"
  | "wave"
  | "check"
  | "star"
  | "clock"
  | "gear"
  | "sparkle"
  | "close"
  | "orbit";

export interface NavPillLink {
  label: string;
  href: string;
  sectionId: string;
}

export interface FeatureItem {
  icon: IconName;
  title: string;
  description: string;
}

export interface StepItem {
  title: string;
  description: string;
}

export interface DriftConfig {
  seed: number;
  amplitudeX: number;
  amplitudeY: number;
  speed: number;
}

export interface FaqEntry {
  question: string;
  answer: string;
}
