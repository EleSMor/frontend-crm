import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getMatchedRequests } from "../../api/ads.api.js";
import "./AdMatchedRequestsTable.scss";

const AdMatchedRequestsTable = ({ requestsToSend, setRequestsToSend }) => {
  const { id } = useParams();

  const [requests, setRequests] = useState([]);

  useEffect(() => getMatchedRequests(id).then((res) => setRequests(res)), []);

  return (
    <div>
      <DataTable
        value={requests.length !== 0 ? requests : ""}
        paginator
        rows={10}
        removableSort
        responsiveLayout="scroll"
        resizableColumns
        dataKey="_id"
        selectionMode="checkbox"
        selection={requestsToSend}
        onSelectionChange={(ev) => {
          setRequestsToSend(ev.value);
        }}
        columnResizeMode="fit"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "1%" }}></Column>
        <Column
          field="requestReference"
          header="Id Petición"
          body={(ev) => <Link to={`/peticiones/${ev._id}`}>{ev.requestReference}</Link>}
          sortable
          style={{ width: "5%" }}
        ></Column>
        <Column field="requestContact.fullName" header="Nombre Completo" sortable style={{ width: "12%" }}></Column>
        <Column field="requestContact.company" header="Empresa" sortable style={{ width: "12%" }}></Column>
        <Column field="requestContact.email" header="Email" sortable style={{ width: "10%" }}></Column>
        <Column field="requestComment" header="Comentarios" style={{ width: "50%" }}></Column>
      </DataTable>
    </div>
  );
};

export default AdMatchedRequestsTable;
