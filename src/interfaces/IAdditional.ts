export enum Window {
  MAIN_FORM,
  WINDOW_DATE,
  WINDOW_OPTIONS,
}

export interface IAdditional {
  setCurrentView: (WINDOW: Window) => void;
}

export interface IMainForm {
  setCurrentView: (view: Window) => void;
  onSubmit: (data: any) => void;
}
