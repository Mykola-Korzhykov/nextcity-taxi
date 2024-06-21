import { FC, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import MainForm from "./MainForm";
import WindowDate from "./Additional/WindowDate";
import WindowOptions from "./Additional/WindowOptions";

import { IFormValues } from "interfaces/IField";
import dayjs from "dayjs";
import styles from "./Order.module.scss";

export enum Window {
  MAIN_FORM,
  WINDOW_DATE,
  WINDOW_OPTIONS,
}

const Order: FC = () => {
  const [currentView, setCurrentView] = useState<Window>(Window.MAIN_FORM);

  const form = useForm<IFormValues>({
    defaultValues: {
      fields: [
        { route: "", entrance: "" },
        { route: "", entrance: "" },
      ],
      tariff: "economy",
      date: new Date(),
      time: dayjs(),
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.wrapper}>
      <FormProvider {...form}>
        {currentView === Window.MAIN_FORM && (
          <MainForm onSubmit={onSubmit} setCurrentView={setCurrentView} />
        )}
        {currentView === Window.WINDOW_DATE && (
          <WindowDate setCurrentView={setCurrentView} />
        )}
        {currentView === Window.WINDOW_OPTIONS && <WindowOptions />}
      </FormProvider>
    </div>
  );
};

export default Order;
