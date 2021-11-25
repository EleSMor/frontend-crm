import React, { useContext, useState } from "react";
import { UserContext } from "../../components/Context/AuthUser";
import { loginApi } from "../../api/auth.api";
import { useHistory } from "react-router-dom";
import "./Login.scss";
import { GvreLogo, Attomo_Logo } from "../../icons";
import storage from "../../services/storage";

const Login = () => {
  const { storeUser } = useContext(UserContext);
  const history = useHistory();
  const [error, setError] = useState();

  const submitForm = async (ev) => {
    ev.preventDefault();
    setError("");

    try {
      const { identity, password } = ev.target;
      const form = {
        identity: identity.value,
        password: password.value,
      };
      const user = await loginApi(form);
      storeUser(user);
      history.push("/ads");
      storage.set("user", user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form autoComplete="off" onSubmit={submitForm}>
      <div className="login">
        <div className="login__box">
          <GvreLogo className="login__box-logo" />

          <div className="login__box-form">
            <div className="login__box-field">
              <label className="login__box-title" htmlFor="identity">
                Email o teléfono
              </label>
              <input className="login__box-text" type="text" name="identity" />
            </div>
            <div className="login__box-field">
              <label className="login__box-title" htmlFor="password">
                Contraseña
              </label>
              <input className="login__box-text" type="password" name="password" />
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>

          <button className="login__submit" type="submit">
            Acceder
          </button>
        </div>
        <div className="login__footer">
          <span>Powered by</span>
          <Attomo_Logo className="login__footer-logo" />
        </div>
      </div>
    </form>
  );
};

export default Login;
