import { Dayjs } from "dayjs";

export type TField = {
  route: string;
  entrance: string;
  select: string;
};

export type TDropArguments = {
  removedIndex: number;
  addedIndex: number;
};

// export interface IFormValues {
//   fields: TField[];
//   tariff: "economy" | "comfort" | "business" | "test";
// }

export interface IFormValues {
  fields: TField[];
  tariff: "economy" | "comfort" | "business" | "test";
  date: Date | null;
  time: Dayjs | null;
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
