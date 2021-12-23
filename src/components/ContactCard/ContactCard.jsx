import React from "react";
import { Link } from 'react-router-dom'
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { BsPencilSquare, BsPersonCircle } from "react-icons/bs";
import moment from "moment";
import "./ContactCard.scss";

const ContactCard = ({ contacts }) => {
  return (
    <div className="ContactCards">
      {contacts &&
        contacts.map((contact, index) => {
          return (
            <div className="ContactCard__Card" key={`${index}-${contact._id}`}>
              <div className="ContactCard__Card--item ContactCard__Card--item-genInfo">
                <h3>{contact.fullName}</h3>
                <p>
                  <HiOutlineLocationMarker
                    fontSize="1.2em"
                    color="#47535B"
                    style={{ marginRight: 5 }}
                  />{" "}
                  {` ${contact.contactDirection.address.street}, ${contact.contactDirection.address.directionNumber}, ${contact.contactDirection.address.directionFloor}`}
                </p>
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

              <div className="ContactCard__Card--item ContactCard__Card--item-iconsInfo">
                <p>
                  <FaPhoneAlt
                    fontSize="0.85em"
                    color="#47535B"
                    style={{ marginRight: 9 }}
                  />
                  {contact.contactMobileNumber} | {contact.contactPhoneNumber}
                </p>
                <p>
                  <HiOutlineMail
                    fontSize="1.1em"
                    color="#47535B"
                    style={{ marginRight: 9 }}
                  />
                  {contact.email}
                </p>
                <p>
                  <BsPersonCircle
                    fontSize="1.1em"
                    color="#47535B"
                    style={{ marginRight: 9 }}
                  />
                  <span className="ContactCard__Card--item--border">Luis</span>
                </p>
                <p>
                  <BsPencilSquare
                    fontSize="1.1em"
                    color="#47535B"
                    style={{ marginRight: 9 }}
                  />
                  0 Peticiones
                </p>
              </div>

              <div className="ContactCard__Card--item ContactCard__Card--item-textArea">
                <p>Comentarios</p>
                <textarea defaultValue={contact.contactComments}></textarea>
              </div>

              <div className="ContactCard__Card--item ContactCard__Card--item-cta">
                <span>Creado el {moment(contact.createdAt).format("L")}</span>
                <Link className="ContactCard__Card--item-cta--button" to={`/contacts/${contact._id}`}>Abrir Ficha</Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ContactCard;
