import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ConsultantCard from "../../components/ConsultantCard/ConsultantCard";
import { getAllConsultants } from "../../api/consultants.api";
import { Navbar, SubHeader } from "../../components";
import { UserContext } from "../../components/Context/AuthUser";

const ConsultantsList = () => {
  const [consultants, setConsultants] = useState();
  const [consultantsFiltered, setConsultantsFiltered] = useState([]);
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(
    () =>
      getAllConsultants().then((res) => {
        setConsultants(res);
        setConsultantsFiltered(res);
      }),
    []
  );

  return (
    <div>
      {user.length === 0 && history.push("/")}
      <Navbar />
      <SubHeader title="Consultores" list={consultants} location="/consultores/crear" setter={setConsultantsFiltered} />
      <ConsultantCard consultants={consultantsFiltered} />
    </div>
  );
};

export default ConsultantsList;
