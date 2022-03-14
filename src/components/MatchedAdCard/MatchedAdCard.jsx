import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../components/Context/AuthUser";
import { useParams, Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import Spinner from "../../components/Spinner/Spinner";
import { MultiSelect } from "../../components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { AiOutlineReload, AiOutlineHome } from "react-icons/ai";
import { BiBuildingHouse, BiArea } from "react-icons/bi";
import { FaSwimmingPool, FaBath, FaBed } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { GiPapers } from "react-icons/gi";
import { RiMoneyEuroBoxLine } from "react-icons/ri";
import { MdHeight } from "react-icons/md";
import { ImMap2 } from "react-icons/im";
import InputsGroup from "../../components/InputsGroup/InputsGroup";
import Checkbox from "../../components/CheckBox/Checkbox";
import PopUp from "../../components/PopUp/PopUp";
import useWindowSize from "../../hooks/useWindowSize";
import { getAdsMatched, sendNewRequest, getRequestById } from "../../api/requests.api";
import { sendAdsToContact } from "../../api/mails.api";
import { GvreLogo } from "../../icons/index";
import "reactjs-popup/dist/index.css";
import "moment/locale/es";
import "./MatchedAdCard.scss";
import "./EmailTemplate.scss";

const MatchedAdCard = ({ patrimonials, residentials }) => {
  const [adsMatched, setAdsMatched] = useState([]);
  const [requestById, setRequestById] = useState([]);
  const [adsToSend, setAdsToSend] = useState([]);
  const [residentialSelectedZones, setResidentialSelectedZones] = useState([]);
  const [patrimonialSelectedZones, setPatrimonialSelectedZones] = useState([]);
  const [zonesAdded, setzonesAdded] = useState(false);
  const [loader, setLoader] = useState(true);
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const size = useWindowSize();
  const history = useHistory();
  const [popUp, setPopUp] = useState(false);
  const handlePopUp = () => {
    setPopUp(!popUp);
  };

  const adBuildingTypeOptions = [
    { name: "Casa" },
    { name: "Piso" },
    { name: "Parcela" },
    { name: "Ático" },
    { name: "Oficina" },
    { name: "Edificio" },
    { name: "Local" },
    { name: "Campo Rústico" },
    { name: "Activos Singulares" },
    { name: "Costa" },
  ];

  useEffect(() => {
    getAdsMatched(id).then((res) => {
      setAdsMatched(res);
    });
    getRequestById(id).then((res) => {
      setRequestById(res);
    });
    setLoader(false);
  }, [id]);

  if (id && requestById.length !== 0 && !loader && !zonesAdded) {
    for (let residentialZone of residentials) {
      if (
        requestById.requestZone.includes(residentialZone._id) &&
        !residentialSelectedZones.includes(residentialZone._id)
      ) {
        residentialSelectedZones.push(residentialZone._id);
      }
    }
    for (let patrimonialZone of patrimonials) {
      if (
        requestById.requestZone.includes(patrimonialZone._id) &&
        !patrimonialSelectedZones.includes(patrimonialZone._id)
      ) {
        patrimonialSelectedZones.push(patrimonialZone._id);
      }
    }
    setzonesAdded(true);
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

  const validateZone = (zones) => {
    if (id && requestById.length !== 0) {
      return zones.some((zone) => requestById.requestZone.includes(zone._id));
    } else return "";
  };

  const renderDirection = (direction) => {
    return (
      <span>
        {direction.address.directionNumber
          ? direction.address.directionFloor
            ? ` ${direction.address.street}, ${direction.address.directionNumber}, ${direction.address.directionFloor}`
            : ` ${direction.address.street}, ${direction.address.directionNumber}`
          : ` ${direction.address.street}`}
      </span>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <button
          className="buttonForm"
          type="submit"
          form="NewRequestForm"
          style={{
            marginRight: 8,
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            border: "1px solid #2b363d",
          }}
        >
          {size < 480 ? (
            <AiOutlineReload
              style={{ marginRight: 7, transform: "scale(125%)", verticalAlign: "middle", color: "#2b363d" }}
            />
          ) : (
            <>
              <AiOutlineReload
                style={{ marginRight: 7, transform: "scale(125%)", verticalAlign: "middle", color: "#2b363d" }}
              />
              <span style={{ color: "#2b363d" }}>Actualizar listado</span>
            </>
          )}
        </button>

        <span
          className={adsToSend.length !== 0 ? "buttonForm" : "buttonForm--disabled"}
          style={{ marginRight: 8, display: "flex", alignItems: "center" }}
          onClick={() => {
            if (adsToSend.length !== 0) handlePopUp();
          }}
        >
          {size < 480 ? (
            <HiOutlineMail style={{ marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }} />
          ) : (
            <>
              <HiOutlineMail style={{ marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }} />
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
                    sendAdsToContact({
                      consultant: user,
                      contact: requestById.requestContact,
                      messageP1: document.getElementById("mailMessage1").value,
                      messageP2: document.getElementById("mailMessage2").value,
                      messageP3: document.getElementById("mailMessage3").value,
                      messageGoodbyeP1: document.getElementById("mailMessage4").value,
                      messageGoodbyeP2: document.getElementById("mailMessage5").value,
                      ads: adsToSend,
                    }).then((res) => {
                      alert(`${res}`);
                      handlePopUp();
                      adsToSend.map((ad) => {
                        ad.adComment = "";
                      });
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
                    defaultValue={`Buenos días ${requestById.requestContact.fullName},`}
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
                  {adsToSend.map((ad, index) => {
                    return (
                      <div className="EmailTemplate__Body__Estates__Item" key={index}>
                        <div className="EmailTemplate__Body__Introduction">
                          <textarea
                            placeholder={"Inserte un comentario"}
                            defaultValue={""}
                            onChange={(ev) => (ad.adComment = ev.target.value)}
                            style={{ minHeight: "5%" }}
                          />
                        </div>
                        <div className="EmailTemplate__Body__Introduction--Options">
                          <p>Envío de dirección</p>
                          <div>
                            <input
                              type="radio"
                              id={`No enviar dirección-${index}`}
                              name={`${index}-Direction`}
                              onChange={() => {
                                ad.adDirectionSelected = undefined;
                              }}
                            />
                            <label htmlFor={`No enviar dirección-${index}`}>No enviar dirección</label>
                          </div>
                          <div style={{ display: "flex", verticalAlign: "middle" }}>
                            <input
                              type="radio"
                              id={`Incluir dirección con número incluido-${index}`}
                              name={`${index}-Direction`}
                              onChange={(ev) => {
                                if (ev.target.checked) {
                                  ad.adDirectionSelected =
                                    ad.adDirection.address.street +
                                    " " +
                                    ad.adDirection.address.directionNumber +
                                    ", " +
                                    ad.adDirection.city;
                                } else {
                                  ad.adDirectionSelected = undefined;
                                }
                              }}
                            />
                            <label htmlFor={`Incluir dirección con número incluido-${index}`}>
                              Incluir dirección con número incluido
                            </label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              id={`Incluir dirección sin número-${index}`}
                              name={`${index}-Direction`}
                              onChange={(ev) => {
                                if (ev.target.checked) {
                                  ad.adDirectionSelected = ad.adDirection.address.street + ", " + ad.adDirection.city;
                                } else {
                                  ad.adDirectionSelected = undefined;
                                }
                              }}
                            />
                            <label htmlFor={`Incluir dirección sin número-${index}`}>Incluir dirección sin número</label>
                          </div>
                        </div>
                        <h5>
                          <b>
                            {ad.adDirection.address.street +
                              " " +
                              ad.adDirection.address.directionNumber +
                              ", " +
                              ad.adDirection.city}
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
                            defaultValue={ad.title}
                            onChange={(ev) => {
                              ad.titleEdited = ev.target.value;
                            }}
                          />
                        </div>
                        {ad.images.main ? (
                          <img src={ad.images.main} alt="Imagen principal" style={{ width: "76%", marginBottom: 20 }} />
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
                            }}
                          />
                        )}

                        <h4>
                          {ad.adType.includes("Venta")
                            ? maskTemplate(ad.sale.saleValue, "sale")
                            : maskTemplate(ad.rent.rentValue, "rent")}
                        </h4>

                        <p>REF {ad.adReference}</p>

                        <div className="EmailTemplate__Body__Estates__Item__Properties">
                          {ad.plotSurface !== 0 && ad.plotSurface !== 99999 && (
                            <div>
                              <BiArea />
                              <p>{maskValues(ad.plotSurface, "plotSurface")}</p>
                            </div>
                          )}
                          {ad.buildSurface !== 0 && ad.buildSurface !== 9999 && (
                            <div>
                              <AiOutlineHome />
                              <p>{maskValues(ad.buildSurface, "buildSurface")}</p>
                            </div>
                          )}
                          {ad.quality.outdoorPool !== 0 && (
                            <div>
                              <FaSwimmingPool />
                              <p>{ad.quality.outdoorPool}</p>
                            </div>
                          )}
                          {ad.quality.bathrooms !== 0 && (
                            <div>
                              <FaBath />
                              <p>{ad.quality.bathrooms}</p>
                            </div>
                          )}
                          {ad.quality.bedrooms !== 0 && (
                            <div>
                              <FaBed />
                              <p>{ad.quality.bedrooms}</p>
                            </div>
                          )}
                        </div>

                        <p>{ad.description.emailPDF}.</p>

                        <div className="EmailTemplate__Body__Estates__Item__Button">
                          <button
                          // onClick={() => history.push(`/anuncios/${ad._id}`)}
                          >
                            Saber más
                          </button>
                        </div>
                      </div>
                    );
                  })}
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
                    <p>
                      {user.profession ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                          <div style={{ float: "left", width: "100%", textAlign: "end" }}>{user.position}</div>
                          <div style={{ float: "none", textAlign: "end", padding: "0 4px 0 4px" }}>|</div>
                          <div style={{ float: "right", width: "100%", textAlign: "start" }}>{user.profession}</div>
                        </div>
                      ) : (
                        user.position
                      )}
                    </p>
                    <p>
                      {user.consultantPhoneNumber ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                          <div style={{ float: "left", width: "100%", textAlign: "end" }}>
                            {user.consultantMobileNumber}
                          </div>
                          <div style={{ float: "none", textAlign: "end", padding: "0 4px 0 4px" }}>|</div>
                          <div style={{ float: "right", width: "100%", textAlign: "start" }}>
                            {user.consultantPhoneNumber}
                          </div>
                        </div>
                      ) : (
                        user.consultantMobileNumber
                      )}
                    </p>
                    {user.office2 ? (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                        <div style={{ float: "left", width: "100%", textAlign: "end" }}>{user.office1}</div>
                        <div style={{ float: "none", textAlign: "end", padding: "0 4px 0 4px" }}>|</div>
                        <div style={{ float: "right", width: "100%", textAlign: "start" }}>{user.office2}</div>
                      </div>
                    ) : (
                      user.office1
                    )}
                    <p>{user.consultantEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </PopUp>
        )}
        {/* ============================================================================================================== */}
      </div>
      <div className="MatchedAd__container">
        <div className={"MatchedAd__container__col--left"}>
          <h5>Filtros</h5>
          <Formik
            enableReinitialize={true}
            initialValues={{
              requestAdType: requestById.length !== 0 ? requestById.requestAdType : [],
              requestBuildingType: requestById.length !== 0 ? requestById.requestBuildingType : [],
              requestZone: requestById.length !== 0 ? requestById.requestZone : [],
              salePriceMax: requestById.length !== 0 ? requestById.requestSalePrice.salePriceMax : "",
              salePriceMin: requestById.length !== 0 ? requestById.requestSalePrice.salePriceMin : "",
              rentPriceMax: requestById.length !== 0 ? requestById.requestRentPrice.rentPriceMax : "",
              rentPriceMin: requestById.length !== 0 ? requestById.requestRentPrice.rentPriceMin : "",
              buildSurfaceMax: requestById.length !== 0 ? requestById.requestBuildSurface.buildSurfaceMax : "",
              buildSurfaceMin: requestById.length !== 0 ? requestById.requestBuildSurface.buildSurfaceMin : "",
              plotSurfaceMax: requestById.length !== 0 ? requestById.requestPlotSurface.plotSurfaceMax : "",
              plotSurfaceMin: requestById.length !== 0 ? requestById.requestPlotSurface.plotSurfaceMin : "",
              bedroomsMax: requestById.length !== 0 ? requestById.requestBedrooms.bedroomsMax : "",
              bedroomsMin: requestById.length !== 0 ? requestById.requestBedrooms.bedroomsMin : "",
              bathroomsMax: requestById.length !== 0 ? requestById.requestBathrooms.bathroomsMax : "",
              bathroomsMin: requestById.length !== 0 ? requestById.requestBathrooms.bathroomsMin : "",
            }}
            onSubmit={(data) => {
              if (id) data.id = id;

              if (residentialSelectedZones.length !== 0) {
                data.requestZone = residentialSelectedZones;
              } else if (patrimonialSelectedZones.length !== 0) {
                data.requestZone = patrimonialSelectedZones;
              }

              if (patrimonialSelectedZones.length === 0 && residentialSelectedZones.length === 0) {
                data.requestZone = [];
              }

              if (data.salePriceMax === "") data.salePriceMax = 99999999;
              if (data.salePriceMin === "") data.salePriceMin = 0;
              if (data.rentPriceMax === "") data.rentPriceMax = 99999;
              if (data.rentPriceMin === "") data.rentPriceMin = 0;

              if (data.buildSurfaceMax === "") data.buildSurfaceMax = 9999;
              if (data.buildSurfaceMin === "") data.buildSurfaceMin = 0;
              if (data.plotSurfaceMax === "") data.plotSurfaceMax = 99999;
              if (data.plotSurfaceMin === "") data.plotSurfaceMin = 0;

              sendNewRequest(data).then((res) => {
                alert(`Se ha actualizado la búsqueda`);
                setAdsMatched(res);
              });
            }}
          >
            {(formProps) => (
              <div style={{ padding: "12px" }}>
                <Form id="NewRequestForm">
                  <div className="MatchedAd__container__col--item">
                    <MultiSelect
                      label={
                        <span className="MatchedAd__container__col--item-center">
                          <BiBuildingHouse />
                          <span>Tipo de inmueble</span>
                        </span>
                      }
                      list={adBuildingTypeOptions}
                      fields={{ groupBy: "", text: "name", value: "name" }}
                      onChange={(ev) => {
                        formProps.setFieldValue("requestBuildingType", ev.value);
                      }}
                      value={formProps.values.requestBuildingType}
                    />
                  </div>
                  <div className="MatchedAd__container__col--item">
                    <MultiSelect
                      label={
                        <span className="MatchedAd__container__col--item-center">
                          <ImMap2 />
                          <span>Residencial</span>
                        </span>
                      }
                      list={residentials}
                      fields={{ groupBy: "zone", text: "name", value: "_id" }}
                      onChange={(ev) => {
                        formProps.setFieldValue("requestZone", ev.value);
                        setResidentialSelectedZones(ev.value);
                      }}
                      value={validateZone(residentials) ? residentialSelectedZones : []}
                    />
                  </div>
                  <div className="MatchedAd__container__col--item">
                    <MultiSelect
                      label={
                        <span className="MatchedAd__container__col--item-center">
                          <ImMap2 />
                          <span>Patrimonial</span>
                        </span>
                      }
                      list={patrimonials}
                      fields={{ groupBy: "zone", text: "name", value: "_id" }}
                      onChange={(ev) => {
                        formProps.setFieldValue("requestZone", ev.value);
                        setPatrimonialSelectedZones(ev.value);
                      }}
                      value={validateZone(patrimonials) ? patrimonialSelectedZones : []}
                    />
                  </div>
                  <div className="MatchedAd__container__col--item">
                    <InputsGroup
                      label={
                        <span className="MatchedAd__container__col--item-center">
                          <RiMoneyEuroBoxLine />
                          <span>Precio de venta</span>
                        </span>
                      }
                      inputs={[
                        {
                          name: "salePriceMax",
                          placeholder: "Escriba aquí",
                          label: "Máximo",
                          type: "text",
                          value:
                            formProps.values.salePriceMax === 99999999
                              ? ""
                              : formatCurrency(formProps.values.salePriceMax),
                          onBlur: (ev) => {
                            ev.target.type = "text";
                            ev.target.value = formatCurrency(ev.target.value);
                          },
                          onChange: (ev) => {
                            ev.target.value = ev.target.value.replaceAll(".", "");
                            ev.target.value = parseFloat(ev.target.value);
                            ev.target.type = "number";
                            if (isNaN(ev.target.valueAsNumber)) {
                              formProps.setFieldValue(ev.target.name, "");
                            } else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                            if (ev.target.value.length > 3) ev.target.type = "text";
                          },
                          span: <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>€</span>,
                          errors: "",
                        },
                        {
                          name: "salePriceMin",
                          label: "Mínimo",
                          type: "text",
                          placeholder: "Escriba aquí",
                          value:
                            formProps.values.salePriceMin === 0 ? "" : formatCurrency(formProps.values.salePriceMin),
                          onBlur: (ev) => {
                            ev.target.type = "text";
                            ev.target.value = formatCurrency(ev.target.value);
                          },
                          onChange: (ev) => {
                            ev.target.value = ev.target.value.replaceAll(".", "");
                            ev.target.value = parseFloat(ev.target.value);
                            ev.target.type = "number";
                            if (isNaN(ev.target.valueAsNumber)) {
                              formProps.setFieldValue(ev.target.name, "");
                            } else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                            if (ev.target.value.length > 3) ev.target.type = "text";
                          },
                          span: <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>€</span>,
                          errors: "",
                        },
                      ]}
                    />
                  </div>
                  <div className="MatchedAd__container__col--item">
                    <InputsGroup
                      label={
                        <span className="MatchedAd__container__col--item-center">
                          <RiMoneyEuroBoxLine />
                          <span>Precio de alquiler</span>
                        </span>
                      }
                      inputs={[
                        {
                          name: "rentPriceMax",
                          placeholder: "Escriba aquí",
                          label: "Máximo",
                          type: "text",
                          value:
                            formProps.values.rentPriceMax === 99999
                              ? ""
                              : formatCurrency(formProps.values.rentPriceMax),
                          onBlur: (ev) => {
                            ev.target.type = "text";
                            ev.target.value = formatCurrency(ev.target.value);
                          },
                          onChange: (ev) => {
                            ev.target.value = ev.target.value.replaceAll(".", "");
                            ev.target.value = parseFloat(ev.target.value);
                            ev.target.type = "number";
                            if (isNaN(ev.target.valueAsNumber)) {
                              formProps.setFieldValue(ev.target.name, "");
                            } else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                            if (ev.target.value.length > 3) ev.target.type = "text";
                          },
                          span: <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>€/mes</span>,
                          errors: "",
                        },
                        {
                          name: "rentPriceMin",
                          label: "Mínimo",
                          type: "text",
                          placeholder: "Escriba aquí",
                          value:
                            formProps.values.rentPriceMin === 0 ? "" : formatCurrency(formProps.values.rentPriceMin),
                          onBlur: (ev) => {
                            ev.target.type = "text";
                            ev.target.value = formatCurrency(ev.target.value);
                          },
                          onChange: (ev) => {
                            ev.target.value = ev.target.value.replaceAll(".", "");
                            ev.target.value = parseFloat(ev.target.value);
                            ev.target.type = "number";
                            if (isNaN(ev.target.valueAsNumber)) {
                              formProps.setFieldValue(ev.target.name, "");
                            } else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                            if (ev.target.value.length > 3) ev.target.type = "text";
                          },
                          span: <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>€/mes</span>,
                          errors: "",
                        },
                      ]}
                    />
                  </div>
                  <div className="MatchedAd__container__col--item">
                    <InputsGroup
                      label={
                        <span className="MatchedAd__container__col--item-center">
                          <GiPapers />
                          <span>Superficie construida</span>
                        </span>
                      }
                      inputs={[
                        {
                          name: "buildSurfaceMax",
                          label: "Máximo",
                          type: "text",
                          placeholder: "Escriba aquí",
                          value:
                            formProps.values.buildSurfaceMax === 9999
                              ? ""
                              : formatCurrency(formProps.values.buildSurfaceMax),
                          onBlur: (ev) => {
                            ev.target.type = "text";
                            ev.target.value = formatCurrency(ev.target.value);
                          },
                          onChange: (ev) => {
                            ev.target.value = ev.target.value.replaceAll(".", "");
                            ev.target.value = parseFloat(ev.target.value);
                            ev.target.type = "number";
                            if (isNaN(ev.target.valueAsNumber)) {
                              formProps.setFieldValue(ev.target.name, "");
                            } else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                            if (ev.target.value.length > 3) ev.target.type = "text";
                          },
                          span: (
                            <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>
                              m<sup>2</sup>
                            </span>
                          ),
                          errors: "",
                        },
                        {
                          name: "buildSurfaceMin",
                          label: "Mínimo",
                          type: "number",
                          placeholder: "Escriba aquí",
                          value:
                            formProps.values.buildSurfaceMin === 0
                              ? ""
                              : formatCurrency(formProps.values.buildSurfaceMin),
                          onBlur: (ev) => {
                            ev.target.type = "text";
                            ev.target.value = formatCurrency(ev.target.value);
                          },
                          onChange: (ev) => {
                            ev.target.value = ev.target.value.replaceAll(".", "");
                            ev.target.value = parseFloat(ev.target.value);
                            ev.target.type = "number";
                            if (isNaN(ev.target.valueAsNumber)) {
                              formProps.setFieldValue(ev.target.name, "");
                            } else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                            if (ev.target.value.length > 3) ev.target.type = "text";
                          },
                          span: (
                            <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>
                              m<sup>2</sup>
                            </span>
                          ),
                          errors: "",
                        },
                      ]}
                    />
                  </div>
                  <div className="MatchedAd__container__col--item">
                    <InputsGroup
                      label={
                        <span className="MatchedAd__container__col--item-center">
                          <MdHeight />
                          <span>Superficie de parcela</span>
                        </span>
                      }
                      inputs={[
                        {
                          name: "plotSurfaceMax",
                          label: "Máximo",
                          type: "text",
                          placeholder: "Escriba aquí",
                          value:
                            formProps.values.plotSurfaceMax === 99999
                              ? ""
                              : formatCurrency(formProps.values.plotSurfaceMax),
                          onBlur: (ev) => {
                            ev.target.type = "text";
                            ev.target.value = formatCurrency(ev.target.value);
                          },
                          onChange: (ev) => {
                            ev.target.value = ev.target.value.replaceAll(".", "");
                            ev.target.value = parseFloat(ev.target.value);
                            ev.target.type = "number";
                            if (isNaN(ev.target.valueAsNumber)) {
                              formProps.setFieldValue(ev.target.name, "");
                            } else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                            if (ev.target.value.length > 3) ev.target.type = "text";
                          },
                          span: (
                            <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>
                              m<sup>2</sup>
                            </span>
                          ),
                          errors: "",
                        },
                        {
                          name: "plotSurfaceMin",
                          label: "Mínimo",
                          type: "text",
                          placeholder: "Escriba aquí",
                          value:
                            formProps.values.plotSurfaceMin === 0
                              ? ""
                              : formatCurrency(formProps.values.plotSurfaceMin),
                          onBlur: (ev) => {
                            ev.target.type = "text";
                            ev.target.value = formatCurrency(ev.target.value);
                          },
                          onChange: (ev) => {
                            ev.target.value = ev.target.value.replaceAll(".", "");
                            ev.target.value = parseFloat(ev.target.value);
                            ev.target.type = "number";
                            if (isNaN(ev.target.valueAsNumber)) {
                              formProps.setFieldValue(ev.target.name, "");
                            } else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                            if (ev.target.value.length > 3) ev.target.type = "text";
                          },
                          span: (
                            <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>
                              m<sup>2</sup>
                            </span>
                          ),
                          errors: "",
                        },
                      ]}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button className="buttonForm" type="submit" form="NewRequestForm" style={{ marginRight: 8 }}>
                      {size < 480 ? (
                        <AiOutlineReload
                          style={{ marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }}
                        />
                      ) : (
                        <span>Aplicar filtros</span>
                      )}
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
        {loader ? (
          <Spinner />
        ) : (
          <div className={size < 440 ? "MatchedAd__container__col" : "MatchedAd__container__col--right"}>
            <DataTable
              value={adsMatched.length !== 0 ? adsMatched : ""}
              dataKey="_id"
              selectionMode="checkbox"
              selection={adsToSend}
              onSelectionChange={(ev) => {
                setAdsToSend(ev.value);
              }}
              responsiveLayout="scroll"
              emptyMessage="La petición no coincide con ningún anuncio."
              paginator
              rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}
            >
              <Column selectionMode="multiple" headerStyle={{ width: "1%" }}></Column>
              <Column
                field="adTitle"
                header="Título y dirección"
                body={(ev) => (
                  <div style={{ display: "flex", alignItems: "flex-start", textDecoration: "none" }}>
                    {size > 440 ? (
                      <>
                        {ev.images?.main ? (
                          <img
                            src={ev.images?.main}
                            alt={ev.images.title}
                            style={{ width: 81, height: 75, borderRadius: "4px" }}
                          />
                        ) : (
                          <img
                            src="\defaultImage.png"
                            alt="Imagen por defecto"
                            style={{ width: 81, height: 75, borderRadius: "4px" }}
                          />
                        )}

                        <Link to={`/anuncios/${ev._id}`} className="AdCard AdCard__row__title">
                          <p>{ev.title}</p>
                          {renderDirection(ev.adDirection)}
                        </Link>
                      </>
                    ) : (
                      <Link to={`/anuncios/${ev._id}`} className="AdCard AdCard__row__title">
                        <p>{ev.title}</p>
                        {renderDirection(ev.adDirection)}
                      </Link>
                    )}
                  </div>
                )}
                bodyStyle={{ width: "30%", verticalAlign: "top" }}
              ></Column>
              <Column
                field="buildingType"
                header="Inmueble"
                bodyStyle={{ width: "10%", verticalAlign: "top" }}
                body={(ev) => <div>{ev.adBuildingType.sort().join(", ")}</div>}
              ></Column>
              <Column
                field="adType"
                header="Anuncio"
                bodyStyle={{ width: "10%", verticalAlign: "top" }}
                body={(ev) => <div style={{ alignSelf: "flex-start" }}>{ev.adType.sort().join(", ")}</div>}
              ></Column>
              <Column
                field="sale.saleValue"
                header="Precio"
                bodyStyle={{ width: "10%", verticalAlign: "top" }}
                body={(ev) => <span>{maskValues(ev.sale.saleValue, "sale")}</span>}
              ></Column>
              <Column
                field="rent.rentValue"
                header="Alquiler"
                bodyStyle={{ width: "10%", verticalAlign: "top" }}
                body={(ev) => <span>{maskValues(ev.rent.rentValue, "rent")}</span>}
              ></Column>
              <Column
                field="buildSurface"
                header={() =>
                  size > 880 ? (
                    <>
                      m<sup>2</sup> construidos
                    </>
                  ) : (
                    <>Construido</>
                  )
                }
                bodyStyle={{ width: "10%", verticalAlign: "top" }}
                body={(ev) => <div>{maskValues(ev.buildSurface, "buildSurface")}</div>}
              ></Column>
              <Column
                field="plotSurface"
                header={() =>
                  size > 880 ? (
                    <>
                      m<sup>2</sup> parcela
                    </>
                  ) : (
                    <>Parcela</>
                  )
                }
                body={(ev) => <div>{maskValues(ev.plotSurface, "plotSurface")}</div>}
                bodyStyle={{ width: "10%", verticalAlign: "top" }}
              ></Column>
              <Column
                field="quality.parking"
                header="Plazas de garaje"
                bodyStyle={{ width: "10%", verticalAlign: "top", textAlign: "center" }}
                headerStyle={{ width: "10%" }}
              ></Column>
            </DataTable>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchedAdCard;
