import { useState, useContext, useEffect, Fragment } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useHistory, useParams } from "react-router-dom";
import { Navbar, SubHeader } from "../../components";
import { UserContext } from "../../components/Context/AuthUser";
import { getMatchedRequests } from "../../api/ads.api.js";

const AdsById = () => {
  const [requests, setRequests] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    getMatchedRequests(id).then((res) => setRequests(res));
  }, []);

  return (
    <div>
      {user.length === 0 && history.push("/")}
      <Navbar />
      <SubHeader title="Anuncios" list={requests} location="/ads/create" />
      <TabView>
        <TabPanel header="Matching">
          <div className="card">
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
              <Column field="requestReference" header="Id Petición" sortable></Column>
              <Column field="requestContact.fullName" header="Nombre Completo" sortable></Column>
              <Column field="requestContact.company" header="Empresa" sortable></Column>
              <Column field="requestContact.email" header="Email" sortable></Column>
              <Column field="requestContact.consultantComments" header="Comentarios" sortable></Column>
            </DataTable>
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default AdsById;
