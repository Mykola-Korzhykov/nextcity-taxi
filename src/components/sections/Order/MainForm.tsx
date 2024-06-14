import React, { FC } from "react";
import { useFormContext } from "react-hook-form";

import OrderList from "./OrderList";
import Tariff from "./Tariff/Tariff";
import Additional from "./Additional/Additional";

import { IMainForm } from "interfaces/IAdditional";
import styles from "./Order.module.scss";

const MainForm: FC<IMainForm> = ({ setCurrentView, onSubmit }) => {
  const { handleSubmit } = useFormContext();

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Новый заказ</h2>
      <OrderList />
      <Tariff />
      <Additional setCurrentView={setCurrentView} />
      <button type="submit" className={styles.submitButton}>
        Заказать
      </button>
    </form>
  );
};

export default MainForm;
