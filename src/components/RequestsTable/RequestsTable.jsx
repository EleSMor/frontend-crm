import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { NavLink } from "react-router-dom";
import * as moment from "moment";
import "moment/locale/es";
import "./RequestTable.scss";

const RequestsTable = ({ requests }) => {
  const [requestsFormated, setRequestsFormated] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (requests.length !== 0) {
      const newRequests = requests.map((request) => {
        if (request.requestBuildingType && loader) request.requestBuildingType = request.requestBuildingType.join(" ");
        if (request.requestAdType && loader) request.requestAdType = request.requestAdType.join(" ");
        return request;
      });
      setRequestsFormated(newRequests);
      setLoader(false);
    }
  }, [requests]);

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Fecha de creación" rowSpan={2} sortable field="createdAt" />
        <Column header="Referencia" rowSpan={2} />
        <Column header="Contacto" rowSpan={2} />
        <Column header="Empresa" rowSpan={2} />
        <Column header="Tipo de inmueble" rowSpan={2} />
        <Column header="Tipo de anuncio" rowSpan={2} />
        <Column header="Precio" colSpan={2} />
        <Column header="Superficie construida" colSpan={2} />
        <Column header="Superficie parcela" colSpan={2} />
        <Column header="Consultor" rowSpan={2} />
      </Row>
      <Row>
        <Column header="Máximo" colSpan={1} sortable field="price.sale.saleValue" />
        <Column header="Mínimo" colSpan={1} sortable field="price.rent.rentValue" />
        <Column header="Máxima" colSpan={1} sortable field="price.sale.saleValue" />
        <Column header="Mínima" colSpan={1} sortable field="price.rent.rentValue" />
        <Column header="Máxima" colSpan={1} sortable field="price.sale.saleValue" />
        <Column header="Mínima" colSpan={1} sortable field="price.rent.rentValue" />
      </Row>
    </ColumnGroup>
  );

  const formatCurrency = (value) => {
    return value.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
  };

  const buildSurfaceMaxBodyTemplate = (rowData) => {
    if (rowData.requestBuildSurface.buildSurfaceMax !== 0 && rowData.requestBuildSurface.buildSurfaceMax !== 9999) {
      return (
        <p>
          {rowData.requestBuildSurface.buildSurfaceMax.toLocaleString("es-ES")} m<sup>2</sup>
        </p>
      );
    }
  };

  const buildSurfaceMinBodyTemplate = (rowData) => {
    if (rowData.requestBuildSurface.buildSurfaceMin !== 0) {
      return (
        <p>
          {rowData.requestBuildSurface.buildSurfaceMin.toLocaleString("es-ES")} m<sup>2</sup>
        </p>
      );
    }
  };

  const plotSurfaceMaxBodyTemplate = (rowData) => {
    if (rowData.requestPlotSurface.plotSurfaceMax !== 0 && rowData.requestPlotSurface.plotSurfaceMax !== 99999) {
      return (
        <p>
          {rowData.requestPlotSurface.plotSurfaceMax.toLocaleString("es-ES")} m<sup>2</sup>
        </p>
      );
    }
  };

  const plotSurfaceMinBodyTemplate = (rowData) => {
    if (rowData.requestPlotSurface.plotSurfaceMin !== 0) {
      return (
        <p>
          {rowData.requestPlotSurface.plotSurfaceMin.toLocaleString("es-ES")} m<sup>2</sup>
        </p>
      );
    }
  };

  const referenceBodyTemplate = (rowData) => {
    return <NavLink to={`/peticiones/${rowData._id}`}>{rowData.requestReference}</NavLink>;
  };

  const priceMaxBodyTemplate = (rowData) => {
    if (rowData.requestSalePrice.salePriceMax !== 0 && rowData.requestSalePrice.salePriceMax !== 99999999) {
      return formatCurrency(rowData.requestSalePrice.salePriceMax);
    }
  };

  const priceMinBodyTemplate = (rowData) => {
    if (rowData.requestSalePrice.salePriceMin !== 0) {
      return formatCurrency(rowData.requestSalePrice.salePriceMin);
    }
  };

  return (
    <DataTable
      dataKey="id"
      value={requests.length !== 0 ? requestsFormated : []}
      headerColumnGroup={headerGroup}
      removableSort
      sortField="createdAt"
      sortOrder={-1}
      resizableColumns
      responsiveLayout="scroll"
    >
      <Column
        field="createdAt"
        body={(rowData) => {
          return moment(rowData.createdAt).locale("es").format("L");
        }}
      ></Column>
      <Column field="requestReference" body={referenceBodyTemplate}></Column>
      <Column field="requestContact.fullName"></Column>
      <Column field="requestContact.company"></Column>
      <Column field="requestBuildingType"></Column>
      <Column field="requestAdType"></Column>
      <Column field="requestSalePrice.salePriceMin" body={priceMaxBodyTemplate}></Column>
      <Column field="requestSalePrice.salePriceMin" body={priceMinBodyTemplate}></Column>
      <Column field="requestBuildSurface.buildSurfaceMax" body={buildSurfaceMaxBodyTemplate}></Column>
      <Column field="requestBuildSurface.buildSurfaceMin" body={buildSurfaceMinBodyTemplate}></Column>
      <Column field="requestPlotSurface.plotSurfaceMax" body={plotSurfaceMaxBodyTemplate}></Column>
      <Column field="requestPlotSurface.plotSurfaceMin" body={plotSurfaceMinBodyTemplate}></Column>
      <Column field="requestConsultant.fullName"></Column>
    </DataTable>
  );
};

export default RequestsTable;
