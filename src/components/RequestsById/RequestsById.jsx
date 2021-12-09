import { useState, useContext, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useHistory, useParams } from "react-router-dom";
import { Navbar, SubHeader } from "..";
import { UserContext } from "../Context/AuthUser";
import { getAdsMatched, sendNewRequest } from "../../api/requests.api.js";
import { Formik, Form } from "formik";

const RequestsById = () => {
  const [ads, setRequests] = useState([]);
  // const [selectedBuildingType, setSelectedBuildingType] = useState([]);
  // const [residentialSelectedZones, setResidentialSelectedZones] = useState([]);
  // const [patrimonialSelectedZones, setPatrimonialSelectedZones] = useState([]);

  const { id } = useParams();
  const history = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    getAdsMatched(id).then((res) => setRequests(res));
  }, []);

  return (
    <div>
      {user.length === 0 && history.push("/")}
      <Navbar />
      <SubHeader title="Anuncios" list={ads} location="/requests/create" />
      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          let data = new FormData();

          for (var key in values) {
            data.append(key, values[key]);
          }

          sendNewRequest(data);
          // history.push("/ads");
        }}
      >
        {(formProps) => <Form>

        </Form>}
      </Formik>
      <TabView>
        <TabPanel header="Matching">
          <div className="card">
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
              <Column field="price.sale.rentValue" header="Precio" sortable></Column>
              <Column field="price.rent.rentValue" header="Alquiler" sortable></Column>
              <Column field="buildSurface" header="m2 construidos" sortable></Column>
              <Column field="buildSurface" header="m2 parcela" sortable></Column>
              <Column field="requestContact.consultantComments" header="Inmueble" sortable></Column>
            </DataTable>
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default RequestsById;
