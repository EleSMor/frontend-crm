import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getMatchedRequests } from "../../api/ads.api.js";

const AdMatchedRequestsTable = () => {
  const { id } = useParams();

  const [ads, setRequests] = useState([]);

  useEffect(() => getMatchedRequests(id).then((res) => setRequests(res)), [id]);

  return (
    <div>
      <DataTable
        value={ads.length !== 0 ? ads : ""}
        paginator
        rows={10}
        removableSort
        responsiveLayout="scroll"
        resizableColumns
        columnResizeMode="fit"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        dataKey="id"
      >
        <Column
          field="requestReference"
          header="Id Petición"
          body={(ev) => <Link to={`/peticiones/${ev._id}`}>{ev.requestReference}</Link>}
          sortable
          style={{ width: "5%" }}
        ></Column>
        <Column field="requestContact.fullName" header="Nombre Completo" sortable style={{ width: "20%" }}></Column>
        <Column field="requestContact.company" header="Empresa" sortable style={{ width: "10%" }}></Column>
        <Column field="requestContact.email" header="Email" sortable style={{ width: "15%" }}></Column>
        <Column
          field="requestContact.contactComments"
          header="Comentarios"
          style={{ width: "50%" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default AdMatchedRequestsTable;
