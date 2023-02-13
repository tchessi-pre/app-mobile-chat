import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text, Alert } from 'react-native';
import Styles from '../css/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
	const navigation = useNavigation();


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
