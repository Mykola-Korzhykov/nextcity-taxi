import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";

import CallbackBtn from "@components/ui/CallbackBtn/CallbackBtn";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

import DatePicker from "react-datepicker";

// import dayjs from "dayjs";
import { ru } from "date-fns/locale";
import { ruRU } from "@mui/x-date-pickers/locales";

import { ICallbackBtn } from "interfaces/IAdditional";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Additional.module.scss";

// dayjs.extend(localizedFormat);
// dayjs.locale("ru");

const WindowDate: FC<ICallbackBtn> = ({ setCurrentView }) => {
  const { control } = useFormContext();

  return (
    <div>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ru"
        localeText={{
          ...ruRU.components.MuiLocalizationProvider.defaultProps.localeText,
          okButtonLabel: "Сохранить",
        }}
      >
        <div className={styles.date}>
          <span className={styles.text}>Выберите дату</span>
          <div className={styles.wrapperPicker}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date: Date | null) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  locale={ru}
                  className={styles.inputWindow}
                />
              )}
            />
          </div>
        </div>
        <div className={styles.time}>
          <span className={styles.text}>Выберите время</span>
          <div className={styles.wrapperPicker}>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <DesktopTimePicker
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                  ampm={false}
                  timeSteps={{ minutes: 1 }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      border: "2px solid #ecedf0",
                      borderRadius: "10px",
                      cursor: "pointer",
                      "&:hover, &.Mui-focused": {
                        borderColor: "#f6110f",
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "10px 16px",
                      color: "#333",
                    },
                    // "& .MuiPickersPopper-root": {
                    //   "& .MuiPaper-root": {
                    //     width: "210px",
                    //     boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    //     borderRadius: "10px",
                    //     "& .MuiPickersTimePickerToolbar-root": {
                    //       backgroundColor: "#f6110f",
                    //       color: "#fff",
                    //     },
                    //     "& .MuiList-root": {
                    //       padding: "0 17px",
                    //     },
                    //     "& .MuiMultiSectionDigitalClock-root": {
                    //       maxHeight: "180px",
                    //     },
                    //     "& .MuiButtonBase-root": {
                    //       borderRadius: "35%",
                    //     },
                    //     "& .MuiMenuItem-root.Mui-selected": {
                    //       backgroundColor: "#f6110f",
                    //       color: "#fff",
                    //       fontSize: "18px",
                    //     },
                    //     "& .MuiDialogActions-root": {
                    //       justifyContent: "flex-end",
                    //     },
                    //     "& .MuiButton-root": {
                    //       fontSize: "15px",
                    //       fontWeight: "900",
                    //       color: "#f6110f",
                    //     },
                    //   },
                    // },
                  }}
                />
              )}
            />
          </div>
        </div>
      </LocalizationProvider>

      <CallbackBtn setCurrentView={setCurrentView} />
    </div>
  );
};

export default WindowDate;
