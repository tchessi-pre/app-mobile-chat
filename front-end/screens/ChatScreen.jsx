import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


import Styles from '../css/Styles';

import axios from 'axios';
const API_URL = 'http://10.10.59.213:3000/';

const ChatScreen = () => {
	const navigation = useNavigation();
	const [image, setImage] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [newImageUrl, setNewImageUrl] = useState('');
	const [currentDate, setCurrentDate] = useState('');

	const fetchMessages = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			const response = await axios.get(`${API_URL}api/posts/`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			if (response.status === 200) {
				setMessages(response.data.posts);
			} else {
				console.log('error');
			}
		} catch (error) {
	
		}
	};

	useEffect(() => {
		var date = new Date().getDate(); //Current Date
		var month = new Date().getMonth() + 1; //Current Month
		var year = new Date().getFullYear(); //Current Year
		var hours = new Date().getHours(); //Current Hours
		var min = new Date().getMinutes(); //Current Minutes
		var sec = new Date().getSeconds(); //Current Seconds
		setCurrentDate(
			date + '/' + month + '/' + year
			+ ' ' + hours + ':' + min 
		);
		fetchMessages();
	}, []);


	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
	const handleSendMessage = async () => {
		if (newMessage === '') {
			alert('Vous ne pouvez pas envoyez un message vide !')
		} else {
			try {
				const data = {};
				if (newMessage) data.content = newMessage;
				if (newImageUrl) data.imageUrl = newImageUrl;
				const token = await AsyncStorage.getItem('token');
				const response = await axios.post(`${API_URL}api/posts`, data, {
					headers: {
						'Authorization': `Bearer ${token}`,
					},
				});
				if (response.status === 201) {
					fetchMessages();
					setNewMessage('');
					setNewImageUrl('');
					console.log('request POST message, success !');
				}
				else {
					console.log('error');
					console.log(response.status);
				}
			} catch (error) {
				console.error(error);
				console.log(error.response);
				console.log('request POST message, error !');
			}
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.chat_head}>
				<View>
					<Text style={styles.title}>Chat</Text>
				</View>
				<View style={styles.right_icons}>
					<Icon
						name='search'
						type='evilicon'
						color='#ffffff'
						size={35}
						onPress={() => console.log("Send")}
						activeOpacity={0.7}
					/>
					<Icon
						name='navicon'
						type='evilicon'
						color='#ffffff'
						size={35}
						onPress={() => console.log("Send")}
						activeOpacity={0.7}
					/>
				</View>
			</View>
			<FlatList
				style={styles.chatContainer}
				inverted={true}
				onEndReached={fetchMessages}
				onEndReachedThreshold={0.5}
				data={messages}
				keyExtractor={item => `${item.id}-${item.createdAt}`}
				renderItem={({ item }) =>
					<ScrollView>
					<View style={styles.msgContainer}>
						
							{image && <Image source={{ uri: image }} style={styles.imageContent} />}
							<View style={styles.messageTextContainer}>
								<Text style={styles.contentText}>{item.content}</Text>
							</View>
							<Text style={styles.messageUsername}>{item.User.firstName} {item.User.lastName}</Text>
						<Text style={styles.date}>{currentDate}</Text>
						<Text style={styles.separator}></Text>
					</View>
					</ScrollView>
				}
			/>
			{/* <View style={styles.msgContainer}>
				{image && <Image source={{ uri: image }} style={styles.imageContent} />}
				<Text style={styles.contentText}>Look at how chocho sleep in my arms!</Text>
				<Text style={styles.date}>18.06</Text>
			</View> */}
			<View style={styles.Bottomcontainer}>
				<Icon
					name='add'
					color='#adb5bd'
					size={25}
					onPress={pickImage}
					activeOpacity={0.7}
				/>
				<TextInput
					style={styles.chatInput}
					placeholder="Message..."
					placeholderTextColor="#adb5bd"
					editable
					multiline
					numberOfLines={4}
					maxLength={40}
					value={newMessage}
					onChangeText={setNewMessage}
				/>
				<Icon
					name='sc-telegram'
					type='evilicon'
					color='#FF6B6B'
					size={40}
					onPress={handleSendMessage}
					activeOpacity={0.7}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#152033',
	},
	chatInput: {
		width: "80%",
		height: 40,
		borderWidth: 1,
		borderColor: "#152033",
		backgroundColor: "#152033",
		borderRadius: 4,
		color: "#ffffff",
		paddingLeft: 10,
	},
	Bottomcontainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0,
		height: 60,
		backgroundColor: '#0F1828',
	},
	title: {
		color: '#ffffff',
		fontSize: 20
	},
	chat_head: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'absolute',
		width: "100%",
		top: 30,
		height: 60,
		marginLeft: 0,
		backgroundColor: '#0F1828',
	},
	
	right_icons: {
		flexDirection: 'row',
		paddingTop: 8,
	},
	imageContent: {
		width: 205,
		height: 120,
		borderRadius: 4,
		top: 10,
		left: 10,
	},
	chatContainer: {
		top: 90,
	},
	msgContainer: {
		width: 226,
		height: 208,
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		borderBottomRightRadius: 16,
		borderBottomLeftRadius: 0,
		marginBottom: 20,
		backgroundColor: '#0F1828',
		top: 0,
		left: 10,
	},
	contentText: {
		color: '#F7F7FC',
		fontSize: 14,
		lineHeight: 14,
		marginTop: 15,
		marginLeft: 10,
	},
	date: {
		color: '#ADB5BD',
		position: 'absolute',
		bottom: 5,
		right: 10,
		fontSize: 10,
	},
	messageUsername: {
		position: 'absolute',
		bottom: 5,
		left: 10,
		fontSize: 10,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: 'white'
	}
})

export default ChatScreen;
