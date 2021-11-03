import React from "react";
import { NavLink } from "react-router-dom";

const ConsultantsList = () => {
  return (
    <NavLink to="/consultants/create">
      <button>New consultant</button>
    </NavLink>
  );
};

export default ConsultantsList;
