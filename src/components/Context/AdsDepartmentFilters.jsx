import React, { useState } from "react";
import storage from "../../services/storage";

export const CustomAdsDepartmentFilters = React.createContext();

const INITIAL_ADS_DEPARTMENT_FILTERS = storage.get("departmentFilter").length !== 0 ? storage.get("departmentFilter") : "Todos";

const AdsDepartmentFilter = (props) => {
  const [departmentFilter, setFilters] = useState(INITIAL_ADS_DEPARTMENT_FILTERS);

  const storeDepartmentFilter = (filters) => {
    setFilters(filters);
    storage.set("departmentFilter", filters);
  };

  const deleteAdDepartmentFilter = () => {
    setFilters("");
    storage.removeItem("departmentFilter");
  };

  return (
    <CustomAdsDepartmentFilters.Provider value={{ departmentFilter: departmentFilter, storeDepartmentFilter, deleteAdDepartmentFilter }}>
      {props.children}
    </CustomAdsDepartmentFilters.Provider>
  );
};

export default AdsDepartmentFilter;
