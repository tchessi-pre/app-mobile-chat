import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const ProfilImage = ({ placeholderImageSource, selectedImage }) => {
	const imageSource =
		selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;
	return (
		<View>
			<Image source={imageSource} style={styles.image} />
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
})

export default ProfilImage;
