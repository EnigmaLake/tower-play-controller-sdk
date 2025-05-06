import { useContext } from "react";
import { createContext } from "react";

import { GAME_MODE, AUTO_PLAY_STATE } from "../../types/gameMode";
import { PlayControllerProps } from "../../types/playController";

export interface AutoManualPlayStateContextType {
  mode: GAME_MODE;
  config: PlayControllerProps;
  manual: {
    playManualMode: () => void;
  };
  autoPlay: {
    state: AUTO_PLAY_STATE;
    playedRounds: number;
    numberOfPlays: number;
    selection: number[];
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    start: (numberOfPlays: number) => void;
    stop: () => void;
    setState: React.Dispatch<React.SetStateAction<AUTO_PLAY_STATE>>;
    setPlayedRounds: React.Dispatch<React.SetStateAction<number>>;
    setNumberOfPlays: React.Dispatch<React.SetStateAction<number>>;
    setSelection: (values: number[]) => void;
    updateState: (
      newState: AUTO_PLAY_STATE.SELECTING | AUTO_PLAY_STATE.PLAYING,
    ) => void;
  };
  reset: () => void;
  toggleMode: () => void;
}

export const AutoManualPlayStateContext = createContext<
  AutoManualPlayStateContextType | undefined
>(undefined);

export const useAutoManualPlayState = () => {
  const context = useContext(AutoManualPlayStateContext);
  if (!context) {
    throw new Error(
      "useAutoManualPlayStateState must be used within a AutoManualPlayStateProvider",
    );
  }
  return context;
};
