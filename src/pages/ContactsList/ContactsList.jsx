import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../components/Context/AuthUser";
import ContactCard from "../../components/ContactCard/ContactCard";
import { getAllContacts } from "../../api/contacts.api";
import PopUp from "../../components/PopUp/PopUp";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import Pagination from "../../components/Pagination/Pagination";
import ContactValidation from "../../components/ContactValidation/ContactValidation";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [contactsFiltered, setContactsFiltered] = useState([]);
  const [popUp, setPopUp] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [qPerPage] = useState(10);
  const [loader, setLoader] = useState(true);

  const { user } = useContext(UserContext);
  const history = useHistory();

  const handlePopUp = () => {
    setPopUp(!popUp);
  };

  useEffect(() => {
    getAllContacts().then((res) => {
      setContacts(res);
      setContactsFiltered(res);
      setLoader(false);
    });
  }, []);

  const indexOfLastContact = currentPage * qPerPage;
  const indexOfFirstContact = indexOfLastContact - qPerPage;
  let currentContacts = contactsFiltered?.slice(indexOfFirstContact, indexOfLastContact);
  let contactsLength = contactsFiltered?.length;

  const paginate = (n) => {
    setCurrentPage(n);
    window.scrollTo({ top: 0 });
  };

  const ContactListFooter = () => (
    <Pagination qPerPage={qPerPage} totalQ={contactsLength} paginate={paginate} currentPage={currentPage} />
  );

  return (
    <>
      {!user && history.push("/")}
      <Layout
        subTitle="Contactos"
        subList={contacts}
        subLocation={() => handlePopUp()}
        subSetter={setContactsFiltered}
        footContent={<ContactListFooter />}
        //subBreadcrumbs="Nuevo crear"
      >
        
        {popUp && (
          <PopUp handlePopUp={handlePopUp} height="68%" mobileHeight="85%" width="50%" title="Crear contacto nuevo">
            <ContactValidation />
          </PopUp>
        )}
        {loader ? <Spinner /> : currentContacts.map((contact) => <ContactCard contact={contact} />)}
      </Layout>
    </>
  );
};

export default ContactsList;
