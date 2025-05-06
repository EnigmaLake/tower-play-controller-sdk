import { useRef } from "react";
import { PlaySettingsProps } from "../../../types/playController";
import style_difficulty from "./DifficultySelector.module.scss";
import Selector from "./Selector";
import { RiskTypes, SELECTORS } from "./types";

const DifficultySelector = ({
  playOptions,
  dropdownConfig,
}: {
  playOptions: PlaySettingsProps;
  dropdownConfig: {
    bgColorHex: string;
    riskColorConfig: {
      [RiskTypes.LOW]: string;
      [RiskTypes.MEDIUM]: string;
      [RiskTypes.HIGH]: string;
    };
  };
}) => {
  const { risks, disabledMenu, currentRisk, onRiskChange } = playOptions;
  const riskColor = useRef(dropdownConfig.riskColorConfig[RiskTypes.LOW]);

  function onRiskSelected(value: RiskTypes) {
    riskColor.current = dropdownConfig.riskColorConfig[value];
    onRiskChange(value);
  }
  return (
    <div className={style_difficulty.base}>
      <Selector<RiskTypes>
        currentValue={currentRisk}
        label={SELECTORS.RISK}
        values={risks}
        onSelect={onRiskSelected}
        disabled={disabledMenu}
        riskColor={riskColor.current}
      />
    </div>
  );
};

export default DifficultySelector;
