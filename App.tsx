import React from 'react';
import { StatusBar } from "react-native";
import { AppLoading } from "expo";

import Routes from "./src/routes";

import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu";
/*Olha na internet pra ver como instalar expo-google-fonts 
e react-navigation (e @react-navigation/stack) */

/*Metro Bundler = programa que vigia modificações no código e manda um bundle
 (JS minificado) para ser utilizado em dispositivos móveis.

 Diferenças entre React native e React JS:
	React native não usa JSX; todas as tags são tags do React native.
	Por exemplo, View é parecido com um div, mas pode substituir qualquer caixa ou container do HTML
	(section, main, aside, header, footer); Text substitui span, h1, p, strong.
	Um motivo para isso é que as tags do React native não têm valor semântico.
	
	Não fazemos estilização com class/className e id ou com CSS.
	Tudo é feito com o atributo style, que recebe um objeto com a estilização em JS
	(porém a sintaxe das propriedades é a mesma).

	Tudo que tem hífen no CSS vira maiúsculas de Java aqui. (background-color --> backgroundColor)

	Tudo tem, por padrão, display: flex.

	Não tem CSS mesmo. Sem herança de estilos, sem cascata de estilos.

	ATENÇÃO: É proibido fazer:
	function App(){
		return (
			<StatusBar />
			<Home />
		);
	}
	Você não pode retornar dois componentes soltos; ou você coloca uma View em volta 
	(que produz um efeito) OU você usa uma tag fragment, 
	representada por <>, que é uma tag sem conteúdo.

	Nenhum texto pode ficar solto; todo texto precisa estar dentro de uma tag Text.
	Se der erro mencionando isso, provavelmente há algum ; ou > soltos pelo código.

	Sem suporte a svg pro padrão; precisa do react-native-svg.

	Lembra do negócio de ter que colocar um atributo key na 1a tag dentro de um loop/iteração de HTML/JSX?
	Então, no React native precisa ser uma string também..


	Há alguns bugzinhos aqui e ali, então, por exemplo, 
	talvez você tenha que ir no localhost:19002 e apagar o dispositivo.
	*/

function App() {
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
		Ubuntu_700Bold
	});

	if (!fontsLoaded) { /*Enquanto as fontes ainda não carregaram. */
		return <AppLoading />
	}

	return (
		<>
			<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
			<Routes />
		</>
	);
}

export default App;
