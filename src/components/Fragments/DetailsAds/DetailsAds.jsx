import React, { useState, useEffect } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useForm } from "react-hook-form";
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
  const { register } = useForm();

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
    console.log(ev.target.value);
    console.log(selected)
    if (selected.includes(ev.target.value)) {
      const newSelected = selected.filter((selected) => selected !== ev.target.value);
      setSelected(newSelected);
    } else {
      setSelected([...selected, ev.target.value]);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="title">Título del anuncio</label>
        <input
          required="required"
          name="title"
          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
        />
      </div>
      <div>
        <label htmlFor="adReference">Referencia anuncio</label>
        <input
          required="required"
          name="adReference"
          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
        />
      </div>
      <div>
        <label htmlFor="showOnWeb">Mostrar en la web</label>
        <input
          type="checkbox"
          name="showOnWeb"
          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.checked)}
        />
      </div>
      <div>
        <label htmlFor="featuredOnMain">Mostrar en la página principal</label>
        <input
          type="checkbox"
          name="featuredOnMain"
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
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
            <label htmlFor="directionNumber">Número</label>
            <input
              required="yes"
              name="directionNumber"
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
            <label htmlFor="directionFloor">Piso</label>
            <input name="directionFloor" onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)} />
          </div>
          <label htmlFor="postalCode">Código Postal</label>
          <div>
            <input
              required="yes"
              name="postalCode"
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
          </div>
          <label htmlFor="city">Ciudad</label>
          <div>
            <input
              required="yes"
              defaultValue="Madrid"
              name="city"
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
          </div>
          <label htmlFor="country">País</label>
          <div>
            <input
              required="yes"
              defaultValue="España"
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
            <input type="checkbox" value="Alquiler" />
            <span>Alquiler</span>

            <input type="checkbox" value="Venta" />
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
            <input type="radio" name="gvOperationClose" value="Alquilado" />
            <span>Vendido</span>
            <input type="radio" name="gvOperationClose" value="Vendido" />
          </div>
        </label>
      </div>
      <div>
        <label htmlFor="owner">Propietario</label>
        <Select list={owners} fields={{ groupBy: "", text: "fullName", value: "_id" }} fn={setOwner} />
      </div>
      <div>
        <label htmlFor="consultant">Consultor</label>
        <Select list={consultants} fields={{ groupBy: "", text: "fullName", value: "_id" }} fn={setConsultant} />
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
                <input type="checkbox" value="Casa" />
                <span>Piso</span>
                <input type="checkbox" value="Piso" />
                <span>Parcela</span>
                <input type="checkbox" value="Parcela" />
                <span>Ático</span>
                <input type="checkbox" value="Ático" />
                <span>Oficina</span>
                <input type="checkbox" value="Oficina" />
                <span>Edificio</span>
                <input type="checkbox" value="Edificio" />
                <span>Local</span>
                <input type="checkbox" value="Local" />
                <span>Campo Rústico</span>
                <input type="checkbox" value="Campo Rústico" />
                <span>Activos Singulares</span>
                <input type="checkbox" value="Activos Singulares" />
                <span>Costa</span>
                <input type="checkbox" value="Costa" />
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="zone">Zonas residencial</label>
            <Select
              list={residentials}
              fields={{ groupBy: "zone", text: "name", value: "_id" }}
              fn={setResidentialZones}
            />
          </div>
          <div>
            <label htmlFor="zone">Zonas patrimonial</label>
            <Select list={patrimonials} fields={{ groupBy: "", text: "name", value: "_id" }} fn={setPatrimonialZones} />
          </div>
          <div>
            <label htmlFor="department">Departamento</label>
            <select
              required
              name="department"
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
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
          </div>
          <div>
            <label htmlFor="buildSurface">Superficie construida</label>
            <input
              type="number"
              required="yes"
              name="buildSurface"
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
            m2
          </div>
          <div>
            <label htmlFor="plotSurface">Superficie de parcela</label>
            <input
              type="number"
              name="plotSurface"
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
            m2
          </div>
          <div>
            <label htmlFor="floor">Planta</label>
            <input
              type="text"
              name="floor"
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
          </div>
          <div>
            <label htmlFor="disponibility">Disponibilidad</label>
            <input
              type="text"
              name="disponibility"
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
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                €
                <br />
                <label htmlFor="saleShowOnWeb">Mostrar Web</label>
                <input
                  type="checkbox"
                  name="saleShowOnWeb"
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
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                €
                <br />
                <label htmlFor="rentShowOnWeb">Mostrar Web</label>
                <input
                  type="checkbox"
                  name="rentShowOnWeb"
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
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
            €/m2/mes
          </div>
          <div>
            <label htmlFor="expenses">Gastos</label>
            <input
              type="number"
              name="expenses"
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
            €/m2/mes
          </div>
          <div>
            <label htmlFor="expensesIncluded">Alquiler con gastos incluidos</label>
            <input
              type="number"
              name="expensesIncluded"
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
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
              €/mes
              <label htmlFor="expensesShowOnWeb">Mostrar en la web</label>
              <input
                type="checkbox"
                name="expensesShowOnWeb"
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
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
              €/mes
              <label htmlFor="ibiShowOnWeb">Mostrar en la web</label>
              <input
                type="checkbox"
                name="ibiShowOnWeb"
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.checked)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="buildingYear">Año de construcción</label>
            <input
              type="text"
              name="buildingYear"
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
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="bathrooms">Baños</label>
                <input
                  type="number"
                  name="bathrooms"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="parking">Plaza de garaje</label>
                <input
                  type="number"
                  name="parking"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="indoorPool">Piscina interior</label>
                <input
                  type="number"
                  name="indoorPool"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="outdoorPool">Piscina exterior</label>
                <input
                  type="number"
                  name="outdoorPool"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="jobPositions">Puestos de trabajo</label>
                <input
                  type="number"
                  name="jobPositions"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="subway">Metro</label>
                <input
                  type="text"
                  name="subway"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="bus">Bus</label>
                <input
                  type="text"
                  name="bus"
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
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="dumbwaiter">Montaplatos</label>
                <input
                  type="checkbox"
                  name="dumbwaiter"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="liftTruck">Montacargas</label>
                <input
                  type="checkbox"
                  name="liftTruck"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="airConditioning">Aire Acondicionado</label>
                <input
                  type="checkbox"
                  name="airConditioning"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="centralHeating">Calefacción Central</label>
                <input
                  type="checkbox"
                  name="centralHeating"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="floorHeating">Suelo radiante</label>
                <input
                  type="checkbox"
                  name="floorHeating"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="indoorAlarm">Alarma interior</label>
                <input
                  type="checkbox"
                  name="indoorAlarm"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="outdoorAlarm">Alarma perimetral</label>
                <input
                  type="checkbox"
                  name="outdoorAlarm"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="fullHoursSecurity">Seguridad 24 h</label>
                <input
                  type="checkbox"
                  name="fullHoursSecurity"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="gunRack">Armero</label>
                <input
                  type="checkbox"
                  name="gunRack"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="strongBox">Caja fuerte</label>
                <input
                  type="checkbox"
                  name="strongBox"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="well">Pozo</label>
                <input
                  type="checkbox"
                  name="well"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="homeAutomation">Domótica</label>
                <input
                  type="checkbox"
                  name="homeAutomation"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="centralVacuum">Aspiración centralizada</label>
                <input
                  type="checkbox"
                  name="centralVacuum"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="padelCourt">Pista de pádel</label>
                <input
                  type="checkbox"
                  name="padelCourt"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="tennisCourt">Pista de tenis</label>
                <input
                  type="checkbox"
                  name="tennisCourt"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="terrace">Terraza</label>
                <input
                  type="checkbox"
                  name="terrace"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="storage">Trastero</label>
                <input
                  type="checkbox"
                  name="storage"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="swimmingPool">Piscina</label>
                <input
                  type="checkbox"
                  name="swimmingPool"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="garage">Garaje</label>
                <input
                  type="checkbox"
                  name="garage"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="falseCeiling">Falso techo</label>
                <input
                  type="checkbox"
                  name="falseCeiling"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="raisedFloor">Suelo técnico</label>
                <input
                  type="checkbox"
                  name="raisedFloor"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="bathrooms">Baños</label>
                <input
                  type="checkbox"
                  name="bathrooms"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="freeHeight">Altura libre &gt; 2,5 m</label>
                <input
                  type="checkbox"
                  name="freeHeight"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="smokeOutlet">Salida de humos</label>
                <input
                  type="checkbox"
                  name="smokeOutlet"
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <label htmlFor="accesControl">Control de accesos</label>
                <input
                  type="checkbox"
                  name="accesControl"
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
              <textarea name="web" onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)} />
            </div>
            <div>
              <label htmlFor="emailPDF">Descripción email / PDF</label>
              <textarea
                max="600"
                name="emailPDF"
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="distribution">Distribución</label>
              <textarea
                name="distribution"
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
