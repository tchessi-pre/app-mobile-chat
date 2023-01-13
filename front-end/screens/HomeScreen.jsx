import React from 'react';
import { View, Image, TouchableHighlight, StyleSheet, Text } from 'react-native';
import Styles from '../css/Styles'


const HomeScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.companyName} >TissApp</Text>
			<Image style={styles.logo} source={require('../assets/logoapp.png')} />
			<Text style={styles.connectText} >Connectez vous et discutez avec le monde entier en toute sérénité </Text>

			<View style={styles.connectBtn}>
				<Text style={styles.textPrivacy} >Terms & Privacy Policy</Text>
				<TouchableHighlight
					style={Styles.submit}
					onPress={() =>
						navigation.navigate('Connexion', { name: 'Connexion' })}
				>
					<Text style={Styles.submitText}>Connexion</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={Styles.submit}
					onPress={() =>
						navigation.navigate('Inscription', { name: 'Inscription' })}
				>
					<Text style={Styles.submitText}>Insciption</Text>
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
	},
	companyName: {
		color: '#ffffff',
		fontSize: 24,
		fontWeight: 'bold',
		fontStyle: 'italic',
		textAlign: 'center',
		marginTop: 30,
	},
	logo: {
		width: 280,
		height: 280,
		objectFit: 'cover',
	},
	connectText: {
		textAlign: 'center',
		width: 200,
		color: '#ffffff',
		fontSize: 16,
		marginLeft: 60,
		marginBottom: 0,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	connectBtn: {
		marginBottom: 40,
	},
	textPrivacy: {
		textAlign: 'center',
		color: '#ffffff',
	},
})

export default HomeScreen;
