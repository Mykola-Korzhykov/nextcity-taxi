import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFormContext, Controller } from "react-hook-form";
import EconomyIcon from "@img/ui/Tariff/economy.png";

import { tariffs } from "./tariffData";
import { IFormValues } from "interfaces/IField";
import "swiper/scss";
import styles from "./Tariff.module.scss";

const Tariff: FC = () => {
  const { control } = useFormContext<IFormValues>();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  return (
    <div className={styles.wrapper} data-aos="fade-right">
      <Swiper
        spaceBetween={15}
        slidesPerView={3}
        onInit={() => setIsInitialized(true)}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 3,
          }, // 576
          // 768: {
          //   slidesPerView: 4,
          // },
          // 992: {
          //   slidesPerView: 3,
          // },
        }}
      >
        {tariffs.map((tariff, index) => {
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
                    <div
                      className={styles.tariffIcon}
                      data-tariff={tariff.value}
                    ></div>
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
