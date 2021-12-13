import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import "./ContactCard.scss";

const ContactCard = ({ contacts }) => {
  return (
    <div className="contact">
      {contacts &&
        contacts.map((contact, index) => {
          return (
            <div className="contact__box" key={`${contact._id}-${index}`}>
              <div className="contact__box-allInfo">
                <div className="contact__box-personalInfo">
                  <div>
                    <span className="contact__box-name">{contact.fullName}</span>
                  </div>
                  <div className="contact__box-details">
                    <div>
                      <span>{`${contact.contactDirection.address.street}, ${contact.contactDirection.address.directionNumber}, ${contact.contactDirection.address.directionFloor}`}</span>
                    </div>
                    <div>
                      <span>{`${contact.contactDirection.postalCode} ${contact.contactDirection.city}, ${contact.contactDirection.country}`}</span>
                    </div>
                    <div>
                      <span>{contact.company}</span>
                    </div>
                  </div>
                  <div className="contact__box-tags">
                    {contact.tag.map((tag, index) => {
                      return (
                        <>
                          <span className="contact__box-tag">{tag} </span>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="contact__box-contact">
                  <div>
                    <span>{contact.contactMobileNumber}</span>
                    <span> | </span>
                    <span>{contact.contactPhoneNumber}</span>
                  </div>
                  <p>{contact.email}</p>
                  <div>
                    <span>0 peticiones</span>
                  </div>
                </div>
                <div className="contact__box-comments">
                  <span>Comentarios</span>
                  <textarea value={contact.contactComments}></textarea>
                </div>
                <div className="contact__box-end">
                  <span>Creado el {moment(contact.createdAt).format("L")}</span>
                  <NavLink to={`/contacts/${contact._id}`}>
                    <button>Abrir Ficha</button>
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ContactCard;
