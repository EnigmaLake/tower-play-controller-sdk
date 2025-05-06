import cx from "classnames";
import { ComponentProps } from "react";

import styles from "./GroupRow.module.scss";

export type Props = ComponentProps<"div"> & {
  label?: string;
};

const GroupRow = ({ children, label, className, ...restProps }: Props) => {
  return (
    <div {...restProps} className={cx(styles.base, className)}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.group}>{children}</div>
    </div>
  );
};

export default GroupRow;
