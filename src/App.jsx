import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthUser from "./components/Context/AuthUser";
import {
  AdsList,
  RequestsList,
  ContactsList,
  ConsultantsList,
  AdForm,
  RequestForm,
  ContactForm,
  ConsultantForm,
  Login,
} from "./pages";
import Schedule from "./components/Schedule/Schedule";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthUser>
          <Suspense fallback={<div>Cargando...</div>}>
            <Switch>
              {/* Pages */}
              <Route exact path="/" component={Login} />
              <Route exact path="/anuncios" component={AdsList} />
              <Route exact path="/peticiones" component={RequestsList} />
              <Route exact path="/contactos" component={ContactsList} />
              <Route exact path="/consultores" component={ConsultantsList} />

              {/* Create Components */}
              <Route exact path="/anuncios/crear" component={AdForm} />
              <Route exact path="/peticiones/crear" component={RequestForm} />
              <Route exact path="/contactos/crear/:name/:email/:phone" component={ContactForm} />
              <Route exact path="/consultores/crear" component={ConsultantForm} />

              {/* Sheets Components */}
              <Route exact path="/anuncios/:id" children={<AdForm />} />
              <Route exact path="/peticiones/:id" children={<RequestForm />} />
              <Route exact path="/contactos/:id" children={<ContactForm />} />
              <Route exact path="/consultores/:id" children={<ConsultantForm />} />

              <Route exact path="/agenda" children={<Schedule />} />
            </Switch>
          </Suspense>
        </AuthUser>
      </div>
    </Router>
  );
}

export default App;
