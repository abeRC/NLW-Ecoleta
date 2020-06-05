import React from "react";
import { Route, BrowserRouter } from "react-router-dom"; //Há vários Router, mas o BrowserRouter é o mais comum para navegação com navegadores.

import Home from "./pages/Home"; //O React procura por index.tsx por padrão.
import CreatePoint from "./pages/CreatePoint";

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" />
        </BrowserRouter>
    );
}

export default Routes;