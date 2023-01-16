import React from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, TouchableHighlight, Text, Image } from 'react-native';
import Styles from '../css/Styles'

const InscriptionScreen = () => {
	

	return (
		<View style={styles.container}>
			<View style={Styles.logoArea}>
				<Text style={Styles.companyName} >TissApp</Text>
				<Image style={Styles.minilogoIn} source={require('../assets/NewLogo.png')} />
			</View>
			<TextInput
				style={Styles.input}
				placeholder="Nom"
				placeholderTextColor="#ffff"
				keyboardType="name-family
"
			/>
			<TextInput
				style={Styles.input}
				placeholder="Prénom"
				placeholderTextColor="#ffff"
				keyboardType="name"
			/>
			<TextInput
				style={Styles.input}
				placeholder="Email"
				placeholderTextColor="#ffff"
				keyboardType="email-address"
				blurOnSubmit={true}
			/>
			<TextInput
				style={Styles.input}
				placeholder="Mot de passe"
				placeholderTextColor="#ffff"
				keyboardType="password"
				autoComplete="password-new"
			/>
			<TextInput
				style={Styles.input}
				placeholder="Confirmez votre mot de passe"
				placeholderTextColor="#ffff"
				keyboardType="password"
			/>
			<View>
				<TouchableHighlight
					style={styles.submit}
					onPress={() =>
					console.log('Inscription') }
				>
					<Text style={Styles.submitText}>S'inscrire</Text>
				</TouchableHighlight>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: '#0F1828',
		paddingLeft: 10,
		paddingRight: 10,
	},
	submit: {
		marginLeft: 20,
		marginRight: 20,
		paddingTop: 12,
		paddingBottom: 12,
		backgroundColor: '#FF6B6B',
		borderRadius: 30,
		marginBottom: 40,
	},
	
})

export default InscriptionScreen;
