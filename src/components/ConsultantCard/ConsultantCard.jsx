import { Link } from "react-router-dom";
import { BsImage } from "react-icons/bs";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import moment from "moment";
import "./ConsultantCard.scss";

const ConsultantCard = ({ consultant }) => {
  return (
    <div className="ConsultantCard" id={consultant._id}>
      <div className="ConsultantCard--img displayElements">
        {consultant.avatar ? (
          <div >
            <img className="ConsultantCard--img" src={`${consultant.avatar}`} alt={consultant.fullName} />
          </div>
        ) : (
          <div>
            <BsImage fontSize="2em" color="#fff" />
          </div>
        )}
      </div>

      <div className="ConsultantCard--info">
        <div className="ConsultantCard--info--title">
          <h3>
            <Link className="ConsultantCard--info--title--link" to={`/consultores/${consultant._id}`}>
              {consultant.fullName}
            </Link>
          </h3>
          <Link
            className="ConsultantCard--info--title--link ConsultantCard--info--title--tag"
            to={`/consultores/${consultant._id}`}
          >
            {consultant.position}
          </Link>
        </div>

        <p>
          <HiOutlineMail fontSize="1.1em" color="#47535B" style={{ marginRight: 8 }} />
          {consultant.consultantEmail || "Sin email"}
        </p>
        <p>
          <FaPhoneAlt fontSize="0.85em" color="#47535B" style={{ marginRight: 11 }} />
          {consultant.consultantMobileNumber}{" "}
          {consultant.consultantMobileNumber && `| ${consultant.consultantMobileNumber}`}
        </p>
      </div>

      <div className="ConsultantCard--location">
        <div className="ConsultantCard--location--top">
          <HiOutlineLocationMarker fontSize="1.2em" color="#47535B" style={{ marginRight: 5 }} />
          <p className="displayElements">
            <b>Oficinas</b>
          </p>
        </div>
        <div className="ConsultantCard--location--box">
          <p>{consultant.office1}</p>
          <p>{consultant.office2}</p>
        </div>
      </div>

      <div className="ConsultantCard--interact">
        <span className="displayElements">
          <small>Creado el {moment(consultant.createdAt).format("L")}</small>
        </span>
        <Link className="ConsultantCard--interact--button" to={`/consultores/${consultant._id}`}>
          Abrir Ficha
        </Link>
      </div>
    </div>
  );
};

export default ConsultantCard;
