import React from "react";

const ContactCard = ({ contacts }) => {
  console.log(contacts);

  return (
    <div>
      {contacts &&
        contacts.map((contact, index) => {
          console.log(contact)
          return (
            <div key={`${contact._id}-${index}`}>
              <div>
                <div>
                  <h2>{contact.fullName}</h2>
                  <p>{contact.contactDirection.street}</p>
                  <p>{contact.contactDirection.postalCode}</p>
                  <p>{contact.contactDirection.city}</p>
                  <p>{contact.contactDirection.country}</p>
                  <p>{contact.company}</p>
                </div>
                <div>
                  {contact.tag.map((tag, index) => {
                    return (<><span>{tag} </span></>);
                  })}
                </div>
              </div>
              <div>
                <div>
                  <span>{contact.contactMobileNumber}</span>
                  <span> | </span>
                  <span>{contact.contactPhoneNumber}</span>
                </div>
                <p>{contact.email}</p>
                {/* <div>
                <span>Consultor 1</span>
                <span>Consultor 2</span>
              </div> */}
                <div>
                  <span>Nº peticiones</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ContactCard;
