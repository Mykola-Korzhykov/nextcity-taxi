import EconomyIcon from "@img/ui/Tariff/economy.svg";
import { FC } from "react";

interface ITariffs {
  label: string;
  value: string;
  component: FC;
  price: number;
}

export const tariffs: ITariffs[] = [
  {
    label: "Эконом",
    value: "economy",
    component: EconomyIcon,
    price: 115,
  },
  {
    label: "Комфорт",
    value: "comfort",
    component: EconomyIcon,
    price: 125,
  },
  {
    label: "Бизнес",
    value: "business",
    component: EconomyIcon,
    price: 150,
  },
  {
    label: "Тест",
    value: "test",
    component: EconomyIcon,
    price: 160,
  },
];
