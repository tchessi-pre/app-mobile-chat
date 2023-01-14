import React, { Component } from 'react';
import { View, Image, Button, TouchableHighlight, StyleSheet, Text, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

const Separator = () => (
	<View style={styles.separator} />
);

const Home = ({ navigation }) => {
	return (
		// <SafeAreaView>
		<View style={styles.container}>
			<Text style={styles.companyName} >TissApp</Text>
			<Image style={styles.logo} source={require('../assets/logoapp.png')} />
			<Text style={styles.connectText} >Connectez vous et discutez avec le monde entier en toute sérénité </Text>

			<View style={styles.connectBtn}>
				<Text style={styles.textPrivacy} >Terms & Privacy Policy</Text>
				<TouchableHighlight
					style={styles.button}

					onPress={() => navigation.navigate('Login', { name: 'Login' })}>
					<Text style={styles.buttonText}>Connexion</Text>
				</TouchableHighlight>

				<Separator />
				<TouchableHighlight
					style={styles.button}
					onPress={() => navigation.navigate('Register', { name: 'Register' })}>
					<Text style={styles.buttonText}>Inscription</Text>
				</TouchableHighlight>

			</View>
		</View>
		// </SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0F1828',


	},
	companyName: {
		color: '#ffffff',
		fontSize: 24,
		fontWeight: 'bold',
		fontStyle: 'italic',
		textAlign: 'center'

	},
	logo: {
		width: 280,
		height: 180,
		objectFit: 'cover',
		justifyContent: 'center',
		alignItems: 'center',
	},
	connectBtn: {
		padding: 1
	},
	connectText: {
		textAlign: 'center',
		width: 280,
		color: '#ffffff',
		fontSize: 16,
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 40,

	},

	buttonText: {
		color: 'white',
	},


	button: {
		backgroundColor: '#FF6B6B',
		padding: 10,
		margin: 10,
		width: 300,
		borderRadius: 30,
		alignItems: 'center',
	},

	textPrivacy: {
		textAlign: 'center',
		color: '#ffffff',
		paddingBottom: 17
	},
	separator: {
		marginVertical: 8,
		borderBottomColor: '#ffffff0',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},

})

export default Home;
