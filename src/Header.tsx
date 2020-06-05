import React from "react";

interface HeaderProps { //O nome certo é atributo, mas também poderia ser propriedade.
    title: string; //obrigatória
    //title?: string; //opcional
};

/*FC = Function Component 
É um genérico que serve para permitir que um componente receba atributos pelo HTML.*/
const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    ); /*Cuidado: parêntesis — não chaves — no return porque não é um objeto, é só uma quebra de linha.
    Also: para colocar JavaScript no meio do HTML que está no meio do JavaScript, envolva-o com chaves.*/
}

export default Header;