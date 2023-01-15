import React, { Component } from 'react';
import { View, Image, Button, TextInput, TouchableHighlight, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// const Separator = () => (
//     <View style={styles.separator} />
// );


class Profil extends Component {

    // const[nom, setNom] = useState('nom');
    // const[prenom, setPrenom] = useState('prenom');
    // const[pseudo, setPseudo] = useState('pseudo');

    render() {

        const Button = ({ onPress }) => (
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.buttonText}>Modifier</Text>
            </TouchableOpacity>
        );

        return (
            <View style={styles.container}>
                {/* <Text style={styles.companyName} >TissApp</Text> */}
                {/* <Image style={styles.logo} source={require('../assets/avatar.png')} /> */}
                
                <FontAwesome name="user-plus"
                    size={30}
                    color="white"
                    style={styles.logo}
                />
                <Text style={styles.companyName}>Profil</Text>
                <TextInput
                    placeholder='Nom'
                    placeholderTextColor="#fff"
                    // value='Nom'
                    // onChangeText='Nom'
                    style={styles.input}
                />

                <TextInput
                    placeholder='Prénom'
                    placeholderTextColor="#fff"
                    // value='Prénom'
                    // onChangeText='Prénom'
                    style={styles.input}
                />
                <TextInput
                    placeholder='Pseudo'
                    placeholderTextColor="#fff"
                    // value='Pseudo'
                    // onChangeText='Pseudo'
                    style={styles.input}
                />

                <Button
                    style={styles.button}
                    onPress={() => alert('Profil modifié')}
                />







                {/* <TextInput style={styles.input} placeholder="Nom" onChangeText={text => setNom(text)} value={nom} />
                <TextInput style={styles.input} placeholder="Prénom" onChangeText={text => setPrenom(text)} value={prenom} />
                <TextInput style={styles.input} placeholder="Pseudo" onChangeText={text => setPseudo(text)} value={pseudo} /> */}


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F1828',


    },


    logo: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#ffffff0',
        borderBottomWidth: StyleSheet.hairlineWidth,
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


})

export default Profil;
