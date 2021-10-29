import React from "react";
import { useForm } from "react-hook-form";

const ConsultantForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
      <div>
        <label htmlFor="email">Email</label>
        <input {...register("email")} />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input {...register("password")} />
      </div>
      <div>
        <label htmlFor="avatar">Avatar</label>
        <input type="file" {...register("avatar")} />
      </div>
      <div>
        <label htmlFor="businessUnitLogo">Logo unidad de negocio</label>
        <input type="file" {...register("businessUnitLogo")} />
      </div>
      <div>
        <label htmlFor="fullName">Nombre completo</label>
        <input {...register("fullName")} />
      </div>
      <div>
        <label htmlFor="mobileNumber">Teléfono móvil</label>
        <input {...register("mobileNumber")} />
      </div>
      <div>
        <label htmlFor="phoneNumber">Teléfono fijo</label>
        <input {...register("phoneNumber")} />
      </div>
      <div>
        <label htmlFor="position">Posición</label>
        <input {...register("position")} />
      </div>
      <div>
        <label htmlFor="ocupation">Ocupación</label>
        <input {...register("ocupation")} />
      </div>
      <div>
        <label htmlFor="office1">Oficina 1</label>
        <input {...register("office1")} />
      </div>
      <div>
        <label htmlFor="office2">Oficina 2</label>
        <input {...register("office2")} />
      </div>
      <div>
        <label htmlFor="comments">Comentarios</label>
        <input {...register("comments")} />
      </div>
      <button type="submit">Guardar</button>
      <button type="">Cancelar</button>
    </form>
  );
};

export default ConsultantForm;
