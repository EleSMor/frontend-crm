import React, { useContext, useState } from "react";
import { UserContext } from "../../components/Context/AuthUser";
import { useHistory } from "react-router-dom";
import { GvreLogo, AttomoLogo } from "../../icons";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BiKey } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import storage from "../../services/storage";
import { loginApi, logoutApi } from "../../api/auth.api";
import "./Login.scss";

const Login = () => {
  const { user, storeUser } = useContext(UserContext);
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
      storeUser("user");
      history.push("/anuncios");
      storage.set("user", user);
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = async (ev) => {
    ev.preventDefault();
    setError("");

    console.log("entra a logout");
    try {
      await logoutApi();
      storage.clear();
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    history.go(0);
  };

  return (
    <>
      {console.log(user)}
      {user.length === 0 ? (
        <form onSubmit={submitForm}>
          <div className="login">
            <div className="login__box">
              <GvreLogo className="login__box-logo" />

              <div className="login__box-form">
                <div className="login__box-field">
                  <label className="login__box-title" htmlFor="identity">
                    <MdOutlineAlternateEmail /> Email
                  </label>
                  <input className="login__box-text" type="text" name="identity" />
                </div>
                <div className="login__box-field">
                  <label className="login__box-title" htmlFor="password">
                    <BiKey /> Password
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
              <AttomoLogo className="login__footer-logo" />
            </div>
          </div>
        </form>
      ) : (
        <div className="login">
          <div className="login__box">
            <GvreLogo className="login__box-logo" />
            <div className="login__box-field">
              <div className="login__submit login__submit--logout" onClick={logout}>
                <AiOutlineLogout style={{ transform: "scale(200%)", marginRight: 20 }} />
                Desconectar
              </div>
            </div>
            <div className="login__footer">
              <span>Powered by</span>
              <AttomoLogo className="login__footer-logo" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
