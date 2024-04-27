import Link from "next/link";

import styles from "./Menu.module.scss";

const Menu = () => {
  return (
    <div className={styles.menu}>
      <Link href="/">Home</Link>
      <Link href="/agreement">Agreement</Link>
    </div>
  );
};

export { Menu };
