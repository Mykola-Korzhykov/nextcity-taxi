import { FC } from "react";

import styles from "./Offer.module.scss";

const Offer: FC = () => {
  return (
    <section className={styles.wrapper} id="section-offer">
      <div className="container">
        <h2>Offer</h2>
      </div>
    </section>
  );
};

export default Offer;
