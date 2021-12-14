import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllRequests } from "../../api/requests.api";
import RequestsTable from "../../components/RequestsTable/RequestsTable";
import { Navbar, SubHeader } from "../../components";
import { UserContext } from "../../components/Context/AuthUser";

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => getAllRequests().then((res) => setRequests(res)), []);

  return (
    <div>
      {user.length === 0 && history.push("/")}
      <Navbar />
      <SubHeader title="Peticiones" location="/requests/create" />
      <RequestsTable requests={requests} />
    </div>
  );
};

export default RequestsList;
