import React from "react";

interface HeaderProps { //O nome certo é atributo, mas também poderia ser propriedade.
    title: string; //obrigatória
    //title?: string; //opcional
};

/*FC = Function Component 
É um genérico que serve para permitir que um componente receba atributos pelo HTML.

estados = informações guardadas pelo componente.
*/
const Header: React.FC<HeaderProps> = (props) => {
    let ctr = 1;

    var handleButtonClick = function handleButtonclick () {
        console.log(ctr++); 
        /*O contador vai atualizar, mas o h1 não. 
        Vamos usar o estado de componentes do React para consertar isso.*/
    }

    return (
        <header>
            <h1>{props.title}</h1>
            <h1>{ctr}</h1>
            <button type="button" onClick={handleButtonClick}>aumentar</button>
        </header>
    ); /*Cuidado: parêntesis — não chaves — no return porque não é um objeto, é só uma quebra de linha.
    Also: para colocar JavaScript no meio do HTML que está no meio do JavaScript, envolva-o com chaves.*/
}

export default Header;