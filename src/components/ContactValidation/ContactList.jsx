import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";

const ContactList = ({ contacts }) => {
  return (
    <div>
    <p>Existen coincidencias con estos datos</p>
      {contacts.map((contact, index) => {
        return (
          <div className="ContactValidation--results--card" key={`${contact._id}-${index}`}>
            <div>
              <span><b>{contact.fullName}</b></span>
              <span>{contact.company}</span>
            </div>

            <div>
              <span><FaPhoneAlt fontSize="0.82em" color="#47535B" style={{ marginRight: 11 }} />
              {contact.contactMobileNumber}</span>
              <span><HiOutlineMail fontSize="1em" color="#47535B" style={{ marginRight: 9 }} />
              {contact.email}</span>
            </div>

            <div className="ContactValidation--results--card--buttItem">
              <button>Ver ficha</button>
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default ContactList;
