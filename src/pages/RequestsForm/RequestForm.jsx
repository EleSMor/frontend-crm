import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { TabView, TabPanel } from "primereact/tabview";
import { Select, MultiSelect, RequestsMatching } from "../../components";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import GoBack from "../../components/GoBack/GoBack";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { FiSave } from "react-icons/fi";
import { getAllConsultants } from "../../api/consultants.api";
import { getAllResidentialZones, getAllPatrimonialZones } from "../../api/zones.api";
import { getAllContacts } from "../../api/contacts.api";
import {
  createRequest,
  getLastReference,
  getAllRequests,
  getAdsMatched,
  getRequestById,
  updateRequest,
} from "../../api/requests.api";
import { UserContext } from "../../components/Context/AuthUser";
import Checkboxes from "../../components/CheckBox/Checkboxes";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Textarea/Textarea";
import InputsGroup from "../../components/InputsGroup/InputsGroup";
import Multicheckbox from "../../components/CheckBox/Multicheckbox";
import { RiMoneyEuroBoxLine } from "react-icons/ri"
import { BiBed } from "react-icons/bi"
import { GrRestroom } from "react-icons/gr"
import { BsCalendarX } from "react-icons/bs"
import { MdHeight } from "react-icons/md"
import { GiPapers } from "react-icons/gi"
import "./RequestForm.scss"

