import React from 'react';

import Routes from "./routes";

import './App.css'; //Para usar a stylesheet. 
//Não usamos <link> para a stylesheet e, como vamos pegar o arquivo bruto, não precisamos do from.

/*Escrever HTML (sintaxe de XML, na verdade) dentro do JavaScript funciona por causa de JSX.
Para usar TypeScript com JSX, o arquivo deve ter extensão .tsx.

IMPORTANTE 1: Todo componente (App, Header) precisa começar com maiúsculas para não conflitar com tags HTML.
IMPORTANTE 2: Você precisa importar o React em todos os arquivos, mesmo que não vá usá-lo.

FC = Function Component 
É um tipo parametrizado que serve para permitir que um componente receba atributos pelo HTML.

estados = informações guardadas pelo componente que podem ser acessadas "em tempo real".
To run: yarn batata*/


function App() {
    return (
        <Routes />
    );
}

export default App;
