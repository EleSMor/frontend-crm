import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../components/Context/AuthUser";
import { Navbar, SubHeader } from "../../components";
import ContactCard from "../../components/ContactCard/ContactCard";
import { getAllContacts } from "../../api/contacts.api";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    getAllContacts().then((res) => setContacts(res));
  }, []);

  return (
    <>
      {!user && history.push("/")}
      <Navbar />
      <SubHeader title="Contactos" list={contacts} location="/contacts/create"/>
      <ContactCard contacts={contacts} />
    </>
  );
};

export default ContactsList;
