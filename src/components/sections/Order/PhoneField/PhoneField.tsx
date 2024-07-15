import { FC } from "react";
import { useFormContext } from "react-hook-form";
import PhoneIcon from "@img/ui/Field/phone.svg";
import styles from "./PhoneField.module.scss";

const PhoneField: FC = () => {
  const { register } = useFormContext();

  return (
    <div className={styles.phoneField}>
      <label htmlFor="phone" className={styles.hiddenLabel}>
        Телефон
      </label>
      <input
        type="tel"
        id="phone"
        {...register("phone", { required: true, pattern: /^\+7\d{10}$/ })}
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
