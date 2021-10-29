import React from "react";
import { NavLink } from "react-router-dom";
import {
  GvreLogo,
  Ads,
  Requests,
  Contacts,
  Consultants,
  Calendar,
  Settings,
  Bell,
  Mail,
  Ellipse2,
  Ellipse3,
  User,
} from "../../icons/index.js";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__left">
        <ul>
          <li className="nav__link">
            <NavLink to="/">
              <GvreLogo />
            </NavLink>
          </li>
          <li className="nav__link">
            <div>
              <NavLink to="/ads">
                <Ads />
                <span>Anuncios</span>
              </NavLink>
            </div>
          </li>
          <li className="nav__link">
            <div>
              <NavLink to="/requests">
                <Requests />
                <span>Peticiones</span>
              </NavLink>
            </div>
          </li>
          <li className="nav__link">
            <div>
              <NavLink to="/contacts">
                <Contacts />
                <span>Contactos</span>
              </NavLink>
            </div>
          </li>
          <li className="nav__link">
            <div>
              <NavLink to="/consultants">
                <Consultants />
                <span>Consultores</span>
              </NavLink>
            </div>
          </li>
          <li className="nav__link">
            <div>
              <NavLink to="/schedule">
                <Calendar />
                <span>Agenda</span>
              </NavLink>
            </div>
          </li>
          <li className="nav__link">
            <div>
              <NavLink to="/settings">
                <Settings />
                <span>Configuración</span>
              </NavLink>
            </div>
          </li>
        </ul>
      </div>

      <div className="nav__right">
        <ul>
          <li className="nav__link">
            <NavLink to="/">
              <Bell />
            </NavLink>
          </li>
          <li className="nav__link">
            <NavLink to="/">
              <Mail />
            </NavLink>
          </li>
          <li className="nav__link">
            <NavLink to="/">
              <Ellipse2>
                <Ellipse3>
                  <User />
                </Ellipse3>
              </Ellipse2>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
