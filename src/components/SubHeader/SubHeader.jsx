import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { AiOutlineRight } from "react-icons/ai";
import "./SubHeader.scss";

const SubHeader = ({ title, titleBreadcrumb, underTitle, list, location, setter, filteredList }) => {
  const [searchList, setSearchList] = useState(list);
  const [filterClass, setFilterClass] = useState("todos");

  const filterByDepartment = (department) => {
    let searchText = document.getElementById("search").value;

    const filterByDeparment = list.filter((ad) => ad.department === department);

    const adsFiltered = list.filter((ad) => {
      if (department !== "todos" && ad.department === department && !searchText) {
        return ad;
      } else if (
        department === "todos" &&
        (checkIfIncludes(ad.adReference, searchText) ||
          checkIfIncludes(ad.title, searchText) ||
          checkIfIncludes(ad.adDirection, searchText) ||
          (ad.owner !== null && checkIfIncludes(ad.owner.fullName, searchText)) ||
          (ad.consultant !== null && checkIfIncludes(ad.consultant.fullName, searchText)))
      ) {
        return ad;
      } else if (
        ad.department === department &&
        (checkIfIncludes(ad.adDirection, searchText) ||
          checkIfIncludes(ad.adReference, searchText) ||
          checkIfIncludes(ad.title, searchText) ||
          (ad.owner !== null && checkIfIncludes(ad.owner.fullName, searchText)) ||
          (ad.consultant !== null && checkIfIncludes(ad.consultant.fullName, searchText)))
      ) {
        return ad;
      }
    });

    if (department === "todos") {
      setSearchList(list);
    } else {
      setSearchList(filterByDeparment);
    }
    setter(adsFiltered);
  };

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
     * 2. Por el título del anuncio
     * 3. Por el nombre completo del propietario
     * 4. Por la dirección del anuncio
     */
    if (title === "Anuncios") {
      const adsFiltered = list.filter((ad) => {
        if (
          checkIfIncludes(ad.adReference, text) ||
          checkIfIncludes(ad.title, text) ||
          checkIfIncludes(ad.adDirection, text) ||
          (ad.owner !== null && checkIfIncludes(ad.owner.fullName, text)) ||
          (ad.consultant !== null && checkIfIncludes(ad.consultant.fullName, text))
        )
          if (filterClass !== "todos") {
            if (ad.department.toLowerCase() === filterClass) return ad;
          } else {
            return ad;
          }
      });
      if (text) {
        setter(adsFiltered);
      } else if (text.trim().length !== 0 && searchList.length !== 0) {
        setter(searchList);
      } else {
        setter(adsFiltered);
      }
    } else if (title === "Peticiones") {
      /**
       * Filtro para peticiones
       * 1. Por nombre completo del contacto que crea la petición
       * 2. Por la empresa del mismo contacto
       * 3. Por el email del contacto
       */
      const requestsFiltered = list.filter((request) => {
        if (
          (request.requestContact !== null &&
            (checkIfIncludes(request?.requestContact?.fullName, text) ||
              checkIfIncludes(request?.requestContact?.company, text) ||
              checkIfIncludes(request?.requestContact?.email, text))) ||
          (request.requestConsultant !== null && checkIfIncludes(request?.requestConsultant?.fullName, text))
        )
          return request;

        if (text === "") return request;
      });
      setter(requestsFiltered);
    } else if (title === "Consultores") {
      /**
       * Filtro para consultores
       * 1. Por nombre completo del consultor
       * 2. Por el email del consultor
       */
      const consultantsFiltered = list.filter((consultant) => {
        if (checkIfIncludes(consultant.fullName, text) || checkIfIncludes(consultant.consultantEmail, text))
          return consultant;
      });
      setter(consultantsFiltered);
    } else if (title === "Contactos") {
      /**
       * Filtro para contactos
       * 1. Por nombre completo del contacto
       * 2. Por el email del contacto
       */
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
      <div className="subHeader__title noDisplay">
        <h2>{title}</h2>
        {titleBreadcrumb && (
          <p>
            <AiOutlineRight fontSize="0.9em" style={{ marginRight: 10 }} /> {titleBreadcrumb}
          </p>
        )}
      </div>

      <div className="subHeader__subtitle">
        {underTitle ? (
          <div className="subHeader__subtitle-item">
            <span>{underTitle}</span>
          </div>
        ) : (
          <>
            <div className="subHeader__subtitle-item noDisplay">
              <span>
                {list.length !== 0 ? (list.length > 50 ? list.length : list.length) : 0}
                &nbsp;elementos · Ordenado por fecha de última modificación · Se actualizó hace unos segundos
              </span>
            </div>
            {window.location.pathname.includes(`anuncios`) && !window.location.pathname.includes(`anuncios/`) && (
              <div className="subHeader__filter-box">
                <div
                  className={
                    filterClass === "patrimonio" ? "subHeader__filter-box--item__active" : "subHeader__filter-box--item"
                  }
                  onClick={() => {
                    setFilterClass("patrimonio");
                    filterByDepartment("Patrimonio");
                  }}
                >
                  <p>Patrimonio</p>
                </div>
                <div
                  className={
                    filterClass === "residencial"
                      ? "subHeader__filter-box--item subHeader__filter-box--item__border__active"
                      : "subHeader__filter-box--item subHeader__filter-box--item__border"
                  }
                  onClick={() => {
                    setFilterClass("residencial");
                    filterByDepartment("Residencial");
                  }}
                >
                  <p>Residencial</p>
                </div>
                <div
                  className={
                    filterClass === "todos" ? "subHeader__filter-box--item__active" : "subHeader__filter-box--item"
                  }
                  onClick={() => {
                    setFilterClass("todos");
                    filterByDepartment("todos");
                  }}
                >
                  <p>Todos</p>
                </div>
              </div>
            )}
            <div className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                id="search"
                onChange={(ev) => {
                  customFilter(ev.target.value);
                }}
                placeholder="Buscar en esta lista"
              />
            </div>
          </>
        )}
        {!window.location.pathname.includes(`${title.toLowerCase()}/`) && (
          <button tpye="button" className="subHeader__btn" onClick={location}>
            Nuevo
          </button>
        )}
      </div>
    </div>
  );
};

export default SubHeader;
