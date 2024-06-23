export enum Window {
  MAIN_FORM,
  WINDOW_DATE,
  WINDOW_OPTIONS,
  ORDER_STATUS,
}

export interface IAdditional {
  setCurrentView: (WINDOW: Window) => void;
}

export interface IMainForm {
  setCurrentView: (view: Window) => void;
  onSubmit: (data: any) => void;
}

export interface ICallbackBtn {
  setCurrentView: (view: Window) => void;
  buttonText?: string;
}
