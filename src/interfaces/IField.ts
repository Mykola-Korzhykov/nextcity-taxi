import { Dayjs } from "dayjs";
import dayjs from "dayjs/locale/ru";

export type TField = {
  route: string;
  entrance: string;
  select?: string;
};

export type TDropArguments = {
  removedIndex: number;
  addedIndex: number;
};

export interface IDriver {
  name: string;
  phone: string;
}

export interface ICar {
  model: string;
  color: string;
  licensePlate: string;
}

export interface IFormValues {
  orderId?: number;
  fields: TField[];
  tariff: "economy" | "comfort" | "business" | "test";
  phone: string;
  date: Date | null | string;
  time: Dayjs | null | string;
  options: Array<{ name: string; value: boolean }>;
  status?: "wait" | "confirmed" | "cancelled" | "finished";
  price: number;
  car?: ICar;
  driver?: IDriver;
}

export interface IFieldActions {
  createField: (index: number) => void;
  removeField: (index: number) => void;
}

export interface IOrderFields extends IFieldActions {
  index: number;
}

export interface IMemoizedFields extends IFieldActions {
  fields: TField[];
}
