import { FC, useMemo } from "react";
import { Draggable } from "react-smooth-dnd";

import OrderField from "../OrderField";

import { IMemoizedFields } from "interfaces/IField";
import styles from "../Order.module.scss";

const MemoizedFields: FC<IMemoizedFields> = ({
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
