import React from "react";
import { Route, BrowserRouter } from "react-router-dom"; //Há vários Router, mas o BrowserRouter é o mais comum para navegação com navegadores.

import Home from "./pages/Home"; //O React procura por index.tsx por padrão.
import CreatePoint from "./pages/CreatePoint";

/*O react-router-dom trata os caminhos de um jeito estranho: quando o usuário pede um recurso,
o react-router-dom devolve (um após o outro) todos os recursos que COMEÇAM com o recurso que
o usuário pediu. Então se ele pede a rota localhost:3333/create-point
são retornados os recursos '/' e 'create-point' (olhe no cantinho da tela).
Para isso o exact={true}, que pdoeria ser só exact.*/
const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home}  path="/" exact={true} />
            <Route component={CreatePoint}  path="/create-point" />
        </BrowserRouter>
    );
}

export default Routes;