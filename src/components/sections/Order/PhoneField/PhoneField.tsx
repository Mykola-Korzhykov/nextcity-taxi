// import { FC } from "react";
// import { useFormContext } from "react-hook-form";
// import PhoneIcon from "@img/ui/Field/phone.svg";
// import styles from "./PhoneField.module.scss";

// const PhoneField: FC = () => {
//   const { register } = useFormContext();

//   return (
//     <div className={styles.phoneField}>
//       <label htmlFor="phone" className={styles.hiddenLabel}>
//         Телефон
//       </label>
//       <input
//         type="tel"
//         id="phone"
//         {...register("phone", {
//           required: "Телефон обязателен",
//           pattern: {
//             value: /^(?:\+7|8)\d{10}$/,
//             message: "Неверный формат номера телефона",
//           },
//         })}
//         defaultValue="+7"
//         aria-label="Номер телефона"
//         className={styles.phoneInput}
//       />
//       <div className={styles.phoneIcon}>
//         <PhoneIcon />
//       </div>
//     </div>
//   );
// };

// export default PhoneField;

import { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import PhoneIcon from "@img/ui/Field/phone.svg";
import styles from "./PhoneField.module.scss";
import Swal from "sweetalert2";

const PhoneField: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (errors.phone) {
      Swal.fire({
        icon: "error",
        title: "Ошибка",
        text: errors.phone?.message?.toString(),
      });
    }
  }, [errors.phone]);

  return (
    <div className={styles.phoneField}>
      <label htmlFor="phone" className={styles.hiddenLabel}>
        Телефон
      </label>
      <input
        type="tel"
        id="phone"
        {...register("phone", {
          required: "Телефон обязателен",
          pattern: {
            value: /^(?:\+7|\+8|8)\d{10}$/,
            // value: /^(?:\+7|+8|8)\d{10}$/,
            message: "Неверный формат номера телефона",
          },
        })}
        defaultValue="+7"
        aria-label="Номер телефона"
        className={styles.phoneInput}
      />
      <div className={styles.phoneIcon}>
        <PhoneIcon />
      </div>
    </div>
  );
};

export default PhoneField;
