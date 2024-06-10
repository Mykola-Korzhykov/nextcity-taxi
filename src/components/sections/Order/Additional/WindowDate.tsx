import { useFormContext } from "react-hook-form";
import styles from "./Additional.module.scss";

const WindowDate = () => {
  const { register } = useFormContext();
  return (
    <div className="">
      <h3 className={styles.title}>Выбрать дату и время</h3>
      <div className={styles.date}>
        <span className={styles.text}>Выберите дату</span>
        <input type="date" {...register("additionalDate")} />
      </div>
      <div className={styles.time}>
        <span className={styles.text}>Выберите время</span>
        <input type="time" {...register("additionalDate")} />
      </div>
    </div>
  );
};

export default WindowDate;
