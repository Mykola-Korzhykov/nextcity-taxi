import { FC } from "react";
import { useFormContext } from "react-hook-form";

import CallbackBtn from "@components/ui/CallbackBtn/CallbackBtn";
import { ICallbackBtn } from "interfaces/IAdditional";
import OptionsItem from "./OptionsItem";

import { OptionsData } from "./OptionsData";
import styles from "../Additional.module.scss";

const WindowOptions: FC<ICallbackBtn> = ({ setCurrentView }) => {
  const { control } = useFormContext();

  return (
    <div className="">
      <h3 className={styles.title}>Дополнительные опции</h3>
      {OptionsData.map((option, index) => (
        <OptionsItem
          key={index}
          control={control}
          label={option.label}
          price={option.price}
          name={`options[${index}].value`}
        />
      ))}
      <CallbackBtn setCurrentView={setCurrentView} />
    </div>
  );
};

export default WindowOptions;
