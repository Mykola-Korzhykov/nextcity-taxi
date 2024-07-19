import { Dayjs } from "dayjs";

export type TField = {
  route: string;
  entrance: string;
  select?: string;
};

export type TDropArguments = {
  removedIndex: number;
  addedIndex: number;
};

export interface IFormValues {
  orderId?: number;
  fields: TField[];
  tariff: "economy" | "comfort" | "business" | "test";
  phone: string;
  date: Date | null | string;
  time: Dayjs | null | string;
  options: Array<{ name: string; value: boolean }>;
  status?: "wait" | "confirmed" | "cancelled";
  price: number;
  car?: ICar;
  driver?: IDriver;
}

// export interface IFormValues {
//   orderId?: number;
//   fields: TField[];
//   phone: string;
//   tariff: "economy" | "comfort" | "business" | "test";
//   date: string; // Изменить на string
//   time: string; // Изменить на string
//   options: Array<{ name: string; value: boolean }>;
//   status?: "wait" | "confirmed" | "cancelled";
//   price: number;
//   car?: ICar;
//   driver?: IDriver;
// }

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

export interface IDriver {
  name: string;
  phone: string;
}

export interface ICar {
  model: string;
  color: string;
  licensePlate: string;
}
