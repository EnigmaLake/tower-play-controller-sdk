import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { SelectorProps } from "./types";
import cx from "classnames";
import style_select from "./Selector.module.scss";
import ChevronIcon from "../ChevronIcon/ChevronIcon";

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const Selector = <T,>({
  currentValue,
  label,
  riskColor,
  values,
  onSelect,
  disabled,
}: SelectorProps<T>) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    const target = e.target as HTMLDivElement;
    const value = target.dataset.value;

    if (!value) {
      return;
    }

    onSelect(value as T);
  };

  return (
    <div className={cx(style_select.base)}>
      {label && <span className={cx(style_select.label)}>{label}</span>}
      <Menu as="div" className={cx(style_select.menu)}>
        {({ open }) => (
          <>
            <MenuButton
              className={cx(style_select.button, {
                [style_select.disabled]: disabled,
              })}
              style={{ color: riskColor }}
              disabled={disabled}
            >
              {capitalize(String(currentValue))}
              <ChevronIcon open={open} disabled={disabled} />
            </MenuButton>
            <MenuItems
              anchor={{ to: "top start" }}
              className={cx(style_select.menuItems)}
            >
              {values.map((value) => (
                <MenuItem
                  key={`element-${value}`}
                  as="div"
                  data-value={value}
                  onClick={handleClick}
                  className={cx(style_select.menuItem, {
                    [style_select.selected]:
                      String(currentValue) === String(value),
                  })}
                >
                  {capitalize(String(value))}
                </MenuItem>
              ))}
            </MenuItems>
          </>
        )}
      </Menu>
    </div>
  );
};

export default Selector;
