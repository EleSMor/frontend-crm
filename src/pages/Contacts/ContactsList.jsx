import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../components/Context/AuthUser";
import ContactForm from "./ContactForm";
import { Navbar, SubHeader } from "../../components";
import ContactCard from "../../components/ContactCard/ContactCard";
import { getAllContacts } from "../../api/contacts.api";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const { user } = useContext(UserContext);
  const history = useHistory();
  console.log(user);

  useEffect(() => {
    getAllContacts().then((res) => setContacts(res), []);
  }, []);

  return (
    <>
      {!user && history.push("/login")}
      <Navbar />
      <SubHeader title="Contactos" list={contacts} setOpenForm={setOpenForm} />
      {openForm === true && <ContactForm setOpenForm={setOpenForm} />}
      {openForm === false && <ContactCard contacts={contacts} />}
    </>
  );
};

export default ContactsList;
