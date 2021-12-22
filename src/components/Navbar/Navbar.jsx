import React from "react";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";

import {
  GvreLogo,
  Ads,
  Requests,
  Contacts,
  Consultants,
  Calendar,
  Settings,
  Ellipse2,
  Ellipse3,
  User,
} from "../../icons/index.js";
import "./Navbar.scss";

const Navbar = () => {
  let location = window.location.pathname;
  const size = useWindowSize();

  return (
    <>
      {/* {size < 880 ? (
        <nav className="navigateXS">
          <h1>NAVBAR SMALL MENU</h1>
        </nav>
      ) : ( */}
        <nav className="navigate">
          <div className="navigate__left">
            <ul>
              <div className="navigate__home">
                <li>
                  <GvreLogo className="navigate__link--logo" />
                </li>
                <li>
                  <h1 className="navigate__title">GV Real State</h1>
                </li>
              </div>
              <NavLink className={location.includes("/ads") ? "navigate__route-active" : "navigate__route"} to="/ads">
                <li>
                  <div>
                    <Ads className="navigate__link--icon" />
                    <span className="navigate__link--text">Anuncios</span>
                  </div>
                </li>
              </NavLink>
              <NavLink
                className={location.includes("/requests") ? "navigate__route-active" : "navigate__route"}
                to="/requests"
              >
                <li>
                  <div>
                    <Requests className="navigate__link--icon" />
                    <span className="navigate__link--text">Peticiones</span>
                  </div>
                </li>
              </NavLink>
              <NavLink
                className={location.includes("/contacts") ? "navigate__route-active" : "navigate__route"}
                to="/contacts"
              >
                <li>
                  <div>
                    <Contacts className="navigate__link--icon" />
                    <span className="navigate__link--text">Contactos</span>
                  </div>
                </li>
              </NavLink>
              <NavLink
                className={location.includes("/consultants") ? "navigate__route-active" : "navigate__route"}
                to="/consultants"
              >
                <li>
                  <div>
                    <Consultants className="navigate__link--icon" />
                    <span className="navigate__link--text">Consultores</span>
                  </div>
                </li>
              </NavLink>
              {/* <span className="navigate__route" to="">
                <li>
                  <div>
                    <Calendar className="navigate__link--icon" />
                    <span className="navigate__link--text">Agenda</span>
                  </div>
                </li>
              </span>
              <span className="navigate__route" to="">
                <li>
                  <div>
                    <Settings className="navigate__link--icon" />
                    <span className="navigate__link--text">Configuración</span>
                  </div>
                </li>
              </span> */}
            </ul>
          </div>

          <div className="navigate__right">
            <ul>
              <Ellipse2 className="navigate__logging-ellipse1"></Ellipse2>
              <Ellipse3 className="navigate__logging-ellipse2"></Ellipse3>
              <NavLink activeClassName="" to="/">
                <User className="navigate__logging-user" />
              </NavLink>
            </ul>
          </div>
        </nav>
      {/* )} */}
    </>
  );
};

export default Navbar;
