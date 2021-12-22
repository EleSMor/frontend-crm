import React, { useEffect, useState, useContext } from "react";
import { Formik, Form } from "formik";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { Navbar, SubHeader } from "../../components";
import AdsTable from "../../components/AdsTable/AdsTable";
import { UserContext } from "../../components/Context/AuthUser";
import { getAllAds } from "../../api/ads.api";
import { getAllConsultants, createConsultant, getConsultantById, updateConsultant } from "../../api/consultants.api";

const ConsultantForm = () => {
  const history = useHistory();
  const { id } = useParams();

  const [adsFiltered, setAdsFiltered] = useState([]);
  const [consultants, setConsultants] = useState();
  const [consultantById, setConsultantById] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      getConsultantById(id).then((res) => setConsultantById(res));
      getAllAds().then((res) => {
        res = res.filter((ad) => {
          return ad.consultant._id === id;
        });
        setAdsFiltered(res);
      });
    }
    getAllConsultants().then((res) => setConsultants(res));
  }, []);

  return (
    <>
      {user.length === 0 && history.push("/")}
      <Navbar />
      <SubHeader title="Consultores" list={consultants} location="/consultants/create" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          consultantEmail: consultantById ? consultantById.consultantEmail : "",
          consultantPassword: consultantById ? consultantById.consultantPassword : "",
          fullName: consultantById ? consultantById.fullName : "",
          avatar: "",
          companyUnitLogo: "",
          consultantMobileNumber: consultantById ? consultantById.consultantMobileNumber : "",
          consultantPhoneNumber: consultantById ? consultantById.consultantPhoneNumber : "",
          position: consultantById ? consultantById.position : "",
          profession: consultantById ? consultantById.profession : "",
          office1: consultantById ? consultantById.office1 : "",
          office2: consultantById ? consultantById.office2 : "",
          consultantComments: consultantById ? consultantById.consultantComments : "",
        }}
        onSubmit={(values) => {
          let data = new FormData();

          for (var key in values) {
            data.append(key, values[key]);
            console.log("clave:", key, "valor", values[key]);
          }

          data.append("id", id);
          if (!id) {
            console.log(data);
            createConsultant(data).then(() => history.push("/consultants"));
          } else {
            data.id = id;
            updateConsultant(data).then((res) => {
              alert(`El consultor ${res.fullName} ha sido actualizado`);
              history.go(0);
            });
          }
        }}
      >
        {(formProps) => (
          <Form>
            <TabView>
              <TabPanel header="Detalles">
                <div>
                  <label htmlFor="consultantEmail">Email</label>
                  <input
                    type="email"
                    name="consultantEmail"
                    value={formProps.values.consultantEmail}
                    required
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="consultantPassword">Contraseña</label>
                  <input
                    type="password"
                    name="consultantPassword"
                    value={formProps.values.consultantPassword}
                    required
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="fullName">Nombre completo</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formProps.values.fullName}
                    required
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="avatar">Avatar</label>
                  <input
                    type="file"
                    name="avatar"
                    onChange={(ev) => formProps.setFieldValue("avatar", ev.target.files[0])}
                  />
                </div>
                <div>
                  <label htmlFor="companyUnitLogo">Logo unidad de negocio</label>
                  <input
                    type="file"
                    name="companyUnitLogo"
                    onChange={(ev) => formProps.setFieldValue("companyUnitLogo", ev.target.files[0])}
                  />
                </div>
                <div>
                  <label htmlFor="consultantMobileNumber">Teléfono móvil</label>
                  <input
                    type="text"
                    name="consultantMobileNumber"
                    value={formProps.values.consultantMobileNumber}
                    required
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="consultantPhoneNumber">Teléfono fijo</label>
                  <input
                    type="text"
                    name="consultantPhoneNumber"
                    value={formProps.values.consultantPhoneNumber}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="position">Posición</label>
                  <input
                    type="text"
                    name="position"
                    value={formProps.values.position}
                    required
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="profession">Ocupación</label>
                  <input
                    type="text"
                    name="profession"
                    value={formProps.values.profession}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="office1">Oficina 1</label>
                  <input
                    type="text"
                    name="office1"
                    value={formProps.values.office1}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="office2">Oficina 2</label>
                  <input
                    type="text"
                    name="office2"
                    value={formProps.values.office2}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="consultantComments">Comentarios</label>
                  <input
                    type="text"
                    name="consultantComments"
                    value={formProps.values.consultantComments}
                    onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
                  />
                </div>
                <button type="submit">Guardar</button>
                <NavLink to="/consultants">
                  <button>Cancelar</button>
                </NavLink>
              </TabPanel>
              {id && (
                <TabPanel header="Anuncios">
                  <AdsTable ads={adsFiltered.length !== 0 ? adsFiltered : []} />
                </TabPanel>
              )}
            </TabView>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ConsultantForm;
