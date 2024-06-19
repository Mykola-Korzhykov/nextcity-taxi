import { FC } from "react";

import { Window, ICallbackBtn } from "interfaces/IAdditional";
import styles from "./CallbackBtn.module.scss";

const CallbackBtn: FC<ICallbackBtn> = ({ setCurrentView }) => {
  return (
    <div>
      <button onClick={() => setCurrentView(Window.MAIN_FORM)}>
        Сохранить
      </button>
    </div>
  );
};

export default CallbackBtn;
