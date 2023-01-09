import React, { Component } from 'react';
import { View, Image, Button, TouchableHighlight, StyleSheet, Text, Alert } from 'react-native';

const Separator = () => (
    <View style={styles.separator} />
);


class Profil extends Component {
    render() {
        return (
            <View style={styles.container}>
                {/* <Text style={styles.companyName} >TissApp</Text> */}
                <Image style={styles.logo} source={require('../assets/avatar.png')} />

                <View style={styles.connectBtn}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',

    },

    logo: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        // objectFit: 'cover',
        marginBottom: 300,

    },


    separator: {
        marginVertical: 8,
        borderBottomColor: '#ffffff0',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

})

export default Profil;
