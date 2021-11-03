import React from "react";
import { NavLink } from "react-router-dom";

const AdsList = () => {
  return (
    <NavLink to="/ads/create">
      <button>New ad</button>
    </NavLink>
  );
};

export default AdsList;