import { FC } from "react";
import styles from "./HeadStatus.module.scss";

interface IHeadStatus {
  status: string | undefined; // Здесь можно указать конкретные значения статусов, которые ожидаются
}

const HeadStatus: FC<IHeadStatus> = ({ status }) => {
  let statusText = "";
  let statusClass = "";

  switch (status) {
    case "wait":
      statusText = "в ожидании";
      statusClass = styles.textWite;
      break;
    case "confirmed":
      statusText = "подтвержден";
      statusClass = styles.textSuccess;
      break;
    case "cancelled":
      statusText = "отменен";
      statusClass = styles.textCancelled;
      break;
    case "finished":
      statusText = "завершен";
      statusClass = styles.textSuccess;
      break;
    default:
      statusText = "неизвестный статус";
      statusClass = styles.textWhite;
  }

  return (
    <div>
      <h3 className={styles.text}>
        Заказ <span className={statusClass}>{statusText}!</span>
      </h3>
    </div>
  );
};

export { HeadStatus };
