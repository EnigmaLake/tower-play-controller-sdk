import { Currency } from "@enigma-lake/zoot-platform-sdk";
import cx from "classnames";

import { usePlayController } from "../../hooks/usePlayController";
import Button from "../Button";

import styles_button from "../Button/Button.module.scss";

import { GAME_MODE } from "../../../types";
import { useCallback, useEffect, useMemo } from "react";
import { selectButton, addPressedClass, removePressedClass } from "../../utils";
import PlayAmountControl from "../PlayController/PlayController";
import { useAutoManualPlayState } from "../../AutoManualPlayStateProvider/AutoManualPlayStateContext";

const ManualPlayController = () => {
  const { config } = useAutoManualPlayState();

  const {
    currentCurrency,
    currencies,
    playAmount,
    playOptions,
    minPlayAmount,
    maxPlayAmount,
    isValidPlayAmount,
    adjustPlayAmount,
    onChangeAmount,
    onBlurAmount,
    manualPlay: { isDisabled, onPlay, canCashout },
  } = usePlayController();

  const roleButton = GAME_MODE.MANUAL;

  const activeClassName = useMemo(() => {
    return currentCurrency === Currency.GOLD
      ? styles_button.buttonGold__active
      : styles_button.buttonSweeps__active;
  }, [currentCurrency]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.code !== "Space") {
        return;
      }

      const button = selectButton(roleButton);
      if (!button || isDisabled()) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      addPressedClass(roleButton, activeClassName);
      button.click();
    },
    [roleButton, isDisabled, activeClassName],
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.code !== "Space") {
        return;
      }

      const button = selectButton(roleButton);
      if (!button) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      removePressedClass(roleButton, activeClassName);
    },
    [roleButton, activeClassName],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress, true);
    window.addEventListener("keyup", handleKeyUp, true);

    return () => {
      window.removeEventListener("keydown", handleKeyPress, true);
      window.removeEventListener("keyup", handleKeyUp, true);
    };
  }, [handleKeyPress, handleKeyUp]);

  const isButtonDisabled = isDisabled() || !isValidPlayAmount;

  return (
    <>
      <PlayAmountControl
        playAmount={playAmount}
        minPlayAmount={minPlayAmount}
        maxPlayAmount={maxPlayAmount}
        isDisabled={isDisabled}
        adjustPlayAmount={adjustPlayAmount}
        onChangeAmount={onChangeAmount}
        onBlurAmount={onBlurAmount}
        currentCurrency={currentCurrency}
        currencies={currencies}
        disableInput={playOptions.disableInput}
      />

      {canCashout ? (
        <Button
          disabled={
            config.playOptions.disabledController ||
            !config.playOptions.isPlaying
          }
          className={styles_button.buttonCashout}
          onClick={config.onCashout}
          roleType={roleButton}
        >
          Cashout {config.currencyOptions.winText}
        </Button>
      ) : (
        <Button
          disabled={isButtonDisabled}
          className={cx({
            [styles_button.buttonGold]: currentCurrency === Currency.GOLD,
            [styles_button.buttonSweeps]: currentCurrency !== Currency.GOLD,
          })}
          onClick={onPlay}
          roleType={roleButton}
        >
          Play now
        </Button>
      )}
    </>
  );
};

export default ManualPlayController;
