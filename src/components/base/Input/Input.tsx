import cx from "classnames";
import React, { useCallback } from "react";

import { cleanInputNumber } from "./cleanInputNumber";
import styles from "./Input.module.scss";

const Input = ({
  onChange,
  disabled,
  className,
  ...restProps
}: React.ComponentProps<"input">) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        event.target.value = cleanInputNumber(event.target.value);
        onChange?.(event);
      }
    },
    [disabled, onChange],
  );

  return (
    <input
      {...restProps}
      disabled={disabled}
      onChange={handleChange}
      className={cx(styles.base, className, { [styles.disabled]: disabled })}
    />
  );
};

export default Input;
