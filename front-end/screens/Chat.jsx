import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import ImageMessageUpload from '../components/ImageMessageUpload';
import BaseUrl from '../services/BaseUrl';
const API_URL = BaseUrl

const Chat = () => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    // Check Text error

    const fetchMessages = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/posts`, {
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
            console.error(error);
        }
    };

    // ADD Socket 
    // useEffect(() => {
    //     fetchMessages();
    //     // const socket = io('http://110.10.57.143.3:2000');
    //     // setTimeout(() => {
    //     //     console.log(socket.connected)
    //     // }, 2000);
    //     // socket.on('newPost', (msg) => {
    //     //     setMessages(messages => [...messages, msg]);
    //     //     console.warn(msg);
    //     // });
    // }, []);

    useEffect(() => {
        fetchMessages();
        const intervalId = setInterval(() => {
            fetchMessages();
        }, 1000); // exécute fetchMessages toutes les 5 secondes

        return () => clearInterval(intervalId); // nettoie le minuteur lorsque le composant est démonté
    }, []);

    // Formatage de la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "EEEE d MMMM yyyy 'à' HH:mm:ss", { locale: frLocale });
    };

    return (
        // Message view
        <View style={styles.container}>
            <FlatList
                style={styles.messageListContainer}
                inverted={true}
                onEndReached={fetchMessages}
                onEndReachedThreshold={0.5}
                data={messages}
                keyExtractor={item => `${item.id}-${item.createdAt}`}
                renderItem={({ item }) =>
                    <View style={styles.messageContainer}>
                        <View style={styles.messageContent}>
                            <Image style={styles.messageAvatar} source={item.User.imageUrl ? { uri: item.User.imageUrl } : require('../assets/DefaultUser.png')} />
                            <View style={styles.messageTextContainer}>
                                <Text style={styles.messageUsername}>{item.User.firstName} {item.User.lastName}</Text>
                                {item.imageUrl ? (
                                    <Image style={styles.messageImage} source={item.imageUrl ? { uri: item.imageUrl, } : null} />
                                ) : null}
                                <Text style={styles.messageText}>{item.content}</Text>
                                <Text style={styles.messageCreatedAt}>{formatDate(item.createdAt)}</Text>
                            </View>
                        </View>
                    </View>}
            />
            <View style={styles.inputContainer}>
                <ImageMessageUpload />
            </View >
        </View >
    );
};

const styles = StyleSheet.create({
    // Container
    container: {
        flex: 1,
        backgroundColor: '#0F1828',
    },

    messageListContainer: {
        flex: 1,
        width: '95%',
        backgroundColor: '#0F1828',
        bottom: '1%',
        alignSelf: 'center',
    },
    messageContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        marginRight: 10,
        maxWidth: '90%',
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderTopRightRadius: 20,
        paddingTopleft: -20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 5,
    },
    messageContent: {
        flexDirection: 'row',
        backgroundColor: '#152033',
        borderRadius: 20,
        padding: 10,
    },
    messageAvatar: {
        width: 50,
        height: 50,
        borderRadius: 17,
        marginRight: 8,
        borderWidth: 3,
        borderColor: '#7452B7',
        boxShadow: '0 0 5px black',
    },
    messageTextContainer: {
        width: '80%',
        margin: 10,
        paddingRight: 10,
    },
    messageUsername: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    messageText: {
        fontSize: 13,
        padding: 5,
        color: 'white',
    },
    messageImage: {
        width: 200,
        height: 200,
        borderRadius: 20,
        alignSelf: 'center',
    },
    messageCreatedAt: {
        margin: 2,
        fontSize: 8,
        color: 'white',
        alignSelf: 'flex-end',
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 10,
    },
});

export default Chat;