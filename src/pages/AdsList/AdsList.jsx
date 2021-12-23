import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllAds } from "../../api/ads.api";
import AdsTable from "../../components/AdsTable/AdsTable";
import { Navbar, SubHeader } from "../../components";
import { UserContext } from "../../components/Context/AuthUser";

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [adsFiltered, setAdsFiltered] = useState([]);
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    getAllAds().then((res) => {
      setAds(res);
      setAdsFiltered(res);
    });
  }, []);

  return (
    <div>
      {user.length === 0 && history.push("/")}
      <Navbar />
      <SubHeader title="Anuncios" list={ads} setter={setAdsFiltered} location="/anuncios/crear" />
      <AdsTable ads={adsFiltered.length !== 0 ? adsFiltered : []} />
    </div>
  );
};

export default AdsList;
