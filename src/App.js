import React from 'react';
import Products from "./components/Products";
import {Route, Redirect, Switch} from "react-router-dom";
import SellDetails from "./components/SellDetails";
import Routers from "./Router/Routers";

function App() {
  return (
    <div>
        <Routers/>
        <div className="content">
            <Switch>
                <Redirect from='/sell?amount=' to="/sell" exact/>
                <Route path="/" exact component={Products} />
                <Route path="/sell" exact component={SellDetails} />
            </Switch>
        </div>
    </div>
  );
}

export default App;
