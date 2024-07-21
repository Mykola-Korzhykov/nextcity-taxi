import axios from "axios";
import { FC, useEffect, useState } from "react";
import CallbackBtn from "@components/ui/CallbackBtn/CallbackBtn";

import { Window } from "interfaces/IAdditional";
import { useFormContext } from "react-hook-form";
import { ICar, IDriver } from "interfaces/IField";

import styles from "./OrderStatus.module.scss";

interface OrderStatusProps {
  setCurrentView: (view: Window) => void;
  orderData: any | null;
}

const OrderStatus: FC<OrderStatusProps> = ({ setCurrentView, orderData }) => {
  const { getValues, reset, setValue } = useFormContext();
  const [status, setStatus] = useState(getValues("status"));

  const fetchOrderStatus = async () => {
    if (orderData && orderData.orderId) {
      try {
        const response = await axios.get(`api/order/${orderData.orderId}`);
        console.log("Server response:", response.data);

        const fetchedStatus = response.data.status;
        console.log(status);
        console.log(fetchedStatus);
        console.log(response.data);

        if (fetchedStatus !== "wait") {
          setStatus(fetchedStatus);
        }
      } catch (error) {
        console.error("Axios error message:", error);
      }
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (status === "wait" && orderData && orderData.orderId) {
      fetchOrderStatus();
      intervalId = setInterval(fetchOrderStatus, 8000);
    }

    // return () => {
    //   if (intervalId) clearInterval(intervalId);
    // };
  }, [orderData, status, setValue]);

  const removeOrderFromLocalStorage = (orderId: string) => {
    let orders = JSON.parse(localStorage.getItem("Orders") || "[]");
    orders = orders.filter((id: string) => id !== orderId);
    localStorage.setItem("Orders", JSON.stringify(orders));
  };

  const handleCancelOrder = async () => {
    console.log(orderData.orderId);
    try {
      if (orderData && orderData.orderId) {
        await axios.delete(`api/order/${orderData.orderId}`, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        });
        removeOrderFromLocalStorage(orderData.orderId);
        console.log(`Order ${orderData.orderId} successfully deleted.`);
      }
      setCurrentView(Window.MAIN_FORM);
      reset();
    } catch (error) {
      console.error("Axios error message:", error);
    }
  };

  const Driver: IDriver = {
    name: "Алексей",
    phone: "4758923564",
  };

  const Car: ICar = {
    model: "",
    color: "",
    licensePlate: "",
  };

  return (
    <div>
      {status === "wait" && (
        <>
          <h3 className={styles.textGreen}>Ваш заказ успешно отправлен!</h3>
          <span className={styles.textOrderId}>
            # {orderData ? orderData.orderId : null}
          </span>
          <h3 className={styles.textWait}>
            В течение 5-7 минут ожидайте подтверждения заказа.
          </h3>
        </>
      )}
      {status === "confirmed" && (
        <>
          <h3 className={styles.text}>
            Заказ <span className={styles.textGreen}>подтвержден!</span>{" "}
          </h3>
          <span className={styles.textOrderId}>
            # {orderData ? orderData.orderId : null}
          </span>
          <p>{orderData.driver ? orderData.driver.name : Driver.name}</p>
          {/* <p>{orderData.driver.name}</p> */}
        </>
      )}
      {status === "cancelled" && (
        <>
          <h3 className={styles.text}>
            Заказ <span className={styles.textCancelled}>отменен!</span>
          </h3>
          <span className={styles.textOrderId}>
            # {orderData ? orderData.orderId : null}
          </span>
          <p className={styles.textContent}>
            Извините, на данный момент нет свободных машин, попробуйте заказать
            снова.
          </p>
        </>
      )}
      {status === "wait" || status === "confirmed" ? (
        <CallbackBtn
          setCurrentView={() => handleCancelOrder()}
          buttonText="Отменить заказ"
        />
      ) : (
        <CallbackBtn setCurrentView={setCurrentView} buttonText="Новый заказ" />
      )}
    </div>
  );
};

export default OrderStatus;
