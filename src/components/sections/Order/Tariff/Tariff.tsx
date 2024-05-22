import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useFormContext, Controller } from "react-hook-form";
import styles from "./Tariff.module.scss";

const tarrifs = [
  { label: "Эконом", value: "economy" },
  { label: "Комфорт", value: "comfort" },
  { label: "Бизнес", value: "business" },
];

const Tariff: FC = () => {
  const { control } = useFormContext<{ tariff: string }>();

  return (
    <div className={styles.wrapper}>
      <Swiper spaceBetween={10} slidesPerView={2}>
        {tarrifs.map((tarrif, index) => (
          <SwiperSlide key={index}>
            <Controller
              name="tariff"
              control={control}
              render={({ field }) => (
                <div
                  className={`${styles.card} ${
                    field.value === tarrif.value ? styles.selected : ""
                  }`}
                  onClick={() => field.onChange(tarrif.value)}
                >
                  <label>{tarrif.label}</label>
                  <div className={styles.content}>
                    <p>{tarrif.label}</p>
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
