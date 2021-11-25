import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllAds } from "../../api/ads.api";
import AdsTable from "../../components/AdsTable/AdsTable";
import AdForm from "./AdForm";
import { Navbar, SubHeader } from "../../components";
import { UserContext } from "../../components/Context/AuthUser";

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => getAllAds().then((res) => setAds(res)), []);

  return (
    <div>
      {user.length === 0 && history.push("/")}
      <Navbar />
      <SubHeader title="Anuncios" list={ads} setOpenForm={setOpenForm} />
      {openForm === true && <AdForm setOpenForm={setOpenForm} />}
      {openForm === false && <AdsTable ads={ads} />}
    </div>
  );
};

export default AdsList;
