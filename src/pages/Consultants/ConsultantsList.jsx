import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import ConsultantCard from "../../components/Consultants/ConsultantCard";
import ConsultantForm from "./ConsultantForm";
import { getAllConsultants } from "../../api/consultants.api";
import { Navbar, SubHeader } from "../../components";
import { UserContext } from "../../components/Context/AuthUser";

const ConsultantsList = () => {
  const [consultants, setConsultants] = useState();
  const [openForm, setOpenForm] = useState(false);
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => getAllConsultants().then((res) => setConsultants(res)), []);

  return (
    <div>
      {user.length === 0 && history.push("/login")}
      <Navbar />
      <SubHeader title="Consultores" list={consultants} setOpenForm={setOpenForm} />
      {openForm === true && <ConsultantForm setOpenForm={setOpenForm} />}
      {openForm === false && <ConsultantCard consultants={consultants} />}
    </div>
  );
};

export default ConsultantsList;
