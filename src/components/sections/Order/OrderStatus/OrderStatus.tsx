import { FC } from "react";

import CallbackBtn from "@components/ui/CallbackBtn/CallbackBtn";

import { Window } from "interfaces/IAdditional";
import { ICallbackBtn } from "interfaces/IAdditional";
import { useFormContext } from "react-hook-form";

const OrderStatus: FC<ICallbackBtn> = ({ setCurrentView }) => {
  const { getValues, reset } = useFormContext();

  const status = getValues("status");

  const handleCancelOrder = async () => {
    setCurrentView(Window.MAIN_FORM);
    reset();
  };

  return (
    <div>
      {status === "active" && <h3>Ваш заказ успешно отправлен!</h3>}
      {status === "confirmed" && <h3>Заказ подтвержден!</h3>}
      {status === "cancelled" && <h3>Заказ отменен!</h3>}
      {status === "active" ? (
        <CallbackBtn
          setCurrentView={() => handleCancelOrder()}
          buttonText="Отменить заказ"
        />
      ) : (
        <CallbackBtn
          setCurrentView={setCurrentView}
          buttonText="Вернуться к заказу"
        />
      )}
    </div>
  );
};

export default OrderStatus;
