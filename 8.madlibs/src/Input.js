import React from "react";

const Input = ({ name, value, handleChange }) => {
  return (
    <input
      type="text"
      autoComplete="off"
      name={name}
      value={value}
      onChange={(e) => handleChange(e)}
      required
    />
  );
};

export default Input;
