import React, {useState, useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostCard from '../components/PostCard';

const posts = [
    {
        id: '1',
        username: 'EthMorr4',
        image: require('../assets/Nate.jpeg'),
        caption: 'Just a pic of Nate',
    },
    {
        id: '2',
        username: 'EthMorr4',
        image: require('../assets/Connor.jpeg'),
        caption: 'Just a pic of Connor',
    },
    {
        id: '3',
        username: 'EthMorr4',
        image: require('../assets/Jordan.jpeg'),
        caption: 'Just a pic of Jordan',
    }
];

export default function LensScreen({navigation}) {
    const [bio, setBio] = useState('Tell us about yourself...');
    const [avatar, setAvatar] = useState(null);
    const [username, setUsername] = useState('@EthMorr4');
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        const loadName = async () => {
            const forename = await AsyncStorage.getItem('forename') ?? '';
            const surname = await AsyncStorage.getItem('surname') ?? '';
            if (forename || surname) setUserName(`${forename} ${surname}`.trim());
        };
        loadName();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileHeader}>
                <TouchableOpacity 
                    style={styles.editButton} 
                    onPress={() => navigation.navigate('EditLens', { bio, avatar, username, userName, onSave: (newBio, newAvatar, newUsername) => { setBio(newBio); setAvatar(newAvatar); setUsername(newUsername); } })}>
                    <Feather name="edit-2" size={18} color="#888" />
                </TouchableOpacity>
                {avatar
                    ? <Image source={{ uri: avatar }} style={styles.avatar} />
                    : <Image source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=00cfff&color=fff&size=96` }} style={styles.avatar} />
                }

                <Text style={styles.name}>My Lens</Text>
                <Text style={styles.username}>{username}</Text>

                <Text style={styles.bio}>{bio}</Text>

                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>3</Text>
                        <Text style={styles.statLabel}>Posts</Text>
                    </View>

                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>150</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </View>

                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>103</Text>
                        <Text style={styles.statLabel}>Following</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Moments</Text>

            <FlatList
                data={posts}
                numColumns={3}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Image source={item.image} style={styles.gridImage} />
                )}
                contentContainerStyle={styles.grid}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    editButton: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
    profileHeader: {
        alignItems: 'center',
        paddingTop: 70,
        paddingHorizontal: 20,
        paddingBottom: 24,
        backgroundColor: '#fffdf6',
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#00cfff',
        marginBottom: 14,
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    username: {
        fontSize: 14,
        marginTop: 4,
        color: '#888',
    },
    bio: {
        textAlign: 'center',
        color: '#374151',
        fontSize: 14,
        marginTop: 12,
        lineHeight: 20,
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 18,
        marginTop: 20,
        paddingVertical: 14,
        paddingHorizontal: 24,
        gap: 28,

        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    grid: {
        paddingHorizontal: 12,
        paddingBottom: 100,
    },
    gridImage: {
        width: '32%',
        aspectRatio: 1,
        borderRadius: 12,
        margin: 3
    },
})