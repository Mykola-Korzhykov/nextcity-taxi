"use client";
import { FC } from "react";

import Order from "../Order/Order";
import Maps from "../Map/YandexMap";

import styles from "./Offer.module.scss";

const Offer: FC = () => {
  return (
    <section className={styles.wrapper} id="section-offer">
      <div className="container">
        <div className={styles.offer}>
          <Order />
          <Maps />
        </div>
      </div>
    </section>
  );
};

export default Offer;
