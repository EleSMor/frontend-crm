import React from "react";
import { NavLink } from "react-router-dom";

const RequestsList = () => {
  return (
    <NavLink to="/requests/create">
      <button>New request</button>
    </NavLink>
  );
};

export default RequestsList;
