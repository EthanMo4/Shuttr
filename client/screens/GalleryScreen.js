import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList, Image} from 'react-native';
import PostCard from '../components/PostCard';

const posts = [
    {
        id: '1',
        username: 'NateDawg29',
        image: require('../assets/Nate.jpeg'),
        caption: 'Had a great time in Milan!',
    },
    {
        id: '2',
        username: 'McJesus97',
        image: require('../assets/Connor.jpeg'),
        caption: 'Enjoyed the sights of Italy',
    },
    {
        id: '3',
        username: 'Binner50',
        image: require('../assets/Jordan.jpeg'),
        caption: 'Do I look Nervous?',
    }
];

export default function GalleryScreen() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/shuttrIcon.png')} style={styles.logo} resizeMode="contain" />    
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <PostCard post={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
});
