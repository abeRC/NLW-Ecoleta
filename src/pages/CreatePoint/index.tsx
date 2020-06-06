import React from "react";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker } from "react-leaflet"

import "./styles.css";
import logo from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi"

const CreatePoint = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="E-coleta" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home.
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br /> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                            <label htmlFor="name">Nome da entidade</label>
                            <input 
                                type="text"
                                name="name"
                                id="name"
                            />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name">WhatsApp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>

                        <div className="field">
                        <label htmlFor="name">E-mail</label>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                        />
                        </div>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa.</span>
                    </legend>
                    
                    <Map center={[-23.5592411,-46.7318941]} zoom={17} height={400} >
                        <TileLayer 
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-23.5592411,-46.7318941]} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="estado">Estado (UF)</label>
                            <select name="estado" id="estado">
                                <option value="0">Selecione um estado.</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="cidade">Cidade</label>
                            <select name="cidade" id="cidade">
                                <option value="0">Selecione uma cidade.</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo.</span>
                    </legend>

                    <ul className="items-grid">
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="text" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li className="selected">
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="text" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="text" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="text" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="text" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="text" />
                            <span>Óleo de cozinha</span>
                        </li>
                    </ul>
                </fieldset>
                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
}
/**********************************************************
OBS 1: Se fosse HTML mesmo, seria div class e label for, mas class e for são palavras reservadas, 
então não podemos usá-las.
OBS 2: Usar coisas estranhas como fieldset e legend é legal porque 
deixa o código mais semântico e mais acessível, e é um melhor uso dos recursos do HTML
do que meter div em tudo.
OBS 3: O field-group é para fazer os dois field dividirem a largura.
**********************************************************/

export default CreatePoint;