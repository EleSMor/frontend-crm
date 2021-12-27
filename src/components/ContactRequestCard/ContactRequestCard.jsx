import React from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle, BsDot } from "react-icons/bs";
import moment from "moment";

const ContactRequestCard = ({ request }) => {
  return (
    <div className="RequestCard">
      <div className="RequestCard__Card">
        <div className="RequestCard__Card--content-header">
          <h3>Petición {`#${request.requestReference}`}</h3>

          <p>
            <BsPersonCircle fontSize="1.1em" color="#47535B" style={{ marginRight: 9 }} />
            <span className="RequestCard__Card--item--border">Luis</span>
          </p>

          {request.requestBuildingType.map((buildingType, index) => {
            return (
              <p key={`${index}-${request.buildingType}`}>
                <BsDot fontSize="1.1em" color="#47535B" style={{ marginRight: 9 }} />
                <span>{buildingType}</span>
              </p>
            );
          })}
        </div>
        <div className="RequestCard__Card--item RequestCard__Card--item-cta">
          <span>Creado el {moment(request.createdAt).format("L")}</span>
          <Link className="RequestCard__Card--item-cta--button" to={`/peticiones/${request._id}`}>
            Abrir Ficha
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactRequestCard;
