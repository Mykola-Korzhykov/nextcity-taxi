import React, { FC } from "react";
import { useFormContext } from "react-hook-form";

import OrderList from "./OrderList";
import PhoneField from "./PhoneField/PhoneField";
import Tariff from "./Tariff/Tariff";
import Additional from "./Additional/Additional";

import { IMainForm } from "interfaces/IAdditional";
import styles from "./Order.module.scss";

const MainForm: FC<IMainForm> = ({ setCurrentView, onSubmit }) => {
  const { handleSubmit, watch } = useFormContext();
  const price = watch("price");

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Новый заказ</h2>
      <OrderList />
      <PhoneField />
      <Tariff />
      <Additional setCurrentView={setCurrentView} />
      <button type="submit" className={styles.submitButton}>
        Заказать {price}
      </button>
    </form>
  );
};

export default MainForm;
