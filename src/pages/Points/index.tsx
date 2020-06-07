import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg"; //para carregar um svg de um endereço externo
import api from "../../services/api";
import * as Location from "expo-location";

import { Feather as Icon } from "@expo/vector-icons";

interface Item {
	id: number,
	title: string,
	image_url: string
}

const Points = () => {
	/*Rotas*/
	const navigation = useNavigation();
	function handleNavigateBack () {
		navigation.goBack();
	}
	function handleNavigateToDetail () {
		navigation.navigate("Detail");
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

	/*state, setState*/
	const [items, setItems] = useState<Item[]>([]); /*Sempre que armazenamos um vetor em um estado, precisamos informar o formato do vetor.*/
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [initialPosition, setinitialPosition] = useState<[number, number]>([0, 0]);

	useEffect(() => {
		api.get("items").then( response => {
			setItems(response.data);
		}, reason => {
			console.error("Failed to fetch items from our React JS API. Is the server running?");
			console.error(reason);
			setItems([{id: -1, title:"Network Error", image_url:""}])
		})
	}, []);

	useEffect( () => {
		async function loadPosition () {
			const { status } = await Location.requestPermissionsAsync(); //Diz se o usuário deu permissão.

			if (status != "granted") {
				Alert.alert("Vaaaai, nunca te pedi nada! ;)");
				return;
			}

			const location = await Location.getCurrentPositionAsync();

			const { latitude, longitude } = location.coords;
			console.log([latitude, longitude]);
			setinitialPosition([latitude, longitude]);
		}

		loadPosition();
	}, [])

	return (
		<>
			{/*Precisamos usar o fragment.*/}
			<View style={styles.container}>
				<TouchableOpacity onPress={handleNavigateBack}>
					<Icon name="arrow-left" size={20} color="#34cb79"></Icon>
				</TouchableOpacity>

				<Text style={styles.title}>Bem-vindo.</Text>
				<Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

				<View style={styles.mapContainer}>
					{/*O borderRadius só funciona para View.*/}
					<MapView 
						style={styles.map}
						loadingEnabled={initialPosition[0] == 0}
						initialRegion={{ 
							latitude: initialPosition[0],
							longitude: initialPosition[1],
							latitudeDelta: 0.020,
							longitudeDelta: 0.020
						 }}
					>
						<Marker 
							style={styles.mapMarker}
							onPress={handleNavigateToDetail}
							coordinate={{
								latitude: -23.5592411,
								longitude: -46.7318941,
							}} 
						>
							<View style={styles.mapMarkerContainer}>
								<Image 
									style={styles.mapMarkerImage} 
									source={{ uri:"https://images.unsplash.com/photo-1514425263458-109317cc1321?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" }}
								/>
								<Text style={styles.mapMarkerTitle}>Mercado</Text>
							</View>
						</Marker>
					</MapView>
				</View>
			</View>
			<View style={styles.itemsContainer}>
				<ScrollView 
					horizontal 
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 20 }}
				>
					{/*horizontal é para poder scrollar a lista; o segundo é para não aparecer a barrinha;
						contentContainerStyle é para tratar as propriedades como parte do conteúdo,
						para arrumar os cantinhos (no meu celular parece ok sem isso, tho).*/}
					{items.map( item => (
						<TouchableOpacity 
							key={String(item.id)} 
							style={[
								styles.item,
								selectedItems.includes(item.id) ? styles.selectedItem : {}
							]}
							/*Array de estilos com operador ternário no meio... :) */
							activeOpacity={0.6}
							onPress={ () => handleSelectedItem(item.id)}
						>
						{/*Sempre precisamos colocar key toda vez que mexemos com arrays no react! */}
						<SvgUri width={42} height={42} uri={item.image_url} />
						<Text style={styles.itemTitle}>{item.title}</Text>
						</TouchableOpacity>
					))}
						
				</ScrollView>
			</View>
		</>
	);
};

export default Points;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});