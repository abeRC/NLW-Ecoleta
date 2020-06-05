import React from 'react';
import ReactDOM from 'react-dom'; //Para integrar o react com a DOM (estrutura lógica de um documento HTML).
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); //Renderizar o componente App dentro da id root.
