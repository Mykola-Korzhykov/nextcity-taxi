import Link from "next/link";
import LogoIcon from "@img/ui/Logo/Logo.svg";

import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <Link href="/" className={styles.logo} data-aos="fade-right">
      <LogoIcon />
    </Link>
  );
};

export { Logo };
