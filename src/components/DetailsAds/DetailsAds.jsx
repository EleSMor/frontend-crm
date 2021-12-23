import React, { useState, useEffect } from "react";
import SurfacesBox from "../SurfacesBox/SurfacesBox";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Select, MultiSelect } from "./../index";
import { getAllOwners } from "../../api/contacts.api";
import { getAllConsultants } from "../../api/consultants.api";

const DetailsAds = ({
  formProps,
  id,
  setOwner,
  setConsultant,
  residentials,
  patrimonials,
  setResidentialZones,
  setPatrimonialZones,
  buildingType,
  setBuildingType,
  adType,
  setAdType,
}) => {
  const [owners, setOwners] = useState([]);
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    getAllOwners().then((res) => setOwners(...owners, res));
    getAllConsultants().then((res) => setConsultants(...consultants, res));
  }, []);

  const newSelect = (selected, setSelected, ev) => {
    if (selected.includes(ev.target.value)) {
      const newSelected = selected.filter((selected) => selected !== ev.target.value);
      setSelected(newSelected);
    } else {
      setSelected([...selected, ev.target.value]);
    }
  };

  const validateZone = (zones) => {
    return zones.some((zone) => formProps.values.zone.includes(zone._id));
  };

  return (
    <>
      <div>
        <div>
          <label htmlFor="title">Título del anuncio</label>
          <input
            required="required"
            name="title"
            value={formProps.values.title}
            onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="adReference">Referencia anuncio</label>
          <input
            required="required"
            name="adReference"
            value={formProps.values.adReference}
            onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="showOnWeb">Mostrar en la web</label>
          <input
            type="checkbox"
            name="showOnWeb"
            value={formProps.values.showOnWeb}
            onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="featuredOnMain">Mostrar en la página principal</label>
          <input
            type="checkbox"
            name="featuredOnMain"
            value={formProps.values.featuredOnMain}
            onChange={(ev) => {
              formProps.setFieldValue(ev.target.name, ev.target.checked);
            }}
          />
        </div>
        <div>
          <hr />
          <span>Dirección</span>
          <div>
            <div>
              <label htmlFor="street">Calle</label>
              <input
                required="yes"
                name="street"
                value={formProps.values.street}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
              <label htmlFor="directionNumber">Número</label>
              <input
                required="yes"
                name="directionNumber"
                value={formProps.values.directionNumber}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
              <label htmlFor="directionFloor">Piso</label>
              <input
                name="directionFloor"
                value={formProps.values.directionFloor}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <label htmlFor="postalCode">Código Postal</label>
            <div>
              <input
                required="yes"
                type="text"
                name="postalCode"
                value={formProps.values.postalCode}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <label htmlFor="city">Ciudad</label>
            <div>
              <input
                required="yes"
                value={formProps.values.city}
                name="city"
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <label htmlFor="country">País</label>
            <div>
              <input
                required="yes"
                value={formProps.values.country}
                name="country"
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="adType">
            Tipo de anuncio
            <div>
              <input
                type="checkbox"
                name="adType"
                checked={adType.includes("Alquiler") ? true : ""}
                onChange={(ev) => newSelect(adType, setAdType, ev)}
                value="Alquiler"
              />
              <span>Alquiler</span>

              <input
                type="checkbox"
                name="adType"
                checked={adType.includes("Venta") ? true : ""}
                onChange={(ev) => newSelect(adType, setAdType, ev)}
                value="Venta"
              />
              <span>Venta</span>
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="gvOperationClose">
            Cierre operación GV
            <div>
              <span>Alquilado</span>
              <input
                type="radio"
                name="gvOperationClose"
                checked={formProps.values.gvOperationClose === "Alquilado" ? true : ""}
                onChange={(ev) => {
                  formProps.setFieldValue(ev.target.name, ev.target.value);
                }}
                value="Alquilado"
              />
              <span>Vendido</span>
              <input
                type="radio"
                checked={formProps.values.gvOperationClose === "Vendido" ? true : ""}
                onChange={(ev) => {
                  formProps.setFieldValue(ev.target.name, ev.target.value);
                }}
                name="gvOperationClose"
                value="Vendido"
              />
            </div>
          </label>
        </div>
        {id ? (
          formProps.values.owner.length !== 0 &&
          formProps.values.consultant.length !== 0 && (
            <>
              <div>
                <label htmlFor="owner">Propietario</label>
                <Select
                  list={owners}
                  fields={{ groupBy: "", text: "fullName", value: "_id" }}
                  fn={setOwner}
                  defaultValues={id ? (formProps.values.owner.length !== 0 ? formProps.values.owner : []) : []}
                />
              </div>
              <div>
                <label htmlFor="consultant">Consultor</label>
                <Select
                  list={consultants}
                  fields={{ groupBy: "", text: "fullName", value: "_id" }}
                  fn={setConsultant}
                  defaultValues={
                    id ? (formProps.values.consultant.length !== 0 ? formProps.values.consultant : []) : []
                  }
                />
              </div>
            </>
          )
        ) : (
          <>
            <div>
              <label htmlFor="owner">Propietario</label>
              <Select
                list={owners}
                fields={{ groupBy: "", text: "fullName", value: "_id" }}
                fn={setOwner}
                defaultValues={formProps.values.owner}
              />
            </div>
            <div>
              <label htmlFor="consultant">Consultor</label>
              <Select
                list={consultants}
                fields={{ groupBy: "", text: "fullName", value: "_id" }}
                fn={setConsultant}
                defaultValues={formProps.values.consultant}
              />
            </div>
          </>
        )}
        <Accordion multiple>
          <AccordionTab header="Información básica">
            <div>
              <label htmlFor="adBuildingType" name="adBuildingType">
                Tipo de edificio
                <div>
                  <span>Casa</span>
                  <input
                    type="checkbox"
                    checked={buildingType.includes("Casa") ? true : ""}
                    onChange={(ev) => newSelect(buildingType, setBuildingType, ev)}
                    value="Casa"
                  />
                  <span>Piso</span>
                  <input
                    type="checkbox"
                    checked={buildingType.includes("Piso") ? true : ""}
                    onChange={(ev) => newSelect(buildingType, setBuildingType, ev)}
                    value="Piso"
                  />
                  <span>Parcela</span>
                  <input
                    type="checkbox"
                    checked={buildingType.includes("Parcela") ? true : ""}
                    onChange={(ev) => newSelect(buildingType, setBuildingType, ev)}
                    value="Parcela"
                  />
                  <span>Ático</span>
                  <input
                    type="checkbox"
                    checked={buildingType.includes("Ático") ? true : ""}
                    onChange={(ev) => newSelect(buildingType, setBuildingType, ev)}
                    value="Ático"
                  />
                  <span>Oficina</span>
                  <input
                    type="checkbox"
                    checked={buildingType.includes("Oficina") ? true : ""}
                    onChange={(ev) => newSelect(buildingType, setBuildingType, ev)}
                    value="Oficina"
                  />
                  <span>Edificio</span>
                  <input
                    type="checkbox"
                    checked={buildingType.includes("Edificio") ? true : ""}
                    onChange={(ev) => newSelect(buildingType, setBuildingType, ev)}
                    value="Edificio"
                  />
                  <span>Local</span>
                  <input
                    type="checkbox"
                    checked={buildingType.includes("Local") ? true : ""}
                    onChange={(ev) => newSelect(buildingType, setBuildingType, ev)}
                    value="Local"
                  />
                  <span>Campo Rústico</span>
                  <input
                    type="checkbox"
                    checked={buildingType.includes("Campo Rústico") ? true : ""}
                    onChange={(ev) => newSelect(buildingType, setBuildingType, ev)}
                    value="Campo Rústico"
                  />
                  <span>Activos Singulares</span>
                  <input
                    type="checkbox"
                    checked={buildingType.includes("Activos Singulares") ? true : ""}
                    onChange={(ev) => newSelect(buildingType, setBuildingType, ev)}
                    value="Activos Singulares"
                  />
                  <span>Costa</span>
                  <input
                    type="checkbox"
                    checked={buildingType.includes("Costa") ? true : ""}
                    onChange={(ev) => newSelect(buildingType, setBuildingType, ev)}
                    value="Costa"
                  />
                </div>
              </label>
            </div>
            <div>
              <label htmlFor="zone">Zonas residencial</label>
              <MultiSelect
                list={residentials}
                mode={"Checkbox"}
                fields={{ groupBy: "zone", text: "name", value: "_id" }}
                fn={setResidentialZones}
                defaultValues={validateZone(residentials) ? formProps.values.zone : ""}
              />
            </div>
            <div>
              <label htmlFor="zone">Zonas patrimonial</label>
              <MultiSelect
                list={patrimonials}
                mode={"Checkbox"}
                fields={{ groupBy: "", text: "name", value: "_id" }}
                fn={setPatrimonialZones}
                defaultValues={validateZone(patrimonials) ? formProps.values.zone : ""}
              />
            </div>
            <div>
              <label htmlFor="department">Departamento</label>
              <select
                required
                name="department"
                value={formProps.values.department}
                onChange={(ev) => {
                  formProps.setFieldValue(ev.target.name, ev.target.value);
                }}
              >
                <option value="" hidden>
                  Seleccionar
                </option>
                <option value="Patrimonio">Patrimonio</option>
                <option value="Residencial">Residencial</option>
              </select>
            </div>
            <div>
              <label htmlFor="webSubtitle">Subtítulo Web</label>
              <input
                type="text"
                name="webSubtitle"
                value={formProps.values.webSubtitle}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="buildSurface">Superficie construida</label>
              <input
                type="number"
                required="yes"
                name="buildSurface"
                value={formProps.values.buildSurface}
                onChange={(ev) => {
                  formProps.setFieldValue(ev.target.name, ev.target.value);
                  formProps.setFieldValue("rentValue", ev.target.value * formProps.values.monthlyRent);
                  formProps.setFieldValue("expensesValue", ev.target.value * formProps.values.expenses);
                }}
              />
              m2
            </div>
            <div>
              <label htmlFor="plotSurface">Superficie de parcela</label>
              <input
                type="number"
                name="plotSurface"
                value={formProps.values.plotSurface}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
              m2
            </div>
            <div>
              <label htmlFor="floor">Planta</label>
              <input
                type="text"
                name="floor"
                value={formProps.values.floor}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="disponibility">Disponibilidad</label>
              <input
                type="text"
                name="disponibility"
                value={formProps.values.disponibility}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <hr />
            <SurfacesBox formProps={formProps} />
            <h4>Precio</h4>
            <div>
              <div>
                <span>Venta</span>
                <div>
                  <label htmlFor="saleValue"></label>
                  <input
                    type="number"
                    name="saleValue"
                    value={formProps.values.saleValue}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                  €
                  <br />
                  <label htmlFor="saleShowOnWeb">Mostrar Web</label>
                  <input
                    type="checkbox"
                    name="saleShowOnWeb"
                    value={formProps.values.saleShowOnWeb}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.checked)}
                  />
                </div>
              </div>
              <div>
                <span>Alquiler</span>
                <div>
                  <label htmlFor="rentValue"></label>
                  <input
                    type="number"
                    name="rentValue"
                    value={formProps.values.buildSurface * formProps.values.monthlyRent}
                    onChange={() => ""}
                  />
                  €
                  <br />
                  <label htmlFor="rentShowOnWeb">Mostrar Web</label>
                  <input
                    type="checkbox"
                    name="rentShowOnWeb"
                    value={formProps.values.rentShowOnWeb}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.checked)}
                  />
                </div>
              </div>
            </div>
            <h4>Alquiler</h4>
            <div>
              <label htmlFor="monthlyRent">Renta mensual</label>
              <input
                type="number"
                name="monthlyRent"
                value={formProps.values.monthlyRent}
                onChange={(ev) => {
                  formProps.setFieldValue(ev.target.name, ev.target.value);
                  formProps.setFieldValue("rentValue", ev.target.value * formProps.values.buildSurface);
                  formProps.setFieldValue(
                    "expensesIncluded",
                    ev.target.value * formProps.values.buildSurface +
                      formProps.values.expenses * formProps.values.buildSurface
                  );
                }}
              />
              €/m2/mes
            </div>
            <div>
              <label htmlFor="expenses">Gastos</label>
              <input
                type="number"
                name="expenses"
                value={formProps.values.expenses}
                onChange={(ev) => {
                  formProps.setFieldValue(ev.target.name, ev.target.value);
                  formProps.setFieldValue("expensesValue", ev.target.value * formProps.values.buildSurface);
                  formProps.setFieldValue(
                    "expensesIncluded",
                    formProps.values.monthlyRent * formProps.values.buildSurface +
                      formProps.values.buildSurface * ev.target.value
                  );
                }}
              />
              €/m2/mes
            </div>
            <div>
              <label htmlFor="expensesIncluded">Alquiler con gastos incluidos</label>
              <input
                type="number"
                name="expensesIncluded"
                value={
                  formProps.values.buildSurface * formProps.values.monthlyRent +
                  formProps.values.buildSurface * formProps.values.expenses
                }
                onChange={() => ""}
              />
              €/mes
            </div>
            <div>
              <span>Gastos de comunidad</span>
              <div>
                <label htmlFor="expensesValue"></label>
                <input
                  type="number"
                  name="expensesValue"
                  value={formProps.values.buildSurface * formProps.values.expenses}
                  onChange={() => ""}
                />
                €/mes
                <label htmlFor="expensesShowOnWeb">Mostrar en la web</label>
                <input
                  type="checkbox"
                  name="expensesShowOnWeb"
                  value={formProps.values.expensesShowOnWeb}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.checked)}
                />
              </div>
            </div>
            <div>
              <span>Ibi</span>
              <div>
                <label htmlFor="ibiValue"></label>
                <input
                  type="number"
                  name="ibiValue"
                  value={formProps.values.ibiValue}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                €/mes
                <label htmlFor="ibiShowOnWeb">Mostrar en la web</label>
                <input
                  type="checkbox"
                  name="ibiShowOnWeb"
                  value={formProps.values.ibiShowOnWeb}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.checked)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="buildingYear">Año de construcción</label>
              <input
                type="text"
                name="buildingYear"
                value={formProps.values.buildingYear}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
          </AccordionTab>
          <AccordionTab header="Calidades">
            <div>
              <div>
                <div>
                  <label htmlFor="bedrooms">Dormitorios</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formProps.values.bedrooms}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="bathrooms">Baños</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formProps.values.bathrooms}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="parking">Plaza de garaje</label>
                  <input
                    type="number"
                    name="parking"
                    value={formProps.values.parking}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="indoorPool">Piscina interior</label>
                  <input
                    type="number"
                    name="indoorPool"
                    value={formProps.values.indoorPool}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="outdoorPool">Piscina exterior</label>
                  <input
                    type="number"
                    name="outdoorPool"
                    value={formProps.values.outdoorPool}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="jobPositions">Puestos de trabajo</label>
                  <input
                    type="number"
                    name="jobPositions"
                    value={formProps.values.jobPositions}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="subway">Metro</label>
                  <input
                    type="text"
                    name="subway"
                    value={formProps.values.subway}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="bus">Bus</label>
                  <input
                    type="text"
                    name="bus"
                    value={formProps.values.bus}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
              </div>
              <div>
                <span>Otros</span>
                <div>
                  <label htmlFor="lift">Ascensor</label>
                  <input
                    type="checkbox"
                    name="lift"
                    checked={formProps.values.lift}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.lift)}
                  />
                  <label htmlFor="dumbwaiter">Montaplatos</label>
                  <input
                    type="checkbox"
                    name="dumbwaiter"
                    checked={formProps.values.dumbwaiter}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.dumbwaiter)}
                  />
                  <label htmlFor="liftTruck">Montacargas</label>
                  <input
                    type="checkbox"
                    name="liftTruck"
                    checked={formProps.values.liftTruck}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.liftTruck)}
                  />
                  <label htmlFor="airConditioning">Aire Acondicionado</label>
                  <input
                    type="checkbox"
                    name="airConditioning"
                    checked={formProps.values.airConditioning}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.airConditioning)}
                  />
                  <label htmlFor="centralHeating">Calefacción Central</label>
                  <input
                    type="checkbox"
                    name="centralHeating"
                    checked={formProps.values.centralHeating}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.centralHeating)}
                  />
                  <label htmlFor="floorHeating">Suelo radiante</label>
                  <input
                    type="checkbox"
                    name="floorHeating"
                    checked={formProps.values.floorHeating}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.floorHeating)}
                  />
                  <label htmlFor="indoorAlarm">Alarma interior</label>
                  <input
                    type="checkbox"
                    name="indoorAlarm"
                    checked={formProps.values.indoorAlarm}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.indoorAlarm)}
                  />
                  <label htmlFor="outdoorAlarm">Alarma perimetral</label>
                  <input
                    type="checkbox"
                    name="outdoorAlarm"
                    checked={formProps.values.outdoorAlarm}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.outdoorAlarm)}
                  />
                  <label htmlFor="fullHoursSecurity">Seguridad 24 h</label>
                  <input
                    type="checkbox"
                    name="fullHoursSecurity"
                    checked={formProps.values.fullHoursSecurity}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.fullHoursSecurity)}
                  />
                  <label htmlFor="gunRack">Armero</label>
                  <input
                    type="checkbox"
                    name="gunRack"
                    checked={formProps.values.gunRack}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.gunRack)}
                  />
                  <label htmlFor="strongBox">Caja fuerte</label>
                  <input
                    type="checkbox"
                    name="strongBox"
                    checked={formProps.values.strongBox}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.strongBox)}
                  />
                  <label htmlFor="well">Pozo</label>
                  <input
                    type="checkbox"
                    name="well"
                    checked={formProps.values.well}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.well)}
                  />
                  <label htmlFor="homeAutomation">Domótica</label>
                  <input
                    type="checkbox"
                    name="homeAutomation"
                    checked={formProps.values.homeAutomation}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.homeAutomation)}
                  />
                  <label htmlFor="centralVacuum">Aspiración centralizada</label>
                  <input
                    type="checkbox"
                    name="centralVacuum"
                    checked={formProps.values.centralVacuum}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.centralVacuum)}
                  />
                  <label htmlFor="padelCourt">Pista de pádel</label>
                  <input
                    type="checkbox"
                    name="padelCourt"
                    checked={formProps.values.padelCourt}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.padelCourt)}
                  />
                  <label htmlFor="tennisCourt">Pista de tenis</label>
                  <input
                    type="checkbox"
                    name="tennisCourt"
                    checked={formProps.values.tennisCourt}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.tennisCourt)}
                  />
                  <label htmlFor="terrace">Terraza</label>
                  <input
                    type="checkbox"
                    name="terrace"
                    checked={formProps.values.terrace}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.terrace)}
                  />
                  <label htmlFor="storage">Trastero</label>
                  <input
                    type="checkbox"
                    name="storage"
                    checked={formProps.values.storage}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.storage)}
                  />
                  <label htmlFor="swimmingPool">Piscina</label>
                  <input
                    type="checkbox"
                    name="swimmingPool"
                    checked={formProps.values.swimmingPool}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.swimmingPool)}
                  />
                  <label htmlFor="garage">Garaje</label>
                  <input
                    type="checkbox"
                    name="garage"
                    checked={formProps.values.garage}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.garage)}
                  />
                  <label htmlFor="falseCeiling">Falso techo</label>
                  <input
                    type="checkbox"
                    name="falseCeiling"
                    checked={formProps.values.falseCeiling}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.falseCeiling)}
                  />
                  <label htmlFor="raisedFloor">Suelo técnico</label>
                  <input
                    type="checkbox"
                    name="raisedFloor"
                    checked={formProps.values.raisedFloor}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.raisedFloor)}
                  />
                  <label htmlFor="bathrooms">Baños</label>
                  <input
                    type="checkbox"
                    name="bathrooms"
                    checked={formProps.values.qualityBathrooms}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.bathrooms)}
                  />
                  <label htmlFor="freeHeight">Altura libre &gt; 2,5 m</label>
                  <input
                    type="checkbox"
                    name="freeHeight"
                    checked={formProps.values.freeHeight}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.freeHeight)}
                  />
                  <label htmlFor="smokeOutlet">Salida de humos</label>
                  <input
                    type="checkbox"
                    name="smokeOutlet"
                    checked={formProps.values.smokeOutlet}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.smokeOutlet)}
                  />
                  <label htmlFor="accessControl">Control de accesos</label>
                  <input
                    type="checkbox"
                    name="accessControl"
                    checked={formProps.values.accessControl}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.accessControl)}
                  />
                </div>
              </div>
            </div>
          </AccordionTab>
          <AccordionTab header="Descripción">
            <div>
              <div>
                <label htmlFor="web">Descripción web</label>
                <textarea
                  name="web"
                  value={formProps.values.web}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="emailPDF">Descripción email / PDF</label>
                <textarea
                  max="600"
                  name="emailPDF"
                  value={formProps.values.emailPDF}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="distribution">Distribución</label>
                <textarea
                  name="distribution"
                  value={formProps.values.distribution}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </>
  );
};

export default DetailsAds;
