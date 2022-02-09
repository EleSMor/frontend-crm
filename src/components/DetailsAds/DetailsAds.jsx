import React, { useState, useEffect } from "react";
import SurfacesBox from "../SurfacesBox/SurfacesBox";
import { Accordion, AccordionTab } from "primereact/accordion";
import Checkboxes from "../../components/CheckBox/Checkboxes";
import Checkbox from "../../components/CheckBox/Checkbox";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Textarea/Textarea";
import InputsGroup from "../../components/InputsGroup/InputsGroup";
import Multicheckbox from "../../components/CheckBox/Multicheckbox";
import useWindowSize from "../../hooks/useWindowSize";
import { Select, MultiSelect } from "./../index";
import { TiArrowUnsorted } from "react-icons/ti";
import { RiInboxArchiveLine, Ri24HoursLine } from "react-icons/ri";
import { BsSnow3, BsThermometerSun, BsBoxSeam } from "react-icons/bs";
import { MdOutlineSecurity, MdOutlineYard, MdRoofing, MdOutlineElevator } from "react-icons/md";
import { FaSwimmingPool, FaGripLines, FaSink, FaSmog } from "react-icons/fa";
import { AiOutlineVerticalAlignTop } from "react-icons/ai";
import {
  GiLockedDoor,
  GiHomeGarage,
  GiStrongbox,
  GiPistolGun,
  GiHotSurface,
  GiWell,
  GiVacuumCleaner,
  GiPingPongBat,
  GiTennisCourt,
  GiSecurityGate,
} from "react-icons/gi";
import { GoCircuitBoard } from "react-icons/go";
import "./DetailsAds.scss";

