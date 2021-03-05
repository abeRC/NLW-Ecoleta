import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg"; /*Todas as importações são por JS. */
import "./styles.css";
import { FiLogIn } from "react-icons/fi";


const Home = () => {
	return (
		<div id="page-home">
		{/*Se fosse HTML mesmo, seria div class, mas class é uma palavra reservada, 
		então não podemos usar isso.*/}
		<div className="content">
				<header>
					<img src={logo} alt="E-coleta"/>
				</header>

				<main>
					<h1>Seu marketplace de coleta de resíduos.</h1>
					<p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
					
					{/*Queremos uma SPA, então, para não precisarmos recarregar a página, 
						usamos o { Link } do react-router-dom. 
						Isso faz com que o CSS, JS, etc. sejam amntidos entre as telas.*/}
					<Link to="/create-point">
						<span>
							<FiLogIn />
						</span>
						<strong>Cadastre um ponto de coleta.</strong>
					</Link>


				</main>
		</div>
		</div>
	); 
}


export default Home;