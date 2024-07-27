import { FC } from "react";
import Callback from "@img/ui/CallbackBtn/callback.svg";

import { Window, ICallbackBtn } from "interfaces/IAdditional";
import styles from "./CallbackBtn.module.scss";

const CallbackBtn: FC<ICallbackBtn> = ({
  setCurrentView,
  buttonText = "Сохранить",
}) => {
  return (
    <div className={styles.wrapperBtn}>
      <div
        className={styles.callbackIcon}
        onClick={() => setCurrentView(Window.MAIN_FORM)}
      >
        <Callback />
      </div>
      <button
        onClick={() => setCurrentView(Window.MAIN_FORM)}
        className="themeButton"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default CallbackBtn;
