import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ChatFooter from '../components/ChatFooter';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import BaseUrl from '../services/BaseUrl';
import io from 'socket.io-client';

const API_URL = BaseUrl;

const ChatScreen = () => {
	const navigation = useNavigation();
	const [image, setImage] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const [newImageUrl, setNewImageUrl] = useState('');
	const [currentDate, setCurrentDate] = useState('');
	const [currentUser, setCurrentUser] = useState(null);
	const socket = io(API_URL);

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
				const decodedToken = jwt_decode(token);
				const userId = decodedToken.userId;
				setCurrentUser(userId);
			} else {
				console.log('error');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const sendMessage = async () => {
		if (newMessage || image) {
			try {
				const token = await AsyncStorage.getItem('token');
				const formData = new FormData();
				formData.append('content', newMessage);
				if (image) {
					formData.append('imageUrl', image);
				}
				const response = await axios.post(`${API_URL}api/posts/`, formData, {
					headers: {
						'Authorization': `Bearer ${token}`,
					},
				});
				if (response.status === 201) {
					setNewMessage('');
					setImage(null);
					const newMessage = response.data.post;
					socket.emit('createMessage', newMessage);
				} else {
					console.log('error');
				}
			} catch (error) {
				console.log(error);
			}
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
		socket.on('connect', () => {
			console.log('Connected to server');
		});
		socket.on('newMessage', (message) => {
			setMessages((prevState) => [...prevState, message]);
		});
		return () => {
			socket.disconnect();
		};
	}, [sendMessage]);

	return (
		<View style={styles.container}>
			{/* <View style={styles.chat_head}>
				<View>
					<Text style={styles.title}>Chat</Text>
				</View>
				<View style={styles.right_icons}>
					<Icon
						name='bell'
						type='evilicon'
						color='#ffffff'
						size={30}
						onPress={() => console.log("Send")}
						activeOpacity={0.7}
					/>
					<Icon
						name='navicon'
						type='evilicon'
						color='#ffffff'
						size={30}
						onPress={() => console.log("Send")}
						activeOpacity={0.7}
					/>
				</View>
			</View> */}
			<FlatList
				style={styles.messageListContainer}
				inverted={true}
				onEndReached={fetchMessages}
				onEndReachedThreshold={0.5}
				data={messages}
				keyExtractor={item => `${item.id}-${item.createdAt}`}
				renderItem={({ item }) => (
					<View style={[styles.messageContainer, item.User?.id === currentUser ? styles.currentUserMessageContainer : null]}>
						<View style={[styles.messageContent]}>
							<Image style={styles.messageAvatar} source={item.User && item.User.imageUrl ? { uri: item.User.imageUrl } : require('../assets/avatarplaceholder.png')} />
							<View style={styles.messageTextContainer}>
								<Text style={styles.messageUsername}>{item.User ? item.User.firstName : ''} {item.User ? item.User.lastName : ''}</Text>
								{item.imageUrl ? (
									<Image style={styles.messageImage} source={item.imageUrl ? { uri: item.imageUrl, } : null} />
								) : null}
								<Text style={styles.messageText}>{item.content}</Text>
								<Text style={styles.messageCreatedAt}>{currentDate}</Text>
							</View>
						</View>
					</View>
				)}
			/>
			<View style={styles.Bottomcontainer}>
				<ChatFooter onSend={sendMessage} setImage={setImage} setNewImageUrl={setNewImageUrl} newImageUrl={newImageUrl} />
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
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#0F1828',
	},
	
	imageContent: {
		width: 205,
		height: "auto",
		borderRadius: 1,
		top: 10,
		left: 10,
	},
	chatContainer: {
		top: 82,
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
		top: 0,
		left: 10,
		fontSize: 10,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: 'white'
	},
	messageListContainer: {
		flex: 1,
		width: '95%',
		alignSelf: 'center',
	},
	messageContainer: {
		flex: 1,
		alignSelf: 'flex-start',
		marginRight: 5,
		maxWidth: '90%',
		marginTop: 5,
		backgroundColor: '#FF6B6B',
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		borderBottomRightRadius: 16,
		marginBottom: 5,
	},
	currentUserMessageContainer: {
		backgroundColor: '#0F1828',
		alignSelf: 'flex-end',
		marginRight: 0,
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 0,
	},
	messageContent: {
		flexDirection: 'row',
		borderRadius: 16,
		padding: 10,
	},
	messageAvatar: {
		width: 30,
		height: 30,
		borderRadius: 99,
		boxShadow: '0 0 5px black',
		position: 'absolute',
		top: 2,
		right: 2
	},
	messageTextContainer: {
		width: '70%',
		paddingRight: 10,
	},
	messageUsername: {
		fontWeight: 'bold',
		fontSize: 14,
		color: 'white',
	},
	messageText: {
		fontSize: 13,
		padding: 5,
		color: 'white',
	},
	messageImage: {
		width: "100%",
		height: 100,
		borderRadius: 20,
		alignSelf: 'center',
	},
	messageCreatedAt: {
		margin: 2,
		fontSize: 8,
		color: 'white',
	},
	errorText: {
		color: 'red',
		alignSelf: 'center',
		fontSize: 10,
	},
});

export default ChatScreen;


