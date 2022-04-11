import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllAds } from "../../api/ads.api";
import AdsTable from "../../components/AdsTable/AdsTable";
import { UserContext } from "../../components/Context/AuthUser";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import Pagination from "../../components/Pagination/Pagination";
import { checkSession } from "../../api/auth.api";

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [adsFiltered, setAdsFiltered] = useState([]);
  const [loader, setLoader] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [qPerPage] = useState(100);

  const { user, deleteUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    checkSession().then((res) => {
      if (res === "Acceso restringido") {
        deleteUser();
        history.push("/");
      }
    });
  }, []);

  useEffect(() => {
    getAllAds().then((res) => {
      setAds(res);
      setAdsFiltered(res);
      setLoader(false);
    });
  }, []);

  const indexOfLastAd = currentPage * qPerPage;
  const indexOfFirstAd = indexOfLastAd - qPerPage;
  let currentAds = adsFiltered?.sort(function (a, b) {
    var keyA = new Date(a.updatedAt),
      keyB = new Date(b.updatedAt);
    // Compare the 2 dates
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  }).slice(indexOfFirstAd, indexOfLastAd);
  let adsLength = adsFiltered?.length;

  const paginate = (n) => {
    setCurrentPage(n);
    window.scrollTo({ top: 0 });
  };

  const AdsListFooter = () => (
    <Pagination qPerPage={qPerPage} totalQ={adsLength} paginate={paginate} currentPage={currentPage} />
  );

  return (
    <div>
      {user.length === 0 && history.push("/")}
      <Layout
        subTitle="Anuncios"
        subList={ads}
        subLocation={() => history.push("/anuncios/crear")}
        subSetter={setAdsFiltered}
        subFilteredList={adsFiltered}
        footContent={<AdsListFooter />}
      >
        {loader ? <Spinner /> : <AdsTable ads={currentAds.length !== 0 ? currentAds : []} />}
      </Layout>
    </div>
  );
};

export default AdsList;
