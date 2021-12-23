import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllRequests } from "../../api/requests.api";
import RequestsTable from "../../components/RequestsTable/RequestsTable";
import { Navbar, SubHeader } from "../../components";
import { UserContext } from "../../components/Context/AuthUser";

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [requestsFiltered, setRequestsFiltered] = useState([]);
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(
    () =>
      getAllRequests().then((res) => {
        setRequests(res);
        setRequestsFiltered(res);
      }),
    []
  );

  return (
    <div>
      {user.length === 0 && history.push("/")}
      <Navbar />
      <SubHeader title="Peticiones" list={requests} location="/peticiones/crear" setter={setRequestsFiltered} />
      <RequestsTable requests={requestsFiltered.length !== 0 ? requestsFiltered : []} />
    </div>
  );
};

export default RequestsList;
