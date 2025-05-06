import { GAME_MODE } from "../types";

export const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16,
      )}`
    : null;
};

export const selectButton = (gameMode: GAME_MODE) => {
  const role = `role-${gameMode}-button`;
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    `[data-role="${role}"]`,
  );
  return buttons[0];
};

export const addPressedClass = (
  gameMode: GAME_MODE,
  activeClassName: string,
) => {
  const button = selectButton(gameMode);

  if (!button) {
    return;
  }
  if (!button.classList.contains(activeClassName)) {
    button.classList.add(activeClassName);
  }
};

export const removePressedClass = (
  gameMode: GAME_MODE,
  activeClassName: string,
) => {
  const button = selectButton(gameMode);

  if (!button) {
    return;
  }
  if (button.classList.contains(activeClassName)) {
    button.classList.remove(activeClassName);
  }
};
