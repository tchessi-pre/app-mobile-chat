import React from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, TouchableHighlight, Text, Image } from 'react-native';

const InscriptionScreen = () => {
	// const [text, onChangeText] = React.useState("Useless Text");
	// // const [number, onChangeNumber] = React.useState(null);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.logoArea}>
				<Text style={styles.companyName} >TissApp</Text>
				<Image style={styles.logo} source={require('../assets/minilogo.png')} />
			</View>
			<TextInput
				style={styles.input}
				placeholder="Nom"
				placeholderTextColor="#ffff"
				keyboardType="name-family
"
			/>
			<TextInput
				style={styles.input}
				placeholder="Prénom"
				placeholderTextColor="#ffff"
				keyboardType="name"
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				placeholderTextColor="#ffff"
				keyboardType="email-address"
				blurOnSubmit={true}
			/>
			<TextInput
				style={styles.input}
				placeholder="Mot de passe"
				placeholderTextColor="#ffff"
				keyboardType="password"
			/>
			<TextInput
				style={styles.input}
				placeholder="Confirmez votre mot de passe"
				placeholderTextColor="#ffff"
				keyboardType="password"
			/>
			<View>
				<TouchableHighlight
					style={styles.submit}
					onPress={() =>
						navigation.navigate('Connexion', { name: 'Connexion' })}
				>
					<Text style={styles.submitText}>Inscription</Text>
				</TouchableHighlight>
			</View>
		</SafeAreaView>
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
		paddingTop: 40,
		paddingBottom: 20,
	},
	input: {
		height: 40,
		margin: 10,
		borderWidth: 1,
		borderColor: "#152033",
		backgroundColor: "#152033",
		borderRadius: 4,
		color: "#ffff"
	},
	submit: {
		marginLeft: 20,
		marginRight: 20,
		paddingTop: 12,
		paddingBottom: 12,
		backgroundColor: '#FF6B6B',
		borderRadius: 30,
		marginTop: 20,
	},
	submitText: {
		color: '#fff',
		textAlign: 'center',
		textTransform: 'uppercase',
	},
	logoArea: {
		flex: 2,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	companyName: {
		color: '#ffffff',
		fontSize: 24,
		fontWeight: 'bold',
		fontStyle: 'italic',
		textAlign: 'center',
	},
	logo: {
		width: 200,
		height: 200,
		objectFit: 'cover',
	},
})

export default InscriptionScreen;
