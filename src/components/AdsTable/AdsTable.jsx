import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

const AdsTable = ({ ads }) => {
  console.log(ads);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Precio</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th>Fecha de creación</th>
            <th>Referencia</th>
            <th>Dirección</th>
            <th>Título</th>
            <th>Estado anuncio</th>
            <th>Cierre operación GV</th>
            <th>Venta</th>
            <th>Alquiler</th>
            <th>Superficie</th>
            <th>Tipo de inmueble</th>
            <th>Tipo de anuncio</th>
            <th>Propietario</th>
            <th>Consultor</th>
          </tr>
        </thead>
        <tbody>
          {ads &&
            ads.map((ad, index) => {
              return (
                <tr key={`${ad._id}-${index}`}>
                  <td>{moment(ad.createdAt).format("L")}</td>
                  <td>
                    <NavLink to={`/ads/${ad.adReference}`}>{ad.adReference}</NavLink>
                  </td>
                  <td>{`${ad.adDirection.address.street} ${ad.adDirection.address.directionNumber} ${ad.adDirection.address.directionFloor} ${ad.adDirection.postalCode} ${ad.adDirection.city} ${ad.adDirection.country}`}</td>
                  <td>{ad.title}</td>
                  <td>{ad.adStatus}</td>
                  <td>{ad.gvOperationClose}</td>
                  <td>{ad.price.sale.saleValue}</td>
                  <td>{ad.price.rent.rentValue}</td>
                  <td>{ad.buildSurface}</td>
                  <td>{ad.adBuildingType}</td>
                  <td>{ad.adType}</td>
                  <td>{ad.owner.fullName}</td>
                  <td>{ad.consultant.fullName}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AdsTable;
