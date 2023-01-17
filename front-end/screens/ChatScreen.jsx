import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Icon } from 'react-native-elements'
import Styles from '../css/Styles';


const ChatScreen = () => {
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
			<View style={styles.Bottomcontainer}>
				<Icon
					name='add'
					color='#adb5bd'
					size={25}
					onPress={() => console.log("Works!")}
					activeOpacity={0.7}
					/>
			<TextInput
				style={styles.chattext}
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
		paddingLeft: 10,
		paddingRight: 10,
	},
	chattext: {
		width: "75%",
		height: 40,
		margin: 10,
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
		marginLeft: 5,
		marginRight: 12,
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
	}
})

export default ChatScreen;
