import { FC } from "react";

interface ITariffs {
  label: string;
  value: string;
  price: number;
}

export const tariffs: ITariffs[] = [
  {
    label: "Эконом",
    value: "economy",
    price: 100,
  },
  {
    label: "Комфорт",
    value: "comfort",
    price: 150,
  },
  {
    label: "Бизнес",
    value: "business",
    price: 200,
  },
  {
    label: "Минивэн",
    value: "minivan",
    price: 500,
  },
];

export const getLabelByValue = (value: string) => {
  const tariff = tariffs.find((tariff) => tariff.value === value);
  return tariff ? tariff.label : null;
};
