import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState, useRef } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';


const Avatar = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImageHandler = async () => {
        const permissionResult = ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const compressedImage = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [],
                { compress: 0.5 } // Adjust the compression ratio as needed
            );
            setSelectedImage(compressedImage.uri);
            props.onImagePicked(compressedImage.uri);
        }
        
    } 


    return (
        <TouchableOpacity onPress={pickImageHandler} disabled={props.isEdit} style={[styles.container, props.style]}>
            <View style={styles.frame}>
                <Image source={selectedImage  ? { uri: selectedImage } : props.source} style={styles.img} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%', // Adjusted to set a defined width
        height: '100%', // Adjusted to set a defined height
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 20, // Half of width and height to make it circular
        overflow: 'hidden',  // Ensures the image does not spill outside the boundary
        borderWidth: 2,
        borderColor: '#eee', // Light grey border for subtle effect
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    frame: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        // borderWidth: 1,
        // borderColor: 'red',
    },
    img: {

        // borderWidth: 1,
        // borderColor: 'red',
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Changed to 'cover' to fill the frame
    }
});

export default Avatar;

