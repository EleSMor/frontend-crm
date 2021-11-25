import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getRequestById } from "../../api/requests.api";

const RequestsTable = ({ requests }) => {
  console.log(requests);

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
            <th>Superficie construida</th>
            <th>Superficie parcela</th>
          </tr>
          <tr>
            <th>Fecha de creación</th>
            <th>Referencia</th>
            <th>Contacto</th>
            <th>Empresa</th>
            <th>Tipo de inmueble</th>
            <th>Tipo de anuncio</th>
            <th>Máximo</th>
            <th>Mínimo</th>
            <th>Máximo</th>
            <th>Mínimo</th>
            <th>Máximo</th>
            <th>Mínimo</th>
            <th>Consultor</th>
          </tr>
          {requests &&
            requests.map((request, index) => {
              return (
                <tr key={`${request._id}-${index}`}>
                  <td>{request.creationDate}</td>
                  <td>
                    <NavLink to={`/requests/${request.requestReference}`}>{request.requestReference}</NavLink>
                  </td>
                  <td>{request.requestContact.fullName}</td>
                  <td>{request.requestContact.company}</td>
                  <td>{request.requestBuildingType}</td>
                  <td>{request.requestAdType}</td>
                  <td>{request.requestSalePrice.salePriceMax}</td>
                  <td>{request.requestSalePrice.salePriceMin}</td>
                  <td>{request.requestBuildSurface.buildSurfaceMax}</td>
                  <td>{request.requestBuildSurface.buildSurfaceMin}</td>
                  <td>{request.requestPlotSurface.plotSurfaceMax}</td>
                  <td>{request.requestPlotSurface.plotSurfaceMin}</td>
                  <td>{request.requestConsultant.fullName}</td>
                </tr>
              );
            })}
        </thead>
      </table>
    </div>
  );
};

export default RequestsTable;
