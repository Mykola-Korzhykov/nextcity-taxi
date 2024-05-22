import { FC, useMemo } from "react";
import { Draggable } from "react-smooth-dnd";

import OrderField from "../OrderField";
import styles from "../Order.module.scss";

type MemoizedFieldsProps = {
  fields: Array<any>;
  createField: (index: number) => void;
  removeField: (index: number) => void;
};

const MemoizedFields: FC<MemoizedFieldsProps> = ({
  fields,
  createField,
  removeField,
}) => {
  const memoizedFields = useMemo(() => {
    return fields.map((field, index) => (
      // @ts-ignore
      <Draggable key={field.id} className={styles.draggable}>
        <OrderField
          createField={createField}
          removeField={removeField}
          index={index}
        />
      </Draggable>
    ));
  }, [fields]);

  return <>{memoizedFields}</>;
};

export default MemoizedFields;
