import cx from "classnames";

import style_chevron from "./ChevronIcon.module.scss";

const ChevronIcon = ({
  open,
  disabled,
}: {
  open: boolean;
  disabled: boolean;
}) => {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        className={cx(style_chevron.chevron, {
          [style_chevron.open]: open,
          [style_chevron.disabled]: disabled,
        })}
        d="M6 9L12 15L18 9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default ChevronIcon;
