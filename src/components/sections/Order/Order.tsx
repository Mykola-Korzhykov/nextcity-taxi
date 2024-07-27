import React, { FC, useEffect, useMemo, useState } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  useWatch,
} from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useAppDispatch } from "@store/hook";

import MainForm from "./MainForm";
import WindowDate from "./Additional/WindowDate";
import WindowOptions from "./Additional/WindowOption/WindowOptions";
import OrderStatus from "./OrderStatus/OrderStatus";

import { hideLoader, showLoader } from "@store/slices/loaderSlice";
import { OptionsData } from "./Additional/WindowOption/OptionsData";
import { getLabelByValue, tariffs } from "./Tariff/tariffData";

import { Window } from "interfaces/IAdditional";
import { IFormValues } from "interfaces/IField";
import styles from "./Order.module.scss";
import Swal from "sweetalert2";
import { api } from "core/http";

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
        { name: "Детское кресло", value: false },
        { name: "Поездка с животными", value: false },
        { name: "test1", value: false },
        { name: "valera", value: false },
      ],
      status: "wait",
      price: 115,
    },
  });

  const { setValue, control } = form;

  const dispatch = useAppDispatch();

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

  const addOrderToLocalStorage = (orderId: number) => {
    const orders = JSON.parse(localStorage.getItem("Orders") || "[]");

    if (!orders.includes(orderId)) {
      orders.push(orderId);
      localStorage.setItem("Orders", JSON.stringify(orders));
    }
  };

  useEffect(() => {
    const totalPrice = tariffPrice + optionPrice;
    setValue("price", totalPrice);
  }, [tariffPrice, optionPrice, setValue]);

  useEffect(() => {
    const fetchOrderData = async (orderId: string) => {
      try {
        const response = await api.get(`/order/${orderId}`, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        });

        if (
          response.data.status !== "cancelled" ||
          response.data.status !== "finished"
        ) {
          setOrderData(response.data);
          setCurrentView(Window.ORDER_STATUS);
        }
      } catch (error: any) {
        Swal.fire({ title: error?.name, text: error?.message });
      }
    };

    const orders = JSON.parse(localStorage.getItem("Orders") || "[]");
    if (orders.length > 0) {
      const lastOrderId = orders[orders.length - 1];

      fetchOrderData(lastOrderId);
    }
  }, []);

  const sendOrderData = async (data: IFormValues) => {
    const times = dayjs(data.time).format();

    try {
      const response = await api.post(
        "/order",
        { ...data, time: times },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      setOrderData(response.data);
      addOrderToLocalStorage(response.data.orderId);
    } catch (error: any) {
      Swal.fire({ title: error?.name, text: error?.message });
    }
  };

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    sendOrderData(data);

    dispatch(showLoader());
    setTimeout(() => {
      setCurrentView(Window.ORDER_STATUS);
      dispatch(hideLoader());
    }, 2000);
  };

  return (
    <div className={styles.wrapper}>
      <FormProvider {...form}>
        {/* {currentView === Window.MAIN_FORM && (
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
        )} */}

        <div className={styles.viewWrapper}>
          <MainForm
            onSubmit={onSubmit}
            setCurrentView={setCurrentView}
            currentView={currentView}
          />
          <WindowDate
            setCurrentView={setCurrentView}
            currentView={currentView}
          />
          <WindowOptions
            setCurrentView={setCurrentView}
            currentView={currentView}
          />
          <OrderStatus
            setCurrentView={setCurrentView}
            currentView={currentView}
            orderData={orderData}
          />
        </div>
      </FormProvider>
    </div>
  );
};

export default Order;
