import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Faire appel à l'API de login ici
    };

    const CustomButton = ({ }) => (
        <TouchableOpacity style={styles.button}
            onPress={() =>
                navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity >


    );

    // const BackButton = ({ onPress }) => (
    //     <TouchableHighlight style={styles.backButton} onPress={onPress}>
    //         <FontAwesome name="arrow-left" size={25} color="#FFF" />
    //     </TouchableHighlight>
    // );

    return (
        <View style={styles.container}>
            {/* <BackButton onPress={() => navigation.goBack()} /> */}

            <Text style={styles.companyName}>TissApp</Text>
            <Image style={styles.logo} source={require('../assets/tiss.png')} />
            {/* <Text style={styles.companyName}>Connexion</Text> */}

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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F1828',
    },

    logo: {
        alignSelf: 'center',
        // marginBottom: 20,
        width: 200,
        height: 200,
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
    }
});

export default Login;