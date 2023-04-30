import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import Styles from '../css/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import UploadImage from '../components/UploadImage';
import LogoutButton from '../components/LogoutButton'
import axios from 'axios';
import BaseUrl from '../services/BaseUrl';

const API_URL = BaseUrl;

const ProfilScreen = ({ navigation }) => {

	const [userfirstName, setUserfirstName] = useState('');
	const [userlastName, setUserlastName] = useState('');
	const [userEmail, setUserEmail] = useState('');

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	const getUser = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			const decodedToken = jwt_decode(token);
			const userId = decodedToken.userId;
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

	const handleEdit = async () => {
		if (!isEditing) {
			setIsEditing(true);
			return;
		}

		if (firstName == '') {
			alert('Merci de remplir le prénom');
			return;
		}
		if (lastName == '') {
			alert('Merci de remplir le nom');
			return;
		} else {
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

		setIsEditing(false);
	}

	return (
		<View style={styles.container}>
			<View style={Styles.logoArea}>

				<UploadImage />

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
					onChangeText={text => setFirstName(text)}
					editable={isEditing}
				/>
				<TextInput
					style={Styles.input}
					placeholder="Prénom"
					placeholderTextColor="#F7F7FC"
					keyboardType="name"
					value={lastName}
					onChangeText={text => setLastName(text)}
					editable={isEditing}
				/>
			</View>
			<View>
				<TouchableHighlight
					style={styles.submit}
					onPress={handleEdit}
					activeOpacity={0.7}
				>
					<Text style={Styles.submitText}>{isEditing ? 'Enregistrer' : 'Modifier'}</Text>
				</TouchableHighlight>
				<LogoutButton />
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

