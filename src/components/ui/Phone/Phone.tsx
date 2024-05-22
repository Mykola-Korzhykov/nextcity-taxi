import styles from "./Phone.module.scss";

const Phone = () => {
  return (
    <a href="tel+89290079637" className={styles.phone}>
      8 (929) 007-96-37
    </a>
  );
};

export { Phone };