const DetailsAds = ({
  formProps,
  id,
  owners,
  owner,
  consultants,
  consultant,
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
  setDepartment,
}) => {
  const [zone, setZone] = useState(formProps.values.department);
  const size = useWindowSize();

  const newSelect = (selected, setSelected, ev) => {
    if (selected.includes(ev.target.value)) {
      const newSelected = selected.filter((selected) => selected !== ev.target.value);
      setSelected(newSelected);
    } else {
      setSelected([...selected, ev.target.value]);
    }
  };

  useEffect(() => setZone(formProps.values.department), [formProps.values.department]);

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

  const validateZone = (zones) => {
    return zones.some((zone) => formProps.values.zone.includes(zone._id));
  };

  return (
    <>
      <div className="DetailsAds__container">
        <div className="DetailsAds__container__col">
          <div>
            <Checkbox
              label="Mostrar en la web"
              name="showOnWeb"
              checked={formProps.values.showOnWeb}
              onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.showOnWeb)}
            />
          </div>
          <div>
            <Input
              value={formProps.values.title}
              label="Título del anuncio"
              name="title"
              placeholder="Escribe aquí"
              required="required"
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
          </div>
          <div>
            <Checkbox
              label="Destacado Web"
              name="featuredOnMain"
              checked={formProps.values.featuredOnMain}
              onChange={(ev) => {
                formProps.setFieldValue(ev.target.name, !formProps.values.featuredOnMain);
              }}
            />
          </div>

          <div style={{ display: "flex" }}>
            <InputsGroup
              label="Dirección"
              inputs={[
                {
                  name: "street",
                  label: "Calle",
                  value: formProps.values.street,
                  onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                  required: true,
                  style: "direction",
                  errors: "",
                },
                {
                  name: "directionNumber",
                  label: "Número",
                  value: formProps.values.directionNumber,
                  onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                  required: true,
                  style: "direction",
                  errors: "",
                },
                {
                  name: "directionFloor",
                  label: "Piso",
                  value: formProps.values.directionFloor,
                  onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                  style: "direction",
                  errors: "",
                },
                {
                  name: "postalCode",
                  label: "Código postal",
                  value: formProps.values.postalCode,
                  onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                  style: "direction",
                  errors: "",
                },
                {
                  name: "city",
                  label: "Ciudad",
                  value: formProps.values.city,
                  onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                  style: "direction",
                  errors: "",
                },
                {
                  name: "country",
                  label: "País",
                  value: formProps.values.country,
                  onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                  style: "direction",
                  errors: "",
                },
              ]}
              directionStyle="direction"
            />
          </div>
          <div className="DetailsAds__container">
            <div className="DetailsAds__container__col">
              <Checkboxes
                label="Tipo de anuncio"
                textA="Alquiler"
                valueA="Alquiler"
                onChangeA={(ev) => newSelect(adType, setAdType, ev)}
                checkedA={adType.includes("Alquiler") ? true : ""}
                textB="Venta"
                valueB="Venta"
                onChangeB={(ev) => newSelect(adType, setAdType, ev)}
                checkedB={adType.includes("Venta") ? true : ""}
              />
            </div>
            <div className="DetailsAds__container__col">
              <Checkboxes
                label="Cierre operación GV"
                type="radio"
                textA="Alquilado"
                valueA="Alquilado"
                onChangeA={(ev) => {
                  formProps.setFieldValue("gvOperationClose", ev.target.value);
                }}
                checkedA={formProps.values.gvOperationClose === "Alquilado" ? true : ""}
                textB="Vendido"
                valueB="Vendido"
                onChangeB={(ev) => {
                  formProps.setFieldValue("gvOperationClose", ev.target.value);
                }}
                checkedB={formProps.values.gvOperationClose === "Vendido" ? true : ""}
                textC="Ninguno"
                valueC=""
                onChangeC={(ev) => {
                  formProps.setFieldValue("gvOperationClose", ev.target.value);
                }}
                checkedC={formProps.values.gvOperationClose === "" ? true : ""}
              />
            </div>
          </div>
        </div>

        <div className="DetailsAds__container__col">
          <div>
            <Select
              label="Propietario"
              list={owners}
              fields={{ groupBy: "", text: "fullName", value: "_id" }}
              filter={(e) => {
                const searchData = owners.filter((owner) => {
                  if (
                    checkIfIncludes(owner.fullName, e.text) ||
                    checkIfIncludes(owner.email, e.text) ||
                    checkIfIncludes(owner.company, e.text) ||
                    checkIfIncludes(owner.contactMobileNumber, e.text)
                  )
                    return owner;
                });
                if (searchData.length !== 0) e.updateData(searchData);
                else e.updateData([]);
              }}
              fn={(ev) => {
                setOwner(ev.target.value);
              }}
              defaultValues={owner ? owner : ""}
            />
          </div>
          <div>
            <Select
              label="Consultor"
              list={consultants}
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
              fields={{ text: "fullName", value: "_id" }}
              fn={(ev) => {
                setConsultant(ev.target.value);
              }}
              defaultValues={consultant ? consultant : ""}
            />
          </div>
          <div>
            <Input
              required="required"
              label="Referencia del anuncio"
              name="adReference"
              value={formProps.values.adReference}
              onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
            />
          </div>
        </div>
      </div>

      <Accordion multiple>
        {/* INFORMACIÓN BÁSICA ----------------------------------------------------------------------------------------------------------- */}
        <AccordionTab header="Información básica">
          <div className="DetailsAds__container">
            <div className="DetailsAds__container__col">
              <div>
                <Multicheckbox
                  label="Tipo de inmueble"
                  required={buildingType.length === 0 ? true : false}
                  onChange={(ev) => newSelect(buildingType, setBuildingType, ev)}
                  inputs={[
                    {
                      value: "Casa",
                      checked: buildingType.includes("Casa") ? true : "",
                      onChange: (ev) => newSelect(buildingType, setBuildingType, ev),
                    },
                    {
                      value: "Piso",
                      checked: buildingType.includes("Piso") ? true : "",
                      onChange: (ev) => newSelect(buildingType, setBuildingType, ev),
                    },
                    {
                      value: "Parcela",
                      checked: buildingType.includes("Parcela") ? true : "",
                      onChange: (ev) => newSelect(buildingType, setBuildingType, ev),
                    },
                    {
                      value: "Ático",
                      checked: buildingType.includes("Ático") ? true : "",
                      onChange: (ev) => newSelect(buildingType, setBuildingType, ev),
                    },
                    {
                      value: "Oficina",
                      checked: buildingType.includes("Oficina") ? true : "",
                      onChange: (ev) => newSelect(buildingType, setBuildingType, ev),
                    },
                    {
                      value: "Edificio",
                      checked: buildingType.includes("Edificio") ? true : "",
                      onChange: (ev) => newSelect(buildingType, setBuildingType, ev),
                    },
                    {
                      value: "Local",
                      checked: buildingType.includes("Local") ? true : "",
                      onChange: (ev) => newSelect(buildingType, setBuildingType, ev),
                    },
                    {
                      value: "Campo Rústico",
                      checked: buildingType.includes("Campo Rústico") ? true : "",
                      onChange: (ev) => newSelect(buildingType, setBuildingType, ev),
                    },
                    {
                      value: "Activos singulares",
                      checked: buildingType.includes("Activos singulares") ? true : "",
                      onChange: (ev) => newSelect(buildingType, setBuildingType, ev),
                    },
                    {
                      value: "Costa",
                      checked: buildingType.includes("Costa") ? true : "",
                      onChange: (ev) => newSelect(buildingType, setBuildingType, ev),
                    },
                  ]}
                />
              </div>
              <div>
                <div>
                  <Select
                    label="Departamento"
                    list={[{ name: "Patrimonio" }, { name: "Residencial" }]}
                    fields={{ groupBy: "", text: "name", value: "name" }}
                    filter={(e) => {
                      const searchData = [{ name: "Patrimonio" }, { name: "Residencial" }].filter((department) =>
                        checkIfIncludes(department.name, e.text)
                      );
                      e.updateData(searchData);
                    }}
                    fn={(e) => {
                      setDepartment(e.value);
                      setZone(e.value);
                      if (e.value === "Residencial") setPatrimonialZones([]);
                      if (e.value === "Patrimonio") setResidentialZones([]);
                      formProps.setFieldValue("department", e.value);
                      formProps.setFieldValue("zone", []);
                    }}
                    defaultValues={formProps.values.department ? formProps.values.department : ""}
                  />
                </div>
              </div>
              <div>
                {zone === "Residencial" && (
                  <div>
                    <MultiSelect
                      label="Residencial"
                      list={residentials}
                      mode={"Checkbox"}
                      fields={{ groupBy: "zone", text: "name", value: "_id" }}
                      onChange={(ev) => setResidentialZones(ev.value)}
                      value={validateZone(residentials) ? formProps.values.zone : []}
                    />
                  </div>
                )}
                {zone === "Patrimonio" && (
                  <div>
                    <MultiSelect
                      label="Patrimonial"
                      list={patrimonials}
                      mode={"Checkbox"}
                      fields={{ groupBy: "", text: "name", value: "_id" }}
                      onChange={(ev) => {
                        setPatrimonialZones(ev.value);
                        formProps.setFieldValue("zone", ev.value);
                      }}
                      value={validateZone(patrimonials) ? formProps.values.zone : []}
                    />
                  </div>
                )}
              </div>
              <div>
                <Textarea
                  label="Subtítulo Web"
                  type="text"
                  name="webSubtitle"
                  placeholder="Escribe aquí"
                  value={formProps.values.webSubtitle}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Planta"
                  type="text"
                  placeholder="Escribe aquí"
                  name="floor"
                  value={formProps.values.floor}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Disponibilidad"
                  type="text"
                  placeholder="Escribe aquí"
                  name="disponibility"
                  value={formProps.values.disponibility}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <br />
              <SurfacesBox formProps={formProps} />
            </div>
            <div className="DetailsAds__container__col">
              <div className="DetailsAds__container__col--item">
                <InputsGroup
                  label="Precio"
                  inputs={[
                    {
                      name: "saleValue",
                      label: "Venta",
                      type: "number",
                      placeholder: "Escribe aquí",
                      value: formProps.values.saleValue === 0 ? "" : formProps.values.saleValue,
                      lang: "es-ES",
                      onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                      span: <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>€</span>,
                      errors: "",
                    },
                    {
                      name: "saleShowOnWeb",
                      label: "Mostrar Web",
                      type: "checkbox",
                      checked: formProps.values.saleShowOnWeb,
                      lang: "es-ES",
                      onChange: (ev) => formProps.setFieldValue(ev.target.name, !formProps.values.saleShowOnWeb),
                      errors: "",
                    },
                    {
                      name: "rentValue",
                      label: "Alquiler",
                      type: "number",
                      placeholder: "Escribe aquí",
                      value: formProps.values.rentValue === 0 ? "" : formProps.values.rentValue,
                      lang: "es-ES",
                      onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                      span: <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>€/mes</span>,
                      errors: "",
                    },
                    {
                      name: "rentShowOnWeb",
                      label: "Mostrar Web",
                      type: "checkbox",
                      checked: formProps.values.rentShowOnWeb,
                      lang: "es-ES",
                      onChange: (ev) => formProps.setFieldValue(ev.target.name, !formProps.values.rentShowOnWeb),
                      errors: "",
                    },
                  ]}
                />
              </div>
              <div style={{ position: "relative" }}>
                <Input
                  label="Superficie construida"
                  type="number"
                  required={true}
                  name="buildSurface"
                  placeholder="Escribe aquí"
                  value={formProps.values.buildSurface}
                  onChange={(ev) => {
                    formProps.setFieldValue(ev.target.name, ev.target.value);
                    formProps.setFieldValue("rentValue", ev.target.value * formProps.values.monthlyRent);
                  }}
                />
                <span style={{ position: "absolute", right: "0.5%", top: "72%" }}>
                  m<sup>2</sup>
                </span>
              </div>
              <div style={{ position: "relative" }}>
                <Input
                  label="Superficie de parcela"
                  type="number"
                  name="plotSurface"
                  placeholder="Escribe aquí"
                  value={formProps.values.plotSurface}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
                <span style={{ position: "absolute", right: "0.5%", top: "72%" }}>
                  m<sup>2</sup>
                </span>
              </div>
              <div className="DetailsAds__container__col--item">
                <InputsGroup
                  label="Alquiler Patrimonio"
                  inputs={[
                    {
                      name: "monthlyRent",
                      label: "Renta mensual",
                      type: "number",
                      placeholder: "Escribe aquí",
                      value: formProps.values.monthlyRent,
                      lang: "es-ES",
                      onChange: (ev) => {
                        formProps.setFieldValue(ev.target.name, ev.target.value);
                        formProps.setFieldValue("rentValue", ev.target.value * formProps.values.buildSurface);
                        formProps.setFieldValue(
                          "expensesIncluded",
                          ev.target.value * formProps.values.buildSurface +
                            formProps.values.expenses * formProps.values.buildSurface
                        );
                      },
                      span: (
                        <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>
                          €/m<sup>2</sup>/mes
                        </span>
                      ),
                      errors: "",
                    },
                    {
                      name: "expenses",
                      label: "Gastos",
                      type: "number",
                      value: formProps.values.expenses,
                      placeholder: "Escribe aquí",
                      lang: "es-ES",
                      onChange: (ev) => {
                        formProps.setFieldValue(ev.target.name, ev.target.value);
                        formProps.setFieldValue(
                          "expensesIncluded",
                          formProps.values.monthlyRent * formProps.values.buildSurface +
                            formProps.values.buildSurface * ev.target.value
                        );
                      },
                      span: (
                        <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>
                          €/m<sup>2</sup>/mes
                        </span>
                      ),
                      errors: "",
                    },
                    {
                      name: "expensesIncluded",
                      label: "Alquiler con gastos incluidos",
                      type: "number",
                      value:
                        formProps.values.buildSurface * formProps.values.monthlyRent +
                        formProps.values.buildSurface * formProps.values.expenses,
                      lang: "es-ES",
                      onChange: () => "",
                      required: true,
                      span: <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>€/mes</span>,
                      errors: "",
                    },
                  ]}
                />
              </div>

              <div className="DetailsAds__container__col--item">
                <InputsGroup
                  label="Gastos de comunidad"
                  inputs={[
                    {
                      name: "expensesValue",
                      label: "",
                      type: "number",
                      value: formProps.values.expensesValue,
                      onChange: (e) => formProps.setFieldValue("expensesValue", e.target.value),
                      span: <span style={{ position: "absolute", right: "0.5%", top: "10%" }}>€/mes</span>,
                      errors: "",
                    },
                    {
                      name: "expensesShowOnWeb",
                      label: "Mostrar Web",
                      type: "checkbox",
                      value: formProps.values.expensesShowOnWeb,
                      onChange: (ev) => formProps.setFieldValue(ev.target.name, !formProps.values.expensesShowOnWeb),
                      errors: "",
                    },
                  ]}
                />
              </div>
              <div className="DetailsAds__container__col--item">
                <InputsGroup
                  label="Ibi"
                  inputs={[
                    {
                      name: "ibiValue",
                      label: "",
                      type: "number",
                      placeholder: "Escribe aquí",
                      value: formProps.values.ibiValue,
                      onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                      span: <span style={{ position: "absolute", right: "0.5%", top: "10%" }}>€/año</span>,
                      errors: "",
                    },
                    {
                      name: "ibiShowOnWeb",
                      label: "Mostrar Web",
                      type: "checkbox",
                      value: formProps.values.ibiShowOnWeb,
                      onChange: (ev) => formProps.setFieldValue(ev.target.name, !formProps.values.ibiShowOnWeb),
                      errors: "",
                    },
                  ]}
                />
              </div>
              <div className="DetailsAds__container__col--item">
                <Input
                  type="text"
                  label="Año de construcción"
                  placeholder="Escribe aquí"
                  name="buildingYear"
                  value={formProps.values.buildingYear}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
            </div>
          </div>
        </AccordionTab>
        <AccordionTab header="Calidades">
          <div className="DetailsAds__container">
            <div className="DetailsAds__container__col">
              <div>
                <Input
                  type="number"
                  name="bedrooms"
                  label="Dormitorios"
                  placeholder="Escribe aquí"
                  value={formProps.values.bedrooms}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Baños"
                  type="number"
                  name="bathrooms"
                  value={formProps.values.bathrooms}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Plaza de garaje"
                  type="number"
                  name="parking"
                  value={formProps.values.parking}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Piscina interior"
                  type="number"
                  name="indoorPool"
                  value={formProps.values.indoorPool}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Piscina exterior"
                  type="number"
                  name="outdoorPool"
                  value={formProps.values.outdoorPool}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Puestos de trabajo"
                  type="number"
                  name="jobPositions"
                  value={formProps.values.jobPositions}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Metro"
                  type="text"
                  name="subway"
                  value={formProps.values.subway}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Bus"
                  type="text"
                  name="bus"
                  value={formProps.values.bus}
                  onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                />
              </div>
            </div>
            {/* Calidades --------------- Otros */}
            <div className="DetailsAds__container__col">
              <label>Otros</label>
              <div className="DetailsAds__container__col--item">
                {size > 478 ? (
                  <>
                    <div className="DetailsAds__container__col--qualities">
                      <div>
                        <div>
                          <MdOutlineElevator style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label style={{ marginRight: 64 }} htmlFor="lift">
                            Ascensor
                          </label>
                        </div>
                        <input
                          type="checkbox"
                          name="lift"
                          checked={formProps.values.lift}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.lift)}
                        />
                      </div>
                      <div>
                        <div>
                          <TiArrowUnsorted style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="dumbwaiter">Montaplatos</label>
                        </div>
                        <input
                          type="checkbox"
                          name="dumbwaiter"
                          checked={formProps.values.dumbwaiter}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.dumbwaiter)}
                        />
                      </div>
                      <div>
                        <div>
                          <RiInboxArchiveLine style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="liftTruck">Montacargas</label>
                        </div>
                        <input
                          type="checkbox"
                          name="liftTruck"
                          checked={formProps.values.liftTruck}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.liftTruck)}
                        />
                      </div>
                      <div>
                        <div>
                          <BsSnow3 style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="airConditioning">Aire Acondicionado</label>
                        </div>
                        <input
                          type="checkbox"
                          name="airConditioning"
                          checked={formProps.values.airConditioning}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.airConditioning)}
                        />
                      </div>
                      <div>
                        <div>
                          <BsThermometerSun style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="centralHeating">Calefacción Central</label>
                        </div>
                        <input
                          type="checkbox"
                          name="centralHeating"
                          checked={formProps.values.centralHeating}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.centralHeating)}
                        />
                      </div>
                      <div>
                        <div>
                          <GiHotSurface style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="floorHeating">Suelo radiante</label>
                        </div>
                        <input
                          type="checkbox"
                          name="floorHeating"
                          checked={formProps.values.floorHeating}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.floorHeating)}
                        />
                      </div>
                      <div>
                        <div>
                          <GiLockedDoor style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="indoorAlarm">Alarma interior</label>
                        </div>
                        <input
                          type="checkbox"
                          name="indoorAlarm"
                          checked={formProps.values.indoorAlarm}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.indoorAlarm)}
                        />
                      </div>
                      <div>
                        <div>
                          <MdOutlineSecurity style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="outdoorAlarm">Alarma perimetral</label>
                        </div>
                        <input
                          type="checkbox"
                          name="outdoorAlarm"
                          checked={formProps.values.outdoorAlarm}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.outdoorAlarm)}
                        />
                      </div>
                      <div>
                        <div>
                          <Ri24HoursLine style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="fullHoursSecurity">Seguridad 24 h</label>
                        </div>
                        <input
                          type="checkbox"
                          name="fullHoursSecurity"
                          checked={formProps.values.fullHoursSecurity}
                          onChange={(ev) =>
                            formProps.setFieldValue(ev.target.name, !formProps.values.fullHoursSecurity)
                          }
                        />
                      </div>
                      <div>
                        <div>
                          <GiPistolGun style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="gunRack">Armero</label>
                        </div>
                        <input
                          type="checkbox"
                          name="gunRack"
                          checked={formProps.values.gunRack}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.gunRack)}
                        />
                      </div>
                      <div>
                        <div>
                          <GiStrongbox style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="strongBox">Caja fuerte</label>
                        </div>
                        <input
                          type="checkbox"
                          name="strongBox"
                          checked={formProps.values.strongBox}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.strongBox)}
                        />
                      </div>
                      <div>
                        <div>
                          <GiWell style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="well">Pozo</label>
                        </div>
                        <input
                          type="checkbox"
                          name="well"
                          checked={formProps.values.well}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.well)}
                        />
                      </div>
                      <div>
                        <div>
                          <GoCircuitBoard style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="homeAutomation">Domótica</label>
                        </div>
                        <input
                          type="checkbox"
                          name="homeAutomation"
                          checked={formProps.values.homeAutomation}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.homeAutomation)}
                        />
                      </div>
                    </div>
                    <div className="DetailsAds__container__col--qualities">
                      <div>
                        <div>
                          <GiVacuumCleaner style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="centralVacuum">Aspiración centralizada</label>
                        </div>
                        <input
                          type="checkbox"
                          name="centralVacuum"
                          checked={formProps.values.centralVacuum}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.centralVacuum)}
                        />
                      </div>
                      <div>
                        <div>
                          <GiPingPongBat style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="padelCourt">Pista de pádel</label>
                        </div>
                        <input
                          type="checkbox"
                          name="padelCourt"
                          checked={formProps.values.padelCourt}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.padelCourt)}
                        />
                      </div>
                      <div>
                        <div>
                          <GiTennisCourt style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="tennisCourt">Pista de tenis</label>
                        </div>
                        <input
                          type="checkbox"
                          name="tennisCourt"
                          checked={formProps.values.tennisCourt}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.tennisCourt)}
                        />
                      </div>
                      <div>
                        <div>
                          <MdOutlineYard style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="terrace">Terraza</label>
                        </div>
                        <input
                          type="checkbox"
                          name="terrace"
                          checked={formProps.values.terrace}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.terrace)}
                        />
                      </div>
                      <div>
                        <div>
                          <BsBoxSeam style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="storage">Trastero</label>
                        </div>
                        <input
                          type="checkbox"
                          name="storage"
                          checked={formProps.values.storage}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.storage)}
                        />
                      </div>
                      <div>
                        <div>
                          <FaSwimmingPool style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="swimmingPool">Piscina</label>
                        </div>
                        <input
                          type="checkbox"
                          name="swimmingPool"
                          checked={formProps.values.swimmingPool}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.swimmingPool)}
                        />
                      </div>
                      <div>
                        <div>
                          <GiHomeGarage style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="garage">Garaje</label>
                        </div>
                        <input
                          type="checkbox"
                          name="garage"
                          checked={formProps.values.garage}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.garage)}
                        />
                      </div>
                      <div>
                        <div>
                          <MdRoofing style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="falseCeiling">Falso techo</label>
                        </div>
                        <input
                          type="checkbox"
                          name="falseCeiling"
                          checked={formProps.values.falseCeiling}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.falseCeiling)}
                        />
                      </div>
                      <div>
                        <div>
                          <FaGripLines style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="raisedFloor">Suelo técnico</label>
                        </div>
                        <input
                          type="checkbox"
                          name="raisedFloor"
                          checked={formProps.values.raisedFloor}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.raisedFloor)}
                        />
                      </div>
                      <div>
                        <div>
                          <FaSink style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="qualityBathrooms">Baños</label>
                        </div>
                        <input
                          type="checkbox"
                          name="qualityBathrooms"
                          checked={formProps.values.qualityBathrooms}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.qualityBathrooms)}
                        />
                      </div>
                      <div>
                        <div>
                          <AiOutlineVerticalAlignTop style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="freeHeight">Altura libre &gt; 2,5 m</label>
                        </div>
                        <input
                          type="checkbox"
                          name="freeHeight"
                          checked={formProps.values.freeHeight}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.freeHeight)}
                        />
                      </div>
                      <div>
                        <div>
                          <FaSmog style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="smokeOutlet">Salida de humos</label>
                        </div>
                        <input
                          type="checkbox"
                          name="smokeOutlet"
                          checked={formProps.values.smokeOutlet}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.smokeOutlet)}
                        />
                      </div>
                      <div>
                        <div>
                          <GiSecurityGate style={{ marginRight: "20", transform: "scale(150%)" }} />
                          <label htmlFor="accessControl">Control de accesos</label>
                        </div>
                        <input
                          type="checkbox"
                          name="accessControl"
                          checked={formProps.values.accessControl}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.accessControl)}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="DetailsAds__container__col--qualities">
                    <div>
                      <div>
                        <MdOutlineElevator style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label style={{ marginRight: 64 }} htmlFor="lift">
                          Ascensor
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        name="lift"
                        checked={formProps.values.lift}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.lift)}
                      />
                    </div>
                    <div>
                      <div>
                        <TiArrowUnsorted style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="dumbwaiter">Montaplatos</label>
                      </div>
                      <input
                        type="checkbox"
                        name="dumbwaiter"
                        checked={formProps.values.dumbwaiter}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.dumbwaiter)}
                      />
                    </div>
                    <div>
                      <div>
                        <RiInboxArchiveLine style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="liftTruck">Montacargas</label>
                      </div>
                      <input
                        type="checkbox"
                        name="liftTruck"
                        checked={formProps.values.liftTruck}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.liftTruck)}
                      />
                    </div>
                    <div>
                      <div>
                        <BsSnow3 style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="airConditioning">Aire Acondicionado</label>
                      </div>
                      <input
                        type="checkbox"
                        name="airConditioning"
                        checked={formProps.values.airConditioning}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.airConditioning)}
                      />
                    </div>
                    <div>
                      <div>
                        <BsThermometerSun style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="centralHeating">Calefacción Central</label>
                      </div>
                      <input
                        type="checkbox"
                        name="centralHeating"
                        checked={formProps.values.centralHeating}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.centralHeating)}
                      />
                    </div>
                    <div>
                      <div>
                        <GiHotSurface style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="floorHeating">Suelo radiante</label>
                      </div>
                      <input
                        type="checkbox"
                        name="floorHeating"
                        checked={formProps.values.floorHeating}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.floorHeating)}
                      />
                    </div>
                    <div>
                      <div>
                        <GiLockedDoor style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="indoorAlarm">Alarma interior</label>
                      </div>
                      <input
                        type="checkbox"
                        name="indoorAlarm"
                        checked={formProps.values.indoorAlarm}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.indoorAlarm)}
                      />
                    </div>
                    <div>
                      <div>
                        <MdOutlineSecurity style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="outdoorAlarm">Alarma perimetral</label>
                      </div>
                      <input
                        type="checkbox"
                        name="outdoorAlarm"
                        checked={formProps.values.outdoorAlarm}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.outdoorAlarm)}
                      />
                    </div>
                    <div>
                      <div>
                        <Ri24HoursLine style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="fullHoursSecurity">Seguridad 24 h</label>
                      </div>
                      <input
                        type="checkbox"
                        name="fullHoursSecurity"
                        checked={formProps.values.fullHoursSecurity}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.fullHoursSecurity)}
                      />
                    </div>
                    <div>
                      <div>
                        <GiPistolGun style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="gunRack">Armero</label>
                      </div>
                      <input
                        type="checkbox"
                        name="gunRack"
                        checked={formProps.values.gunRack}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.gunRack)}
                      />
                    </div>
                    <div>
                      <div>
                        <GiStrongbox style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="strongBox">Caja fuerte</label>
                      </div>
                      <input
                        type="checkbox"
                        name="strongBox"
                        checked={formProps.values.strongBox}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.strongBox)}
                      />
                    </div>
                    <div>
                      <div>
                        <GiWell style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="well">Pozo</label>
                      </div>
                      <input
                        type="checkbox"
                        name="well"
                        checked={formProps.values.well}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.well)}
                      />
                    </div>
                    <div>
                      <div>
                        <GoCircuitBoard style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="homeAutomation">Domótica</label>
                      </div>
                      <input
                        type="checkbox"
                        name="homeAutomation"
                        checked={formProps.values.homeAutomation}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.homeAutomation)}
                      />
                    </div>

                    <div>
                      <div>
                        <GiVacuumCleaner style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="centralVacuum">Aspiración centralizada</label>
                      </div>
                      <input
                        type="checkbox"
                        name="centralVacuum"
                        checked={formProps.values.centralVacuum}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.centralVacuum)}
                      />
                    </div>
                    <div>
                      <div>
                        <GiPingPongBat style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="padelCourt">Pista de pádel</label>
                      </div>
                      <input
                        type="checkbox"
                        name="padelCourt"
                        checked={formProps.values.padelCourt}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.padelCourt)}
                      />
                    </div>
                    <div>
                      <div>
                        <GiTennisCourt style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="tennisCourt">Pista de tenis</label>
                      </div>
                      <input
                        type="checkbox"
                        name="tennisCourt"
                        checked={formProps.values.tennisCourt}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.tennisCourt)}
                      />
                    </div>
                    <div>
                      <div>
                        <MdOutlineYard style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="terrace">Terraza</label>
                      </div>
                      <input
                        type="checkbox"
                        name="terrace"
                        checked={formProps.values.terrace}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.terrace)}
                      />
                    </div>
                    <div>
                      <div>
                        <BsBoxSeam style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="storage">Trastero</label>
                      </div>
                      <input
                        type="checkbox"
                        name="storage"
                        checked={formProps.values.storage}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.storage)}
                      />
                    </div>
                    <div>
                      <div>
                        <FaSwimmingPool style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="swimmingPool">Piscina</label>
                      </div>
                      <input
                        type="checkbox"
                        name="swimmingPool"
                        checked={formProps.values.swimmingPool}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.swimmingPool)}
                      />
                    </div>
                    <div>
                      <div>
                        <GiHomeGarage style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="garage">Garaje</label>
                      </div>
                      <input
                        type="checkbox"
                        name="garage"
                        checked={formProps.values.garage}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.garage)}
                      />
                    </div>
                    <div>
                      <div>
                        <MdRoofing style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="falseCeiling">Falso techo</label>
                      </div>
                      <input
                        type="checkbox"
                        name="falseCeiling"
                        checked={formProps.values.falseCeiling}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.falseCeiling)}
                      />
                    </div>
                    <div>
                      <div>
                        <FaGripLines style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="raisedFloor">Suelo técnico</label>
                      </div>
                      <input
                        type="checkbox"
                        name="raisedFloor"
                        checked={formProps.values.raisedFloor}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.raisedFloor)}
                      />
                    </div>
                    <div>
                      <div>
                        <FaSink style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="bathrooms">Baños</label>
                      </div>
                      <input
                        type="checkbox"
                        name="bathrooms"
                        checked={formProps.values.qualityBathrooms}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.bathrooms)}
                      />
                    </div>
                    <div>
                      <div>
                        <AiOutlineVerticalAlignTop style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="freeHeight">Altura libre &gt; 2,5 m</label>
                      </div>
                      <input
                        type="checkbox"
                        name="freeHeight"
                        checked={formProps.values.freeHeight}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.freeHeight)}
                      />
                    </div>
                    <div>
                      <div>
                        <FaSmog style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="smokeOutlet">Salida de humos</label>
                      </div>
                      <input
                        type="checkbox"
                        name="smokeOutlet"
                        checked={formProps.values.smokeOutlet}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.smokeOutlet)}
                      />
                    </div>
                    <div>
                      <div>
                        <GiSecurityGate style={{ marginRight: "20", transform: "scale(150%)" }} />
                        <label htmlFor="accessControl">Control de accesos</label>
                      </div>
                      <input
                        type="checkbox"
                        name="accessControl"
                        checked={formProps.values.accessControl}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, !formProps.values.accessControl)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AccordionTab>
        <AccordionTab header="Descripción">
          <div>
            <div>
              <Textarea
                name="web"
                label="Descripción web"
                placeholder="Escribe aquí"
                value={formProps.values.web}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <Textarea
                max="600"
                name="emailPDF"
                placeholder="Escribe aquí"
                label="Descripción email / PDF"
                value={formProps.values.emailPDF}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <Textarea
                name="distribution"
                label="Distribución"
                placeholder="Escribe aquí"
                value={formProps.values.distribution}
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </>
  );
};

export default DetailsAds;
