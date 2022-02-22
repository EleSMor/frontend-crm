import React, { useState } from "react";
import storage from "../../services/storage";

export const CustomRequestsFilters = React.createContext([]);

const INITIAL_REQUESTS_FILTERS = storage.get("requestsFilters");

const RequestsFilters = (props) => {
  const [requestsFilters, setFilters] = useState(
    INITIAL_REQUESTS_FILTERS.length === 0
      ? { requestAdType: [], requestBuildingType: [] }
      : INITIAL_REQUESTS_FILTERS
  );

  const storeRequestsFilters = (filters) => {
    setFilters(filters);
    storage.set("requestsFilters", requestsFilters);
  };

  const deleteRequestsFilters = () => {
    setFilters("");
    storage.removeItem("requestsFilters");
  };

  return (
    <CustomRequestsFilters.Provider value={{ requestsFilters: requestsFilters, storeRequestsFilters, deleteRequestsFilters }}>
      {props.children}
    </CustomRequestsFilters.Provider>
  );
};

export default RequestsFilters;
