import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ConnexionScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Connexion</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: '#0F1828',
	},
})

export default ConnexionScreen;
