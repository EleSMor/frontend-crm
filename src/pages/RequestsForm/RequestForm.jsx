import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { TabView, TabPanel } from "primereact/tabview";
import { Select, MultiSelect, RequestsMatching } from "../../components";
import PopUpExit from "../../components/PopUpExit/PopUpExit";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import GoBack from "../../components/GoBack/GoBack";
import { Accordion, AccordionTab } from "primereact/accordion";
import { UserContext } from "../../components/Context/AuthUser";
import Checkboxes from "../../components/CheckBox/Checkboxes";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Textarea/Textarea";
import InputsGroup from "../../components/InputsGroup/InputsGroup";
import Multicheckbox from "../../components/CheckBox/Multicheckbox";
import MatchedAdCard from "../../components/MatchedAdCard/MatchedAdCard";
import { AiOutlineLeft } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { RiMoneyEuroBoxLine } from "react-icons/ri";
import { BiBed } from "react-icons/bi";
import { GrRestroom } from "react-icons/gr";
import { BsCalendarX } from "react-icons/bs";
import { MdHeight } from "react-icons/md";
import { GiPapers } from "react-icons/gi";
import { getAllConsultants } from "../../api/consultants.api";
import { getAllResidentialZones, getAllPatrimonialZones } from "../../api/zones.api";
import { getAllContacts } from "../../api/contacts.api";
import useWindowSize from "../../hooks/useWindowSize";
import { createRequest, getLastReference, getRequestById, updateRequest, deleteRequest } from "../../api/requests.api";
import { checkSession } from "../../api/auth.api"
import "./RequestForm.scss";

