import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, Text, Image, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const Profil = ({ navigation }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const nameRegex = /^[a-zA-Z]+$/;
    //Le nom et le prénom doivent contenir uniquement des lettres.

    const handleEdit = async () => {
        console.log(firstName, lastName, email);
        if (!nameRegex.test(lastName)) {
            alert('Le nom n\'est pas valide', 'alertType');
        } else if (!nameRegex.test(firstName)) {
            alert('Le prénom n\'est pas valide', 'alertType');
        }
        else {
            // requête axios here localhost3000/edit
            try {
                const token = await AsyncStorage.getItem('token');
                let response = await axios.put('http://10.10.40.104:3000/api/auth/edit', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    firstName: firstName,
                    lastName: lastName,
                });
                if (response.status === 200) {
                    console.log("status: 200, request edit successful");
                    alert('Modification réussie', 'Votre compte à bien été édité.', 'success');
                    navigation.navigate('Chat');
                }
            } catch (error) {
                if (error.response.status === 409) {
                    alert('Email déjà utilisé', 'Veuillez utiliser une autre adresse email.', 'error');
                } else {
                    console.log(error);
                    console.log(error.response);
                    alert('Erreur lors de la modification de profil.', 'error');
                }
            }
        }
    }

    // Edit Button
    const EditButton = () => (
        <TouchableOpacity style={styles.button}
            onPress={() =>
                handleEdit()
            }>
            <Text style={styles.buttonText}>Modifier le profil</Text>
        </TouchableOpacity >
    );

    // Logout Button
    const handleLogout = async () => {
        try {
            // Clear the token from storage
            await AsyncStorage.removeItem('token');
            // Redirect the user to the Home screen
            navigation.navigate('Home');
            console.log('Déconnexion réussie, jetons supprimés !');
        } catch (error) {
            console.log(error);
        }
    }

    const LogoutButton = () => (
        <TouchableOpacity style={styles.button}
            onPress={() =>
                handleLogout()
            }>
            <Text style={styles.buttonText}>Se déconnecter</Text>
        </TouchableOpacity >
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Logo */}
            <View style={styles.logoArea}>
                <Text style={styles.companyName}>USERNAME AND IMG</Text>
                <Image style={styles.logo} source={require('../assets/NewLogo.png')} />
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
            {/* <TextInput
        style={styles.input}
        placeholder=" Email"
        placeholderTextColor="#ffff"
        keyboardType="name"
        value={email}
        onChangeText={text => setEmail(text)}
    /> */}
            <View>
                {/* Button Edit & logout */}
                <EditButton />
                <LogoutButton />
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
        width: 350,
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
export default Profil;
