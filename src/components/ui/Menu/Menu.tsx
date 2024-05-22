import Link from "next/link";

import styles from "./Menu.module.scss";

const Menu = () => {
  return (
    <div className={styles.menu}>
      <Link href="/">Главная</Link>
      <Link href="/agreement">Пользовательское соглашение</Link>
    </div>
  );
};

export { Menu };
