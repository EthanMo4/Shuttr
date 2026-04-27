import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

export default function EditLensScreen({ route, navigation }) {
    const { bio: initialBio, avatar: initialAvatar, username: initialUsername, userName, onSave } = route.params;
    const [bio, setBio] = useState(initialBio);
    const [avatar, setAvatar] = useState(initialAvatar);
    const [username, setUsername] = useState(initialUsername);

    const pickAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });
        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        onSave(bio, avatar, username);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={pickAvatar} style={styles.avatarPicker}>
                {avatar
                    ? <Image source={{ uri: avatar }} style={styles.avatarPreview} />
                    : <Image source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName ?? 'User')}&background=00cfff&color=fff&size=96` }} style={styles.avatarPreview} />
                }
                <Text style={styles.avatarLabel}>Change Photo</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholder="@username"
            />
            <Text style={styles.label}>Bio</Text>
            <TextInput
                style={styles.input}
                value={bio}
                onChangeText={setBio}
                multiline
                maxLength={150}
                placeholder="Tell us about yourself..."
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fffdf6',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        minHeight: 80,
        textAlignVertical: 'top',
        marginBottom: 24,
    },
    avatarPicker: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarPreview: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#00cfff',
        marginBottom: 8,
    },
    avatarLabel: {
        color: '#00cfff',
        fontSize: 14,
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