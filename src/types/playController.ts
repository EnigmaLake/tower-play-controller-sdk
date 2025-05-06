import { Currency, PlayLimits } from "@enigma-lake/zoot-platform-sdk";
import { RiskTypes } from "../components/base/DifficultySelector/types";

export type StylingProps = {
  panel: {
    bottom: string;
    bgColorHex: string;
  };
  dropdown: {
    bgColorHex: string;
    riskColorConfig: {
      [RiskTypes.LOW]: string;
      [RiskTypes.MEDIUM]: string;
      [RiskTypes.HIGH]: string;
    };
  };
};

export type CurrencyProps = {
  currentCurrency: Currency;
  currencies: Currency[];
  winText: string;
};

export type ActionsProps = {
  onPlay: () => void;
  onAutoPlay: (selection: number[], next: () => void, stop: () => void) => void;
  onCashout: () => void;
};

export type PlaySettingsProps = {
  isPlaying: boolean;
  canCashout: boolean;
  disabledController: boolean;
  risks: RiskTypes[];
  currentRisk: RiskTypes;
  onRiskChange: (risk: RiskTypes) => void;
  disabledMenu: boolean;
  displayController: boolean;
  disableInput: boolean;
  showAutoPlayToast: (props: {
    type: "success" | "error" | "warning" | "info";
    message: string;
  }) => void;
  playHook: () => {
    playLimits?: PlayLimits;
    playAmount: number;
    setPlayAmount: (value: number) => void;
  };
  autoPlayDelay?: number;
};

export type PlayControllerProps = StylingProps &
  ActionsProps & {
    currencyOptions: CurrencyProps;
    playOptions: PlaySettingsProps;
  };

export const PLAY_HALVE = 0.5;
export const PLAY_DOUBLE = 2;