const RequestForm = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [reference, setReference] = useState(0);
  const [requests, setRequests] = useState([]);
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
  const [loader, setLoader] = useState(true);
  const [validateForm, setValidateForm] = useState(false);

  const validateZone = (zones) => {
    if (id && requestById.length !== 0) return zones.some((zone) => requestById.requestZone.includes(zone._id));
    else return "";
  };

  const getFetchs = async () => {
    getAllRequests().then((res) => setRequests(res));
    getAllConsultants().then((res) => setConsultants(res));
    getLastReference().then((res) => setReference(res));
    getAllContacts()
      .then((res) => setContacts(res))
      .then(() => {
        if (id) {
          getRequestById(id).then((res) => {
            setRequestById(res);
            setSelectedContact([res.requestContact]);
            setSelectedConsultant([res.requestConsultant]);
            setSelectedBuildingType(res.requestBuildingType);
            setSelectedAdType(res.requestAdType);
          });
          getAdsMatched(id).then((res) => setAds(res));
        }
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
        if (id && requestById.length !== 0 && residentials.length !== 0 && patrimonials.length !== 0) setLoader(false);
        else if (!id) setLoader(false);
      });
  };

  useEffect(() => {
    getFetchs();
  }, [id]);

  const newSelect = (selected, setSelected, ev) => {
    if (selected.includes(ev.target.value)) {
      const newSelected = selected.filter((selected) => selected !== ev.target.value);
      setSelected(newSelected);
    } else {
      setSelected([...selected, ev.target.value]);
    }
  };

  return (
    <>
      {user.length === 0 && history.push("/")}
      <Layout
        subTitle="Peticiones"
        subUndertitle={<GoBack />}
        footContent={
          <>
            <button className="buttonForm" type="submit" form="RequestForm" style={{ marginRight: 8 }}>
              <FiSave style={{ marginRight: 7 }} />
              Guardar
            </button>
            <Link className="buttonFormCancel" to="/anuncios">
              Cancelar
            </Link>
          </>
        }
      >
        {residentialSelectedZones.length !== 0 && patrimonialSelectedZones.length !== 0 && loader ? (
          <Spinner />
        ) : (
          <TabView>
            <TabPanel header="Detalles">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  id: requestById.length !== 0 ? requestById._id : "",
                  requestReference: requestById.length !== 0 ? requestById.requestReference : reference,
                  requestContact: requestById.length !== 0 ? selectedContact : "",
                  requestConsultant: requestById.length !== 0 ? selectedConsultant : "",
                  requestAdType: requestById.length !== 0 ? selectedAdType : [],
                  requestComment: requestById.length !== 0 ? requestById.requestComment : "",
                  requestBuildingType: requestById.length !== 0 ? selectedBuildingType : [],
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
                  data.requestContact = selectedContact[0];
                  data.requestConsultant = selectedConsultant[0];
                  data.requestAdType = selectedAdType;
                  data.requestBuildingType = selectedBuildingType;
                  if (residentialSelectedZones.length !== 0) {
                    data.requestZone = residentialSelectedZones;
                  } else if (patrimonialSelectedZones.length !== 0) {
                    data.requestZone = patrimonialSelectedZones;
                  } else if (patrimonialSelectedZones.length === 0 && residentialSelectedZones.length === 0) {
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
                        history.push("/peticiones");
                      });
                  } else alert(`Debe seleccionar al menos una zona`);

                }}
              >
                {(formProps) => (
                  <Form id="RequestForm" className="RequestForm">
                    <div className="RequestForm__container">
                      <div className="RequestForm__container__col">
                        <div>
                          <Select
                            label="Contacto"
                            list={contacts}
                            fields={{ groupBy: "", text: "fullName", value: "_id" }}
                            fn={setSelectedContact}
                            defaultValues={selectedContact}
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
                            fn={setSelectedConsultant}
                            defaultValues={selectedConsultant}
                          />
                          {validateForm && selectedConsultant.length === 0 && (
                            <p style={{ color: "red" }}>* Seleccione un consultor</p>
                          )}
                        </div>
                        <div>
                          <Multicheckbox
                            label="Tipo de inmueble"
                            required={selectedBuildingType.length === 0 ? true : false}
                            onChange={(ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev)}
                            inputs={[
                              {value: "Casa", checked: selectedBuildingType.includes("Casa") ? true : ""},
                              {value: "Piso", checked: selectedBuildingType.includes("Piso") ? true : ""},
                              {value: "Parcela", checked: selectedBuildingType.includes("Parcela") ? true : ""},
                              {value: "Ático", checked: selectedBuildingType.includes("Ático") ? true : ""},
                              {value: "Oficina", checked: selectedBuildingType.includes("Oficina") ? true : ""},
                              {value: "Edificio", checked: selectedBuildingType.includes("Edificio") ? true : ""},
                              {value: "Local", checked: selectedBuildingType.includes("Local") ? true : ""},
                              {value: "Campo Rústico", checked: selectedBuildingType.includes("Campo Rústico") ? true : ""},
                              {value: "Activos singulares", checked: selectedBuildingType.includes("Activos singulares") ? true : ""},
                              {value: "Costa", checked: selectedBuildingType.includes("Costa") ? true : ""},
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
                          />
                        </div>
                        <div>
                          {/* ELE -> textarea no tenía value. */}
                          <Textarea 
                            label="Comentarios"
                            name="requestComment"
                            placeholder="Escriba aquí"
                            onChange={(ev) => {
                              formProps.setFieldValue(ev.target.name, ev.target.value);
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
                              fn={setResidentialSelectedZones}
                              defaultValues={validateZone(residentials) ? requestById.requestZone : ""}
                            />
                          </div>
                          <div className="RequestForm__container__col">
                            <MultiSelect
                              label="Patrimonial"
                              list={patrimonials}
                              fields={{ groupBy: "zone", text: "name", value: "_id" }}
                              fn={setPatrimonialSelectedZones}
                              defaultValues={validateZone(patrimonials) ? requestById.requestZone : ""}
                            />
                          </div>
                        </div>
                      </AccordionTab>
{/* - DETALLES ----------------------------------------------------------------------- */}                   
                      <AccordionTab header="Detalles">
                        <div className="RequestForm__container">
                          <div className="RequestForm__container__col">
                            <div className="RequestForm__container__col--item">
                              <InputsGroup 
                                label={<span className="RequestForm__container__col--item-center">
                                <RiMoneyEuroBoxLine /><span>Precio de venta</span></span>}
                                inputs={[
                                  {
                                    name: "salePriceMax",
                                    label: "Máximo",
                                    type: "number",
                                    value: formProps.values.salePriceMax,
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  }, {
                                    name: "salePriceMin",
                                    label: "Mínimo",
                                    type: "number",
                                    value: formProps.values.salePriceMin,
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  },
                                ]}
                              />
                            </div>
                            <div className="RequestForm__container__col--item">
                              <InputsGroup 
                                label={<span className="RequestForm__container__col--item-center">
                                <GiPapers /><span>Superficie construida</span></span>}
                                inputs={[
                                  {
                                    name: "buildSurfaceMax",
                                    label: "Máximo",
                                    type: "number",
                                    value: formProps.values.buildSurfaceMax,
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  }, {
                                    name: "buildSurfaceMin",
                                    label: "Mínimo",
                                    type: "number",
                                    value: formProps.values.buildSurfaceMin,
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  },
                                ]}
                              />
                            </div>
                            <div className="RequestForm__container__col--item">
                              <InputsGroup 
                                label={<span className="RequestForm__container__col--item-center">
                                <BiBed /><span>Número de dormitorios</span></span>}
                                inputs={[
                                  {
                                    name: "bedroomsMax",
                                    label: "Máximo",
                                    type: "number",
                                    placeholder: "Escriba aquí",
                                    value: formProps.values.bedroomsMax,
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  }, {
                                    name: "bedroomsMin",
                                    label: "Mínimo",
                                    type: "number",
                                    placeholder: "Escriba aquí",
                                    value: formProps.values.bedroomsMin,
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
                                label={<span className="RequestForm__container__col--item-center">
                                <BsCalendarX /><span>Precio del alquiler</span></span>}
                                inputs={[
                                  {
                                    name: "rentPriceMax",
                                    label: "Máximo",
                                    type: "number",
                                    value: formProps.values.rentPriceMax,
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  }, {
                                    name: "rentPriceMin",
                                    label: "Mínimo",
                                    type: "number",
                                    value: formProps.values.rentPriceMin,
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  },
                                ]}
                              />
                            </div>
                            <div className="RequestForm__container__col--item">
                              <InputsGroup 
                                label={<span className="RequestForm__container__col--item-center">
                                <MdHeight /><span>Superficie de parcela</span></span>}
                                inputs={[
                                  {
                                    name: "plotSurfaceMax",
                                    label: "Máximo",
                                    type: "number",
                                    value: formProps.values.plotSurfaceMax,
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  }, {
                                    name: "plotSurfaceMin",
                                    label: "Mínimo",
                                    type: "number",
                                    value: formProps.values.plotSurfaceMin,
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  },
                                ]}
                              />
                            </div>
                            <div className="RequestForm__container__col--item">
                              <InputsGroup 
                                label={<span className="RequestForm__container__col--item-center">
                                <GrRestroom /><span>Número de cuartos de baño</span></span>}
                                inputs={[
                                  {
                                    name: "bathroomsMax",
                                    label: "Máximo",
                                    type: "number",
                                    value: formProps.values.bathroomsMax,
                                    placeholder: "Escriba aquí",
                                    onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                    errors: "",
                                  }, {
                                    name: "bathroomsMin",
                                    label: "Mínimo",
                                    type: "number",
                                    placeholder: "Escriba aquí",
                                    value: formProps.values.bathroomsMin,
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
              <RequestsMatching ads={ads} />
            </TabPanel>
          </TabView>
        )}
      </Layout>
    </>
  );
};

export default RequestForm;
