import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://10.0.0.216:3000/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', data.msg, [
                    {text: 'OK', onPress: () => navigation.navigate('Gallery')}
                ]);
            } else {
                Alert.alert('Error',data.msg);
            }
        } catch (error) {
            Alert.alert('Error', 'Could not connect to server');
        }
    };
    return (
        <View style={styles.container}>
            <Image source={require('../assets/ShuttrLogo1.png')} style={styles.logo} resizeMode="contain" />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 20,
            backgroundColor: '#fffdf6',
        },
        logo: {
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginBottom: 50,
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            fontSize: 16,
        },
        button: {
            backgroundColor: '#00cfff',
            padding: 14,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 16,
        },
        buttonText: {
            color: '#fffdf6',
            fontSize: 16,
            fontWeight: 'bold',
        },
        link: {
            color: '#00cfff',
            textAlign: 'center',
            fontSize: 14,
        },
    });