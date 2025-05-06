import { Switch as HeadlessSwitch } from "@headlessui/react";
import { Fragment, useMemo, useEffect } from "react";
import cx from "classnames";
import { Currency } from "@enigma-lake/zoot-platform-sdk";

import styles from "./Switch.module.scss";

interface SwitchProps {
  enabled: boolean;
  onSwitch: () => void;
  isPlaying: boolean;
  currency: Currency;
  disabled: boolean;
}

export const Switch = ({
  enabled,
  onSwitch,
  disabled,
  currency,
  isPlaying,
}: SwitchProps) => {
  const switcherClassName = useMemo(
    () =>
      cx(styles.switcher, styles[currency], {
        [styles.checked]: enabled,
        [styles.unchecked]: !enabled,
        [styles.disabled]: disabled,
      }),
    [enabled, currency, disabled],
  );

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const focusedElement = document.activeElement as HTMLElement;
      if (
        event.code === "Space" &&
        focusedElement?.getAttribute("role") === "switch"
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        focusedElement.blur();
      }
    };

    // Attach global event listener
    window.addEventListener("keydown", handleGlobalKeyDown, true);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown, true);
    };
  }, []);

  return (
    <HeadlessSwitch
      checked={enabled}
      onChange={onSwitch}
      as={Fragment}
      disabled={isPlaying}
    >
      <div className={styles.base}>
        <span className={styles.label}>Auto</span>
        <div className={switcherClassName}>
          <span
            className={cx(styles.thumb, { [styles["move-right"]]: enabled })}
          />
        </div>
      </div>
    </HeadlessSwitch>
  );
};
