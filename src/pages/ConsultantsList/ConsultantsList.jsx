import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ConsultantCard from "../../components/ConsultantCard/ConsultantCard";
import { getAllConsultants } from "../../api/consultants.api";
import { UserContext } from "../../components/Context/AuthUser";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import Pagination from "../../components/Pagination/Pagination";

const ConsultantsList = () => {
  const [consultants, setConsultants] = useState([]);
  const [consultantsFiltered, setConsultantsFiltered] = useState([]);
  const [loader, setLoader] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [qPerPage] = useState(5);

  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(
    () =>
      getAllConsultants().then((res) => {
        console.log(res);
        setConsultantsFiltered(res);
        setConsultants(res);
        setLoader(false);
      }),
    []
  );

  const indexOfLastContact = currentPage * qPerPage;
  const indexOfFirstContact = indexOfLastContact - qPerPage;
  let currentConsultants = consultantsFiltered?.slice(indexOfFirstContact, indexOfLastContact);
  let consultantsLength = consultantsFiltered?.length;

  const paginate = (n) => {
    setCurrentPage(n);
    window.scrollTo({ top: 0 });
  };

  const ConsultantsListFooter = () => (
    <Pagination qPerPage={qPerPage} totalQ={consultantsLength} paginate={paginate} currentPage={currentPage} />
  );

  return (
    <div>
      {user.length === 0 && history.push("/")}
      <Layout
        subTitle="Consultores"
        subList={consultants}
        subLocation={() => history.push("/consultores/crear")}
        subSetter={setConsultantsFiltered}
        footContent={<ConsultantsListFooter />}
      >
        {loader ? (
          <Spinner />
        ) : currentConsultants ? (
          currentConsultants.map((consultant) => <ConsultantCard consultant={consultant} />)
        ) : (
          ""
        )}
      </Layout>
    </div>
  );
};

export default ConsultantsList;
