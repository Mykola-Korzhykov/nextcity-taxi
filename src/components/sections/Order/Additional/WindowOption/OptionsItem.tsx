import { FC } from "react";
import { Controller } from "react-hook-form";

import StyleSwitch from "./StyleSwitch";
import styles from "../Additional.module.scss";

interface IOptionsItems {
  control: any;
  label: string;
  price: string;
  name: string;
}

const OptionsItem: FC<IOptionsItems> = ({ control, label, price, name }) => {
  return (
    <div className={styles.option}>
      <div>
        <label className={styles.label}>{label}</label>
        <span className={styles.price}>{price}</span>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <StyleSwitch
            {...field}
            checked={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
};

export default OptionsItem;
