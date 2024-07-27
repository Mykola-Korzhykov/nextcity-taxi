import Date from "@img/ui/Additional/date.svg";
import Arrow from "@img/ui/Additional/arrow.svg";

import styles from "./Additional.module.scss";

const BtnDate = () => {
  return (
    <div className={styles.additionalItem}>
      <div className={styles.additionalIcon}>
        <Date />
      </div>
      <span>Дата</span>
      <div className={`${styles.additionalIcon} ${styles.additionalArrow}`}>
        <Arrow />
      </div>
    </div>
  );
};

export default BtnDate;
