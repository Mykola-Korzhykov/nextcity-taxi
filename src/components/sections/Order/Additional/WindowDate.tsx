import { FC, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import DatePicker from "react-datepicker";

import { ru } from "date-fns/locale";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";
import localizedFormat from "dayjs/plugin/localizedFormat";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Additional.module.scss";

import { ruRU } from "@mui/x-date-pickers/locales";

dayjs.extend(localizedFormat);
dayjs.locale("ru");

const WindowDate: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());

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
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              locale={ru}
              className={styles.inputWindow}
            />
          </div>
        </div>
        <div className={styles.time}>
          <span className={styles.text}>Выберите время</span>
          <div className={styles.wrapperPicker}>
            <DesktopTimePicker
              value={selectedTime}
              reduceAnimations={true}
              onChange={(newValue) => setSelectedTime(newValue)}
              ampm={false}
              timeSteps={{ minutes: 1 }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  sx: {
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                      cursor: "pointer !important",
                    },
                    "& .MuiOutlinedInput-root": {
                      border: "2px solid #ecedf0",
                      borderRadius: "10px",
                      cursor: "pointer !important",
                      "&:hover, &.Mui-focused": {
                        borderColor: "#f6110f",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "12px 16px",
                      color: "#333",
                    },
                  },
                },
                popper: {
                  sx: {
                    "& .MuiPaper-root": {
                      width: "210px",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                      "& .MuiPickersTimePickerToolbar-root": {
                        backgroundColor: "#f6110f",
                        color: "#fff",
                      },
                      "& .MuiList-root": {
                        width: "50%",
                        padding: "0 17px",
                      },
                      "& .MuiMultiSectionDigitalClock-root": {
                        maxHeight: "180px",
                      },
                      "& .MuiButtonBase-root": {
                        borderRadius: "35%",
                        // backgroundColor: "#fff",
                        // color: "#f6110f",
                      },
                      "& .css-1e3wlyl-MuiButtonBase-root-MuiMenuItem-root-MuiMultiSectionDigitalClockSection-item.Mui-selected":
                        {
                          backgroundColor: "#fff",
                          color: "#f6110f",
                          fontSize: "24px",
                        },
                      "& .css-knqc4i-MuiDialogActions-root": {
                        justifyContent: "flex-start",
                      },
                      "& .css-1e6y48t-MuiButtonBase-root-MuiButton-root": {
                        fontSize: "16px",
                        fontWeight: "600 !important",
                        color: "#f6110f",
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default WindowDate;
