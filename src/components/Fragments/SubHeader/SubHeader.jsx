import React from "react";
import { useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
// import { classNames } from "primereact/utils";
import "./SubHeader.scss";

const SubHeader = ({ title, list, location, setter }) => {
  const history = useHistory();

  const filterAds = (filter) => {
    const adsFiltered = list.filter((ad) => {
      if (
        ad.adReference.toLowerCase().includes(filter.toLowerCase()) ||
        ad.owner.fullName.toLowerCase().includes(filter.toLowerCase()) ||
        ad.adDirection.toLowerCase().includes(filter.toLowerCase())
      )
        return ad;
    });
    setter(adsFiltered);
  };

  return (
    <div className="subHeader">
      <div className="subHeader__title">
        <h2>{title}</h2>
      </div>
      <div className="subHeader__subtitle">
        <div className="subHeader__subtitle-details">
          <span>{list && (list.length > 50 ? list.length : list.length)} elementos</span>{" "}
          <span>· Ordenado por fecha de última modificación ·</span> <span>Se actualizó hace unos segundos</span>
        </div>
        <button className="subHeader__btn" onClick={() => history.push(location)}>
          Nuevo
        </button>
        <div className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText onChange={(ev) => filterAds(ev.target.value)} placeholder="Keyword Search" />
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
