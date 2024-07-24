import Link from "next/link";
import LogoIcon from "@img/ui/Logo/Logo.svg";

import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <LogoIcon />
    </Link>
  );
};

export { Logo };
