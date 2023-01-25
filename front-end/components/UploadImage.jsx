import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function UploadImage(props) {
    const [image, setImage] = useState(props.imageUser);
    const [modalVisible, setModalVisible] = useState(false);


    // Demande les permissions pour accéder à la caméra et à la galerie
    const getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (status !== 'granted') {
            alert('Vous devez autoriser l\'accès à la caméra et à la galerie pour utiliser cette fonctionnalité.');
        }
    };
    console.log(props);
    const addImage = async () => {

        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(JSON.stringify(image));
        if (!image.canceled) {
            console.log(image.uri);
            setImage(image.uri);
        }
    };
    const takePicture = async () => {
        await getPermissionsAsync();
        let image = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!image.canceled) {
            setImage(image.uri);
        }
    };

    return (
        <View >
            <View style={imageUploaderStyles.container}>
                <View style={imageUploaderStyles.uploadBtnContainer}>
                    {

                        image ?
                            <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 100, }} />
                            :
                            <Image source={require('../assets/DefaultUser.png')} style={{ width: 100, height: 100 }} />
                    }
                </View>


                {/* <View style={imageUploaderStyles.uploadBtnContainer}> */}
                <TouchableOpacity onPress={() => setModalVisible(true)} style={imageUploaderStyles.uploadBtn}>
                    {/* <Text>{image ? 'Edit' : 'Upload'}</Text> */}

                    <AntDesign name="camera" size={30} color="#FF6B6B" style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                {/* </View> */}
            </View>

            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={modalStyles.container}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={modalStyles.closeBtn}>
                        <Text style={modalStyles.closeBtnText}>X</Text>
                    </TouchableOpacity>
                    <View style={modalStyles.modalContent}>
                        <TouchableOpacity onPress={addImage} style={modalStyles.modalBtn}>
                            <Text style={modalStyles.modalBtnText}>Choisir une image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takePicture} style={modalStyles.modalBtn}>
                            <Text style={modalStyles.modalBtnText}>Prendre une photo</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>


        </View>
    );
}
const imageUploaderStyles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 100,

    },
    uploadBtnContainer: {
        borderRadius: 100,
        overflow: 'hidden'


    },
    uploadBtn: {
        position: 'absolute',
        left: 95,
        top: 65
    },

})

const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 999,
    },
    closeBtnText: {
        fontSize: 20,
        color: 'white',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        height: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    modalBtn: {
        backgroundColor: '#152033',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    modalBtnText: {
        color: 'white',
        fontSize: 20,
    }
})
