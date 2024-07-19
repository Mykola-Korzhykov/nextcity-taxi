import React, { FC, useEffect, useMemo, useState } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  useWatch,
} from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";

import MainForm from "./MainForm";
import WindowDate from "./Additional/WindowDate";
import WindowOptions from "./Additional/WindowOption/WindowOptions";
import OrderStatus from "./OrderStatus/OrderStatus";

import { OptionsData } from "./Additional/WindowOption/OptionsData";
import { tariffs } from "./Tariff/tariffData";

import { Window } from "interfaces/IAdditional";
import { IFormValues } from "interfaces/IField";
import styles from "./Order.module.scss";

// interface IOrderResponse {

// }

const Order: FC = () => {
  const [currentView, setCurrentView] = useState<Window>(Window.MAIN_FORM);
  const [orderData, setOrderData] = useState<any | null>(null);

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
        { name: "valera", value: false },
      ],
      status: "wait",
      price: 115,
    },
  });

  const { setValue, control } = form;

  const options = useWatch({
    control,
    name: "options",
  });

  const tariff = useWatch({
    control,
    name: "tariff",
  });

  const optionPrice = useMemo(() => {
    return options.reduce((acc, option) => {
      if (option.value) {
        const optionData = OptionsData.find((opt) => opt.name === option.name);
        if (optionData) {
          return acc + optionData.price;
        }
      }
      return acc;
    }, 0);
  }, [options]);

  const tariffPrice = useMemo(() => {
    const selectedTariff = tariffs.find((t) => t.value === tariff);
    return selectedTariff ? selectedTariff.price : 0;
  }, [tariff]);

  useEffect(() => {
    const totalPrice = tariffPrice + optionPrice;
    setValue("price", totalPrice);
  }, [tariffPrice, optionPrice, setValue]);

  // Сформировать заказ
  const sendOrderData = async (data: IFormValues) => {
    try {
      const response = await axios.post("/api/order", data, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log("Order successfully sent:", response.data);
      setOrderData(response.data);
    } catch (error) {
      console.error("Axios error message:", error);
    }
  };

  const fetchOrderData = async () => {
    try {
      const response = await axios.get("/api/order", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      console.log("Order data successfully fetched:", response.data);
    } catch (error) {
      console.error("Axios error message:", error);
    }
  };

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    fetchOrderData();
    sendOrderData(data);
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
          <OrderStatus setCurrentView={setCurrentView} orderData={orderData} />
        )}
      </FormProvider>
    </div>
  );
};

export default Order;
