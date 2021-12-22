import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../components/Context/AuthUser";
import { Navbar, SubHeader } from "../../components";
import ContactCard from "../../components/ContactCard/ContactCard";
import { getAllContacts } from "../../api/contacts.api";
import PopUp from "../../components/PopUp/PopUp";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const { user } = useContext(UserContext);
  const history = useHistory();

  const handlePopUp = () => {
    setPopUp(!popUp);
  };

  useEffect(() => {
    getAllContacts().then((res) => setContacts(res));
  }, []);

  return (
    <>
      {!user && history.push("/")}
      <Navbar />
      <SubHeader
        title="Contactos"
        list={contacts}
        location="/contacts/create"
      />
      
      <ContactCard contacts={contacts} />

      <button onClick={() => handlePopUp()}>Open</button>

      {popUp && (
        <PopUp handlePopUp={handlePopUp} height="40%" width="50%" fixedButtons={true} buttons="holka">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, 
          </p>
        </PopUp>
      )}

    </>
  );
};

export default ContactsList;
