import React from 'react';
import {View, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const Footer = () => {
	const navigation = useNavigation(); 
	return (
		<View>
			<View style={styles.footer}>
				<FontAwesome5 
					name="users"
					color='#F7F7FC'
					size={25}
					onPress={() => navigation.navigate('Contacts')}
					activeOpacity={0.7}
					/>
				<Ionicons 
				name="chatbubble-outline"
					color='#F7F7FC'
					size={30}
					onPress={() => navigation.navigate('Chat')}
					activeOpacity={0.7}
				/>
				<FontAwesome5 
					name="ellipsis-h" 
					color='#F7F7FC'
					size={25}
					onPress={() => navigation.navigate('Profil')}
					activeOpacity={0.7}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	footer: {
		backgroundColor: '#0F1828',
		height: 60,
		display: "flex",
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 20,
		paddingRight: 20,
		alignItems: 'center',
	}
})

export default Footer;
