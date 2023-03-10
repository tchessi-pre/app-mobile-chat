import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import axios from 'axios';
import BaseUrl from '../services/BaseUrl';
const API_URL = BaseUrl;

const Chanel = () => {
    const [search, setSearch] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [newGroupTitle, setNewGroupTitle] = useState('');
    const [groups, setGroups] = useState([
    ]);

    const onSearchChange = (text) => {
        setSearch(text);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "EEEE d MMMM yyyy 'à' HH:mm:ss", { locale: frLocale });
    };
    const addNewGroup = () => {
    };
    const toggleInput = () => {
        setShowInput(!showInput);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher un channel..."
                    placeholderTextColor={'white'}
                    color={'white'}
                    onChangeText={onSearchChange}
                    value={search}
                />
                <TouchableOpacity style={styles.addGroupBtn} onPress={toggleInput}>
                    <Text style={styles.addButtonText}>{showInput ? '-' : '+'}</Text>
                </TouchableOpacity>
            </View>
            {showInput && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.groupInput}
                        placeholder="Entrez un titre pour le nouveau groupe"
                        placeholderTextColor={'white'}
                        color={'white'}
                        value={newGroupTitle}
                    />
                    <TouchableOpacity style={styles.addNewGroupBtn} onPress={addNewGroup}>
                        <Text style={styles.addNewGroupBtnText}>Créer</Text>
                    </TouchableOpacity>
                </View>
            )}
            <FlatList
                style={styles.listContainer}
                data={groups}
                onEndReachedThreshold={0.5}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.test}>
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                )}
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
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#0F1828',
    },
    searchBar: {
        width: '70%',
        height: 40,
        borderWidth: 1,
        borderColor: 'white',
        padding: 5,
        marginTop: 15,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: 'gray',
        color: 'white',
    },
    searchInput: {
        width: '90%',
        height: 35,
        borderWidth: 1,
        borderColor: 'black',
        boxShadow: '0 0 5px black',
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'gray',
        opacity: 0.5,
        margin: 5,
        color: 'white',
        fontSize: 12,
    },

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#0F1828',
    },
    groupInput: {
        flex: 1,
        height: 35,
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'gray',
        opacity: 0.5,
        color: 'white',
        fontSize: 11,
    },
    addGroupBtn: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: '#FF6B6B',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    addButtonText: {
        color: 'white',
    },
    addNewGroupBtn: {
        width: 50,
        height: 30,
        borderRadius: 10,
        backgroundColor: '#FF6B6B',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    addNewGroupBtnText: {
        fontSize: 11,
        color: 'white',
        fontWeight: 'bold',
        padding: 5,
        borderRadius: 10,
    },
});

export default Chanel;