import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList, TextInput, TouchableOpacity, Image, Pressable, TouchableHighlight } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";
import SearchBar from '../components/SearchBar';
import { Feather, Entypo } from "@expo/vector-icons";
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../services/BaseUrl';
import SearchStyle from '../css/SearchStyle'

const API_URL = BaseUrl;
let timeoutId = null;
const ChannelScreen = ({ navigation, clicked, searchPhrase, setSearchPhrase, setCLicked }) => {
	const [search, setSearch] = useState('');
	const [usersSearch, setSearchUsers] = useState([]);
	const [status, setStatus] = useState('');
	const [visible, setVisible] = useState(false);

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
		ChannelScreen;
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
				<Pressable onPress={() => setVisible(true)}>
					<Icon
						name='add'
						color='#F7F7FC'
						size={25}
						activeOpacity={0.7}
					/>
				</Pressable>
			</View>

			<View style={styles.searchBar}>
				<View
					style={
						clicked
							? SearchStyle.searchBar__clicked
							: SearchStyle.searchBar__unclicked
					}
				>
					{/* search Icon */}
					<Feather
						name="search"
						size={20}
						color="#ADB5BD"
						style={{ marginLeft: 1 }}
					/>
					{/* Input field */}
					<TextInput
						style={SearchStyle.input}
						placeholder="Recherche"
						placeholderTextColor={"#ADB5BD"}
						onChangeText={onSearchChange}
						value={search}
					/>
					{/* cross Icon, depending on whether the search bar is clicked or not */}
					{clicked && (
						<Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
							setSearchPhrase("")
						}} />
					)}
				</View>
				{/* cancel button, depending on whether the search bar is clicked or not */}
				{clicked && (
					<View>
						<Button
							title="Cancel"
							onPress={() => {
								Keyboard.dismiss();
								setCLicked(false);
							}}
						></Button>
					</View>
				)}
			</View>
			<FlatList
				data={usersSearch.users}
				onEndReachedThreshold={0.5}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.containeContact} activeOpacity={.7} onPress={() =>
						console.log('Redirect to chatscreen')}>
						<View>
							{item.imageUrl ? (
								<TouchableOpacity activeOpacity={.5} onPress={() =>
									navigation.navigate('Profil')}>
									<Image style={styles.profilImage} source={{ uri: item.imageUrl }} />
								</TouchableOpacity>
							) : (
								<View style={styles.initialContainer}>
									<Text style={styles.initialText}>{item.firstName.charAt(0)}{item.lastName.charAt(0)}</Text>
								</View>
							)}
							<Badge
								status={item.status === 'online' ? 'success' : 'error'}
								containerStyle={{ position: 'absolute', top: 0, right: 10 }}
							/>
						</View>
						<View style={styles.profilName} >
							<Text style={styles.fullName} >{item.firstName} {item.lastName}</Text>
							<Text style={styles.statut}>{item.status === 'online' ? 'En ligne' : 'Hors ligne'}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
			{visible ? <Modal setVisible={setVisible} /> : ""}
			<Footer />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: '#0F1828'
	},
	containeContact: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#0F1828',
		width: "90%",
		paddingBottom: 10,
		marginLeft: 10,
		paddingTop: 10,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ffffff15'
	},
	top: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
		marginTop: 50,
		marginBottom: 5,
		paddingHorizontal: 8,
	},
	textTop: {
		color: '#ffffff',
		fontSize: 18,
	},
	status: {
		position: 'absolute',
		top: 2, left: 50,
		textAlign: 'center',
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
	profilImage: {
		width: 60,
		height: 60,
		borderRadius: 16,
	},
	profilName: {
		marginLeft: 20,
	},
	initialContainer: {
		width: 60,
		height: 60,
		backgroundColor: ' #ccc',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
		backgroundColor: '#FF6B6B',
		borderRadius: 16,
	},
	initialText: {
		textTransform: 'uppercase',
		color: '#ffffff',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
	},
		fullName: {
			color: "#ffffff",
			marginBottom: 5,
			fontSize: 16
		},
		statut: {
			color: "#adb5bd",
			fontSize: 10
		},
	})

export default ChannelScreen;
