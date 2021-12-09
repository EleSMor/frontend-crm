import React, { useEffect, useState, useContext } from "react";
import { Formik, Form } from "formik";
import { useHistory, NavLink } from "react-router-dom";
import { getAllConsultants, createConsultant } from "../../api/consultants.api";
import { Navbar, SubHeader } from "../../components";
import { UserContext } from "../../components/Context/AuthUser";

const ConsultantForm = () => {
  const history = useHistory();
  const [consultants, setConsultants] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => getAllConsultants().then((res) => setConsultants(res)), []);

  return (
    <>
      <Navbar />
      <SubHeader title="Consultores" list={consultants} location="/consultants/create" />
      <Formik
        initialValues={{
          consultantEmail: "",
          consultantPassword: "",
          fullName: "",
          avatar: "",
          companyUnitLogo: "",
          consultantMobileNumber: "",
          consultantPhoneNumber: "",
          position: "",
          profession: "",
          office1: "",
          office2: "",
          comments: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          let data = new FormData();

          for (var key in values) {
            data.append(key, values[key]);
            console.log("clave:", key, "valor", values[key]);
          }

          createConsultant(data);
          history.push("/consultants");
        }}
      >
        {(formProps) => (
          <Form>
            <div>
              <label htmlFor="consultantEmail">Email</label>
              <input
                type="email"
                name="consultantEmail"
                required
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="consultantPassword">Contraseña</label>
              <input
                type="password"
                name="consultantPassword"
                required
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="fullName">Nombre completo</label>
              <input
                type="text"
                name="fullName"
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
                required
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="consultantPhoneNumber">Teléfono fijo</label>
              <input
                type="text"
                name="consultantPhoneNumber"
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="position">Posición</label>
              <input
                type="text"
                name="position"
                required
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="profession">Ocupación</label>
              <input
                type="text"
                name="profession"
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="office1">Oficina 1</label>
              <input
                type="text"
                name="office1"
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="office2">Oficina 2</label>
              <input
                type="text"
                name="office2"
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <div>
              <label htmlFor="comments">Comentarios</label>
              <input
                type="text"
                name="comments"
                onChange={(ev) => formProps.setFieldValue(ev.target.name, ev.target.value)}
              />
            </div>
            <button type="submit">Guardar</button>
            <button>
              <NavLink to="/consultants">Cancelar</NavLink>
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ConsultantForm;
