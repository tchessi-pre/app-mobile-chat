import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import Styles from '../css/Styles'

const ProfilScreen = () => {
	return (
		<View style={styles.container}>
			<View style={Styles.logoArea}>
				<TouchableOpacity onPress={() => console.log("Upload")}
					activeOpacity={0.7} >
					<Image style={Styles.minilogo} source={require('../assets/usericonplus.png')} />
				</TouchableOpacity>
			</View>
			<TextInput
				style={Styles.input}
				placeholder="Nom"
				placeholderTextColor="#ffff"
				keyboardType="name-family"
			/>
			<TextInput
				style={Styles.input}
				placeholder="Prénom"
				placeholderTextColor="#ffff"
				keyboardType="name"
			/>
			<TextInput
				style={Styles.input}
				placeholder="exemple@exemple.fr"
				placeholderTextColor="#ffff"
				keyboardType="email-address"
				blurOnSubmit={true}
			/>
			<View>
				<TouchableHighlight
					style={styles.submit}
					onPress={() => console.log("Save")}
					activeOpacity={0.7}
				>
					<Text style={Styles.submitText}>Enrégistrer</Text>
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
	submit: {
		marginLeft: 20,
		marginRight: 20,
		paddingTop: 12,
		paddingBottom: 12,
		backgroundColor: '#FF6B6B',
		borderRadius: 30,
		marginTop: 40,
		marginBottom: 40,
	},
})

export default ProfilScreen;
