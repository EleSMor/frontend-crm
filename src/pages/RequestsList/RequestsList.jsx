import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllRequests } from "../../api/requests.api";
import RequestsTable from "../../components/RequestsTable/RequestsTable";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import Pagination from "../../components/Pagination/Pagination";
import { UserContext } from "../../components/Context/AuthUser";

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [requestsFiltered, setRequestsFiltered] = useState([]);

  const [loader, setLoader] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [qPerPage] = useState(100);

  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(
    () =>
      getAllRequests().then((res) => {
        setRequests(res);
        setRequestsFiltered(res);
        setLoader(false);
      }),
    []
  );

  const indexOfLastRequest = currentPage * qPerPage;
  const indexOfFirstRequest = indexOfLastRequest - qPerPage;
  let currentRequests = requestsFiltered?.slice(indexOfFirstRequest, indexOfLastRequest);
  let requestsLength = requestsFiltered?.length;

  const paginate = (n) => {
    setCurrentPage(n);
    window.scrollTo({ top: 0 });
  };

  const RequestsListFooter = () => (
    <Pagination qPerPage={qPerPage} totalQ={requestsLength} paginate={paginate} currentPage={currentPage} />
  );

  return (
    <div>
      {user.length === 0 && history.push("/")}
      <Layout
        subTitle="Peticiones"
        subList={requests}
        subLocation={() => history.push("/peticiones/crear")}
        subSetter={setRequestsFiltered}
        footContent={<RequestsListFooter />}
      >
        {loader ? <Spinner /> : <RequestsTable requests={currentRequests.length !== 0 ? currentRequests : []} />}
      </Layout>
    </div>
  );
};

export default RequestsList;
