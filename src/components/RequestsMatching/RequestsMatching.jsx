import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const RequestsMatching = ({ ads }) => {
  const formatCurrency = (value) => {
    return value.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
  };

  const buildSurfaceBodyTemplate = (rowData) => {
    return (
      rowData.buildSurface && (
        <p>
          {rowData.buildSurface.toLocaleString("es-ES")} m<sup>2</sup>
        </p>
      )
    );
  };

  const plotSurfaceBodyTemplate = (rowData) => {
    return (
      rowData.plotSurface && (
        <p>
          {rowData.plotSurface.toLocaleString("es-ES")} m<sup>2</sup>
        </p>
      )
    );
  };

  const saleBodyTemplate = (rowData) => {
    return rowData.price.sale.saleValue ? formatCurrency(rowData.price.sale.saleValue) : rowData.price.sale.saleValue;
  };

  const rentBodyTemplate = (rowData) => {
    return rowData.price.rent.rentValue ? formatCurrency(rowData.price.rent.rentValue) : rowData.price.rent.rentValue;
  };

  return (
    <DataTable
      value={ads.length !== 0 ? ads : ""}
      paginator
      rows={10}
      removableSort
      responsiveLayout="scroll"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      rowsPerPageOptions={[10, 25, 50]}
      dataKey="id"
    >
      <Column field="title" header="Título" sortable></Column>
      <Column field="adType" header="Anuncio" sortable></Column>
      <Column field="price.sale.saleValue" header="Precio" body={saleBodyTemplate} sortable></Column>
      <Column field="price.rent.rentValue" header="Alquiler" body={rentBodyTemplate} sortable></Column>
      <Column field="buildSurface" header="m2 construidos" body={buildSurfaceBodyTemplate} sortable></Column>
      <Column field="plotSurface" header="m2 parcela" body={plotSurfaceBodyTemplate} sortable></Column>
      <Column field="adBuildingType" header="Inmueble" sortable></Column>
    </DataTable>
  );
};

export default RequestsMatching;
