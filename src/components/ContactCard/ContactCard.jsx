import React from "react";
import "./ContactCard.scss";

const ContactCard = ({ contacts }) => {
  return (
    <div>
      {contacts &&
        contacts.map((contact, index) => {
          return (
            <div className="card__box" key={`${contact._id}-${index}`}>
              <div>
                <div>
                  <div>
                    <a href={`/contacts/${contact._id}`}>{contact.fullName}</a>
                  </div>
                  <div>
                    <p>{`${contact.contactDirection.address.street} ${contact.contactDirection.address.directionNumber} ${contact.contactDirection.address.directionFloor}`}</p>
                  </div>
                  <div>
                    <p>{`${contact.contactDirection.postalCode} ${contact.contactDirection.city}, ${contact.contactDirection.country}`}</p>
                  </div>
                  <div>
                    <p>{contact.company}</p>
                  </div>
                </div>
                <div>
                  {contact.tag.map((tag, index) => {
                    return (
                      <>
                        <span>{tag} </span>
                      </>
                    );
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
