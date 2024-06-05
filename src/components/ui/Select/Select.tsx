import { FC, useState } from "react";
import styles from "./Select.module.scss";

type TSelect = {
  address: string;
};

interface ISelect {
  list: TSelect[];
  customClass?: string;
  onChange: (value: string) => void;
}

const Select: FC<ISelect> = ({ list, customClass = "", onChange }) => {
  const handleSelect = (item: TSelect) => {
    onChange(item.address);
  };

  return (
    <div className={`${styles.wrapper} ${customClass}`}>
      <ul className={styles.list}>
        {list.map((item, index) => (
          <li
            className={styles.item}
            key={index}
            onClick={() => handleSelect(item)}
          >
            {item.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
