import React, { Component } from 'react';
import {View, Image, Button, TouchableHighlight, StyleSheet, Text, Alert} from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);


class Home extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.companyName} >TissApp</Text>
				<Image style={styles.logo} source={require('../assets/logoapp.png')}/>
				<Text style={styles.connectText} >Connectez vous et discutez avec le monde entier en toute sérénité </Text>
	
				<View style={styles.connectBtn}>
					<Text style={styles.textPrivacy} >Terms & Privacy Policy</Text>
					<TouchableHighlight
						style={styles.submit}
						onPress={() => Alert.alert('Inscrivez-vous!')}
					>
						<Text style={styles.submitText}>Connexion</Text>
					</TouchableHighlight>
				<Separator />
				<TouchableHighlight
						style={styles.submit}
						onPress={() => Alert.alert('Inscrivez-vous!')}
					>
						<Text style={styles.submitText}>Insciption</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		
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
	submit: {
  paddingTop: 10,
  paddingBottom: 10,
  backgroundColor: '#FF6B6B',
  borderRadius: 25,
},
submitText: {
  color: '#fff',
  textAlign: 'center',
	textTransform: 'uppercase',
}
})

export default Home;
