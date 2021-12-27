import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../components/Context/AuthUser";
import ContactCard from "../../components/ContactCard/ContactCard";
import { getAllContacts } from "../../api/contacts.api";
import PopUp from "../../components/PopUp/PopUp";
import Layout from "../Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import Pagination from "../../components/Pagination/Pagination";
import GoBack from "../../components/GoBack/GoBack";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [contactsFiltered, setContactsFiltered] = useState([]);
  const [popUp, setPopUp] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [qPerPage] = useState(5);
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
        subLocation="/contactos/crear"
        subSetter={setContactsFiltered}
        footContent={<ContactListFooter />}
        subUndertitle={<GoBack />}
        //subBreadcrumbs="Nuevo crear"
      >
        {/* <button onClick={() => handlePopUp()}>Nuevo</button> */}

        {popUp && (
          <PopUp handlePopUp={handlePopUp} height="40%" width="50%" fixedButtons={true} buttons="holka">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries,
            </p>
          </PopUp>
        )}
        {loader ? <Spinner /> : currentContacts.map((contact) => <ContactCard contact={contact} />)}
      </Layout>
    </>
  );
};

export default ContactsList;
