import React from "react";
import "./Checkbox.scss";

const Checkbox = ({ label, name, checked, onChange }) => {
  return (
    <div className="CheckBox">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
export default Checkbox;
