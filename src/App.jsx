import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components";
import {
  AdsList,
  RequestsList,
  ContactsList,
  ConsultantsList,
  AdForm,
  RequestForm,
  ContactForm,
  ConsultantForm,
} from "./pages";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App"></div>
      <Navbar />
      <Suspense fallback={<div>Cargando...</div>}>
        <Switch>
          <Route exact path="/ads" component={AdsList} />
          <Route exact path="/requests" component={RequestsList} />
          <Route exact path="/contacts" component={ContactsList} />
          <Route exact path="/consultants" component={ConsultantsList} />
          <Route exact path="/ads/create" component={AdForm} />
          <Route exact path="/requests/create" component={RequestForm} />
          <Route exact path="/contacts/create" component={ContactForm} />
          <Route exact path="/consultants/create" component={ConsultantForm} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
