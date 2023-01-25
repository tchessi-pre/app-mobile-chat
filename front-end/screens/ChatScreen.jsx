import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements'
import Styles from '../css/Styles';


const ChatScreen = () => {
	const [image, setImage] = useState(null);

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
			<View style={styles.msgContainer}>
				{image && <Image source={{ uri: image }} style={styles.imageContent} />}
				<Text style={styles.contentText}>Look at how chocho sleep in my arms!</Text>
				<Text style={styles.date}>18.06</Text>
			</View>
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
				/>
				<Icon
					name='sc-telegram'
					type='evilicon'
					color='#FF6B6B'
					size={40}
					onPress={() => console.log("Send")}
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
		top: 20,
		height: 60,
		marginLeft: 15,
		marginRight: 15,
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
	msgContainer: {
		width: 226,
		height: 208,
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		borderBottomRightRadius: 16,
		borderBottomLeftRadius: 0,
		backgroundColor: '#0F1828',
		position: 'absolute',
		top: 100,
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
		bottom: 10,
		left: 10,
		fontSize: 10,

	}
})

export default ChatScreen;
