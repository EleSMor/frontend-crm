import { useState } from "react";
import { Link } from "react-router-dom";
import ContactList from "./ContactList";
import "./ContactValidation.scss";
import Input from "../Input/Input";

const ContactValidation = ({ list }) => {
  const [contacts, setContacts] = useState([]);
  const [fullName, setFullName] = useState("");
  const [contactMobileNumber, setContactMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

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

  /**
   * 1º Cuando introducimos un valor, ya sea en nombre o teléfono, y el resultado está vacío, busca en el listado total
   * utilizando los valores de los 2 inputs
   * 2º Si ya tenemos resultado y modificamos los campos, vuelve a realizar la búsqueda utilizando de nuevo los valores
   * 3º Si borramos uno de los campos y hay resultado, no hace nada
   * 4º Si borramos todos los campos, borramos el resultado
   */

  const searchContacts = () => {
    let search = [];
    const fullNameValue = document.querySelector('input[name="fullName"]').value;
    const mobileValue = document.querySelector('input[name="contactMobileNumber"]').value;
    const emailValue = document.querySelector('input[name="email"]').value;

    search = list.filter((contact) => {
      if (
        checkIfIncludes(contact.fullName, fullNameValue) &&
        checkIfIncludes(contact.contactMobileNumber, mobileValue) &&
        checkIfIncludes(contact.email, emailValue)
      ) {
        return contact;
      }
    });

    if (list.some((contact) => checkIfIncludes(contact.email, emailValue))) setIsValidEmail(false);
    else setIsValidEmail(true);

    if (fullNameValue === "" && mobileValue === "" && emailValue === "") {
      setContacts([]);
    } else {
      setContacts(search);
    }
  };

  return (
    <div className="ContactValidation">
      <p>Para comprobar que no existe ninguna conincidencia, por favor introduzca los siguientes datos.</p>

      <div className="ContactValidation--inputs">
        <Input
          label="Nombre completo"
          name="fullName"
          placeholder="Escriba aquí"
          type="text"
          onChange={(ev) => {
            setFullName(ev.target.value);
            searchContacts();
          }}
          autocomplete="false"
        />
        <Input
          label="Teléfono"
          name="contactMobileNumber"
          placeholder="Escriba aquí"
          type="phone"
          onChange={(ev) => {
            setContactMobileNumber(ev.target.value);
            searchContacts();
          }}
          autocomplete="false"
        />
        <Input
          label="Email"
          name="email"
          placeholder="Escriba aquí"
          type="email"
          onChange={(ev) => {
            setEmail(ev.target.value);
            searchContacts();
          }}
          autocomplete="false"
        />
      </div>

      <div className="ContactValidation--results">
        {contacts.length !== 0 && <ContactList contacts={contacts} isValidEmail={isValidEmail} />}
        {contacts.length === 0 && email && isValidEmail && (
          <p className="ContactValidation--results__valid">No existen coincidencias en el sistema</p>
        )}
      </div>

      <div className="ContactValidation--button">
        {(list.length === 0 && email && fullName && contactMobileNumber) ||
        (contacts.length === 0 && email && isValidEmail) ? (
          <Link
            className="ContactValidation--button--button__active"
            to={`/contactos/crear/${fullName}/${email}/${contactMobileNumber}`}
          >
            Crear
          </Link>
        ) : (
          <a className="ContactValidation--button--button">Crear</a>
        )}
      </div>
    </div>
  );
};

export default ContactValidation;
