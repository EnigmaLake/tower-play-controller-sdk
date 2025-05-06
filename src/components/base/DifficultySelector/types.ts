export interface SelectorProps<T> {
  label: string;
  values: T[];
  onSelect: (value: T) => void;
  riskColor: string;
  disabled: boolean;
  currentValue: T;
}

export enum SELECTORS {
  RISK = "Risk",
}

export enum RiskTypes {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
