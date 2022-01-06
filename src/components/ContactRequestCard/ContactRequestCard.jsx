import React from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { GiPriceTag, GiPapers } from "react-icons/gi";
import moment from "moment";
import "moment/locale/es";
import "./ContactRequestCard.scss";

const ContactRequestCard = ({ request }) => {
  const formatCurrency = (value) => {
    return value.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
  };

  const maskValues = (value, ref) => {
    let render = "";

    if (
      (ref === "price" && value === 99999999) ||
      (ref === "buildSurface" && value === 9999) ||
      (ref === "plotSurface" && value === 99999)
    ) {
      render = <p>Valor máx.</p>;
    } else if (value === 0) {
      render = <p>Valor mín.</p>;
    } else {
      if (ref === "price") render = <p>{formatCurrency(value)}</p>;
      else
        render = (
          <p>
            {value.toLocaleString("es-ES")} m<sup>2</sup>
          </p>
        );
    }
    return render;
  };

  return (
    <div key={`${request._id}-${request.requestReference}`} className="RequestCard">
      <div className="RequestCard__Card">
        <div className="RequestCard__Card--content">
          <div className="RequestCard__Card--content-header">
            <h3>Petición {`#${request.requestReference}`}</h3>
            <p>
              <BsPersonCircle fontSize="1.4em" color="#47535B" style={{ margin: "0 8 0 48", verticalAlign: "middle"  }} />
              <span className="RequestCard__Card--item--border">
                {request.requestConsultant.fullName ? request.requestConsultant.fullName : "Sin consultor"}
              </span>
            </p>

            {request.requestBuildingType.map((buildingType, index) => {
              return (
                <p key={`${index}-${request.buildingType}`} className="RequestCard__Card--content-header" style={{ marginLeft: 24 }}>
                  <GoPrimitiveDot fontSize="1.1em" color="#47535B" style={{ marginRight: 4, fontWeight: 2000 }} />
                  <span>{buildingType}</span>
                </p>
              );
            })}
          </div>
          <div className="RequestCard__Card--content-body">
            <div className="RequestCard__Card--content-body--item">
              <h4 className="RequestCard__Card--content-body--title">
                <GiPriceTag />
                Precio
              </h4>
              <div>
                {maskValues(request.requestSalePrice.salePriceMax, "price")}
                {maskValues(request.requestSalePrice.salePriceMin, "price")}
              </div>
            </div>
            <div className="RequestCard__Card--content-body--item">
              <h4 className="RequestCard__Card--content-body--title">
              <GiPapers />
                Superficie construida
              </h4>
              <div>
                {maskValues(request.requestBuildSurface.buildSurfaceMax, "buildSurface")}
                {maskValues(request.requestBuildSurface.buildSurfaceMin, "buildSurface")}
              </div>
            </div>
            <div className="RequestCard__Card--content-body--item">
              <h4 className="RequestCard__Card--content-body--title">Superficie de parcela</h4>
              <div>
                {maskValues(request.requestPlotSurface.plotSurfaceMax, "plotSurface")}
                {maskValues(request.requestPlotSurface.plotSurfaceMin, "plotSurface")}
              </div>
            </div>
          </div>
        </div>
        <div className="RequestCard__Card--item RequestCard__Card--item-cta">
          <span>Creado el {moment(request.createdAt).format("L")}</span>
          <Link className="RequestCard__Card--item-cta--button" to={`/peticiones/${request._id}`}>
            Consultar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactRequestCard;
