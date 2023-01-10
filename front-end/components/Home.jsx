import React, { Component } from 'react';
import { View, Image, Button, TouchableHighlight, StyleSheet, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Separator = () => (
	<View style={styles.separator} />
);



class Home extends Component {
	render() {
		return (
			// <SafeAreaView>
			<View style={styles.container}>
				<Text style={styles.companyName} >TissApp</Text>
				<Image style={styles.logo} source={require('../assets/logoapp.png')} />
				<Text style={styles.connectText} >Connectez vous et discutez avec le monde entier en toute sérénité </Text>

				<View style={styles.connectBtn}>
					<Text style={styles.textPrivacy} >Terms & Privacy Policy</Text>
					<Button
						title="Connexion"
						color="#FF6B6B"
						onPress={() => Alert.alert('Connectez-vous!')}
					/>
					<Separator />
					<Button
						style={styles.btn}
						title="Inscription"
						color="#FF6B6B"
						onPress={() => Alert.alert('Inscrivez-vous!')}
					/>
				</View>
			</View>
			// </SafeAreaView>
		);
	}
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
		height: 280,
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
