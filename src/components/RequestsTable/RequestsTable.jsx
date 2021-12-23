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
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (requests.length !== 0) {
      const newRequests = requests.map((request) => {
        if (request.requestBuildingType && !loader) request.requestBuildingType = request.requestBuildingType.join(" ");
        if (request.requestAdType && !loader) request.requestAdType = request.requestAdType.join(" ");
        if (!loader) request.createdAt = moment(request.createdAt).locale("es").format("L");
        return request;
      });
      setRequestsFormated(newRequests);
      setLoader(true);
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
    return (
      rowData.requestBuildSurface.buildSurfaceMax && (
        <p>
          {rowData.requestBuildSurface.buildSurfaceMax.toLocaleString("es-ES")} m<sup>2</sup>
        </p>
      )
    );
  };

  const buildSurfaceMinBodyTemplate = (rowData) => {
    return (
      rowData.requestBuildSurface.buildSurfaceMin && (
        <p>
          {rowData.requestBuildSurface.buildSurfaceMin.toLocaleString("es-ES")} m<sup>2</sup>
        </p>
      )
    );
  };

  const plotSurfaceMaxBodyTemplate = (rowData) => {
    return (
      rowData.requestPlotSurface.plotSurfaceMax && (
        <p>
          {rowData.requestPlotSurface.plotSurfaceMax.toLocaleString("es-ES")} m<sup>2</sup>
        </p>
      )
    );
  };

  const plotSurfaceMinBodyTemplate = (rowData) => {
    return (
      rowData.requestPlotSurface.plotSurfaceMin && (
        <p>
          {rowData.requestPlotSurface.plotSurfaceMin.toLocaleString("es-ES")} m<sup>2</sup>
        </p>
      )
    );
  };

  const referenceBodyTemplate = (rowData) => {
    return <NavLink to={`/peticiones/${rowData._id}`}>{rowData.requestReference}</NavLink>;
  };

  const priceMaxBodyTemplate = (rowData) => {
    return rowData.requestSalePrice.salePriceMax
      ? formatCurrency(rowData.requestSalePrice.salePriceMax)
      : rowData.requestSalePrice.salePriceMax;
  };

  const priceMinBodyTemplate = (rowData) => {
    return rowData.requestSalePrice.salePriceMin
      ? formatCurrency(rowData.requestSalePrice.salePriceMin)
      : rowData.requestSalePrice.salePriceMin;
  };

  return (
    <DataTable
      dataKey="id"
      value={requests.length !== 0 ? requestsFormated : []}
      headerColumnGroup={headerGroup}
      paginator
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      rowsPerPageOptions={[100, 250, 500]}
      rows={100}
      removableSort
      sortField="createdAt"
      sortOrder={-1}
      resizableColumns
      responsiveLayout="scroll"
      currentPageReportTemplate="Mostrando de {first} a {last} registros de {totalRecords}"
    >
      <Column field="createdAt"></Column>
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
