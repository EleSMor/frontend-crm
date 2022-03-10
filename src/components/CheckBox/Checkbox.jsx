import React from "react";
import "./Checkbox.scss";

const Checkbox = ({ id, label, name, checked, onChange }) => {
  return (
    <div className="CheckBox">
      <input id={id} type="checkbox" name={name} checked={checked} onChange={onChange} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
export default Checkbox;
