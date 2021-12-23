import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import moment from "moment";
import "./ContactCard.scss";

const ContactCard = ({ contacts }) => {
  return (
    <div className="ContactCards">
      {contacts &&
        contacts.map((contact, index) => {
          return (
            <div className="ContactCard__Card" key={`${index}-${contact._id}`}>
              
              <div className="ContactCard__Card--item">
                <h3>{contact.fullName}</h3>
                <p><HiOutlineLocationMarker
                  fontSize="1.2em"
                  color="#47535B"
                  style={{marginRight: 5}}
                /> {` ${contact.contactDirection.address.street}, ${contact.contactDirection.address.directionNumber}, ${contact.contactDirection.address.directionFloor}`}</p>
                <p>{`${contact.contactDirection.postalCode} ${contact.contactDirection.city}, ${contact.contactDirection.country}`}</p>
                <p>{contact.company}</p>

                <div className="ContactCard__Card--item__tags">
                  {contact.tag.map((tag, index) => {
                    return (
                      <span
                        key={`${index}-${tag}`}
                        className="ContactCard__Card--item__tags__tag"
                      >
                        {tag}{" "}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="ContactCard__Card--item">
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

              <div className="ContactCard__Card--item">
                <span>Comentarios</span>
                <textarea defaultValue={contact.contactComments}></textarea>
              </div>

              <div className="ContactCard__Card--item">
                <span>Creado el {moment(contact.createdAt).format("L")}</span>
                <NavLink to={`/contactos/${contact._id}`}>
                  <button>Abrir Ficha</button>
                </NavLink>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ContactCard;
