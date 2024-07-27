import styles from "./Phone.module.scss";

import PhoneIcon from "@img/layout/header/phone.svg";

const Phone = () => {
  const phone = process.env.PHONE;

  return (
    <a href={`tel:${phone}`} className={styles.button}>
      <PhoneIcon />
    </a>
  );
};

export { Phone };
