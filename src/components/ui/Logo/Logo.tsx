import Link from "next/link";
import LogoIcon from "@img/ui/Logo/Logo.svg";

import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <LogoIcon />
      {/* <p className="styles.description">СЕРВИС ТАКСИ РФ</p> */}
    </Link>
  );
};

export { Logo };
