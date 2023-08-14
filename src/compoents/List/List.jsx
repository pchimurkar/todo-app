/* eslint-disable react/prop-types */
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./List.module.css";

// eslint-disable-next-line react/prop-types
const List = ({
  tasks,
  swapListItemHandler,
  isDoneHandler,
  deleteHandler,
  isEditingHandler,
  cancelHandler,
  itemListChangeHandler,
  itemSaveHandler,
  isSearching,
}) => {
  // eslint-disable-next-line react/prop-types

  const listItems = tasks.map((task, index) => (
    <li
      key={index}
      className={task.isDone ? styles.itemDoneStyle : ""}
      style={task.isSearch ? { display: "block" } : { display: "none" }}
    >
      {!task.isEditing && (
        <>
          {task.item}

          <Button
            btnLabel="Edit"
            className={styles.itemBtn}
            btnClickHandler={() => isEditingHandler(index)}
            isDisabled={task.isDone}
          />
        </>
      )}
      {task.isEditing && (
        <>
          <Input
            inputValue={task.editingItem}
            inputChangeHandler={(value) => itemListChangeHandler(index, value)}
          />
          <Button
            btnLabel="Save"
            className={styles.itemBtn}
            btnClickHandler={() => itemSaveHandler(index)}
            isDisabled={task.editingItem.trim().length === 0}
          />
          <Button
            btnLabel="Cancel"
            className={styles.itemBtn}
            btnClickHandler={() => cancelHandler(index)}
          />
        </>
      )}

      <Button
        btnLabel="UP"
        className={styles.itemBtn}
        btnClickHandler={() => swapListItemHandler(index, index - 1)}
        isDisabled={index === 0 || isSearching}
      />
      <Button
        btnLabel="DOWN"
        className={styles.itemBtn}
        btnClickHandler={() => swapListItemHandler(index, index + 1)}
        isDisabled={index === tasks.length - 1 || isSearching}
      />

      {task.isDone && (
        <Button
          btnLabel="Delete"
          className={styles.itemBtn}
          btnClickHandler={() => deleteHandler(index)}
        />
      )}

      {!task.isDone && (
        <Button
          btnLabel="Done"
          className={styles.itemBtn}
          btnClickHandler={() => isDoneHandler(index)}
          isDisabled={task.isEditing}
        />
      )}
    </li>
  ));

  return (
    <div className={styles.listContainer}>
      <ul className={styles.list}>{listItems}</ul>
    </div>
  );
};

export default List;
