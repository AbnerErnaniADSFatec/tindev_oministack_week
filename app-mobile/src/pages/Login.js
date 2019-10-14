import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, Image, Platform, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [user, setUser] = useState('');
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user })
            }
        })
    }, []);
    async function handleLogin() {
        const response = await api.post('/users', {
            username: user
        });
        const { _id } = response.data;
        await AsyncStorage.setItem('user', _id);
        navigation.navigate('Main', { _id });
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={logo} />
            <TextInput
                placeholder="E-mail"
                placeholderTextColor="#999999"
                style={styles.input}
            />
            <TextInput
                placeholder="Senha"
                placeholderTextColor="#999999"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                style={styles.input}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    title: {},
    container: {
        flex: 1,
        backgroundColor: '#AEEDE2',
        justifyContent: 'center',
    },
    input: {
        height: 46,
        width: 300,
        alignSelf: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#2381df',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});