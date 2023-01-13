import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, TouchableHighlight, Text, Image } from 'react-native';



const InscriptionScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  const nameRegex = /^[a-zA-Z]+$/;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

  const handleSubmit = () => {
    if (!nameRegex.test(name)) {
      alert('Le nom n\'est pas valide');
    } else if (!nameRegex.test(firstName)) {
      alert('Le prénom n\'est pas valide');
    } else if (!emailRegex.test(email)) {
      alert('L\'email n\'est pas valide');
    } else if (!passwordRegex.test(password)) {
      alert('Le mot de passe n\'est pas valide');
    } else if (password !== confirmPassword) {
    	alert('Les mots de passe ne correspondent pas');
    } else {
       // requête axios here localhost3000/signup
       axios.post('http://localhost:3000/api/auth/signup', {
    name: name,
    firstName: firstName,
    email: email,
    password: password
  })
  .then(function (response) {
    console.log(response);
    navigation.navigate('home')
  })
  .catch(function (error) {
    console.log(error);

  });

        }
}

return (
    <SafeAreaView style={styles.container}>
    <View style={styles.logoArea}>
        <Text style={styles.companyName} >Inscription</Text>
        <Image style={styles.logo} source={require('../assets/minilogo.png')} />
    </View>
    <TextInput
        style={styles.input}
        placeholder="Prénom"
        placeholderTextColor="#ffff"
        keyboardType="name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
    />
    <TextInput
        style={styles.input}
        placeholder="Nom"
        placeholderTextColor="#ffff"
        keyboardType="name-family"
        value={name}
        onChangeText={text => setName(text)}
    />

	<TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ffff"
        keyboardType="name"
        value={email}
        onChangeText={text => setEmail(text)}
    />
	<TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ffff"
        keyboardType="password"
        value={password}
        onChangeText={text => setPassword(text)}
    />
	<TextInput
        style={styles.input}
        placeholder="ConfirmPassword"
        placeholderTextColor="#ffff"
        keyboardType="password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
    />

	<View>
			<TouchableHighlight
				style={styles.submit}
				onPress={() =>
                    handleSubmit()
                }>
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
		paddingBottom: 70,
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
