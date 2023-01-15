import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

import React, { useState, useEffect } from 'react';
import axios from 'axios';


let timeoutId = null;
const Contact = () => {
const [search, setSearch] = useState('');
const [usersSearch, setSearchUsers] = useState([]);
const [status, setStatus] = useState('');

const handleSearch = async() => {
    try {
        const response = await axios.get('http://192.168.1.13:3000/api/users/', {
            params: { search: search }
        });
        if (response.status === 200) {
        setSearchUsers(response.data);
        setStatus(response.data.status);
        // console.log(response.data);
        console.log('requete get all users, 200 ok !');
        }
        } catch (error) {
        console.log('requete get all users, error !');
        // console.log(error);
        // console.log(error.response);
        // console.log(error.response.data);
    }
}
useEffect(() => {
    handleSearch();
}, []);

const onSearchChange = (text) => {
    setSearch(text);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
    handleSearch(text);
    }, 200);
};

return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
        <TextInput 
            style={styles.searchInput} 
            placeholder="Rechercher un utilisateur" 
            onChangeText={onSearchChange}
            value={search}
        />
    </View>
        <FlatList
            style={styles.listContainer}
            data={usersSearch.users}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
            <TouchableOpacity style={styles.userContainer} onPress={() => alert('User selected')}>

            <Image style={styles.listItemAvatar} source={item.imageUrl || require('../assets/avatar.png')} />
            <Text style={styles.userName}>{item.firstName}  {item.lastName}</Text>
            {/* mettre le status hors ligne ou en ligne */}
            <Text style={styles.userStatus}>Status: {status === 'online' ? 'En ligne' : 'Hors ligne'}</Text> 
            <Text style={styles.userCreatedAt}>{item.createdAt}</Text>
            </TouchableOpacity>
            )}
        />
    </View>
); 
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F1828',
    },
    searchBar: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    },
    searchButton: {
    backgroundColor: '#0F1828',
    padding: 7,
    borderRadius: 5,
    },
    searchInput: {
    width: '95%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    boxShadow: '0 0 5px black',
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'gray',
    margin: 10,
    },
    searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    },
    listContainer: {
        width: '100%',
        },
    userContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        margin: 10,
        padding: 10,
    },
    listItemAvatar: {
        position: 'relative',
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,
        borderWidth: 1.5,
        borderColor: '#7452B7',
    },
    userName: {
        color: 'white',
        marginRight: 10,
        fontSize: 16,
        flex: 1,
        alignSelf: 'flex-start',
        marginTop: 5,
    },
    userStatus: {
        color: 'white',
        marginRight: 10,
        fontSize: 5,
        alignSelf: 'flex-end',
        marginTop: 5,
        marginRight: 10,
    },
    userCreatedAt: {
        color: 'white',
        fontSize: 5,
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 5,
    },
});

export default Contact;