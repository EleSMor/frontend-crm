import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import ContactRequestCard from "../../components/ContactRequestCard/ContactRequestCard";
import GoBack from "../../components/GoBack/GoBack";
import { getRequestByContacts } from "../../api/requests.api";
import { UserContext } from "../../components/Context/AuthUser";
import {
  createContact,
  getContactById,
  updateContact,
} from "../../api/contacts.api";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { BsPersonPlusFill } from "react-icons/bs";
import "./ContactForm.scss";
import Input from "../../components/Input/Input";

const ContactForm = () => {
  const [contactById, setContactById] = useState("");
  const [requests, setRequests] = useState([]);
  const [selTag, setSelTag] = useState([]);
  const [loader, setLoader] = useState(false);
  let { name, phone, email } = useParams();

  const history = useHistory();
  const { id } = useParams();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      getContactById(id).then((contact) => {
        setContactById(contact);
        setSelTag(contact.tag);
        console.log(contact);
        getRequestByContacts(contact._id).then((data) => setRequests(data));
        console.log(requests);
        setLoader(false);
      });
    }
  }, []);

  const newSelect = (selected, setSelected, ev) => {
    if (selected.includes(ev.target.value)) {
      const newSelected = selected.filter(
        (selected) => selected !== ev.target.value
      );
      setSelected(newSelected);
    } else {
      console.log(ev.target.value);
      setSelected([...selected, ev.target.value]);
    }
  };

  return (
    <>
      {!user && history.push("/")}
      <Layout
        subTitle="Contactos"
        subUndertitle={<GoBack />}
        subLocation="/contactos/crear"
      >
        {loader ? (
          <Spinner />
        ) : (
          <div className="ContactForm">
            <div className="ContactForm__header">
              <div className="ContactForm__header--img">
                {/* {img ? (
                  <div>
                    <img
                      className=""
                      src={`${img}`}
                      alt={contactById?.fullName}
                    />
                  </div>
                ) : ( */}
                <div>
                  <BsPersonPlusFill fontSize="2em" color="#fff" />
                </div>
                {/* )} */}
              </div>

              <div className="ContactForm__header--info">
                <h3>{contactById?.fullName || name}</h3>
                <p>
                  <HiOutlineMail
                    fontSize="1.1em"
                    color="#47535B"
                    style={{ marginRight: 9 }}
                  />
                  {contactById?.email || email}
                </p>
                <p>
                  <FaPhoneAlt
                    fontSize="0.85em"
                    color="#47535B"
                    style={{ marginRight: 9 }}
                  />
                  {contactById?.contactMobileNumber || phone}
                </p>
              </div>
            </div>

            <TabView>
              <TabPanel header="Detalles">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    fullName: contactById ? contactById.fullName : name,
                    tag: contactById ? selTag : [],
                    email: contactById ? contactById.email : email,
                    contactMobileNumber: contactById
                      ? contactById.contactMobileNumber
                      : phone,
                    contactPhoneNumber: contactById
                      ? contactById.contactPhoneNumber
                      : "",
                    company: contactById ? contactById.company : "",
                    street: contactById
                      ? contactById.contactDirection.address.street
                      : "",
                    directionNumber: contactById
                      ? contactById.contactDirection.address.directionNumber
                      : "",
                    directionFloor: contactById
                      ? contactById.contactDirection.address.directionFloor
                      : "",
                    postalCode: contactById
                      ? contactById.contactDirection.postalCode
                      : "",
                    city: contactById ? contactById.contactDirection.city : "",
                    country: contactById
                      ? contactById.contactDirection.country
                      : "",
                    contactComments: contactById
                      ? contactById.contactComments
                      : "",
                    notReceiveCommunications: contactById
                      ? contactById.notReceiveCommunications
                      : false,
                  }}
                  onSubmit={(data) => {
                    if (id) data.id = id;
                    data.tag = selTag;

                    console.log(data);
                    if (!id) {
                      createContact(data).then((res) => {
                        alert(`El contacto ${res.fullName} ha sido creado`);
                        history.push("/contactos");
                      });
                    } else
                      updateContact(data).then((res) => {
                        alert(
                          `El contacto ${res.fullName} ha sido actualizado`
                        );
                        history.push("/contactos");
                      });
                  }}
                >
                  {(formProps) => (
                    <Form>
                      <div>
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
                        <div>
                          <label htmlFor="tag">
                            Etiqueta
                            <div>
                              <input
                                type="checkbox"
                                value="Cliente"
                                onChange={(ev) =>
                                  newSelect(selTag, setSelTag, ev)
                                }
                                checked={selTag.includes("Cliente") ? true : ""}
                              />
                              <span>Cliente</span>
                              <input
                                type="checkbox"
                                value="Propietario"
                                onChange={(ev) =>
                                  newSelect(selTag, setSelTag, ev)
                                }
                                checked={
                                  selTag.includes("Propietario") ? true : ""
                                }
                              />
                              <span>Propietario</span>
                            </div>
                          </label>
                        </div>
                        <Input
                          label="Email"
                          required="yes"
                          type="email"
                          name="email"
                          value={formProps.values.email}
                          onChange={(ev) =>
                            formProps.setFieldValue(
                              ev.target.name,
                              ev.target.value
                            )
                          }
                        />
                        <Input
                          label="Teléfono móvil"
                          name="contactMobileNumber"
                          type="text"
                          value={formProps.values.contactMobileNumber}
                          onChange={(ev) =>
                            formProps.setFieldValue(
                              ev.target.name,
                              ev.target.value
                            )
                          }
                        />
                        <Input
                          label="Teléfono fijo"
                          name="contactPhoneNumber"
                          type="text"
                          value={formProps.values.contactPhoneNumber}
                          onChange={(ev) =>
                            formProps.setFieldValue(
                              ev.target.name,
                              ev.target.value
                            )
                          }
                        />
                        <Input
                          label="Empresa"
                          name="company"
                          value={formProps.values.company}
                          onChange={(ev) =>
                            formProps.setFieldValue(
                              ev.target.name,
                              ev.target.value
                            )
                          }
                        />

                        <div>

                          <h4>Dirección</h4>

                          <div>
                            <label htmlFor="street">Calle</label>
                            <div>
                              <input
                                name="street"
                                value={formProps.values.street}
                                onChange={(ev) =>
                                  formProps.setFieldValue(
                                    ev.target.name,
                                    ev.target.value
                                  )
                                }
                              />
                            </div>
                            <label htmlFor="postalCode">Código Postal</label>
                            <div>
                              <input
                                name="postalCode"
                                value={formProps.values.postalCode}
                                onChange={(ev) =>
                                  formProps.setFieldValue(
                                    ev.target.name,
                                    ev.target.value
                                  )
                                }
                              />
                            </div>
                            <label htmlFor="city">Ciudad</label>
                            <div>
                              <input
                                name="city"
                                value={formProps.values.city}
                                onChange={(ev) =>
                                  formProps.setFieldValue(
                                    ev.target.name,
                                    ev.target.value
                                  )
                                }
                              />
                            </div>
                            <label htmlFor="country">País</label>
                            <div>
                              <input
                                name="country"
                                value={formProps.values.country}
                                onChange={(ev) =>
                                  formProps.setFieldValue(
                                    ev.target.name,
                                    ev.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
{/* ------------------------------------------------------------------------- */}
                        <div>
                          <label htmlFor="contactComments">Comentarios</label>
                          <div>
                            <textarea
                              name="contactComments"
                              value={formProps.values.contactComments}
                              onChange={(ev) =>
                                formProps.setFieldValue(
                                  ev.target.name,
                                  ev.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="notReceiveCommunications">
                            No recibir emails automáticos
                          </label>
                          <input
                            type="checkbox"
                            name="notReceiveCommunications"
                            checked={formProps.values.notReceiveCommunications}
                            onChange={(ev) =>
                              formProps.setFieldValue(
                                ev.target.name,
                                !formProps.values.notReceiveCommunications
                              )
                            }
                          />
                        </div>
{/* ------------------------------------------------------------------------- */}
                      </div>
                      <button type="submit">Guardar</button>
                      <NavLink to="/contactos">
                        <button type="">Cancelar</button>
                      </NavLink>
                    </Form>
                  )}
                </Formik>
              </TabPanel>
              {id ? (
                <TabPanel header="Peticiones">
                  {requests.map((request, index) => {
                    return (
                      <ContactRequestCard index={index} request={request} />
                    );
                  })}
                </TabPanel>
              ) : (
                <TabPanel header="Peticiones" disabled></TabPanel>
              )}
            </TabView>
          </div>
        )}
      </Layout>
    </>
  );
};

export default ContactForm;
