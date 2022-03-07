import React, { useEffect, useState, useContext } from "react";
import { Formik, Form } from "formik";
import { useHistory, Link, useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import GoBack from "../../components/GoBack/GoBack";
import AdsTable from "../../components/AdsTable/AdsTable";
import { UserContext } from "../../components/Context/AuthUser";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Textarea/Textarea";
import RequestCard from "../../components/RequestCard/RequestCard";
import Checkboxes from "../../components/CheckBox/Checkboxes";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { MdLocationSearching } from "react-icons/md";
import { FaPhoneAlt, FaTrash } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { getAllAds } from "../../api/ads.api";
import { createConsultant, getConsultantById, updateConsultant, deleteConsultant } from "../../api/consultants.api";
import { getAllRequests } from "../../api/requests.api";
import "./ConsultantForm.scss";
import "../../styles/primeReact.scss";
import useWindowSize from "../../hooks/useWindowSize";
import { checkSession } from "../../api/auth.api"

const ConsultantForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const { user, deleteUser } = useContext(UserContext);
  const size = useWindowSize();

  const [fullName, setFullName] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("--------");
  const [mobile, setMobile] = useState("--------");
  const [avatar, setAvatar] = useState("");
  const [companyUnitLogo, setCompanyUnitLogo] = useState("");

  const [ads, setAds] = useState([]);
  const [requests, setRequests] = useState([]);
  const [consultantById, setConsultantById] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (id && user.length !== 0) {
      getConsultantById(id).then((res) => {
        setAvatar(res.avatar);
        setCompanyUnitLogo(res.companyUnitLogo);
        setConsultantById(res);
      });
      getAllAds().then((res) => {
        res = res.filter((ad) => {
          return ad.consultant._id === id;
        });
        setAds(res);
      });
      getAllRequests().then((res) => {
        res = res.filter((request) => {
          return request.requestConsultant?._id === id;
        });
        setRequests(res);
        setLoader(false);
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    checkSession().then((res) => {
      if (res === "Acceso restringido") {
        deleteUser();
        history.push("/");
      }
    });
  }, []);
  
  const handleChangeFile = (e, setter) => {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setter(reader.result);
      }
    };
    reader.readAsDataURL(e);
  };

  return (
    <>
      {user.length === 0 && history.push("/")}
      <Layout
        subTitle="Consultores"
        subUndertitle={<GoBack />}
        subBreadcrumbs={id ? `Consultor ${consultantById.fullName}` : "Crear nuevo consultor"}
        footContent={
          <>
            <button className="buttonForm" type="submit" form="ConsultantForm" style={{ marginRight: 8 }}>
              <FiSave
                style={
                  size > 480
                    ? { marginRight: 7 }
                    : { marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }
                }
              />
              {size > 480 && "Guardar"}
            </button>
            <Link className="buttonFormCancel" to="/consultores">
              Cancelar
            </Link>
            {id && user.role !== "Consultor" && (
              <button
                className="buttonFormDelete"
                onClick={() =>
                  deleteConsultant(id).then(() => {
                    alert("Consultor borrado correctamente");
                    history.push("/consultores");
                  })
                }
              >
                <FaTrash
                  style={
                    size > 480
                      ? { marginRight: 7 }
                      : { marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }
                  }
                />
                {size > 480 && "Borrar"}
              </button>
            )}
          </>
        }
      >
        {loader ? (
          <Spinner />
        ) : (
          <div className="ConsultantForm">
            <div className="ConsultantForm__header">
              <div className="ConsultantForm__header--left">
                <div className="ConsultantForm__header--img">
                  {avatar ? (
                    <div>
                      <img src={avatar} alt="avatar" />
                    </div>
                  ) : (
                    <div className="ConsultantForm__header--img">
                      <BsPersonPlusFill fontSize="2em" color="#fff" />
                    </div>
                  )}
                </div>
                <div className="ConsultantForm__header--info">
                  <h3>{consultantById?.fullName || fullName}</h3>
                  <p>
                    <HiOutlineMail fontSize="1.1em" color="#47535B" style={{ marginRight: 9 }} />
                    {consultantById?.consultantEmail || email}
                  </p>
                  <p>
                    <FaPhoneAlt fontSize="0.85em" color="#47535B" style={{ marginRight: 9 }} />
                    {consultantById?.consultantMobileNumber || mobile}
                  </p>
                </div>
              </div>
              <div className="ConsultantForm__header--company">
                {companyUnitLogo ? (
                  <div className="ConsultantForm__header--company">
                    <img src={companyUnitLogo} alt="companyUnitLogo" />
                  </div>
                ) : (
                  <div className="ConsultantForm__header--company">
                    <AiOutlinePlus fontSize="2em" color="#B0B0B0" />
                    <p> Logo departamento</p>
                  </div>
                )}
              </div>
            </div>

            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
              <TabPanel header="Detalles">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    role: consultantById ? consultantById.role : "Consultor",
                    consultantEmail: consultantById ? consultantById.consultantEmail : "",
                    showOnWeb: consultantById ? consultantById.showOnWeb : "true",
                    consultantPassword: consultantById ? consultantById.consultantPassword : "",
                    fullName: consultantById ? consultantById.fullName : "",
                    avatar: "",
                    companyUnitLogo: "",
                    consultantMobileNumber: consultantById ? consultantById.consultantMobileNumber : "",
                    consultantPhoneNumber: consultantById ? consultantById.consultantPhoneNumber : "",
                    position: consultantById ? consultantById.position : "",
                    profession: consultantById ? consultantById.profession : "",
                    office1: consultantById ? consultantById.office1 : "",
                    office2: consultantById ? consultantById.office2 : "",
                    consultantComments: consultantById ? consultantById.consultantComments : "",
                  }}
                  onSubmit={(values) => {
                    let data = new FormData();

                    for (var key in values) {
                      data.append(key, values[key]);
                    }
                    data.append("id", id);
                    if (data.showOnWeb === "true") data.showOnWeb = true;
                    else if (data.showOnWeb === "false") data.showOnWeb = false;

                    if (!id) {
                      createConsultant(data).then((res) => {
                        if (res !== undefined) {
                          alert(`El consultor ${res.fullName} ha sido creado`);
                          history.push("/consultores");
                        }
                      });
                    } else {
                      data.id = id;
                      updateConsultant(data).then((res) => {
                        alert(`El consultor ${res.fullName} ha sido actualizado`);
                      });
                    }
                  }}
                >
                  {(formProps) => (
                    <Form id="ConsultantForm">
                      <div className="ConsultantForm__form">
                        <div className="ConsultantForm__form--col">
                          <Input
                            label="Nombre completo"
                            required={true}
                            name="fullName"
                            value={formProps.values.fullName}
                            onChange={(ev) => {
                              if (ev.target.value.trim() === "") setFullName("");
                              else setFullName(ev.target.value);
                              formProps.setFieldValue(ev.target.name, ev.target.value);
                            }}
                          />
                          <Input
                            label="Contraseña"
                            required={true}
                            name="consultantPassword"
                            type="password"
                            value={formProps.values.consultantPassword}
                            onChange={(ev) => {
                              if (
                                !ev.target.value.match(
                                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,16}$/
                                )
                              ) {
                                setPasswordError(
                                  "La contraseña debe tener entre 8 y 16 carácteres, mínimo 1 mayúscula, 1 minúscula, 1 número y un carácter especial"
                                );
                              } else setPasswordError("");
                              formProps.setFieldValue(ev.target.name, ev.target.value);
                            }}
                            error={passwordError}
                          />
                          <Input
                            label="Email"
                            required={true}
                            type="email"
                            name="consultantEmail"
                            value={formProps.values.consultantEmail}
                            onChange={(ev) => {
                              if (ev.target.value.trim() === "") setEmail("--------");
                              else setEmail(ev.target.value);
                              formProps.setFieldValue(ev.target.name, ev.target.value);
                            }}
                          />

                          <div className="ConsultantForm__form">
                            <div className="ConsultantForm__form--col">
                              <Input
                                label="Teléfono móvil"
                                required={true}
                                name="consultantMobileNumber"
                                type="text"
                                value={formProps.values.consultantMobileNumber}
                                onChange={(ev) => {
                                  if (ev.target.value.trim() === "") setMobile("--------");
                                  else setMobile(ev.target.value);
                                  formProps.setFieldValue(ev.target.name, ev.target.value);
                                }}
                              />
                            </div>
                            <div className="ConsultantForm__form--col">
                              <Input
                                label="Teléfono fijo"
                                name="consultantPhoneNumber"
                                type="text"
                                value={formProps.values.consultantPhoneNumber}
                                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                              />
                            </div>
                          </div>
                          <Input
                            label="Posición"
                            type="text"
                            name="position"
                            value={formProps.values.position}
                            onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                          />
                          <Input
                            label="Ocupación"
                            type="text"
                            name="profession"
                            value={formProps.values.profession}
                            onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                          />
                        </div>

                        <div className="ConsultantForm__form--col">
                          <div className="ConsultantForm__form">
                            <div className="ConsultantForm__form--col">
                              <Input
                                label="Oficina 1"
                                name="office1"
                                type="text"
                                value={formProps.values.office1}
                                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                              />
                            </div>
                            <div className="ConsultantForm__form--col">
                              <Input
                                label="Oficina 2"
                                name="office2"
                                type="text"
                                value={formProps.values.office2}
                                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                              />
                            </div>
                          </div>
                          <Textarea
                            label="Comentarios"
                            name="consultantComments"
                            value={formProps.values.consultantComments}
                            onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                          />
                          {user.role === "Admin" && (
                            <div className="ConsultantForm__form">
                              <div className="ConsultantForm__form--col">
                                <Checkboxes
                                  label="Mostrar en la web"
                                  type="radio"
                                  textA="Si"
                                  valueA={true}
                                  onChangeA={(ev) => {
                                    formProps.setFieldValue("showOnWeb", ev.target.value);
                                  }}
                                  checkedA={formProps.values.showOnWeb === "true" && true}
                                  textB="No"
                                  valueB={false}
                                  onChangeB={(ev) => {
                                    formProps.setFieldValue("showOnWeb", ev.target.value);
                                  }}
                                  checkedB={formProps.values.showOnWeb === "false" && true}
                                />
                              </div>
                              <div className="ConsultantForm__form--col">
                                <Checkboxes
                                  label="Rol"
                                  type="radio"
                                  textA="Consultor"
                                  valueA="Consultor"
                                  onChangeA={(ev) => {
                                    formProps.setFieldValue("role", ev.target.value);
                                  }}
                                  checkedA={formProps.values.role === "Consultor" ? true : ""}
                                  textB="Admin"
                                  valueB="Admin"
                                  onChangeB={(ev) => {
                                    formProps.setFieldValue("role", ev.target.value);
                                  }}
                                  checkedB={formProps.values.role === "Admin" ? true : ""}
                                />
                              </div>
                            </div>
                          )}
                          <div className="ConsultantForm__form">
                            <div className="ConsultantForm__form--col">
                              <label htmlFor="avatar">Avatar</label>
                              <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                onChange={(ev) => {
                                  if (ev.target.files[0].size > 5242880) {
                                    alert("La imagen supera los 5 Mb, por favor escoja una de menor tamaño");
                                    ev.target.value = "";
                                  } else {
                                    handleChangeFile(ev.target.files[0], setAvatar);
                                    formProps.setFieldValue(ev.target.name, ev.target.files[0]);
                                  }
                                }}
                              />
                            </div>
                            <div className="ConsultantForm__form--col">
                              <label htmlFor="companyUnitLogo" style={{ alignSelf: "start" }}>
                                Logo Unidad de Negocio
                              </label>
                              <input
                                type="file"
                                name="companyUnitLogo"
                                id="companyUnitLogo"
                                onChange={(ev) => {
                                  if (ev.target.files[0].size > 5242880) {
                                    alert("La imagen supera los 5 Mb, por favor escoja una de menor tamaño");
                                    ev.target.value = "";
                                  } else {
                                    handleChangeFile(ev.target.files[0], setCompanyUnitLogo);
                                    formProps.setFieldValue(ev.target.name, ev.target.files[0]);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </TabPanel>
              <TabPanel header="Anuncios" disabled={id ? false : true}>
                <AdsTable ads={ads.length !== 0 ? ads : []} />
              </TabPanel>
              <TabPanel header="Peticiones" disabled={id ? false : true}>
                {requests.length === 0 ? (
                  <div>
                    <p style={{ marginTop: 100 }}>Este consultor no tiene peticiones creadas</p>
                    <MdLocationSearching fontSize="2.5em" style={{ marginTop: 20, marginBottom: 100 }} />
                  </div>
                ) : (
                  requests.map((request, index) => {
                    return <RequestCard key={`${request._id}-${request.requestReference}`} request={request} />;
                  })
                )}
              </TabPanel>
            </TabView>
          </div>
        )}
      </Layout>
    </>
  );
};

export default ConsultantForm;
