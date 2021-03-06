import React, { useState } from "react";
import storage from "../../services/storage";

export const UserContext = React.createContext([]);

const INITIAL_USER = storage.get("user");

const AuthUser = (props) => {
  const [user, setUser] = useState(INITIAL_USER);

  const storeUser = (user) => {
    setUser(user);
    storage.set("user", user);
  };

  return <UserContext.Provider value={{ user: user, storeUser }}>{props.children}</UserContext.Provider>;
};

export default AuthUser;
