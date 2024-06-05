import { FC } from "react";
import { Container } from "react-smooth-dnd";
import { useFormContext, useFieldArray } from "react-hook-form";

import MemoizedFields from "./hooks/MemoizedFields";
import { TField, TDropArguments } from "interfaces/IField";
import styles from "./Order.module.scss";

const OrderList: FC = () => {
  const { control } = useFormContext<Record<string, any>>();
  const { fields, insert, remove, move } = useFieldArray<Record<string, any>>({
    control,
    name: "fields",
  });

  const createField = (index: number): void => {
    insert(index + 1, {});
  };

  const removeField = (index: number): void | boolean => {
    if (fields.length <= 2 && index >= fields.length - 1) return false;
    remove(index);
  };

  const onDrop = ({ removedIndex, addedIndex }: TDropArguments) => {
    if (removedIndex !== null && addedIndex !== null) {
      move(removedIndex, addedIndex);
    }
  };

  const shouldAnimateDrop = (): boolean => {
    return false;
  };

  return (
    // @ts-ignore
    <Container<DragItem>
      dragHandleSelector={`.${styles.dragButton}`}
      lockAxis="y"
      onDrop={onDrop}
      animationDuration={150}
      dragClass={styles.dragActive}
      shouldAnimateDrop={shouldAnimateDrop}
    >
      <MemoizedFields
        fields={fields as unknown as TField[]}
        createField={createField}
        removeField={removeField}
      />
    </Container>
  );
};

export default OrderList;
