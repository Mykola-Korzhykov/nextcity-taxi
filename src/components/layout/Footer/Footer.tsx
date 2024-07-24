import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.wrapper} data-aos="fade-up">
      <div className="container">
        <span> &#9400; NEXTCITY </span>
      </div>
    </footer>
  );
};

export default Footer;
