import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFormContext, Controller } from "react-hook-form";
import EconomyIcon from "@img/ui/Tariff/economy.svg";

import { IFormValues } from "interfaces/IField";
import "swiper/scss";
import styles from "./Tariff.module.scss";

const tariffs = [
  {
    label: "Эконом",
    value: "economy",
    component: <EconomyIcon />,
    price: "От 115 ₽",
  },
  {
    label: "Комфорт",
    value: "comfort",
    component: <EconomyIcon />,
    price: "От 125 ₽",
  },
  {
    label: "Бизнес",
    value: "business",
    component: <EconomyIcon />,
    price: "От 150 ₽",
  },
  {
    label: "Тест",
    value: "test",
    component: <EconomyIcon />,
    price: "От 160 ₽",
  },
];

const Tariff: FC = () => {
  const { control } = useFormContext<IFormValues>();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <Swiper
        spaceBetween={15}
        slidesPerView={3.2}
        onInit={() => setIsInitialized(true)}
      >
        {tariffs.map((tariff, index) => (
          <SwiperSlide key={index}>
            <Controller
              name="tariff"
              control={control}
              render={({ field }) => (
                <div
                  className={`${styles.card} ${
                    field.value === tariff.value ? styles.selected : ""
                  } ${isInitialized ? "" : styles.hidden}`}
                  onClick={() => field.onChange(tariff.value)}
                >
                  <div className={styles.tariffIcon}>{tariff.component}</div>
                  <label className={styles.label}>{tariff.label}</label>
                  <div className={styles.content}>
                    <p>{tariff.price}</p>
                  </div>
                </div>
              )}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Tariff;
