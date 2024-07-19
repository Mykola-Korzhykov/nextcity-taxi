import styles from "./Phone.module.scss";

const Phone = () => {
  return (
    <a href="tel+89518516363" className={styles.phone}>
      8 (951) 851-63-63
    </a>
  );
};

export { Phone };
