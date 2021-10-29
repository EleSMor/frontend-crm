import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components";
import { ConsultantForm, ConsultantsList } from "./pages";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App"></div>
      <Navbar />
      <Suspense fallback={<div>Cargando...</div>}>
        <Switch>
        <Route exact path="/consultants/register"  component={ConsultantForm}/>
        <Route exact path="/consultants"  component={ConsultantsList}/>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
