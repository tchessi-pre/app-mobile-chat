import React from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, TouchableHighlight, Text, Image } from 'react-native';
import Styles from '../css/Styles'

const InscriptionScreen = () => {
	

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logoArea}>
				<Text style={Styles.companyName} >TissApp</Text>
				<Image style={Styles.logo} source={require('../assets/minilogo.png')} />
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
					style={Styles.submit}
					onPress={() =>
						navigation.navigate('Inscription', { name: 'Inscription' })}
				>
					<Text style={Styles.submitText}>S'inscrire</Text>
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
		paddingTop: 40,
		paddingBottom: 20,
	},
	
	logoArea: {
		flex: 2,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	
})

export default InscriptionScreen;
