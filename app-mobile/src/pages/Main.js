import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import coruja from '../assets/corujinea.png';
import api from '../services/api';

export default function Main({ navigation }) {
    const id = navigation.getParams('id');
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/users', {
                headers: {
                    username: id
                }
            });
            setUsers(response.data);
        }
        loadUsers();
    }, [id]);
    async function handleLike() {
        const [user, ...rest] = users;
        await api.post(`/users/${user._id}/likes`, null, {
            headers: { user: id }
        });
        setUsers(rest);
    }
    async function handleDislike() {
        const [user, ...rest] = users;
        await api.post(`/users/${user._id}/dislikes`, null, {
            headers: { user: id }
        });
        setUsers(rest);
    }
    async function handleLogout() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }
    return(
        <SafeAreaView style = {styles.container}>
            <TouchableOpacity onPress = {handleLogout}>
                <Text style = {styles.title}>Tinbooks</Text>
            </TouchableOpacity>
            <View style = {styles.cardsContainer}>
                { users.length === 0 ? <Text style = {styles.empty}>Acabou :(</Text>
                    : ( users.map( (user, index) => (
                        <View key = { user._id } style = {[ styles.card, { zIndex: users.length - index }]}>
                            <Image style = {styles.avatar} source = {{ uri: 'https://avatars1.githubusercontent.com/u/33687984?v=4' }}/>
                            <View styles = {styles.footer}>
                                <Text styles = {styles.name}>{ user.name }</Text>
                                <Text styles = {styles.bio} numberOfLines = {3}>{ user.bio }</Text>
                            </View>
                        </View>
                    )))
                }
            </View>
            { users.length > 0 && (
                <View style = {styles.buttonsContainer}>
                    <TouchableOpacity style = {styles.button} onPress = {handleLike}>
                        <Image source = {like}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.button} onPress = {handleDislike}>
                        <Image source = {dislike}/>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500
    },
    card: {
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    avatar: {
        flex: 1,
        height: 100
    },
    footer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333'
    },
    bio: {
        fontSize: 14,
        color: '#999999',
        marginTop: 5,
        lineHeight: 18
    },
    empty: {
        alignSelf: 'center',
        color: '#999999',
        fontSize: 24,
        fontWeight: 'bold'
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        }
    }
});