import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllConsultants } from "../../../api/consultants.api";
import { getAllResidentialZones, getAllPatrimonialZones } from "../../../api/zones.api";
import { getAllContacts } from "../../../api/contacts.api";
import { getLastReference, getRequestById } from "../../../api/requests.api";
import { Select } from "../../index";

const GeneralRequest = () => {
  const { id } = useParams();

  const [request, setRequest] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [residentials, setResidential] = useState([]);
  const [patrimonials, setPatrimonial] = useState([]);
  const [reference, setReference] = useState(0);
  const [selectedContact, setSelectedContact] = useState([]);
  const [selectedConsultant, setSelectedConsultant] = useState([]);
  const [residentialSelectedZones, setResidentialSelectedZones] = useState([]);
  const [patrimonialSelectedZones, setPatrimonialSelectedZones] = useState([]);

  useEffect(() => {
    getRequestById(id).then((res) => setRequest(res));
    getAllContacts().then((res) => setContacts(res));
    getAllConsultants().then((res) => setConsultants(res));
    getAllResidentialZones().then((res) => setResidential(res));
    getAllPatrimonialZones().then((res) => setPatrimonial(res));
    getLastReference().then((res) => setReference(res));
  }, [id]);

  return (
    <div>
      <div>
        <label htmlFor="contact">Contacto</label>
        <span></span>
      </div>
      <div>
        <label htmlFor="consultant">Consultor</label>
        <span></span>
      </div>
      <div>
        <label htmlFor="adType">
          Tipo de anuncio
          <div>
            <input
              type="checkbox"
              checked={request.requestAdType.includes("Alquiler") ? "checked" : ""}
              value="Alquiler"
              disabled
            />
            <span>Alquiler</span>

            <input
              type="checkbox"
              checked={request.requestAdType.includes("Venta") ? "checked" : ""}
              value="Venta"
              disabled
            />
            <span>Venta</span>
          </div>
        </label>
      </div>
      <div>
        <label htmlFor="adBuildingType" name="adBuildingType">
          Tipo de inmueble
          <div>
            <input type="checkbox" checked={request.requestAdType.includes("Casa") ? "checked" : ""} value="Casa" />
            <span>Casa</span>
            <input type="checkbox" checked={request.requestAdType.includes("Piso") ? "checked" : ""} value="Piso" />
            <span>Piso</span>
            <input
              type="checkbox"
              checked={request.requestAdType.includes("Parcela") ? "checked" : ""}
              value="Parcela"
            />
            <span>Parcela</span>
            <input type="checkbox" checked={request.requestAdType.includes("Ático") ? "checked" : ""} value="Ático" />
            <span>Ático</span>
            <input
              type="checkbox"
              checked={request.requestAdType.includes("Oficina") ? "checked" : ""}
              value="Oficina"
            />
            <span>Oficina</span>
            <input
              type="checkbox"
              checked={request.requestAdType.includes("Edificio") ? "checked" : ""}
              value="Edificio"
            />
            <span>Edificio</span>
            <input type="checkbox" checked={request.requestAdType.includes("Local") ? "checked" : ""} value="Local" />
            <span>Local</span>
            <input
              type="checkbox"
              checked={request.requestAdType.includes("Campo Rústico") ? "checked" : ""}
              value="Campo Rústico"
            />
            <span>Campo Rústico</span>
            <input
              type="checkbox"
              checked={request.requestAdType.includes("Activos Singulares") ? "checked" : ""}
              value="Activos Singulares"
            />
            <span>Activos Singulares</span>
            <input type="checkbox" checked={request.requestAdType.includes("Costa") ? "checked" : ""} value="Costa" />
            <span>Costa</span>
          </div>
        </label>
      </div>
      <div>
        <label htmlFor="requestReference">Id Petición</label>
        <span>{`${request.reference}`}</span>
      </div>
      <div>
        <label htmlFor="requestComment">Comentarios</label>
        <textarea name="requestComment" defaultValue={request.requestComment ? request.requestComment : ""} />
      </div>
      <div>
        <label htmlFor="residentialZone">Zonas residencial</label>
        <Select
          placeholder={residentials.includes(`${request.requestZone}`) ? request.requestZone : "Ninguna selección"}
          fields={{ groupBy: "zone", text: "name", value: "name" }}
          disabled={"disabled"}
        />
      </div>
      <div>
        <label htmlFor="patrimonialZone">Zonas patrimonial</label>
        <Select
          placeholder={patrimonials.includes(`${request.requestZone}`) ? request.requestZone : "Ninguna selección"}
          fields={{ groupBy: "zone", text: "name", value: "name" }}
          disabled={"disabled"}
        />
      </div>
      <div>
        <div className="">
          <h2>Precio de venta</h2>
          <label htmlFor="salePriceMax">Máximo</label>
          <input type="number" name="salePriceMax" />€<label htmlFor="salePriceMin">Mínimo</label>
          <input
            type="number"
            name="salePriceMin"
            value={request.requestSalePriceMin ? request.requestSalePriceMin : ""}
          />
          €
        </div>
      </div>
      <div>
        <div className="">
          <h2>Precio de alquiler</h2>
          <label htmlFor="rentPriceMax">Máximo</label>
          <input type="number" name="rentPriceMax" />€<label htmlFor="rentPriceMin">Mínimo</label>
          <input type="number" name="rentPriceMin" />€
        </div>
      </div>
      <div>
        <div className="">
          <h2>Superficie construida</h2>
          <label htmlFor="buildSurfaceMax">Máximo</label>
          <input type="number" name="buildSurfaceMax" />
          m2
          <label htmlFor="buildSurfaceMin">Mínimo</label>
          <input type="number" name="buildSurfaceMin" />
          m2
        </div>
      </div>
      <div>
        <div className="">
          <h2>Superficie de parcela</h2>
          <label htmlFor="plotSurfaceMax">Máximo</label>
          <input type="number" name="plotSurfaceMax" />
          m2
          <label htmlFor="plotSurfaceMin">Mínimo</label>
          <input type="number" name="plotSurfaceMin" />
          m2
        </div>
      </div>
      <div>
        <div className="">
          <h2>Número de dormitorios</h2>
          <label htmlFor="bedroomsMax">Máximo</label>
          <input type="number" name="bedroomsMax" />
          m2
          <label htmlFor="bedroomsMin">Mínimo</label>
          <input type="number" name="bedroomsMin" />
          m2
        </div>
      </div>
      <div>
        <div className="">
          <h2>Número de baños</h2>
          <label htmlFor="bathroomsMax">Máximo</label>
          <input type="number" name="bathroomsMax" />
          <label htmlFor="bathroomsMin">Mínimo</label>
          <input type="number" name="bathroomsMin" />
        </div>
      </div>
    </div>
  );
};

export default GeneralRequest;
