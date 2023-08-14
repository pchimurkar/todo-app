/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import List from "../List/List";
import styles from "./TodoList.module.css";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import Searchbar from "../SearchBar/SearchBar";

const LS_TODO_LIST = "todoList";

const TodoList = () => {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [delConfirm, setDelConfirm] = useState(false);
  const [clearDoneConfirm, setclearDoneConfrim] = useState(false);
  const [clearAllConfirmation, setClearAllConfirmation] = useState(false);
  const [todoIndex, setTodoIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // read the local storage
    const listItems = JSON.parse(localStorage.getItem(LS_TODO_LIST)) || [];
    setList(listItems);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_TODO_LIST, JSON.stringify(list));
  }, [list]);

  const inputChangeHandler = (str) => setText(str);

  const btnClickHandler = () => {
    const trimText = text.trim();
    if (trimText) {
      setList([
        ...list,
        {
          item: trimText,
          editingItem: trimText,
          isDone: false,
          isEditing: false,
          isSearch: true,
        },
      ]);
      setText("");
    }
  };

  const inputKeydownHandler = (e) => {
    if (e.key === "Enter") {
      btnClickHandler();
    }
  };

  const swapListItemHandler = (initIndex, finalIndex) => {
    const items = [...list];
    let temp = items[initIndex];
    items[initIndex] = items[finalIndex];
    items[finalIndex] = temp;
    setList(items);
  };

  const isDoneHandler = (index) => {
    const items = [...list];
    items[index].isDone = true;
    setList(items);
  };

  const deleteHandler = (index) => {
    setDelConfirm(true);
    setTodoIndex(index);
  };

  const deleteAllHandler = () => {
    setClearAllConfirmation(true);
  };

  const isEditingHandler = (index) => {
    const items = [...list];
    items[index].isEditing = true;
    setList(items);
  };

  const cancelHandler = (index) => {
    const items = [...list];
    items[index].isEditing = false;
    items[index].editingItem = items[index].item;
    setList(items);
  };

  const itemListChangeHandler = (index, value) => {
    const items = [...list];
    items[index].editingItem = value;
    setList(items);
  };

  const itemSaveHandler = (index) => {
    const items = [...list];
    items[index].isEditing = false;
    const item = items[index].editingItem.trim();
    if (item) {
      items[index].item = item;
      items[index].editingItem = item;
    }
    setList(items);
  };

  const clearAllDoneHandler = () => {
    setclearDoneConfrim(true);
  };

  const onYesClickHandler = () => {
    const items = [...list];
    const unDone = items.filter((ele) => ele.isDone === false);
    setList(unDone);
    setclearDoneConfrim(false);
  };

  const onCancelClickHandler = () => {
    setclearDoneConfrim(false);
  };

  const onSearchChange = (e) => {
    const items = [...list];
    if (e.trim().length !== 0) {
      for (let key of items) {
        if (!key.item.includes(e)) {
          key.isSearch = false;
        }
      }
      setIsSearching(true);
      setList(items);
    } else if (e.trim().length === 0) {
      for (let key of items) {
        key.isSearch = true;
      }
      setIsSearching(false);
      setList(items);
    }
  };

  return (
    <div className={styles.todoContainer}>
      <Input
        inputChangeHandler={inputChangeHandler}
        inputValue={text}
        keyHandler={inputKeydownHandler}
        className={styles.inputStyle}
      />
      <Button
        btnClickHandler={btnClickHandler}
        btnLabel="Add to List"
        isDisabled={text.trim().length === 0}
        className={styles.btnStyle}
      />
      <Button
        className={styles.btnStyle}
        btnClickHandler={deleteAllHandler}
        btnLabel="Clear All"
        isDisabled={list.length === 0}
      />
      <Button
        className={styles.btnStyle}
        btnClickHandler={clearAllDoneHandler}
        btnLabel="Clear Done"
        isDisabled={
          !(list.length && list.reduce((acc, el) => acc || el.isDone, false))
        }
      />

      <div style={{ marginTop: "10px" }}>
        <Searchbar placeHolder="Search Here" onSearchChange={onSearchChange} />
      </div>
      <List
        tasks={list}
        swapListItemHandler={swapListItemHandler}
        isDoneHandler={isDoneHandler}
        deleteHandler={deleteHandler}
        isEditingHandler={isEditingHandler}
        cancelHandler={cancelHandler}
        itemListChangeHandler={itemListChangeHandler}
        itemSaveHandler={itemSaveHandler}
        isSearching={isSearching}
      />

      {clearDoneConfirm && (
        <ConfirmDialog
          confirmShow={clearDoneConfirm}
          Message="Do You Want To Clear All Done Todo's ?"
          Title="Clear Confirmation"
          onYesClickHandler={onYesClickHandler}
          onCancelClickHandler={onCancelClickHandler}
        />
      )}

      {clearAllConfirmation && (
        <ConfirmDialog
          confirmShow={clearAllConfirmation}
          Message="Do You  Want To Clear All Todo's ?"
          Title="Clear All Confirmation"
          onYesClickHandler={() => {
            setList([]);
            setClearAllConfirmation(false);
          }}
          onCancelClickHandler={() => {
            setClearAllConfirmation(false);
          }}
        />
      )}

      {delConfirm && (
        <ConfirmDialog
          confirmShow={delConfirm}
          Message="Do You Want To Delete This Todo's ?"
          Title="Delete Confirmation"
          onYesClickHandler={(index = todoIndex) => {
            const items = [...list];
            items.splice(index, 1);
            setList(items);
            setDelConfirm(false);
          }}
          onCancelClickHandler={() => {
            setDelConfirm(false);
          }}
        />
      )}
    </div>
  );
};

export default TodoList;
