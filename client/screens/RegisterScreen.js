import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';

export default function RegisterScreen({navigation}) {
    const [forename, setForename] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleRegister = async () => {
        try {
            const response = await fetch('http://10.0.0.216:3000/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({forename, surname, email, password}),
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', data.msg, [
                    {text: 'OK', onPress: () => navigation.navigate('Login')}
                ]);
            } else {
                Alert.alert('Error',data.msg);
            }
        } catch (error) {
            Alert.alert('Error', 'Could not connect to server');
        }
    }
    return (
        <View style={styles.container}>
            <Image source={require('../assets/shuttrIcon.png')} style={styles.logo} resizeMode="contain" />
            <TextInput
                style={styles.input}
                placeholder='First Name'
                value={forename}
                onChangeText={setForename}
            />
            <TextInput
                style={styles.input}
                placeholder='Last Name'
                value={surname}
                onChangeText={setSurname}
            />
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
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
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 40,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#00cfff',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fffdf6',
        fontSize: 16,
        fontWeight: 'bold',
    },
});