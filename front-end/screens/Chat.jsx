import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const Chat = () => {
const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState('');

useEffect(() => {
fetchMessages();
}, []);

const fetchMessages = async () => {
try {
const response = await axios.get('http://192.168.1.13:3000/api/posts');
setMessages(response.data);
console.log(response.data);
} catch (error) {
console.error(error);
console.log(error.response);

}
};

const handleSendMessage = async () => {
try {
await axios.post('http://192.168.1.13:3000/api/posts', { message: newMessage });
fetchMessages();
setNewMessage('');
} catch (error) {
console.error(error);
console.log(error.response);
console.log(error.response.data);
}
};

return (
<View style={styles.container}>
<FlatList
data={messages.posts}
renderItem={({ item }) => <Text style={styles.textContent}>{item.content}</Text>}
keyExtractor={item => item.id}
/>
<View style={styles.inputContainer}>
    <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Entrez votre message"
        style={styles.input}
    />
    <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
    <Text style={styles.sendButtonText}>Envoyer</Text>
    </TouchableOpacity>
</View>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: 'black',
},
inputContainer: {
flexDirection: 'row',
alignItems: 'center',
backgroundColor: 'black',
padding: 8,
bottom: 0,
position: 'absolute',
width: '100%',
},
input: {
flex: 1,
padding: 8,
borderWidth: 1,
borderColor: 'gray',
borderRadius: 8,
marginRight: 8,
backgroundColor: 'gray',
},
sendButton: {
backgroundColor: 'blue',
padding: 8,
borderRadius: 8,
},
sendButtonText: {
color: 'white',
fontWeight: 'bold',
},
textContent: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
color: 'white',
},
});

export default Chat;