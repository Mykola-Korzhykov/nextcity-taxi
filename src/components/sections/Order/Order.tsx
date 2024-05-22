import React, { FC } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import OrderList from "./OrderList";
import Tariff from "./Tariff/Tariff";
import IField from "interfaces/IField";
import styles from "./Order.module.scss";

type FormValues = {
  fields: IField[];
  tariff: "economy" | "comfort" | "business";
};

const Order: FC = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      fields: [
        { route: "", entrance: "" },
        { route: "", entrance: "" },
      ],
      tariff: "economy",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
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

// import { FC } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import OrderList from "./OrderList";
// import Tariff from "./Tariff/Tariff";
// import IField from "interfaces/IField";
// import styles from "./Order.module.scss";

// type FormValues = {
//   fields: IField[];
//   selectedOption: string;
// };

// const Order: FC = () => {
//   const form = useForm<FormValues>({
//     defaultValues: {
//       fields: [
//         { route: "", entrance: "" },
//         { route: "", entrance: "" },
//       ],
//       selectedOption: "econom",
//     },
//   });

//   return (
//     <FormProvider {...form}>
//       <form className={styles.form}>
//         <OrderList />
//         <Tariff />
//         <button type="submit" className={styles.submitButton}>
//           Заказать
//         </button>
//       </form>
//     </FormProvider>
//   );
// };

// export default Order;
