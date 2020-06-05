import React from "react";
import logo from "../../assets/logo.svg"; /*Todas as importações são por JS. */
import "./styles.css";
import { FiLogIn } from "react-icons/fi";

const Home = () => {
    return (
        <div id="page-home">
        <div className="content">
                <header>
                    <img src={logo} alt="E-coleta"/>
                </header>

                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                
                    <a href="/cadastro">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre um ponto de coleta.</strong>
                    </a>


                </main>
        </div>
        </div>
    ); /*Se fosse HTML mesmo, seria div class, mas class é uma palavra reservada, então não podemos usar isso. */
}

export default Home;