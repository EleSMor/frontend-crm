import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllAds } from "../../api/ads.api";
import AdsTable from "../../components/AdsTable/AdsTable";
import { UserContext } from "../../components/Context/AuthUser";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import Pagination from "../../components/Pagination/Pagination";

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [adsFiltered, setAdsFiltered] = useState([]);
  const [loader, setLoader] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [qPerPage] = useState(100);
  
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    getAllAds().then((res) => {
      setAds(res);
      setAdsFiltered(res);
      setLoader(false);
    });
  }, []);

  const indexOfLastAd = currentPage * qPerPage;
  const indexOfFirstAd = indexOfLastAd - qPerPage;
  let currentAds = adsFiltered?.slice(indexOfFirstAd, indexOfLastAd);
  let adsLength = adsFiltered?.length;

  const paginate = (n) => {
    setCurrentPage(n)
    window.scrollTo({top: 0})
  }

  const AdsListFooter = () => (
    <Pagination qPerPage={qPerPage} totalQ={adsLength} paginate={paginate} currentPage={currentPage} />
  );

  return (
    <div>
      {user.length === 0 && history.push("/")}
      {/* <Navbar />
      <SubHeader title="Anuncios" list={ads} setter={setAdsFiltered} location="/anuncios/crear" />
      <AdsTable ads={adsFiltered.length !== 0 ? adsFiltered : []} /> */}
      <Layout
        subTitle="Anuncios"
        subList={ads}
        subLocation={() => history.push("/anuncios/crear")}
        subSetter={setAdsFiltered}
        footContent={<AdsListFooter />}
      >
        {loader ? <Spinner /> : <AdsTable ads={currentAds.length !== 0 ? currentAds : []} />}
      </Layout>
    </div>
  );
};

export default AdsList;
