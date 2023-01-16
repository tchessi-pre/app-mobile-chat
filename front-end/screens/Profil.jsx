import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, Text, Image, TouchableOpacity} from 'react-native';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const Profil = ({navigation}) => {
    // Récupération state du Pseudo et du Prénom et l'email
const [userfirstName, setUserfirstName] = useState([]);
const [userlastName, setUserlastName] = useState([]);
const [userEmail, setUserEmail] = useState([]);
     // Modification state FirnstName et LastName
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
    // Regex for user
const nameRegex = /^[a-zA-Z]+$/;
    //Le nom et le prénom doivent contenir uniquement des lettres.

// Get user Request
const getUser = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        let response = await axios.get('http://10.10.40.104:3000/api/users/${userId}', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if(response.status === 200) {
            setUserfirstName(response.data.firstName);
            setUserlastName(response.data.lastName);
            setUserEmail(response.data.email);
            console.log(response.data);
            console.log(response.data.firstName + response.data.lastName + response.data.email);
        }
    } catch (error) {
        console.error(error);
        console.log(error.response);
    }
};

useEffect(() => {
    getUser();
}, []);

// Edit profil Request
const handleEdit = async()  => {
    if(firstName === "" || lastName === ""){
        alert('Les champs nom ou prénom ne peuvent pas être vide');
    }else if(!nameRegex.test(lastName)){
        alert('Le nom n\'est pas valide');
    }else if (!nameRegex.test(firstName)){
        alert('Le prénom n\'est pas valide');
    }else {
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

        if(response.status === 200) {
            console.log('success');
            alert('success PUT REQUEST');
        }
        else{
            console.log('error');

        }
    }catch (error) {
        console.log(error);
    }
}
};

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
        alert('Déconnexion réussie, jetons supprimés !');
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
    <View>
    <Text style={styles.nameUser}>Test{userfirstName} {userlastName}
    {userEmail}</Text>
    </View>
    {/* ADD IMAGE USER */}
    <View>
        <TouchableOpacity style={styles.imageArea}>
        <Image
            source={require('../assets/avatar.png')}
            style={styles.image}
        />
        </TouchableOpacity>
    </View>
    {/* Firstname */}
    <TextInput
        style={styles.input}
        placeholder=" Prénom"
        placeholderTextColor="#ffff"
        keyboardType="name"
        value={firstName}
        onChange={text => setFirstName(text)}
        onChangeText={text => setFirstName(text)}
    />
    {/* Lastname */}
    <TextInput
        style={styles.input}
        placeholder=" Lastname"
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
	imageArea: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	nameUser: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold',
		fontStyle: 'italic',
		textAlign: 'center',
	},
	imahe: {
		width: 300,
		height: 200,
		objectFit: 'cover',
	},
})
export default Profil;
