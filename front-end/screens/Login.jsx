import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// const token = await AsyncStorage.getItem('token'); // récupérer le token des données stockées en local (AsyncStorage) pour l'envoyer dans les headers de la requête axios
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Vérifier si l'utilisateur est connecté ou pas 

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //L'email doit contenir au moins un caractère, un @, un point, et au moins 2 caractères après le point.
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
    // le password doit contenir au moins 8 Caractères, 1 Maj, 1 Min, 1 Chiffre, 1 Caractère spécial

    const handleLogin = async()  => {
        console.log( email, password );
        if (!emailRegex.test(email)) {
        alert("L'email n'est pas valide");
        } else if (!passwordRegex.test(password)) {
        alert('Le mot de passe n\'est pas valide');
        }else {
           // requête axios here localhost3000/login
        try {
            const response = await axios.post('http://10.10.46.99:3000/api/auth/login', {
                email: email,
                password: password,
            });
            if (response.status === 201) {
                // Stocker le token
                await AsyncStorage.setItem('token', response.data.token);
                console.log('Voici le token de l\'utilisateur',response.data.token)
                alert('Connexion reussi, vous êtes connecté');
                console.log("status: 201, request login successful");
                navigation.navigate('Chat');
            } else {
                console.log("status: " + response.status + ", request unsuccessful");
                alert('Connexion refusée, vérifié vos identifants');
            }
        }catch (error) {
            // console.log(error);
            // console.log(error.response);
            alert('Erreur requête lors de la Connexion impossible.');
        }
        }
    };

    const CustomButton = () => (
        <TouchableOpacity style={styles.button}
            onPress={() =>
                    handleLogin()
                    }>
            <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity >
    );

    const RegisterNavButton = () => (
        <TouchableOpacity style={styles.buttonRegister}
            onPress={() =>
                navigation.navigate('Register')
                    }>
            <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity >
    );

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image style={styles.logo} source={require('../assets/NewLogo.png')}/>
            <Text style={styles.companyName}>Connection</Text>
            {/* Email */}
            <TextInput
                placeholder='addresse e-mail'
                placeholderTextColor='white'
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            {/* Mot de passe */}
            <TextInput
                placeholder='Mot de passe'
                placeholderTextColor='white'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            {/* Login Button */}
            <CustomButton/>
            <Text style={styles.textRegister}>Vous n'avez pas de compte ?</Text>
            <RegisterNavButton/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F1828',
    },
    logo: {
        alignSelf: 'center',
        width: 250,
        height: 100,
    },
    companyName: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    input: {
        width: 300,
        borderColor: 'none',
        padding: 10,
        margin: 10,
        backgroundColor: '#152033',
        color: 'white',
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
    textRegister: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonRegister: {
        backgroundColor: 'gray',
        padding: 10,
        margin: 10,
        width: 300,
        borderRadius: 30,
        alignItems: 'center',
    },
});

export default Login;