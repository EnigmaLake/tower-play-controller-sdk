import cx from "classnames";
import React from "react";

import { GAME_MODE } from "../../../types";
import styles from "./Button.module.scss";

const themes = {
  primary: "primary",
  success: "success",
  ghost: "ghost",
};

type Props = React.ComponentProps<"button"> & {
  theme?: (typeof themes)[keyof typeof themes];
  roleType?: GAME_MODE;
  className?: string;
};

const Button = ({
  disabled,
  roleType,
  className = "",
  theme = "primary",
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={cx(styles.base, styles[`base__theme-${theme}`], className, {
        [styles["base__state-disabled"]]: disabled,
      })}
      disabled={disabled}
      data-role={`role-${roleType}-button`}
    />
  );
};

Button.themes = themes;

export default Button;
