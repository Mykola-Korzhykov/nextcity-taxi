import { FC } from "react";
import { useFormContext } from "react-hook-form";

import CallbackBtn from "@components/ui/CallbackBtn/CallbackBtn";
import { ICallbackBtn, Window } from "interfaces/IAdditional";
import OptionsItem from "./OptionsItem";

import { OptionsData } from "./OptionsData";
import styles from "../Additional.module.scss";

const WindowOptions: FC<ICallbackBtn> = ({ setCurrentView, currentView }) => {
  const { control } = useFormContext();

  const view = Window.WINDOW_OPTIONS;

  return (
    <div className={`view ${view === currentView ? "viewActive" : ""}`}>
      <h3 className={styles.title}>Дополнительные опции</h3>
      {OptionsData.map((option, index) => (
        <OptionsItem
          key={index}
          control={control}
          label={option.label}
          prices={option.price}
          name={`options[${index}].value`}
        />
      ))}
      <CallbackBtn setCurrentView={setCurrentView} />
    </div>
  );
};

export default WindowOptions;
