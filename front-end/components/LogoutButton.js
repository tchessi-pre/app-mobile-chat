import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, BackHandler } from 'react-native';
import Styles from '../css/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import BaseUrl from '../services/BaseUrl';
import io from 'socket.io-client';
import { showMessage, hideMessage, flashMessageStyle } from 'react-native-flash-message';

const API_URL = BaseUrl;

const LogoutButton = () => {
	const navigation = useNavigation();
	const [token, setToken] = useState(null);
	const [socket, setSocket] = useState(null);
	const [showConfirmation, setShowConfirmation] = useState(false);

	useEffect(() => {
		const newSocket = io(API_URL);
		setSocket(newSocket);
		return () => {
			newSocket.disconnect();
		};
	}, []);

	// Handle the back button press
	useEffect(() => {
		const backAction = () => {
			if (showConfirmation) {
				hideMessage();
				setShowConfirmation(false); // Hide the confirmation notification
				return true; // Block the back button press
			}
			return false; // Allow the back button press
		};

		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

		return () => backHandler.remove();
	}, [showConfirmation]);

	const handleLogout = async () => {
		setShowConfirmation(true);
		showMessage({
			message: 'Confirmation',
			description: 'Êtes-vous sûr de vouloir vous déconnecter?',
			type: 'info',
			duration: 5000,
			autoHide: false,
			position: 'bottom',
			floating: true,
			style: {
				marginBottom: 30, // Add margin at the bottom of the notification
			},
			onPress: () => {
				hideMessage(); // Hide the confirmation message
			},
			// Show a Yes and No buttons for confirmation
			renderCustomContent: () => (
				<View style={styles.confirmationButtons}>
					<TouchableHighlight
						style={Styles.inscriptionBack}
						onPress={() => hideMessage()} // Simply hide the confirmation message without logging out
					>
						<Text style={{ color: "white", marginLeft: 15, marginRight: 15 }}>Non</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={[Styles.inscriptionBack, { marginRight: 10 }]}
						onPress={() => {
							handleConfirmLogout();
							hideMessage(); // Hide the confirmation message
						}}
					>
						<Text style={{ color: "white", marginLeft: 15, marginRight: 15 }}>Oui</Text>
					</TouchableHighlight>
				</View>
			),
		});
	};

	const handleConfirmLogout = async () => {
		try {
			const value = await AsyncStorage.getItem('token');
			if (value !== null) {
				setToken(value);
				await AsyncStorage.removeItem('token');
				const cleared = await AsyncStorage.getItem('token');
				if (cleared === null) {
					// Envoyer une requête PUT pour mettre à jour le statut de l'utilisateur à "offline"
					await fetch(`${API_URL}api/auth/edit`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${value}`,
						},
						body: JSON.stringify({ status: 'offline' }),
					});
					// Envoyer un événement de déconnexion au serveur de sockets
					socket.emit('disconnectUser', { token: value });
					navigation.navigate('Home');
				} else {
					console.log("Token n'a pas été effacé");
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View>
			<TouchableHighlight style={Styles.inscriptionBack} onPress={handleLogout}>
				<Text style={Styles.submitText}>Se déconnecter</Text>
			</TouchableHighlight>
		</View>
	);
};

const styles = StyleSheet.create({
	confirmationButtons: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
});

export default LogoutButton;
