import { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import { useHistory, useParams, Link } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import ContactRequestCard from "../../components/ContactRequestCard/ContactRequestCard";
import GoBack from "../../components/GoBack/GoBack";
import { getRequestByContacts } from "../../api/requests.api";
import { UserContext } from "../../components/Context/AuthUser";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt, FaTrash } from "react-icons/fa";
import { MdLocationSearching } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import "./ContactForm.scss";
import Input from "../../components/Input/Input";
import Checkboxes from "../../components/CheckBox/Checkboxes";
import Checkbox from "../../components/CheckBox/Checkbox";
import Textarea from "../../components/Textarea/Textarea";
import InputsGroup from "../../components/InputsGroup/InputsGroup";
import { createContact, getContactById, updateContact, deleteContact } from "../../api/contacts.api";
import "../../styles/primeReact.scss";
import useWindowSize from "../../hooks/useWindowSize";

const ContactForm = () => {
  const [contactById, setContactById] = useState("");
  const [requests, setRequests] = useState([]);
  const [selTag, setSelTag] = useState([]);
  const [loader, setLoader] = useState(false);
  let { name, phone, email } = useParams();
  const size = useWindowSize();

  const history = useHistory();
  const { id } = useParams();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      getContactById(id).then((contact) => {
        setContactById(contact);
        setSelTag(contact.tag);
        getRequestByContacts(contact._id).then((data) => setRequests(data));
        setLoader(false);
      });
    }
  }, []);

  const newSelect = (selected, setSelected, ev) => {
    if (selected.includes(ev.target.value)) {
      const newSelected = selected.filter((selected) => selected !== ev.target.value);
      setSelected(newSelected);
    } else {
      setSelected([...selected, ev.target.value]);
    }
  };
  return (
    <>
      {user.length === 0 && history.push("/")}
      <Layout
        subTitle="Contactos"
        subUndertitle={<GoBack />}
        subBreadcrumbs={id ? `Contacto ${contactById.fullName}` : "Crear nuevo contacto"}
        footContent={
          <>
            <button className="buttonForm" type="submit" form="ContactForm">
              <FiSave
                style={
                  size > 480
                    ? { marginRight: 7 }
                    : { marginRight: 7, transform: "scale(125%)", verticalAlign: "middle" }
                }
              />
              {size > 480 && "Guardar"}
            </button>
            <Link className="buttonFormCancel" to="/contactos">
              Cancelar
            </Link>
            {id && user.role !== "Consultor" && (
              <button
                className="buttonFormDelete"
                onClick={() =>
                  deleteContact(id).then(() => {
                    alert("Contacto borrado correctamente");
                    history.push("/contactos");
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
          <div className="ContactForm">
            <div className="ContactForm__header">
              <div className="ContactForm__header--info">
                <h3>{contactById?.fullName || name}</h3>
                <p>
                  <HiOutlineMail fontSize="1.1em" color="#47535B" style={{ marginRight: 9 }} />
                  {contactById?.email || email}
                </p>
                <p>
                  <FaPhoneAlt fontSize="0.85em" color="#47535B" style={{ marginRight: 9 }} />
                  {contactById?.contactMobileNumber || phone}
                </p>
              </div>
              <div>
                <button className="buttonForm" style={{ marginLeft: 20 }} onClick={() => history.push('/peticiones/crear')}>
                  Crear nueva petición
                </button>
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
                    contactMobileNumber: contactById ? contactById.contactMobileNumber : phone,
                    contactPhoneNumber: contactById ? contactById.contactPhoneNumber : "",
                    company: contactById ? contactById.company : "",
                    street: contactById ? contactById.contactDirection.address.street : "",
                    directionNumber: contactById ? contactById.contactDirection.address.directionNumber : "",
                    directionFloor: contactById ? contactById.contactDirection.address.directionFloor : "",
                    postalCode: contactById ? contactById.contactDirection.postalCode : "",
                    city: contactById ? contactById.contactDirection.city : "",
                    country: contactById ? contactById.contactDirection.country : "",
                    contactComments: contactById ? contactById.contactComments : "",
                    notReceiveCommunications: contactById ? contactById.notReceiveCommunications : false,
                    consultant: user._id,
                  }}
                  onSubmit={(data) => {
                    if (id) data.id = id;
                    data.tag = selTag;

                    if (!id) {
                      createContact(data).then((res) => {
                        alert(`El contacto ${res.fullName} ha sido creado`);
                        history.push("/contactos");
                      });
                    } else
                      updateContact(data).then((res) => {
                        alert(`El contacto ${res.fullName} ha sido actualizado`);
                      });
                  }}
                >
                  {(formProps) => (
                    <Form id="ContactForm">
                      <div className="ContactForm__form">
                        <div className="ContactForm__form--col">
                          <div className="ContactForm__form">
                            <div className="ContactForm__form--col">
                              <Input
                                label="Nombre completo"
                                required="yes"
                                name="fullName"
                                value={formProps.values.fullName}
                                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                              />
                            </div>
                            <div className="ContactForm__form--col">
                              <Checkboxes
                                label="Etiqueta"
                                textA="Cliente"
                                valueA="Cliente"
                                onChangeA={(ev) => newSelect(selTag, setSelTag, ev)}
                                checkedA={selTag.includes("Cliente") ? true : ""}
                                textB="Propietario"
                                valueB="Propietario"
                                onChangeB={(ev) => newSelect(selTag, setSelTag, ev)}
                                checkedB={selTag.includes("Propietario") ? true : ""}
                              />
                            </div>
                          </div>
                          <Input
                            label="Email"
                            required="yes"
                            type="email"
                            name="email"
                            value={formProps.values.email}
                            onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                          />
                          <div className="ContactForm__form">
                            <div className="ContactForm__form--col">
                              <Input
                                label="Teléfono móvil"
                                name="contactMobileNumber"
                                type="text"
                                value={formProps.values.contactMobileNumber}
                                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                              />
                            </div>
                            <div className="ContactForm__form--col">
                              <Input
                                label="Teléfono fijo"
                                name="contactPhoneNumber"
                                type="text"
                                value={formProps.values.contactPhoneNumber}
                                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                              />
                            </div>
                          </div>

                          <Input
                            label="Empresa"
                            name="company"
                            value={formProps.values.company}
                            onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                          />

                          <InputsGroup
                            label="Dirección"
                            inputs={[
                              {
                                name: "street",
                                label: "Calle",
                                value: formProps.values.street,
                                onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                errors: "",
                              },
                              {
                                name: "postalCode",
                                label: "Código postal",
                                value: formProps.values.postalCode,
                                onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                errors: "",
                              },
                              {
                                name: "city",
                                label: "Ciudad",
                                value: formProps.values.city,
                                onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                errors: "",
                              },
                              {
                                name: "country",
                                label: "País",
                                value: formProps.values.country,
                                onChange: (ev) => formProps.setFieldValue(ev.target.name, ev.target.value),
                                errors: "",
                              },
                            ]}
                          />
                        </div>

                        <div className="ContactForm__form--col">
                          <Textarea
                            label="Comentarios"
                            name="contactComments"
                            value={formProps.values.contactComments}
                            onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                          />

                          <Checkbox
                            label="No recibir emails automáticos"
                            name="notReceiveCommunications"
                            checked={formProps.values.notReceiveCommunications}
                            onChange={(ev) =>
                              formProps.setFieldValue(ev.target.name, !formProps.values.notReceiveCommunications)
                            }
                          />
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </TabPanel>
              {id ? (
                <TabPanel header="Peticiones">
                  {requests.length === 0 ? (
                    <div>
                      <p style={{ marginTop: 100 }}>Este contacto no tiene peticiones creadas</p>
                      <MdLocationSearching fontSize="2.5em" style={{ marginTop: 20, marginBottom: 100 }} />
                    </div>
                  ) : (
                    requests.map((request, index) => {
                      return (
                        <ContactRequestCard key={`${request._id}-${request.requestReference}`} request={request} />
                      );
                    })
                  )}
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
