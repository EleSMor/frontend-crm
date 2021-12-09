import React, { useEffect, useState } from "react";
import ContactList from "./ContactList";
import { getContactsByFullName, getContactsByMobileNumber, getContactsByEmail } from "./../../api/contacts.api";

const ContactValidation = ({ setOpenForm }) => {
  const [contacts, setContacts] = useState([]);

  const findBy = (getFunction, value, setter) => {
    getFunction(value).then((res) =>
      res.forEach((contact) => {
        setContacts([...contacts, contact]);
      })
    );
  };

  return (
    <div>
      <div>
        <span>Crear un nuevo contacto</span>
      </div>
      <div>
        <span>Para comprobar que no existe ninguna conincidencia, por favor introduzca los siguientes datos</span>
        <div>
          <div>
            <label htmlFor="fullName">Nombre completo</label>
            <input
              type="text"
              placeholder="Escriba aquí..."
              onBlur={(ev) => findBy(getContactsByFullName, ev.target.value, "fullName")}
            />
          </div>
          <div>
            <label htmlFor="contactMobileNumber">Teléfono</label>
            <input
              type="phone"
              placeholder="Escriba aquí..."
              onBlur={(ev) => {
                if (ev.target.value)
                  getContactsByMobileNumber(ev.target.value).then((res) =>
                    res.forEach((contact) => setContacts([...contacts, contact]))
                  );
              }}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Escriba aquí..." onBlur={(ev) => {}} />
          </div>
        </div>
      </div>
      <div>{contacts.length !== 0 && <ContactList contacts={contacts} />}</div>
    </div>
  );
};

export default ContactValidation;
