<<<<<<< HEAD
import React, { Component } from 'react';
import {View, Image, Button, StyleSheet, Text, Alert} from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);


class HomeScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.companyName} >TissApp</Text>
				<Image style={styles.logo} source={require('../assets/logoapp.png')}/>
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
		);
	}
}

=======
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


>>>>>>> tch-front
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
<<<<<<< HEAD
		
	},
	companyName: {
		color: '#ffffff',
		fontSize: 24, 
		fontWeight: 'bold',
		fontStyle: 'italic',
		textAlign: 'center'

=======
		backgroundColor: '#0F1828',
	},
	companyName: {
		color: '#ffffff',
		fontSize: 24,
		fontWeight: 'bold',
		fontStyle: 'italic',
		textAlign: 'center',
		marginTop: 30,
>>>>>>> tch-front
	},
	logo: {
		width: 280,
		height: 280,
		objectFit: 'cover',
	},
<<<<<<< HEAD
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
		
=======
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
>>>>>>> tch-front
	},
	textPrivacy: {
		textAlign: 'center',
		color: '#ffffff',
<<<<<<< HEAD
		paddingBottom: 17
	},
	separator: {
    marginVertical: 8,
    borderBottomColor: '#ffffff0',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
	btn: {
		borderRadius: 10,
	}
=======
	},
>>>>>>> tch-front
})

export default HomeScreen;
