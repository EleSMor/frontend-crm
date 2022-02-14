import React from "react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { GiPriceTag, GiPapers } from "react-icons/gi";
import { IoIosResize } from "react-icons/io";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import moment from "moment";
import "moment/locale/es";
import "./ContactRequestCard.scss";
import useWindowSize from "../../hooks/useWindowSize";

const ContactRequestCard = ({ request }) => {
  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' €';
  };
  const size = useWindowSize();

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
            {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} m<sup>2</sup>
          </p>
        );
    }
    return render;
  };

  return (
    <div key={`${request._id}-${request.requestReference}`} className="RequestCard">
      {size < 880 ? (
        <div className="RequestCard__CardMobile">
          <div className="RequestCard__CardMobile--header">
            <div className="RequestCard__CardMobile--header-title">
              <h4>Petición {`#${request.requestReference}`}</h4>
              <p>
                <BsPersonCircle fontSize="1.4em" color="#47535B" style={{ margin: "0 8 0 0" }} />
                <span>{request.requestConsultant.fullName ? request.requestConsultant.fullName : "Sin consultor"}</span>
              </p>
            </div>
            <span>Creado el {moment(request.createdAt).format("L")}</span>
            {request.requestBuildingType.length > 0 && (
              <div className="RequestCard__CardMobile--header-zones">
                {request.requestBuildingType.map((buildingType, index) => {
                  return (
                    <p key={`${index}-${request.buildingType}`} className="">
                      <GoPrimitiveDot fontSize="1.1em" color="#47535B" style={{ marginRight: 4, fontWeight: 2000 }} />
                      {buildingType}
                    </p>
                  );
                })}
              </div>
            )}
          </div>

          <div className="RequestCard__CardMobile--body">
            <div className="RequestCard__CardMobile--body--item">
              <h4 className="RequestCard__CardMobile--body--item--title">
                <GiPriceTag fontSize="1em" style={{ marginRight: 7 }} />
                <b>Precio</b>
              </h4>
              <div className="RequestCard__CardMobile--body--item--content">
                <div>
                  <BsChevronDoubleUp fontSize="0.9em" style={{ marginRight: 9 }} />
                  {maskValues(request.requestSalePrice.salePriceMax, "price")}
                </div>
                <div>
                  <BsChevronDoubleDown fontSize="0.9em" style={{ marginRight: 9, marginLeft: 18 }} />
                  {maskValues(request.requestSalePrice.salePriceMin, "price")}
                </div>
              </div>
            </div>
            <div className="RequestCard__CardMobile--body--item">
              <h4 className="RequestCard__CardMobile--body--item--title">
                <GiPapers fontSize="1em" style={{ marginRight: 7 }} />
                <b>Superficie construida</b>
              </h4>
              <div className="RequestCard__CardMobile--body--item--content">
                <div>
                  <BsChevronDoubleUp fontSize="0.9em" style={{ marginRight: 9 }} />
                  {maskValues(request.requestBuildSurface.buildSurfaceMax, "buildSurface")}
                </div>
                <div>
                  <BsChevronDoubleDown fontSize="0.9em" style={{ marginRight: 9, marginLeft: 18 }} />
                  {maskValues(request.requestBuildSurface.buildSurfaceMin, "buildSurface")}
                </div>
              </div>
            </div>
            <div className="RequestCard__CardMobile--body--item">
              <h4 className="RequestCard__CardMobile--body--item--title">
                <IoIosResize fontSize="1em" style={{ marginRight: 7 }} />
                <b>Superficie de parcela</b>
              </h4>
              <div className="RequestCard__CardMobile--body--item--content">
                <div>
                  <BsChevronDoubleUp fontSize="0.9em" style={{ marginRight: 9 }} />
                  {maskValues(request.requestPlotSurface.plotSurfaceMax, "plotSurface")}
                </div>
                <div>
                  <BsChevronDoubleDown fontSize="0.8em" style={{ marginRight: 9, marginLeft: 18 }} />
                  {maskValues(request.requestPlotSurface.plotSurfaceMin, "plotSurface")}
                </div>
              </div>
            </div>
          </div>
          <div className="RequestCard__CardMobile--body--item--cta">
            <Link className="RequestCard__CardMobile--body--item--cta--button" to={`/peticiones/${request._id}`}>
              Consultar
            </Link>
          </div>
        </div>
      ) : (
        <div className="RequestCard__Card">
          <div className="RequestCard__Card--content">
            <div className="RequestCard__Card--content-header">
              <h4>Petición {`#${request.requestReference}`}</h4>
              <p>
                <BsPersonCircle fontSize="1.4em" color="#47535B" style={{ margin: "0 8 0 48" }} />
                <span>{request.requestConsultant ? request.requestConsultant.fullName : "Sin consultor"}</span>
              </p>

              {request.requestBuildingType.map((buildingType, index) => {
                return (
                  <p
                    key={`${index}-${request.buildingType}`}
                    className="RequestCard__Card--content-header"
                    style={{ marginLeft: 24 }}
                  >
                    <GoPrimitiveDot fontSize="1.1em" color="#47535B" style={{ marginRight: 4, fontWeight: 2000 }} />
                    {buildingType}
                  </p>
                );
              })}
            </div>

            <div className="RequestCard__Card--content-body">
              <div className="RequestCard__Card--content-body--item">
                <h4 className="RequestCard__Card--content-body--title">
                  <GiPriceTag fontSize="1.2em" style={{ marginRight: 7 }} />
                  <b>Precio</b>
                </h4>
                <div className="RequestCard__Card--content-body--content">
                  <div>
                    <BsChevronDoubleUp fontSize="0.8em" style={{ marginRight: 7 }} />
                    {maskValues(request.requestSalePrice.salePriceMax, "price")}
                  </div>
                  <div>
                    <BsChevronDoubleDown fontSize="0.8em" style={{ marginRight: 7 }} />
                    {maskValues(request.requestSalePrice.salePriceMin, "price")}
                  </div>
                </div>
              </div>
              <div className="RequestCard__Card--content-body--item">
                <h4 className="RequestCard__Card--content-body--title">
                  <GiPapers fontSize="1.2em" style={{ marginRight: 7 }} />
                  <b>Superficie construida</b>
                </h4>
                <div className="RequestCard__Card--content-body--content">
                  <div>
                    <BsChevronDoubleUp fontSize="0.8em" style={{ marginRight: 7 }} />
                    {maskValues(request.requestBuildSurface.buildSurfaceMax, "buildSurface")}
                  </div>
                  <div>
                    <BsChevronDoubleDown fontSize="0.8em" style={{ marginRight: 7 }} />
                    {maskValues(request.requestBuildSurface.buildSurfaceMin, "buildSurface")}
                  </div>
                </div>
              </div>
              <div className="RequestCard__Card--content-body--item">
                <h4 className="RequestCard__Card--content-body--title">
                  <IoIosResize fontSize="1.2em" style={{ marginRight: 7 }} />
                  <b>Superficie de parcela</b>
                </h4>
                <div className="RequestCard__Card--content-body--content">
                  <div>
                    <BsChevronDoubleUp fontSize="0.8em" style={{ marginRight: 7 }} />
                    {maskValues(request.requestPlotSurface.plotSurfaceMax, "plotSurface")}
                  </div>
                  <div>
                    <BsChevronDoubleDown fontSize="0.8em" style={{ marginRight: 7 }} />
                    {maskValues(request.requestPlotSurface.plotSurfaceMin, "plotSurface")}
                  </div>
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
      )}
    </div>
  );
};

export default ContactRequestCard;
