import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import "./AdsTable.scss";

const AdsTable = ({ ads }) => {

  return (
    <div>
      <table className="tbl">
        <colgroup span="2">
          <col />
        </colgroup>
        <thead>
          <tr>
            <th className="tbl__creationDate">Fecha de creación</th>
            <th className="tbl__reference">Referencia</th>
            <th className="tbl__direction">Dirección</th>
            <th className="tbl__title">Título</th>
            <th className="tbl__status">Estado anuncio</th>
            <th className="tbl__closeOperation">Cierre operación GV</th>
            <tr>
              <th className="tbl__price" colSpan="2" scope="colgroup">
                Precio
              </th>
            </tr>
            <tr>
              <th className="tbl__price-row" scope="col">
                Venta
              </th>
              <th className="tbl__price-row" scope="col">
                Alquiler
              </th>
            </tr>
            <th className="tbl__buildSurface">Superficie</th>
            <th className="tbl__buildingType">Tipo de inmueble</th>
            <th className="tbl__adType">Tipo de anuncio</th>
            <th className="tbl__contact">Propietario</th>
            <th className="tbl__consultant">Consultor</th>
          </tr>
        </thead>
        <tbody>
          {ads &&
            ads.map((ad, index) => {
              return (
                <tr key={`${ad._id}-${index}`}>
                  <td className="tbl__creationDate">{moment(ad.createdAt).format("L")}</td>
                  <td className="tbl__reference">
                    <NavLink to={`/ads/matching/${ad._id}`}>{ad.adReference}</NavLink>
                  </td>
                  <td className="tbl__direction">{`${ad.adDirection.address.street} ${ad.adDirection.address.directionNumber} ${ad.adDirection.address.directionFloor} ${ad.adDirection.postalCode} ${ad.adDirection.city} ${ad.adDirection.country}`}</td>
                  <td className="tbl__title">{ad.title}</td>
                  <td className="tbl__status">{ad.adStatus}</td>
                  <td className="tbl__closeOperation">{ad.gvOperationClose}</td>
                  <td className="tbl__price-row">{ad.price.sale.saleValue} €</td>
                  <td className="tbl__price-row">{ad.price.rent.rentValue} €</td>
                  <td className="tbl__buildSurface">{ad.buildSurface} m2</td>
                  <td className="tbl__buildingType">{ad.adBuildingType}</td>
                  <td className="tbl__adType">{ad.adType}</td>
                  <td className="tbl__contact">{ad.owner.fullName}</td>
                  <td className="tbl__consultant">{ad.consultant.fullName}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AdsTable;
