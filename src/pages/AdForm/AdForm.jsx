import { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import { TabView, TabPanel } from "primereact/tabview";
import { useHistory, useParams, Link } from "react-router-dom";
import { DetailsAds, ImagesAds } from "../../components";
import AdMatchedRequestsTable from "../../components/AdMatchedRequestsTable/AdMatchedRequestsTable";
import { UserContext } from "../../components/Context/AuthUser";
import { createAd, updateAd, getAllAds, getAdById, getMatchedRequests, deleteAd } from "../../api/ads.api.js";
import { getAllOwners } from "../../api/contacts.api";
import { getAllConsultants } from "../../api/consultants.api";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import GoBack from "../../components/GoBack/GoBack";
import { FiSave } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { getAllResidentialZones, getAllPatrimonialZones } from "../../api/zones.api";
import useWindowSize from "../../hooks/useWindowSize";
import "./AdForm.scss";

const AdForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const size = useWindowSize();

  const [adById, setAdById] = useState("");

  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedConsultant, setSelectedConsultant] = useState("");
  const [residentialSelectedZones, setResidentialSelectedZones] = useState([]);
  const [patrimonialSelectedZones, setPatrimonialSelectedZones] = useState([]);
  const [selectedAdBuildingType, setSelectedAdBuildingType] = useState([]);
  const [selectedAdType, setSelectedAdType] = useState([]);
  const [residentials, setResidential] = useState([]);
  const [patrimonials, setPatrimonial] = useState([]);
  const [department, setDepartment] = useState("");
  const [adStatus, setAdStatus] = useState("En preparación");
  const [validateForm, setValidateForm] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [owners, setOwners] = useState([]);
  const [consultants, setConsultants] = useState([]);

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
      .then(getAllOwners().then((res) => setOwners(...owners, res)))
      .then(getAllConsultants().then((res) => setConsultants(...consultants, res)))
      .then(() => {
        if (id) {
          getAdById(id).then((res) => {
            setAdById(res);
            setSelectedOwner(res.owner);
            setSelectedConsultant(res.consultant);
            setAdStatus(res.adStatus);
            setSelectedAdBuildingType(res.adBuildingType);
            setSelectedAdType(res.adType);
          });
        }
      })
      .then(() => {
        if (id && adById.length !== 0 && residentials.length !== 0 && patrimonials.length !== 0) setLoader(false);
        else if (!id) setLoader(false);
      });
  }, [id]);

  if (
    firstLoad &&
    id &&
    adById.length !== 0 &&
    residentials.length !== 0 &&
    patrimonials.length !== 0 &&
    validateForm === false
  ) {
    for (let zone of residentials) {
      if (adById.zone.includes(zone._id) && !residentialSelectedZones.includes(zone._id)) {
        residentialSelectedZones.push(zone._id);
      }
    }
    for (let zone of patrimonials) {
      if (adById.zone.includes(zone._id) && !patrimonialSelectedZones.includes(zone._id)) {
        patrimonialSelectedZones.push(zone._id);
      }
    }
    setFirstLoad(false);
  }

  return (
    <div>
      {user.length === 0 && history.push("/")}
      <Layout
        subTitle="Anuncios"
        subUndertitle={
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <GoBack />
            </div>
            {activeIndex === 0 && (
              <div className="adForm__filter-box">
                <button
                  className={
                    adStatus === "En preparación" ? "adForm__filter-box--item__active" : "adForm__filter-box--item"
                  }
                  onClick={() => {
                    setAdStatus("En preparación");
                    setActiveIndex(0);
                  }}
                >
                  <p>En preparación</p>
                </button>
                <button
                  className={adStatus === "Activo" ? "adForm__filter-box--item__active" : "adForm__filter-box--item"}
                  onClick={() => {
                    setAdStatus("Activo");
                  }}
                >
                  <p>Activo</p>
                </button>
                <button
                  className={adStatus === "Inactivo" ? "adForm__filter-box--item__active" : "adForm__filter-box--item"}
                  onClick={() => {
                    setAdStatus("Inactivo");
                    setActiveIndex(0);
                  }}
                >
                  <p>Inactivo</p>
                </button>
              </div>
            )}
          </div>
        }
        subLocation="/anuncios/crear"
        subBreadcrumbs={id ? `Anuncio ${adById.adReference}` : "Crear nuevo anuncio"}
        footContent={
          <>
            {activeIndex === 0 && (
              <button className="buttonForm" type="submit" form="AdForm" style={{ marginRight: 8 }}>
                <FiSave
                  style={
                    size > 480
                      ? { marginRight: 7 }
                      : { marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }
                  }
                />
                {size > 480 && "Guardar"}
              </button>
            )}
            <Link className="buttonFormCancel" to="/anuncios">
              Cancelar
            </Link>
            {id && user.role === "Admin" && (
              <button
                className="buttonFormDelete"
                onClick={() =>
                  deleteAd(id).then(() => {
                    alert("Anuncio borrado correctamente");
                    history.push("/anuncios");
                  })
                }
              >
                <FaTrash
                  style={
                    size > 480
                      ? { marginRight: 7 }
                      : { marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }
                  }
                />
                {size > 480 && "Borrar"}
              </button>
            )}
          </>
        }
      >
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
                  adStatus: adById ? adById.adStatus : "En preparación",
                  showOnWeb: adById ? adById.showOnWeb : true,
                  featuredOnMain: adById ? adById.featuredOnMain : false,
                  street: adById ? adById.adDirection.address.street : "",
                  directionNumber: adById ? adById.adDirection.address.directionNumber : "",
                  directionFloor: adById ? adById.adDirection.address.directionFloor : "",
                  postalCode: adById ? adById.adDirection.postalCode : "",
                  city: adById ? adById.adDirection.city : "Madrid",
                  country: adById ? adById.adDirection.country : "España",
                  adType: adById ? adById.adType : [],
                  gvOperationClose: adById ? adById.gvOperationClose : "",
                  owner: adById ? [adById.owner] : "",
                  consultant: adById ? [adById.consultant] : "",
                  adBuildingType: adById ? adById.adBuildingType : [],
                  zone: adById ? adById.zone : [],
                  department: adById ? adById.department : "",
                  webSubtitle: adById ? adById.webSubtitle : "",
                  buildSurface: adById ? adById.buildSurface : 0,
                  plotSurface: adById ? adById.plotSurface : 0,
                  floor: adById ? adById.floor : "",
                  disponibility: adById ? adById.disponibility : "",
                  surfacesBox: adById ? adById.surfacesBox : [],
                  saleValue: adById.sale ? adById.sale.saleValue : 0,
                  saleShowOnWeb: adById.sale ? adById.sale.saleShowOnWeb : true,
                  rentValue: adById.rent ? adById.rent.rentValue : 0,
                  rentShowOnWeb: adById.rent ? adById.rent.rentShowOnWeb : true,
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
                  setValidateForm(true);
                  if (id) data.id = id;
                  data.owner = selectedOwner;
                  data.consultant = selectedConsultant;
                  data.adType = selectedAdType;
                  data.adBuildingType = selectedAdBuildingType;
                  if (data.adStatus !== adStatus) data.adStatus = adStatus;

                  data.adStatus = adStatus;
                  if (data.saleValue === "") data.saleValue = 0;
                  if (data.rentValue === "") data.rentValue = 0;

                  if (residentialSelectedZones.length !== 0) {
                    data.zone = residentialSelectedZones;
                  } else if (patrimonialSelectedZones.length !== 0) {
                    data.zone = patrimonialSelectedZones;
                  }

                  if (patrimonialSelectedZones.length === 0 && residentialSelectedZones.length === 0) {
                    data.zone = [];
                  }

                  if (data.department) {
                    if (!id) {
                      createAd(data).then((res) => {
                        alert(`El anuncio ${res.adReference} ha sido creado`);
                        history.push(`/anuncios`);
                      });
                    } else
                      updateAd(data).then((res) => {
                        alert(`El anuncio ${res.adReference} ha sido actualizado`);
                      });
                  } else {
                    alert("Debe indicar el departamento del anuncio");
                  }
                }}
              >
                {(formProps) => (
                  <Form id="AdForm">
                    <DetailsAds
                      formProps={formProps}
                      id={id ? id : ""}
                      owners={owners}
                      owner={selectedOwner}
                      setOwner={setSelectedOwner}
                      consultants={consultants}
                      consultant={selectedConsultant}
                      setConsultant={setSelectedConsultant}
                      buildingType={selectedAdBuildingType}
                      setBuildingType={setSelectedAdBuildingType}
                      adType={selectedAdType}
                      setAdType={setSelectedAdType}
                      residentials={residentials}
                      patrimonials={patrimonials}
                      residentialSelectedZones={residentialSelectedZones}
                      setResidentialZones={setResidentialSelectedZones}
                      patrimonialSelectedZones={patrimonialSelectedZones}
                      setPatrimonialZones={setPatrimonialSelectedZones}
                      department={department}
                      setDepartment={setDepartment}
                      adStatus={adStatus}
                      setAdStatus={setAdStatus}
                    />
                  </Form>
                )}
              </Formik>
            </TabPanel>
            {id && (
              <TabPanel header="Imágenes">
                <ImagesAds id={id} setActiveIndex={setActiveIndex} adById={adById ? adById : ""} />
              </TabPanel>
            )}
            {id && adById.adStatus === "Activo" && (
              <TabPanel header="Matching">
                <div className="card">
                  <AdMatchedRequestsTable />
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
