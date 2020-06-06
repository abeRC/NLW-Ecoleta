import React from 'react';
import { StatusBar } from "react-native";
import { AppLoading } from "expo";

import Home from "./src/pages/Home";

import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu";


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
			<Home />
		</>
	);
}

export default App;
