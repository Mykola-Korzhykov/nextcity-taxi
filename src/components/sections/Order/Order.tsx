import { FC, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import MainForm from "./MainForm";
import WindowDate from "./Additional/WindowDate";
import WindowOptions from "./Additional/WindowOption/WindowOptions";
import OrderStatus from "./OrderStatus/OrderStatus";

import { Window } from "interfaces/IAdditional";
import dayjs from "dayjs";
import { IFormValues } from "interfaces/IField";
import styles from "./Order.module.scss";

// export enum Window {
//   MAIN_FORM,
//   WINDOW_DATE,
//   WINDOW_OPTIONS,
//   ORDER_STATUS,
// }

const Order: FC = () => {
  const [currentView, setCurrentView] = useState<Window>(Window.MAIN_FORM);

  const form = useForm<IFormValues>({
    defaultValues: {
      fields: [
        { route: "", entrance: "" },
        { route: "", entrance: "" },
      ],
      phone: "+7",
      tariff: "economy",
      date: new Date(),
      time: dayjs(),
      options: [
        { name: "child", value: false },
        { name: "pets", value: false },
        { name: "test1", value: false },
        { name: "valera", value: true },
      ],
      status: "active",
      // status: "confirmed",
      // status: "cancelled",
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
    setCurrentView(Window.ORDER_STATUS);
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
        {currentView === Window.WINDOW_OPTIONS && (
          <WindowOptions setCurrentView={setCurrentView} />
        )}
        {currentView === Window.ORDER_STATUS && (
          <OrderStatus setCurrentView={setCurrentView} />
        )}
      </FormProvider>
    </div>
  );
};

export default Order;
