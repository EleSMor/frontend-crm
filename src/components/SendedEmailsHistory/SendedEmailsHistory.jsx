import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/AuthUser";
import { useParams, Link, useHistory } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useWindowSize from "../../hooks/useWindowSize";
import { getContactById } from "../../api/contacts.api";
import * as moment from "moment";
import "moment/locale/es";
import "./SendedEmailsHistory.scss";

const SendedEmailsHistory = ({ requestById }) => {
  const [emailsSends, setEmailsSends] = useState([]);
  const [loader, setLoader] = useState(true);
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const size = useWindowSize();
  const history = useHistory();

  useEffect(() => {
    getContactById(requestById.requestContact._id).then((res) => {
      setEmailsSends(res.receivedEmails);
      setLoader(false);
    });
  }, []);

  const renderDirection = (direction) => {
    return (
      <span>
        {direction.address.directionNumber
          ? direction.address.directionFloor
            ? ` ${direction.address.street}, ${direction.address.directionNumber}, ${direction.address.directionFloor}`
            : ` ${direction.address.street}, ${direction.address.directionNumber}`
          : ` ${direction.address.street}`}
      </span>
    );
  };

  return (
    <div className="MatchedAd__container">
      {loader ? (
        <Spinner />
      ) : (
        <DataTable
          style={{ width: "100%" }}
          value={emailsSends.length !== 0 ? emailsSends : ""}
          dataKey="_id"
          responsiveLayout="scroll"
          emptyMessage="No se han enviado anuncios a esta petición todavía."
          paginator
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
        >
          <Column
            field="_id"
            header="Id de envío"
            bodyStyle={{ width: "10%", verticalAlign: "top" }}
            body={(ev) => {
              return ev._id;
            }}
          ></Column>
          <Column
            field="ad.title"
            header="Nombre del anuncio"
            body={(ev) => (
              <div style={{ display: "flex", alignItems: "flex-start", textDecoration: "none" }}>
                {size > 440 ? (
                  <>
                    {ev.ad.images?.main ? (
                      <img
                        src={ev.ad.images?.main}
                        alt={ev.ad.images.title}
                        style={{ width: 81, height: 75, borderRadius: "4px" }}
                      />
                    ) : (
                      <img
                        src="\defaultImage.png"
                        alt="Imagen por defecto"
                        style={{ width: 81, height: 75, borderRadius: "4px" }}
                      />
                    )}
                    <Link to={`/anuncios/${ev.ad._id}`} className="AdCard AdCard__row__title">
                      <p>{ev.ad.title}</p>
                    </Link>
                  </>
                ) : (
                  <Link to={`/anuncios/${ev.ad._id}`} className="AdCard AdCard__row__title">
                    <p>{ev.ad.title}</p>
                  </Link>
                )}
              </div>
            )}
            bodyStyle={{ width: "30%", verticalAlign: "top" }}
          ></Column>
          <Column
            field="ad.adDirection"
            header="Dirección"
            bodyStyle={{ width: "30%", verticalAlign: "top" }}
            body={(ev) => {
              return renderDirection(ev.ad.adDirection);
            }}
          ></Column>
          <Column
            field="sendDate"
            header="Fecha"
            bodyStyle={{ width: "40%", verticalAlign: "top" }}
            body={(ev) => {
              return moment(ev.sendDate).locale("es-ES").format("L");
            }}
          ></Column>
        </DataTable>
      )}
    </div>
  );
};

export default SendedEmailsHistory;
