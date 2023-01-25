import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TextInput, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import Styles from '../css/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import UploadImage from '../components/UploadImage';
import axios from 'axios';

const API_URL = 'http://10.10.59.213:3000/';

const ProfilScreen = ({ navigation }) => { 
	
	const [userfirstName, setUserfirstName] = useState('');
	const [userlastName, setUserlastName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	// Get firstName, lastName and email of one user
	
	const getUser = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			//Retrieve the userId with the token
			const decodedToken = jwt_decode(token);
			const userId = decodedToken.userId;
			// console.log(userId);
			let response = await axios.get(`${API_URL}api/users/${userId}`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			if (response.status === 200) {
				setUserfirstName(response.data.user.firstName);
				setUserlastName(response.data.user.lastName);
				setUserEmail(response.data.user.email);
			}
		} catch (error) {
		}
	};
	useEffect(() => {
		getUser();
	}, []);

  // Edit user firstName and lastName
	const handleEdit = async () => {
		if (firstName == '') {
			alert('Merci de remplir le prénom');
			return;
		}
		if (lastName == '') {
			alert('Merci de remplir le nom');
			return;
		} else {
			// requête axios here localhost3000/edit
			try {
				const token = await AsyncStorage.getItem('token');
				let response = await axios.put(`${API_URL}api/auth/edit`, {
					firstName: firstName, lastName: lastName
				}, {
					headers: {
						'Authorization': `Bearer ${token}`,
					},
				});
				if (response.status === 200) {
					console.log('SUCCESS PUT REQUEST');
					alert('Modification réussie !');
					try {
						useEffect(() => {
							handleEdit();
						}, [getUser()]);
					} catch (error) {
						console.log(error);
					}
				}
				else {
					console.log('error PUT REQUEST');
				}
			} catch (error) {
				console.log('Catch PUT REQUEST');
				console.log(error.AsyncStorage);
				console.log(JSON.stringify(error.response));
			}
		}
	}

	const handleLogout = async () => {
		
		try {
			// Clear the token from storage
			await AsyncStorage.removeItem('token');
			// Redirect the user to the Home screen
			Alert.alert(
				'Déconnexion',
				'Êtes-vous sûr? Vous voulez vous déconnecter ?',
				[
					{
						text: 'Annuler',
						onPress: () => {
							return null;
						},
					},
					{
						text: 'Confirmer',
						onPress: () => {
							AsyncStorage.clear();
							navigation.navigate('Home');
						},
					},
				],
				{ cancelable: false },
			);
			navigation.navigate('Home'); 
		} catch (error) {
			console.log(error);
		}
	}
	
	return (
		<View style={styles.container}>
			<View style={Styles.logoArea}>
				<TouchableOpacity onPress={() => console.log("Upload")}
					activeOpacity={0.7} >
					<UploadImage />
					{/* <Image style={Styles.logoplus} source={require('../assets/usericonplus.png')} /> */}
				</TouchableOpacity>
				<Text style={styles.username}>{userfirstName} {userlastName}</Text>
				<Text style={styles.useremail}>{userEmail}</Text>
			</View>
			<View style={styles.textInputContainer}>
			<TextInput
				style={Styles.input}
				placeholder="Nom"
				placeholderTextColor="#F7F7FC"
				keyboardType="name"
				value={firstName}
				onChange={text => setFirstName(text)}
				onChangeText={text => setFirstName(text)}
			/>
			<TextInput
				style={Styles.input}
				placeholder="Prénom"
				placeholderTextColor="#F7F7FC"
				keyboardType="name"
				value={lastName}
				onChange={text => setLastName(text)}
				onChangeText={text => setLastName(text)}
			/>
			</View>
			<View>
				<TouchableHighlight
					style={styles.submit}
					onPress={handleEdit}
					activeOpacity={0.7}
				>
					<Text style={Styles.submitText}>Modifier</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={Styles.inscriptionBack}
					onPress={handleLogout}
				>
					<Text style={Styles.submitText}>Se déconnecter</Text>
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
	textInputContainer: {
		justifyContent: 'center',
		alignContent: 'center',
		marginTop: 50,
	},
	submit: {
		marginLeft: 20,
		marginRight: 20,
		paddingTop: 12,
		paddingBottom: 12,
		backgroundColor: '#FF6B6B',
		borderRadius: 30,
	},
	username: {
		color: '#ffffff',
		fontSize: 24,
		fontWeight: '500',
	},
	useremail: {
		color: '#ffffff',
		fontSize: 16,
		position: 'absolute',
		top: 140,
		fontWeight: '200',
	}
})

export default ProfilScreen;
