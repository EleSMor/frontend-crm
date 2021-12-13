import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthUser from "./components/Context/AuthUser";
import { GeneralRequest, AdsById, RequestsById } from "./components";
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

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthUser>
          <Suspense fallback={<div>Cargando...</div>}>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/ads" component={AdsList} />
              <Route exact path="/requests" component={RequestsList} />
              <Route exact path="/contacts" component={ContactsList} />
              <Route exact path="/consultants" component={ConsultantsList} />

              <Route exact path="/ads/create" component={AdForm} />
              <Route exact path="/requests/create" component={RequestForm} />
              <Route exact path="/contacts/create" component={ContactForm} />
              <Route exact path="/consultants/create" component={ConsultantForm} />

              <Route exact path="/ads/:id" children={<AdForm />} />
              <Route exact path="/consultants/:id" children={<ConsultantForm />} />
              <Route exact path="/requests/:id" children={<GeneralRequest />} />
              <Route exact path="/ads/matching/:id" children={<AdsById />} />
              <Route exact path="/requests/matching/:id" children={<RequestsById />} />
            </Switch>
          </Suspense>
        </AuthUser>
      </div>
    </Router>
  );
}

export default App;
