import getAppWorkYears from "@helpers/getAppWorkYears";
import styles from "./Footer.module.scss";

const Footer = () => {
  const appWorkYears = getAppWorkYears(2024);

  const phone = process.env.PHONE;
  const email = process.env.EMAIL;
  const telegram = process.env.TELEGRAM;
  const whatsapp = process.env.WHATSAPP;

  return (
    <footer className={styles.wrapper}>
      <div className="container">
        <div className={styles.row}>
          <p className={styles.copyright}>NextCity © {appWorkYears}</p>
          <div className={styles.contacts}>
            <div className={styles.other}>
              <a href={`tel:${phone}`} className={styles.phone}>
                {phone}
              </a>
              <a href={telegram} className={styles.telegram}>
                Telegram
              </a>
              <a href={whatsapp} className={styles.whatsapp}>
                WhatsApp
              </a>
              <span className="flare"></span>
            </div>
            <a href={`mailto:${email}`} className={styles.email}>
              {email}
              <span className="flare"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
