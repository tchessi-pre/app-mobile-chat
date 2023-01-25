import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity, Image, Button, TouchableHighlight } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";
import SearchBar from '../components/SearchBar';
import Profil from '../components/Profil';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = 'http://10.10.59.213:3000/';

const ChannelScreen = ({ navigation }) => {
	const [search, setSearch] = useState('');
	const [usersSearch, setSearchUsers] = useState([]);
	const [status, setStatus] = useState('');
	const handleSearch = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			const response = await axios.get(`${API_URL}api/users/`, {
				params: { search: search },
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			if (response.status === 200) {
				setSearchUsers(response.data);
				setStatus(response.data.status);

			}
		} catch (error) {
		
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
			<View style={styles.top}>
				<Text style={styles.textTop}>Utilisateurs</Text>
				<Avatar
					rounded
					source={require('../assets/monprofil.png')}
					onPress={() => console.log("Works!")}
					activeOpacity={0.7}
				/>
			</View>

			<View style={styles.searchBar}>
				<SearchBar onChangeText={onSearchChange}
					value={search} />
			</View>		
				<FlatList
					data={usersSearch.users}
					onEndReachedThreshold={0.5}
					keyExtractor={item => item.id.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity style={styles.containeContact} activeOpacity={.7} onPress={() =>
							console.log('Redirect to chatscreen')}>
							<View style={styles.separator}></View>
							<View>
								<TouchableOpacity activeOpacity={.5} onPress={() =>
									navigation.navigate('Profil')} >
									<Image style={styles.profilImage} source={item.imageUrl || require('../assets/monprofil.png')} />
								</TouchableOpacity>
								<Text
									style={styles.status}
								>{status === 'online' ? '🟢' : '🔴'}</Text>
							</View>
							<View style={styles.profilName} >
								<Text style={styles.fullName} >{item.firstName}  {item.lastName}</Text>
								<Text style={styles.statut}>{status === 'online' ? 'En ligne' : 'Hors ligne'}</Text>
							</View>
						</TouchableOpacity>
					)}
				/>
			
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: '#0F1828',
		paddingHorizontal: 25,
	},
	containeContact: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#0F1828',
		width: 300,
		marginBottom: 1,
		paddingBottom: 10,
		paddingTop: 10,
		borderWidth: 1,
		borderBottomColor: '#20252d'
	},
	top: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
		marginTop: 40,

	},
	textTop: {
		color: '#ffffff',
		fontSize: 18,
	},
	status: {
		position: 'absolute', 
		top: -1, left: 45, 
		borderWidth: 2, 
		borderRadius: 100, 
		width: 22, height: 22, 
		borderColor: '#F7F7FC', 
		textAlign: 'center'
	},
	profil__button: {
		width: 30,
		height: 30,
		borderRadius: 30,
		fontSize: 16,
		backgroundColor: '#152033',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center'
	},
	textbtn__profil: {
		color: '#ffffff',
		fontSize: 18,
		textAlign: 'center',
	},
	separator: {
		height: 1,
		backgroundColor: "#20252d",
		marginTop: 10,
		marginBottom: 10,
	},
	profilImage: {
		width: 60,
		height: 60,
		borderRadius: 16,
	},
	profilName: {
		marginLeft: 20,
	},
	fullName: {
		color: "#ffffff",
		marginBottom: 5,
		fontSize: 16
	},
	statut: {
		color: "#adb5bd",
		fontSize: 10
	}
})

export default ChannelScreen;
