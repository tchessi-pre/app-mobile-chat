import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Faire appel à l'API de login ici
    };

    const CustomButton = ({ onPress }) => (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
    );

    const BackButton = ({ onPress }) => (
        <TouchableHighlight style={styles.backButton} onPress={onPress}>
            <FontAwesome name="arrow-left" size={25} color="#FFF" />
        </TouchableHighlight>
    );

    return (
        <View style>
            {/* Back Button */}
            <BackButton
                style={styles.backButton}
                onPress={() => console.log('Button Back pressed!')}
            />

            <Text style={styles.textLoginViews}>TissApp</Text>
            <Image style={styles.logo} source={require('../assets/Logo-TissApp.png')} />
            <Text style={styles.textLoginViews}>Connexion</Text>

            {/* Email */}
            <TextInput
                placeholder='Email'
                placeholderTextColor='white'
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />

            {/* Mot de passe */}
            <TextInput
                placeholder='Password'
                placeholderTextColor='white'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            {/* Login Button */}
            <CustomButton
                onPress={() => console.log('Button login pressed!')}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    backButton: {
        width: '100%',
        height: 35,
        borderRadius: 25,
        position: 'absolute',
    },
    textLoginViews: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#FF6B6B',
        padding: 8,
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    logo: {
        width: 280,
        height: 280,
        objectFit: 'cover',
    },
    input: {
        borderColor: 'none',
        padding: 10,
        margin: 10,
        backgroundColor: '#152033',
        color: 'white',
    },
});

export default Login;