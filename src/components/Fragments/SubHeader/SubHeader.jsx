import React from "react";
import { useHistory } from "react-router-dom";
import { Search } from "../../../icons";
import "./SubHeader.scss";

const SubHeader = ({ title, list, location }) => {
  const history = useHistory();
  
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
        <div className="subHeader__searcher">
          <Search className="subHeader__searcher-lens" />
          <input className="subHeader__searcher-text" type="text" placeholder="Buscar en esta lista" />
        </div>
        <button className="subHeader__btn" onClick={() => history.push(location)}>
          Nuevo
        </button>
      </div>
    </div>
  );
};

export default SubHeader;
