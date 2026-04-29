import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CaptureScreen() {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handlePost = async () => {
        if (!image) return Alert.alert('No image', 'Please select a photo first.');
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('http://10.0.0.216:3000/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ imageUrl: image, caption })
        });
        if (response.ok) {
            Alert.alert('Posted!', 'Your photo has been shared.');
            setImage(null);
            setCaption('');
        } else {
            Alert.alert('Error', 'Could not create post.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image
                    ? <Image source={{ uri: image }} style={styles.preview} />
                    : <Text style={styles.imagePlaceholder}>Tap to select a photo</Text>
                }
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Write a caption..."
                value={caption}
                onChangeText={setCaption}
                multiline
                maxLength={200}
            />
            <TouchableOpacity style={styles.button} onPress={handlePost}>
                <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffdf6',
        padding: 20,
    },
    imagePicker: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        overflow: 'hidden',
    },
    preview: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        color: '#888',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        minHeight: 80,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#00cfff',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});