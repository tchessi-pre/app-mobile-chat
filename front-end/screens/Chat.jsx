import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const Chat = () => {
const [messages, setMessages] = useState([]);

const [newMessage, setNewMessage] = useState('');
const [newImageUrl, setNewImageUrl] = useState('');

useEffect(() => {
    fetchMessages();
}, []);
const fetchMessages = async () => {
    try {
        // Get the token from storage
        const token = await AsyncStorage.getItem('token');
        // Use the token to make a request to the API
        const response = await axios.get('http://192.168.1.13:3000/api/posts', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            setMessages(response.data.posts);
            // console.log(response.data);
        } else {
            console.log('error');
            console.log(response.data);
            console.log(response.status);
        }
    } catch (error) {
        console.error(error);
        console.log(error.response);
        
    }
};

const handleSendMessage = async () => {
    if(newMessage === '' ) {
        alert('Le message ne peut pas être vide')
    }else {
    try {
        const data = {};
        if(newMessage) data.content = newMessage;
        if(newImageUrl) data.imageUrl = newImageUrl;
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post('http://192.168.1.13:3000/api/posts', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    
        if(response.status === 201) {
            fetchMessages();
            setNewMessage('');
            setNewImageUrl('');
            console.log(response.data);
        }
        else{
            console.log('error');
            console.log(response.data);
            console.log(response.status);
        }
    }catch (error) {
        console.error(error);
        console.log(error.response);
        console.log(error.response.data);
        console.log('je tombe dans le catch');
    }
}
};

return (
    <View style={styles.container}>
        <FlatList
        style={styles.messageListContainer}
        scrollEnabled={true}
        initialNumToRender={20}
        inverted={true}
        data={messages}
        renderItem={({ item }) => 
            <View style={styles.messageContainer}>
            <View style={styles.messageContent}>
            <Image style={styles.messageAvatar} source={item.imageUrl ? {uri: item.imageUrl} : require('../assets/avatar.png')}/>
            <View style={styles.messageTextContainer}>
                <Text style={styles.messageUsername}>{item.User.firstName} {item.User.lastName}</Text>
            <Text style={styles.messageText}>{item.content}</Text>
        </View>
    </View>
</View>
}
keyExtractor={item => item.id}
/>
<View style={styles.inputContainer}>
    <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Entrez votre message"
        style={styles.input}
    />
    <TouchableOpacity  value={newImageUrl} style={styles.selectImageButton}>
        <Ionicons name="md-images" size={24} color="white" />
    </TouchableOpacity>
    <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
    <Text style={styles.sendButtonText}>Envoyer</Text>
    </TouchableOpacity>
</View>
</View>
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
    width: '100%',
    backgroundColor: '#0F1828',
    bottom: '15%',
},

messageContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
    maxWidth: '80%',
    marginTop: 10,
},
messageContent: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    opacity: 0.8,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    
},
messageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 8,
    borderWidth: 3,
    borderColor: '#7452B7',
    boxShadow: '0 0 5px black',
    backgroundColor: 'gray',
},
messageTextContainer: {
    maxWidth: '80%',
    margin: 10,
    paddingRight: 10,
},
messageUsername: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',
},
messageText: {
    fontSize: 14,
    color: '#333',
},

// Input 
inputContainer: {
flexDirection: 'row',
alignItems: 'center',
backgroundColor: 'black',
padding: 8,
bottom: 10,
position: 'absolute',
width: '100%',

},
input: {
flex: 1,
padding: 8,
borderWidth: 1,
borderColor: 'gray',
borderRadius: 8,
backgroundColor: 'gray',
},

// Button
sendButton: {
backgroundColor: '#FF6B6B',
padding: 8,
borderRadius: 8,
},
sendButtonText: {
color: 'white',
fontWeight: 'bold',
},
selectImageButton: {
backgroundColor: '#FF6B6B',
padding: 5,
margin: 5,
borderRadius: 8,    
},
});

export default Chat;