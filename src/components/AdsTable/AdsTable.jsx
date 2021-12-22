import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { NavLink } from "react-router-dom";
import moment from "moment";
import "./AdsTable.scss";
import "./DataTableDemo.scss";

const AdsTable = ({ ads }) => {
  const [adsFormated, setAdsFormated] = useState([]);

  useEffect(() => {
    if (ads.length !== 0) {
      concatAdDirection(ads);
    }
  }, [ads]);

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Fecha de creación" rowSpan={2} sortable field="createdAt"/>
        <Column header="Referencia" rowSpan={2} />
        <Column header="Dirección" rowSpan={2} />
        <Column header="Título" rowSpan={2} />
        <Column header="Estado anuncio" rowSpan={2} />
        <Column header="Cierre operación GV" rowSpan={2} />
        <Column header="Precio" colSpan={2} />
        <Column header="Superficie" rowSpan={2} />
        <Column header="Tipo de inmueble" rowSpan={2} />
        <Column header="Tipo de anuncio" rowSpan={2} />
        <Column header="Propietario" rowSpan={2} />
        <Column header="Consultor" rowSpan={2} />
      </Row>
      <Row>
        <Column header="Venta" colSpan={1} sortable field="price.sale.saleValue" />
        <Column header="Alquiler" colSpan={1} sortable field="price.rent.rentValue" />
      </Row>
    </ColumnGroup>
  );

  const formatCurrency = (value) => {
    return value.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
  };

  const surfaceBodyTemplate = (rowData) => {
    return (
      <p>
        {rowData.buildSurface.toLocaleString("es-ES")} m<sup>2</sup>
      </p>
    );
  };

  const referenceBodyTemplate = (rowData) => {
    return <NavLink to={`/ads/${rowData._id}`}>{rowData.adReference}</NavLink>;
  };

  const saleBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price.sale.saleValue);
  };

  const rentBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price.rent.rentValue);
  };

  const concatAdDirection = (ads) => {
    const newAds = ads.map((ad) => {
      ad.createdAt = moment(ad.createdAt).format("L");
      if (typeof ad.adDirection === "object") {
        ad.adDirection.address = Object.values(ad.adDirection.address);
        ad.adDirection = `${ad.adDirection.address.join(" ")}  ${ad.adDirection.postalCode} ${ad.adDirection.city} ${
          ad.adDirection.country
        }`;
        ad.adBuildingType = ad.adBuildingType.join(" ");
      }
      return ad;
    });
    setAdsFormated(newAds);
  };

  return (
    <>
      <DataTable
        value={ads.length !== 0 ? adsFormated : []}
        headerColumnGroup={headerGroup}
        paginator
        rows={10}
        removableSort
        resizableColumns
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        dataKey="id"
      >
        <Column field="createdAt"></Column>
        <Column field="adReference" body={referenceBodyTemplate}></Column>
        <Column field="adDirection"></Column>
        <Column field="title"></Column>
        <Column field="adStatus"></Column>
        <Column field="closeOperationGV"></Column>
        <Column field="price.sale.saleValue" body={saleBodyTemplate}></Column>
        <Column field="price.rent.rentValue" body={rentBodyTemplate}></Column>
        <Column field="buildSurface" body={surfaceBodyTemplate}></Column>
        <Column field="adBuildingType"></Column>
        <Column field="adType"></Column>
        <Column field="owner.fullName"></Column>
        <Column field="consultant.fullName"></Column>
      </DataTable>
    </>
  );
};

export default AdsTable;
