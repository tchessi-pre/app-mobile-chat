import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableHighlight } from 'react-native';
import Styles from '../css/Styles';
import Channel from './ChannelScreen';
const ConnexionScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={Styles.logoArea}>
				<Text style={Styles.companyName} >TissApp</Text>
				<Image style={Styles.minilogo} source={require('../assets/NewLogo.png')} />
			</View>
			<TextInput
				style={Styles.input}
				placeholder="Email"
				placeholderTextColor="#ffff"
				keyboardType="email-address"
			/>
			<TextInput
				style={Styles.input}
				placeholder="Mot de passe"
				placeholderTextColor="#ffff"
				keyboardType="password"
			/>

			<View>
				<TouchableHighlight
					style={Styles.submit}
					onPress={() =>
						navigation.navigate('Channel')}
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
