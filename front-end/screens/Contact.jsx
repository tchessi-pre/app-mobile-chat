import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
const [search, setSearch] = useState('');
const [users, setUsers] = useState([]);

const handleSearch = async() => {
    try {
        const response = await axios.get('http://localhost:3000/api/users', {
            params: { search: search }
        });
        setUsers(response.data);
    } catch (error) {
        console.log(error);
    }
}

const listUsers = async() => {
    try {
        const response = await axios.get('http://localhost:3000/api/users', {
            params: { search: search }
        });
        setUsers(response.data);
    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
    handleSearch();
}, []);

return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
            <TextInput 
                style={styles.searchInput} 
                placeholder="Rechercher un utilisateur" 
                onChangeText={text => setSearch(text)}
                value={search}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Rechercher</Text>
            </TouchableOpacity>
        </View>
        <FlatList
            data={users}
            keyExtractor={item => item._id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.userContainer}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userEmail}>{item.email}</Text>
                </TouchableOpacity>
            )}
        />
    </View>
); }

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
    searchButtonText: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    borderRadius: 5,
    },
    searchButton: {
    backgroundColor: '#0F1828',
    padding: 7,
    borderRadius: 5,
    },
    searchInput: {
    width: '75%',
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'white',
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    },
    listItemAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    },
    listItemName: {
    fontWeight: 'bold',
    fontSize: 16,
    },
});

export default Contact;