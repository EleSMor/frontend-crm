import React, { useEffect, useState } from "react";
import { FilterService } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { MultiSelect } from "primereact/multiselect";
import { Link } from "react-router-dom";
import { BsCloudArrowUp } from "react-icons/bs";
import * as moment from "moment";
import "moment/locale/es";
import "./AdsTable.scss";
import "./DataTableDemo.scss";
import "./AdsTable.scss";

const AdsTable = ({ ads }) => {
  const [adsFormated, setAdsFormated] = useState([]);
  const [loader, setLoader] = useState(true);
  const [filters, setFilters] = useState({
    adType: { value: null, matchMode: "INCLUDES" },
    adBuildingType: { value: null, matchMode: "INCLUDES" },
    gvOperationClose: { value: null, matchMode: "INCLUDES" },
    adStatus: { value: null, matchMode: "INCLUDES" },
  });

  const adStatusOptions = [{ name: "En preparación" }, { name: "Activo" }, { name: "Inactivo" }];
  const gvOperationCloseOptions = [{ name: "Alquilado" }, { name: "Vendido" }];
  // const gvOperationCloseOptions = [{ name: "Alquilado" }, { name: "Vendido" }, { name: "Ninguno" }];
  const adTypeOptions = [{ name: "Alquiler" }, { name: "Venta" }];
  const adBuildingTypeOptions = [
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
    if (newFilter.includes("Ninguno")) return true;
    else {
      for (let elem of newFilter) {
        if (value.includes(elem)) return true;
      }
    }
  });

  useEffect(() => {
    if (ads.length !== 0) {
      formatData(ads);
    }
  }, [ads]);

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

  const adBuildingTypeFilterTemplate = (options) => {
    return (
      <React.Fragment>
        <MultiSelect
          value={options.value}
          options={adBuildingTypeOptions}
          itemTemplate={itemsTemplate}
          onChange={(e) => options.filterApplyCallback(e.value)}
          optionLabel="name"
          placeholder="Todos"
          className="p-column-filter"
        />
      </React.Fragment>
    );
  };
  const adStatusFilterTemplate = (options) => {
    return (
      <React.Fragment>
        <MultiSelect
          value={options.value}
          options={adStatusOptions}
          itemTemplate={itemsTemplate}
          onChange={(e) => options.filterApplyCallback(e.value)}
          optionLabel="name"
          placeholder="Todos"
          className="p-column-filter"
        />
      </React.Fragment>
    );
  };

  const gvOperationCloseFilterTemplate = (options) => {
    return (
      <React.Fragment>
        <MultiSelect
          value={options.value}
          options={gvOperationCloseOptions}
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
        <Column header="Dirección" rowSpan={2} style={{ width: "0.75%" }} />
        <Column header="Título" rowSpan={2} style={{ width: "1.5%" }} />
        <Column
          header="Estado anuncio"
          rowSpan={2}
          style={{ width: "0.10%" }}
          filter
          filterField="adStatus"
          filterElement={adStatusFilterTemplate}
          showFilterMatchModes={false}
          showApplyButton={false}
          showClearButton={false}
        />
        <Column
          header="Cierre operación GV"
          rowSpan={2}
          style={{ width: "0%" }}
          filter
          filterField="gvOperationClose"
          filterElement={gvOperationCloseFilterTemplate}
          showFilterMatchModes={false}
          showApplyButton={false}
          showClearButton={false}
        />
        <Column header="Precio" colSpan={2} />
        <Column header="Superficie" rowSpan={2} style={{ width: "0%" }} />
        <Column
          header="Tipo de inmueble"
          rowSpan={2}
          style={{ width: "0.15%" }}
          filter
          filterField="adBuildingType"
          filterElement={adBuildingTypeFilterTemplate}
          showFilterMatchModes={false}
          showApplyButton={false}
          showClearButton={false}
        />
        <Column
          header="Tipo de anuncio"
          rowSpan={2}
          style={{ width: "0%" }}
          filter
          filterElement={adTypeFilterTemplate}
          filterField="adType"
          showFilterMatchModes={false}
          showApplyButton={false}
          showClearButton={false}
        />
        <Column header="Propietario" rowSpan={2} style={{ width: "0.15%" }} />
        <Column header="Consultor" rowSpan={2} style={{ width: "0.15%" }} />
      </Row>
      <Row>
        <Column header="Venta" colSpan={1} style={{ width: "0%" }} sortable field="sale.saleValue" />
        <Column header="Alquiler" colSpan={1} style={{ width: "0%" }} sortable field="rent.rentValue" />
      </Row>
    </ColumnGroup>
  );

  const formatCurrency = (value) => {
    return value
      ? value.toLocaleString("es-ES", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : value;
  };

  const surfaceBodyTemplate = (rowData) => {
    if (rowData.buildSurface !== 0) {
      return (
        <p>
          {rowData.buildSurface.toLocaleString("es-ES")} m<sup>2</sup>
        </p>
      );
    }
  };

  const referenceBodyTemplate = (rowData) => {
    return (
      <Link style={{ textDecoration: "none", color: "inherit" }} to={`/anuncios/${rowData._id}`}>
        {rowData.adReference}
      </Link>
    );
  };

  const titleBodyTemplate = (rowData) => {
    return (
      <Link style={{ textDecoration: "none", color: "inherit" }} to={`/anuncios/${rowData._id}`}>
        {rowData.title}
      </Link>
    );
  };

  const directionBodyTemplate = (rowData) => {
    return (
      <Link style={{ textDecoration: "none", color: "inherit" }} to={`/anuncios/${rowData._id}`}>
        {rowData.adDirection}
      </Link>
    );
  };

  const saleBodyTemplate = (rowData) => {
    if (rowData.sale !== null && rowData.sale !== undefined) {
      if (rowData.sale?.saleValue !== 0) return formatCurrency(rowData.sale.saleValue);
    } else return "";
  };

  const rentBodyTemplate = (rowData) => {
    if (rowData.rent !== null && rowData.rent !== undefined) {
      if (rowData.rent?.rentValue !== 0) return formatCurrency(rowData.rent.rentValue);
    } else return "";
  };

  const formatData = (ads) => {
    const newAds = ads.map((ad) => {
      if (typeof ad.adDirection === "object") {
        ad.adDirection.address = Object.values(ad.adDirection.address);
        ad.adDirection = `${ad.adDirection.address.join(" ")}`;
        ad.adBuildingType = ad.adBuildingType.sort().join(", ");
        ad.adType = ad.adType.sort().join(", ");
      }
      return ad;
    });
    setAdsFormated(newAds);
    setLoader(false);
  };

  return (
    <>
      {!loader && ads.length !== 0 ? (
        <DataTable
          dataKey="id"
          headerColumnGroup={headerGroup}
          value={ads.length !== 0 ? adsFormated : []}
          removableSort
          sortField="updatedAt"
          sortOrder={-1}
          filterDisplay="menu"
          showGridlines
          filters={filters}
          responsiveLayout="scroll"
          emptyMessage="No se ha encontrado ningún anuncio"
        >
          <Column
            field="updatedAt"
            body={(rowData) => {
              return moment(rowData.updatedAt).locale("es-ES").format("L");
            }}
          ></Column>
          <Column field="adReference" body={referenceBodyTemplate}></Column>
          <Column field="adDirection" body={directionBodyTemplate}></Column>
          <Column field="title" body={titleBodyTemplate}></Column>
          <Column field="adStatus"></Column>
          <Column field="gvOperationClose"></Column>
          <Column field="sale.saleValue" body={saleBodyTemplate}></Column>
          <Column field="rent.rentValue" body={rentBodyTemplate}></Column>
          <Column field="buildSurface" body={surfaceBodyTemplate}></Column>
          <Column field="adBuildingType"></Column>
          <Column field="adType"></Column>
          <Column field="owner.fullName"></Column>
          <Column field="consultant.fullName"></Column>
        </DataTable>
      ) : (
        <div style={{ height: 200 }}>
          <p style={{ lineHeight: 4 }}>No ha creado ningún anuncio </p>
          <BsCloudArrowUp fontSize="2.5em" />
        </div>
      )}
    </>
  );
};

export default AdsTable;
