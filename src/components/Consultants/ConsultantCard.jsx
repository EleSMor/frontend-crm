import React from "react";
import { NavLink } from "react-router-dom";
import "./ConsultantCard.scss";

const ConsultantCard = ({ consultants }) => {

  return (
    <div className="card">
      {consultants &&
        consultants.map((consultant, index) => {
          return (
            <div className="card__box" key={`${consultant._id}-${index}`}>
              <div>
                <img className="card__box-avatar" src={`${consultant.avatar}`} alt={consultant.fullName} />
              </div>
              <div className="card__box-info">
                <div>
                  <a href={`/consultants/${consultant._id}`}>{consultant.fullName}</a>
                  <a href={`/consultants/${consultant._id}`}>{consultant.position}</a>
                </div>
                <div>
                  <p>{consultant.email}</p>
                </div>
                <div>
                  <span>{consultant.consultantMobileNumber}</span>
                  <span>|</span>
                  <span>{consultant.consultantPhoneNumber}</span>
                </div>
              </div>
              <div className="card__box-offices">
                <p>Oficinas</p>
                <p>{consultant.office1}</p>
                <p>{consultant.office2}</p>
              </div>
              <div>
                <div>Creado el {consultant.consultantCreationDate}</div>
                <div>
                  <NavLink to={`/consultants/${consultant._id}`}>
                    <button>Abrir Ficha</button>
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ConsultantCard;
