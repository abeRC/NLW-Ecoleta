import React from 'react';
import './App.css';
import Header from "./Header";

/*Escrever HTML (sintaxe de XML, na verdade) dentro do JavaScript funciona por causa de JSX.
Para usar TypeScript com JSX, o arquivo deve ter extensão .tsx.

IMPORTANTE 1: Todo componente (App, Header) precisa começar com maiúsculas para não conflitar com tags HTML.
IMPORTANTE 2: Você precisa importar o React em todos os arquivos, mesmo que não vá usá-lo.

To run: yarn batata*/


function App() {
    return (
        <div>
            <Header title="Hello world"/>
            <h1>Conteúdo da Aplicação</h1>
        </div>
    );
}

export default App;
