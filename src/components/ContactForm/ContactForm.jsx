import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import AdsTable from "../../components/AdsTable/AdsTable";
import { getAllAds } from "../../api/ads.api";
import { getAllContacts, createContact, getContactById } from "../../api/contacts.api";
import { Navbar, SubHeader } from "../../components";
import { UserContext } from "../../components/Context/AuthUser";

const ContactForm = () => {
  const [error, setError] = useState();
  const [contacts, setContacts] = useState([]);
  const [contactById, setContactById] = useState("");
  const [ads, setAds] = useState([]);
  const [adsFiltered, setAdsFiltered] = useState([]);
  const [selTag, setSelTag] = useState([]);
  const [tagClient, setSelTagClient] = useState(false);
  const [tagOwner, setSelTagOwner] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      getContactById(id).then((res) => {
        setContactById(res);
        if (res.tag.includes("Cliente")) setSelTagClient(true);
        if (res.tag.includes("Propietario")) setSelTagOwner(true);
      });
      getAllAds().then((res) => {
        res = res.filter((ad) => {
          return ad.owner._id !== id;
        });
        setAds(res);
        setAdsFiltered(res);
      });
    }
    getAllContacts().then((res) => setContacts(res));
  }, []);

  const newSelect = (selected, setSelected, ev) => {
    if (selected.includes(ev.target.value)) {
      const newSelected = selected.filter((selected) => selected !== ev.target.value);
      setSelected(newSelected);
    } else {
      console.log(ev.target.value);
      setSelected([...selected, ev.target.value]);
    }
  };
  console.log(tagClient);
  console.log(tagOwner);

  return (
    <>
      {!user && history.push("/")}
      <Navbar />
      <SubHeader title="Contactos" list={contacts} location="/contacts/create" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          fullName: contactById ? contactById.fullName : "",
          tag: contactById ? contactById.tag : [],
          email: contactById ? contactById.email : "",
          contactMobileNumber: contactById ? contactById.contactMobileNumber : "",
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
        }}
        onSubmit={(data) => {
          data.tag = selTag;

          if (!id) {
            console.log(data);
            createContact(data).then(() => history.push("/contacts"));
          }
        }}
      >
        {(formProps) => (
          <Form>
            <TabView>
              <TabPanel header="Detalles">
                <div>
                  <div>
                    <label htmlFor="fullName">Nombre completo</label>
                    <div>
                      <input
                        name="fullName"
                        required="yes"
                        defaultValue={formProps.values.fullName}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="tag" onChange={(ev) => newSelect(selTag, setSelTag, ev)}>
                      Etiqueta
                      <div>
                        <input type="checkbox" value="Cliente" defaultChecked={tagClient ? true : false} />
                        <span>Cliente</span>
                        <input type="checkbox" value="Propietario" defaultChecked={tagOwner ? true : false} />
                        <span>Propietario</span>
                      </div>
                    </label>
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <div>
                      <input
                        name="email"
                        type="email"
                        required="yes"
                        defaultValue={formProps.values.email}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contactMobileNumber">Teléfono móvil</label>
                    <div>
                      <input
                        name="contactMobileNumber"
                        type="text"
                        defaultValue={formProps.values.contactMobileNumber}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contactPhoneNumber">Teléfono fijo</label>
                    <div>
                      <input
                        name="contactPhoneNumber"
                        defaultValue={formProps.values.contactPhoneNumber}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company">Empresa</label>
                    <div>
                      <input
                        name="company"
                        defaultValue={formProps.values.company}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <hr />
                    <span>Dirección</span>
                    <div>
                      <label htmlFor="street">Calle</label>
                      <div>
                        <input
                          name="street"
                          defaultValue={formProps.values.street}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                      </div>
                      <label htmlFor="postalCode">Código Postal</label>
                      <div>
                        <input
                          name="postalCode"
                          defaultValue={formProps.values.postalCode}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                      </div>
                      <label htmlFor="city">Ciudad</label>
                      <div>
                        <input
                          name="city"
                          defaultValue={formProps.values.city}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                      </div>
                      <label htmlFor="country">País</label>
                      <div>
                        <input
                          name="country"
                          defaultValue={formProps.values.country}
                          onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contactComments">Comentarios</label>
                    <div>
                      <textarea
                        name="contactComments"
                        defaultValue={formProps.values.contactComments}
                        onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="notReceiveCommunications">No recibir emails automáticos</label>
                    <input
                      type="checkbox"
                      name="notReceiveCommunications"
                      defaultChecked={formProps.values.notReceiveCommunications}
                      onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                    />
                  </div>
                </div>
                {!id && <button type="submit">Guardar</button>}
                <NavLink to="/contacts">
                  <button type="">Cancelar</button>
                </NavLink>
              </TabPanel>
              {id && (
                <TabPanel header="Peticiones">
                  <AdsTable ads={adsFiltered.length !== 0 ? adsFiltered : []} />
                </TabPanel>
              )}
            </TabView>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
