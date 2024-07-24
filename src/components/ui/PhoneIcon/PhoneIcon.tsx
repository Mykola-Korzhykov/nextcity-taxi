import Icon from "@img/ui/DriverInfo/phoneIcon.svg";
import styles from "./PhoneIcon.module.scss";

interface IPhoneIcon {
  phone?: string;
}

const PhoneIcon = ({ phone = "+79518516363" }: IPhoneIcon) => {
  return (
    <div className={styles.iconContent}>
      <a href={`tel:${phone}`} className={styles.phoneIcon}>
        <div className={styles.wrapperIcon}>
          <Icon />
        </div>
        <p className={styles.phoneText}>Позвонить</p>
      </a>
      {phone == "+79518516363" && (
        <div className={styles.operator}>
          <p className={styles.contactName}>Оператор</p>
        </div>
      )}
    </div>
  );
};

export { PhoneIcon };
