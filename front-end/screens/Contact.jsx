import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

let timeoutId = null;
const Contact = () => {
const [search, setSearch] = useState('');
const [usersSearch, setSearchUsers] = useState([]);
const [Users, setUsers] = useState([]);

const handleSearch = async() => {
    try {
        const response = await axios.get('http://192.168.1.13:3000/api/users/', {
            params: { search: search }
        });
        if (response.status === 200) {
        setSearchUsers(response.data);
        // console.log(response.data);
        }
        } catch (error) {
        console.log(error);
        console.log(error.response);
        console.log(error.response.data);
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
            <TouchableOpacity style={styles.userContainer}>
            <Image style={styles.listItemAvatar} source={require('../assets/tiss.png')} />
            <Text style={styles.userName}>{item.firstName}</Text>
            <Text style={styles.userName}>{item.lastName}</Text>
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
    listContainer: {
    flex: 1,
    width: '90%',
    },
    listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
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
    userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
    borderRadius: 20,
    },
    listItemAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    
    },
    userName: {
    color: 'white',
    fontSize: 15,
    paddingBottom: 5,
    paddingTop: 5,
    margin: 5,
    },
});


export default Contact;