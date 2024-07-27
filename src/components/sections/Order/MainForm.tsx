import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import OrderList from "./OrderList";
import PhoneField from "./PhoneField/PhoneField";
import Tariff from "./Tariff/Tariff";
import Additional from "./Additional/Additional";
import { IMainForm, Window } from "interfaces/IAdditional";
import styles from "./Order.module.scss";
import Swal from "sweetalert2";

const MainForm: FC<IMainForm> = ({ setCurrentView, onSubmit, currentView }) => {
  const view = Window.MAIN_FORM;

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext();
  const price = watch("price");

  const onSubmitWithValidation = (data: any) => {
    if (Object.keys(errors).length === 0) {
      onSubmit(data);
    } else {
      const phoneError = errors.phone ? errors.phone.message : null;
      if (phoneError) {
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: phoneError.toString(),
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Пожалуйста, исправьте ошибки в форме перед отправкой",
        });
      }
    }
  };

  return (
    <form
      className={`view ${styles.form} ${
        view === currentView ? "viewActive" : ""
      }`}
      onSubmit={handleSubmit(onSubmitWithValidation)}
    >
      <h2 className={styles.title} data-aos="fade-down">
        Новый заказ
      </h2>
      <OrderList />
      <PhoneField />
      <Tariff />
      <Additional setCurrentView={setCurrentView} />
      <button
        type="submit"
        className={`themeButton ${styles.submitButton}`}
        data-aos="fade-down"
      >
        Заказать <span>{price} ₽</span>
      </button>
    </form>
  );
};

export default MainForm;
