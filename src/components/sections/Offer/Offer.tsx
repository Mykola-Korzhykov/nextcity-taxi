"use client";
import { FC } from "react";

import Order from "../Order/Order";
import Map from "../Map/Map";

import styles from "./Offer.module.scss";

const Offer: FC = () => {
  return (
    <section className={styles.wrapper} id="section-offer">
      <div className="container">
        <div className={styles.offer}>
          <Order />
          <Map />
        </div>
      </div>
    </section>
  );
};

export { Offer };
