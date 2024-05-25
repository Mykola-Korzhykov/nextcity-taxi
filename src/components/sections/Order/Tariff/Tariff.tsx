import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFormContext, Controller } from "react-hook-form";

import "swiper/scss";
import styles from "./Tariff.module.scss";

const tariffs = [
  { label: "Эконом", value: "economy" },
  { label: "Комфорт", value: "comfort" },
  { label: "Бизнес", value: "business" },
  { label: "Тест", value: "test" },
];

const Tariff: FC = () => {
  const { control } = useFormContext<{ tariff: string }>();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <Swiper
        spaceBetween={15}
        slidesPerView={3}
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
                  <label>{tariff.label}</label>
                  <div className={styles.content}>
                    <p>{tariff.label}</p>
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
