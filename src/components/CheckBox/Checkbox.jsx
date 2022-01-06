import React from "react";
import "./Checkbox.scss";

const Checkbox = ({label, name, checked, onChange}) => {
  return (
    <div className="CheckBox">
      <label htmlFor={name}>
        {label}
      </label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};
export default Checkbox;
