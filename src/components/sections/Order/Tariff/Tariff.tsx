import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFormContext, Controller } from "react-hook-form";
import EconomyIcon from "@img/ui/Tariff/economy.svg";

import { tariffs } from "./tariffData";
import { IFormValues } from "interfaces/IField";
import "swiper/scss";
import styles from "./Tariff.module.scss";

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
        {tariffs.map((tariff, index) => {
          const Icon = tariff.component;
          return (
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
                    <div className={styles.tariffIcon}>
                      <Icon />
                    </div>
                    <label className={styles.label}>{tariff.label}</label>
                    <div className={styles.content}>
                      <p>{`От ${tariff.price} ₽`}</p>
                    </div>
                  </div>
                )}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Tariff;
