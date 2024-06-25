import { FC } from "react";
import CallbackBtn from "@components/ui/CallbackBtn/CallbackBtn";

import { Window } from "interfaces/IAdditional";
import { ICallbackBtn } from "interfaces/IAdditional";
import { useFormContext } from "react-hook-form";
import { ICar, IDriver } from "interfaces/IField";

const OrderStatus: FC<ICallbackBtn> = ({ setCurrentView }) => {
  const { getValues, reset } = useFormContext();

  const status = getValues("status");

  const handleCancelOrder = async () => {
    setCurrentView(Window.MAIN_FORM);
    reset();
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
          <h3>Ваш заказ успешно отпрвлен!</h3>
          <p>{Driver.name}</p>
        </>
      )}
      {status === "confirmed" && (
        <>
          <h3>Заказ подтвержден!</h3>
          <p>{Driver.name}</p>
        </>
      )}
      {status === "cancelled" && <h3>Заказ отменен!</h3>}
      {status === "wait" ? (
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
