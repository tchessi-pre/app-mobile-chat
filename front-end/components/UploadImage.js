import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Styles from '../css/Styles';
export default function UploadImage() {
	const [image, setImage] = useState(null);
	const addImage = () => { };
	return (
		<View >
		<View style={imageUploaderStyles.container}>
			{
				image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
			}
			<View style={imageUploaderStyles.uploadBtnContainer}>
				<TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
					<Text>{image ? 'Edit' : 'Upload'} Image</Text>
					<AntDesign name="camera" size={30} color="black" />
				</TouchableOpacity>
			</View>
		</View>
		</View>
	);
}
const imageUploaderStyles = StyleSheet.create({
	container: {
		elevation: 2,
		height: 100,
		width: 100,
		backgroundColor: '#152033',
		position: 'relative',
		borderRadius: 999,
		overflow: 'hidden',
	},
	uploadBtnContainer: {
		opacity: 0.7,
		position: 'absolute',
		left: 0,
		top: 0,
		backgroundColor: 'lightgrey',
		width: '100%',
		height: '100%',
	},
	uploadBtn: {
		display: 'flex',
		alignItems: "center",
		justifyContent: 'center'
	},
	
})