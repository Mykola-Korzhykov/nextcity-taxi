import React, { FC } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import OrderList from "./OrderList";
import Tariff from "./Tariff/Tariff";

import { IFormValues } from "interfaces/IField";
import styles from "./Order.module.scss";

const Order: FC = () => {
  const form = useForm<IFormValues>({
    defaultValues: {
      fields: [
        { route: "", entrance: "" },
        { route: "", entrance: "" },
      ],
      tariff: "economy",
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.wrapper}>
      <FormProvider {...form}>
        <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
          <OrderList />
          <Tariff />
          <button type="submit" className={styles.submitButton}>
            Заказать
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Order;
