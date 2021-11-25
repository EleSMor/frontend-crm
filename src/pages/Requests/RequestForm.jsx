import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { NavLink, useHistory } from "react-router-dom";
import { getAllConsultants } from "../../api/consultants.api";
import { getAllResidentialZones, getAllPatrimonialZones } from "../../api/zones.api";
import { getAllContacts } from "../../api/contacts.api";
import { createRequest, getLastReference } from "../../api/requests.api";

const RequestForm = () => {
  const history = useHistory();
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
    getAllContacts().then((res) => setContacts(...contacts, res));
    getAllConsultants().then((res) => setConsultants(...consultants, res));
    getAllResidentialZones().then((res) => setResidential(...residentials, res));
    getAllPatrimonialZones().then((res) => setPatrimonial(...patrimonials, res));
    getLastReference().then((res) => setReference(res));
  }, []);

  return (
    <Formik
      initialValues={{
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
      }}
      onSubmit={(data) => {

        data.requestContact = selectedContact;
        data.requestConsultant = selectedConsultant;
        data.requestAdType = selectedAdType;
        data.requestBuildingType = selectedBuildingType;
        data.residential = residentialSelectedZones;
        data.patrimonial = patrimonialSelectedZones;
        data.requestReference = reference;
        
        console.log(data);

        createRequest(data);
        // history.push("/consultants");
      }}
    >
      {(formProps) => (
        <Form>
          <div>
            <label htmlFor="contact">Contacto</label>
            <select
              onChange={(ev) => {
                if (selectedContact.includes(ev.target.value)) {
                  const newSelectedContact = selectedContact.filter(
                    (selectedContact) => selectedContact !== ev.target.value
                  );
                  console.log(newSelectedContact);
                  setSelectedContact(newSelectedContact);
                } else {
                  setSelectedContact(ev.target.value);
                }
              }}
            >
              {contacts &&
                contacts.map((contact, index) => {
                  return <option value={`${contact._id}`} key={`${index}-${contact}`}>{contact.fullName}</option>;
                })}
            </select>
          </div>
          <div>
            <label htmlFor="consultant">Consultor</label>
            <select
              onChange={(ev) => {
                if (selectedConsultant.includes(ev.target.value)) {
                  const newSelectedConsultant = selectedConsultant.filter(
                    (selectedConsultant) => selectedConsultant !== ev.target.value
                  );
                  console.log(newSelectedConsultant);
                  setSelectedConsultant(newSelectedConsultant);
                } else {
                  setSelectedConsultant(ev.target.value);
                }
              }}
            >
              {consultants &&
                consultants.map((consultant, index) => {
                  return <option value={`${consultant._id}`} key={`${index}-${consultant}`}>{consultant.fullName}</option>;
                })}
            </select>
          </div>
          <div>
            <label
              htmlFor="adType"
              onChange={(ev) => {
                if (selectedAdType.includes(ev.target.value)) {
                  const newSelectedAdType = selectedAdType.filter(
                    (selectedAdType) => selectedAdType !== ev.target.value
                  );
                  setSelectedAdType(newSelectedAdType);
                } else {
                  setSelectedAdType([...selectedAdType, ev.target.value]);
                }
              }}
            >
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
              onChange={(ev) => {
                if (selectedBuildingType.includes(ev.target.value)) {
                  const newSelectedBuildingType = selectedBuildingType.filter(
                    (selectedBuildingType) => selectedBuildingType !== ev.target.value
                  );
                  setSelectedBuildingType(newSelectedBuildingType);
                } else {
                  setSelectedBuildingType([...selectedBuildingType, ev.target.value]);
                }
              }}
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
            <select
              name="residentialZone"
              value="Seleccionar"
              onChange={(ev) => {
                if (residentialSelectedZones.includes(ev.target.value)) {
                  const newResidentialSelectedZones = residentialSelectedZones.filter(
                    (residentialSelectedZones) => residentialSelectedZones !== ev.target.value
                  );
                  console.log(newResidentialSelectedZones);
                  setResidentialSelectedZones(newResidentialSelectedZones);
                } else {
                  setResidentialSelectedZones([...residentialSelectedZones, ev.target.value]);
                }
              }}
            >
              <option hidden>Seleccionar</option>
              {residentials &&
                residentials.map((residentialZone, index) => {
                  return <option value={`${residentialZone._id}`} key={`${index}-${residentialZone}`}>{residentialZone.name}</option>;
                })}
            </select>
            <div>
              {residentialSelectedZones.length === 0 ? (
                <div>Ningúna selección</div>
              ) : (
                <div>{residentialSelectedZones}</div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="patrimonialZone">Zonas patrimonial</label>
            <select
              name="patrimonialZone"
              value="Seleccionar"
              onChange={(ev) => {
                if (patrimonialSelectedZones.includes(ev.target.value)) {
                  const newPatrimonialSelectedZones = patrimonialSelectedZones.filter(
                    (patrimonialSelectedZones) => patrimonialSelectedZones !== ev.target.value
                  );
                  console.log(newPatrimonialSelectedZones);
                  setPatrimonialSelectedZones(newPatrimonialSelectedZones);
                } else {
                  setPatrimonialSelectedZones([...patrimonialSelectedZones, ev.target.value]);
                }
              }}
            >
              <option hidden>Seleccionar</option>
              {patrimonials &&
                patrimonials.map((patrimonialZone, index) => {
                  return <option value={`${patrimonialZone._id}`} key={`${index}-${patrimonialZone}`}>{patrimonialZone.name}</option>;
                })}
            </select>
            <div>
              {patrimonialSelectedZones.length === 0 ? (
                <div>Ningúna selección</div>
              ) : (
                <div>{patrimonialSelectedZones}</div>
              )}
            </div>
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
          <NavLink to="/requests">
            <button type="">Cancelar</button>
          </NavLink>
        </Form>
      )}
    </Formik>
  );
};

export default RequestForm;
