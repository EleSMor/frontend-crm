import React from "react";
import { useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { AiOutlineRight } from "react-icons/ai";
import "./SubHeader.scss";

const SubHeader = ({ title, titleBreadcrumb, underTitle, list, location, setter }) => {
  const history = useHistory();

  const checkIfIncludes = (origin, text) => {
    return origin
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes(
        text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      );
  };

  const customFilter = (text) => {
    /**
     * Filtro para anuncios
     * 1. Por la referencia del anuncio
     * 2. Por el nombre completo del propietario
     * 3. Por la dirección del anuncio
     */
    if (title === "Anuncios") {
      const adsFiltered = list.filter((ad) => {
        if (
          checkIfIncludes(ad.adReference, text) ||
          checkIfIncludes(ad.owner.fullName, text) ||
          checkIfIncludes(ad.adDirection, text)
        )
          return ad;
      });
      setter(adsFiltered);
    }

    /**
     * Filtro para peticiones
     * 1. Por nombre completo del contacto que crea la petición
     * 2. Por la empresa del mismo contacto
     * 3. Por el email del contacto
     */
    if (title === "Peticiones") {
      const requestsFiltered = list.filter((request) => {
        if (
          checkIfIncludes(request.requestContact.fullName, text) ||
          checkIfIncludes(request.requestContact.company, text) ||
          checkIfIncludes(request.requestContact.email, text)
        )
          return request;
      });
      setter(requestsFiltered);
    }

    /**
     * Filtro para consultores
     * 1. Por nombre completo del consultor
     * 2. Por el email del consultor
     */
    if (title === "Consultores") {
      const consultantsFiltered = list.filter((consultant) => {
        if (checkIfIncludes(consultant.fullName, text) || checkIfIncludes(consultant.consultantEmail, text))
          return consultant;
      });
      setter(consultantsFiltered);
    }

    /**
     * Filtro para contactos
     * 1. Por nombre completo del contacto
     * 2. Por el email del contacto
     */
    if (title === "Contactos") {
      const contactFiltered = list.filter((contact) => {
        if (
          checkIfIncludes(contact.fullName, text) ||
          checkIfIncludes(contact.email, text) ||
          checkIfIncludes(contact.company, text) ||
          checkIfIncludes(contact.contactMobileNumber, text)
        )
          return contact;
      });
      setter(contactFiltered);
    }
  };

  return (
    <div className="subHeader">
      <div className="subHeader__title">
        <h2>{title}</h2>
        {titleBreadcrumb && (
          <p>
            <AiOutlineRight fontSize="0.9em" style={{ marginRight: 10 }} /> {titleBreadcrumb}
          </p>
        )}
      </div>

      <div className="subHeader__subtitle">
        <div className="subHeader__subtitle-item">
          {underTitle && <span>{underTitle}</span>}
          {list && (
            <span>
              {list.length > 50 ? list.length : list.length}
              elementos · Ordenado por fecha de última modificación · Se actualizó hace unos segundos
            </span>
          )}
        </div>

        <div className="subHeader__subtitle-item">
          <i className="pi pi-search" />
          <InputText onChange={(ev) => customFilter(ev.target.value)} placeholder="Buscar en esta lista" />

          {!window.location.pathname.includes(`${title.toLowerCase()}/`) && (
            <button className="subHeader__btn" onClick={() => history.push(location)}>
              Nuevo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
