import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, TouchableHighlight, Text, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';

const InscriptionScreen = ({navigation}) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  const nameRegex = /^[a-zA-Z]+$/;
  //Le nom et le prénom doivent contenir uniquement des lettres.
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  //L'email doit contenir au moins un caractère, un @, un point, et au moins 2 caractères après le point.
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
  // le password doit contenir au moins 8 Caractères, 1 Maj, 1 Min, 1 Chiffre, 1 Caractère spécial

  const handleSubmit = async()  => {
    console.log(firstName, lastName, email, password, confirmPassword);
    if (!nameRegex.test(lastName)) {
      alert('Le nom n\'est pas valide', 'alertType');
    } else if (!nameRegex.test(firstName)) {
      alert('Le prénom n\'est pas valide', 'alertType');
    } else if (!emailRegex.test(email)) {
      alert('L\'email n\'est pas valide', 'alertType');
    } else if (!passwordRegex.test(password)) {
      alert('Le mot de passe n\'est pas valide', 'alertType');
    } else if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas', 'alertType');
    } else {
       // requête axios here localhost3000/signup
      try {
        const response = await axios.post('http://192.168.1.13:3000/api/auth/signup', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });
        if (response.status === 201) {
          console.log("status: 201, request successful");
          alert('Inscription réussie', 'Votre compte à bien été crée.', 'success');
          navigation.navigate('Chat');
        }
        }catch (error) {
        if(error.response.status === 409){
          alert('Email déjà utilisé', 'Veuillez utiliser une autre adresse email.', 'error');
        } else {
            console.log(error);
            console.log(error.response);
            alert('Erreur lors de l\'inscription.', 'error');
        }
    }
    }
  }

  const CustomButton = () => (
    <TouchableOpacity style={styles.button}
        onPress={() =>
                handleSubmit()
                }>
        <Text style={styles.buttonText}>Inscription</Text>
    </TouchableOpacity >
);

return (
    <SafeAreaView style={styles.container}>
    {/* Logo */}
    <View style={styles.logoArea}>
        <Text style={styles.companyName} >Inscription</Text>
        <Image style={styles.logo} source={require('../assets/minilogo.png')} />
    </View>
    {/* Firstname */}
    <TextInput
        style={styles.input}
        placeholder=" Prénom"
        placeholderTextColor="#ffff"
        keyboardType="name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
    />
    {/* Lastname */}
    <TextInput
        style={styles.input}
        placeholder=" Lastname"
        placeholderTextColor="#ffff"
        keyboardType="name-family"
        value={lastName}
        onChangeText={text => setLastName(text)}
    />
    {/* Email */}
    <TextInput
        style={styles.input}
        placeholder=" Email"
        placeholderTextColor="#ffff"
        keyboardType="name"
        value={email}
        onChangeText={text => setEmail(text)}
    />
    {/* Password */}
    <TextInput
        style={styles.input}
        placeholder=" Password"
        placeholderTextColor="#ffff"
        keyboardType="password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
    />
    {/* C-Password */}
    <TextInput
        style={styles.input}
        placeholder=" ConfirmPassword"
        placeholderTextColor="#ffff"
        keyboardType="password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
    />
	<View>
    {/* Button Register */}
    <CustomButton />
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
  button: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    margin: 10,
    width: 300,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
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
