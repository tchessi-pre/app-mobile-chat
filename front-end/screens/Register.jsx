import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');


    const handleRegister = () => {
        // Faire appel à l'API de Register ici
    };

    const CustomButton = ({ }) => (
        <TouchableOpacity style={styles.button}
            onPress={() =>
                navigation.navigate('Home')}>
            <Text style={styles.buttonText}>S'inscrire</Text>
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
            {/* <Text style={styles.companyName}>Inscription</Text> */}

            {/* Firstname */}
            <TextInput
                placeholder='Prénom'
                placeholderTextColor='white'
                value={firstname}
                onChangeText={setFirstname}
                style={styles.input}
            />

            {/* Lastname */}
            <TextInput
                placeholder='Nom'
                placeholderTextColor='white'
                value={lastname}
                onChangeText={setLastname}
                style={styles.input}
            />

            {/* Pseudo */}
            <TextInput
                placeholder='Pseudo'
                placeholderTextColor='white'
                value={pseudo}
                onChangeText={setPseudo}
                style={styles.input}
            />

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
                placeholder='Mot de passe'
                placeholderTextColor='white'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            {/* Mot de passe confirm */}
            <TextInput
                placeholder='Confirmer mot de passe'
                placeholderTextColor='white'
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry
                style={styles.input}
            />


            {/* Register Button */}
            <CustomButton
                onPress={() => console.log('Button Register pressed!')}
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
    }
});

export default Register;