import React, {useState} from "react";
import {View, Text, Image, StyleSheet} from "react-native";

export default function PostCard({post}) {
    return (
        <View style={styles.card}>
            {/* Top Row */}
            <View style={styles.header}>
                <View style={styles.avatar} />
                <Text style={styles.username}>{post.username}</Text>
            </View>
            {/* Image */}
            <Image source={post.image} style={styles.image} />
            {/* Caption */}
            <Text style={styles.caption}>{post.caption}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fffdf6',
        marginHorizontal: 16,
        marginBottom: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#00cfff',
        marginRight: 10,
    },
    username: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 320,
        alignSelf: 'center',
    },
    caption: {
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
});