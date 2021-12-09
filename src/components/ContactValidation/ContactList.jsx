import React from "react";

const ContactList = ({ contacts }) => {
  return (
    <div>
      {contacts.map((contact, index) => {
        return (
          <div key={`${contact._id}-${index}`}>
            <div>
              <span>{contact.fullName}</span>
              <span>{contact.company}</span>
            </div>
            <div>
              <span>{contact.contactMobileNumber}</span>
              <span>{contact.email}</span>
            </div>
            <div>
              <button>Ver ficha</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;
