import { FC } from "react";
import { Container } from "react-smooth-dnd";
import { useFormContext, useFieldArray } from "react-hook-form";

import MemoizedFields from "./hooks/MemoizedFields";
import styles from "./Order.module.scss";

type DropArguments = {
  removedIndex: number;
  addedIndex: number;
};

const OrderList: FC = () => {
  const { control } = useFormContext();
  const { fields, insert, remove, move } = useFieldArray({
    control,
    name: "fields",
  });

  const createField = (index: number) => {
    insert(index + 1, {});
  };

  const removeField = (index: number) => {
    if (fields.length === 2 && index === 1) return false;
    remove(index);
  };

  const onDrop = ({ removedIndex, addedIndex }: DropArguments) => {
    move(removedIndex, addedIndex);
  };

  const shouldAnimateDrop = () => {
    return false; // Возвращаем false, чтобы отключить анимацию при отпускании
  };

  return (
    // @ts-ignore
    <Container
      dragHandleSelector={`.${styles.dragButton}`}
      lockAxis="y"
      onDrop={onDrop}
      animationDuration={150}
      dragClass={styles.dragActive}
      shouldAnimateDrop={shouldAnimateDrop}
    >
      <MemoizedFields
        fields={fields}
        createField={createField}
        removeField={removeField}
      />
    </Container>
  );
};

export default OrderList;
