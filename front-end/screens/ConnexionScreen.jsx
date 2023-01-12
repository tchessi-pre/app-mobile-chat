import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, TouchableHighlight   } from 'react-native';
import { FontAwesome  } from '@expo/vector-icons';

const ConnexionScreen = ({navigation}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
    // Faire appel à l'API de login ici
	};

	const CustomButton = () => (
		<TouchableHighlight
			style={styles.submit}
			onPress={() =>
			navigation.navigate('Home')}>	
			<Text style={styles.submitText}>Se connecter</Text>
		</TouchableHighlight>
	);

	return (

	<View style={styles.container}>
		{/* Connexion views */}
			<Text style={styles.textLoginViews}>Connexion</Text>
			<Text style={styles.textLoginViews}>TissApp</Text>
			<Image style={styles.logo} source={require('../assets/Logo-TissApp.png')}/>
     	{/* Email */}
		<TextInput
        placeholder='Email'
        placeholderTextColor= 'white'
        value={email}
        onChangeText={setEmail}
        style={styles.input}
		/>

      	{/* Mot de passe */}
		<TextInput
        placeholder='Password'
        placeholderTextColor= 'white'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
		/>
      	{/* Login Button */}
		<CustomButton/>

    </View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: '#0F1828',
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 40,
		paddingBottom: 20,
	},
	backButton: {
    width: '100%',
    height: 35,
    borderRadius: 25,
    position: 'absolute',
	},
	textLoginViews: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
	fontWeight: 'bold',
	},
	submit: {
		marginLeft: 20,
		marginRight: 20,
		paddingTop: 12,
		paddingBottom: 12,
		backgroundColor: '#FF6B6B',
		borderRadius: 30,
		marginTop: 20,
	},
	submitText: {
		color: '#fff',
		textAlign: 'center',
		textTransform: 'uppercase',
	},
    logo: {
		width: 280,
		height: 280,
		objectFit: 'cover',
	},
	input: {
    borderColor: 'none',
    padding: 10,
    margin: 10,
    backgroundColor: '#152033',
    color: 'white',	
	},
});

export default ConnexionScreen;