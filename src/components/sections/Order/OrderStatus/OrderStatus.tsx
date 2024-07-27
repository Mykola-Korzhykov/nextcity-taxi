import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "@store/hook";
import axios from "axios";
import { useFormContext } from "react-hook-form";

import { HeadStatus } from "@components/ui/HeadStatus/HeadStatus";
import { PhoneIcon } from "@components/ui/PhoneIcon/PhoneIcon";
import { Window } from "interfaces/IAdditional";
import CallbackBtn from "@components/ui/CallbackBtn/CallbackBtn";
import { hideLoader, showLoader } from "@store/slices/loaderSlice";

import { IFormValues } from "interfaces/IField";
import styles from "./OrderStatus.module.scss";
import { getLabelByValue } from "../Tariff/tariffData";
import Swal from "sweetalert2";
import { api } from "core/http";

interface IOrderStatus {
  setCurrentView: (view: Window) => void;
  orderData: IFormValues | null;
  currentView?: any;
}

const OrderStatus: FC<IOrderStatus> = ({
  setCurrentView,
  orderData,
  currentView,
}) => {
  const { reset } = useFormContext();
  const [currentOrder, setCurrentOrder] = useState<IFormValues | null>(
    orderData
  );
  const [orderInterval, setOrderInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const dispatch = useAppDispatch();
  const view = Window.ORDER_STATUS;

  const fetchOrderStatus = async () => {
    if (orderData && orderData.status !== "cancelled") {
      try {
        const response = await api.get(`/order/${orderData.orderId}`);

        setCurrentOrder(response.data);
      } catch (error: any) {
        Swal.fire({ title: error?.name, text: error?.message });
      }
    }
  };

  useEffect(() => {
    if (orderData && orderData.orderId) {
      fetchOrderStatus();
      if (view == Window.ORDER_STATUS) {
        setOrderInterval(setInterval(fetchOrderStatus, 5000));
      }
    }
    return () => {
      if (orderInterval) {
        clearInterval(orderInterval);
      }
    };
  }, [orderData]);

  useEffect(() => {
    if (currentView !== view && orderInterval) {
      clearInterval(orderInterval);
    }
  }, [currentView]);

  useEffect(() => {
    setCurrentOrder(orderData);
  }, [orderData]);

  const removeOrder = (orderId: number) => {
    let orders = JSON.parse(localStorage.getItem("Orders"));
    if (!orders) {
      return false;
    }

    const index = orders.indexOf(orderId);

    if (index !== -1) {
      orders.splice(index, 1);
      localStorage.setItem("Orders", JSON.stringify(orders));
    }
  };

  const handleCancelOrder = async () => {
    try {
      if (orderData && orderData.orderId) {
        await api.patch(
          "/order",
          {
            orderId: orderData.orderId,
            status: "cancelled",
          },
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          }
        );
        removeOrder(orderData.orderId);
      }
      clearInterval(orderInterval);
      dispatch(showLoader());
      setTimeout(() => {
        setCurrentView(Window.MAIN_FORM);
        dispatch(hideLoader());
      }, 1500);

      reset();
    } catch (error: any) {
      Swal.fire({ title: error?.name, text: error?.message });
    }
  };

  const handleNewOrder = () => {
    removeOrder(currentOrder.orderId);
    reset();
    setCurrentView(Window.MAIN_FORM);
    clearInterval(orderInterval);
  };

  return (
    <div className={`view ${view === currentView ? "viewActive" : ""}`}>
      <HeadStatus status={currentOrder?.status} />
      {currentOrder?.status === "wait" && (
        <>
          <span className={styles.textOrderId}># {currentOrder.orderId}</span>
          <h3 className={styles.textContent}>
            Ожидайте подтверждения оператора в течение 5 - 10 минут.
          </h3>
          <div className={styles.orderInfo}>
            <PhoneIcon />
          </div>
        </>
      )}
      {currentOrder?.status === "confirmed" && (
        <>
          <span className={styles.textOrderId}># {currentOrder.orderId}</span>
          <div className={styles.orderInfo}>
            <div className={styles.orderContent}>
              <p className={styles.contactName}>{currentOrder.driver?.name}</p>
              <p className={styles.carInfo}>{currentOrder.car?.model}</p>
              <p className={styles.carInfo}>{currentOrder.car?.color}</p>
              <p className={styles.carInfo}>{currentOrder.car?.licensePlate}</p>

              {!currentOrder.driver && !currentOrder.car && (
                <p className={styles.textContent}>
                  Нет информации. <br />
                  Ожидайте.
                </p>
              )}
            </div>
            <div>
              <PhoneIcon
                phoneValue={
                  !currentOrder.driver?.phone
                    ? false
                    : currentOrder.driver?.phone
                }
              />
            </div>
          </div>
          <div className={styles.price}>
            <span>{currentOrder.price} ₽</span>
            <span>
              {currentOrder.tariff && getLabelByValue(currentOrder.tariff)}
            </span>
          </div>
        </>
      )}
      {currentOrder?.status === "cancelled" && (
        <>
          <span className={styles.textOrderId}># {currentOrder.orderId}</span>
          <p className={styles.textContent}>
            Извините, на данный момент нет свободных машин, попробуйте заказать
            снова.
          </p>
          <PhoneIcon />
        </>
      )}
      {currentOrder?.status === "finished" && (
        <>
          <span className={styles.textOrderId}># {currentOrder.orderId}</span>
          <h3 className={styles.textContent}>
            Спасибо! Ждем от вас новых заказов!
          </h3>
          <div className={styles.orderInfo}>
            <PhoneIcon />
          </div>
        </>
      )}
      {currentOrder?.status === "wait" ||
      currentOrder?.status === "confirmed" ? (
        <CallbackBtn
          setCurrentView={handleCancelOrder}
          buttonText="Отменить заказ"
        />
      ) : (
        <CallbackBtn setCurrentView={handleNewOrder} buttonText="Новый заказ" />
      )}
    </div>
  );
};

export default OrderStatus;
