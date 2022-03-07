import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ConsultantCard from "../../components/ConsultantCard/ConsultantCard";
import { getAllConsultants } from "../../api/consultants.api";
import { UserContext } from "../../components/Context/AuthUser";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import Pagination from "../../components/Pagination/Pagination";
import { BsCloudArrowUp } from "react-icons/bs";
import { checkSession } from "../../api/auth.api"

const ConsultantsList = () => {
  const [consultants, setConsultants] = useState([]);
  const [consultantsFiltered, setConsultantsFiltered] = useState([]);
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

  useEffect(
    () =>
      getAllConsultants().then((res) => {
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
        ) : currentConsultants.length === 0 ? (
          <div style={{ height: 200 }}>
            <p style={{ lineHeight: 4 }}>No ha creado ningún consultor </p>
            <BsCloudArrowUp fontSize="2.5em" />
          </div>
        ) : (
          currentConsultants.map((consultant, index) => (
            <ConsultantCard key={`${consultant._id}-${index}`} consultant={consultant} />
          ))
        )}
      </Layout>
    </div>
  );
};

export default ConsultantsList;
