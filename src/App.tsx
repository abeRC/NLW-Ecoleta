import React, { useState } from 'react';
import Home from "./pages/home/"; //O React procura por index.tsx por padrão.
import './App.css'; //Para usar a stylesheet. 
//Não usamos <link> para isso e, como vamos pegar o arquivo bruto, não rpecisamos do from.

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
        <Home />
    );
}

export default App;
