import React, { useState } from "react";
import storage from "../../services/storage";

export const CustomAdsFilters = React.createContext([]);

const INITIAL_ADS_FILTERS = storage.get("adsFilters");

const AdsFilters = (props) => {
  const [adsFilters, setFilters] = useState(
    INITIAL_ADS_FILTERS.length === 0
      ? { adType: [], adBuildingType: [], gvOperationClose: [], adStatus: [] }
      : INITIAL_ADS_FILTERS
  );

  const storeAdsFilters = (filters) => {
    setFilters(filters);
    storage.set("adsFilters", adsFilters);
  };

  const deleteAdFilters = () => {
    setFilters("");
    storage.removeItem("adsFilters");
  };

  return (
    <CustomAdsFilters.Provider value={{ adsFilters: adsFilters, storeAdsFilters, deleteAdFilters }}>
      {props.children}
    </CustomAdsFilters.Provider>
  );
};

export default AdsFilters;
