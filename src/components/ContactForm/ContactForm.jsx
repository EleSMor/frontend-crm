import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory, NavLink } from "react-router-dom";
import { getAllContacts, createContact } from "../../api/contacts.api";
import { Navbar, SubHeader } from "../../components";
import { UserContext } from "../../components/Context/AuthUser";

const ContactForm = () => {
  const [error, setError] = useState();
  const [contacts, setContacts] = useState([]);

  const history = useHistory();
  const { user } = useContext(UserContext);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    getAllContacts().then((res) => setContacts(res));
  }, []);

  const onSubmit = async (data) => {
    setError("");
    try {
      await createContact(data);
      history.push("/contacts");
    } catch (err) {
      console.log("Error en el register: ", err);
      setError(error);
    }
  };

  return (
    <>
      {!user && history.push("/")}
      <Navbar />
      <SubHeader title="Contactos" list={contacts} location="/contacts/create"/>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div>
          <div>
            <label htmlFor="fullName">Nombre completo</label>
            <div>
              <input required="yes" {...register("fullName")} />
            </div>
          </div>
          <div>
            <span>Etiqueta</span>
            <div>
              <input type="checkbox" value="Cliente" {...register("tag")} />
              <label htmlFor="tag">Cliente</label>
              <input type="checkbox" value="Propietario" {...register("tag")} />
              <label htmlFor="tag">Propietario</label>
            </div>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <div>
              <input type="email" required="yes" {...register("email")} />
            </div>
          </div>
          <div>
            <label htmlFor="mobileNumber">Teléfono móvil</label>
            <div>
              <input type="tel" {...register("mobileNumber")} />
            </div>
          </div>
          <div>
            <label htmlFor="phoneNumber">Teléfono fijo</label>
            <div>
              <input {...register("phoneNumber")} />
            </div>
          </div>
          <div>
            <label htmlFor="company">Empresa</label>
            <div>
              <input {...register("company")} />
            </div>
          </div>
          <div>
            <hr />
            <span>Dirección</span>
            <div>
              <label htmlFor="street">Calle</label>
              <div>
                <input {...register("street")} />
              </div>
              <label htmlFor="postalCode">Código Postal</label>
              <div>
                <input {...register("postalCode")} />
              </div>
              <label htmlFor="city">Ciudad</label>
              <div>
                <input {...register("city")} />
              </div>
              <label htmlFor="country">País</label>
              <div>
                <input {...register("country")} />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="comments">Comentarios</label>
            <div>
              <textarea {...register("comments")} />
            </div>
          </div>
          <div>
            <label htmlFor="communications">No recibir emails automáticos</label>
            <input type="checkbox" defaultChecked="false" {...register("communications")} />
          </div>
        </div>
        <button type="submit">Guardar</button>
        <button type="">
          <NavLink to="/contacts">Cancelar</NavLink>
        </button>
      </form>
    </>
  );
};

export default ContactForm;
