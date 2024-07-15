import Link from "next/link";

import styles from "./Menu.module.scss";

const Menu = () => {
  return (
    <div className={styles.menu}>
      <Link href="/" className={styles.menuItem}>
        Главная
      </Link>
      <Link href="/agreement" className={styles.menuItem}>
        Пользовательское соглашение
      </Link>
      <Link href="/agreement" className={styles.menuItem}>
        Контакты
      </Link>
    </div>
  );
};

export { Menu };
