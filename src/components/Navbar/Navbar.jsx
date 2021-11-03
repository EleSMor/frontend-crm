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
          <div className="nav__home">
            <NavLink to="/">
              <li>
                <GvreLogo className="nav__link--logo" />
              </li>
              <li>
                <h1 className="nav__title">GV Real State</h1>
              </li>
            </NavLink>
          </div>
          <NavLink className="nav__route" to="/ads">
            <li>
              <div>
                <Ads className="nav__link--icon" />
                <span className="nav__link--text">Anuncios</span>
              </div>
            </li>
          </NavLink>
          <NavLink className="nav__route" to="/requests">
            <li>
              <div>
                <Requests className="nav__link--icon" />
                <span className="nav__link--text">Peticiones</span>
              </div>
            </li>
          </NavLink>
          <NavLink className="nav__route" to="/contacts">
            <li>
              <div>
                <Contacts className="nav__link--icon" />
                <span className="nav__link--text">Contactos</span>
              </div>
            </li>
          </NavLink>
          <NavLink className="nav__route" to="/consultants">
            <li>
              <div>
                <Consultants className="nav__link--icon" />
                <span className="nav__link--text">Consultores</span>
              </div>
            </li>
          </NavLink>
          <NavLink className="nav__route" to="/schedule">
            <li>
              <div>
                <Calendar className="nav__link--icon" />
                <span className="nav__link--text">Agenda</span>
              </div>
            </li>
          </NavLink>
          <NavLink className="nav__route" to="/settings">
            <li>
              <div>
                <Settings className="nav__link--icon" />
                <span className="nav__link--text">Configuración</span>
              </div>
            </li>
          </NavLink>
        </ul>
      </div>

      <div className="nav__right">
        <ul>
          <NavLink to="/">
            <li>
              <Bell className="nav__link--icon-notify" />
            </li>
          </NavLink>
          <NavLink to="/">
            <li>
              <Mail className="nav__link--icon-notify" />
            </li>
          </NavLink>
          <Ellipse2 className="nav__logging-ellipse1"></Ellipse2>
          <Ellipse3 className="nav__logging-ellipse2"></Ellipse3>
          <NavLink activeClassName="" to="/login">
            <User className="nav__logging-user" />
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
