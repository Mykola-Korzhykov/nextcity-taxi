import { FC, useState, useEffect } from "react";
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

import TextField from "@mui/material/TextField";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

dayjs.extend(localizedFormat);
dayjs.locale("ru");

// Компонент для отображения поля с иконкой календаря
const CustomInput: FC<{ value: string; onClick: () => void }> = ({
  value,
  onClick,
}) => (
  <div className={styles.customInput} onClick={onClick}>
    <TextField
      fullWidth
      variant="outlined"
      value={value}
      InputProps={{
        endAdornment: <CalendarTodayIcon className={styles.calendarIcon} />,
      }}
    />
  </div>
);

const WindowDate: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <div className={styles.date}>
          <span className={styles.text}>Выберите дату</span>
          <div className={styles.datePicker}>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              locale={ru}
              className={styles.inputWindow}
              popperClassName={styles.popper}
              calendarClassName={styles.calendar}
              placeholderText="Дата"
              customInput={
                <CustomInput
                  value={
                    selectedDate ? dayjs(selectedDate).format("DD/MM/YYYY") : ""
                  }
                  onClick={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />
          </div>
        </div>
        <div className={styles.time}>
          <span className={styles.text}>Выберите время</span>
          <div className={styles.datePicker}>
            <DesktopTimePicker
              value={selectedTime}
              onChange={(newValue) => setSelectedTime(newValue)}
              ampm={false} // 24-часовой формат
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  className: styles.inputWindow,
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

// import { FC, useState } from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import DatePicker from "react-datepicker";

// import { ru } from "date-fns/locale";
// import dayjs, { Dayjs } from "dayjs";
// import "dayjs/locale/ru";
// import localizedFormat from "dayjs/plugin/localizedFormat"; // Плагин для поддержки форматирования

// import "react-datepicker/dist/react-datepicker.css";
// import styles from "./Additional.module.scss";

// dayjs.extend(localizedFormat);
// dayjs.locale("ru"); // Устанавливаем русскую локаль по умолчанию

// const WindowDate: FC = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());

//   return (
//     <div>
//       <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
//         <div className={styles.date}>
//           <span className={styles.text}>Выберите дату</span>
//           <div className={styles.datePicker}>
//             <DatePicker
//               selected={selectedDate}
//               onChange={(date: Date) => setSelectedDate(date)}
//               dateFormat="dd/MM/yyyy"
//               locale={ru}
//               className={styles.inputWindow}
//               popperClassName={styles.popper}
//               calendarClassName={styles.calendar}
//             />
//           </div>
//         </div>
//         <div className={styles.time}>
//           <span className={styles.text}>Выберите время</span>
//           <div className={styles.datePicker}>
//             <TimePicker
//               value={selectedTime}
//               onChange={(newValue) => setSelectedTime(newValue)}
//               ampm={false}
//               slotProps={{
//                 textField: {
//                   fullWidth: true,
//                   variant: "outlined",
//                   className: styles.inputWindow, // Применяем стили, если нужно
//                 },
//               }}
//             />
//           </div>
//         </div>
//       </LocalizationProvider>
//     </div>
//   );
// };

// export default WindowDate;

// import React, { FC, useState } from "react";
// import DatePicker from "react-datepicker";

// import { ru } from "date-fns/locale";
// import "react-datepicker/dist/react-datepicker.css";
// import styles from "./Additional.module.scss";

// const WindowDate: FC = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string>(
//     new Date().toLocaleTimeString().slice(0, 5)
//   );

//   const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedTime(event.target.value);
//   };

//   return (
//     <div>
//       <h3 className={styles.title}>Выбрать дату и время</h3>
//       <div>
//         <div className={styles.date}>
//           <span className={styles.text}>Выберите дату</span>
//           <div className={styles.datePicker}>
//             <DatePicker
//               selected={selectedDate}
//               onChange={(date: Date) => setSelectedDate(date)}
//               dateFormat="dd/MM/yyyy"
//               locale={ru}
//               className={styles.inputWindow}
//               popperClassName={styles.popper}
//               calendarClassName={styles.calendar}
//               placeholderText="Дата"
//             />
//           </div>
//         </div>
//         <div className={styles.time}>
//           <span className={styles.text}>Выберите время</span>
//           <div className={styles.timePicker}>
//             <input
//               type="time"
//               value={selectedTime}
//               onChange={handleTimeChange}
//               className={styles.inputWindow}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WindowDate;
