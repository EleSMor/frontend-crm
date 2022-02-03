import React, { useState, useEffect } from "react";
import { FilterService } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { MultiSelect } from "primereact/multiselect";
import { NavLink } from "react-router-dom";
import { BsCloudArrowUp } from "react-icons/bs";
import * as moment from "moment";
import "moment/locale/es";
import "./RequestTable.scss";

const RequestsTable = ({ requests }) => {
  const [requestsFormated, setRequestsFormated] = useState([]);
  const [loader, setLoader] = useState(true);
  const [filters, setFilters] = useState({
    requestAdType: { value: null, matchMode: "INCLUDES" },
    requestBuildingType: { value: null, matchMode: "INCLUDES" },
  });

  const adTypeOptions = [{ name: "Alquiler" }, { name: "Venta" }];
  const buildingTypeOptions = [
    { name: "Casa" },
    { name: "Piso" },
    { name: "Parcela" },
    { name: "Ático" },
    { name: "Oficina" },
    { name: "Edificio" },
    { name: "Local" },
    { name: "Campo Rústico" },
    { name: "Activos Singulares" },
    { name: "Costa" },
  ];

  FilterService.register("INCLUDES", (value, filter) => {
    if (filter === undefined || filter === null) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }
    let newFilter = filter.map((e) => e.name);
    if (newFilter.length === 0) return true;
    else {
      for (let elem of newFilter) {
        if (value.includes(elem)) return true;
      }
    }
  });

  useEffect(() => {
    if (requests.length !== 0) {
      const newRequests = requests.map((request) => {
        if (request.requestBuildingType && loader)
          request.requestBuildingType = request.requestBuildingType.sort().join(", ");
        if (request.requestAdType && loader) request.requestAdType = request.requestAdType.sort().join(", ");
        return request;
      });
      setRequestsFormated(newRequests);
      setLoader(false);
    }
  }, [requests]);

  const adTypeFilterTemplate = (options) => {
    return (
      <React.Fragment>
        <MultiSelect
          value={options.value}
          options={adTypeOptions}
          itemTemplate={itemsTemplate}
          onChange={(e) => options.filterApplyCallback(e.value)}
          optionLabel="name"
          placeholder="Todos"
          className="p-column-filter"
        />
      </React.Fragment>
    );
  };

  const buildingTypeFilterTemplate = (options) => {
    return (
      <React.Fragment>
        <MultiSelect
          value={options.value}
          options={buildingTypeOptions}
          itemTemplate={itemsTemplate}
          onChange={(e) => options.filterApplyCallback(e.value)}
          optionLabel="name"
          placeholder="Todos"
          className="p-column-filter"
        />
      </React.Fragment>
    );
  };

  const itemsTemplate = (option) => {
    return (
      <div className="p-multiselect-representative-option">
        <span className="image-text">{option.name}</span>
      </div>
    );
  };

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Fecha de modificación" rowSpan={2} sortable field="updatedAt" style={{ width: "0%" }} />
        <Column header="Referencia" rowSpan={2} style={{ width: "0%" }} />
        <Column header="Contacto" rowSpan={2} style={{ width: "0.5%" }} />
        <Column header="Empresa" rowSpan={2} style={{ width: "0.25%" }} />
        <Column
          header="Tipo de inmueble"
          rowSpan={2}
          filter
          filterField="requestBuildingType"
          filterElement={buildingTypeFilterTemplate}
          showFilterMatchModes={false}
          showApplyButton={false}
          showClearButton={false}
          style={{ width: "0.15%" }}
        />
        <Column
          header="Tipo de anuncio"
          rowSpan={2}
          filter
          filterElement={adTypeFilterTemplate}
          filterField="requestAdType"
          showFilterMatchModes={false}
          filterMatchMode="custom"
          showApplyButton={false}
          showClearButton={false}
          style={{ width: "0.15%" }}
        />
        <Column header="Precio" colSpan={2} />
        <Column header="Superficie construida" colSpan={2} />
        <Column header="Superficie parcela" colSpan={2} />
        <Column header="Consultor" rowSpan={2} style={{ width: "0%" }} />
      </Row>
      <Row>
        <Column header="Máximo" colSpan={1} sortable field="requestSalePrice.salePriceMax" style={{ width: "0.25%" }} />
        <Column header="Mínimo" colSpan={1} sortable field="requestSalePrice.salePriceMin" style={{ width: "0.25%" }} />
        <Column
          header="Máxima"
          colSpan={1}
          sortable
          field="requestBuildSurface.buildSurfaceMax"
          style={{ width: "0.15%" }}
        />
        <Column
          header="Mínima"
          colSpan={1}
          sortable
          field="requestBuildSurface.buildSurfaceMin"
          style={{ width: "0.15%" }}
        />
        <Column
          header="Máxima"
          colSpan={1}
          sortable
          field="requestPlotSurface.plotSurfaceMax"
          style={{ width: "0%" }}
        />
        <Column
          header="Mínima"
          colSpan={1}
          sortable
          field="requestPlotSurface.plotSurfaceMin"
          style={{ width: "0%" }}
        />
      </Row>
    </ColumnGroup>
  );

  const formatCurrency = (value) => {
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
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
    <>
      {!loader ? (
        <DataTable
          dataKey="id"
          value={requests.length !== 0 ? requestsFormated : []}
          headerColumnGroup={headerGroup}
          removableSort
          sortField="updatedAt"
          sortOrder={-1}
          filterDisplay="menu"
          resizableColumns
          columnResizeMode="fit"
          showGridlines
          filters={filters}
          responsiveLayout="scroll"
          globalFilterFields={["requestAdType", "requestBuildingType"]}
          emptyMessage="No se ha encontrado ninguna petición"
        >
          <Column
            field="updatedAt"
            body={(rowData) => {
              return moment(rowData.updatedAt).locale("es").format("L");
            }}
          ></Column>
          <Column field="requestReference" body={referenceBodyTemplate}></Column>
          <Column field="requestContact.fullName"></Column>
          <Column field="requestContact.company"></Column>
          <Column field="requestBuildingType"></Column>
          <Column field="requestAdType"></Column>
          <Column field="requestSalePrice.salePriceMax" body={priceMaxBodyTemplate}></Column>
          <Column field="requestSalePrice.salePriceMin" body={priceMinBodyTemplate}></Column>
          <Column field="requestBuildSurface.buildSurfaceMax" body={buildSurfaceMaxBodyTemplate}></Column>
          <Column field="requestBuildSurface.buildSurfaceMin" body={buildSurfaceMinBodyTemplate}></Column>
          <Column field="requestPlotSurface.plotSurfaceMax" body={plotSurfaceMaxBodyTemplate}></Column>
          <Column field="requestPlotSurface.plotSurfaceMin" body={plotSurfaceMinBodyTemplate}></Column>
          <Column field="requestConsultant.fullName"></Column>
        </DataTable>
      ) : (
        <div style={{ height: 200 }}>
          <p style={{ lineHeight: 4 }}>No ha creado ninguna petición </p>
          <BsCloudArrowUp fontSize="2.5em" />
        </div>
      )}
    </>
  );
};

export default RequestsTable;
