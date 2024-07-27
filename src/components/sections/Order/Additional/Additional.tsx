import { FC } from "react";
import BtnDate from "./BtnDate";
import BtnOptions from "./BtnOptions";

import { Window, IAdditional } from "interfaces/IAdditional";
import styles from "./Additional.module.scss";

const Additional: FC<IAdditional> = ({ setCurrentView }) => {
  return (
    <div className={styles.additional} data-aos="fade-up">
      <div onClick={() => setCurrentView(Window.WINDOW_DATE)}>
        <BtnDate />
      </div>
      <div onClick={() => setCurrentView(Window.WINDOW_OPTIONS)}>
        <BtnOptions />
      </div>
    </div>
  );
};

export default Additional;
