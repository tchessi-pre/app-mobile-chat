import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableHighlight } from 'react-native';
import Styles from '../css/Styles'

const ConnexionScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={Styles.logoArea}>
				<Text style={Styles.companyName} >TissApp</Text>
				<Image style={Styles.minilogo} source={require('../assets/minilogo.png')} />
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
						navigation.navigate('Channel', { name: 'ChannelScreen' })}
				>
					<Text style={Styles.submitText}>Se connecter</Text>
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
