/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Button from "../Button/Button";

const SearchBar = ({ placeHolder, onSearchChange, value }) => {
  const onChangehandler = (e) => {
    onSearchChange(e.target.value);
  };
  return (
    <>
      <input
        placeholder={placeHolder}
        onChange={onChangehandler}
        value={value}
      />
    </>
  );
};

export default SearchBar;