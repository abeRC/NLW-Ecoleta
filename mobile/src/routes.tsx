import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
{/*Navegação por stack: páginas continuam carregadas em uma pilha
	 e costumam ser ligadas por botões de voltar */}
	 
import Home from "./pages/Home";
import Points from "./pages/Points";
import Detail from "./pages/Detail";

/*É este objeto que vai fazer o roteamento da nossa aplicação*/
const AppStack = createStackNavigator(); 

const Routes = () => {
	return (
		<NavigationContainer>
			{/*É tipo o BrowserRouter do Express.*/}
			<AppStack.Navigator 
				headerMode="none"
				screenOptions={{ 
					cardStyle: {
						backgroundColor: "#f0f0f5"
					}
				}}
			>
			{/*headerMode é uma barrinha de navegação que vem por padrão;
				chaves para inserir JS e chaves para indicar objeto.
				cardStyle é para colocar uma propriedade para todas as telas;
				component é o componente a ser exibido na tela quando a rota estiver ativa. */}
				<AppStack.Screen name="Home" component={Home} />
				<AppStack.Screen name="Points" component={Points} />
				<AppStack.Screen name="Detail" component={Detail} />
			</AppStack.Navigator>
		</NavigationContainer>
	);
}

export default Routes;