import cx from "classnames";
import {
  Currency,
  sendSetUserCurrencyEvent,
} from "@enigma-lake/zoot-platform-sdk";
import Button from "../Button";
import GroupRow from "../GroupRow";
import InputWithIcon from "../InputWithIcon";
import SelectMenu from "../SelectMenu";
import { PLAY_HALVE, PLAY_DOUBLE } from "../../../types/playController";

import styles_group from "../GroupRow/GroupRow.module.scss";

interface PlayAmountControlProps {
  playAmount: number;
  minPlayAmount: number;
  maxPlayAmount: number;
  isDisabled: () => boolean;
  adjustPlayAmount: (multiplier: number) => void;
  onChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurAmount: (event: React.FocusEvent<HTMLInputElement>) => void;
  currentCurrency: Currency;
  currencies: Currency[];
  disableInput: boolean;
}

const PlayAmountControl = ({
  playAmount,
  minPlayAmount,
  maxPlayAmount,
  isDisabled,
  adjustPlayAmount,
  onChangeAmount,
  onBlurAmount,
  currentCurrency,
  currencies,
  disableInput,
}: PlayAmountControlProps) => {
  return (
    <GroupRow>
      <InputWithIcon
        className={styles_group.groupItem}
        value={playAmount}
        type="number"
        onChange={onChangeAmount}
        onBlur={onBlurAmount}
        placeholder={minPlayAmount.toString()}
        max={maxPlayAmount}
        min={minPlayAmount}
        disabled={isDisabled() || disableInput}
        currency={currentCurrency}
        label="Play Amount"
      >
        <SelectMenu
          currencies={currencies}
          selectedCurrency={currentCurrency}
          setSelectedCurrency={sendSetUserCurrencyEvent}
          disabled={isDisabled()}
        />
      </InputWithIcon>

      <Button
        className={styles_group.groupItem}
        onClick={() => adjustPlayAmount(PLAY_HALVE)}
        theme="ghost"
        disabled={isDisabled()}
      >
        <span className={styles_group.x2}>-</span>
      </Button>
      <Button
        className={styles_group.groupItem}
        onClick={() => adjustPlayAmount(PLAY_DOUBLE)}
        theme="ghost"
        disabled={isDisabled()}
      >
        <span className={cx(styles_group.x2, styles_group.last)}>+</span>
      </Button>
    </GroupRow>
  );
};

export default PlayAmountControl;
