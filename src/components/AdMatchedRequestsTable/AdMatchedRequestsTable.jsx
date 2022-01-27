import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getMatchedRequests } from "../../api/ads.api.js";

const AdMatchedRequestsTable = () => {
  const { id } = useParams();

  const [requests, setRequests] = useState([]);

  useEffect(() => getMatchedRequests(id).then((res) => setRequests(res)));
  return (
    <div>
      <DataTable
        value={requests.length !== 0 ? requests : ""}
        paginator
        rows={10}
        removableSort
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        dataKey="id"
      >
        <Column
          field="requestReference"
          header="Id Petición"
          body={(ev) => <Link to={`/peticiones/${ev._id}`}>{ev.requestReference}</Link>}
          sortable
        ></Column>
        <Column field="requestContact.fullName" header="Nombre Completo" sortable></Column>
        <Column field="requestContact.company" header="Empresa" sortable></Column>
        <Column field="requestContact.email" header="Email" sortable></Column>
        <Column field="requestContact.consultantComments" header="Comentarios" sortable></Column>
      </DataTable>
    </div>
  );
};

export default AdMatchedRequestsTable;
