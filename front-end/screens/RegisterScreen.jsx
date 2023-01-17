import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, TouchableHighlight, Text, Image } from 'react-native';
import Styles from '../css/Styles'
import { apiClient } from '../services/apiClient';

const RegisterScreen = ({navigation}) => {

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	
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
				keyboardType="name-family"
				value={firstName}
				onChangeText={text => setFirstName(text)}
			/>
			<TextInput
				style={Styles.input}
				placeholder="Prénom"
				placeholderTextColor="#ffff"
				keyboardType="name"
				value={lastName}
				onChangeText={text => setLastName(text)}
			/>
			<TextInput
				style={Styles.input}
				placeholder="Email"
				placeholderTextColor="#ffff"
				keyboardType="email-address"
				blurOnSubmit={true}
				value={email}
				onChangeText={text => setEmail(text)}
			/>
			<TextInput
				style={Styles.input}
				placeholder="Mot de passe"
				placeholderTextColor="#ffff"
				keyboardType="password"
				autoComplete="password-new"
				value={password}
				onChangeText={text => setPassword(text)}
				secureTextEntry
			/>
			<TextInput
				style={Styles.input}
				placeholder="Confirmez votre mot de passe"
				placeholderTextColor="#ffff"
				keyboardType="password"
				value={confirmPassword}
				onChangeText={text => setConfirmPassword(text)}
				secureTextEntry
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
	},
	
})

export default RegisterScreen ;
