import React, { useState, useEffect, useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { Formik, Form } from "formik";
import { Select, Navbar, SubHeader } from "../../components";
import { getAllConsultants } from "../../api/consultants.api";
import { getAllResidentialZones, getAllPatrimonialZones } from "../../api/zones.api";
import { getAllContacts } from "../../api/contacts.api";
import { createRequest, getLastReference, getAllRequests } from "../../api/requests.api";
import { UserContext } from "../../components/Context/AuthUser";

const RequestForm = () => {
  const [requests, setRequests] = useState([]);
  const history = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => getAllRequests().then((res) => setRequests(res)), []);

  const [request, setRequest] = useState({
    requestContact: "",
    requestConsultant: "",
    requestComment: "",
    requestAdType: "",
    requestBuildingType: "",
    requestReference: "",
    residential: "",
    patrimonial: "",
    salePriceMax: "",
    salePriceMin: "",
    rentPriceMax: "",
    rentPriceMin: "",
    buildSurfaceMax: "",
    buildSurfaceMin: "",
    plotSurfaceMax: "",
    plotSurfaceMin: "",
    bedroomsMax: "",
    bedroomsMin: "",
    bathroomsMax: "",
    bathroomsMin: "",
  });

  const [reference, setReference] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [selectedContact, setSelectedContact] = useState([]);
  const [selectedConsultant, setSelectedConsultant] = useState([]);
  const [selectedBuildingType, setSelectedBuildingType] = useState([]);
  const [selectedAdType, setSelectedAdType] = useState([]);
  const [residentials, setResidential] = useState([]);
  const [patrimonials, setPatrimonial] = useState([]);
  const [residentialSelectedZones, setResidentialSelectedZones] = useState([]);
  const [patrimonialSelectedZones, setPatrimonialSelectedZones] = useState([]);

  useEffect(() => {
    getAllContacts().then((res) => setContacts(res));
    getAllConsultants().then((res) => setConsultants(res));
    getAllResidentialZones().then((res) => setResidential(res));
    getAllPatrimonialZones().then((res) => setPatrimonial(res));
    getLastReference().then((res) => setReference(res));
  }, []);

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
      <Navbar />
      <SubHeader title="Peticiones" list={requests} />
      <Formik
        initialValues={request}
        onSubmit={(data) => {
          data.requestContact = selectedContact;
          data.requestConsultant = selectedConsultant;
          data.requestAdType = selectedAdType;
          data.requestBuildingType = selectedBuildingType;
          data.residential = residentialSelectedZones;
          data.patrimonial = patrimonialSelectedZones;
          data.requestReference = reference;

          createRequest(data);
          history.push("/requests");
        }}
      >
        {(formProps) => (
          <Form>
            <div>
              <label htmlFor="contact">Contacto</label>
              <select onChange={(ev) => setSelectedContact(ev.target.value)}>
                <option value="" hidden>
                  Seleccionar
                </option>
                {contacts &&
                  contacts.map((contact, index) => {
                    return (
                      <option value={`${contact._id}`} key={`${index}-${contact}`}>
                        {contact.fullName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <label htmlFor="consultant">Consultor</label>
              <select onChange={(ev) => setSelectedConsultant(ev.target.value)}>
                <option value="" hidden>
                  Seleccionar
                </option>
                {consultants &&
                  consultants.map((consultant, index) => {
                    return (
                      <option value={`${consultant._id}`} key={`${index}-${consultant}`}>
                        {consultant.fullName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <label htmlFor="adType" onChange={(ev) => newSelect(selectedAdType, setSelectedAdType, ev)}>
                Tipo de anuncio
                <div>
                  <input type="checkbox" value="Alquiler" />
                  <span>Alquiler</span>

                  <input type="checkbox" value="Venta" />
                  <span>Venta</span>
                </div>
              </label>
            </div>
            <div>
              <label
                htmlFor="adBuildingType"
                name="adBuildingType"
                onChange={(ev) => newSelect(selectedBuildingType, setSelectedBuildingType, ev)}
              >
                Tipo de inmueble
                <div>
                  <input type="checkbox" value="Casa" />
                  <span>Casa</span>
                  <input type="checkbox" value="Piso" />
                  <span>Piso</span>
                  <input type="checkbox" value="Parcela" />
                  <span>Parcela</span>
                  <input type="checkbox" value="Ático" />
                  <span>Ático</span>
                  <input type="checkbox" value="Oficina" />
                  <span>Oficina</span>
                  <input type="checkbox" value="Edificio" />
                  <span>Edificio</span>
                  <input type="checkbox" value="Local" />
                  <span>Local</span>
                  <input type="checkbox" value="Campo Rústico" />
                  <span>Campo Rústico</span>
                  <input type="checkbox" value="Activos Singulares" />
                  <span>Activos Singulares</span>
                  <input type="checkbox" value="Costa" />
                  <span>Costa</span>
                </div>
              </label>
            </div>
            <div>
              <label htmlFor="requestReference">Id Petición</label>
              <input type="text" name="requestReference" value={`${reference}`} disabled />
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
              <Select
                list={residentials}
                fields={{ groupBy: "zone", text: "name", value: "_id" }}
                fn={setResidentialSelectedZones}
              />
            </div>
            <div>
              <label htmlFor="patrimonialZone">Zonas patrimonial</label>
              <Select
                list={patrimonials}
                fields={{ groupBy: "zone", text: "name", value: "_id" }}
                fn={setPatrimonialSelectedZones}
              />
            </div>
            <div>
              <div className="">
                <h2>Precio de venta</h2>
                <label htmlFor="salePriceMax">Máximo</label>
                <input
                  type="number"
                  name="salePriceMax"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                €<label htmlFor="salePriceMin">Mínimo</label>
                <input
                  type="number"
                  name="salePriceMin"
                  defaultValue={request.requestSalePriceMin ? request.requestSalePriceMin : ""}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                €
              </div>
            </div>
            <div>
              <div className="">
                <h2>Precio de alquiler</h2>
                <label htmlFor="rentPriceMax">Máximo</label>
                <input
                  type="number"
                  name="rentPriceMax"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                €<label htmlFor="rentPriceMin">Mínimo</label>
                <input
                  type="number"
                  name="rentPriceMin"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                €
              </div>
            </div>
            <div>
              <div className="">
                <h2>Superficie construida</h2>
                <label htmlFor="buildSurfaceMax">Máximo</label>
                <input
                  type="number"
                  name="buildSurfaceMax"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                m2
                <label htmlFor="buildSurfaceMin">Mínimo</label>
                <input
                  type="number"
                  name="buildSurfaceMin"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                m2
              </div>
            </div>
            <div>
              <div className="">
                <h2>Superficie de parcela</h2>
                <label htmlFor="plotSurfaceMax">Máximo</label>
                <input
                  type="number"
                  name="plotSurfaceMax"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                m2
                <label htmlFor="plotSurfaceMin">Mínimo</label>
                <input
                  type="number"
                  name="plotSurfaceMin"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                m2
              </div>
            </div>
            <div>
              <div className="">
                <h2>Número de dormitorios</h2>
                <label htmlFor="bedroomsMax">Máximo</label>
                <input
                  type="number"
                  name="bedroomsMax"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                m2
                <label htmlFor="bedroomsMin">Mínimo</label>
                <input
                  type="number"
                  name="bedroomsMin"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                m2
              </div>
            </div>
            <div>
              <div className="">
                <h2>Número de baños</h2>
                <label htmlFor="bathroomsMax">Máximo</label>
                <input
                  type="number"
                  name="bathroomsMax"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="bathroomsMin">Mínimo</label>
                <input
                  type="number"
                  name="bathroomsMin"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
            </div>
            <button type="submit">Guardar</button>

            <button>
              <NavLink to="/requests">Cancelar</NavLink>
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RequestForm;
