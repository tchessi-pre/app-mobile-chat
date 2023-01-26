import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


export default function UploadImage() {
	const [image, setImage] = useState(null);

	const addImage = async () => { 
		let _image = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		console.log(JSON.stringify(_image));
		if (!_image.canceled) {
			setImage(_image.assets[0].uri);
		}
	};
	return (
		<View >
			<View style={imageUploaderStyles.container}>
				{
					image && <Image  source={{ uri: image }} style={{ width: 100, height: 100 }} />
				}
			</View>
			<View style={imageUploaderStyles.uploadBtnContainer}>
				<TouchableOpacity  onPress={addImage} style={imageUploaderStyles.uploadBtn} >
					
				<AntDesign style={imageUploaderStyles.iconplus} name="pluscircle" size={30} color="white" />
				</TouchableOpacity>
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
		borderWidth: 1,
		borderColor: '#152033',
		overflow: 'hidden',
	},
	uploadBtnContainer: {
		opacity: 0.7,
		position: 'absolute',
		left: 0,
		top: 85,
		backgroundColor: '#ffffff01',
		width: '100%',
		height: '100%',
	},
	uploadBtn: {
		display: 'flex',
		alignItems: "center",
		justifyContent: 'center',
	},
	iconplus: {
		position: 'absolute',
		zIndex: 999,
		right: 0,
	}
	
})