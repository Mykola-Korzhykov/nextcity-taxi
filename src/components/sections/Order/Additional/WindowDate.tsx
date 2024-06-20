import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";

import CallbackBtn from "@components/ui/CallbackBtn/CallbackBtn";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import DatePicker from "react-datepicker";
import { ICallbackBtn } from "interfaces/IAdditional";

import { Popper } from "@mui/material";
import { ru } from "date-fns/locale";
import { ruRU } from "@mui/x-date-pickers/locales";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Additional.module.scss";

const WindowDate: FC<ICallbackBtn> = ({ setCurrentView }) => {
  const { control } = useFormContext();

  return (
    <div>
      <h3 className={styles.title}>Выбрать дату и время</h3>
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
                  slotProps={{
                    popper: {
                      sx: {
                        "& .MuiPaper-root": {
                          borderRadius: "10px !important",
                        },
                        "& .MuiList-root": {
                          width: "105px !important",
                          padding: "0 17px !important",
                        },
                        "& .MuiButtonBase-root": {
                          borderRadius: "35%",
                        },
                        "& .css-1e3wlyl-MuiButtonBase-root-MuiMenuItem-root-MuiMultiSectionDigitalClockSection-item.Mui-selected":
                          {
                            backgroundColor: "#f6110f !important",
                            color: "#fff !important",
                            fontSize: "18px !important",
                          },
                        "& .css-1e6y48t-MuiButtonBase-root-MuiButton-root": {
                          fontSize: "15px !important",
                          fontWeight: "900 !important",
                          color: "#f6110f !important",
                        },
                      },
                    },
                  }}
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
