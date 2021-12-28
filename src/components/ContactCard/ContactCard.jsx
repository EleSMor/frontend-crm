import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { BsPencilSquare, BsPersonCircle } from "react-icons/bs";
import { getRequestByContacts } from "../../api/requests.api";
import moment from "moment";
import "./ContactCard.scss";

const ContactCard = ({ contact }) => {
  const [requests, setRequests] = useState(0);

  useEffect(() => {
    getRequestByContacts(contact._id).then((data) => setRequests(data.length), [contact]);
  });

  const renderDirection = (contact) => {
    return (
      <p>
        <HiOutlineLocationMarker fontSize="1.2em" color="#47535B" style={{ marginRight: 5 }} />{" "}
        {contact.contactDirection.address.directionNumber
          ? contact.contactDirection.address.directionFloor
            ? ` ${contact.contactDirection.address.street}, ${contact.contactDirection.address.directionNumber}, ${contact.contactDirection.address.directionFloor}`
            : ` ${contact.contactDirection.address.street}, ${contact.contactDirection.address.directionNumber}`
          : ` ${contact.contactDirection.address.street}`}
      </p>
    );
  };

  return (
    <div className="ContactCards">
      <div className="ContactCard__Card" id={contact._id}>
        <div className="ContactCard__Card--item ContactCard__Card--item-genInfo">
          <h3>{contact.fullName}</h3>
          {renderDirection(contact)}
          <p>
            {contact.contactDirection.postalCode
              ? `${contact.contactDirection.postalCode} ${contact.contactDirection.city}, ${contact.contactDirection.country}`
              : "España"}
          </p>
          <p>{contact.company}</p>

          <div className="ContactCard__Card--item__tags">
            {contact.tag.map((tag, index) => {
              return (
                <span key={`${index}-${tag}`} className="ContactCard__Card--item__tags__tag">
                  {tag}{" "}
                </span>
              );
            })}
          </div>
        </div>

        <div className="ContactCard__Card--item ContactCard__Card--item-iconsInfo">
          <p>
            <FaPhoneAlt fontSize="0.85em" color="#47535B" style={{ marginRight: 9 }} />
            {contact.contactMobileNumber} | {contact.contactPhoneNumber}
          </p>
          <p>
            <HiOutlineMail fontSize="1.1em" color="#47535B" style={{ marginRight: 9 }} />
            {contact.email}
          </p>
          <p>
            <BsPersonCircle fontSize="1.1em" color="#47535B" style={{ marginRight: 9 }} />
            <span className="ContactCard__Card--item--border">Luis</span>
          </p>
          <p>
            <BsPencilSquare fontSize="1.1em" color="#47535B" style={{ marginRight: 9 }} />
            {requests} Peticiones
          </p>
        </div>

        <div className="ContactCard__Card--item ContactCard__Card--item-textArea">
          <p>Comentarios</p>
          <textarea defaultValue={contact.contactComments}></textarea>
        </div>

        <div className="ContactCard__Card--item ContactCard__Card--item-cta">
          <span>Creado el {moment(contact.createdAt).format("L")}</span>
          <Link className="ContactCard__Card--item-cta--button" to={`/contactos/${contact._id}`}>
            Abrir Ficha
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
