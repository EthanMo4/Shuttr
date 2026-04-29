import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <PostCard post={item} />}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffdf6',
    },
});
