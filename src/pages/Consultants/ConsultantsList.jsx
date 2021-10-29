import React from "react";
import { NavLink } from "react-router-dom";

const Consultant = () => {
  return (
    <NavLink to="/consultants/register">
      <button>Register new consultant</button>
    </NavLink>
  );
};

export default Consultant;
