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
import PopUp from "../../components/PopUp/PopUp";
import useWindowSize from "../../hooks/useWindowSize";
import { getAdsMatched, sendNewRequest, getRequestById } from "../../api/requests.api";
import { sendAdsToContact } from "../../api/mails.api";
import { GvreLogo } from "../../icons/index";
import "reactjs-popup/dist/index.css";
import "moment/locale/es";
import "./MatchedAdCard.scss";

const MatchedAdCard = ({ patrimonials, residentials }) => {
  const [adsMatched, setAdsMatched] = useState([]);
  const [requestById, setRequestById] = useState([]);
  const [adsToSend, setAdsToSend] = useState([]);
  const [residentialSelectedZones, setResidentialSelectedZones] = useState([]);
  const [patrimonialSelectedZones, setPatrimonialSelectedZones] = useState([]);
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

  if (id && requestById.length !== 0 && residentials.length !== 0 && patrimonials.length !== 0 && !loader) {
    for (let zone of residentials) {
      if (requestById.requestZone.includes(zone._id) && !residentialSelectedZones.includes(zone._id)) {
        setResidentialSelectedZones([...residentialSelectedZones, zone._id]);
      }
    }
    for (let zone of patrimonials) {
      if (requestById.requestZone.includes(zone._id) && !patrimonialSelectedZones.includes(zone._id)) {
        setPatrimonialSelectedZones([...patrimonialSelectedZones, zone._id]);
      }
    }
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
            height="85%"
            mobileHeight="85%"
            width="30%"
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
                      consultant: user.email,
                      contact: requestById.requestContact,
                      message: document.getElementById("mailMessage").value,
                      ads: adsToSend,
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
            <div style={{ border: "1px solid lightgrey", marginTop: 16 }}>
              <textarea
                id="mailMessage"
                style={{
                  padding: "24px 24px 0 24px",
                  width: "100%",
                  border: "none",
                  resize: "none",
                  height: "10%",
                  alignSelf: "start",
                  fontSize: 12,
                  marginBottom: 24,
                }}
                defaultValue={
                  adsToSend.length === 1
                    ? `Estimado/a ${requestById.requestContact.fullName}, le envío el siguiente inmueble que puede resultarle interesante según la petición que ha realizado`
                    : `Estimado/a ${requestById.requestContact.fullName}, le envío los siguientes inmuebles que pueden resultarle interesantes según la petición que ha realizado`
                }
                onChange={(ev) => console.log(ev.target.value)}
              />
              {adsToSend.map((ad, index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "solid 1px lightgrey",
                      padding: index === 0 ? `0px 24px 24px 24px` : `24px 24px 24px 24px`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "space-between",
                        width: "58%",
                      }}
                    >
                      <div style={{ width: "100%" }}>
                        <h3 style={{ textAlign: "start", marginBottom: 12, fontSize: "200%" }}>{ad.title}</h3>
                        <h4 style={{ textAlign: "start", fontWeight: "bold", marginBottom: 12, fontSize: "150%" }}>
                          {maskTemplate(ad.sale.saleValue, "sale")}
                        </h4>
                        <h5 style={{ textAlign: "start", marginBottom: 12, fontSize: "125%" }}>
                          {ad.adDirection.city}
                        </h5>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "start",
                            justifyContent: "start",
                            width: "100%",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <BiArea style={{ transform: "scale(140%)" }} />
                            <span style={{ marginLeft: 8, fontSize: "100%" }}>
                              {maskValues(ad.plotSurface, "plotSurface")}
                            </span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", marginLeft: "4%" }}>
                            <AiOutlineHome style={{ transform: "scale(140%)" }} />
                            <span style={{ marginLeft: 8, fontSize: "100%" }}>
                              {maskValues(ad.buildSurface, "buildSurface")}
                            </span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", marginLeft: "4%" }}>
                            <FaSwimmingPool style={{ transform: "scale(140%)" }} />
                            <span style={{ marginLeft: 8, fontSize: "100%" }}>{ad.quality.indoorPool}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", marginLeft: "4%" }}>
                            <FaBath style={{ transform: "scale(130%)" }} />
                            <span style={{ marginLeft: 8, fontSize: "100%" }}>{ad.quality.bathrooms}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", marginLeft: "4%" }}>
                            <FaBed style={{ transform: "scale(150%)" }} />
                            <span style={{ marginLeft: 8, fontSize: "100%" }}>{ad.quality.bedrooms}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        style={{ margin: "16px 6px 0 0", alignSelf: "end" }}
                        className="buttonForm"
                        onClick={() => history.push(`/anuncios/${ad._id}`)}
                      >
                        Consultar
                      </button>
                    </div>
                    {ad.images.main ? (
                      <img src={ad.images.main} alt="Imagen principal" style={{ width: "40%" }} />
                    ) : (
                      <img
                        src="\defaultImage.png"
                        alt="Imagen por defecto"
                        style={{
                          width: "25%",
                          height: "100%",
                          borderRadius: "4px",
                          marginRight: 12,
                          marginLeft: "10%",
                        }}
                      />
                    )}
                  </div>
                );
              })}
              <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: 24, fontSize: 12 }}>
                <GvreLogo
                  style={{
                    width: "8%",
                    color: "#2B363D",
                    bottom: "-52%",
                    left: "-78%",
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                  <p
                    style={{
                      fontFamily: "Jost",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: size > 800 ? 14 : 12,
                      lineHeight: 1.5,
                    }}
                  >
                    +34 917 36 53 85
                  </p>
                  <p
                    style={{
                      fontFamily: "Jost",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: size > 800 ? 14 : 12,
                      lineHeight: 1.5,
                    }}
                  >
                    info@gvre.es
                  </p>
                  <p
                    style={{
                      fontFamily: "Jost",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: size > 800 ? 14 : 12,
                      lineHeight: 1.5,
                    }}
                  >
                    C. de Bailén, 41, 28005 Madrid
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                  <p
                    style={{
                      fontFamily: "Jost",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: size > 800 ? 14 : 12,
                      lineHeight: 1.5,
                    }}
                  >
                    +34 917 36 53 85
                  </p>
                  <p
                    style={{
                      fontFamily: "Jost",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: size > 800 ? 14 : 12,
                      lineHeight: 1.5,
                    }}
                  >
                    info@gvre.es
                  </p>
                  <p
                    style={{
                      fontFamily: "Jost",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: size > 800 ? 14 : 12,
                      lineHeight: 1.5,
                    }}
                  >
                    C. de la Isla de Oza, 16, 28035 Madrid
                  </p>
                </div>
              </div>
              <div style={{ color: "#B1B1B1", marginTop: 24 }}>
                Si desea dejar de recibir este tipo de email, puede{" "}
                <span style={{ color: "inherit", textDecoration: "underline", cursor: "pointer" }}>
                  darse de baja aquí
                </span>
              </div>
            </div>
          </PopUp>
        )}
        {/* <Popup trigger={<button className="button">Trigger</button>} modal position="top center">
          {(close) => (
            <div stlye={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p style={{ fontWeight: "bold", fontSize: "80%" }}>¿Salir sin guardar cambios?</p>
                <div className="close" onClick={close}>
                  <GrFormClose />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                <button className="buttonFormExit">Salir</button>
                <button className="buttonFormSave">Guardar y salir</button>
              </div>
            </div>
          )}
        </Popup> */}
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

              if (patrimonialSelectedZones.length === 0 && residentialSelectedZones.length === 0 && data.requestZone) {
                data.requestZone = [];
              }

              if (data.salePriceMax === "") data.salePriceMax = 99999999;
              if (data.salePriceMin === "") data.salePriceMin = 0;

              if (data.buildSurfaceMax === "") data.buildSurfaceMax = 9999;
              if (data.buildSurfaceMin === "") data.buildSurfaceMin = 0;
              if (data.plotSurfaceMax === "") data.plotSurfaceMax = 99999;
              if (data.plotSurfaceMin === "") data.plotSurfaceMin = 0;

              console.log(data);

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
                          placeholder: "€",
                          label: "Máximo",
                          type: "number",
                          value: formProps.values.salePriceMax,
                          onChange: (ev) => {
                            if (isNaN(ev.target.valueAsNumber)) formProps.setFieldValue(ev.target.name, "");
                            else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                          },
                          span: <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>€</span>,
                          errors: "",
                        },
                        {
                          name: "salePriceMin",
                          label: "Mínimo",
                          type: "number",
                          value: formProps.values.salePriceMin,
                          onChange: (ev) => {
                            if (isNaN(ev.target.valueAsNumber)) formProps.setFieldValue(ev.target.name, "");
                            else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
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
                          <GiPapers />
                          <span>Superficie construida</span>
                        </span>
                      }
                      inputs={[
                        {
                          name: "buildSurfaceMax",
                          label: "Máximo",
                          type: "number",
                          value: formProps.values.buildSurfaceMax,
                          onChange: (ev) => {
                            if (isNaN(ev.target.valueAsNumber)) formProps.setFieldValue(ev.target.name, "");
                            else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
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
                          value: formProps.values.buildSurfaceMin,
                          onChange: (ev) => {
                            if (isNaN(ev.target.valueAsNumber)) formProps.setFieldValue(ev.target.name, "");
                            else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
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
                          type: "number",
                          value: formProps.values.plotSurfaceMax,
                          onChange: (ev) => {
                            if (isNaN(ev.target.valueAsNumber)) formProps.setFieldValue(ev.target.name, "");
                            else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
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
                          type: "number",
                          value: formProps.values.plotSurfaceMin,
                          onChange: (ev) => {
                            if (isNaN(ev.target.valueAsNumber)) formProps.setFieldValue(ev.target.name, "");
                            else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
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
                bodyStyle={{ width: "35%", verticalAlign: "top" }}
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
                bodyStyle={{ width: "15%", verticalAlign: "top" }}
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
                field="buildingType"
                header="Inmueble"
                bodyStyle={{ width: "10%", verticalAlign: "top" }}
                body={(ev) => <div>{ev.adBuildingType.sort().join(", ")}</div>}
              ></Column>
            </DataTable>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchedAdCard;
