import { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useHistory, useParams, Link } from "react-router-dom";
import { DetailsAds, ImagesAds } from "../../components";
import { UserContext } from "../../components/Context/AuthUser";
import { createAd, updateAd, getAllAds, getAdById, getMatchedRequests } from "../../api/ads.api.js";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import GoBack from "../../components/GoBack/GoBack";
import { getAllResidentialZones, getAllPatrimonialZones } from "../../api/zones.api";
import "./AdForm.scss";

const AdForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [adById, setAdById] = useState("");
  const [requests, setRequests] = useState([]);

  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedConsultant, setSelectedConsultant] = useState("");
  const [residentialSelectedZones, setResidentialSelectedZones] = useState([]);
  const [patrimonialSelectedZones, setPatrimonialSelectedZones] = useState([]);
  const [selectedAdBuildingType, setSelectedAdBuildingType] = useState([]);
  const [selectedAdType, setSelectedAdType] = useState([]);
  const [residentials, setResidential] = useState([]);
  const [patrimonials, setPatrimonial] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getAllAds()
      .then(
        getAllResidentialZones()
          .then((res) => {
            setResidential(res);
          })
          .then(
            getAllPatrimonialZones().then((res) => {
              setPatrimonial(res);
            })
          )
      )
      .then(() => {
        if (id) {
          getAdById(id).then((res) => {
            setAdById(res);
            setSelectedOwner(res.owner);
            setSelectedConsultant(res.consultant);
            setSelectedAdBuildingType(res.adBuildingType);
            setSelectedAdType(res.adType);
          });
          getMatchedRequests(id).then((res) => setRequests(res));
        }
      })
      .then(() => {
        if (id && adById.length !== 0 && residentials.length !== 0 && patrimonials.length !== 0) setLoader(false);
        else if (!id) setLoader(false);
      });
  }, [id, activeIndex]);

  return (
    <div>
      {user.length === 0 && history.push("/")}
      <Layout subTitle="Anuncios" subUndertitle={<GoBack />} subLocation="/anuncios/crear">
        {residentialSelectedZones.length !== 0 && patrimonialSelectedZones.length !== 0 && loader ? (
          <Spinner />
        ) : (
          <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
            <TabPanel header="Detalles">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  title: adById ? adById.title : "",
                  adReference: adById ? adById.adReference : "",
                  showOnWeb: adById ? adById.showOnWeb : true,
                  featuredOnMain: adById ? adById.featuredOnMain : false,
                  street: adById ? adById.adDirection.address.street : "",
                  directionNumber: adById ? adById.adDirection.address.directionNumber : "",
                  directionFloor: adById ? adById.adDirection.address.directionFloor : "",
                  postalCode: adById ? adById.adDirection.postalCode : "",
                  city: adById ? adById.adDirection.city : "Madrid",
                  country: adById ? adById.adDirection.country : "España",
                  adType: adById ? selectedAdType : [],
                  gvOperationClose: adById ? adById.gvOperationClose : [],
                  owner: adById ? [adById.owner] : "",
                  consultant: adById ? [adById.consultant] : "",
                  adBuildingType: adById ? selectedAdBuildingType : [],
                  zone: adById ? adById.zone : [],
                  department: adById ? adById.department : "",
                  webSubtitle: adById ? adById.webSubtitle : "",
                  buildSurface: adById ? adById.buildSurface : 0,
                  plotSurface: adById ? adById.plotSurface : 0,
                  floor: adById ? adById.floor : "",
                  disponibility: adById ? adById.disponibility : "",
                  surfacesBox: adById
                    ? adById.surfacesBox
                    : [
                        {
                          surfaceFloor: "",
                          surfaceUse: "",
                          metersAvailables: "",
                          metersPrice: "",
                          surfaceDisponibility: "",
                        },
                      ],
                  saleValue: adById ? adById.price.sale.saleValue : 0,
                  saleShowOnWeb: adById ? adById.price.sale.saleShowOnWeb : true,
                  rentValue: adById ? adById.price.rent.rentValue : 0,
                  rentShowOnWeb: adById ? adById.price.rent.rentShowOnWeb : false,
                  monthlyRent: adById ? adById.monthlyRent : 0,
                  expenses: adById ? adById.expenses : 0,
                  expensesIncluded: adById ? adById.expensesIncluded : 0,
                  expensesValue: adById ? adById.communityExpenses.expensesValue : 0,
                  expensesShowOnWeb: adById ? adById.communityExpenses.expensesShowOnWeb : false,
                  ibiValue: adById ? adById.ibi.ibiValue : 0,
                  ibiShowOnWeb: adById ? adById.ibi.ibiShowOnWeb : false,
                  buildingYear: adById ? adById.buildingYear : "",
                  bedrooms: adById ? adById.quality.bedrooms : 0,
                  bathrooms: adById ? adById.quality.bathrooms : 0,
                  parking: adById ? adById.quality.parking : 0,
                  indoorPool: adById ? adById.quality.indoorPool : 0,
                  outdoorPool: adById ? adById.quality.outdoorPool : 0,
                  jobPositions: adById ? adById.quality.jobPositions : 0,
                  subway: adById ? adById.quality.subway : "",
                  bus: adById ? adById.quality.bus : "",
                  lift: adById ? adById.quality.others.lift : false,
                  dumbwaiter: adById ? adById.quality.others.dumbwaiter : false,
                  liftTruck: adById ? adById.quality.others.liftTruck : false,
                  airConditioning: adById ? adById.quality.others.airConditioning : false,
                  centralHeating: adById ? adById.quality.others.centralHeating : false,
                  subfloorHeating: adById ? adById.quality.others.subfloorHeating : false,
                  indoorAlarm: adById ? adById.quality.others.indoorAlarm : false,
                  outdoorAlarm: adById ? adById.quality.others.outdoorAlarm : false,
                  fullHoursSecurity: adById ? adById.quality.others.fullHoursSecurity : false,
                  gunRack: adById ? adById.quality.others.gunRack : false,
                  strongBox: adById ? adById.quality.others.strongBox : false,
                  well: adById ? adById.quality.others.well : false,
                  homeAutomation: adById ? adById.quality.others.homeAutomation : false,
                  centralVacuum: adById ? adById.quality.others.centralVacuum : false,
                  padelCourt: adById ? adById.quality.others.padelCourt : false,
                  tennisCourt: adById ? adById.quality.others.tennisCourt : false,
                  terrace: adById ? adById.quality.others.terrace : false,
                  storage: adById ? adById.quality.others.storage : false,
                  swimmingPool: adById ? adById.quality.others.swimmingPool : false,
                  garage: adById ? adById.quality.others.garage : false,
                  falseCeiling: adById ? adById.quality.others.falseCeiling : false,
                  qualityBathrooms: adById ? adById.quality.others.qualityBathrooms : false,
                  freeHeight: adById ? adById.quality.others.freeHeight : false,
                  smokeOutlet: adById ? adById.quality.others.smokeOutlet : false,
                  accessControl: adById ? adById.quality.others.accessControl : false,
                  web: adById ? adById.description.web : "",
                  emailPDF: adById ? adById.description.emailPDF : "",
                  distribution: adById ? adById.description.distribution : "",
                }}
                onSubmit={(data) => {

                  if (id) data.id = id;
                  data.owner = selectedOwner;
                  data.consultant = selectedConsultant;
                  data.adType = selectedAdType;
                  data.adBuildingType = selectedAdBuildingType;
                  if (residentialSelectedZones.length !== 0) data.zone = residentialSelectedZones;
                  else if (patrimonialSelectedZones.length !== 0) data.zone = patrimonialSelectedZones;
                  else if (patrimonialSelectedZones.length === 0 && residentialSelectedZones.length === 0)
                    data.zone = [];

                  if (!id) {
                    createAd(data).then((res) => history.push(`/anuncios`));
                  }
                  else
                    updateAd(data).then((res) => {
                      alert(`El anuncio ${res.adReference} ha sido actualizado`);
                      history.push(`/anuncios`);
                    });
                }}
              >
                {(formProps) => (
                  <Form>
                    <DetailsAds
                      formProps={formProps}
                      id={id ? id : ""}
                      owner={selectedOwner}
                      buildingType={selectedAdBuildingType}
                      setBuildingType={setSelectedAdBuildingType}
                      adType={selectedAdType}
                      setAdType={setSelectedAdType}
                      residentials={residentials}
                      patrimonials={patrimonials}
                      setOwner={setSelectedOwner}
                      consultant={selectedConsultant}
                      setConsultant={setSelectedConsultant}
                      setResidentialZones={setResidentialSelectedZones}
                      setPatrimonialZones={setPatrimonialSelectedZones}
                    />
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={() => history.push("/anuncios")}>
                      Cancelar
                    </button>
                  </Form>
                )}
              </Formik>
            </TabPanel>
            {id && (
              <TabPanel header="Imágenes">
                <ImagesAds id={id} setActiveIndex={setActiveIndex} adById={adById ? adById : ""} />
              </TabPanel>
            )}
            {id && (
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
                    <Column field="requestReference" header="Id Petición" body={(ev) => <Link to={`/peticiones/${ev._id}`}>{ev.requestReference}</Link>} sortable></Column>
                    <Column field="requestContact.fullName" header="Nombre Completo" sortable></Column>
                    <Column field="requestContact.company" header="Empresa" sortable></Column>
                    <Column field="requestContact.email" header="Email" sortable></Column>
                    <Column field="requestContact.consultantComments" header="Comentarios" sortable></Column>
                  </DataTable>
                </div>
              </TabPanel>
            )}
          </TabView>
        )}
      </Layout>
    </div>
  );
};

export default AdForm;
