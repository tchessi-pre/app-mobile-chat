import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import UploadImage from '../components/UploadImage';// import { ImagePicker, Permissions } from 'expo';
// import * as MediaLibrary from 'expo-media-library';
// import * as ImagePicker from 'expo-image-picker';


import axios from 'axios';


const Profil = ({ navigation }) => {
    // Récupération state du Pseudo et du Prénom et l'email
    const [userfirstName, setUserfirstName] = useState('');
    const [userlastName, setUserlastName] = useState('');
    const [userimageUrl, setUserImageUrl] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    // Modification state FirnstName et LastName
    const [image, setImage] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // Regex for user
    const nameRegex = /^[a-zA-Zéè'çà"-_]{1,12}$/;
    // le nom doit contenir entre 1 et 12 caractères, les caractères spéciaux autorisés sont éè'çà"-_


    const getUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            //Retrieve the userId with the token
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            // console.log(userId);
            let response = await axios.get(`http://10.10.60.123:3000/api/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setUserfirstName(response.data.user.firstName);
                setUserlastName(response.data.user.lastName);
                setUserEmail(response.data.user.email);
                setUserImageUrl(response.data.user.imageUrl);
                // console.log('SUCCESS GETONE REQUEST');
                // console.log('🪙 Token:' + token + ' Prénom:' + userfirstName + ' Nom:' + userlastName + ' Email:' + userEmail);
            }
        } catch (error) {
            // console.log('catch GET REQUEST');
            // console.log(JSON.stringify(error.response)); // Log the entire response object
        }
    };

    // Edit profil Request
    const handleEdit = async () => {
        if (firstName === "" || lastName === "") {
            alert('Les champs nom ou prénom ne peuvent pas être vide');
        } else if (!nameRegex.test(firstName)) {
            alert('Le prénom n\'est pas valide');
        } else if (!nameRegex.test(lastName)) {
            alert('Le nom n\'est pas valide');
        } else {
            // requête axios here localhost3000/edit
            try {
                const formData = new FormData();
                formData.append('imageUrl', { assets: image });
                if (image) {
                    const uri = image.uri;
                    const type = image.type;
                    const name = image.uri.split('/').pop();
                    const formData = new FormData();
                    formData.append('imageUrl', {
                        uri,
                        type,
                        name,
                    });
                }
                const token = await AsyncStorage.getItem('token');
                let response = await axios.put('http://10.10.60.123:3000/api/auth/edit', {
                    formData,
                    firstName: firstName, lastName: lastName
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    console.log('SUCCESS PUT REQUEST');
                    alert('Modification réussie !');

                    try {
                        useEffect(() => {
                            handleEdit();
                        }, [getUser()]);
                    } catch (error) {
                        console.log(error);
                    }
                }
                else {
                    console.log('error PUT REQUEST');
                }
            } catch (error) {
                console.log('Catch PUT REQUEST');
                console.log(error.AsyncStorage);
                console.log(JSON.stringify(error.response));
            }
        }
    }

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
            console.log('Déconnexion réussie, 🪙 jetons supprimés 🪙 !');
            alert('Déconnexion réussie, jetons supprimés !');
            navigation.navigate('Home');
            useEffect(() => {
                handleLogout();
            }, []);
        } catch (error) {
            console.log(error);
        }
    }

    const LogoutButton = () => (
        <TouchableOpacity style={styles.buttonLogout}
            onPress={() =>
                handleLogout()
            }>
            <Text style={styles.buttonText}>Se déconnecter</Text>
        </TouchableOpacity >
    );

    // Demande les permissions pour accéder à la caméra et à la galerie
    const getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (status !== 'granted') {
            alert('Vous devez autoriser l\'accès à la caméra et à la galerie pour utiliser cette fonctionnalité.');
        }
    };

    // Sélectionne une image depuis la galerie de l'utilisateur
    const pickImage = async () => {
        console.log('testbtry');
        try {
            console.log('test');
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(JSON.stringify(result));

            if (!result.canceled) {
                setImage(result.uri);
            }
            // await uploadImage(result.assets[0].uri);


        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
        getPermissionsAsync();

    }, []);


    // Get user Request

    return (
        <SafeAreaView style={styles.container}>
            {/* ADD IMAGE USER */}
            <View style={styles.ImageArea}>
                <UploadImage />
            </View>
            {/* ID User */}
            <View>
                <Text style={styles.nameUser}>{userfirstName} {userlastName}</Text>
                <Text style={styles.nameUser}>{userEmail}</Text>
            </View>
            {/* Firstname */}
            <TextInput
                style={styles.input}
                placeholder="Prénom"
                placeholderTextColor="#ffff"
                keyboardType="name"
                value={firstName}
                onChange={text => setFirstName(text)}
                onChangeText={text => setFirstName(text)}
            />
            {/* Lastname */}
            <TextInput
                style={styles.input}
                placeholder="Nom"
                placeholderTextColor="#ffff"
                keyboardType="name-family"
                value={lastName}
                onChange={text => setLastName(text)}
                onChangeText={text => setLastName(text)}
            />
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
        height: 30,
        margin: 10,
        borderWidth: 1,
        borderColor: "#152033",
        backgroundColor: "#152033",
        borderRadius: 4,
        color: "#ffff",
        paddingLeft: 5,
    },
    button: {
        backgroundColor: '#FF6B6B',
        padding: 10,
        margin: 10,
        width: 350,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonLogout: {
        backgroundColor: 'gray',
        padding: 10,
        margin: 10,
        width: 350,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    imageArea: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    },
    nameUser: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    image: {
        width: 80,
        height: 80,
        objectFit: 'cover',
        borderRadius: 17,
        borderWidth: 3,
        borderColor: '#7452B7',
        boxShadow: '0 0 5px black',
        backgroundColor: 'black',
        opacity: 0.8,
    },

    ImageArea: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",


    }
})
export default Profil;
