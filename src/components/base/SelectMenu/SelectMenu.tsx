import cx from "classnames";
import { Currency } from "@enigma-lake/zoot-platform-sdk";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { GoldIcon } from "./GoldIcon";
import { SweepsIcon } from "./SweepsIcon";
import style_select from "./SelectMenu.module.scss";
import ChevronIcon from "../ChevronIcon/ChevronIcon";

interface ISelectMenuProps {
  currencies: Currency[];
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: { currency: Currency }) => void;
  disabled?: boolean;
}

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const getIcon = (option: Currency) =>
  option === Currency.SWEEPS ? <SweepsIcon /> : <GoldIcon />;

const SelectMenu = ({
  currencies,
  selectedCurrency,
  setSelectedCurrency,
  disabled = false,
}: ISelectMenuProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    const target = e.target as HTMLDivElement;
    const value = target.dataset.value;

    if (!value) {
      return;
    }

    setSelectedCurrency({ currency: value as Currency });
  };

  return (
    <Menu as="div" className={cx(style_select.menu)}>
      {({ open }) => (
        <>
          <MenuButton
            className={cx(style_select.button, {
              [style_select.disabled]: disabled,
            })}
            disabled={disabled}
            as="div"
          >
            {getIcon(selectedCurrency)}
            <ChevronIcon open={open} disabled={disabled} />
          </MenuButton>
          <MenuItems
            anchor={{ to: "top start" }}
            className={cx(style_select.menuItems)}
          >
            {currencies.map((option) => (
              <MenuItem
                key={`element-${option}`}
                as="div"
                data-value={option}
                onClick={handleClick}
                className={cx(style_select.menuItem, {
                  [style_select.selected]:
                    String(selectedCurrency) === String(option),
                })}
              >
                {getIcon(option)}
                {capitalize(String(option))}
              </MenuItem>
            ))}
          </MenuItems>
        </>
      )}
    </Menu>
  );
};

export default SelectMenu;
