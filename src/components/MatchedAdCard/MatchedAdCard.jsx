import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import NotFound from "../../components/NotFound/NotFound";
import { MultiSelect } from "../../components";
import { FiSave } from "react-icons/fi";
import { DefaultImage } from "../../icons";
import { BiBuildingHouse } from "react-icons/bi";
import { GiPapers } from "react-icons/gi";
import { RiMoneyEuroBoxLine } from "react-icons/ri";
import { MdHeight } from "react-icons/md";
import { ImMap2 } from "react-icons/im";
import InputsGroup from "../../components/InputsGroup/InputsGroup";
import useWindowSize from "../../hooks/useWindowSize";
import "moment/locale/es";
import { sendNewRequest } from "../../api/requests.api";
import "./MatchedAdCard.scss";

const MatchedAdCard = ({
  ads,
  patrimonials,
  residentials,
  patrimonialSelectedZones,
  setPatrimonialSelectedZones,
  residentialSelectedZones,
  setResidentialSelectedZones,
  requestById,
}) => {
  const [adsMatched, setAdsMatched] = useState(ads)
  const [selectedBuildingTypes, setSelectedBuildingTypes] = useState([]);
  const { id } = useParams();
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

  const size = useWindowSize();

  useEffect(() => console.log(ads), [id]);

  const formatCurrency = (value) => {
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
    });
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
      if (ref === "sale" || ref === "rent") render = <p>{formatCurrency(value)}</p>;
      else
        render = (
          <p>
            {value.toLocaleString("es-ES")} m<sup>2</sup>
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
      <p>
        {direction.address.directionNumber
          ? direction.address.directionFloor
            ? ` ${direction.address.street}, ${direction.address.directionNumber}, ${direction.address.directionFloor}`
            : ` ${direction.address.street}, ${direction.address.directionNumber}`
          : ` ${direction.address.street}`}
      </p>
    );
  };

  return (
    <div>
      {adsMatched.length !== 0 ? (
        <div>
          <Formik
            enableReinitialize={true}
            initialValues={{
              id: requestById.length !== 0 ? requestById._id : "",
              requestBuildingType: requestById.length !== 0 ? requestById.requestBuildingType : [],
              requestZone: requestById.length !== 0 ? requestById.requestZone : [],
              salePriceMax: requestById.length !== 0 ? requestById.requestSalePrice.salePriceMax : "",
              salePriceMin: requestById.length !== 0 ? requestById.requestSalePrice.salePriceMin : "",
              buildSurfaceMax: requestById.length !== 0 ? requestById.requestBuildSurface.buildSurfaceMax : "",
              buildSurfaceMin: requestById.length !== 0 ? requestById.requestBuildSurface.buildSurfaceMin : "",
              plotSurfaceMax: requestById.length !== 0 ? requestById.requestPlotSurface.plotSurfaceMax : "",
              plotSurfaceMin: requestById.length !== 0 ? requestById.requestPlotSurface.plotSurfaceMin : "",
            }}
            onSubmit={(data) => {
              if (id) data.id = id;
              if (selectedBuildingTypes.length !== 0) data.requestBuildingType = selectedBuildingTypes;

              if (residentialSelectedZones.length !== 0) {
                data.requestZone = residentialSelectedZones;
              } else if (patrimonialSelectedZones.length !== 0) {
                data.requestZone = patrimonialSelectedZones;
              }

              if (patrimonialSelectedZones.length === 0 && residentialSelectedZones.length === 0) {
                data.requestZone = [];
              }

              if (data.salePriceMax === "") data.salePriceMax = 99999999;
              if (data.salePriceMin === "") data.salePriceMin = 0;

              if (data.buildSurfaceMax === "") data.buildSurfaceMax = 9999;
              if (data.buildSurfaceMin === "") data.buildSurfaceMin = 0;
              if (data.plotSurfaceMax === "") data.plotSurfaceMax = 99999;
              if (data.plotSurfaceMin === "") data.plotSurfaceMin = 0;

              sendNewRequest(data).then((res) => {
                alert(`Se ha actualizado la búsqueda`);
                setAdsMatched(res)
              });
            }}
          >
            {(formProps) => (
              <Form id="NewRequestForm">
                <div className="RequestForm__container">
                  <div className="RequestForm__container__col">
                    <div className="RequestForm__container__col--item">
                      <MultiSelect
                        label={
                          <span className="RequestForm__container__col--item-center">
                            <BiBuildingHouse />
                            <span>Tipo de inmueble</span>
                          </span>
                        }
                        list={adBuildingTypeOptions}
                        fields={{ groupBy: "", text: "name", value: "name" }}
                        onChange={(ev) => {
                          setSelectedBuildingTypes(ev.value);
                        }}
                        defaultValues={
                          requestById.requestBuildingType.length !== 0 ? requestById.requestBuildingType : []
                        }
                      />
                    </div>
                    <div className="RequestForm__container__col--item">
                      <MultiSelect
                        label={
                          <span className="RequestForm__container__col--item-center">
                            <ImMap2 />
                            <span>Residencial</span>
                          </span>
                        }
                        list={residentials}
                        fields={{ groupBy: "zone", text: "name", value: "_id" }}
                        onChange={(ev) => {
                          setResidentialSelectedZones(ev.value);
                        }}
                        defaultValues={validateZone(residentials) ? requestById.requestZone : ""}
                      />
                    </div>
                    <div className="RequestForm__container__col--item">
                      <MultiSelect
                        label={
                          <span className="RequestForm__container__col--item-center">
                            <ImMap2 />
                            <span>Patrimonial</span>
                          </span>
                        }
                        list={patrimonials}
                        fields={{ groupBy: "zone", text: "name", value: "_id" }}
                        onChange={(ev) => {
                          setPatrimonialSelectedZones(ev.value);
                        }}
                        defaultValues={validateZone(patrimonials) ? requestById.requestZone : ""}
                      />
                    </div>
                    <div className="RequestForm__container__col--item">
                      <InputsGroup
                        label={
                          <span className="RequestForm__container__col--item-center">
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
                            onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                            span: <span style={{ position: "absolute", right: "1%", top: "52%" }}>€</span>,
                            errors: "",
                          },
                          {
                            name: "salePriceMin",
                            label: "Mínimo",
                            type: "number",
                            value: formProps.values.salePriceMin,
                            onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                            span: <span style={{ position: "absolute", right: "1%", top: "52%" }}>€</span>,
                            errors: "",
                          },
                        ]}
                      />
                    </div>
                    <div className="RequestForm__container__col--item">
                      <InputsGroup
                        label={
                          <span className="RequestForm__container__col--item-center">
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
                            onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                            span: (
                              <span style={{ position: "absolute", right: "1%", top: "52%" }}>
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
                            onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                            span: (
                              <span style={{ position: "absolute", right: "1%", top: "52%" }}>
                                m<sup>2</sup>
                              </span>
                            ),
                            errors: "",
                          },
                        ]}
                      />
                    </div>
                    <div className="RequestForm__container__col--item">
                      <InputsGroup
                        label={
                          <span className="RequestForm__container__col--item-center">
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
                            onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                            span: (
                              <span style={{ position: "absolute", right: "1%", top: "52%" }}>
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
                            onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                            span: (
                              <span style={{ position: "absolute", right: "1%", top: "52%" }}>
                                m<sup>2</sup>
                              </span>
                            ),
                            errors: "",
                          },
                        ]}
                      />
                    </div>
                    <button
                      className="buttonForm"
                      type="submit"
                      form="NewRequestForm"
                      style={{ marginRight: 8 }}
                    >
                      <FiSave
                        style={
                          size > 480
                            ? { marginRight: 7 }
                            : { marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }
                        }
                      />
                      {size > 480 && "Aplicar filtros"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <input type="checkbox" />
            </div>
            <div>
              <p>Título y dirección</p>
            </div>
            <div>
              <p>Anuncio</p>
            </div>
            <div>
              <p>Precio</p>
            </div>
            <div>
              <p>Alquiler</p>
            </div>
            <div>
              <p>
                m<sup>2</sup> construidos
              </p>
            </div>
            <div>
              <p>
                m<sup>2</sup> parcela
              </p>
            </div>
            <div>
              <p>Inmueble</p>
            </div>
          </div>
          {adsMatched.map((ad) => (
            <div key={`${ad._id}-${ad.requestReference}`} className="AdCard">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <input type="checkbox" />
                </div>
                <div style={{ display: "flex" }}>
                  {ad.images?.main ? (
                    <img src={ad.images?.main} alt={ad.images.title} width={81} height={75} />
                  ) : (
                    <DefaultImage
                      style={{
                        width: "81px",
                        height: "75px",
                        marginTop: "%",
                      }}
                    />
                  )}
                  <div>
                    <p>{ad.title}</p>
                    {renderDirection(ad.adDirection)}
                  </div>
                </div>
                <div>{ad.adType.sort().join(" ")}</div>
                <div>{maskValues(ad.sale.saleValue, "sale")}</div>
                <div>{maskValues(ad.rent.rentValue, "rent")}</div>
                <div>{maskValues(ad.buildSurface, "buildSurface")}</div>
                <div>{maskValues(ad.plotSurface, "plotSurface")}</div>
                <div>{ad.adBuildingType.sort().join(" ")}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <NotFound />
        </>
      )}
    </div>
  );
};

export default MatchedAdCard;
