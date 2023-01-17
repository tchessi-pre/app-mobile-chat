import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class Chat extends Component {

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.companyName} >TissApp</Text>
                <Image style={styles.logo} source={require('../assets/logoapp.png')} />


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

    companyName: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center'

    },


    logo: {
        width: 280,
        height: 280,
        objectFit: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },


})

export default Chat;
