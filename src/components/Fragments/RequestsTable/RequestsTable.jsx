import React from "react";
import { useHistory, NavLink } from "react-router-dom";
import "./RequestTable.scss";

const RequestsTable = ({ requests }) => {
  const history = useHistory();

  return (
    <table className="tbl">
      <colgroup span="6"></colgroup>
      <colgroup span="2"></colgroup>
      <colgroup span="1"></colgroup>
      <tr>
        <tr>
          <th className="tbl__creationDate" colspan="1" scope="colgroup">
            Fecha de creación
          </th>
          <th className="tbl__reference">Referencia</th>
          <th className="tbl__contact">Contacto</th>
          <th className="tbl__company">Empresa</th>
          <th className="tbl__buildingType">Tipo de inmueble</th>
          <th className="tbl__adType">Tipo de anuncio</th>
          <tr>
            <th className="tbl__price" colspan="2" scope="colgroup">
              Precio
            </th>
            <th className="tbl__buildSurface" colspan="2" scope="colgroup">
              Superficie construida
            </th>
            <th className="tbl__plotSurface" colspan="2" scope="colgroup">
              Superficie parcela
            </th>
          </tr>
          <tr>
            <th className="tbl__price-row" scope="col">
              Máximo
            </th>
            <th className="tbl__price-row" scope="col">
              Mínimo
            </th>
            <th className="tbl__buildSurface-row" scope="col">
              Máxima
            </th>
            <th className="tbl__buildSurface-row" scope="col">
              Mínima
            </th>
            <th className="tbl__plotSurface-row" scope="col">
              Máxima
            </th>
            <th className="tbl__plotSurface-row" scope="col">
              Mínima
            </th>
          </tr>
          <th className="tbl__consultant">Consultor</th>
        </tr>
      </tr>
      {requests &&
        requests.map((request, index) => {
          return (
            <tr key={`${request._id}-${index}`}>
              <td className="tbl__creationDate">{request.creationDate}</td>
              <td className="tbl__reference" id={request._id}>
                <NavLink to={`/requests/matching/${request._id}`}>{request.requestReference}</NavLink>
              </td>
              <td className="tbl__contact">{request.requestContact.fullName}</td>
              <td className="tbl__company">{request.requestContact.company}</td>
              <td className="tbl__buildingType">{request.requestBuildingType}</td>
              <td className="tbl__adType">{request.requestAdType}</td>
              <td className="tbl__price-row">{request.requestSalePrice.salePriceMax} €</td>
              <td className="tbl__price-row">{request.requestSalePrice.salePriceMin} €</td>
              <td className="tbl__buildSurface-row">{request.requestBuildSurface.buildSurfaceMax} m2</td>
              <td className="tbl__buildSurface-row">{request.requestBuildSurface.buildSurfaceMin} m2</td>
              <td className="tbl__plotSurface-row">{request.requestPlotSurface.plotSurfaceMax} m2</td>
              <td className="tbl__plotSurface-row">{request.requestPlotSurface.plotSurfaceMin} m2</td>
              <td className="tbl__consultant">{request.requestConsultant.fullName}</td>
            </tr>
          );
        })}
    </table>
  );
};

export default RequestsTable;
