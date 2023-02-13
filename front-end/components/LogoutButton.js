import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, Alert } from 'react-native';
import Styles from '../css/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
	const navigation = useNavigation();
	const [token, setToken] = useState(null);

	const handleLogout = async () => {
		try {
			const value = await AsyncStorage.getItem('token');
			if (value !== null) {
				setToken(value);
				await AsyncStorage.removeItem('token');
				const cleared = await AsyncStorage.getItem('token');
				if (cleared === null) {
					Alert.alert(
						'Déconnexion',
						'Êtes-vous sûr? Vous voulez vous déconnecter ?',
						[
							{
								text: 'Annuler',
								onPress: () => {
									return;
								},
							},
							{
								text: 'Confirmer',
								onPress: () => {
									navigation.navigate('Home');
								},
							},
						],
						{ cancelable: false },
					);
				} else {
					console.log("Token n'a pas été effacé");
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		// handleEdit();
	}, [handleLogout]);
	return (
		<View>
			<TouchableHighlight
				style={Styles.inscriptionBack}
				onPress={handleLogout}
			>
				<Text style={Styles.submitText}>Se déconnecter</Text>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({})

export default LogoutButton;
