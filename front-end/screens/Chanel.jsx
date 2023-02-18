import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import axios from 'axios';
import BaseUrl from '../services/BaseUrl';
const API_URL = BaseUrl

let timeoutId = null;
const Chanel = () => {
    const [search, setSearch] = useState('');

    const onSearchChange = (text) => {
        setSearch(text);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
        }, 200);
    };

    // Formatage de la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "EEEE d MMMM yyyy 'à' HH:mm:ss", { locale: frLocale });
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher un groupe..."
                    placeholderTextColor={'white'}
                    color={'white'}
                    onChangeText={""}
                    value={search}
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    // container
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F1828',
    },

    searchInput: {
        width: '95%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        boxShadow: '0 0 5px black',
        padding: 8,
        borderRadius: 10,
        backgroundColor: 'gray',
        opacity: 0.5,
        margin: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
    },
});

export default Chanel;