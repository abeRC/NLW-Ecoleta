import React from 'react';
import ReactDOM from 'react-dom'; //Para integrar o react com a DOM (estrutura lógica de um documento HTML).
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
); 
/*Renderiza o componente App dentro da id root.
<App/> é o mesmo que <App></App> para tags void.
Veja https://stackoverflow.com/questions/3558119/are-non-void-self-closing-tags-valid-in-html5
e https://stackoverflow.com/questions/7366344/do-we-still-need-end-slashes-in-html5
*/
