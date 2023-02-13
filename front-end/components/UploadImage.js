import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ProfilImage from '../components/ProfilImage';
const PlaceholderImage = require('../assets/usericonplus.png');

export default function UploadImage() {
	const [selectedImage, setSelectedImage] = useState(null);

	const addImage = async () => { 
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
		} else {
			alert("You did not select any image.");
		}
	};
	return (
		<View >
			<View style={imageUploaderStyles.container}>
				{
					selectedImage && <ProfilImage source={{ uri: selectedImage }} placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} style={{ width: 100, height: 100 }} />
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