import { NavLink } from "react-router-dom";
import {
  Ads,
  Requests,
  Contacts,
  Consultants,
  Calendar,
  Settings,
} from "../../icons/index.js";
import "./NavbarXS.scss";

const ContentXS = ({ onClick }) => {
  return (
    <div className="ContentNavbarXS">
      <NavLink className="ContentNavbarXS__item" to="/anuncios">
        <div {...(onClick ? { onClick: () => onClick(`/anuncios`) } : {})}>
          <Ads className="ContentNavbarXS__item--icon" />
          <span className="ContentNavbarXS__item--text">Anuncios</span>
        </div>
      </NavLink>
      <NavLink className="ContentNavbarXS__item" to="/peticiones">
        <div {...(onClick ? { onClick: () => onClick(`/peticiones`) } : {})}>
          <Requests className="ContentNavbarXS__item--icon" />
          <span className="ContentNavbarXS__item--text">Peticiones</span>
        </div>
      </NavLink>
      <NavLink className="ContentNavbarXS__item" to="/contactos">
        <div {...(onClick ? { onClick: () => onClick(`/contactos`) } : {})}>
          <Contacts className="ContentNavbarXS__item--icon" />
          <span className="ContentNavbarXS__item--text">Contactos</span>
        </div>
      </NavLink>
      <NavLink className="ContentNavbarXS__item" to="/consultores">
        <div {...(onClick ? { onClick: () => onClick(`/consultores`) } : {})}>
          <Consultants className="ContentNavbarXS__item--icon" />
          <span className="ContentNavbarXS__item--text">Consultores</span>
        </div>
      </NavLink>
      {/* <NavLink className="ContentNavbarXS__item" to="/agenda">
        <div {...(onClick ? { onClick: () => onClick(`/agenda`) } : {})}>
          <Calendar className="ContentNavbarXS__item--icon" />
          <span className="ContentNavbarXS__item--text">Agenda</span>
        </div>
      </NavLink>
      <NavLink className="ContentNavbarXS__item" to="/configuracion">
        <div {...(onClick ? { onClick: () => onClick(`/configuracion`) } : {})}>
          <Settings className="ContentNavbarXS__item--icon" />
          <span className="ContentNavbarXS__item--text">Configuración</span>
        </div>
      </NavLink> */}
    </div>
  );
};

export default ContentXS;
