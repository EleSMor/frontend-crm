import { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import { TabView, TabPanel } from "primereact/tabview";
import { useHistory, useParams, Link } from "react-router-dom";
import { DetailsAds, ImagesAds } from "../../components";
import AdMatchedRequestsTable from "../../components/AdMatchedRequestsTable/AdMatchedRequestsTable";
import PopUp from "../../components/PopUp/PopUp";
import GoBack from "../../components/GoBack/GoBack";
import Layout from "../Layout/Layout";
import { UserContext } from "../../components/Context/AuthUser";
import Checkbox from "../../components/CheckBox/Checkbox";
import { createAd, updateAd, getAllAds, getAdById, deleteAd } from "../../api/ads.api.js";
import { sendAdToContacts } from "../../api/mails.api";
import { getAllOwners } from "../../api/contacts.api";
import { getAllConsultants } from "../../api/consultants.api";
import Spinner from "../../components/Spinner/Spinner";
import { GvreLogo } from "../../icons/index";
import { HiOutlineMail } from "react-icons/hi";
import { BiArea } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { FaSwimmingPool, FaBath, FaBed } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { getAllResidentialZones, getAllPatrimonialZones } from "../../api/zones.api";
import useWindowSize from "../../hooks/useWindowSize";
import { checkSession } from "../../api/auth.api";
import "./AdForm.scss";
import "./EmailTemplate.scss";

const AdForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const { user, deleteUser } = useContext(UserContext);
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
  const [adShowOnWeb, setAdShowOnWeb] = useState(true);
  const [validateForm, setValidateForm] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [owners, setOwners] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const handlePopUp = () => {
    setPopUp(!popUp);
  };
  const [requestsToSend, setRequestsToSend] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    checkSession().then((res) => {
      if (res === "Acceso restringido") {
        deleteUser();
        history.push("/");
      }
    });
  }, []);

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
            setAdShowOnWeb(res.showOnWeb);
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

  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const maskValues = (value, ref) => {
    let render = "";

    if (
      (ref === "sale" && value === 99999999) ||
      (ref === "rent" && value === 99999) ||
      (ref === "buildSurface" && value === 9999) ||
      (ref === "plotSurface" && value === 99999)
    ) {
      render = <p>Valor máx.</p>;
    } else if (value === 0) {
      render = <p>Valor mín.</p>;
    } else {
      if (ref === "sale" || ref === "rent")
        render = <p>{formatCurrency(value) + (ref === "sale" ? " €" : " €/mes")}</p>;
      else
        render = (
          <p>
            {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} m<sup>2</sup>
          </p>
        );
    }
    return render;
  };

  const maskTemplate = (value, ref) => {
    let render = "";

    if ((ref === "sale" && value === 99999999) || (ref === "rent" && value === 99999)) {
      render = <p>Valor máx.</p>;
    } else if (value === 0) {
      render = <p>Sin precio</p>;
    } else {
      if (ref === "sale" || ref === "rent")
        render = (
          <p>{`${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${ref === "sale" ? " €" : " €/mes"}`}</p>
        );
      else
        render = (
          <p>
            {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} m<sup>2</sup>
          </p>
        );
    }
    return render;
  };

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
                    setAdShowOnWeb(false);
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
                  raisedFloor: adById ? adById.quality.others.raisedFloor : false,
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
                  data.showOnWeb = adShowOnWeb;

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

                  if (data.owner && data.consultant) {
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
                  } else {
                    alert("Debe completar los campos de propietario y consultor");
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
                      adShowOnWeb={adShowOnWeb}
                      setAdShowOnWeb={setAdShowOnWeb}
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
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
                    <span
                      className={requestsToSend.length !== 0 ? "buttonForm" : "buttonForm--disabled"}
                      style={{ marginRight: 8, display: "flex", alignItems: "center" }}
                      onClick={() => {
                        if (requestsToSend.length !== 0) handlePopUp();
                      }}
                    >
                      {size < 480 ? (
                        <HiOutlineMail style={{ marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }} />
                      ) : (
                        <>
                          <HiOutlineMail
                            style={{ marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }}
                          />
                          <span>Enviar email</span>
                        </>
                      )}
                    </span>

                    {popUp && (
                      <PopUp
                        handlePopUp={handlePopUp}
                        height="95%"
                        mobileHeight="85%"
                        width="60%"
                        title="Plantilla de email"
                        buttons={
                          <>
                            <button className="buttonFormCancel" onClick={handlePopUp}>
                              Cancelar
                            </button>
                            <button
                              className="buttonForm"
                              onClick={() => {
                                sendAdToContacts({
                                  consultant: user,
                                  messageP1: document.getElementById("mailMessage1").value,
                                  messageP2: document.getElementById("mailMessage2").value,
                                  messageP3: document.getElementById("mailMessage3").value,
                                  messageGoodbyeP1: document.getElementById("mailMessage4").value,
                                  messageGoodbyeP2: document.getElementById("mailMessage5").value,
                                  requests: requestsToSend,
                                  ad: adById,
                                }).then((res) => {
                                  alert(`${res}`);
                                  handlePopUp();
                                });
                              }}
                            >
                              Enviar
                            </button>
                          </>
                        }
                        fixedButtons={true}
                      >
                        {/* // ================================================================================ */}
                        <div className="EmailTemplate">
                          <div className="EmailTemplate__Header">
                            <GvreLogo
                              style={{
                                width: "6%",
                                color: "#FFF",
                                bottom: "50%",
                                left: "50%",
                                margin: 12,
                              }}
                            />
                          </div>
                          <div className="EmailTemplate__Body">
                            {/* INTRO */}
                            <div className="EmailTemplate__Body__Introduction">
                              <textarea
                                id="mailMessage1"
                                defaultValue={`Buenos días ${requestsToSend[0].requestContact.fullName}`}
                                onChange={(ev) => console.log(ev.target.value)}
                              />
                              <textarea
                                id="mailMessage2"
                                defaultValue={`Tal y como hemos hablado, te envío información sobre los diferentes inmuebles.`}
                                onChange={(ev) => console.log(ev.target.value)}
                              />
                              <textarea
                                id="mailMessage3"
                                defaultValue={`En cada enlace podrás encontrar información al respecto, además te indico dirección exacta. Si tienes dudas no dudes en contactar conmigo`}
                                onChange={(ev) => console.log(ev.target.value)}
                              />
                            </div>
                            {/* ESTATES */}
                            <div className="EmailTemplate__Body__Estates">
                              <div className="EmailTemplate__Body__Estates__Item">
                                <div className="EmailTemplate__Body__Introduction">
                                  <textarea
                                    placeholder={"Inserte un comentario"}
                                    defaultValue={""}
                                    onChange={(ev) => (adById.adComment = ev.target.value)}
                                    style={{ minHeight: "5%" }}
                                  />
                                </div>
                                <div className="EmailTemplate__Body__Introduction--Options">
                                  <p>Envío de dirección</p>
                                  <div>
                                    <input
                                      type="radio"
                                      id={`No enviar dirección`}
                                      name={`Direction`}
                                      onChange={() => {
                                        adById.adDirectionSelected = undefined;
                                      }}
                                    />
                                    <label htmlFor={`No enviar dirección`}>No enviar dirección</label>
                                  </div>
                                  <div style={{ display: "flex", verticalAlign: "middle" }}>
                                    <input
                                      type="radio"
                                      id={`Incluir dirección con número incluido`}
                                      name={`Direction`}
                                      onChange={(ev) => {
                                        if (ev.target.checked) {
                                          adById.adDirectionSelected =
                                            adById.adDirection.address.street +
                                            " " +
                                            adById.adDirection.address.directionNumber +
                                            ", " +
                                            adById.adDirection.city;
                                        } else {
                                          adById.adDirectionSelected = undefined;
                                        }
                                      }}
                                    />
                                    <label htmlFor={`Incluir dirección con número incluido`}>
                                      Incluir dirección con número incluido
                                    </label>
                                  </div>
                                  <div>
                                    <input
                                      type="radio"
                                      id={`Incluir dirección sin número`}
                                      name={`Direction`}
                                      onChange={(ev) => {
                                        if (ev.target.checked) {
                                          adById.adDirectionSelected =
                                            adById.adDirection.address.street + ", " + adById.adDirection.city;
                                        } else {
                                          adById.adDirectionSelected = undefined;
                                        }
                                      }}
                                    />
                                    <label htmlFor={`Incluir dirección sin número`}>Incluir dirección sin número</label>
                                  </div>
                                </div>
                                <h5>
                                  <b>
                                    {adById.adDirection.address.street +
                                      " " +
                                      adById.adDirection.address.directionNumber +
                                      ", " +
                                      adById.adDirection.city}
                                  </b>
                                </h5>
                                <div className="EmailTemplate__Body__Title">
                                  <textarea
                                    style={{
                                      display: "block",
                                      fontSize: "1.17em",
                                      marginTop: "1em",
                                      marginBottom: "1em",
                                      marginLeft: "0",
                                      marginRight: "0",
                                      fontWeight: "bold",
                                      minWidth: "5%",
                                    }}
                                    defaultValue={adById.title}
                                    onChange={(ev) => {
                                      adById.titleEdited = ev.target.value;
                                    }}
                                  />
                                </div>
                                {adById.images.main ? (
                                  <img
                                    src={adById.images.main}
                                    alt="Imagen principal"
                                    style={{ width: "76%", marginBottom: 20 }}
                                  />
                                ) : (
                                  <img
                                    src="\defaultImage.png"
                                    alt="Imagen por defecto"
                                    style={{
                                      width: "75%",
                                      height: "100%",
                                      borderRadius: "4px",
                                      marginRight: 12,
                                      marginLeft: "10%",
                                      marginBottom: 20,
                                    }}
                                  />
                                )}

                                <h4>
                                  {adById.adType.includes("Venta")
                                    ? maskTemplate(adById.sale.saleValue, "sale")
                                    : maskTemplate(adById.rent.rentValue, "rent")}
                                </h4>

                                <p>REF {adById.adReference}</p>

                                <div className="EmailTemplate__Body__Estates__Item__Properties">
                                  {adById.plotSurface !== 0 && adById.plotSurface !== 99999 && (
                                    <div>
                                      <BiArea />
                                      <p>{maskValues(adById.plotSurface, "plotSurface")}</p>
                                    </div>
                                  )}
                                  {adById.buildSurface !== 0 && adById.buildSurface !== 9999 && (
                                    <div>
                                      <AiOutlineHome />
                                      <p>{maskValues(adById.buildSurface, "buildSurface")}</p>
                                    </div>
                                  )}
                                  {adById.quality.outdoorPool !== 0 && (
                                    <div>
                                      <FaSwimmingPool />
                                      <p>{adById.quality.outdoorPool}</p>
                                    </div>
                                  )}
                                  {adById.quality.bathrooms !== 0 && (
                                    <div>
                                      <FaBath />
                                      <p>{adById.quality.bathrooms}</p>
                                    </div>
                                  )}
                                  {adById.quality.bedrooms !== 0 && (
                                    <div>
                                      <FaBed />
                                      <p>{adById.quality.bedrooms}</p>
                                    </div>
                                  )}
                                </div>

                                <p>{adById.description.emailPDF}</p>

                                <div className="EmailTemplate__Body__Estates__Item__Button">
                                  <button
                                  // onClick={() => history.push(`/anuncios/${ad._id}`)}
                                  >
                                    Saber más
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* CONCLUSION */}
                            <div className="EmailTemplate__Body__Introduction">
                              <textarea
                                id="mailMessage4"
                                defaultValue={`Si quieres organizar alguna visita por favor ponte en contacto conmigo.`}
                                onChange={(ev) => console.log(ev.target.value)}
                              />
                              <textarea
                                id="mailMessage5"
                                defaultValue={`Un cordial saludo,`}
                                onChange={(ev) => console.log(ev.target.value)}
                              />
                            </div>
                            {/* SIGNATURE */}
                            <div className="EmailTemplate__Body__Signature">
                              <GvreLogo
                                style={{
                                  width: "8%",
                                  color: "#2B363D",
                                  bottom: "-52%",
                                  left: "-78%",
                                }}
                              />
                              <div>
                                <p>{user.fullName}</p>
                                <p>{user.profession ? `${user.position} | ${user.profession}` : `${user.position}`}</p>
                                <p>
                                  {user.consultantPhoneNumber
                                    ? `${user.consultantMobileNumber} | ${user.consultantPhoneNumber}`
                                    : `${user.consultantMobileNumber}`}
                                </p>
                                {user.office2 ? `${user.office1} | ${user.office2}` : `${user.office1}`}
                                <p>{user.consultantEmail}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopUp>
                    )}
                    {/* ============================================================================================================== */}
                  </div>
                </div>

                <div className="card">
                  <AdMatchedRequestsTable requestsToSend={requestsToSend} setRequestsToSend={setRequestsToSend} />
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
