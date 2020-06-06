import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker } from "react-leaflet"
import api from "../../services/api";
import axios from "axios";

import "./styles.css";
import logo from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi"

interface Item {
	id: number;
	title: string;
	image_url: string;
}

interface IBGEUFResponse {
	sigla: string; /*Só precisamos colocar o que vamos usar. */
}

interface IBGEcityResponse {
	nome: string; /*Só precisamos colocar o que vamos usar. */
}

const CreatePoint = () => {
	/*Sempre usamos estados quando queremos guardar alguma informação sobre/para algum componente.*/
	const [items, setItems] = useState<Array<Item>>([]); 
	const [ufs, setUfs] = useState<Array<string>>([]);
	const [selectedUf, setSelectedUf] = useState("0");
	const [cities, setCities] = useState<Array<string>>([]);
	
	/*Chamada toda vez que o usuário mudar a UF selecionada.
	Precisamos dizer para o ChangeEvent que tipo de elemento causou a mudança.*/
	function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
		const uf = event.target.value;
		setSelectedUf(uf);
	}

	/*Usa a listagem de items do nosso back-end.*/
	useEffect(() => {
		api.get("items").then(response => {
			setItems(response.data);
		});
	}, []);

	/*Usa a API de localidades do IBGE para obter uma lista de UF.*/
	useEffect(() => {
		axios
			.get<IBGEUFResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
			.then(response => {
				const ufInitials = response.data.map( uf => uf.sigla);

				setUfs(ufInitials);
		});
	}, []);

	/*Usa a API de localidades do IBGE para obter a lista de municípios de um dado estado.
	Isso precisa ser feito toda vez que um estado diferente for selecionado.*/
	useEffect( () => {
		if (selectedUf === "0") { 
			return; /*Não fazer nada se estiver no 'Selecione um estado'. */
		}
		axios
			.get<IBGEcityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
			.then( response => {
				const cityNames = response.data.map( city => city.nome);
				setCities(cityNames);
			});
	}, [selectedUf]);
	/************************************ 
	(axios e conversando com a API)
	Não podemos simplesmente colocar uma chamada 
	para a api (i.e., api.get) porque isso seria chamado toda vez que o componente for alterado
	de alguma forma. Também não é legal deixar isso fora do componente, porque é algo intrínseco a ele.

	(useEffect)
	1o parâmetro: qual função executar; 
	2o parâmetro: quais variáveis para vigiar 
	(o 1o parâmetro será chamado toda vez que essas variáveis mduarem)
	Se o 2o parâmetro for [], o 1o parâmetro só será executado uma vez.
	
	(ATENÇÃO)
	Sempre que criamos um estado com arrays ou objetos (coisa mutáveis), precisamos informar
	manualmente o tipo da variável. 
	Fazemos isso passando uma inferface como parâmetro genérico de useState.
	Para acessar os atributos de uf, precisamos fazer algo parecido:  
	passar um parâmetro genérico para o axios.get, informando o tipo do valor de retorno.
	Perceba que a resposta do IBGE contém mais informações do que só a sigla, 
	mas o vlaor de retorno é uma string[].
	*******************************************/

	return (
		<div id="page-create-point">
			<header>
				<img src={logo} alt="E-coleta" />
				{/*Chaves para inserir JS.*/}

				{/*Queremos uma SPA, então, para não precisarmos recarregar a página, 
					usamos o { Link } do react-router-dom. 
					Isso faz com que o CSS, JS, etc. sejam amntidos entre as telas.*/}
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

					{/*Se fosse HTML mesmo, seria div class e label for, mas class e for são palavras reservadas, 
						então não podemos usá-las.*/}
					<div className="field">
							<label htmlFor="name">Nome da entidade</label>
							<input 
								type="text"
								name="name"
								id="name"
							/>
					</div>

					{/*O field-group é para fazer os dois field dividirem a largura.*/}
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
				
				{/*OBS 2: Usar coisas estranhas como fieldset e legend é legal porque 
					deixa o código mais semântico e mais acessível, e é um melhor uso dos recursos do HTML
					do que meter div em tudo. */}
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
							<select 
								name="estado" 
								id="estado" 
								value={selectedUf}
								onChange={handleSelectedUf}
							>
							{/*NOTA: value é desnecessário? */} 
								<option value="0">Selecione um estado.</option>
								{ufs.map( uf => (
									<option value={uf} key={uf}>{uf}</option>
								))}
							</select>
						</div>
						<div className="field">
							<label htmlFor="cidade">Cidade</label>
							<select name="cidade" id="cidade">
								<option value="0">Selecione uma cidade.</option>
								{cities.map( city => (
									<option value={city} key={city}>{city}</option>
								))}
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
						{items.map(item => (
							<li key={item.id}>
								{/*Warning: Each child in a list should have a unique key prop. 
									No React, sempre que interagimos com um array, o primeiro elemento HTML
									sempre deve ter um atributo key indicando um identificador único para o elemento.
									Isso permite que ele seja encontrado mais rapidamente quando for necessário atualizar esse elemento.
									*/}
								<img src={item.image_url} alt={item.title} />
								<span>{item.title}</span>
							</li>
						))}
						{/*As chaves mais externas são para inserir JS; 
						os parêntesis depois da flecha são para indicar um elemento multilinha;
						e o return está implícito porque a função flecha tem uma linha só (tecnicamente).*/}
					</ul>
				</fieldset>
				<button type="submit">
					Cadastrar ponto de coleta
				</button>
			</form>
		</div>
	);
}


export default CreatePoint;