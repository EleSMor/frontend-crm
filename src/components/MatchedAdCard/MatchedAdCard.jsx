import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { useParams, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import Spinner from "../../components/Spinner/Spinner";
import { MultiSelect } from "../../components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { AiOutlineReload } from "react-icons/ai";
import { BiBuildingHouse } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { GiPapers } from "react-icons/gi";
import { RiMoneyEuroBoxLine } from "react-icons/ri";
import { MdHeight } from "react-icons/md";
import { ImMap2 } from "react-icons/im";
import InputsGroup from "../../components/InputsGroup/InputsGroup";
import useWindowSize from "../../hooks/useWindowSize";
import "reactjs-popup/dist/index.css";
import "moment/locale/es";
import { getAdsMatched, sendNewRequest, getRequestById } from "../../api/requests.api";
import "./MatchedAdCard.scss";

const MatchedAdCard = ({ patrimonials, residentials }) => {
  const [adsMatched, setAdsMatched] = useState([]);
  const [requestById, setRequestById] = useState([]);
  const [adsToSend, setAdsToSend] = useState([]);
  const [residentialSelectedZones, setResidentialSelectedZones] = useState([]);
  const [patrimonialSelectedZones, setPatrimonialSelectedZones] = useState([]);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const { id } = useParams();
  const size = useWindowSize();

  const adBuildingTypeOptions = [
    { name: "Casa" },
    { name: "Piso" },
    { name: "Parcela" },
    { name: "Ático" },
    { name: "Oficina" },
    { name: "Edificio" },
    { name: "Local" },
    { name: "Campo Rústico" },
    { name: "Activos Singulares" },
    { name: "Costa" },
  ];

  useEffect(() => {
    getAdsMatched(id).then((res) => {
      setAdsMatched(res);
    });
    getRequestById(id).then((res) => {
      setRequestById(res);
    });
    setLoader(false);
  }, [id]);

  if (id && requestById.length !== 0 && residentials.length !== 0 && patrimonials.length !== 0 && !loader) {
    for (let zone of residentials) {
      if (requestById.requestZone.includes(zone._id) && !residentialSelectedZones.includes(zone._id)) {
        setResidentialSelectedZones([...residentialSelectedZones, zone._id]);
      }
    }
    for (let zone of patrimonials) {
      if (requestById.requestZone.includes(zone._id) && !patrimonialSelectedZones.includes(zone._id)) {
        setPatrimonialSelectedZones([...patrimonialSelectedZones, zone._id]);
      }
    }
  }

  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const maskValues = (value, ref) => {
    let render = "";

    if (
      (ref === "sale" && value === 99999999) ||
      (ref === "rent" && value === 99999) ||
      (ref === "buildSurface" && value === 9999) ||
      (ref === "plotSurface" && value === 99999)
    ) {
      render = <p>Valor máx.</p>;
    } else if (value === 0) {
      render = <p>Valor mín.</p>;
    } else {
      if (ref === "sale" || ref === "rent")
        render = <p>{formatCurrency(value) + (ref === "sale" ? " €" : " €/mes")}</p>;
      else
        render = (
          <p>
            {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} m<sup>2</sup>
          </p>
        );
    }
    return render;
  };

  const validateZone = (zones) => {
    if (id && requestById.length !== 0) {
      return zones.some((zone) => requestById.requestZone.includes(zone._id));
    } else return "";
  };

  const renderDirection = (direction) => {
    return (
      <span>
        {direction.address.directionNumber
          ? direction.address.directionFloor
            ? ` ${direction.address.street}, ${direction.address.directionNumber}, ${direction.address.directionFloor}`
            : ` ${direction.address.street}, ${direction.address.directionNumber}`
          : ` ${direction.address.street}`}
      </span>
    );
  };

  const Modal = () => (
    <Popup
      trigger={
        <button
          className="buttonForm"
          style={{
            marginRight: 8,
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            color: "#2b363d",
            border: "1px solid #2b363d",
          }}
        >
          {" "}
          Open Modal{" "}
        </button>
      }
      modal
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Modal Title </div>
          <div className="content">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum. Dolorem, repellat quidem ut,
            minima sint vel eveniet quibusdam voluptates delectus doloremque, explicabo tempore dicta adipisci fugit
            amet dignissimos?
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit commodi beatae optio voluptatum
            sed eius cumque, delectus saepe repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem alias.
            Vitae?
          </div>
          <div className="actions">
            <Popup trigger={<button className="button"> Trigger </button>} position="top center" nested>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis delectus nemo, maxime
                molestiae dolorem numquam mollitia, voluptate ea, accusamus excepturi deleniti ratione sapiente!
                Laudantium, aperiam doloribus. Odit, aut.
              </span>
            </Popup>
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <button
          className="buttonForm"
          type="submit"
          form="NewRequestForm"
          style={{
            marginRight: 8,
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            border: "1px solid #2b363d",
          }}
        >
          {size < 480 ? (
            <AiOutlineReload
              style={{ marginRight: 7, transform: "scale(125%)", verticalAlign: "middle", color: "#2b363d" }}
            />
          ) : (
            <>
              <AiOutlineReload
                style={{ marginRight: 7, transform: "scale(125%)", verticalAlign: "middle", color: "#2b363d" }}
              />
              <span style={{ color: "#2b363d" }}>Actualizar listado</span>
            </>
          )}
        </button>
        <button className="buttonForm" style={{ marginRight: 8, display: "flex", alignItems: "center" }}>
          {size < 480 ? (
            <HiOutlineMail style={{ marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }} />
          ) : (
            <>
              <HiOutlineMail style={{ marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }} />
              <span>Enviar email</span>
            </>
          )}
        </button>
        {/* {Modal()} */}
      </div>
      <div className="MatchedAd__container">
        <div className={"MatchedAd__container__col--left"}>
          <h5>Filtros</h5>
          <Formik
            enableReinitialize={true}
            initialValues={{
              requestAdType: requestById.length !== 0 ? requestById.requestAdType : [],
              requestBuildingType: requestById.length !== 0 ? requestById.requestBuildingType : [],
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
              if (id) data.id = id;

              if (residentialSelectedZones.length !== 0) {
                data.requestZone = residentialSelectedZones;
              } else if (patrimonialSelectedZones.length !== 0) {
                data.requestZone = patrimonialSelectedZones;
              }

              if (patrimonialSelectedZones.length === 0 && residentialSelectedZones.length === 0 && data.requestZone) {
                data.requestZone = [];
              }

              if (data.salePriceMax === "") data.salePriceMax = 99999999;
              if (data.salePriceMin === "") data.salePriceMin = 0;

              if (data.buildSurfaceMax === "") data.buildSurfaceMax = 9999;
              if (data.buildSurfaceMin === "") data.buildSurfaceMin = 0;
              if (data.plotSurfaceMax === "") data.plotSurfaceMax = 99999;
              if (data.plotSurfaceMin === "") data.plotSurfaceMin = 0;

              console.log(data);

              sendNewRequest(data).then((res) => {
                alert(`Se ha actualizado la búsqueda`);
                setAdsMatched(res);
              });
            }}
          >
            {(formProps) => (
              <div style={{ padding: "12px" }}>
                <Form id="NewRequestForm">
                  <div className="MatchedAd__container__col--item">
                    <MultiSelect
                      label={
                        <span className="MatchedAd__container__col--item-center">
                          <BiBuildingHouse />
                          <span>Tipo de inmueble</span>
                        </span>
                      }
                      list={adBuildingTypeOptions}
                      fields={{ groupBy: "", text: "name", value: "name" }}
                      onChange={(ev) => {
                        formProps.setFieldValue("requestBuildingType", ev.value);
                      }}
                      value={formProps.values.requestBuildingType}
                    />
                  </div>
                  <div className="MatchedAd__container__col--item">
                    <MultiSelect
                      label={
                        <span className="MatchedAd__container__col--item-center">
                          <ImMap2 />
                          <span>Residencial</span>
                        </span>
                      }
                      list={residentials}
                      fields={{ groupBy: "zone", text: "name", value: "_id" }}
                      onChange={(ev) => {
                        formProps.setFieldValue("requestZone", ev.value);
                        setResidentialSelectedZones(ev.value);
                      }}
                      value={validateZone(residentials) ? formProps.values.requestZone : []}
                    />
                  </div>
                  <div className="MatchedAd__container__col--item">
                    <MultiSelect
                      label={
                        <span className="MatchedAd__container__col--item-center">
                          <ImMap2 />
                          <span>Patrimonial</span>
                        </span>
                      }
                      list={patrimonials}
                      fields={{ groupBy: "zone", text: "name", value: "_id" }}
                      onChange={(ev) => {
                        formProps.setFieldValue("requestZone", ev.value);
                        setPatrimonialSelectedZones(ev.value);
                      }}
                      value={validateZone(patrimonials) ? formProps.values.requestZone : []}
                    />
                  </div>
                  <div className="MatchedAd__container__col--item">
                    <InputsGroup
                      label={
                        <span className="MatchedAd__container__col--item-center">
                          <RiMoneyEuroBoxLine />
                          <span>Precio de venta</span>
                        </span>
                      }
                      inputs={[
                        {
                          name: "salePriceMax",
                          placeholder: "€",
                          label: "Máximo",
                          type: "number",
                          value: formProps.values.salePriceMax,
                          onChange: (ev) => {
                            if (isNaN(ev.target.valueAsNumber)) formProps.setFieldValue(ev.target.name, "");
                            else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                          },
                          span: <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>€</span>,
                          errors: "",
                        },
                        {
                          name: "salePriceMin",
                          label: "Mínimo",
                          type: "number",
                          value: formProps.values.salePriceMin,
                          onChange: (ev) => {
                            if (isNaN(ev.target.valueAsNumber)) formProps.setFieldValue(ev.target.name, "");
                            else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                          },
                          span: <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>€</span>,
                          errors: "",
                        },
                      ]}
                    />
                  </div>
                  <div className="MatchedAd__container__col--item">
                    <InputsGroup
                      label={
                        <span className="MatchedAd__container__col--item-center">
                          <GiPapers />
                          <span>Superficie construida</span>
                        </span>
                      }
                      inputs={[
                        {
                          name: "buildSurfaceMax",
                          label: "Máximo",
                          type: "number",
                          value: formProps.values.buildSurfaceMax,
                          onChange: (ev) => {
                            if (isNaN(ev.target.valueAsNumber)) formProps.setFieldValue(ev.target.name, "");
                            else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                          },
                          span: (
                            <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>
                              m<sup>2</sup>
                            </span>
                          ),
                          errors: "",
                        },
                        {
                          name: "buildSurfaceMin",
                          label: "Mínimo",
                          type: "number",
                          value: formProps.values.buildSurfaceMin,
                          onChange: (ev) => {
                            if (isNaN(ev.target.valueAsNumber)) formProps.setFieldValue(ev.target.name, "");
                            else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                          },
                          span: (
                            <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>
                              m<sup>2</sup>
                            </span>
                          ),
                          errors: "",
                        },
                      ]}
                    />
                  </div>
                  <div className="MatchedAd__container__col--item">
                    <InputsGroup
                      label={
                        <span className="MatchedAd__container__col--item-center">
                          <MdHeight />
                          <span>Superficie de parcela</span>
                        </span>
                      }
                      inputs={[
                        {
                          name: "plotSurfaceMax",
                          label: "Máximo",
                          type: "number",
                          value: formProps.values.plotSurfaceMax,
                          onChange: (ev) => {
                            if (isNaN(ev.target.valueAsNumber)) formProps.setFieldValue(ev.target.name, "");
                            else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                          },
                          span: (
                            <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>
                              m<sup>2</sup>
                            </span>
                          ),
                          errors: "",
                        },
                        {
                          name: "plotSurfaceMin",
                          label: "Mínimo",
                          type: "number",
                          value: formProps.values.plotSurfaceMin,
                          onChange: (ev) => {
                            if (isNaN(ev.target.valueAsNumber)) formProps.setFieldValue(ev.target.name, "");
                            else formProps.setFieldValue(ev.target.name, ev.target.valueAsNumber);
                          },
                          span: (
                            <span style={{ position: "absolute", right: "0.5%", top: "52%" }}>
                              m<sup>2</sup>
                            </span>
                          ),
                          errors: "",
                        },
                      ]}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button className="buttonForm" type="submit" form="NewRequestForm" style={{ marginRight: 8 }}>
                      {size < 480 ? (
                        <AiOutlineReload
                          style={{ marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }}
                        />
                      ) : (
                        <span>Aplicar filtros</span>
                      )}
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
        {loader ? (
          <Spinner />
        ) : (
          <div className={size < 440 ? "MatchedAd__container__col" : "MatchedAd__container__col--right"}>
            <DataTable
              value={adsMatched.length !== 0 ? adsMatched : ""}
              dataKey="_id"
              selectionMode="checkbox"
              selection={adsToSend}
              onSelectionChange={(ev) => {
                setAdsToSend(ev.value);
              }}
              responsiveLayout="scroll"
              emptyMessage="La petición no coincide con ningún anuncio."
              paginator
              rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}
            >
              <Column selectionMode="multiple" headerStyle={{ width: "1%" }}></Column>
              <Column
                field="adTitle"
                header="Título y dirección"
                body={(ev) => (
                  <div style={{ display: "flex", alignItems: "flex-start", textDecoration: "none" }}>
                    {size > 440 ? (
                      <>
                        {ev.images?.main ? (
                          <img
                            src={ev.images?.main}
                            alt={ev.images.title}
                            style={{ width: 81, height: 75, borderRadius: "4px" }}
                          />
                        ) : (
                          <img
                            src="\defaultImage.png"
                            alt="Imagen por defecto"
                            style={{ width: 81, height: 75, borderRadius: "4px" }}
                          />
                        )}

                        <Link to={`/anuncios/${ev._id}`} className="AdCard AdCard__row__title">
                          <p>{ev.title}</p>
                          {renderDirection(ev.adDirection)}
                        </Link>
                      </>
                    ) : (
                      <Link to={`/anuncios/${ev._id}`} className="AdCard AdCard__row__title">
                        <p>{ev.title}</p>
                        {renderDirection(ev.adDirection)}
                      </Link>
                    )}
                  </div>
                )}
                bodyStyle={{ width: "35%", verticalAlign: "top" }}
              ></Column>
              <Column
                field="adType"
                header="Anuncio"
                bodyStyle={{ width: "10%", verticalAlign: "top" }}
                body={(ev) => <div style={{ alignSelf: "flex-start" }}>{ev.adType.sort().join(", ")}</div>}
              ></Column>
              <Column
                field="sale.saleValue"
                header="Precio"
                bodyStyle={{ width: "10%", verticalAlign: "top" }}
                body={(ev) => <span>{maskValues(ev.sale.saleValue, "sale")}</span>}
              ></Column>
              <Column
                field="rent.rentValue"
                header="Alquiler"
                bodyStyle={{ width: "10%", verticalAlign: "top" }}
                body={(ev) => <span>{maskValues(ev.rent.rentValue, "rent")}</span>}
              ></Column>
              <Column
                field="buildSurface"
                header={() =>
                  size > 880 ? (
                    <>
                      m<sup>2</sup> construidos
                    </>
                  ) : (
                    <>Construido</>
                  )
                }
                bodyStyle={{ width: "15%", verticalAlign: "top" }}
                body={(ev) => <div>{maskValues(ev.buildSurface, "buildSurface")}</div>}
              ></Column>
              <Column
                field="plotSurface"
                header={() =>
                  size > 880 ? (
                    <>
                      m<sup>2</sup> parcela
                    </>
                  ) : (
                    <>Parcela</>
                  )
                }
                body={(ev) => <div>{maskValues(ev.plotSurface, "plotSurface")}</div>}
                bodyStyle={{ width: "10%", verticalAlign: "top" }}
              ></Column>
              <Column
                field="buildingType"
                header="Inmueble"
                bodyStyle={{ width: "10%", verticalAlign: "top" }}
                body={(ev) => <div>{ev.adBuildingType.sort().join(", ")}</div>}
              ></Column>
            </DataTable>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchedAdCard;
