import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, TouchableHighlight, Text, Image } from 'react-native';
import Styles from '../css/Styles'

const InscriptionScreen = () => {
	
	const [firstname, setFirstname] = React.useState('');
	const [lastname, setLastname] = React.useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmpassword] = useState()
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
				keyboardType="name-family" value={firstname} onChangeText={setFirstname}
			/>
			<TextInput
				style={Styles.input}
				placeholder="Prénom"
				placeholderTextColor="#ffff"
				keyboardType="name"  value={lastname} onChangeText={setLastname}
			/>
			<TextInput
				style={Styles.input}
				placeholder="Email"
				placeholderTextColor="#ffff"
				keyboardType="email-address"
				blurOnSubmit={true} value={email} onChangeText={setEmail}
			/>
			<TextInput
				style={Styles.input}
				placeholder="Mot de passe"
				placeholderTextColor="#ffff"
				keyboardType="password"
				autoComplete="password-new" value={password} onChangeText={setPassword}
			/>
			<TextInput
				style={Styles.input}
				placeholder="Confirmez votre mot de passe"
				placeholderTextColor="#ffff"
				keyboardType="password" value={confirmpassword} onChangeText={setConfirmpassword}
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
