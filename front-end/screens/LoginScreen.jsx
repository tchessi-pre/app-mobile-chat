import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableHighlight } from 'react-native';
import Styles from '../css/Styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
const API_URL = 'http://10.10.46.33:3000/';

const ConnexionScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
	
		if (email != '' && password != ''){
			// requête axios here localhost3000/login
			try {
				const response = await axios.post(`${API_URL}api/auth/login`, {
					email: email,
					password: password,
				});
				if (response.status === 201) {
					// Stocker le token
					await AsyncStorage.setItem('token', response.data.token);
					console.log('Voici le token de l\'utilisateur', response.data.token)
					// alert('Connexion reussi, vous êtes connecté');
					console.log("status: 201, request login successful");
					navigation.navigate('Disc.');
				} else {
					console.log("status: " + response.status + ", request unsuccessful");
					alert('Connexion refusée, vérifié vos identifants');
				}
			} catch (error) {
				console.log(error);
				console.log(error.response);
				alert('Erreur requête lors de la Connexion impossible.');
			}
		}
	};

	return (
		<View style={styles.container}>
			<View style={Styles.logoArea}>
				<Text style={Styles.companyName} >TissApp</Text>
				<Image style={Styles.minilogo} source={require('../assets/NewLogo.png')} />
			</View>
			<TextInput
				style={Styles.input}
				placeholder="Email"
				placeholderTextColor="#9a9797"
				keyboardType="email-address"
				onChangeText={(value) => setEmail(value)}
			/>
			<TextInput
				style={Styles.input}
				placeholder="Mot de passe"
				placeholderTextColor="#9a9797"
				keyboardType="password"
				secureTextEntry
				onChangeText={(value) => setPassword(value)}
			/>

			<View>
				<TouchableHighlight
					style={Styles.submit}
					onPress={handleLogin}
				>
					<Text style={Styles.submitText}>Se connecter</Text>
				</TouchableHighlight>
				<Text style={Styles.undotext}>Vous n'avez pas de compte ?</Text>
				<TouchableHighlight
					style={Styles.inscriptionBack}
					onPress={() =>
						navigation.navigate('Register', { name: 'RegisterScreen' })}
				>
					<Text style={Styles.submitText}>S'inscrire</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: '#0F1828',
		paddingLeft: 10,
		paddingRight: 10,
	},

})

export default ConnexionScreen;
