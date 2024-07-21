import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import OrderList from "./OrderList";
import PhoneField from "./PhoneField/PhoneField";
import Tariff from "./Tariff/Tariff";
import Additional from "./Additional/Additional";
import { IMainForm } from "interfaces/IAdditional";
import styles from "./Order.module.scss";
import Swal from "sweetalert2";

const MainForm: FC<IMainForm> = ({ setCurrentView, onSubmit }) => {
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
      className={styles.form}
      onSubmit={handleSubmit(onSubmitWithValidation)}
    >
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

// import React, { FC } from "react";
// import { useFormContext } from "react-hook-form";
// import OrderList from "./OrderList";
// import PhoneField from "./PhoneField/PhoneField";
// import Tariff from "./Tariff/Tariff";
// import Additional from "./Additional/Additional";
// import { IMainForm } from "interfaces/IAdditional";
// import styles from "./Order.module.scss";
// import Swal from "sweetalert2";

// const MainForm: FC<IMainForm> = ({ setCurrentView, onSubmit }) => {
//   const {
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useFormContext();
//   const price = watch("price");

//   const onSubmitWithValidation = (data: any) => {
//     if (Object.keys(errors).length === 0) {
//       onSubmit(data);
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Ошибка",
//         text: "Пожалуйста, исправьте ошибки в форме перед отправкой",
//       });
//     }
//   };

//   return (
//     <form
//       className={styles.form}
//       onSubmit={handleSubmit(onSubmitWithValidation)}
//     >
//       <h2 className={styles.title}>Новый заказ</h2>
//       <OrderList />
//       <PhoneField />
//       <Tariff />
//       <Additional setCurrentView={setCurrentView} />
//       <button type="submit" className={styles.submitButton}>
//         Заказать {price}
//       </button>
//     </form>
//   );
// };

// export default MainForm;

// import React, { FC } from "react";
// import { useFormContext } from "react-hook-form";

// import OrderList from "./OrderList";
// import PhoneField from "./PhoneField/PhoneField";
// import Tariff from "./Tariff/Tariff";
// import Additional from "./Additional/Additional";

// import { IMainForm } from "interfaces/IAdditional";
// import styles from "./Order.module.scss";

// const MainForm: FC<IMainForm> = ({ setCurrentView, onSubmit }) => {
//   const { handleSubmit, watch } = useFormContext();
//   const price = watch("price");

//   return (
//     <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
//       <h2 className={styles.title}>Новый заказ</h2>
//       <OrderList />
//       <PhoneField />
//       <Tariff />
//       <Additional setCurrentView={setCurrentView} />
//       <button type="submit" className={styles.submitButton}>
//         Заказать {price}
//       </button>
//     </form>
//   );
// };

// export default MainForm;
