import { AUTO_PLAY_STATE } from "../../types";
import { useAutoManualPlayState } from "../AutoManualPlayStateProvider/AutoManualPlayStateContext";
import { ChangeEvent, FocusEvent, useRef } from "react";

export const usePlayController = () => {
  const {
    config,
    autoPlay: {
      setNumberOfPlays,
      numberOfPlays,
      setPlayedRounds,
      playedRounds,
      selection,
      setState,
      state,
    },
  } = useAutoManualPlayState();
  const { currentCurrency, currencies, winText } = config.currencyOptions;
  const {
    isPlaying,
    canCashout,
    disabledController,
    showAutoPlayToast,
    autoPlayDelay = 1500,
    playHook,
  } = config.playOptions;

  const { playAmount, playLimits, setPlayAmount } = playHook?.() ?? {};
  const minPlayAmount = playLimits?.[currentCurrency]?.limits.min ?? 0;
  const maxPlayAmount = playLimits?.[currentCurrency]?.limits.max ?? 0;
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoplayActiveRef = useRef(false);

  const stopAutoplay = () => {
    isAutoplayActiveRef.current = false;
    if (playIntervalRef.current) {
      clearTimeout(playIntervalRef.current);
      playIntervalRef.current = null;
    }
    setState(AUTO_PLAY_STATE.SELECTING);
    setTimeout(() => {
      setPlayedRounds(0);
    }, 1500);
  };

  const loopRounds = (currentPlayedRounds: number, remainingPlays: number) => {
    if (!isAutoplayActiveRef.current) {
      return;
    }

    if (remainingPlays < 1 || numberOfPlays === 0) {
      setNumberOfPlays(Infinity);
      stopAutoplay();
      return;
    }

    setPlayedRounds(currentPlayedRounds + 1);
    setNumberOfPlays((prev) => Math.max(prev - 1, 0));

    config.onAutoPlay(
      selection,
      () => {
        if (!isAutoplayActiveRef.current) {
          return;
        }

        playIntervalRef.current = setTimeout(
          () => loopRounds(currentPlayedRounds + 1, remainingPlays - 1),
          autoPlayDelay,
        );
      },
      stopAutoplay,
    );
  };

  const handleAutoPlay = () => {
    if (disabledController) {
      return;
    }

    if (selection.length === 0) {
      showAutoPlayToast?.({
        type: "info",
        message: "Please select at least one tile to start autoplay.",
      });
      return;
    }

    isAutoplayActiveRef.current = true;
    setState(AUTO_PLAY_STATE.PLAYING);

    loopRounds(playedRounds, numberOfPlays);
  };

  const isDisabled = () => disabledController || isPlaying;
  const isAutoplayDisabled = () =>
    disabledController || state === AUTO_PLAY_STATE.PLAYING;

  const adjustPlayAmount = (multiplier: number) => {
    if (isDisabled()) {
      return;
    }
    const newAmount = Math.max(
      minPlayAmount,
      Math.min(playAmount * multiplier, maxPlayAmount),
    );
    setPlayAmount(Number(newAmount.toFixed(2)));
  };

  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled()) {
      return;
    }
    setPlayAmount(Number(event.currentTarget.value));
  };

  const onBlurAmount = (event: FocusEvent<HTMLInputElement>) => {
    if (isDisabled()) {
      return;
    }
    const newAmount = Number(event.currentTarget.value);
    setPlayAmount(Math.max(minPlayAmount, Math.min(newAmount, maxPlayAmount)));
  };

  const isValidPlayAmount =
    playAmount >= minPlayAmount && playAmount <= maxPlayAmount;

  return {
    currentCurrency,
    currencies,
    playAmount,
    minPlayAmount,
    maxPlayAmount,
    setPlayAmount,
    adjustPlayAmount,
    onChangeAmount,
    onBlurAmount,
    playOptions: config.playOptions,
    isValidPlayAmount,
    winText,
    manualPlay: {
      isDisabled,
      onPlay: config.onPlay,
      canCashout,
    },
    autoPlay: {
      isDisabled: isAutoplayDisabled,
      state,
      onPlay: handleAutoPlay,
      onStopPlay: stopAutoplay,
    },
  };
};
