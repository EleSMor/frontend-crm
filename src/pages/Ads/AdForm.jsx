import { useEffect, useState  } from "react";
import { useForm } from "react-hook-form";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Select } from "../../components";
import { useHistory } from "react-router-dom";
import { getAllOwners } from "../../api/contacts.api";
import { getAllConsultants } from "../../api/consultants.api";
import { getAllResidentialZones, getAllPatrimonialZones } from "../../api/zones.api";
import { createAd } from "../../api/ads.api.js";
import "./AdForm.scss";

const AdForm = ({ setOpenForm }) => {
  const [rows, setRows] = useState([]);
  const columnsArray = ["Planta", "Uso", "m2", "Precio (€)", "Disponibilidad"];
  console.log("Filas del cuadro de superficies:", rows);

  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState();

  const [selectedOwner, setSelectedOwner] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [selectedConsultant, setSelectedConsultant] = useState([]);
  const [residentials, setResidential] = useState([]);
  const [patrimonials, setPatrimonial] = useState([]);
  const [residentialSelectedZones, setResidentialSelectedZones] = useState([]);
  const [patrimonialSelectedZones, setPatrimonialSelectedZones] = useState([]);

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

  const onSubmit = async (data) => {
    data.owner = selectedOwner;
    data.consultant = selectedConsultant;
    data.residential = residentialSelectedZones;
    data.patrimonial = patrimonialSelectedZones;

    console.log(data);

    try {
      await createAd(data);
      history.push("/ads");
    } catch (err) {
      console.log("Error en la creación del anuncio: ", err);
      setError(error);
    }
  };

  useEffect(() => {
    getAllOwners().then((res) => setOwners(...owners, res));
    getAllConsultants().then((res) => setConsultants(...consultants, res));
    getAllResidentialZones().then((res) => setResidential(...residentials, res));
    getAllPatrimonialZones().then((res) => setPatrimonial(...patrimonials, res));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Título del anuncio</label>
        <input required="required" {...register("title")} />
      </div>
      <div>
        <label htmlFor="adReference">Referencia anuncio</label>
        <input required="required" {...register("adReference")} />
      </div>
      <div>
        <label htmlFor="showOnWeb">Mostrar en la web</label>
        <input type="checkbox" defaultValue="true" {...register("showOnWeb")} />
      </div>
      <div>
        <label htmlFor="featuredOnMain">Mostrar en la página principal</label>
        <input type="checkbox" {...register("featuredOnMain")} />
      </div>
      <div>
        <hr />
        <span>Dirección</span>
        <div>
          <label htmlFor="street">Calle</label>
          <div>
            <input required="yes" {...register("street")} />
            <label htmlFor="directionNumber">Número</label>
            <input required="yes" {...register("directionNumber")} />
            <label htmlFor="directionFloor">Piso</label>
            <input required="yes" {...register("directionFloor")} />
          </div>
          <label htmlFor="postalCode">Código Postal</label>
          <div>
            <input required="yes" {...register("postalCode")} />
          </div>
          <label htmlFor="city">Ciudad</label>
          <div>
            <input required="yes" defaultValue="Madrid" {...register("city")} />
          </div>
          <label htmlFor="country">País</label>
          <div>
            <input required="yes" defaultValue="España" {...register("country")} />
          </div>
        </div>
      </div>
      <div>
        <span>Tipo de anuncio</span>
        <div>
          <label htmlFor="adType">Alquiler</label>
          <input type="checkbox" value="Alquiler" required="yes" {...register("adType")} />
          <label htmlFor="adType">Venta</label>
          <input type="checkbox" value="Venta" required="yes" {...register("adType")} />
        </div>
      </div>
      <div>
        <span>Cierre operación GV</span>
        <div>
          <label htmlFor="gvOperationClose">Alquilado</label>
          <input type="radio" value="Alquilado" {...register("gvOperationClose")} />
          <label htmlFor="gvOperationClose">Vendido</label>
          <input type="radio" value="Vendido" {...register("gvOperationClose")} />
        </div>
      </div>
      <div>
        <label htmlFor="owner">Propietario</label>
        <Select list={owners} fields={{ groupBy: "", text: "fullName", value: "_id" }} fn={setSelectedOwner} />
      </div>
      <div>
        <label htmlFor="consultant">Consultor</label>
        <Select
          list={consultants}
          fields={{ groupBy: "", text: "fullName", value: "_id" }}
          fn={setSelectedConsultant}
        />
      </div>
      <Accordion multiple>
        <AccordionTab header="Información básica">
          <div>
            <span>Tipo de edificio</span>
            <div>
              <label htmlFor="adBuildingType">Casa</label>
              <input type="checkbox" value="Casa" {...register("adBuildingType")} />
              <label htmlFor="adBuildingType">Piso</label>
              <input type="checkbox" value="Piso" {...register("adBuildingType")} />
              <label htmlFor="adBuildingType">Parcela</label>
              <input type="checkbox" value="Parcela" {...register("adBuildingType")} />
              <label htmlFor="adBuildingType">Ático</label>
              <input type="checkbox" value="Ático" {...register("adBuildingType")} />
              <label htmlFor="adBuildingType">Oficina</label>
              <input type="checkbox" value="Oficina" {...register("adBuildingType")} />
              <label htmlFor="adBuildingType">Edificio</label>
              <input type="checkbox" value="Edificio" {...register("adBuildingType")} />
              <label htmlFor="adBuildingType">Local</label>
              <input type="checkbox" value="Local" {...register("adBuildingType")} />
              <label htmlFor="adBuildingType">Campo Rústico</label>
              <input type="checkbox" value="Campo Rústico" {...register("adBuildingType")} />
              <label htmlFor="adBuildingType">Activos Singulares</label>
              <input type="checkbox" value="Activos Singulares" {...register("adBuildingType")} />
              <label htmlFor="adBuildingType">Costa</label>
              <input type="checkbox" value="Costa" {...register("adBuildingType")} />
            </div>
          </div>
          <div>
            <label htmlFor="zone">Zonas residencial</label>
            <Select
              disabled={!patrimonialSelectedZones.length === 0 ? true : false}
              list={residentials}
              fields={{ groupBy: "zone", text: "name", value: "id" }}
              fn={setResidentialSelectedZones}
            />
          </div>
          <div>
            <label htmlFor="zone">Zonas patrimonial</label>
            <Select
              disabled={!residentialSelectedZones.length === 0 ? true : false}
              list={patrimonials}
              fields={{ groupBy: "", text: "name", value: "id" }}
              fn={setPatrimonialSelectedZones}
            />
          </div>
          <div>
            <label htmlFor="department">Departamento</label>
            <select required>
              <option value="" hidden>
                Seleccionar
              </option>
              <option value="Patrimonio" {...register("department")}>
                Patrimonio
              </option>
              <option value="Residencial" {...register("department")}>
                Residencial
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="webSubtitle">Subtítulo Web</label>
            <input type="text" {...register("webSubtitle")} />
          </div>
          <div>
            <label htmlFor="buildSurface">Superficie construida</label>
            <input type="number" required="yes" {...register("buildSurface")} />
            m2
          </div>
          <div>
            <label htmlFor="plotSurface">Superficie de parcela</label>
            <input type="number" {...register("plotSurface")} />
            m2
          </div>
          <div>
            <label htmlFor="floor">Planta</label>
            <input type="text" {...register("floor")} />
          </div>
          <div>
            <label htmlFor="disponibility">Disponibilidad</label>
            <input type="text" {...register("disponibility")} />
          </div>
          <hr />
          <div>Cuadro Superficies</div>
          <table className="surfaceBox">
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
          <hr />
          <div>
            <div>
              <span>Venta</span>
              <div>
                <label htmlFor="saleValue"></label>
                <input type="number" {...register("saleValue")} />€
                <br />
                <label htmlFor="saleShowOnWeb">Mostrar Web</label>
                <input type="checkbox" {...register("saleShowOnWeb")} />
              </div>
            </div>
            <div>
              <span>Alquiler</span>
              <div>
                <label htmlFor="rentValue"></label>
                <input type="number" {...register("rentValue")} />€
                <br />
                <label htmlFor="rentShowOnWeb">Mostrar Web</label>
                <input type="checkbox" {...register("rentShowOnWeb")} />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="monthlyRent">Renta mensual</label>
            <input type="number" {...register("monthlyRent")} />
            €/m2/mes
          </div>
          <div>
            <label htmlFor="expenses">Gastos</label>
            <input type="number" {...register("expenses")} />
            €/m2/mes
          </div>
          <div>
            <label htmlFor="expensesIncluded">Alquiler con gastos incluidos</label>
            <input type="number" {...register("expensesIncluded")} />
            €/mes
          </div>
          <div>
            <span>Gastos de comunidad</span>
            <div>
              <label htmlFor="expensesValue"></label>
              <input type="number" {...register("expensesValue")} />
              €/mes
              <label htmlFor="expensesShowOnWeb">Mostrar en la web</label>
              <input type="checkbox" {...register("expensesShowOnWeb")} />
            </div>
          </div>
          <div>
            <span>Ibi</span>
            <div>
              <label htmlFor="ibiValue"></label>
              <input type="number" {...register("ibiValue")} />
              €/mes
              <label htmlFor="ibiShowOnWeb">Mostrar en la web</label>
              <input type="checkbox" {...register("ibiShowOnWeb")} />
            </div>
          </div>
          <div>
            <label htmlFor="buildingYear">Año de construcción</label>
            <input type="text" {...register("buildingYear")} />
          </div>
        </AccordionTab>
        <AccordionTab header="Calidades">
          <div>
            <div>
              <div>
                <label htmlFor="bedrooms">Dormitorios</label>
                <input type="number" {...register("bedrooms")} />
              </div>
              <div>
                <label htmlFor="bathrooms">Baños</label>
                <input type="number" {...register("bathrooms")} />
              </div>
              <div>
                <label htmlFor="parking">Plaza de garaje</label>
                <input type="number" {...register("parking")} />
              </div>
              <div>
                <label htmlFor="indoorPool">Piscina interior</label>
                <input type="number" {...register("indoorPool")} />
              </div>
              <div>
                <label htmlFor="outdoorPool">Piscina exterior</label>
                <input type="number" {...register("outdoorPool")} />
              </div>
              <div>
                <label htmlFor="jobPositions">Puestos de trabajo</label>
                <input type="number" {...register("jobPositions")} />
              </div>
              <div>
                <label htmlFor="subway">Metro</label>
                <input type="text" {...register("subway")} />
              </div>
              <div>
                <label htmlFor="bus">Bus</label>
                <input type="text" {...register("bus")} />
              </div>
            </div>
            <div>
              <span>Otros</span>
              <div>
                <label htmlFor="lift">Ascensor</label>
                <input type="checkbox" {...register("lift")} />
                <label htmlFor="dumbwaiter">Montaplatos</label>
                <input type="checkbox" {...register("dumbwaiter")} />
                <label htmlFor="liftTruck">Montacargas</label>
                <input type="checkbox" {...register("liftTruck")} />
                <label htmlFor="airConditioning">Aire Acondicionado</label>
                <input type="checkbox" {...register("airConditioning")} />
                <label htmlFor="centralHeating">Calefacción Central</label>
                <input type="checkbox" {...register("centralHeating")} />
                <label htmlFor="floorHeating">Suelo radiante</label>
                <input type="checkbox" {...register("floorHeating")} />
                <label htmlFor="indoorAlarm">Alarma interior</label>
                <input type="checkbox" {...register("indoorAlarm")} />
                <label htmlFor="outdoorAlarm">Alarma perimetral</label>
                <input type="checkbox" {...register("outdoorAlarm")} />
                <label htmlFor="fullHoursSecurity">Seguridad 24 h</label>
                <input type="checkbox" {...register("fullHoursSecurity")} />
                <label htmlFor="gunRack">Armero</label>
                <input type="checkbox" {...register("gunRack")} />
                <label htmlFor="strongBox">Caja fuerte</label>
                <input type="checkbox" {...register("strongBox")} />
                <label htmlFor="well">Pozo</label>
                <input type="checkbox" {...register("well")} />
                <label htmlFor="homeAutomation">Domótica</label>
                <input type="checkbox" {...register("homeAutomation")} />
                <label htmlFor="centralVacuum">Aspiración centralizada</label>
                <input type="checkbox" {...register("centralVacuum")} />
                <label htmlFor="padelCourt">Pista de pádel</label>
                <input type="checkbox" {...register("padelCourt")} />
                <label htmlFor="tennisCourt">Pista de tenis</label>
                <input type="checkbox" {...register("tennisCourt")} />
                <label htmlFor="terrace">Terraza</label>
                <input type="checkbox" {...register("terrace")} />
                <label htmlFor="storage">Trastero</label>
                <input type="checkbox" {...register("storage")} />
                <label htmlFor="swimmingPool">Piscina</label>
                <input type="checkbox" {...register("swimmingPool")} />
                <label htmlFor="garage">Garaje</label>
                <input type="checkbox" {...register("garage")} />
                <label htmlFor="falseCeiling">Falso techo</label>
                <input type="checkbox" {...register("falseCeiling")} />
                <label htmlFor="raisedFloor">Suelo técnico</label>
                <input type="checkbox" {...register("raisedFloor")} />
                <label htmlFor="bathrooms">Baños</label>
                <input type="checkbox" {...register("bathrooms")} />
                <label htmlFor="freeHeight">Altura libre &gt; 2,5 m</label>
                <input type="checkbox" {...register("freeHeight")} />
                <label htmlFor="smokeOutlet">Salida de humos</label>
                <input type="checkbox" {...register("smokeOutlet")} />
                <label htmlFor="accesControl">Control de accesos</label>
                <input type="checkbox" {...register("accesControl")} />
              </div>
            </div>
          </div>
        </AccordionTab>
        <AccordionTab header="Descripción">
          <div>
            <div>
              <label htmlFor="web">Descripción web</label>
              <textarea {...register("web")} />
            </div>
            <div>
              <label htmlFor="emailPDF">Descripción email / PDF</label>
              <textarea max="600" {...register("emailPDF")} />
            </div>
            <div>
              <label htmlFor="distribution">Distribución</label>
              <textarea {...register("distribution")} />
            </div>
          </div>
        </AccordionTab>
      </Accordion>
      <button type="submit">Guardar</button>
      <button onClick={() => setOpenForm(false)} type="">
        Cancelar
      </button>
    </form>
  );
};

export default AdForm;
