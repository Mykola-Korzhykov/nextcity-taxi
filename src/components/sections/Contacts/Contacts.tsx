import { FC } from "react";

import styles from "./Contacts.module.scss";

const Contacts: FC = () => {
  const phone = process.env.PHONE;
  const email = process.env.EMAIL;
  const telegram = process.env.TELEGRAM;
  const whatsapp = process.env.WHATSAPP;

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <h1 className={styles.title}>Контакты</h1>
        <div className={styles.contacts}>
          <a href={`mailto:${email}`} className={styles.email}>
            {email}
          </a>
          <a href={`tel:${phone}`} className={styles.phone}>
            {phone}
          </a>
          <a href={telegram} className={styles.telegram}>
            Telegram
          </a>
          <a href={whatsapp} className={styles.whatsapp}>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
