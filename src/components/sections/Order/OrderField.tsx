import { FC, ChangeEvent, useState, useRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";

import DGDIcon from "@img/ui/Field/dgd.svg";
import CreateIcon from "@img/ui/Field/create.svg";
import RemoveIcon from "@img/ui/Field/remove.svg";
import PlaceIcon from "@img/ui/Field/place.svg";
import Select from "@components/ui/Select/Select";

import { IFormValues, IOrderFields } from "interfaces/IField";
import styles from "./Order.module.scss";

const selectData = [
  { address: "Донована 13" },
  { address: "Ленина 1" },
  { address: "Джорджа Вашингтона 14" },
  { address: "Пролетарская 25" },
];

const OrderField: FC<IOrderFields> = ({ createField, removeField, index }) => {
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const { control, register, getValues, setValue } =
    useFormContext<IFormValues>();
  const fields = getValues(`fields`);

  const autoSize = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "21px";
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight}px`;

    if (e.target.value.length > 3) {
      setShowSelect(true);
    } else {
      setShowSelect(false);
    }
  };

  useEffect(() => {
    if (showSelect) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSelect]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setShowSelect(false);
    }
    setValue(`fields.${index}.route`, "");
  };

  return (
    <div className={styles.fieldWrapper}>
      <div className={styles.dragButton}>
        <DGDIcon />
      </div>
      <div className={styles.fullField}>
        <div
          className={`${styles.field} ${showSelect ? styles.fieldActive : ""}`}
        >
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
      {showSelect && (
        <div ref={selectRef}>
          <Controller
            name={`fields.${index}.select`}
            control={control}
            render={({ field }) => (
              <Select
                list={selectData}
                customClass="custom-class"
                onChange={(address) => {
                  field.onChange(address);
                  setValue(`fields.${index}.route`, address);
                  setShowSelect(false);
                }}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default OrderField;
