import Link from "next/link";

import styles from "./Menu.module.scss";
import { useState } from "react";
import { Phone } from "../Phone/Phone";
import { usePathname } from "next/navigation";

const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const asPath = usePathname();

  const toggleMenu = () => {
    if (window.innerWidth < 993) {
      document.body.classList.toggle("lock-scroll");
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <ul className={`${styles.wrapper} ${isOpen ? styles.show : ""}`}>
        <li className={styles.item}>
          <Link
            href="/"
            className={`${styles.link} ${asPath === "/" ? styles.active : ""}`}
            onClick={toggleMenu}
          >
            Главная
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            href="/contacts"
            className={`${styles.link} ${
              asPath === "/contacts" ? styles.active : ""
            }`}
            onClick={toggleMenu}
          >
            Контакты
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            href="/agreement"
            className={`${styles.link} ${
              asPath === "/agreement" ? styles.active : ""
            }`}
            onClick={toggleMenu}
          >
            Пользовательское соглашение
          </Link>
        </li>
      </ul>

      <div className={styles.other}>
        <Phone />
        <button
          type="button"
          aria-label="Toggle Menu"
          className={`${styles.open_btn} ${isOpen ? styles.close_btn : ""}`}
          onClick={toggleMenu}
        ></button>
      </div>
    </>
  );
};

export { Menu };
