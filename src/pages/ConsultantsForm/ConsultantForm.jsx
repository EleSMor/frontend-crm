import React, { useEffect, useState, useContext } from "react";
import { Formik, Form } from "formik";
import { useHistory, Link, useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import GoBack from "../../components/GoBack/GoBack";
import AdsTable from "../../components/AdsTable/AdsTable";
import { UserContext } from "../../components/Context/AuthUser";
import { getAllAds } from "../../api/ads.api";
import {
  createConsultant,
  getConsultantById,
  updateConsultant,
} from "../../api/consultants.api";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Textarea/Textarea";
import { BsPersonPlusFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import "./ConsultantForm.scss";
import "../../styles/primeReact.scss";

const ConsultantForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [ads, setAds] = useState([]);
  const [consultantById, setConsultantById] = useState("");

  const [activeIndex, setActiveIndex] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (id) {
      getConsultantById(id).then((res) => setConsultantById(res));
      getAllAds().then((res) => {
        res = res.filter((ad) => {
          return ad.consultant._id === id;
        });
        setAds(res);
        setLoader(false);
      });
    }
  }, [activeIndex]);

  return (
    <>
      {user.length === 0 && history.push("/")}
      <Layout
        subTitle="Consultores"
        subUndertitle={<GoBack />}
        subLocation="/consultores/crear"
        footContent={
          <>
            <button
              className="buttonForm"
              type="submit"
              style={{ marginRight: 8 }}
            >
              <FiSave style={{ marginRight: 7 }} />
              Guardar
            </button>
            <Link className="buttonFormCancel" to="/consultores">
              Cancelar
            </Link>
          </>
        }
      >
        {loader ? (
          <Spinner />
        ) : (
          <div className="ConsultantForm">
            <div className="ConsultantForm__header">
              <div className="ConsultantForm__header--img">
                {/* {img ? (
                  <div>
                    <img
                      className=""
                      src={`${img}`}
                      alt={contactById?.fullName}
                    />
                    <div>
                      <label htmlFor="avatar">Avatar</label>
                      <input
                        type="file"
                        name="avatar"
                        onChange={(ev) =>
                          formProps.setFieldValue(
                            "avatar",
                            ev.target.files[0]
                          )
                        }
                      />
                    </div>
                  </div>
                ) : ( */}
                <div>
                  <BsPersonPlusFill fontSize="2em" color="#fff" />
                </div>
                {/* )} */}
              </div>
              <div className="ConsultantForm__header--info">
                <h3>{consultantById?.fullName || ""}</h3>
                <p>
                  <HiOutlineMail
                    fontSize="1.1em"
                    color="#47535B"
                    style={{ marginRight: 9 }}
                  />
                  {consultantById?.consultantEmail || "--------"}
                </p>
                <p>
                  <FaPhoneAlt
                    fontSize="0.85em"
                    color="#47535B"
                    style={{ marginRight: 9 }}
                  />
                  {consultantById?.consultantMobileNumber || "--------"}
                </p>
              </div>
              {/* <div>
                <label htmlFor="companyUnitLogo">Logo unidad de negocio</label>
                <input
                  type="file"
                  name="companyUnitLogo"
                  onChange={(ev) =>
                    formProps.setFieldValue(
                      "companyUnitLogo",
                      ev.target.files[0]
                    )
                  }
                />
              </div> */}
            </div>

            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
            >
              <TabPanel header="Detalles">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    consultantEmail: consultantById
                      ? consultantById.consultantEmail
                      : "",
                    consultantPassword: consultantById
                      ? consultantById.consultantPassword
                      : "",
                    fullName: consultantById ? consultantById.fullName : "",
                    avatar: "",
                    companyUnitLogo: "",
                    consultantMobileNumber: consultantById
                      ? consultantById.consultantMobileNumber
                      : "",
                    consultantPhoneNumber: consultantById
                      ? consultantById.consultantPhoneNumber
                      : "",
                    position: consultantById ? consultantById.position : "",
                    profession: consultantById ? consultantById.profession : "",
                    office1: consultantById ? consultantById.office1 : "",
                    office2: consultantById ? consultantById.office2 : "",
                    consultantComments: consultantById
                      ? consultantById.consultantComments
                      : "",
                  }}
                  onSubmit={(values) => {
                    let data = new FormData();

                    for (var key in values) {
                      data.append(key, values[key]);
                      console.log("clave:", key, "valor", values[key]);
                    }

                    data.append("id", id);
                    if (!id) {
                      console.log(data);
                      createConsultant(data).then(() =>
                        history.push("/consultores")
                      );
                    } else {
                      data.id = id;
                      updateConsultant(data).then((res) => {
                        alert(
                          `El consultor ${res.fullName} ha sido actualizado`
                        );
                        history.push("/consultores");
                      });
                    }
                  }}
                >
                  {(formProps) => (
                    <Form>
                      <div className="ConsultantForm__form">
                        <div className="ConsultantForm__form--col">
                          <Input
                            label="Nombre completo"
                            required="yes"
                            name="fullName"
                            value={formProps.values.fullName}
                            onChange={(ev) =>
                              formProps.setFieldValue(
                                ev.target.name,
                                ev.target.value
                              )
                            }
                          />
                          <Input
                            label="Email"
                            required="yes"
                            type="email"
                            name="email"
                            value={formProps.values.consultantEmail}
                            onChange={(ev) =>
                              formProps.setFieldValue(
                                ev.target.name,
                                ev.target.value
                              )
                            }
                          />

                          <div className="ConsultantForm__form">
                            <div className="ConsultantForm__form--col">
                              <Input
                                label="Teléfono móvil"
                                name="consultantMobileNumber"
                                type="text"
                                value={formProps.values.consultantMobileNumber}
                                onChange={(ev) =>
                                  formProps.setFieldValue(
                                    ev.target.name,
                                    ev.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="ConsultantForm__form--col">
                              <Input
                                label="Teléfono fijo"
                                name="consultantPhoneNumber"
                                type="text"
                                value={formProps.values.consultantPhoneNumber}
                                onChange={(ev) =>
                                  formProps.setFieldValue(
                                    ev.target.name,
                                    ev.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                          
                          <Input
                            label="Posición"
                            type="text"
                            name="position"
                            value={formProps.values.position}
                            onChange={(ev) =>
                              formProps.setFieldValue(
                                ev.target.name,
                                ev.target.value
                              )
                            }
                          />
                          <Input
                            label="Ocupación"
                            type="text"
                            name="profession"
                            value={formProps.values.profession}
                            onChange={(ev) =>
                              formProps.setFieldValue(
                                ev.target.name,
                                ev.target.value
                              )
                            }
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
                                onChange={(ev) =>
                                  formProps.setFieldValue(
                                    ev.target.name,
                                    ev.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="ConsultantForm__form--col">
                              <Input
                                label="Oficina 2"
                                name="office2"
                                type="text"
                                value={formProps.values.office2}
                                onChange={(ev) =>
                                  formProps.setFieldValue(
                                    ev.target.name,
                                    ev.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                          <Textarea
                            label="Comentarios"
                            name="consultantComments"
                            value={formProps.values.consultantComments}
                            onChange={(ev) =>
                              formProps.setFieldValue(
                                ev.target.name,
                                ev.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </TabPanel>
              {id ? (
                <TabPanel header="Anuncios">
                  <AdsTable ads={ads.length !== 0 ? ads : []} />
                </TabPanel>
              ) : (
                <TabPanel header="Anuncios" disabled></TabPanel>
              )}
            </TabView>
          </div>
        )}
      </Layout>
    </>
  );
};

export default ConsultantForm;
