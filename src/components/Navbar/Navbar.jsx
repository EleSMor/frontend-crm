import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/AuthUser";
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
import NavbarXS from "./NavbarXS";

const Navbar = ({ title }) => {
  let location = window.location.pathname;
  const size = useWindowSize();
  const { user } = useContext(UserContext);

  return (
    <>
      {size < 880 ? (
        <NavbarXS title={title} />
      ) : (
        <nav className="navigate">
          <div className="navigate__left">
            <ul>
              <div className="navigate__home">
                <li>
                  <GvreLogo className="navigate__link--logo" />
                </li>
                <li>
                  <h1 className="navigate__title">GV Real Estate</h1>
                </li>
              </div>
              <NavLink
                className={location.includes("/anuncios") ? "navigate__route-active" : "navigate__route"}
                to="/anuncios"
              >
                <li>
                  <div>
                    <Ads className="navigate__link--icon" />
                    <span className="navigate__link--text">Anuncios</span>
                  </div>
                </li>
              </NavLink>
              <NavLink
                className={location.includes("/peticiones") ? "navigate__route-active" : "navigate__route"}
                to="/peticiones"
              >
                <li>
                  <div>
                    <Requests className="navigate__link--icon" />
                    <span className="navigate__link--text">Peticiones</span>
                  </div>
                </li>
              </NavLink>
              <NavLink
                className={location.includes("/contactos") ? "navigate__route-active" : "navigate__route"}
                to="/contactos"
              >
                <li>
                  <div>
                    <Contacts className="navigate__link--icon" />
                    <span className="navigate__link--text">Contactos</span>
                  </div>
                </li>
              </NavLink>
              <NavLink
                className={location.includes("/consultores") ? "navigate__route-active" : "navigate__route"}
                to="/consultores"
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
            <div className="navigate__logging-ellipse1">
              <div className="navigate__logging-ellipse2">
                <NavLink to="/">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.fullName} width={5} className="navigate__logging-user--avatar" />
                  ) : (
                    <User className="navigate__logging-user" />
                  )}
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