const RequestForm = () => {
  const history = useHistory();
  const { user, deleteUser } = useContext(UserContext);
  const { id } = useParams();
  const size = useWindowSize();
  const [exit, setExit] = useState(false);

  const [reference, setReference] = useState(0);
  const [ads, setAds] = useState([]);
  const [requestById, setRequestById] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [selectedConsultant, setSelectedConsultant] = useState("");
  const [selectedBuildingType, setSelectedBuildingType] = useState([]);
  const [selectedAdType, setSelectedAdType] = useState([]);
  const [residentials, setResidential] = useState([]);
  const [patrimonials, setPatrimonial] = useState([]);
  const [residentialSelectedZones, setResidentialSelectedZones] = useState([]);
  const [patrimonialSelectedZones, setPatrimonialSelectedZones] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loader, setLoader] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [validateForm, setValidateForm] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [popUpButtons, setPopUpButtons] = useState(
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 24 }}>
      <button
        style={{
          cursor: "pointer",
          padding: size < 426 ? "8% 20%" : "2% 15%",
          color: "#2B363D",
          backgroundColor: "white",
          border: "1px solid #5C5C5C",
          borderRadius: 3,
          fontWeight: "bold",
          fontSize: 12,
          marginRight: "5%",
        }}
        onClick={() => {
          setExit(true);
          handlePopUp();
          history.push("/peticiones");
        }}
      >
        Salir
      </button>
      <button
        style={{
          padding: size < 426 ? "4% 20%" : "2% 10%",
          color: "white",
          backgroundColor: "#2B363D",
          border: "1px solid #5C5C5C",
          borderRadius: 3,
          fontWeight: "bold",
          fontSize: 12,
        }}
        type="submit"
        onClick={() => {
          document.getElementById("form").handleSubmit();
          setExit(true);
          history.push("/peticiones");
        }}
      >
        Guardar y salir
      </button>
    </div>
  );
  const handlePopUp = () => {
    setPopUp(!popUp);
    setExit(false);
  };

  const validateZone = (zones) => {
    if (id && requestById.length !== 0) {
      return zones.some((zone) => requestById.requestZone.includes(zone._id));
    } else return "";
  };

  const getFetchs = () => {
    getAllConsultants().then((res) => setConsultants(res));
    getAllContacts()
      .then((res) => setContacts(res))
      .then(() => {
        if (id) {
          getRequestById(id).then((res) => {
            setRequestById(res);
            setSelectedContact(res.requestContact?._id);
            setSelectedConsultant(res.requestConsultant?._id);
            setSelectedBuildingType(res.requestBuildingType);
            setSelectedAdType(res.requestAdType);
          });
        } else getLastReference().then((res) => setReference(res));
      })
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
        if (id && requestById.length !== 0 && residentials.length !== 0 && patrimonials.length !== 0) {
          setLoader(false);
        } else if (!id) setLoader(false);
      });
  };

  useEffect(() => {
    checkSession().then((res) => {
      if (res === "Acceso restringido") {
        deleteUser();
        history.push("/");
      }
    });
  }, []);

  useEffect(() => {
    getFetchs();
  }, [id, activeIndex]);

  const checkIfIncludes = (origin, text) => {
    return origin
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes(
        text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      );
  };

  if (
    firstLoad === true &&
    id &&
    requestById.length !== 0 &&
    residentials.length !== 0 &&
    patrimonials.length !== 0 &&
    validateForm === false
  ) {
    for (let zone of residentials) {
      if (requestById.requestZone.includes(zone._id) && !residentialSelectedZones.includes(zone._id)) {
        residentialSelectedZones.push(zone._id);
      }
    }
    for (let zone of patrimonials) {
      if (requestById.requestZone.includes(zone._id) && !patrimonialSelectedZones.includes(zone._id)) {
        patrimonialSelectedZones.push(zone._id);
      }
    }
    setFirstLoad(false);
  }

  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const newSelect = (selected, setSelected, ev) => {
    if (selected.includes(ev.target.value)) {
      const newSelected = selected.filter((selected) => selected !== ev.target.value);
      setSelected(newSelected);
    } else {
      setSelected([...selected, ev.target.value]);
    }
  };

  const saveAndExit = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 24 }}>
        <button
          style={{
            cursor: "pointer",
            padding: size < 426 ? "8% 20%" : "2% 15%",
            color: "#2B363D",
            backgroundColor: "white",
            border: "1px solid #5C5C5C",
            borderRadius: 3,
            fontWeight: "bold",
            fontSize: 12,
            marginRight: "5%",
          }}
          onClick={() => {
            setExit(true);
            handlePopUp();
            history.push("/peticiones");
          }}
        >
          Salir
        </button>
        <button
          style={{
            padding: size < 426 ? "4% 20%" : "2% 10%",
            color: "white",
            backgroundColor: "#2B363D",
            border: "1px solid #5C5C5C",
            borderRadius: 3,
            fontWeight: "bold",
            fontSize: 12,
          }}
          type="submit"
          onClick={() => {
            setExit(true);
            handlePopUp();
            history.push("/peticiones");
          }}
        >
          Guardar y salir
        </button>
      </div>
    );
  };

  const saveAndReturn = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 24 }}>
        <button
          type="button"
          style={{
            cursor: "pointer",
            padding: size < 426 ? "8% 20%" : "2% 15%",
            color: "#2B363D",
            backgroundColor: "white",
            border: "1px solid #5C5C5C",
            borderRadius: 3,
            fontWeight: "bold",
            fontSize: 12,
            marginRight: "5%",
          }}
          onClick={() => {
            setExit(true);
            handlePopUp();
            history.goBack();
          }}
        >
          Volver
        </button>
        <button
          style={{
            padding: size < 426 ? "4% 20%" : "2% 10%",
            color: "white",
            backgroundColor: "#2B363D",
            border: "1px solid #5C5C5C",
            borderRadius: 3,
            fontWeight: "bold",
            fontSize: 12,
          }}
          type="submit"
          form="RequestForm"
          onClick={() => {
            setExit(true);
            history.goBack();
          }}
        >
          Guardar y volver
        </button>
      </div>
    );
  };

  return (
    <>
      {user.length === 0 && history.push("/")}
      <Layout
        subTitle="Peticiones"
        subUndertitle={
          <div onClick={handlePopUp}>
            <button
              className="GoBack"
              onClick={() => {
                // if (activeIndex === 0) setPopUpButtons(saveAndReturn);
                // else history.goBack();
                history.goBack();
              }}
            >
              <AiOutlineLeft fontSize={"0.8em"} style={{ marginRight: 5, color: "#5C5C5C" }} />
              Volver
            </button>
          </div>
        }
        subBreadcrumbs={id ? `Petición ${requestById.requestReference}` : "Crear nueva petición"}
        footContent={
          <>
            <button className="buttonForm" type="submit" form="RequestForm" style={{ marginRight: 8 }}>
              <FiSave
                style={
                  size > 480
                    ? { marginRight: 7 }
                    : { marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }
                }
              />
              {size > 480 && "Guardar"}
            </button>
            <button
              className="buttonFormCancel"
              onClick={() => {
                // if (activeIndex === 0) {
                //   setPopUpButtons(saveAndExit);
                // } else history.push("/peticiones");
                history.push("/peticiones");
              }}
            >
              Cancelar
            </button>
            {id && user.role !== "Consultor" && (
              <button
                className="buttonFormDelete"
                onClick={() =>
                  deleteRequest(id).then(() => {
                    alert("Petición borrada correctamente");
                    history.push("/peticiones");
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
                  id: requestById.length !== 0 ? requestById._id : "",
                  requestReference: requestById.length !== 0 ? requestById.requestReference : reference,
                  requestContact: requestById.length !== 0 ? selectedContact : "",
                  requestConsultant: requestById.length !== 0 ? selectedConsultant : "",
                  requestAdType: requestById.length !== 0 ? requestById.requestAdType : [],
                  requestComment: requestById.length !== 0 ? requestById.requestComment : "",
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
                  setValidateForm(true);
                  if (id) data.id = id;
                  data.requestContact = selectedContact;
                  data.requestConsultant = selectedConsultant;
                  data.requestAdType = selectedAdType;
                  data.requestBuildingType = selectedBuildingType;

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
                  if (data.bedroomsMax === "") data.bedroomsMax = 99;
                  if (data.bedroomsMin === "") data.bedroomsMin = 0;
                  if (data.bathroomsMax === "") data.bathroomsMax = 99;
                  if (data.bathroomsMin === "") data.bathroomsMin = 0;

                  if (data.requestZone.length !== 0) {
                    if (!id && selectedContact.length !== 0 && selectedConsultant.length !== 0) {
                      createRequest(data).then((res) => {
                        alert(`La Petición ${res.requestReference} ha sido creada`);
                        history.push("/peticiones");
                      });
                    } else if (id)
                      updateRequest(data).then(() => {
                        alert(`La Petición ${requestById.requestReference} ha sido actualizada`);
                      });
                  } else alert(`Debe seleccionar al menos una zona`);
                }}
              >
                {(formProps) => (
                  <Form id="RequestForm" className="RequestForm">
                    {/* {popUp && (
                      <PopUpExit
                        handlePopUp={handlePopUp}
                        height="20%"
                        mobileHeight="20%"
                        width="30%"
                        title="¿Salir sin guardar cambios?"
                      >
                        {popUpButtons}
                      </PopUpExit>
                    )} */}
                    <div className="RequestForm__container">
                      <div className="RequestForm__container__col">
                        <div>
                          <Select
                            label="Contacto"
                            list={contacts}
                            fields={{ groupBy: "", text: "fullName", value: "_id" }}
                            filter={(e) => {
                              const searchData = contacts.filter((contact) => {
                                if (
                                  checkIfIncludes(contact.fullName, e.text) ||
                                  checkIfIncludes(contact.email, e.text) ||
                                  checkIfIncludes(contact.company, e.text) ||
                                  checkIfIncludes(contact.contactMobileNumber, e.text)
                                )
                                  return contact;
                              });
                              if (searchData.length !== 0) e.updateData(searchData);
                              else e.updateData([]);
                            }}
                            fn={(e) => setSelectedContact(e.target.value)}
                            defaultValues={selectedContact ? selectedContact : ""}
                          />
                          {validateForm && selectedContact.length === 0 && (
                            <p style={{ color: "red" }}>* Seleccione un contacto</p>
                          )}
                        </div>
                        <div>
                          <Select
                            label="Consultor"
                            list={consultants}
                            fields={{ groupBy: "", text: "fullName", value: "_id" }}
                            filter={(e) => {
                              const searchData = consultants.filter((consultant) => {
                                if (
                                  checkIfIncludes(consultant.fullName, e.text) ||
                                  checkIfIncludes(consultant.consultantEmail, e.text) ||
                                  checkIfIncludes(consultant.consultantMobileNumber, e.text)
                                )
                                  return consultant;
                              });
                              if (searchData.length !== 0) e.updateData(searchData);
                              else e.updateData([]);
                            }}
                            fn={(e) => setSelectedConsultant(e.target.value)}
                            defaultValues={selectedConsultant ? selectedConsultant : ""}
                          />
                          {validateForm && selectedConsultant.length === 0 && (
                            <p style={{ color: "red" }}>* Seleccione un consultor</p>
                          )}
                        </div>
                        <div>
                          <Multicheckbox
                            label="Tipo de inmueble"
                            required={selectedBuildingType.length === 0 ? true : false}
                            inputs={[
                              {
                                value: "Casa",
                                checked: selectedBuildingType.includes("Casa") ? true : "",
                                onChange: (ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev),
                              },
                              {
                                value: "Piso",
                                checked: selectedBuildingType.includes("Piso") ? true : "",
                                onChange: (ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev),
                              },
                              {
                                value: "Parcela",
                                checked: selectedBuildingType.includes("Parcela") ? true : "",
                                onChange: (ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev),
                              },
                              {
                                value: "Ático",
                                checked: selectedBuildingType.includes("Ático") ? true : "",
                                onChange: (ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev),
                              },
                              {
                                value: "Oficina",
                                checked: selectedBuildingType.includes("Oficina") ? true : "",
                                onChange: (ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev),
                              },
                              {
                                value: "Edificio",
                                checked: selectedBuildingType.includes("Edificio") ? true : "",
                                onChange: (ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev),
                              },
                              {
                                value: "Local",
                                checked: selectedBuildingType.includes("Local") ? true : "",
                                onChange: (ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev),
                              },
                              {
                                value: "Campo Rústico",
                                checked: selectedBuildingType.includes("Campo Rústico") ? true : "",
                                onChange: (ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev),
                              },
                              {
                                value: "Activos singulares",
                                checked: selectedBuildingType.includes("Activos singulares") ? true : "",
                                onChange: (ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev),
                              },
                              {
                                value: "Costa",
                                checked: selectedBuildingType.includes("Costa") ? true : "",
                                onChange: (ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev),
                              },
                            ]}
                          />
                        </div>
                      </div>

                      <div className="RequestForm__container__col">
                        <div>
                          <Checkboxes
                            label="Tipo de anuncio"
                            textA="Alquiler"
                            valueA="Alquiler"
                            onChangeA={(ev) => newSelect(selectedAdType, setSelectedAdType, ev)}
                            checkedA={selectedAdType.includes("Alquiler") ? true : ""}
                            textB="Venta"
                            valueB="Venta"
                            onChangeB={(ev) => newSelect(selectedAdType, setSelectedAdType, ev)}
                            checkedB={selectedAdType.includes("Venta") ? true : ""}
                            required={selectedAdType.length === 0 ? true : false}
                          />
                        </div>
                        <div>
                          <Input
                            value={formProps.values.requestReference}
                            label="Id Petición"
                            name="requestReference"
                            placeholder="Escriba aquí"
                            readOnly={true}
                          />
                        </div>
                        <div>
                          <Textarea
                            label="Comentarios"
                            name="requestComment"
                            placeholder="Escriba aquí"
                            value={formProps.values.requestComment}
                            onChange={(ev) => {
                              formProps.setFieldValue("requestComment", ev.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* - ZONAS ----------------------------------------------------------------------- */}
                    <Accordion multiple>
                      <AccordionTab header="Zonas">
                        <div className="RequestForm__container">
                          <div className="RequestForm__container__col">
                            <MultiSelect
                              label="Residencial"
                              list={residentials}
                              fields={{ groupBy: "zone", text: "name", value: "_id" }}
                              onChange={(ev) => {
                                setResidentialSelectedZones(ev.value);
                              }}
                              value={validateZone(residentials) ? requestById.requestZone : []}
                            />

                            {validateForm &&
                              residentialSelectedZones.length === 0 &&
                              patrimonialSelectedZones.length === 0 && (
                                <p style={{ color: "red", textAlign: "start" }}>* Seleccione una zona</p>
                              )}
                          </div>
                          <div className="RequestForm__container__col">
                            <MultiSelect
                              label="Patrimonial"
                              list={patrimonials}
                              fields={{ groupBy: "zone", text: "name", value: "_id" }}
                              onChange={(ev) => {
                                setPatrimonialSelectedZones(ev.value);
                              }}
                              value={validateZone(patrimonials) ? requestById.requestZone : []}
                            />

                            {validateForm &&
                              residentialSelectedZones.length === 0 &&
                              patrimonialSelectedZones.length === 0 && (
                                <p style={{ color: "red", textAlign: "start" }}>* Seleccione una zona</p>
                              )}
                          </div>
                        </div>
                      </AccordionTab>
                      {/* - DETALLES ----------------------------------------------------------------------- */}
                      <AccordionTab header="Detalles">
                        <div className="RequestForm__container">
                          <div className="RequestForm__container__col">
                            <div className="RequestForm__container__col--item">
                              <InputsGroup
                                label={
                                  <span className="RequestForm__container__col--item-center">
                                    <RiMoneyEuroBoxLine />
                                    <span>Precio de venta</span>
                                  </span>
                                }
                                inputs={[
                                  {
                                    name: "salePriceMax",
                                    label: "Máximo",
                                    type: "text",
                                    placeholder: "Escriba aquí",
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
                                    span: <span style={{ position: "absolute", right: "1%", top: "52%" }}>€</span>,
                                    errors: "",
                                  },
                                  {
                                    name: "salePriceMin",
                                    label: "Mínimo",
                                    type: "text",
                                    placeholder: "Escriba aquí",
                                    value:
                                      formProps.values.salePriceMin === 0
                                        ? ""
                                        : formatCurrency(formProps.values.salePriceMin),
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
                                    span: <span style={{ position: "absolute", right: "1%", top: "52%" }}>€</span>,
                                    errors: "",
                                  },
                                ]}
                              />
                            </div>
                            <div className="RequestForm__container__col--item">
                              <InputsGroup
                                label={
                                  <span className="RequestForm__container__col--item-center">
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
                                      <span style={{ position: "absolute", right: "1%", top: "52%" }}>
                                        m<sup>2</sup>
                                      </span>
                                    ),
                                    errors: "",
                                  },
                                  {
                                    name: "buildSurfaceMin",
                                    label: "Mínimo",
                                    type: "text",
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
                                      <span style={{ position: "absolute", right: "1%", top: "52%" }}>
                                        m<sup>2</sup>
                                      </span>
                                    ),
                                    errors: "",
                                  },
                                ]}
                              />
                            </div>
                            <div className="RequestForm__container__col--item">
                              <InputsGroup
                                label={
                                  <span className="RequestForm__container__col--item-center">
                                    <BiBed />
                                    <span>Número de dormitorios</span>
                                  </span>
                                }
                                inputs={[
                                  {
                                    name: "bedroomsMax",
                                    label: "Máximo",
                                    type: "number",
                                    placeholder: "Escriba aquí",
                                    value: formProps.values.bedroomsMax === 99 ? "" : formProps.values.bedroomsMax,
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  },
                                  {
                                    name: "bedroomsMin",
                                    label: "Mínimo",
                                    type: "number",
                                    placeholder: "Escriba aquí",
                                    value: formProps.values.bedroomsMin === 0 ? "" : formProps.values.bedroomsMin,
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  },
                                ]}
                              />
                            </div>
                          </div>
                          <div className="RequestForm__container__col">
                            <div className="RequestForm__container__col--item">
                              <InputsGroup
                                label={
                                  <span className="RequestForm__container__col--item-center">
                                    <BsCalendarX />
                                    <span>Precio del alquiler</span>
                                  </span>
                                }
                                inputs={[
                                  {
                                    name: "rentPriceMax",
                                    label: "Máximo",
                                    type: "text",
                                    placeholder: "Escriba aquí",
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
                                    span: <span style={{ position: "absolute", right: "1%", top: "52%" }}>€/mes</span>,
                                    errors: "",
                                  },
                                  {
                                    name: "rentPriceMin",
                                    label: "Mínimo",
                                    type: "text",
                                    placeholder: "Escriba aquí",
                                    value:
                                      formProps.values.rentPriceMin === 0
                                        ? ""
                                        : formatCurrency(formProps.values.rentPriceMin),
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
                                    span: <span style={{ position: "absolute", right: "1%", top: "52%" }}>€/mes</span>,
                                    errors: "",
                                  },
                                ]}
                              />
                            </div>
                            <div className="RequestForm__container__col--item">
                              <InputsGroup
                                label={
                                  <span className="RequestForm__container__col--item-center">
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
                                      <span style={{ position: "absolute", right: "1%", top: "52%" }}>
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
                                      <span style={{ position: "absolute", right: "1%", top: "52%" }}>
                                        m<sup>2</sup>
                                      </span>
                                    ),
                                    errors: "",
                                  },
                                ]}
                              />
                            </div>
                            <div className="RequestForm__container__col--item">
                              <InputsGroup
                                label={
                                  <span className="RequestForm__container__col--item-center">
                                    <GrRestroom />
                                    <span>Número de cuartos de baño</span>
                                  </span>
                                }
                                inputs={[
                                  {
                                    name: "bathroomsMax",
                                    label: "Máximo",
                                    type: "number",
                                    value: formProps.values.bathroomsMax === 99 ? "" : formProps.values.bathroomsMax,
                                    placeholder: "Escriba aquí",
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  },
                                  {
                                    name: "bathroomsMin",
                                    label: "Mínimo",
                                    type: "number",
                                    placeholder: "Escriba aquí",
                                    value: formProps.values.bathroomsMin === 0 ? "" : formProps.values.bathroomsMin,
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  },
                                ]}
                              />
                            </div>
                          </div>
                        </div>
                      </AccordionTab>
                    </Accordion>
                  </Form>
                )}
              </Formik>
            </TabPanel>
            <TabPanel header="Matching">
              <MatchedAdCard patrimonials={patrimonials} residentials={residentials} requestById={requestById} />
            </TabPanel>
          </TabView>
        )}
      </Layout>
    </>
  );
};

export default RequestForm;
