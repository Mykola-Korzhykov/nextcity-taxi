import { FC, ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

import DGDIcon from "@img/ui/Field/dgd.svg";
import CreateIcon from "@img/ui/Field/create.svg";
import RemoveIcon from "@img/ui/Field/remove.svg";
import PlaceIcon from "@img/ui/Field/place.svg";

import styles from "./Order.module.scss";

interface Props {
  createField: any;
  removeField: any;
  index: number;
}

const OrderField: FC<Props> = ({ createField, removeField, index }) => {
  const { control, register, getValues } = useFormContext();

  const fields = getValues(`fields`);

  const autoSize = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "21px";
    const scrollHeight = (e.target as HTMLTextAreaElement).scrollHeight;
    e.target.style.height = `${scrollHeight}px`;
  };

  return (
    <div className={styles.fieldWrapper}>
      <div className={`${styles.dragButton}`}>
        <DGDIcon />
      </div>
      <div className={styles.field}>
        <textarea
          placeholder={
            index === 0
              ? "Откуда"
              : index === fields.length - 1
              ? "Куда"
              : "Адрес"
          }
          className={styles.routeInput}
          onInput={autoSize}
          data-isfield="true"
          {...register(`fields.${index}.route`)}
        />

        <div>
          <input
            type="number"
            placeholder={"Подъезд"}
            className={styles.entranceInput}
            {...register(`fields.${index}.entrance`)}
          />
        </div>

        <div
          className={`${styles.createButton} ${
            index === 0 ? styles.show : styles.hide
          }`}
          onClick={() => createField(index)}
        >
          <CreateIcon />
        </div>

        <div
          className={`${styles.removeButton} ${
            index > 0 && index !== fields.length - 1 && fields.length > 2
              ? styles.show
              : styles.hide
          }`}
          onClick={() => removeField(index)}
        >
          <RemoveIcon />
        </div>

        <div
          className={`${styles.placeButton} ${
            index === fields.length - 1 ? styles.show : styles.hide
          }`}
        >
          <PlaceIcon />
        </div>
      </div>
    </div>
  );
};

export default OrderField;
