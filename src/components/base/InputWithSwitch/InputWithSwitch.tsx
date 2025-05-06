import cx from "classnames";
import { ComponentProps, PropsWithChildren } from "react";
import { Currency } from "@enigma-lake/zoot-platform-sdk";
import Input from "../Input";

import { Switch } from "../Switch/Switch";

import styles from "./InputWithSwitch.module.scss";

export type Props = PropsWithChildren<ComponentProps<"input">> & {
  switcherConfig: {
    onSwitch: () => void;
    isPlaying: boolean;
    enabled: boolean;
    currency: Currency;
    disabled: boolean;
  };
  currency: Currency;
  label?: string;
};

const InputWithSwitch = ({
  children,
  switcherConfig,
  disabled,
  currency,
  label,
  className,
  ...restProps
}: Props) => {
  return (
    <div
      className={cx(styles.base, className, {
        [styles.disabled]: switcherConfig.disabled,
      })}
    >
      {label && (
        <span className={cx(styles.label, styles[currency])}>{label}</span>
      )}
      <Switch {...switcherConfig} />
      <Input
        {...restProps}
        className={cx(styles.input)}
        disabled={disabled}
        max={99}
      />
      <div className={cx(styles.icon)}>{children}</div>
    </div>
  );
};

export default InputWithSwitch;
