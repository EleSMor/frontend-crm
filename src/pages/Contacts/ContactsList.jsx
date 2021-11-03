import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ContactCard from "../../components/ContactCard/ContactCard";
import { getAllContacts } from "../../api/contacts.api";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAllContacts().then((res) => setContacts(...contacts, res));
  }, []);

  return (
    <>
      <NavLink to="/contacts/create">
        <button>New contact</button>
      </NavLink>
      <ContactCard contacts={contacts} />
    </>
  );
};

export default ContactsList;
