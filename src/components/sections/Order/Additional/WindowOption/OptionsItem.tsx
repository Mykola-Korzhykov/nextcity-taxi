import { FC, useEffect, useMemo } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";

import StyleSwitch from "./StyleSwitch";
import styles from "../Additional.module.scss";

interface IOptionsItems {
  control: any;
  label: string;
  prices: number;
  name: string;
}

const OptionsItem: FC<IOptionsItems> = ({ control, label, prices, name }) => {
  return (
    <div className={styles.option}>
      <div>
        <label className={styles.label}>{label}</label>
        <span className={styles.price}>{`${prices} ₽`}</span>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <StyleSwitch
            {...field}
            checked={field.value}
            onChange={(value) => {
              field.onChange(value);
            }}
          />
        )}
      />
    </div>
  );
};

export default OptionsItem;
