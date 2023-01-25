import React, { useState, createRef } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableHighlight } from 'react-native';
import Styles from '../css/Styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from '../components/Loader';
import axios from 'axios';
const API_URL = 'http://10.10.59.213:3000/';

const ConnexionScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [errortext, setErrortext] = useState('');

	const passwordInputRef = createRef();

	const handleLogin = async () => {
	
		setErrortext('');
		if (email == '') {
			alert('Merci de remplir l\'email');
			return;
		}
		if (password == '') {
			alert('Merci de remplir le mot de passe');
			return;
		}
		setLoading(true);
		axios.post(`${API_URL}api/auth/login`, {
			email,
			password
		})
			.then((response) => {
				//Hide Loader
				setLoading(false);
				console.log(response);
				// If server response message same as Data Matched
				if (response.status === 201) {
					AsyncStorage.setItem('token', response.data.token);
					console.log(response.data.token);
					navigation.navigate('Chat');
				} else {
					setErrortext(response.msg);
					console.log('Please check your email id or password');
				}
			})
			.catch((error) => {
				//Hide Loader
				setLoading(false);
				console.error(error);
			});
		
	};

	return (
		<View style={styles.container}>
			<Loader loading={loading} />
			<View style={Styles.logoArea}>
				<Text style={Styles.companyName} >TissApp</Text>
				<Image style={Styles.minilogo} source={require('../assets/NewLogo.png')} />
			</View>
			<TextInput
				style={Styles.input}
				placeholder="Email"
				placeholderTextColor="#F7F7FC"
				keyboardType="email-address"
				onChangeText={(value) => setEmail(value)}
			/>
			<TextInput
				style={Styles.input}
				placeholder="Mot de passe"
				placeholderTextColor="#F7F7FC"
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
