import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { Map, TileLayer, Marker } from "react-leaflet"
import { LeafletMouseEvent } from "leaflet";
import api from "../../services/api";
import axios from "axios";
import Dropzone from "../../components/Dropzone";

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
	const [selectedCity, setSelectedCity] = useState("0");

	// eslint-disable-next-line
	const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
	const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

	const [selectedItems, setSelectedItems] = useState<number[]>([]);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		whatsapp: ""
	});
	const [selectedFile, setSelectedFile] = useState<File>();

	const history = useHistory(); /*Para redirecionar o usuário para a tela inicial. */
	
	/*Chamada toda vez que o usuário mudar a UF selecionada.
	Precisamos dizer para o ChangeEvent que tipo de elemento causou a mudança.*/
	function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
		const uf = event.target.value;
		setSelectedUf(uf);
	}
	/*Chamada toda vez que o usuário mudar a cidade selecionada.
	Precisamos dizer para o ChangeEvent que tipo de elemento causou a mudança.*/
	function handleSelectedCity (event: ChangeEvent<HTMLSelectElement>) {
		const city = event.target.value;
		setSelectedCity(city);
	}

	/*Atualiza o marcador do mapa.*/
	function handleMapClick (event: LeafletMouseEvent) {
		setSelectedPosition([event.latlng.lat, event.latlng.lng]);
	}

	/*Atualiza o registro da informação que o usuário digitou. */
	function handleInputChange (event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setFormData( { ...formData, [name]: value }); 
		/*Olha a magia: a gente não pode substituir o objeto inteiro quando formos atualizar uma informação, 
		então abrimos o formData, mudando o que precisa ser mudado (essa informação vem do event.target).
		(E essa informação vai como uma variável em uma propriedade. Uau!)*/
	}

	/*Atualiza o item selecionado. */
	function handleSelectedItem (id: number) {
		const alreadySelectedThis = selectedItems.includes(id);

		if (alreadySelectedThis) {
			const filteredItems = selectedItems.filter( item => (item !== id) );
			setSelectedItems(filteredItems);

		} else {
			setSelectedItems([ ...selectedItems, id ]); //spread operator 2 op pls nerf
			/*Olha como o spread operator permite que agente reutilize o vetor! */
		}
	}

	/*Faz a submissão dos dados.*/
	async function handleSubmit (event: FormEvent) {
		event.preventDefault();
		/*O padrão para forms HTML é enviar o usuário para outra tela. 
		Isto impede que a página recarregue.*/

		const { name, email, whatsapp } = formData;
		const estado = selectedUf;
		const cidade = selectedCity;
		const [latitude, longitude] = selectedPosition;
		const items = selectedItems;

		const data = new FormData();
			/*PROTIP: alt+shift+I pra ativar cursor tentáculo.
				Daí você pode mexer/selecionar as coisas com ctrl/shift. */
			data.append('name', name);
			data.append('email', email);
			data.append('whatsapp', whatsapp);
			data.append('estado', estado);
			data.append('cidade', cidade);
			data.append('latitude', String(latitude));
			data.append('longitude', String(longitude));
			data.append('items', items.join(","));
			
			if (selectedFile) {
				data.append('image', selectedFile);
			}

		await api.post("points", data);
		alert("Ponto de coleta criado!");
		history.push("/");
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

				setUfs(ufInitials.sort());
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

	/*Usa a API do navegador para acessar a localização atual do usuário.*/
	useEffect( () => {
		navigator.geolocation.getCurrentPosition( position => {
			const { latitude, longitude } = position.coords;

			setInitialPosition([latitude, longitude]);
			console.log(position);
		}, () =>{
			console.info("secure? "+window.isSecureContext);
			console.error("Failed to load current position. Is the server configured to use HTTPS?");});
	}, []);
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
				{/*Chaves são para inserir JS.*/}

				{/*Queremos uma SPA, então, para não precisarmos recarregar a página, 
					usamos o { Link } do react-router-dom. 
					Isso faz com que o CSS, JS, etc. sejam amntidos entre as telas.*/}
				<Link to="/">
					<FiArrowLeft />
					Voltar para home.
				</Link>
			</header>

			<form onSubmit={handleSubmit} >
				{/*Há várias formas de fazer a submissão, então é melhor deixar aqui.*/}
				<h1>Cadastro do <br /> ponto de coleta</h1>

				<Dropzone onFileUploaded={setSelectedFile} />
				{/*Perceba que onFileUploaded é algo que nóis mesmos definimos. 
				Na verdade estamos passando uma função a esse componente através de um atributo.*/}

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
								onChange={handleInputChange}
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
								onChange={handleInputChange}
							/>
						</div>

						<div className="field">
						<label htmlFor="name">E-mail</label>
						<input 
							type="email"
							name="email"
							id="email"
							onChange={handleInputChange}
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
					{/*Fallback coordinates: [-23.5592411,-46.7318941] */}
					<Map center={[-23.5592411,-46.7318941]} zoom={17} height={400} onClick={handleMapClick} >
						<TileLayer 
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker position={selectedPosition} />
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
							{/*NOTA: value é realmente necessário? */} 
								<option value="0">Selecione um estado.</option>
								{ufs.map( uf => (
									<option value={uf} key={uf}>{uf}</option>
								))}
							</select>
						</div>
						<div className="field">
							<label htmlFor="cidade">Cidade</label>
							<select 
								name="cidade" 
								id="cidade"
								value={selectedCity}
								onChange={handleSelectedCity}
							>
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
						{items.map( item => (
							<li 
							key={item.id} 
							onClick={ () => handleSelectedItem(item.id) }
							className={selectedItems.includes(item.id) ? "selected" : ""} >
								{/*Warning: Each child in a list should have a unique key prop. 
									No React, sempre que interagimos com um array, o primeiro elemento HTML
									sempre deve ter um atributo key indicando um identificador único para o elemento.
									Isso permite que ele seja encontrado mais rapidamente quando for necessário atualizar esse elemento.

									Outra coisa: não dá para fazer só onClick=handleSelectedItem(item.id) porque o
									OnClick espera um objeto de função e ele vai pirar completamente se você tentar isso.
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