"use client";

import { Logo } from "@components/ui/Logo/Logo";
import { Menu } from "@components/ui/Menu/Menu";
import { Phone } from "@components/ui/Phone/Phone";

import { FC, useEffect, useState } from "react";

import styles from "./Header.module.scss";

type Props = {
  isSticky: boolean;
};

const Header: FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsSticky(window.scrollY > 0 ? true : false);
    });
  }, []);

  return (
    <header
      className={`${styles.wrapper} ${isSticky ? styles.sticky : ""}`}
      id="header"
    >
      <div className="container">
        <nav className={styles.navigation}>
          <Logo />
          <Phone />
          <Menu />
        </nav>
      </div>
    </header>
  );
};

export { Header };
