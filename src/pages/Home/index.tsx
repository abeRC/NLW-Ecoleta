import React, { useState } from "react";
import { Text, View, ImageBackground, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { RectButton } from "react-native-gesture-handler"
import { Feather as Icon } from "@expo/vector-icons";

/*TODO: usar o react-native-picker-select e a API do IBGE pra fazer que nem a versão web.*/

const Home = () => {
  const navigation = useNavigation();

  function handleNavigateToPoints () {
    navigation.navigate("Points", {
      uf,
      city
    });
  } /*Enviamos para a tela dos pontos de coleta a informação do estado e cidade. */

  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {/*Essas tags de "Eu resolvo seus problemas!" sempre vão em volta de tudo.
        E é estranho assim porque o behaviour só é encessário em IOS*/}
      <ImageBackground 
        source={require("../../assets/home-background.png")} 
        style={styles.container}
        imageStyle={{ width: 274, height: 268 }}
      >
      {/*ImageBackground é tipo uma View, mas aceita um atributo de imagem.
        imageStyle é só pra imagem; style é pro container.*/}
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")}></Image>
          {/*import não funciona por algum motivo; View em branco é para o texto subir junto quando abrimos o teclado*/}
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <TextInput 
            style={styles.input}
            placeholder="Digite o estado."
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
            value={uf}
            onChangeText={setUf}
          />
          {/*É o mesmo que onChangeText={ text => {setUf(text);}}
            E o legal é que isso já te dá o texto que mudou, diferente do HTML.*/}
          <TextInput
            style={styles.input}
            placeholder="Digite a cidade."
            autoCorrect={false}
            value={city}
            onChangeText={setCity} 
          />
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text> 
                <Icon name="arrow-right" color="#fff" size={24}></Icon>
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    marginTop: 64
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});