import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, Image, TextInput, TouchableHighlight } from 'react-native';

const ConnexionScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logoArea}>
				<Text style={styles.companyName} >TissApp</Text>
				<Image style={styles.logo} source={require('../assets/minilogo.png')} />
			</View>
			<TextInput
				style={styles.input}
				placeholder="Email"
				placeholderTextColor="#ffff"
				keyboardType="email-address"
			/>
			<TextInput
				style={styles.input}
				placeholder="Mot de passe"
				placeholderTextColor="#ffff"
				keyboardType="password"
			/>
			
			<View>
				<TouchableHighlight
					style={styles.submit}
					onPress={() =>
						navigation.navigate('Connexion', { name: 'Connexion' })}
				>
					<Text style={styles.submitText}>Se connecter</Text>
				</TouchableHighlight>
			</View>
		</SafeAreaView>
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
		paddingTop: 20,
		paddingBottom: 20,
	},
	logoArea: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	companyName: {
		color: '#ffffff',
		fontSize: 24,
		fontWeight: 'bold',
		fontStyle: 'italic',
		textAlign: 'center',
	},
	logo: {
		width: 200,
		height: 200,
		objectFit: 'cover',
	},
	input: {
		height: 40,
		margin: 10,
		borderWidth: 1,
		borderColor: "#152033",
		backgroundColor: "#152033",
		borderRadius: 4,
		color: "#ffff",
		paddingLeft: 10,
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
	
})

export default ConnexionScreen;
