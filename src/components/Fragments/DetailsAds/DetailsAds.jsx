import React, { useState, useEffect } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Select } from "../../index";
import { getAllOwners } from "../../../api/contacts.api";
import { getAllConsultants } from "../../../api/consultants.api";
import { getAllResidentialZones, getAllPatrimonialZones } from "../../../api/zones.api";

const DetailsAds = ({
  formProps,
  setOwner,
  setConsultant,
  residentialZones,
  setResidentialZones,
  patrimonialZones,
  setPatrimonialZones,
  buildingType,
  setBuildingType,
  adType,
  setAdType,
}) => {
  const [owners, setOwners] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [residentials, setResidential] = useState([]);
  const [patrimonials, setPatrimonial] = useState([]);

  const columnsArray = ["Planta", "Uso", "m2", "Precio (€)", "Disponibilidad"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getAllOwners().then((res) => setOwners(...owners, res));
    getAllConsultants().then((res) => setConsultants(...consultants, res));
    getAllResidentialZones().then((res) => setResidential(...residentials, res));
    getAllPatrimonialZones().then((res) => setPatrimonial(...patrimonials, res));
  }, []);

  const handleAddRow = () => {
    const item = {};
    setRows([...rows, item]);
  };

  const handleRemoveSpecificRow = (idx) => {
    const tempRows = [...rows]; // to avoid  direct state mutation
    tempRows.splice(idx, 1);
    setRows(tempRows);
  };

  const updateState = (e) => {
    console.log("Columna:", e.target.attributes.column.value);
    console.log("Fila:", e.target.attributes.index.value);
    console.log("Valor:", e.target.value);

    let prope = e.target.attributes.column.value; // the custom column attribute
    let index = e.target.attributes.index.value; // index of state array -rows
    let fieldValue = e.target.value; // value

    const tempRows = [...rows]; // avoid direct state mutation
    const tempObj = rows[index]; // copy state object at index to a temporary object
    tempObj[prope] = fieldValue; // modify temporary object

    // return object to rows` clone
    tempRows[index] = tempObj;
    setRows(tempRows); // update state
  };

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
    <div>
      <div>
        <label htmlFor="title">Título del anuncio</label>
        <input
          required="required"
          name="title"
          defaultValue={formProps.values.title}
          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
        />
      </div>
      <div>
        <label htmlFor="adReference">Referencia anuncio</label>
        <input
          required="required"
          name="adReference"
          defaultValue={formProps.values.adReference}
          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
        />
      </div>
      <div>
        <label htmlFor="showOnWeb">Mostrar en la web</label>
        <input
          type="checkbox"
          name="showOnWeb"
          defaultValue={formProps.values.showOnWeb}
          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.checked)}
        />
      </div>
      <div>
        <label htmlFor="featuredOnMain">Mostrar en la página principal</label>
        <input
          type="checkbox"
          name="featuredOnMain"
          defaultValue={formProps.values.featuredOnMain}
          onChange={(ev) => {
            formProps.setFieldValue(ev.target.name, ev.target.checked);
          }}
        />
      </div>
      <div>
        <hr />
        <span>Dirección</span>
        <div>
          <label htmlFor="street">Calle</label>
          <div>
            <input
              required="yes"
              name="street"
              defaultValue={formProps.values.street}
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
            <label htmlFor="directionNumber">Número</label>
            <input
              required="yes"
              name="directionNumber"
              defaultValue={formProps.values.directionNumber}
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
            <label htmlFor="directionFloor">Piso</label>
            <input name="directionFloor" onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)} />
          </div>
          <label htmlFor="postalCode">Código Postal</label>
          <div>
            <input
              required="yes"
              type="text"
              name="postalCode"
              defaultValue={formProps.values.postalCode}
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
          </div>
          <label htmlFor="city">Ciudad</label>
          <div>
            <input
              required="yes"
              defaultValue={formProps.values.city}
              name="city"
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
          </div>
          <label htmlFor="country">País</label>
          <div>
            <input
              required="yes"
              defaultValue={formProps.values.country}
              name="country"
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="adType" onChange={(ev) => newSelect(adType, setAdType, ev)}>
          Tipo de anuncio
          <div>
            <input
              type="checkbox"
              defaultChecked={adType.includes("Alquiler") ? true : false}
              value="Alquiler"
            />
            <span>Alquiler</span>

            <input
              type="checkbox"
              defaultChecked={adType.includes("Venta") ? true : false}
              value="Venta"
            />
            <span>Venta</span>
          </div>
        </label>
      </div>
      <div>
        <label
          htmlFor="gvOperationClose"
          name="gvOperationClose"
          onChange={(ev) => {
            formProps.setFieldValue(ev.target.name, ev.target.value);
          }}
        >
          Cierre operación GV
          <div>
            <span>Alquilado</span>
            <input
              type="radio"
              name="gvOperationClose"
              defaultChecked={formProps.values.gvOperationClose === "Alquilado" ? "checked" : ""}
              value="Alquilado"
            />
            <span>Vendido</span>
            <input
              type="radio"
              defaultChecked={formProps.values.gvOperationClose === "Vendido" ? "checked" : ""}
              name="gvOperationClose"
              value="Vendido"
            />
          </div>
        </label>
      </div>
      <div>
        <label htmlFor="owner">Propietario</label>
        <Select
          list={owners}
          mode={"Delimiter"}
          fields={{ groupBy: "", text: "fullName", value: "_id" }}
          fn={setOwner}
          defaultValues={formProps.values.owner}
        />
      </div>
      <div>
        <label htmlFor="consultant">Consultor</label>
        <Select
          list={consultants}
          mode={"Delimiter"}
          fields={{ groupBy: "", text: "fullName", value: "_id" }}
          fn={setConsultant}
          defaultValues={formProps.values.consultant}
        />
      </div>
      <Accordion multiple>
        <AccordionTab header="Información básica">
          <div>
            <label
              htmlFor="adBuildingType"
              name="adBuildingType"
              onChange={(ev) => newSelect(buildingType, setBuildingType, ev)}
            >
              Tipo de edificio
              <div>
                <span>Casa</span>
                <input
                  type="checkbox"
                  defaultChecked={formProps.values.adBuildingType.includes("Casa") === true ? "checked" : ""}
                  value="Casa"
                />
                <span>Piso</span>
                <input
                  type="checkbox"
                  defaultChecked={formProps.values.adBuildingType.includes("Piso") === true ? "checked" : ""}
                  value="Piso"
                />
                <span>Parcela</span>
                <input
                  type="checkbox"
                  defaultChecked={formProps.values.adBuildingType.includes("Parcela") === true ? "checked" : ""}
                  value="Parcela"
                />
                <span>Ático</span>
                <input
                  type="checkbox"
                  defaultChecked={formProps.values.adBuildingType.includes("Ático") === true ? "checked" : ""}
                  value="Ático"
                />
                <span>Oficina</span>
                <input
                  type="checkbox"
                  defaultChecked={formProps.values.adBuildingType.includes("Oficina") === true ? "checked" : ""}
                  value="Oficina"
                />
                <span>Edificio</span>
                <input
                  type="checkbox"
                  defaultChecked={formProps.values.adBuildingType.includes("Edificio") === true ? "checked" : ""}
                  value="Edificio"
                />
                <span>Local</span>
                <input
                  type="checkbox"
                  defaultChecked={formProps.values.adBuildingType.includes("Local") === true ? "checked" : ""}
                  value="Local"
                />
                <span>Campo Rústico</span>
                <input
                  type="checkbox"
                  defaultChecked={formProps.values.adBuildingType.includes("Campo Rústico") === true ? "checked" : ""}
                  value="Campo Rústico"
                />
                <span>Activos Singulares</span>
                <input
                  type="checkbox"
                  defaultChecked={
                    formProps.values.adBuildingType.includes("Activos Singulares") === true ? "checked" : ""
                  }
                  value="Activos Singulares"
                />
                <span>Costa</span>
                <input
                  type="checkbox"
                  defaultChecked={formProps.values.adBuildingType.includes("Costa") === true ? "checked" : ""}
                  value="Costa"
                />
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="zone">Zonas residencial</label>
            <Select
              list={residentials}
              mode={"Checkbox"}
              fields={{ groupBy: "zone", text: "name", value: "_id" }}
              fn={setResidentialZones}
              defaultValues={validateZone(residentials) ? formProps.values.zone : ""}
            />
          </div>
          <div>
            <label htmlFor="zone">Zonas patrimonial</label>
            <Select
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
              defaultValue={formProps.values.department}
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
              defaultValue={formProps.values.webSubtitle}
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
          </div>
          <div>
            <label htmlFor="buildSurface">Superficie construida</label>
            <input
              type="number"
              required="yes"
              name="buildSurface"
              defaultValue={formProps.values.buildSurface}
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
            m2
          </div>
          <div>
            <label htmlFor="plotSurface">Superficie de parcela</label>
            <input
              type="number"
              name="plotSurface"
              defaultValue={formProps.values.plotSurface}
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
            m2
          </div>
          <div>
            <label htmlFor="floor">Planta</label>
            <input
              type="text"
              name="floor"
              defaultValue={formProps.values.floor}
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
          </div>
          <div>
            <label htmlFor="disponibility">Disponibilidad</label>
            <input
              type="text"
              name="disponibility"
              defaultValue={formProps.values.disponibility}
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
          </div>
          <hr />
          {/* <div>Cuadro Superficies</div> */}
          {/* <table className="surfaceBox">
            <thead>
              <tr>
                {columnsArray.map((column, index) => (
                  <th className="text-center" key={index}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item, idx) => (
                <tr key={idx}>
                  {columnsArray.map((column, index) => (
                    <td key={index}>
                      <input
                        type="text"
                        column={column}
                        value={rows[idx][column]}
                        index={idx}
                        className="form-control"
                        onChange={(e) => updateState(e)}
                      />
                    </td>
                  ))}

                  <td>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveSpecificRow(idx)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> 
          <button onClick={handleAddRow} className="btn btn-primary">
            Add Row
          </button>
          <hr /> */}
          <div>
            <div>
              <span>Venta</span>
              <div>
                <label htmlFor="saleValue"></label>
                <input
                  type="number"
                  name="saleValue"
                  defaultValue={formProps.values.saleValue}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                €
                <br />
                <label htmlFor="saleShowOnWeb">Mostrar Web</label>
                <input
                  type="checkbox"
                  name="saleShowOnWeb"
                  defaultValue={formProps.values.saleShowOnWeb}
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
                  defaultValue={formProps.values.rentValue}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                €
                <br />
                <label htmlFor="rentShowOnWeb">Mostrar Web</label>
                <input
                  type="checkbox"
                  name="rentShowOnWeb"
                  defaultValue={formProps.values.rentShowOnWeb}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.checked)}
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="monthlyRent">Renta mensual</label>
            <input
              type="number"
              name="monthlyRent"
              defaultValue={formProps.values.monthlyRent}
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
            €/m2/mes
          </div>
          <div>
            <label htmlFor="expenses">Gastos</label>
            <input
              type="number"
              name="expenses"
              defaultValue={formProps.values.expenses}
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
            €/m2/mes
          </div>
          <div>
            <label htmlFor="expensesIncluded">Alquiler con gastos incluidos</label>
            <input
              type="number"
              name="expensesIncluded"
              defaultValue={formProps.values.expensesIncluded}
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
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
                defaultValue={formProps.values.expensesValue}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
              €/mes
              <label htmlFor="expensesShowOnWeb">Mostrar en la web</label>
              <input
                type="checkbox"
                name="expensesShowOnWeb"
                defaultValue={formProps.values.expensesShowOnWeb}
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
                defaultValue={formProps.values.ibiValue}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
              €/mes
              <label htmlFor="ibiShowOnWeb">Mostrar en la web</label>
              <input
                type="checkbox"
                name="ibiShowOnWeb"
                defaultValue={formProps.values.ibiShowOnWeb}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.checked)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="buildingYear">Año de construcción</label>
            <input
              type="text"
              name="buildingYear"
              defaultValue={formProps.values.buildingYear}
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
                  defaultValue={formProps.values.bedrooms}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="bathrooms">Baños</label>
                <input
                  type="number"
                  name="bathrooms"
                  defaultValue={formProps.values.bathrooms}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="parking">Plaza de garaje</label>
                <input
                  type="number"
                  name="parking"
                  defaultValue={formProps.values.parking}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="indoorPool">Piscina interior</label>
                <input
                  type="number"
                  name="indoorPool"
                  defaultValue={formProps.values.indoorPool}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="outdoorPool">Piscina exterior</label>
                <input
                  type="number"
                  name="outdoorPool"
                  defaultValue={formProps.values.outdoorPool}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="jobPositions">Puestos de trabajo</label>
                <input
                  type="number"
                  name="jobPositions"
                  defaultValue={formProps.values.jobPositions}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="subway">Metro</label>
                <input
                  type="text"
                  name="subway"
                  defaultValue={formProps.values.subway}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="bus">Bus</label>
                <input
                  type="text"
                  name="bus"
                  defaultValue={formProps.values.bus}
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
                  defaultChecked={formProps.values.lift}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="dumbwaiter">Montaplatos</label>
                <input
                  type="checkbox"
                  name="dumbwaiter"
                  defaultChecked={formProps.values.dumbwaiter}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="liftTruck">Montacargas</label>
                <input
                  type="checkbox"
                  name="liftTruck"
                  defaultChecked={formProps.values.liftTruck}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="airConditioning">Aire Acondicionado</label>
                <input
                  type="checkbox"
                  name="airConditioning"
                  defaultChecked={formProps.values.airConditioning}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="centralHeating">Calefacción Central</label>
                <input
                  type="checkbox"
                  name="centralHeating"
                  defaultChecked={formProps.values.centralHeating}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="floorHeating">Suelo radiante</label>
                <input
                  type="checkbox"
                  name="floorHeating"
                  defaultChecked={formProps.values.floorHeating}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="indoorAlarm">Alarma interior</label>
                <input
                  type="checkbox"
                  name="indoorAlarm"
                  defaultChecked={formProps.values.indoorAlarm}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="outdoorAlarm">Alarma perimetral</label>
                <input
                  type="checkbox"
                  name="outdoorAlarm"
                  defaultChecked={formProps.values.outdoorAlarm}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="fullHoursSecurity">Seguridad 24 h</label>
                <input
                  type="checkbox"
                  name="fullHoursSecurity"
                  defaultChecked={formProps.values.fullHoursSecurity}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="gunRack">Armero</label>
                <input
                  type="checkbox"
                  name="gunRack"
                  defaultChecked={formProps.values.gunRack}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="strongBox">Caja fuerte</label>
                <input
                  type="checkbox"
                  name="strongBox"
                  defaultChecked={formProps.values.strongBox}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="well">Pozo</label>
                <input
                  type="checkbox"
                  name="well"
                  defaultChecked={formProps.values.well}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="homeAutomation">Domótica</label>
                <input
                  type="checkbox"
                  name="homeAutomation"
                  defaultChecked={formProps.values.homeAutomation}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="centralVacuum">Aspiración centralizada</label>
                <input
                  type="checkbox"
                  name="centralVacuum"
                  defaultChecked={formProps.values.centralVacuum}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="padelCourt">Pista de pádel</label>
                <input
                  type="checkbox"
                  name="padelCourt"
                  defaultChecked={formProps.values.padelCourt}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="tennisCourt">Pista de tenis</label>
                <input
                  type="checkbox"
                  name="tennisCourt"
                  defaultChecked={formProps.values.tennisCourt}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="terrace">Terraza</label>
                <input
                  type="checkbox"
                  name="terrace"
                  defaultChecked={formProps.values.terrace}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="storage">Trastero</label>
                <input
                  type="checkbox"
                  name="storage"
                  defaultChecked={formProps.values.storage}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="swimmingPool">Piscina</label>
                <input
                  type="checkbox"
                  name="swimmingPool"
                  defaultChecked={formProps.values.swimmingPool}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="garage">Garaje</label>
                <input
                  type="checkbox"
                  name="garage"
                  defaultChecked={formProps.values.garage}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="falseCeiling">Falso techo</label>
                <input
                  type="checkbox"
                  name="falseCeiling"
                  defaultChecked={formProps.values.falseCeiling}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="raisedFloor">Suelo técnico</label>
                <input
                  type="checkbox"
                  name="raisedFloor"
                  defaultChecked={formProps.values.raisedFloor}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="bathrooms">Baños</label>
                <input
                  type="checkbox"
                  name="bathrooms"
                  defaultChecked={formProps.values.bathrooms}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="freeHeight">Altura libre &gt; 2,5 m</label>
                <input
                  type="checkbox"
                  name="freeHeight"
                  defaultChecked={formProps.values.freeHeight}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="smokeOutlet">Salida de humos</label>
                <input
                  type="checkbox"
                  name="smokeOutlet"
                  defaultChecked={formProps.values.smokeOutlet}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="accessControl">Control de accesos</label>
                <input
                  type="checkbox"
                  name="accessControl"
                  defaultChecked={formProps.values.accessControl}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
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
                defaultValue={formProps.values.web}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="emailPDF">Descripción email / PDF</label>
              <textarea
                max="600"
                name="emailPDF"
                defaultValue={formProps.values.emailPDF}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="distribution">Distribución</label>
              <textarea
                name="distribution"
                defaultValue={formProps.values.distribution}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  );
};

export default DetailsAds;
