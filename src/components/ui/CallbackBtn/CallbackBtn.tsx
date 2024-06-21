import { FC } from "react";

import CallbackIcon from "@img/ui/CallbackBtn/callback.svg";
import { Window, ICallbackBtn } from "interfaces/IAdditional";
import styles from "./CallbackBtn.module.scss";

const CallbackBtn: FC<ICallbackBtn> = ({ setCurrentView }) => {
  return (
    <div className={styles.wrapperBtn}>
      <div className={styles.callbackIcon}>
        <CallbackIcon />
      </div>
      <button onClick={() => setCurrentView(Window.MAIN_FORM)}>
        Сохранить
      </button>
    </div>
  );
};

export default CallbackBtn;
