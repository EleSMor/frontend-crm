import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import { createContact } from "../../api/contacts.api";

const ContactForm = ({ setOpenForm }) => {
  const history = useHistory();
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
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
            <input type="tel" required="yes" {...register("mobileNumber")} />
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
            <input required="yes" {...register("company")} />
          </div>
        </div>
        <div>
          <hr />
          <span>Dirección</span>
          <div>
            <label htmlFor="street">Calle</label>
            <div>
              <input required="yes" {...register("street")} />
            </div>
            <label htmlFor="postalCode">Código Postal</label>
            <div>
              <input required="yes" {...register("postalCode")} />
            </div>
            <label htmlFor="city">Ciudad</label>
            <div>
              <input required="yes" {...register("city")} />
            </div>
            <label htmlFor="country">País</label>
            <div>
              <input required="yes" {...register("country")} />
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
          <input type="checkbox" defaultChecked="true" {...register("communications")} />
        </div>
      </div>
      <button type="submit">Guardar</button>
      <button onClick={() => setOpenForm(false)} type="">
        Cancelar
      </button>
    </form>
  );
};

export default ContactForm;
