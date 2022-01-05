import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactList from "./ContactList";
import {
  getContactsByFullName,
  getContactsByMobileNumber,
  getContactsByEmail,
} from "./../../api/contacts.api";
import "./ContactValidation.scss";
import Input from "../Input/Input";

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
    <div className="ContactValidation">
      <p>
        Para comprobar que no existe ninguna conincidencia, por favor introduzca
        los siguientes datos.
      </p>

      <div className="ContactValidation--inputs">
        <Input 
          label="Nombre completo"
          placeholder="Escriba aquí"
          type="text"
          onBlur={(ev) =>
                findBy(getContactsByFullName, ev.target.value, "fullName")
              }
          />
        <div>
          <label htmlFor="contactMobileNumber">Teléfono</label>
          <input
            type="phone"
            placeholder="Escriba aquí"
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
          <input type="email" placeholder="Escriba aquí" onBlur={(ev) => {}} />
        </div>
      </div>

      <div className="ContactValidation--results">
        {contacts.length !== 0 && <ContactList contacts={contacts} />}
      </div>

      <Link
        className="ContactValidation--button"
        to={`/contactos/crear/${"popUp_name"}/${"popUp_email"}/${"popUp_phone"}`}
      >
        Crear
      </Link>
    </div>
  );
};

export default ContactValidation;
