export type TField = {
  route: string;
  entrance: string;
};

export interface IFormValues {
  fields: TField[];
  tariff: "economy" | "comfort" | "business" | "test";
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
