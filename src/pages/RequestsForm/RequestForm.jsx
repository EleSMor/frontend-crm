import React, { useState, useEffect, useContext } from "react";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { TabView, TabPanel } from "primereact/tabview";
import { Select, MultiSelect, RequestsMatching } from "../../components";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import GoBack from "../../components/GoBack/GoBack";
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
      <Layout subTitle="Peticiones" subUndertitle={<GoBack />} subLocation="/peticiones/crear">
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

                  if (!id && selectedContact.length !== 0 && selectedConsultant.length !== 0) {
                    createRequest(data).then(() => history.push("/peticiones"));
                  } else if (id)
                    updateRequest(data).then(() => {
                      alert(`La Petici??n ${requestById.requestReference} ha sido actualizada`);
                      history.push("/peticiones");
                    });
                }}
              >
                {(formProps) => (
                  <Form>
                    <div>
                      <label required htmlFor="requestContact">
                        Contacto
                      </label>
                      <Select
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
                      <label required htmlFor="requestConsultant">
                        Consultor
                      </label>
                      <Select
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
                      <label htmlFor="adType">
                        Tipo de anuncio
                        <div>
                          <input
                            type="checkbox"
                            required={selectedAdType.length === 0 ? true : false}
                            checked={selectedAdType.includes("Alquiler") ? true : ""}
                            onChange={(ev) => newSelect(selectedAdType, setSelectedAdType, ev)}
                            name="requestAdType"
                            value="Alquiler"
                          />
                          <span>Alquiler</span>

                          <input
                            type="checkbox"
                            name="requestAdType"
                            required={selectedAdType.length === 0 ? true : false}
                            checked={selectedAdType.includes("Venta") ? true : ""}
                            onChange={(ev) => newSelect(selectedAdType, setSelectedAdType, ev)}
                            value="Venta"
                          />
                          <span>Venta</span>
                        </div>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="requestBuildingType" name="requestBuildingType">
                        Tipo de inmueble
                        <div>
                          <span>Casa</span>
                          <input
                            required={selectedBuildingType.length === 0 ? true : false}
                            type="checkbox"
                            onChange={(ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev)}
                            checked={selectedBuildingType.includes("Casa") ? true : ""}
                            value="Casa"
                          />
                          <span>Piso</span>
                          <input
                            type="checkbox"
                            required={selectedBuildingType.length === 0 ? true : false}
                            onChange={(ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev)}
                            checked={selectedBuildingType.includes("Piso") ? true : ""}
                            value="Piso"
                          />
                          <span>Parcela</span>
                          <input
                            type="checkbox"
                            required={selectedBuildingType.length === 0 ? true : false}
                            onChange={(ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev)}
                            checked={selectedBuildingType.includes("Parcela") ? true : ""}
                            value="Parcela"
                          />
                          <span>??tico</span>
                          <input
                            type="checkbox"
                            required={selectedBuildingType.length === 0 ? true : false}
                            onChange={(ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev)}
                            checked={selectedBuildingType.includes("??tico") ? true : ""}
                            value="??tico"
                          />
                          <span>Oficina</span>
                          <input
                            type="checkbox"
                            required={selectedBuildingType.length === 0 ? true : false}
                            onChange={(ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev)}
                            checked={selectedBuildingType.includes("Oficina") ? true : ""}
                            value="Oficina"
                          />
                          <span>Edificio</span>
                          <input
                            type="checkbox"
                            required={selectedBuildingType.length === 0 ? true : false}
                            onChange={(ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev)}
                            checked={selectedBuildingType.includes("Edificio") ? true : ""}
                            value="Edificio"
                          />
                          <span>Local</span>
                          <input
                            type="checkbox"
                            required={selectedBuildingType.length === 0 ? true : false}
                            onChange={(ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev)}
                            checked={selectedBuildingType.includes("Local") ? true : ""}
                            value="Local"
                          />
                          <span>Campo R??stico</span>
                          <input
                            type="checkbox"
                            required={selectedBuildingType.length === 0 ? true : false}
                            onChange={(ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev)}
                            checked={selectedBuildingType.includes("Campo R??stico") ? true : ""}
                            value="Campo R??stico"
                          />
                          <span>Activos Singulares</span>
                          <input
                            type="checkbox"
                            required={selectedBuildingType.length === 0 ? true : false}
                            onChange={(ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev)}
                            checked={selectedBuildingType.includes("Activos Singulares") ? true : ""}
                            value="Activos Singulares"
                          />
                          <span>Costa</span>
                          <input
                            type="checkbox"
                            required={selectedBuildingType.length === 0 ? true : false}
                            onChange={(ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev)}
                            checked={selectedBuildingType.includes("Costa") ? true : ""}
                            value="Costa"
                          />
                        </div>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="requestReference">Id Petici??n</label>
                      <input type="text" name="requestReference" value={formProps.values.requestReference} disabled />
                    </div>
                    <div>
                      <label htmlFor="requestComment">Comentarios</label>
                      <textarea
                        name="requestComment"
                        onChange={(ev) => {
                          formProps.setFieldValue(ev.target.name, ev.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="residentialZone">Zonas residencial</label>
                      <MultiSelect
                        list={residentials}
                        fields={{ groupBy: "zone", text: "name", value: "_id" }}
                        fn={setResidentialSelectedZones}
                        defaultValues={validateZone(residentials) ? requestById.requestZone : ""}
                      />
                    </div>
                    <div>
                      <label htmlFor="patrimonialZone">Zonas patrimonial</label>
                      <MultiSelect
                        list={patrimonials}
                        fields={{ groupBy: "zone", text: "name", value: "_id" }}
                        fn={setPatrimonialSelectedZones}
                        defaultValues={validateZone(patrimonials) ? requestById.requestZone : ""}
                      />
                    </div>
                    <div>
                      <div className="">
                        <h4>Precio de venta</h4>
                        <label htmlFor="salePriceMax">M??ximo</label>
                        <input
                          type="number"
                          name="salePriceMax"
                          value={formProps.values.salePriceMax}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                        ???<label htmlFor="salePriceMin">M??nimo</label>
                        <input
                          type="number"
                          name="salePriceMin"
                          value={formProps.values.salePriceMin}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                        ???
                      </div>
                    </div>
                    <div>
                      <div className="">
                        <h4>Precio de alquiler</h4>
                        <label htmlFor="rentPriceMax">M??ximo</label>
                        <input
                          type="number"
                          name="rentPriceMax"
                          value={formProps.values.rentPriceMax}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                        ???<label htmlFor="rentPriceMin">M??nimo</label>
                        <input
                          type="number"
                          name="rentPriceMin"
                          value={formProps.values.rentPriceMin}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                        ???
                      </div>
                    </div>
                    <div>
                      <div className="">
                        <h4>Superficie construida</h4>
                        <label htmlFor="buildSurfaceMax">M??ximo</label>
                        <input
                          type="number"
                          name="buildSurfaceMax"
                          value={formProps.values.buildSurfaceMax}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                        m2
                        <label htmlFor="buildSurfaceMin">M??nimo</label>
                        <input
                          type="number"
                          name="buildSurfaceMin"
                          value={formProps.values.buildSurfaceMin}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                        m2
                      </div>
                    </div>
                    <div>
                      <div className="">
                        <h4>Superficie de parcela</h4>
                        <label htmlFor="plotSurfaceMax">M??ximo</label>
                        <input
                          type="number"
                          name="plotSurfaceMax"
                          value={formProps.values.plotSurfaceMax}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                        m2
                        <label htmlFor="plotSurfaceMin">M??nimo</label>
                        <input
                          type="number"
                          name="plotSurfaceMin"
                          value={formProps.values.plotSurfaceMin}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                        m2
                      </div>
                    </div>
                    <div>
                      <div className="">
                        <h4>N??mero de dormitorios</h4>
                        <label htmlFor="bedroomsMax">M??ximo</label>
                        <input
                          type="number"
                          name="bedroomsMax"
                          value={formProps.values.bedroomsMax}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                        m2
                        <label htmlFor="bedroomsMin">M??nimo</label>
                        <input
                          type="number"
                          name="bedroomsMin"
                          value={formProps.values.bedroomsMin}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                        m2
                      </div>
                    </div>
                    <div>
                      <div className="">
                        <h4>N??mero de ba??os</h4>
                        <label htmlFor="bathroomsMax">M??ximo</label>
                        <input
                          type="number"
                          name="bathroomsMax"
                          value={formProps.values.bathroomsMax}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                        <label htmlFor="bathroomsMin">M??nimo</label>
                        <input
                          type="number"
                          name="bathroomsMin"
                          value={formProps.values.bathroomsMin}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                      </div>
                    </div>
                    <button type="submit">Guardar</button>

                    <NavLink to="/peticiones">
                      <button>Cancelar</button>
                    </NavLink>
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
