import React, { useContext } from "react";
import { UserContext } from "../../components/Context/AuthUser";
import { NavLink } from "react-router-dom";
import { Navbar } from "../../components";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar />
      {user.length === 0 ? (
        <div>
          <h1>Bienvenido al CRM de GV Real Estate</h1>
          <h3>
            Por favor, inice sesión para comenzar pulsando <NavLink to="/login">aquí</NavLink>
          </h3>
        </div>
      ) : (
        <div>
          <h1>Bienvenido al CRM de GV Real Estate, {user.fullName.split(" ", 1)}</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
