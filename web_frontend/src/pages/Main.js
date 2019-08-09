import React, { useEffect, useState } from 'react';
import './Main.css';
import api from '../services/Api';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({ match }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    username: match.params.id
                }
            });
            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id]);
    return (
        <div className = "main-container">
            <img src = {logo} alt = 'TinDev'/>
            <ul>
                { users.map( user => (
                    <li>
                        <img src = {user.avatar_url} alt = ""/>
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className = "buttons">
                            <button type = "button">
                                <img src = {like} alt = "Like"/>
                            </button>
                            <button type = "button">
                                <img src = {dislike} alt = "Dislike"/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}