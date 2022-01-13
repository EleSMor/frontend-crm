import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Link } from "react-router-dom";
import { BsCloudArrowUp } from "react-icons/bs";
import * as moment from "moment";
import "moment/locale/es";
import "./AdsTable.scss";
import "./DataTableDemo.scss";
import "./AdsTable.scss"

const AdsTable = ({ ads }) => {
  const [adsFormated, setAdsFormated] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (ads.length !== 0) {
      formatData(ads);
    }
  }, [ads]);

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          header="Fecha de creación"
          rowSpan={2}
          sortable
          field="createdAt"
        />
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
        <Column
          header="Venta"
          colSpan={1}
          sortable
          field="price.sale.saleValue"
        />
        <Column
          header="Alquiler"
          colSpan={1}
          sortable
          field="price.rent.rentValue"
        />
      </Row>
    </ColumnGroup>
  );

  const formatCurrency = (value) => {
    return value
      ? value.toLocaleString("es-ES", { style: "currency", currency: "EUR" })
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
    return <Link to={`/anuncios/${rowData._id}`}>{rowData.adReference}</Link>;
  };

  const saleBodyTemplate = (rowData) => {
    if (rowData.price.sale.saleValue !== 0)
      return formatCurrency(rowData.price.sale.saleValue);
    else return "";
  };

  const rentBodyTemplate = (rowData) => {
    if (rowData.price.rent.rentValue !== 0)
      return formatCurrency(rowData.price.rent.rentValue);
    else return "";
  };

  const formatData = (ads) => {
    const newAds = ads.map((ad) => {
      if (typeof ad.adDirection === "object") {
        ad.adDirection.address = Object.values(ad.adDirection.address);
        ad.adDirection = `${ad.adDirection.address.join(" ")}  ${
          ad.adDirection.postalCode
        } ${ad.adDirection.city} ${ad.adDirection.country}`;
        ad.adBuildingType = ad.adBuildingType.join(" ");
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
          sortField="createdAt"
          sortOrder={-1}
          resizableColumns
          responsiveLayout="scroll"
        >
          <Column
            field="createdAt"
            body={(rowData) => {
              return moment(rowData.createdAt).locale("es-ES").format("L");
            }}
          ></Column>
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
      ) : (
        <div style={{height: 200}}>
          <p style={{ lineHeight: 4 }}>
            No ha creado ningún anuncio{" "}
          </p>
          <BsCloudArrowUp fontSize="2.5em" />
        </div>
      )}
    </>
  );
};

export default AdsTable;
